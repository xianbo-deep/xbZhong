---
title: Go
author: xbZhong
isOriginal: true
article: true
category: backend
timeline: true
icon: logos:go
date: 2025-10-11
---
## Golang的优势

由`Google`开发的语言，是一门**编译型语言**，编译出来的可执行文件（机器码）是**单独的二进制文件**，无需安装Go环境，不需要任何依赖（特殊情况除外）**即可直接运行！！！**

**`docker`和`k8s`都是基于go编写的**

- 极**简单的部署**方式

  - 可**直接编译**成机器码

  - 不**依赖其它库**

  - **直接运行**即可部署

- **静态类型**语言（动态语言**无编译器**）

  - 编译的时候可以检查出来隐藏的大多数问题

  - 语言层面的**并发**

  - 天生的基因支持

  - 可以充分利用**CPU多核**

- **强大的标准库**

  - `runtime`**系统调度**机制

    - 可以帮助做垃圾回收，资源调度等

    - 高效的GC**垃圾回收**
      - 用了三色标记、混合回收等

  - 拥有丰富的标准库

- **简单易学**

  - **25**个关键字
  - 内嵌C语法支持
  - 具有面向对象特征
  - **跨平台**

**编译、执行时间对比**

![image-20251011122440219](/screenshot/backend/image-20251011122440219.png)



## Golang基本语法

### 命令行

目前先**掌握这些即可**

- `go run`：编译并运行go程序
  - 只能运行**可执行程序**（有`main()`函数的程序）
- `go build`：编译go程序，可针对**任意包**
  - `-o`：后面跟输出文件名
- `go version`：查看go版本

### 程序结构

**`Hello World`**

```go
package main // 声明包

import "fmt" // 导入包

// 导多个包
import(
	"fmt"
    "time"
)

// 主函数
func main(){
    fmt.Println("Hello World")
}
```

**包的声明**

- `package main`表明这是一个**可执行程序**（而不是库）
  - 只有包含 `package main`的程序才能编译为可执行文件
  - 普通包编译后生成的是库文件（`.a`文件）
  - `main`包编译后生成的是**可执行二进制文件**
- 包名通常与**源文件所在目录的最后一级目录名一致**
- 一个子文件夹内的所有源文件的package声明必须一致

**包的导入**

- `import`导入了一个标准库`fmt`，这个包主要用于往屏幕输入输出字符串，格式化字符串
  - `import`后面可以接一个括号，导入多个包
  - `import`语句导入的是**文件系统的目录路径**，而不是包名
- 在`go`中，**大写开头**的功能是可以公用的（公有），**小写开头**的功能只能在包里面使用（私有）
  - 功能包括**函数、方法、变量等**
- 导包的时候会先执行要导的包的`init()`函数，形成层级调用

![image-20251011171819781](/screenshot/backend/image-20251011171819781.png)

- 可以使用`_`对**已导入但不使用的包**起**别名**，防止程序报错，但是会执行**这个包的`init()`方法**
  - 也可以在路径前指定**别名**
  - 可以使用`.`把导入的包里的方法全部引入，在当前源文件直接调用

```go
package main

import(
	_ "./lib1"
    mylib2 "./lib2"
    . "./lib3"
)

func main(){
    // 用别名启用方法
    mylib2.Lib2Test()
    
    // 直接调用方法
    Lib3Test()
}
```



**语法**

- **函数的主左括号一定要和函数名同一行**，否则编译不通过

### 基本数据类型

```go
// 布尔类型
bool

// 字符串类型
string

// 整数类型
int int8 int16 int32 int64
uint uint8 uint16 uint32 uint64 uintptr

// uint8的别名，即一个字节
byte

// int32的别名，表示一个Unicode字符，常用来表示单个字符
rune

// 浮点类型
float32 float64

// 复数类型
complex64 complex128

// 字符串类型，使用""或者``表示
string
```

### 变量声明

**四种变量的声明方式**

```go
func main(){
    // 方式一
    var a int
    // 方式二
    var b int = 100
    // 声明多个变量
    var b,c int = 1,2
    var bb,cc = 100,"zxb"
    var(
    	bbb int = 100
        ccc string = "zxb"
    )
    // 方式三
    var c = 100
    // 方法四：省略var关键字
    e := 100
}
```

**`var`**

- 基本语法：`var 变量名 变量类型`

