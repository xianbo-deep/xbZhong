---
title: Kubernetes
author: xbZhong
isOriginal: true
article: true
category: backend
timeline: true
icon: devicon:kubernetes
date: 2025-10-18
---

[本页PDF](/pdfs/backend/Kubernetes.pdf)

[Kubernetes 文档 | Kubernetes](https://kubernetes.io/zh-cn/docs/home/)

## 概念

Kubernetes是一个容器编排框架，提供了一个**可弹性运行分布式系统**的框架

它具有以下功能：

- **服务发现和负载均衡**
- **存储编排**
- **自动部署和回滚**
- **自我修复**
- **等等......**

### 架构

**Kubernetes架构**

典型的**MASTER-WORKER**架构

- master

![image-20251017150052951](/screenshot/backend/image-20251017150052951.png)

![image-20251018161042945](/screenshot/backend/image-20251018161042945.png)

- **控制平面（Control Plane）**
  - `kube-apiserver`：负责**处理接受外来请求**的工作，是控制平面的前端
    - 无状态，可水平扩缩，缓解实例压力，分发流量
    - 支持**认证、鉴权、准入控制**
    - http端口：8080；https端口：6443
  - `etcd`：**分布式键值存储**，存储集群状态数据
    - 只有`kube-apiserver`会与`etcd`通信
  - `kube-scheduler`：负责监视**新创建的、未指定运行节点（node）的Pods**，并选择节点让Pod在上面运行，决定Pod放在哪一台Node
    - **调度两个重要步骤**：过滤、打分
  - `kube-controller-manager`：运行控制器进程，**负责调谐实际状态到理想状态**
    - 监测集群中**各种资源对象**的状态，并根据状态做出响应
    - 其是一个进程/控制平面组件，其有许多不同类型，在这不进行赘述，运行时只使用一个进程进行启动，同时**用协程并发运行不同的控制器类型实例**
- **工作节点（Worker Node）**
  - `kubelet`：**负责容器生命周期和管理本节点的Pod**，会在集群中每个节点上运行，**保证容器（containers）都运行在Pod中**
    - 会定期从`apiserver`接收新的或者修改后的pod规范，并将pod的工作信息等汇报给`apiserver`
  - `kube-proxy`：网络代理，实现**Service的负载均衡和网络规则**，让访问service的流量正确转发到背后的Pod上
    - `iptables`模式：用 iptables 规则做 DNAT（目标地址转换），随机选择 Pod
    - `IPVS`模式：用内核 IPVS（IP Virtual Server）做负载均衡，按算法选择后端
  - `Container Runtime`：负责管理 Kubernetes 环境中容器的执行和生命周期

![image-20251018160307336](/screenshot/backend/image-20251018160307336.png)


**CRI**：现在的k8s使用`Container Runtime Interface`进行接口定义，管理kubelet如何与容器runtime对接，**使 kubelet 能够使用各种容器运行时，无需重新编译集群组件**

- CRI是k8s**接口规范**，实现了CRI就可以接入k8s
- 常见实现包括containered、CRI-O
- 规定kubelet如何与容器runtime对话


#### List-Watch

k8s所有组件与API Server保持数据同步的核心机制，有俩个阶段

- 阶段一：List（全量），组件启动时先调用API Server的List接口，拉取某类资源的完整状态
- 阶段二：Watch（增量）

#### CNI

**Container Network Interface，定义容器网络配置标准**

- k8s网络模型要求：
  - 所有 Pod 之间可以直接通信，无需NAT
  - 所有 Node 和 Pod 之间可以直接通信，无需NAT
  - Pod 看到的自己的 IP 和其他 Pod 看到的它的 IP 一致
- CNI插件职责：
  - 创建/删除 veth pair
  - 分配IP
  - 配置路由

#### Kubernetes Namespace

**作用：逻辑隔离资源，不是网络隔离也不是物理隔离**

- 大多数资源，如Pod、Service、Deployment、PVC等都是**Namespace级别的**
- 而Node、PV、Namespace等属于**集群级资源**
- 命名空间内名称唯一，跨命名空间可重名

#### ServiceAccount

**给 Pod 内的进程提供身份，用于访问 API Server 或其他服务**

Pod默认会挂载一个ServiceAccount，**权限靠 RBAC 绑定**


#### RBAC

Role-Based Access Control（基于角色的访问控制），负责k8s权限管理

- 谁可以对哪些资源做什么操作
- `Subject`：用户、用户组
- `Verb`：get、list、watch、create、update、delete 等
- `Resource`：Pod、Deployment、CRD等


|对象|作用范围|作用|
|--|--|--|
|Role	|某个 Namespace 内|定义一组权限规则|
|ClusterRole|整个集群|定义一组权限规则|
|RoleBinding|某个 Namespace 内|把 Role 绑定给 Subject|
|ClusterRoleBinding|整个集群|把 ClusterRole 绑定给 Subjec|


需要写yaml文件进行**权限定义和权限绑定**

```yaml
# ClusterRole：定义权限清单
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: my-operator-role
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]

# ClusterRoleBinding：把权限发给谁
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: my-operator-binding
subjects:
  - kind: ServiceAccount
    name: my-operator-sa
    namespace: default
roleRef:
  kind: ClusterRole
  name: my-operator-role
  apiGroup: rbac.authorization.k8s.io
```

### 常见资源对象

![image-20251018153922491](/screenshot/backend/image-20251018153922491.png)

#### Node（节点）

> Node是K8s的工作单元主机，Pod是它上面运行的工作负载，控制面调度Pod到Node上运行

**概念**

- k8s集群中的工作机器，可以是**物理机或虚拟机**
- 提供计算资源来运行`pod`
- 由控制面进行**调度和管理**
- 节点上的[组件](https://kubernetes.io/zh-cn/docs/concepts/architecture/#node-components)包括`kubelet`、 容器运行时以及`kube-proxy`
- 会为每个Pod创建**一个IP地址**（集群内部IP地址），实现Pod之间的通信

![image-20251018151215574](/screenshot/backend/image-20251018151215574.png)

**说明**

- 节点名称在集群中**唯一**
- 当 `kubelet` 启动参数中 `--register-node=true` 时，节点会**自动向 API Server 注册**
- 节点的状态包括以下内容：
  - **地址**：节点的 IP、主机名等
    - `HostName`：节点主机名
    - `InternalIP`：集群内部访问节点的IP
    - `ExternalIP`：集群外部访问节点的IP
  - **状况**：表示节点是否健康、是否可调度，调度器会根据下述条件决定是否把新Pod调度到这个节点
    - `Ready`：节点是否健康
    - `MemoryPressure`：内存是否紧张
    - `DiskPressure`：磁盘是否紧张
    - `PIDPressure`：进程数是否过多
    - `NetworkUnavailable`：网络是否不可用
  - **容量与可分配**：节点可提供与已分配的资源
    - `Capacity`：节点总资源量
    - `Allocatable`：真正可供Pod使用的资源量
  - **信息**：节点的操作系统、内核、Kubelet 版本等
- 节点会通过**周期性心跳**上报状态，控制面据此判断节点是否可用

**节点心跳**

- kubelet更新节点对象的`.status`字段，告诉apiserver自己还存活
  - 每次更新需要写etcd，压力大
- 每个Node在`kube-node-lease`命名空间里面都有一个对应的**Lease对象**，kubelet 定期更新这个 Lease，控制平面依靠这个判断 Node 是否存活 
  - 写入数据量小，压力小

**Node制备**：创建新的 Node 并加入集群


- Cluster Autoscaler（自动扩缩器）会根据 Pending Pod 自动增减节点，但其**本身不负责调度**

> 除了CA（Cluster Autoscaler），还有HPA（Horizontal Pod Autoscaler）、VPA（Vertical Pod Autoscaler）
>
> - CA根据Pending Pod自动增删Node（节点）
> - HPA负责根据指标自动增减Pod副本数
> - VPA自动调整Pod的`requests`和`limits`
>   - `requests`是容器对资源的最低需求声明，也是**调度器分配资源的唯一依据**
>   - `limits`是容器的资源使用上限

- 需要满足两个约束才能增删节点
  - **Pod调度约束**：如资源请求，节点亲和性，污点与容忍等
  - **Autoscaler配置的Node约束**：如节点数量上下限，机型等

**Node整合**：将利用率低的Node上的Pod移走，并删除这个Node

- **节点利用率低**：requests总和远小于节点容量
- **空节点优先整合**
- **非空节点整合有破坏性**：被整合的Node的Pod需要重建并且被调度到其它节点

**污点与容忍度**

- **污点**：写在 Node 上，使节点能够排斥一类特定的 Pod，有下列三种 Effect
  - `NoSchedule`：不让不容忍的新 Pod 来，不动已有 Pod（无论是否容忍）
  - `PreferNoSchedule`：尽量不让不容忍的新 Pod 来，不动已有 Pod（无论是否容忍）
  - `NoExecute`：不让不容忍的新 Pod 来，赶走已有的不容忍的 Pod
- **容忍度**：写于 Pod 上，允许调度器调度 Pod 到带有对应污点的 Node 上


**节点亲和性与反亲和性**：定义在 Pod 上，支持在 Pod 上自定义动态规则

- 亲和性：Pod 倾向于去某些 Node
- 反亲和性：Pod 倾向于不去某些 Node
- 两种策略模式
  - `requiredDuringSchedulingIgnoredDuringExecution`：Pod 必须调度到满足条件的节点，否则不调度
  - `preferredDuringSchedulingIgnoredDuringExecution`：Pod 尽量调度到满足条件的节点，但不强求

**NodeSelector 和 NodeAffinity**

- `NodeSelector`：Pod 声明一个标签键值对，调度器只把 Pod 放到拥有该标签的 Node 上
  - 只能等值匹配，不满足就 Pending
- `NodeAffinity`：节点亲和性，Pod 声明一组表达式，调度器根据表达式匹配节点标签
  - 支持硬性（required）和软性（preferred） 两种策略
  - 支持多个条件组合，能进行更灵活的节点选择



#### Pod

- k8s中的最小部署单元，但不是一个稳定的实体，容易**被创建和销毁**
  - 发生故障的时候k8s会销毁pod，并创建一个新的pod进行替代
- 一个Pod里可以有一个或多个容器（Container），**共享网络和存储**
- 一个Pod只有一个IP
- 使用多个容器应当是这多个容器**紧密关联**，否则应该拆分为多个Pod部署

**共享资源**

- PID 命名空间：Pod 中的不同应用程序可以看到其他应用程序的进程 ID
- 网络命名空间：Pod 中的多个容器能够访问同一个IP和端口范围
- IPC 命名空间：Pod 中的多个容器能够使用 SystemV IPC 或 POSIX 消息队列进行通信
- UTS 命名空间：Pod 中的多个容器共享一个主机名
- Volumes（共享存储卷）：Pod 中的各个容器可以访问在 Pod 级别定义的 Volumes

**生命周期**

- `Pending`：Pod 已创建，但容器还没启动
- `Running`：Pod 已调度到节点，容器正在运行
- `Succeeded`：Pod 的所有容器正常退出
- `Failed`：至少一个容器异常退出
- `Unknown`：无法获取 Pod 状态

**重启策略**：可以通过`restartPolicy`字段进行重启策略设置

- `Always`：容器挂了就重启（默认）
- `OnFailure`：异常退出才重启
- `Never`：从不重启

**镜像拉取策略**：通过`imagePullPolicy`字段控制

- `Always`：每次启动容器都去仓库拉最新镜像
- `IfNotPresent`：节点上已有该镜像就不拉，没有才拉
- `Never`：只用本地镜像，没有就失败

**探针**： kubelet 用来检查容器健康状态的机制

- `livenessProbe`：存活探针，检测容器是否还在正常运行，失败时根据重启策略进行重启
- `readinessProbe`：就绪探针，失败时控制器会将此pod从对应service的endpoint列表中移除，从此不再将任何请求调度到此Pod上，**并不重启容器**
- `startupProbe`：启动探针，检测容器是否启动完成，启动期间，**存活探针和就绪探针都不生效，避免应用启动时间太长导致被kill**
- **常用参数**
  - `initialDelaySeconds`：表示在容器启动后延时多久秒才开始探测
  - `periodSeconds`：表示执行探测的频率，即间隔多少秒探测一次
  - `timeoutSeconds`：表示探测超时时间,容器必须在超时时间范围内做出响应，否则视为本次探测失败
  - `successThreshold`：表示最少连续探测成功多少次才被认定为成功
  - `failureThreshold`：表示连续探测失败多少次才被认定为失败

**终止流程**

- 用户/控制器发起删除
- apiServer将 Pod 状态更新成 Terminating，被标记为 deletionTimestamp
- Pod 从 Service 的 Endpoint 删除，不再接收新流量，与此同时kubelet 监听到 Pod 要被删除
- 执行 preStop 钩子
- kubelet 向容器主进程发送 SIGTERM 信号
- 等待优雅退出，若退出超时，kubelet 发送 SIGKILL，强制杀掉进程



**Pod亲和性和反亲和性（affinity与AntiAffinity）**

- Pod 亲和性：希望当前 Pod 和某些 Pod 调度到**同一个拓扑域**
- Pod 反亲和性：希望当前 Pod 和某些 Pod 调度到**不同拓扑域**
- `requiredDuringSchedulingIgnoredDuringExecution`：Pod 必须调度到满足条件的拓扑域，否则不调度
- `preferredDuringSchedulingIgnoredDuringExecution`：Pod 尽量调度到满足条件的拓扑域，但不强求

**节点拓扑分布约束**：目标是让同一组 Pod **在不同的故障域里尽量均匀分布**，避免全挤在一个节点或可用区，遇到一个故障就全挂（一个域里面有多个Node）

- `maxSkew`：最大不均衡度，设为 1 时，任意两个域中 Pod 数量差小于等于1
- `topologyKey`：按什么方式进行分布，如节点、域，决定了调度时是把节点当作最小单位，还是把 zone / region当作最小单位
- `whenUnsatisfiable`：不满足约束时怎么办
  - `DoNotSchedule`：硬性，不满足则继续 Pod Pending
  - `ScheduleAnyway`：软性，仍然调度，但优先选偏斜最小的节点


**QoS类**：根据 Pod 的**资源请求（request）和限制（limit）**自动划分的优先级等级，用来决定节点资源紧张时，先驱逐谁、后驱逐谁（前提是 Pod 超用资源，实际用量超过request）

- `Guaranteed`：优先级最高，最不容易被驱逐，Pod 中每个容器的 CPU 和内存都必须同时设置 request 和 limit
- `Burstable`：优先级第二高，不满足`Guaranteed`条件，但至少有一个容器设置了 request 或 limit
- `BestEffort`：优先级最低，节点资源不足时**第一个被驱逐**，所有容器都没有设置任何 CPU/内存的 request 或 limit

**Pod的特殊类型**

- 静态Pod：节点上的 kubelet 直接管理，不受 apiServer 控制，被存放到某个具体的 Node 上的具体文件当中，并且只在该 Node 上启动、运行，不能被调度到其他节点
- 自主式Pod：
- 动态Pod

##### Init 容器

主容器启动之前运行的专用容器

- **运行时机**：主容器启动之前运行
- **执行顺序**：多个 Init 容器串行执行
- **生命周期**：执行完就退出，不会一直运行
- **失败行为**：失败则 Pod 重启，直到成功
- **主要用途**：初始化配置、等待依赖、准备数据
- **不支持探针**

##### Sidecar 容器

**边车容器是和主容器一起运行、辅助主容器工作的容器**

- **运行时机**：和主容器**同时运行**
- **执行顺序**：并行，不分先后
- **生命周期**：和主容器**同生共死**
- **用途**：辅助主容器（日志、代理、监控）
- 与主容器共享网络和数据卷
- 边车容器支持探针来控制其生命周期



#### Service

**为一组Pod提供稳定的访问入口和服务发现**

- 定义服务访问规则和抽象，实际由`kube-proxy`实现转发
- 负责TCP/UDP连接，OSI四层
- Pod的IP会变，Service负责提供一个虚拟IP（Cluster IP），让别人能稳定访问到 Pod

![image-20251018151814388](/screenshot/backend/image-20251018151814388.png)

- 可以提供服务发现，实现负载均衡，类似**网关**
- 可以为**内部服务**和**外部服务**提供访问入口
  - 使用节点的IP地址和端口号映射到`Service`的IP地址和端口号是实现**外部服务**

**四种类型**

- `ClusterIP`：集群内部虚拟 IP，仅限集群内部访问
- `NodePort`：每个节点开一个端口，范围为30000-32767
- `LoadBalancer`：云厂商负载均衡器
- `ExternalName`：DNS别名，起一个别名，别名指向真实IP，应用代码使用别名访问

**端口**

- `nodePort`：节点端口
- `port`：Service的端口
- `targetPort`：Pod的端口


**EndpointSlice**：保存 Service 当前可以访问的后端 Endpoint

- 由 EndpointSlice Controller 自动维护
- 把一个 Service 的端点拆成多个 slice，**减少对象体积，降低更新放大**
- **CoreDNS**负责集群内 DNS 解析，将域名转换为IP

#### Ingress

 **集群外部访问集群内服务的统一入口**

![image-20251018152403502](/screenshot/backend/image-20251018152403502.png)

- 可以根据**请求的域名和路径**转发到不同的 Service 上
- 负责HTTP/HTTPS 等协议内容，OSI七层
- 可配置不同的转发规则
- 可实现负载均衡，配置SSL证书

#### ConfigMap

存储**非敏感配置数据**的资源对象，用于将配置从容器镜像中分离出来，使Pod可以动态获取配置

- 存储明文信息，不建议存储敏感信息
- 使**应用程序和配置解耦**，配置变更时不用重新构建镜像
- 方便Pod进行配置的动态获取

#### Secret

存储**敏感配置数据**的资源对象

- 默认使用**base64编码**存储，不直接明文展示
- 并不是一种加密方式，需要配合k8s其他组件实提高安全性

#### Volumes

**实现Pod数据的持久化存储**

![image-20251018153151400](/screenshot/backend/image-20251018153151400.png)

- 可以实现数据持久化，保存应用运行产生的文件，防止文件丢失
- 可以实现**容器间共享数据**
- 可直接挂载**宿主机目录**进行存储，也可以绑定**外部远程存储**


**临时卷**：生命周期跟着 Pod 走

- `emptyDir`：Pod 调度到节点时创建，Pod 删除就没了
- `hostPath`：直接把宿主机目录挂进容器。Pod 删了数据还在，但不能跨节点迁移，且安全风险高




**持久卷**：脱离 Pod 的生命周期，一个 PVC 只能绑定一个 PV

- **PV（PersistentVolume）**：集群级别的存储资源，生命周期独立于任何 Pod
- **PVC（PersistentVolumeClaim）**：用户/应用对存储的申请单，声明需求，系统找到符合要求的 PV 进行绑定
- **StorageClass**：动态供给的模板，创建 PVC 时会自动创建对应的 PV 并自动进行绑定



**CSI（Container Storage Interface）**：容器存储接口

- 不同云盘的创建方式、挂载方式、扩容方式都是完全不一样的，因此需要CSI让云厂商实现这个接口，就可以接入k8s，被k8s使用
- 包括以下标准操作
  - `CreateVolume`：创建一块盘
  - `DeleteVolume`：删除一块盘
  - `ControllerPublish`：把盘挂到某个节点
  - `NodeStage/NodePublish`：在节点上把盘挂进容器
  - `CreateSnapshot`：给盘打快照
  - `ExpandVolume`：扩容

**卷模式**：决定卷以什么形式呈现给 Pod

- `Filesystem`：卷被挂载为一个目录，Pod 像用普通文件夹一样读写文件
- `Block`：卷以原始块设备的形式直接给 Pod，中间没有文件系统层
  - 就是一块磁盘，无文件、目录的概念，需要自己管理数据布局

**volumeBindingMode**：决定 PVC 什么时候绑定 PV

- `Immediate`：先绑定，再调度
  - 创建 PVC
  - 立刻找 PV 绑定
  - 创建 Pod
  - 调度器决定 Pod 去哪个节点
  - 如果 Pod 去的节点访问不了这个 PV ,挂载失败
- `WaitForFirstConsumer`：先调度，再绑定
  - 创建 PVC
  - 不绑定，等 Pod 调度
  - 创建 Pod
  - 调度器决定 Pod 去 node1
  - 根据 node1 的位置，绑定一个 node1 能访问的 PV
  - Pod 挂载成功

**PV四种状态**

- `Available`：空闲，可被绑定
- `Bound`：已绑定某个 PVC
- `Released`：PVC删了，但回收策略是 Retain，等待手动处理
- `Failed`：自动回收失败


**PV/PVC访问模式**

- `ReadWriteOnce`：单节点读写，同一时间只能被一个节点挂载读写
- `ReadOnlyMany`：多节点只读，可以被多个节点同时挂载，但只能读，不能写
- `ReadWriteMany`：多节点读写，可以被多个节点同时挂载，并且能同时读写
- `ReadWriteOncePod`：单 Pod 读写，同一时间，只能被一个 Pod 挂载读写。连同一节点上的其他 Pod 都不行


**回收策略**：PVC被删除后，它绑定的那块PV该怎么办

- `Retain`：保留
- `Delete`：直接删除
- `Recycle`：清空数据，留着盘（已废弃）



#### Deployment

负责**管理和控制 Pod 的运行与副本数量**，**无状态应用的核心控制器**

- 适合管理**无状态应用**
- 可自动维持期望副本数，执行**Pod的自动重建**
- 支持版本回滚、平滑更新
- 用来管理 **ReplicaSet**，ReplicaSet管理 Pod

**升级策略**

- `Recreate`：重建更新，会杀掉所有正在运行的 Pod，然后再重新创建新的 Pod
- `rollingUpdate`：滚动更新，会以滚动更新的方式来逐个更新pod，同时通过设置滚动更新的两个参数`maxUnavailable`、`maxSurge`来控制更新的过程
  - `maxSurge`：最大激增数，更新时，最多可以比期望副本数多出几个 Pod
  - `maxUnavailable`：最大不可用数，更新时，最多允许几个 Pod 处于不可用状态

#### ReplicaSet

**确保指定数量的 Pod 副本始终在运行**

- 通过 apiServer 监听 Pod 数量，对比期望副本数进行增删
- 无版本回滚和滚动更新的能力
- 一个版本一个`ReplicaSet`，`Deployment`通过使用不同版本的`ReplicaSet`进行版本回滚

#### StatefulSet

用于**部署和管理有状态应用**的控制器

- 适合管理有状态应用
- 可以保证**Pod的唯一标识、启动顺序和停止顺序受控、稳定的存储卷**
- 给予每个 Pod 固定的身份（名字、网络、存储），每个 Pod 有独立的 PVC
- 删除 StatefulSet 的时候**不会自动删除 PVC**，需要手动删除


**行为特征**

- 有序创建：从0到 N-1，顺序创建
- 有序删除：从 N-1 到 0，顺序删除
- 有序更新
  - 逆序更新：若更新失败，重建此 Pod，不影响前面的 Pod
  - 手动更新：更改模板后需手动删除 Pod 才能触发更新
  - 分区更新：只更新一部分的 Pod，确保没问题才继续更新别的

**Headless Service**

- 相较于普通 Serivce，**无 Cluster IP，不负责负载均衡，直接返回后端 Pod 的IP列表**
- 和 StatefulSet 配套使用，因为 StatefulSet 的 Pod 需要固定的 DNS，而 Headless Service 可以直接返回 Pod 的 ip

**volumeClaimTemplates**

- 模板，写完后自动为**每个 Pod 创建一个独立 PVC**

#### DaemonSet

**确保集群中每个节点上都运行一个 Pod 副本**

- 新节点加入会自动创建 Pod
- 副本数自动等于节点数
- 默认行为：每个节点创建一个Pod，但会**自动加上节点亲和性**
- 也可以用`nodeSelector`实现在部分节点上跑
- **自动容忍一些系统污点**，节点有问题时，DaemonSet 的 Pod 也要能跑


#### Job

**创建一个或多个 Pod，直到指定数量的 Pod 成功结束**

- `completions`：需要成功几次
- `parallelism`：同时跑几个Pod
- `backoffLimit`：失败重试次数
- `activeDeadlineSeconds`：超时时间
- `restartPolicy`：重启策略
  - `Never`：容器失败不重启，每次失败都创建新 Pod
  - `OnFailure`：容器失败重启同一个 Pod

#### CronJob

**用来定时运行 Job 的控制器**

|字段|范围|特殊字符|
|---|---|---|
分|	0-59	|* , - /
时|	0-23	|同上
日|	1-31	|同上
月|	1-12	|同上
周|	0-6（0=周日）|同上

- `schedule`：Cron 表达式（分、时、日、月、周）
- `concurrencyPolicy`：并发策略
  - `Allow`：允许并发，前一个没跑完也创建新的
  - `Forbid`：禁止并发，前一个没跑完就跳过本次
  - `Replace`：替换，前一个没跑完就杀掉，创建新的
- `startingDeadlineSeconds`：如果到了执行时间，但因为集群故障没创建 Job，允许多久内补创建
- `successfulJobsHistoryLimit`：保留几个成功的Job
- `failedJobsHistoryLimit`：保留几个失败的Job
- `suspend`：是否暂停，暂停后不再创建新 Job

### 二次开发

#### Controller

k8s的一种控制逻辑，主要负责将**当前状态调谐至目标状态**，可以理解成是一个循环，不断检查当前状态，当状态偏离时将当前状态调谐至目标状态，称之为**Reconcile Loop**

- Observe（观察）：获取当前实际状态，以及用户声明的期望状态
- Compare（比较）：判断当前状态和期望状态是否一致
- Update（更新）：采取操作，让实际状态向期望状态靠近


当实际状态和期望状态不一致时才允许更新资源，也就是**调谐过程应该要具有幂等性**



#### Operator

k8s自带的controller只认识k8s自带的资源，当我们需要自定义资源让k8s管理时，就需要自己实现Controller，而当这个Controller还包含大量针对某个应用的操作，如故障转移、状态管理、版本回滚升级，就称其为**Operator**

**组成部分**

- **CRD**：自定义资源定义
- **CR**：自定义资源，CRD的实例
- **Controller**：控制器



##### Informer机制

**不给 API Server 造成巨大压力的前提下，实时感知集群中资源的变化**


内部有一个 **Reflector**，通过 **List-Watch** 机制与API Server通信

- List：初始化时，拉取指定资源的全量数据并记录**版本号（resourceVersion）**
- Watch：通过HTTP长连接持续监听，由API Server推送**增量事件**
- 这些事件被放进 **DeltaFIFO 队列**中，然后由 Informer 内部 消费队列里的事件并存到 **Indexer（本地缓存）**，同时将事件分发给注册的 **EventHandler**，调用提前写好的回调函数
  - DeltaFIFO 队列里保存的是资源对象及其变化类型
- EventHandler再把资源的**Name/Namespace**放进 Controller 的 **Working Queue**
  - **Working Queue**放的是资源的**Name/Namespace**，而不是完整对象，这样控制器想要获取最新对象就只需要根据队列里的Name查询**Indexer**即可
  - **Working Queue**会进行**去重**，对同一个 key 做合并/去重处理


##### Leader Election

保证多个 **Manager** 只有一个在工作的机制，防止多个 **Manager** 对同一个资源进行操作导致发生错误

靠k8s的**Lease对象**进行Leader的选择，存储在etcd（集群级别）

- 每个副本启动后，都去抢这个对象
- 抢到的人是Leader
- Leader定期续约，证明自己还存活
- 其它副本尝试抢，抢不到就等待
- Leader挂了，不再续约，Lease过期，其他副本进行争抢

##### Finalizer机制

**延迟资源删除的机制**，让控制器有机会在资源被真正删除前，执行一些清理工作

- 创建自定义资源时，加上 Finalizer
- 当用户执行删除时，控制器发现自定义资源有 Finalizer，执行清理逻辑
- 当清理完成后，控制器移除 Finalizer
- k8s删除自定义资源

Finalizer加在CRD的yaml文件里，通常用`<域名>/<名称>`格式，避免冲突


#### Reconcile函数

**Reconcile 函数什么时候会被调用**

- 用户修改自定义资源
- 控制器自己更新对象
- 控制器刚启动时
- 各种重试情况

**需要注意防止 Reconcile 陷入死循环，在实例被更新的时候不要重复创建实例！！！**

**返回值**

- `Result`
  - `Requeue`：是否重新排队调谐
  - `RequeueAfter`：指定一个延迟时间，在多久之后重新排队调谐。如果大于 0，则隐含了`Requeue`为 true，无需同时设置`Requeue`
- `error`



## Minikube

迷你版的`Kubernetes`，可以在本地部署**一个完整的单节点Kubernetes集群**


## kubectl

命令行工具，和k8s集群通信的客户端，可以通过它向 API Server 发请求，从而操作集群

**集群与配置**

- `kubectl version`：查看客户端和服务端版本
- `kubectl cluster-info`：查看集群信息
- `kubectl get nodes`：查看集群节点
- `kubectl config view`：查看kubeconfig配置

**查看资源**

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get nodes
kubectl get namespaces
kubectl get crd

# 缩写
kubectl get po
kubectl get deploy
kubectl get svc
kubectl get ns
```

- `kubectl get pods`：列出当前命名空间的Pod
  - `kubectl get pods -A`：列出所有命名空间的Pod
  - `kubectl get pods -n <namespace>`：指定命名空间
  - `kubectl get pods -w`：持续观察 Pod 状态变化
- `kubectl get pods -o wide`：显示更多信息（IP、节点等）
- `kubectl describe <resource> <name>`：查看资源详情
- `kubectl logs <pod>`：查看日志，deployment、job也支持
  - `kubectl logs <pod> -f`：实时跟踪
  - `kubectl logs <pod> -c <container>`：查看指定容器

**创建与修改**


- `kubectl run <name> --imgae=<image>`：创建 Pod 资源
- `kubectl apply -f app.yaml`：声明式创建/更新，资源存在时更新
- `kubectl create -f app.yaml`：按文件创建资源，资源存在时报错
  - `kubectl create <resource> <name>`：快速创建
    - `--replicas`：指定副本数，deployment才支持
    - `--image`：镜像，deployment才支持
- `kubectl delete -f app.yaml`：按文件删除资源
  - `kubectl delete <resource> <name>`：删除资源
- `kubectl set image deploy/<name> <container>=<image>`：更新镜像

**发布管理**


- `kubectl rollout status deploy/<name>`：查看滚动更新状态
- `kubectl rollout undo deploy/<name>`：回滚到上一版本
- `kubectl rollout history deploy/nginx`：查看历史版本


**进入容器与调试**

- `kubectl exec -it <pod> -- bash`：进入容器
- `kubectl exec -it <pod> -c <container> -- bash`：指定 Pod 里的容器
- `kubectl port-forward my-pod 8080:80`：把本地电脑的端口转发到集群里 Pod 的端口，让你能直接在本机访问 Pod
- `kubectl port-forward svc/<name> 8080:80`：转发到 Service

**编辑与查看yaml**

- `kubeclt edit <resource>/<name>`：编辑集群资源
- `kubeclt get <resource> <name> -o yaml`：查看资源完整yaml


## kubebuilder

**Makefile**：自动化构建工具的配置文件，将长串命令封装成简单的命令，提高开发效率

- `make manifests`：生成 CRD yaml
- `make generate`：生成自动代码
- `make install`：把 CRD 安装到当前集群
- `make deploy`：把 Operator 部署到集群
- `make undeploy`：卸载 Operator
- `make run`：本地跑控制器，连接到集群调试


**Webhook**：在对象写入 etcd 之前，拦截请求并执行你自定义的逻辑

**常见命令**

- `kubebuilder version`：查看当前安装的版本
- `kubebuilder init`：初始化项目，生成基本的代码框架和Makefile
  - `--domain`：API组名的后缀，组名=group+domain
  - `--repo`：指定项目的Go module路径
- `kubebuilder create api`：创建新的 API（CRD）和对应的控制器代码
  - `--group`：资源属于哪个组，必填
  - `--version`：资源属于哪个版本，必填
  - `--kind`：资源叫什么名字，必填
- `kubebuilder create webhook`：创建 Webhook 代码
  - `--group`：资源属于哪个组，必填
  - `--version`：资源属于哪个版本，必填
  - `--kind`：资源叫什么名字，必填


**自定义资源**：Spec/Status分离

- `TypeMeta`：apiVersion和kind
- `ObjectMeta`：name、namespace等等
- `Spec`：用户需要的
- `Status`：Controller 执行之后，实际发生了什么


**例子**

```yaml
apiVersion: compute.domain.com/v1
kind: EC2Instance
metadata:
  name: my-instance
  namespace: default

spec:
  amiID: ami-xxx
  keyName: my-key
```

```go
type EC2InstanceSpec struct {
    AMIID   string `json:"amiID,omitempty"`
    KeyName string `json:"keyName,omitempty"`
}

type EC2InstanceStatus struct {
    InstanceID string `json:"instanceID,omitempty"`
    Phase      string `json:"phase,omitempty"`
    PublicIP   string `json:"publicIP,omitempty"`
}

type TypeMeta struct {
    Kind       string
    APIVersion string
}

type EC2Instance struct {
    metav1.TypeMeta   `json:",inline"`
    metav1.ObjectMeta `json:"metadata,omitempty"`

    Spec   EC2InstanceSpec   `json:"spec,omitempty"`
    Status EC2InstanceStatus `json:"status,omitempty"`
}

type EC2InstanceList struct {
    metav1.TypeMeta `json:",inline"`
    metav1.ListMeta `json:"metadata,omitempty"`

    Items []EC2Instance `json:"items"`
}
```