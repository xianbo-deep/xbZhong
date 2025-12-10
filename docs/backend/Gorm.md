---
title: Gorm
author: xbZhong
isOriginal: true
article: true
category: backend
timeline: true
icon: devicon:go
date: 2025-12-10
---
## Gorm

是Go的**ORM框架**，支持：MySQL、PostgreSQL等，但所有方法的参数都是空接口类型，不看文档很难知道要传递什么参数

**导入模块**

- 以`MySQL`为例，除了导入`Gorm`，还要导入数据库驱动

```go
import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
)

```

**连接数据库**

- 显式连接
  - 驱动会自动将`dsn`解析为对应的配置，即`mysql.Config`
  - `dsn`是数据库连接信息的字符串，里面包含：
    - 用户名
    - 密码
    - 服务器地址
    - 端口
    - 数据库名称
    - 参数：字符集、时区、是否自动把`DATETIME`转成 Go 的 `time.Time`

```go
dsn := "root:123456@tcp(192.168.48.138:3306)/hello?charset=utf8mb4&parseTime=True&loc=Local"
db, err := gorm.Open(mysql.Open(dsn))
```

- 手动传入配置，使用`mysql.Config`创建配置类

```go
db, err := gorm.Open(mysql.New(mysql.Config{
    DSN:                       "root:123456@tcp(127.0.0.1:3306)/hello?charset=utf8mb4&parseTime=True&loc=Local",
}))
```

- `gorm.Open()`方法用于提供GORM封装的**数据库操作对象**，它可以进行链式操作、事务管理、迁移等功能
- `mysql.New(mysql.Config{})`：灵活方式，可设置更多参数，
- `mysql.Open(dsn)`：简单方式，直接传数据库连接字符串

### 模型

**指定列名**



**指定表名**



**时间追踪**



### 创建

### 增加

### 修改

### 删除



### 事务