- 使用`var`可以**自动推导变量类型**
- 用`var`声明的变量值**默认值为0**
- 使用`fmt`标准库的`Printf`方法**打印数据类型**
  - 打印数据类型：`fmt.Printf("type of a = %T",a)`，占位符用`%T`
- 可以声明**全局变量**
- 可以声明**多个变量**，可以进行**多行的多变量声明**（需要用括号括起来）

`:=`

- 使用`:=`可以实现**变量的声明和初始化**
- 可以自动推导变量类型
- 无法在函数外使用，即无法**声明全局变量**
- 可以使用`:=`快速重新赋值，而不是再声明一个

**常量的定义**

```go
const(
	BEIJING = 10*iota  // iota=0
    SHANGHAI		   // iota=1
    SHENZHEN		   // iota=2
)
func main(){
   const length int = 10
}
```

`const`

- 具有只读属性，声明后不能再次修改
- 可以**自动推断类型**
- 可以**声明全局变量**，可以使用**大括号声明多个变量**
  - 使用大括号声明的时候可以使用**关键字`iota`**，每行的`iota`都会累加1，第一行的`iota`的值是0

### 函数

```go
import "fmt"

// 示例
func fool1(a string,b int) int{
    fmt.Println("a = ",a)
    fmt.Println("b = ",b)
    
    c := 100
    return c
}

// 返回多个返回值
func fool1(a string,b int) (int,int){
    return 666,777 
}
```

**常见说明**

- `go`的函数支持多返回值
  - 声明函数返回类型需要**用括号指定多个返回值的类型**
- 函数的参数类型**写在参数名后面**，返回类型**写在函数名后面**
- 函数名推荐**驼峰命名法**
- 对于多个相同类型的参数，**可以只写一个参数类型**
- 可以使用`_`对**返回值进行忽略**

**带名称的返回值**

- 函数值的返回值可以被**命名**
  - 作用域为**当前函数范围**
- 使用空的return语句直接返回已命名的返回值

```go
func split(sum int) (x,y int){
	x = sum*4/9
	y = sum-x
	return
}

```

### 指针

和c语言的类似，在这给个例子看一下区别即可

- 接收指针类型参数的时候用`*`声明，也用`*`进行**地址的解引用**
- 用`&`获取变量的地址

```go
package main

import "fmt"

func add(n int) {
    n += 2
}

func addptr(n *int){
    // 此时n里面存的是p的地址
    *n += 2
}

func main(){
    p := 5
    add(p)
    fmt.Println(p) // p = 5
    addptr(&p)	
    fmt.Println(p) // p = 7 
}
```

### 条件判断

- `if`后面必须**要有大括号**，且不能把`if`语句写到同一行
- `if-else`判断语句**没有小括号**
- 允许在判断条件之前执行一个简单的语句，用`;`隔开，一般用于声明临时变量

```go
// 不合法
if v > 10 work()
if v > 10{ work() }

// 合法
if v > 10{
    work()
}

if st:=0 ;v > 10{
    st = 1
    work()
}
```

### switch语句

- `switch`语句后面不需要括号
- `switch`的`case`可以判断多个值
- `switch`里面的每个分支结尾自带`break`
- 可以用`fallthrough`关键字**强制进入**下一个`case`

```go
switch{
case t < 12:
    fmt.Println("")
default:
    fmt.Println("")
}
```



### 循环

- `go`只有`for`循环
- `continue`和`break`和其它语言的功能一样

```go
for{
    这是一个死循环
}

for j:=7;j < 9;j++{
    continue 
    break
}

i:=1
for i<=3{
    ++i
}
```





### defer语句

- defer后面必须是**函数调用语句**
- defer后面跟的函数会在外层函数返回之前触发
- 有多个defer的时候会**按顺序入栈**，外层函数返回之后会**依次出栈**
- **defer是在return之后执行的**

```go
import "fmt"
func main(){
    defer fmt.Println("world")
    
    fmt.Println("hello")
}// 输出 hello world
```

### Slice

切片，也就是**动态数组**（内存空间动态开辟）

**静态数组**

- `var 数组名 数组长度 数据类型 {数据}` ：定义数组，可以把数据的声明**省略**
  - 也可以用`:=`定义

```go
var myArray1 [10]int
myArray2 := [10]int
```

- `len(数组名)`：获取数组长度

```go
var myArray1 [10]int

for i:=1; i len(myArray1);i++{
    fmt.Println(i)
}
```

- `range`：可以使用这个关键字迭代数组，获取`index`（索引）和`value`（值）
  - `_`：如果不需要索引或者值，可以使用匿名变量`_`进行忽略

