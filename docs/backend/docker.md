---
title: Docker
description: docker容器化技术
author: xbZhong
isOriginal: true
article: true
category: backend
timeline: true
icon: devicon:docker
date: 2025-10-01
---

[本页PDF](/pdfs/backend/docker.pdf)


## Docker

**三大核心组成：镜像、容器、仓库**

**和传统虚拟机的区别**：传统虚拟机**虚拟硬件**，而docker虚拟的是**操作系统（隔离的进程）**

- docker使用宿主机内核，而传统虚拟机拥有完整的操作系统

当我们利用Docker安装应用时，Docker会自动搜索并下载应用**镜像（Image）**。镜像不仅包含应用本身，还包含应用运行所需要的环境、配置、系统函数库。Docker会在运行镜像时创建一个**隔离环境**，称为**容器（Container）**，**容器本质是一组被Linux隔离起来的进程**

```shell
docker run -d \
--name mysql \
-p 3306:3306 \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=123 \
mysql
```

- `docker run`：创建并运行一个容器，`-d`是让容器在后台运行
- `--name mysql`：给容器起个名字，必须唯一
- `-p <宿主机端口>:<容器端口>`：设置端口映射
  - docker的进程是对外隔离的
  - 外部想要访问docker进程可以通过访问宿主机的端口从而访问到docker应用

- `-e KEY = VALUE`：设置环境变量

- `mysql`：运行的镜像名

  - 一般由两部分组成：`[repository]:[tag]`

  - 其中`repository`是镜像名，`tag`是镜像版本

### 常见命令

![image-20250929204331485](/screenshot/backend/image-20250929204331485.png)

- `docker pull`：从远程仓库拉取镜像
- `docker images`：查看本地镜像
- `docker rmi`：删除本地镜像
- `docker push`：将镜像推送到远程仓库
- `docker bulid`：根据`Dockerfile`构建镜像
  - `-t`：给镜像起名称，格式是`repository:tag`
  - `.`：指定Dockerfile所在的目录，如果在当前目录，指定为`.`

- `docker save`：将镜像保存为`tar`文件
  - `-o`：后面跟文件名称
- `docker load`：从`tar`文件加载镜像
  - `docker load -i <镜像文件.tar>`
- `docker create`：创建容器，参数层面和`run`几乎一样
- `docker run`：创建并启动容器
  - `-d`：后台运行
  - `--name`：后面跟容器名字
  - `-p`：跟端口映射，`-p [宿主机端口]:[容器端口]`
  - `--network`：后面跟网络名称
  - `-e`：设置环境变量
    - 可以设置容器的环境变量
  - `--privileged`：特权模式
    - 设置为`true`则允许**容器访问宿主机设备**
  - `--hostname`：指定容器的主机名
- `docker stop`：停止运行中的容器
- `docker start`：启动已停止的容器
- `docker ps`：查看运行中的容器
  - `-a`：显示所有容器
- `docker rm`：删除容器
  - `-f`：强制删除

- `docker logs`：查看容器日志
  - `-f`：持续跟踪日志

- `docker exec`：进入容器或执行命令
  - `-it`：交互式终端
- `docker update`：对容器信息进行更新


### 命令别名

将别名写入`Shell`配置文件，如`~/.bashrc` 或者`~/.zshrc`，如下

```shell
alias dps = 'docker ps -a'
```

然后重新加载配置：`source ~/.bashrc`

可以使用`alias`查看已定义的别名

### 数据卷

**数据卷**是一个虚拟目录，是**容器内目录**和**宿主机目录**之间映射的桥梁

- 容器删除后数据仍保留
- 直接修改宿主机文件，容器内实时生效

![image-20250929210608574](/screenshot/backend/image-20250929210608574.png)

**常用命令**

- `docker volume create`：创建数据卷
- `docker volume ls`：查看所有数据卷
- `docker volume rm`：删除指定数据卷
- `docker volume inspect`：查看某个数据卷详情
- `docker volume prune`：清除数据卷

**数据挂载**

- 在执行`dokcer run`命令的时候，使用`-v 数据卷:容器内目录`可以完成数据卷挂载
- 使用`-v 本地目录:容器内目录`可以完成数据在本地目录的挂载
  - 必须以`/`或者`./`开头，否则会被识别成数据卷
  - 以`/`或者`./`开头的为**Bind Mount挂载方式**，否则为**volume**挂载方式
