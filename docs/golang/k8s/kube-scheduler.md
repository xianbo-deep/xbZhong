---
title: kube-scheduler
author: xbZhong
isOriginal: true
article: true
date: 2026-10-07
---

`cmd/kube-scheduler/app`：


```go
func init() {
	utilruntime.Must(logsapi.AddFeatureGates(utilfeature.DefaultMutableFeatureGate))
	utilruntime.Must(features.AddFeatureGates(utilfeature.DefaultMutableFeatureGate))
}
```

初始化**特性门控**，若过程中出现错误则直接退出进程

这个特性门控主要是用于控制k8s功能启用或者禁用的配置开关，每个特性门控都有明确的成熟度阶段：

- `Alpha`：默认禁用。属于早期实验室阶段，可能包含缺陷
- `Beta`：通常默认禁用。功能相对稳定
- `GA`：稳定，默认始终启用。功能已经正式发布


定义了三层逐级增强的接口：

- `FeatureGate`：只读，只能用来查询门控状态
- `MutableFeatureGate`：既可读，也可以写
- `MutableVersionFeatureGate`：支持根据版本设置特性默认值

```go
var _ MutableVersionedFeatureGateWithLogger = &featureGate{}
var _ MutableFeatureGateWithLogger = &featureGate{}
```

存在于**编译期的断言**，若未实现接口对应方法则提早报错，是一种防御性编程方法


`pkg/scheduler/scheduler.go`

缓存的实现

调度器的实现

```go
type PriorityQueue struct {
    *nominator

    stop  chan struct{}
    clock clock.WithTicker
    lock  sync.RWMutex

    activeQ  activeQueuer
    backoffQ backoffQueuer

    unschedulableEntities *unschedulableEntities

    pendingPodGroupPods    *podGroupMemberPods
    incompletePodGroupPods *podGroupMemberPods
    workloadForest         *workloadForest

    preEnqueuePluginMap map[string]map[string]fwk.PreEnqueuePlugin
    queueingHintMap     QueueingHintMapPerProfile

    // 其他配置和 Feature Gate
}
```



`staging/src/k8s.io`：