```go
// 表示固定长度数组
var myArray1 [10]int

// 使用range迭代数组
for index,value := range myArray1{
    fmt.Println("index = ",index,"value=",value)
}

// 使用匿名变量
for _,value := range myArray1{
    fmt.Println("value=",value)
}
```

- 对数组进行传参的时候，需要注意：

  - 数组是值传递，在函数内部修改数组的时候**只修改副本**，原数组不变，且**声明的形参的数组长度要和传入的数组长度一致**

  ```go
  // 正确
  func method(arr [5]int){
      
  }
  
  // 错误
  func method(arr [4]int){
      
  }
  
  func main(){
      arr := [5] int
      method(arr)
  }
  ```



**动态数组**

- **声明切片**：定义数组时不指定元素长度
  - 声明切片并初始化
  - 声明`nil`切片，使用`make`关键字进行空间分配
    - 第一个参数为数组类型，第二个为元素个数
  - 直接使用`make`关键字声明
  - 使用`:=`和`make`声明

```go
// 声明切片并初始化
slice1 := [int]{1,2,3}

// 声明slice是一个切片，但是并没有给slice分配空间
var slice1 []int
slice1 = make([]int,3)

// 直接使用`make`关键字声明
var slice1 []int = make([]int,3)

// 使用:=和make声明
var slice1 := make([]int,3)
```

- 传参时传递切片可以**避免拷贝**，因为切片是**引用类型**

```go
// 避免拷贝
func modifySlice(s []int) {
    s[0] = 100  // 修改会影响原数组
}

func main() {
    a := []int{1, 2, 3, 4, 5}  // 切片（非数组）
    modifySlice(a)
    fmt.Println(a[0])  // 输出 100
}
```

- `nil`切片：一个声明但未初始化的切片变量会自动设置为`nil`，**长度和容量都为0**

```go
func main() {
    var phone []int // nil类型切片
}
```

- **切片的追加**
  - 使用`make`关键字传参，定义**合法元素数量和切片总空间**
  - 可以使用`append`关键字进行切片扩容，增加**合法元素数量**，`a = append(a,value)`
    - 也可以使用`append`进行**切片对切片的追加**
    - 当切片总空间不足，底层会进行扩容，**扩容一倍**

```go
// 声明切片
var numbers = make([]int,3,5)

// 扩容
numbers = append(numbers,1)
```

- **切片的截取**
  - `s[i:]`：从i切到末尾
  - `s[:j]`： 从开头切到j(不含j)
  - 子切片的底层是**定义了一个新指针**指向**父切片的某个 位置作为子切片的起点**，而不是拷贝
  - 可以使用`copy()`函数进行**切片的拷贝**
    - `copy(s1,s2)`：把`s2`中的值拷贝给`s1`

```go
s := []int{1,2,3}

// s1的值为1，2
s1 = s[0:2]
```

### Map

**声明Map类型**

- `[]`里面存的是`key`的类型，外卖放`value`的类型
  - 使用`make`方法开辟内存空间
  - 使用`:=`直接声明
  - 声明的时候进行初始化
    - 使用**中括号**插入键值对
- 可以使用`key`和`value`直接赋值

```go
// 声明map
var myMap1 map[string]string
// 开辟内存空间
myMap1 = make(map[string][string],10)
// 直接赋值
myMap1["one"] = "php"
myMap2["tow"] = 'js'
myMap3["three"] = "go"

// 直接声明
var myMap2 := make(map[int]string,10)

// 声明的时候初始化
myMap3 := map[string][string]{
    "one":"php",
    "two":"js",
    "three":"go"
}
```

**Map的操作**

- **遍历：**使用`range`关键字进行遍历

```go
myMap3 := map[string][string]{
    "one":"php",
    "two":"js",
    "three":"go"
}

for key,value := range myMap3{
    fmt.Println("key = ",key)
    fmt.Println("value = ",value)
}
```

- **删除：**使用`delete`关键字进行删除
  - 第一个参数为map的变量名
  - 第二个参数为要删除的键值对的`key`

```go
myMap3 := map[string][string]{
    "one":"php",
    "two":"js",
    "three":"go"
}

delete(myMap3,"one")
```

- **修改：**直接根据`key`进行修改

```go
myMap3 := map[string][string]{
    "one":"php",
    "two":"js",
    "three":"go"
}

myMap3["one"] = "python"
```

- 直接进行传参的话，`map`类型是**引用传递**