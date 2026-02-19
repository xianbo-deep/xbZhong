---
title: Graphql
index: false
article: false
timeline: false
date: 2025-02-20
---

## 前言

是在对博客的评论数量作统计时第一次接触这个，这个语法确实很方便，写的时候很爽，但是可读性我认为不好，嵌套过深的时候真的会懵逼，如果没看过API文档也会很懵逼，有利有弊吧

在后端里面为了简化开发，get了一个库：`githubv4`，使用它来提高我的开发效率，他会帮助我们把结构体映射到`GraphQL`的查询语句上，同时支持类似`mybatis`的传参方式，还是非常方便的。

我尝试写了一个很简单的对评论数、回应数、回复数进行统计，写了一百来行的代码。。。。太不优雅了，无限的嵌套，无休止的for循环。。。

**自己感受**

```go
// 返回三个指标
func (s *DiscussionService) GetTotalMertic(ctx context.Context, timeRangeDays int) (response.Metric, error) {
	// 声明为指针，返回nil
	var after *githubv4.String
	var cutoffTime time.Time
	totalComments := 0
	totalReplies := 0
	totalReactions := 0

	// 计算截止时间
	if timeRangeDays > 0 {
		cutoffTime = time.Now().AddDate(0, 0, -timeRangeDays)
	}

	// 准备discussion的排序参数
	orderBy := githubv4.DiscussionOrder{
		Field:     githubv4.DiscussionOrderFieldUpdatedAt,
		Direction: githubv4.OrderDirectionDesc,
	}
	for {
		var q struct {
			Repository struct {
				Discussions struct {
					Nodes []struct {
						UpdatedAt time.Time
						Reactions struct {
							Nodes []struct {
								CreatedAt time.Time
							}
						} `graphql:"reactions(first: 100)"`
						Comments struct {
							Nodes []struct {
								CreatedAt time.Time
								Reactions struct {
									Nodes []struct {
										CreatedAt time.Time
									}
								} `graphql:"reactions(first: 100)"`
								Replies struct {
									Nodes []struct {
										CreatedAt time.Time
										Reactions struct {
											Nodes []struct {
												CreatedAt time.Time
											} `graphql:"reactions(first: 100)"`
										}
									} `graphql:"nodes"`
								} `graphql:"replies(first: 100)"`
							}
						} `graphql:"comments(first: 100)"`
					}
					PageInfo struct {
						HasNextPage bool            // 是否还有下一页
						EndCursor   githubv4.String // 上一页的末尾光标
					}
				} `graphql:"discussions(first: 100,after: $after,orderBy: $orderBy)"`
			} `graphql:"repository(owner: $owner, name: $repo)"`
		}

		vars := map[string]interface{}{
			"owner":   githubv4.String(s.owner),
			"repo":    githubv4.String(s.repo),
			"after":   after,
			"orderBy": orderBy,
		}

		err := s.github.Query(ctx, &q, vars)

		if err != nil {
			return response.Metric{}, err
		}
		shouldStop := false
		// 处理每一个discussion
		for _, discussion := range q.Repository.Discussions.Nodes {
			if timeRangeDays > 0 && discussion.UpdatedAt.Before(cutoffTime) {
				shouldStop = true
				break
			}
			// 累加discussion的评论
			for _, comment := range discussion.Comments.Nodes {
				if comment.CreatedAt.After(cutoffTime) {
					totalComments++
				}
				// 累加comment的回复
				for _, reply := range comment.Replies.Nodes {
					if reply.CreatedAt.After(cutoffTime) {
						totalReplies++
					}
					// 累加reply的回应
					for _, reaction := range reply.Reactions.Nodes {
						if reaction.CreatedAt.After(cutoffTime) {
							totalReactions++
						}
					}
				}
				// 累加comment的回应
				for _, reaction := range comment.Reactions.Nodes {
					if reaction.CreatedAt.After(cutoffTime) {
						totalReactions++
					}
				}
			}
			// 累加discussion的回应
			for _, reaction := range discussion.Reactions.Nodes {
				if reaction.CreatedAt.After(cutoffTime) {
					totalReactions++
				}
			}
		}

		// 若discussion更新时间早于截止时间或者没有下一页
		if shouldStop || !q.Repository.Discussions.PageInfo.HasNextPage {
			break
		}

		// 更新游标
		after = &q.Repository.Discussions.PageInfo.EndCursor
	}

	return response.Metric{
		TotalComments:  int64(totalComments),
		TotalReplies:   int64(totalReplies),
		TotalReactions: int64(totalReactions),
	}, nil

}
```



## 常见API

**查询**

`githubv4.Client.Query(ctx,q,vars)`

- `ctx`：请求的上下文
- `q`：查询结构体
- `vars`：传入的变量



## 结构体标签

**格式**

```go
`graphql:xxxx`
```

在使用这个库的时候，你是需要使用结构体标签来进行**传参**或者是**提供API所需的参数**

- 在对讨论、评论、回复、回应进行查找的时候，如果数量太多，github是不会给你一次性返回的，你必须进行分页嵌套
- 同时你还需要给每个字段提供这么个标签：`graphql:"reactions(first: 100)"`，如果不填还会报错

## 字段关系