- 宿主机默认目录：`/var/lib/docker/volumes/`
  - 数据卷存储位置：`/var/lib/docker/volumes/数据卷名称/_data/`
- 容器默认目录：`/var/lib/docker/`
  - 数据卷存储位置：`/var/lib/docker/volumes/`



**绑定挂载**（Bind Mount）：把宿主机指定目录挂载到容器中，容器里读写这个路径，实际读写的是宿主机的文件，通常用于挂载开发代码、配置文件、源码

**Volume挂载**：由Docker管理，存储位置为Docker管理目录

### 自定义镜像

**镜像结构**

- 采用分层存储结构
- 由多个**只读层（Layers）**堆叠而成
- 可以共享很多基础的层

![image-20250929225240951](/screenshot/backend/image-20250929225240951.png)

#### Dockerfile

`Dockerfile`（**定义Docker镜像的结构和构建逻辑**）就是一个文本文件，其中包含一个个的指令，用指令来**说明要执行什么操作来构建镜像**

**常见语法**

- `FROM`：指定基础镜像
- `ENV`：设置环境变量
- `COPY`：拷贝本地文件到镜像的指定目录
- `ADD`：复制本地文件或目录到镜像中，支持自动解压和从网络自动下载
- `RUN`：执行Linux的shell命令
- `EXPOSE`：指定容器运行时监听的端口
- `CMD`：容器启动时执行，可被启动命令覆盖
- `ENTRYPOINT`：镜像中应用的启动命令，容器运行时调用

### 网络

每个容器都是一个隔离的进程，因此它们的localhost是它们自己，而不是宿主机

默认情况下，所有容器都是以bridge方式连接到Docker的一个虚拟网桥上：

![image-20250930114318613](/screenshot/backend/image-20250930114318613.png)

**加入自定义网络的容器才可以通过容器名相互访问**，常见命令如下：

- `docker network create`：创建一个网络
- `docker network ls`：查看所有网络
- `docker network rm`：删除指定网络
- `docker network prune`：清楚未使用的网络
- `docker network connect`：使指定容器加入某网络
  - `docker network connect [网络名] [容器名]`

- `docker network disconnect`：使指定容器离开某网络
- `docker network inspect`：查看网络详细信息

### DockerCompose

通过一个单独的`docker-compose.yml`文件来定义一组相关联的应用容器，帮助**我们实现多个相互关联的Docker容器的快速部署**

```dockerfile
services:
  app:
    build: .
    container_name: blog-app
    ports:
      - "8080:8080"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: "123456"
      REDIS_HOST: redis
      REDIS_PORT: 6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16
    container_name: blog-postgres
    environment:
      POSTGRES_PASSWORD: "123456"
      POSTGRES_DB: blog
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7
    container_name: blog-redis

volumes:
  postgres-data:
```

**格式**

- `version`：项目版本
- `services`：容器
  - `image`：镜像名称
  - `container_name`：容器名称（自定义）
  - `port`：端口映射
  - `environment`：环境变量
  - `volumes`：数据卷挂载
  - `networks`：网络名称
  - `build`：目录，使用这个目录下的DockerFile构建镜像
    - `context`：目录
    - `dockerfile`：DockerFile文件名
  - `depends_on`：声明依赖，控制启动顺序

- `networks`：网络配置
  - `name`：网络名称

- Compose会为每个服务在内置DNS进行注册，将服务名与容器IP绑定，容器之间可以通过服务名互相访问

**构建命令格式**

- `docker compose [OPTIONS] [COMMAND]`
- `Options`
  - `-f`：指定`compose`文件的路径和名称
  - `-p`：指定`project`名称
- `command`
  - `up`：创建并启动所有`service`容器
  - `down`：停止并移除所有容器、网络
  - `ps`：列出所有启动的容器
  - `logs`：查看指定容器日志
  - `stop`：停止容器
  - `start`：启动容器
  - `restart`：重启容器
  - `top`：查看运行的进程
  - `exec`：在指定的运行中容器执行命令


### 镜像层与容器层

**镜像层是只读的**，不可改变；**容器层可写**，容器启动时Docker在镜像最上面加一个可写层

- 若修改不在镜像层的文件，则只写在容器层
- 若修改在镜像层的文件，则发生**写时复制**
  - 从镜像层把文件拷贝到容器层
  - 在容器层修改这个副本
  - 镜像层的文件不变
