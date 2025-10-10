---
title: 没啥用
author: xbZhong
isOriginal: true
article: false
category: ds
timeline: true
icon: hugeicons:cpp
---
### memset()函数(内存块初始化函数)
* 功能：将一块内存空间的每个字节都设置为指定的值
* 通常用于初始化内存空间或删除一个内存空间
* 函数参数：void *memset(void *s,int c,size_t n);
1. void *s 无类型指针，指向要填充的内存块指针(告诉函数内存空间的起点)
2. int c 告诉函数要填充哪个值
3. size_t n 告诉函数一共需要初始化多少个字节的空间

### memcpy()函数
* 功能：从源头指向的内存块拷贝固定字节数的数据到目标内存块
* 函数参数:void *memcpy(void *destination,const void *source,size_t)
1. void *destination 指向拷贝的目的地内存块
2. const void *source 指向拷贝数据来源的内存块
3. size_t 表示需要拷贝数据的字节数
