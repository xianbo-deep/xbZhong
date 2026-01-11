<template><div><p><a href="/pdfs/ds/cpp%E5%87%BD%E6%95%B0.pdf">本页PDF</a></p>
<h3 id="memset-函数-内存块初始化函数" tabindex="-1"><a class="header-anchor" href="#memset-函数-内存块初始化函数"><span>memset()函数(内存块初始化函数)</span></a></h3>
<ul>
<li>功能：将一块内存空间的每个字节都设置为指定的值</li>
<li>通常用于初始化内存空间或删除一个内存空间</li>
<li>函数参数：void *memset(void *s,int c,size_t n);</li>
</ul>
<ol>
<li>void *s 无类型指针，指向要填充的内存块指针(告诉函数内存空间的起点)</li>
<li>int c 告诉函数要填充哪个值</li>
<li>size_t n 告诉函数一共需要初始化多少个字节的空间</li>
</ol>
<h3 id="memcpy-函数" tabindex="-1"><a class="header-anchor" href="#memcpy-函数"><span>memcpy()函数</span></a></h3>
<ul>
<li>功能：从源头指向的内存块拷贝固定字节数的数据到目标内存块</li>
<li>函数参数:void *memcpy(void *destination,const void *source,size_t)</li>
</ul>
<ol>
<li>void *destination 指向拷贝的目的地内存块</li>
<li>const void *source 指向拷贝数据来源的内存块</li>
<li>size_t 表示需要拷贝数据的字节数</li>
</ol>
</div></template>