- 因此多个容器可以共用一个镜像，因为每个容器只需要维护自己的可写层


**镜像分层**：Docker Image是一层一层叠起来的只读文件系统，有利于

- 复用
- 缓存
- 节省空间
- 加快构建


**Docker Build Cache**：构建缓存，Docker按层构建，每层都会缓存，某层变了，它和它后面的所有层缓存都失效

- 变化少的放前面
- 变化频繁的放后面


### Container

前面说过，容器是一组被操作系统隔离起来的进程，而**Namespace、Cgroup、OverlayFS**实现了这个隔离的功能

**常见Namespace**

- `PID Namespace`：进程隔离，宿主机和容器看到的同一进程的PID其实是不一样的
  - 容器内`PID=1`是主进程，宿主看不到容器内其他进程
- `Network Namespace`：给进程隔离出一套独立网络视图
- `Mount Namespace`：隔离文件系统挂载视图
- `UTS Namespace`：隔离主机名
- `IPC Namespace`：信号量，消息队列隔离
- `User Namespace`：容器内root可映射为宿主普通用户

**Cgroup（Control Groups）**：将一批进程分成一组，对这组进程进行资源统计和限制，包括CPU、内存、IO、进程数量、CPU权重等

- 容器内存超限会被`OOM Killer`杀掉

**OverlayFS**：联合文件系统，将多个文件系统目录叠起来，给用户展示成一个统一目录

- `LowerDir`：下方只读层，Image Layers
- `UpperDir`：上方可写层，Container Writable Layer
- `Merged`：合并之后给 Container 看到的目录

- 读取文件：从上方可写层找，找不到则往下方可读层找
- 修改文件：修改Image层的文件会发生`Copy-on-Write`，将文件复制到可写层然后进行修改
- 删除文件：删除Image层的文件时会使用**遮蔽机制，标志其被删除**，但真实文件仍然存在

### 容器栈整体流程


**容器运行时**：包括高层runtime和低层runtime

- 高层负责管理镜像、生命周期、调用低层runtime等
- 低层负责真正调用内核创建容器

```
docker CLI → dockerd → containerd → runc → Linux Kernel → 你的应用进程
```

- `docker CLI`：客户端，负责把命令发给后台
- `dockerd`：后台守护进程，接受CLI请求，管理镜像、容器、网络、卷
- `containerd`：负责容器生命周期管理，长期运行的后台服务
  - 指挥runc创建
  - 对上服务k8s，支持CRI接口；对下调用runc，支持OCI标准
- `runc`：调用Linux内核创建容器的工具
  - 给予rootfs（容器文件系统）与config.json（说明怎么跑）
  - 只认OCI Runtime Spec这个标准

**OCI（Open Container Initiative）**：制定开放**容器标准**的组织，有三套规范

- `Image Spec`：镜像格式，规定容器镜像是什么结构
- `Runtime Spec`：容器运行规范
- `Distribution Spec`：镜像分发协议

**CRI**：现在的k8s使用`Container Runtime Interface`进行接口定义，管理kubelet如何与容器runtime对接，**使 kubelet 能够使用各种容器运行时，无需重新编译集群组件**

- CRI是k8s**接口规范**，实现了CRI就可以接入k8s
- 常见实现包括containered、CRI-O
- 规定kubelet如何与容器runtime对话

```
                  Kubernetes
                      │
                    kubelet
                      │
                      │ CRI
                      │
                      ↓
                 containerd
                      │
                      │ OCI Runtime Spec
                      ↓
                    runc
                      │
                      ↓
                Linux Kernel
               Namespace/Cgroup
                      │
                      ↓
                 你的进程
```


### 网络底层

**Docker 网络 = Network Namespace + veth pair + Linux Bridge + iptables（NAT）**

**Network Namespace**：隔离网络

**veth pair**：虚拟网线，用于容器和宿主机之间进行通信

- 一头放到宿主机，一头放到容器内部，实现通信


**Linux Bridge**：虚拟交换机，容器和容器之间通信就靠这个进行中转

**iptables/NAT**：容器通过宿主机进行网络访问，数据包传回时进行NAT

- 容器进行网络访问时，使用**SNAT**改变数据包源地址，具体实现叫**MASQUERADE**
- 外部对容器进行访问时，使用**DNAT**改变目标地址

**网络模式**

- bridge：独立Namespace
- host：共享宿主机网络，但容易端口冲突
- none：完全隔离
- container：共享另一个容器网络