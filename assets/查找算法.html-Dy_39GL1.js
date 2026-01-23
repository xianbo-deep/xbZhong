import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,e,o as r}from"./app-D8u_YAsX.js";const a="/xbZhong/screenshot/ds/image-61.png",l="/xbZhong/screenshot/ds/image-63.png",s="/xbZhong/screenshot/ds/image-55.png",o="/xbZhong/screenshot/ds/image-56.png",p="/xbZhong/screenshot/ds/image-57.png",d="/xbZhong/screenshot/ds/image-58.png",c="/xbZhong/screenshot/ds/image-59.png",m="/xbZhong/screenshot/ds/image-60.png",g="/xbZhong/screenshot/ds/image-64.png",u="/xbZhong/screenshot/ds/image-65.png",h="/xbZhong/screenshot/ds/image-67.png",f="/xbZhong/screenshot/ds/image-66.png",b={};function x(_,n){return r(),i("div",null,[...n[0]||(n[0]=[e('<p><a href="/pdfs/ds/%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95.pdf" target="_blank" rel="noopener noreferrer">本页PDF</a></p><h2 id="二分查找算法" tabindex="-1"><a class="header-anchor" href="#二分查找算法"><span>二分查找算法</span></a></h2><p><strong>在有序数组中查找值</strong></p><blockquote><p>数组和函数之间没有本质差别<br> 数组消耗空间，函数消耗时间<br> 因此在底层数组和函数没有区别，也就意味着二分查找算法可以应用于函数<br><strong>不仅可以应用在有序数组上，也可以作用在单调函数上</strong></p></blockquote><h3 id="二分查找泛型情况" tabindex="-1"><a class="header-anchor" href="#二分查找泛型情况"><span>二分查找泛型情况</span></a></h3><p><strong>头尾指针重合位置就是所要查找的位置</strong><br><img src="'+a+`" alt="alt text" loading="lazy"></p><ul><li>查找第一个1</li><li><pre><code>  while(head &lt; tail)
  {
      mid = (head + tail) / 2;
      if(arr[mid] &lt; target) head = mid + 1;
      else tail = mid;
  }
  return head;
</code></pre></li></ul><figure><img src="`+l+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li>查找最后一个1</li><li><pre><code>  while(head &lt; tail)
  {
      mid = (head + tail + 1) / 2; //不加1则会陷入死循环
      if(arr[mid] &lt; target) head = mid;
      else tail = mid - 1;
  }
  return head;
</code></pre></li></ul><h2 id="跳跃表" tabindex="-1"><a class="header-anchor" href="#跳跃表"><span>跳跃表</span></a></h2><p><strong>每一个节点都有不同的高度，处于同一个高度的节点被串成一个链表</strong><br><img src="`+s+'" alt="alt text" loading="lazy"></p><ul><li>查找：待查找元素为x，从左上角的节点开始查找，若当前节点的下一个节点的值比x小，则往后走一位，若比x大，则向下走一位</li><li>插入：找到待插入节点的前一个节点，按照查找的规则移动，当不能再向下移动时，说明已经查到插入的节点的前一个节点</li></ul><h2 id="哈希表与布隆过滤器" tabindex="-1"><a class="header-anchor" href="#哈希表与布隆过滤器"><span>哈希表与布隆过滤器</span></a></h2><h3 id="哈希表" tabindex="-1"><a class="header-anchor" href="#哈希表"><span>哈希表</span></a></h3><ul><li>时间复杂度为O(1)</li><li>底层是一个数组，由哈希函数计算出来的哈希值来分配存储位置，数组中的每一个元素是一个特定的数据结构</li><li>哈希函数与数组中元素是可以自定义的</li><li>若不同元素计算出来的哈希值相同，则会造成存储冲突，有以下冲突处理方式 <ul><li>开放地址：依次往后遍历，看哪个位置没有存储元素</li><li>再哈希法：多造几个哈希函数</li><li>建立公共溢出区：本质上是一个查找数据结构</li><li>链式地址法：将数组中的元素变成链表</li></ul></li><li>所需要的存储空间非常巨大</li></ul><h3 id="布隆过滤器" tabindex="-1"><a class="header-anchor" href="#布隆过滤器"><span>布隆过滤器</span></a></h3><ul><li>底层是数组</li><li>使用过的存储空间标记为1，未使用过标记为0</li><li>使用多个哈希函数计算哈希值</li><li>对于元素出现过的判断是概率性判断，没法做精确的判断</li><li>可用于爬虫爬取网页的场景中</li></ul><p><strong>哈希表，存储空间与元素数量强相关，布隆过滤器，存储空间与元素数量弱相关</strong></p><hr><h3 id="两数之和" tabindex="-1"><a class="header-anchor" href="#两数之和"><span>两数之和</span></a></h3><figure><img src="'+o+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>用unordered_map模拟哈希表</p></li><li><p>用当前遍历到的数据去哈希表内查找是否有数字与其匹配，有则插入数组，没有则将当前数字插入哈希表</p><pre><code>  class Solution {
  public:
      vector&lt;int&gt; twoSum(vector&lt;int&gt;&amp; nums, int target) {
          unordered_map &lt;int,int&gt; h;
          vector&lt;int&gt; ret(2);
          for(int i = 0;i &lt; nums.size();i++)
          {
              if(h.find(target - nums[i]) != h.end())
              {
                  ret[0] = h[target - nums[i]];
                  ret[1] = i;
                  break;
              }
              h[nums[i]] = i;
          }
          return ret;
      }
  };
</code></pre></li><li><p>二分查找(在有序数组中查找)</p></li><li><p>对下标数组进行排序</p></li><li><p>从前到后遍历数组，对后半部分采用二分查找，查找是否有数字与遍历到的数字匹配</p><pre><code>  class Solution {
  public:
      int find(vector&lt;int&gt; &amp;nums,vector&lt;int&gt; &amp;ind,int target,int i)
      {
          int head = i,tail = nums.size() - 1,mid;
          while(head &lt;= tail)
          {
              mid = (tail + head) / 2;
              if(nums[ind[mid]] == target)
              return mid;
              if(nums[ind[mid]] &lt; target) 
              head = mid + 1;
              else
              tail = mid - 1; 
          }
          return 0;
      }
      vector&lt;int&gt; twoSum(vector&lt;int&gt;&amp; nums, int target) {
          vector&lt;int&gt; ret(2);
          vector&lt;int&gt; ind(nums.size());
          for(int i = 0;i &lt; nums.size();i++) ind[i] = i;
          sort(ind.begin(),ind.end(),[&amp;](int i,int j)-&gt;bool
          {
              return nums[i] &lt; nums[j];
          });
          for(int i = 0; i &lt; nums.size();i++)
          {
              if(find(nums,ind,target - nums[ind[i]],i + 1)) 
              {
                  ret[0] = ind[i];
                  ret[1] = ind[find(nums,ind,target - nums[ind[i]],i + 1)];
                  break;
              }
          }
          return ret;
      }
  };
</code></pre></li></ul><h3 id="搜索插入位置" tabindex="-1"><a class="header-anchor" href="#搜索插入位置"><span>搜索插入位置</span></a></h3><figure><img src="`+p+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>也可以用二分算法的泛型情况来写</p><pre><code>  class Solution {
  public:
      int searchInsert(vector&lt;int&gt;&amp; nums, int target) {
          int head = 0, tail = nums.size() - 1,mid;
          while(head &lt;= tail)
          {
              mid = (head + tail) / 2;
              if(nums[mid] == target) return mid;
              if(nums[mid] &lt; target) head = mid + 1;
              else tail = mid - 1;
          }
          return head ; //到这说明没有找到target，返回插入位置
      }
  };
</code></pre></li></ul><h3 id="存在重复元素" tabindex="-1"><a class="header-anchor" href="#存在重复元素"><span>存在重复元素</span></a></h3><figure><img src="`+d+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>个人做法：</p></li><li><p>先对下标数组排序，然后从前往后遍历数组，看是否出现过相同数字</p><pre><code>  class Solution {
  public:
      bool containsDuplicate(vector&lt;int&gt;&amp; nums) {
          int head ,tail ,mid;
          vector&lt;int&gt; ind(nums.size());
          for(int i = 0;i &lt; nums.size();i++) ind[i] = i;
          sort(ind.begin(),ind.end(),[&amp;](int i ,int j)-&gt;bool{
              return nums[i] &lt;nums[j];
          });
          for(int i = 0;i &lt; nums.size();i++)
          {
              head = i + 1,tail = nums.size() - 1;
              while(head &lt;= tail)
              {
                  mid = (head + tail) / 2;
                  if(nums[ind[mid]] == nums[ind[i]]) return true;
                  if(nums[ind[mid]] &lt; nums[ind[i]]) head = mid + 1;
                  else tail = mid - 1;
              }
          }
          return false;
      }
  };
</code></pre></li><li><p>船长做法：</p></li><li><p>使用哈希表来辅助，查找到则返回true，未查到则插入</p><pre><code>  class Solution {
  public:
      bool containsDuplicate(vector&lt;int&gt;&amp; nums) {
          unordered_set&lt;int&gt; s;
          for(auto x:nums)
          {
              if(s.find(x) != s.end()) return true;
              s.insert(x);
          }
          return false;
      }
  };
</code></pre></li></ul><h3 id="两个数组的交集" tabindex="-1"><a class="header-anchor" href="#两个数组的交集"><span>两个数组的交集</span></a></h3><figure><img src="`+c+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>将某个数组插入哈希表</p></li><li><p>利用set特性可以剔除相同的数字</p></li><li><p>查找到就插入结果数组</p><pre><code>  class Solution {
  public:
      vector&lt;int&gt; intersection(vector&lt;int&gt;&amp; nums1, vector&lt;int&gt;&amp; nums2) {
      vector&lt;int&gt; ret;
      unordered_set&lt;int&gt; h;
      for(auto x: nums1)  h.insert(x);
      for(auto x: nums2)
      {
          if(h.find(x) == h.end()) continue;
          ret.push_back(x);
          h.erase(x);
      }
      return ret;
      }
  };
</code></pre></li></ul><h3 id="无重复字符的最大子串" tabindex="-1"><a class="header-anchor" href="#无重复字符的最大子串"><span>无重复字符的最大子串</span></a></h3><figure><img src="`+m+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><p><strong>哈希表＋滑动窗口</strong></p><ul><li><p>用ans记录子串长度</p></li><li><p>在哈希表中找到相同字符就更新ans，并移动i，当j到字符串末尾就返回(说明是最大值)</p></li><li><p>遇到相同字符还要更新map中字符的位置，否则i移动会发生错误</p></li><li><p>要确保头指针一直向后移动</p><pre><code>  class Solution {
  public:
      int lengthOfLongestSubstring(string s) {
          unordered_map&lt;char,int&gt; h;
          int ans = 0;
          for(int i = 0;s[i];i++)
          {
              for(int j = i;j &lt;= s.size();j++)
              {
                  if(j == s.size() || h.find(s[j]) != h.end())
                  {
                      ans = max(ans,j - i);
                      if(j == s.size()) return ans;
                      i = max(i,h[s[j]] + 1);
                  }
                  h[s[j]] = j;
              }
          }
          return ans;
      }
  };
</code></pre></li></ul><p><strong>滑动窗口+二分算法</strong></p><ul><li><p>二分算法的泛型情况，查找最后一个1<br><img src="`+g+`" alt="alt text" loading="lazy"></p></li><li><p>使用ans来记录字符的个数，使用k来计算不同字符的个数</p><pre><code>  class Solution {
  public:
      bool check(string &amp;s,int l)
      {
          int ans[256] = {0},k = 0;
          for(int i = 0;s[i]; i++)
          {
              ans[s[i]] += 1;
              if(ans[s[i]] == 1) k += 1;
              if(i &gt;= l)
              {
                  ans[s[i-l]] -= 1;
                  if(ans[s[i - l]] == 0) k -=1 ;
              }
              if(k == l) return true;
          }
          return false;
      }

      int lengthOfLongestSubstring(string s) {
          int head = 0,tail = s.size(),mid;
          while(head &lt; tail)
          {
              mid = (head + tail + 1) / 2;
              if(check(s,mid)) head = mid;
              else tail = mid - 1;
          }
          return head;
      }
  };
</code></pre></li></ul><h3 id="寻找两个正序数组的中位数" tabindex="-1"><a class="header-anchor" href="#寻找两个正序数组的中位数"><span>寻找两个正序数组的中位数</span></a></h3><figure><img src="`+u+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>将问题化成求两个正序数组中第k大的值</p></li><li><p>使用二分算法的思维，各取两数组中k / 2个元素，通过比较去除k / 2个元素</p></li><li><p>将问题化成求解剩余数组中第k / 2大的值</p></li><li><p>使用递归求解</p><pre><code>  #include &lt;cinttypes&gt;
  class Solution {
  public:
      int findk(vector&lt;int&gt;&amp; n1,int ind1,vector&lt;int&gt;&amp; n2,int ind2,int k)
      {
          int n = n1.size(),m = n2.size();
          if(k == 1)
          {
              int a = (ind1 == n)?INT32_MAX:n1[ind1];
              int b = (ind2 == m)?INT32_MAX:n2[ind2];
              return min(a,b);
          }
          if(n == ind1) return n2[k - 1];
          if(m == ind2) return n1[k - 1];
          int cnt1 = min(k / 2,n - ind1);
          int cnt2 = min(k - cnt1,m - ind2);
          cnt1 = k - cnt2;
          if(n1[cnt1 + ind1 - 1] &lt;= n2[cnt2 + ind2 - 1])
          return findk(n1,ind1 + cnt1,n2,ind2,k - cnt1);
          else
          return findk(n1,ind1,n2,ind2 + cnt2,k - cnt2);
      }
      double findMedianSortedArrays(vector&lt;int&gt;&amp; nums1, vector&lt;int&gt;&amp; nums2) {
      int n = nums1.size(),m = nums2.size();
      if((n + m) % 2 == 1) return findk(nums1,0,nums2,0,(n + m) / 2 + 1);
      double a = findk(nums1,0,nums2,0,(n + m) / 2);
      double b = findk(nums1,0,nums2,0,(n + m) / 2 + 1);
      return (a + b) / 2.0;
      }
  };
</code></pre></li></ul><h3 id="奶牛围栏" tabindex="-1"><a class="header-anchor" href="#奶牛围栏"><span>奶牛围栏</span></a></h3><figure><img src="`+h+'" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><hr><p><strong>如图，显而易见，二分算法的泛型情况</strong><br><img src="'+f+`" alt="alt text" loading="lazy"></p><ul><li><p>对于二维空间，先对x坐标进行扫描，再对y坐标进行扫描，判断边长为l的正方形内草场数量是否大于等于C</p><pre><code>  #include &lt;bits/stdc++.h&gt; //hzoj244 奶牛围栏
  using namespace std;
  struct point
  {
      int x,y;
  }arr[505];

  int temp[505];

  bool cmp(const point &amp;a,const point &amp;b)
  {
      if(a.x != b.x) return a.x &lt; b.x;
      return a.y &lt; b.y;
  }

  int check_y(point *arr,int n,int c,int b,int e,int l)
  {
      int cnt = 0;
      for(int i = b;i &lt;= e;i++) temp[cnt++] = arr[i].y;
      sort(temp,temp + cnt);
      for(int i = c - 1;i &lt; cnt;i++)
      {
          if(temp[i] - temp[i - c + 1] &lt; l) return 1;
      }
  return 0;
  }

  int check(point *arr,int n,int c,int l)//l为正方形边长
  {
      int j = 0;
      for(int i = 0;i &lt; n;i++)
      {
          while(arr[i].x - arr[j].x &gt;= l) j += 1;
          if(i - j + 1 &lt; c) continue;
          if(check_y(arr,n,c,j,i,l))
              return 1;
      }
      return 0;
  }



  int bs(int l,int r,point *arr,int n,int c)
  {
      int mid = 0;
      while(l &lt; r)
      {
          mid = (l + r) / 2;
          if(check(arr,n,c,mid)) r = mid;
          else l = mid + 1;
      }
      return l;
  }



  int main()
  {
  int c,n;
  cin &gt;&gt; c &gt;&gt; n;
  for(int i = 0; i &lt; n;i++)
      cin &gt;&gt; arr[i].x &gt;&gt; arr[i].y;
  sort(arr,arr + n,cmp);
  cout &lt;&lt; bs(0,10000,arr,n,c) &lt;&lt; endl;
  return 0;
  }
</code></pre></li></ul><p><strong>check_y也可以写成如下形式</strong></p><pre><code>    int check_y(point *arr,int n,int c,int b,int e,int l)
    {
        int j = 0,cnt = 0;
        for(int i = b;i &lt;= e;i++) temp[cnt++] = arr[i].y;
        sort(temp,temp + e - b + 1);
        for(int i = 0;i &lt;= e - b;i++)
        {
            while(temp[i] - temp[j] &gt;= l) j += 1;
            if(i - j + 1 &gt;= c) return 1;
        }
        return 0;
    }
</code></pre>`,47)])])}const z=t(b,[["render",x]]),j=JSON.parse('{"path":"/ds/%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95.html","title":"查找算法","lang":"zh-CN","frontmatter":{"title":"查找算法","author":"xbZhong","isOriginal":true,"article":false,"category":"ds","timeline":true,"icon":"mingcute:code-line","description":"本页PDF 二分查找算法 在有序数组中查找值 数组和函数之间没有本质差别 数组消耗空间，函数消耗时间 因此在底层数组和函数没有区别，也就意味着二分查找算法可以应用于函数 不仅可以应用在有序数组上，也可以作用在单调函数上 二分查找泛型情况 头尾指针重合位置就是所要查找的位置 alt text 查找第一个1 alt textalt text 查找最后一个1...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"查找算法\\",\\"description\\":\\"本页PDF 二分查找算法 在有序数组中查找值 数组和函数之间没有本质差别 数组消耗空间，函数消耗时间 因此在底层数组和函数没有区别，也就意味着二分查找算法可以应用于函数 不仅可以应用在有序数组上，也可以作用在单调函数上 二分查找泛型情况 头尾指针重合位置就是所要查找的位置 alt text 查找第一个1 alt textalt text 查找最后一个1...\\"}"],["meta",{"property":"og:url","content":"https://xbzhong.cn/xbZhong/ds/%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"阿b的博客"}],["meta",{"property":"og:title","content":"查找算法"}],["meta",{"property":"og:description","content":"本页PDF 二分查找算法 在有序数组中查找值 数组和函数之间没有本质差别 数组消耗空间，函数消耗时间 因此在底层数组和函数没有区别，也就意味着二分查找算法可以应用于函数 不仅可以应用在有序数组上，也可以作用在单调函数上 二分查找泛型情况 头尾指针重合位置就是所要查找的位置 alt text 查找第一个1 alt textalt text 查找最后一个1..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image","content":"https://xbzhong.cn/xbZhong/screenshot/ds/image-61.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-01-23T15:58:13.000Z"}],["meta",{"property":"article:author","content":"xbZhong"}],["meta",{"property":"article:modified_time","content":"2026-01-23T15:58:13.000Z"}]]},"git":{"createdTime":1769183893000,"updatedTime":1769183893000,"contributors":[{"name":"XIANBO ZHONG","username":"","email":"2396768163@qq.com","commits":1}]},"readingTime":{"minutes":7.4,"words":2221},"filePathRelative":"ds/查找算法.md","excerpt":"<p><a href=\\"/pdfs/ds/%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95.pdf\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">本页PDF</a></p>\\n<h2>二分查找算法</h2>\\n<p><strong>在有序数组中查找值</strong></p>\\n<blockquote>\\n<p>数组和函数之间没有本质差别<br>\\n数组消耗空间，函数消耗时间<br>\\n因此在底层数组和函数没有区别，也就意味着二分查找算法可以应用于函数<br>\\n<strong>不仅可以应用在有序数组上，也可以作用在单调函数上</strong></p>\\n</blockquote>","autoDesc":true}');export{z as comp,j as data};
