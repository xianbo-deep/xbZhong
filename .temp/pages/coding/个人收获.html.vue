<template><div><p><a href="/pdfs/coding/%E4%B8%AA%E4%BA%BA%E6%94%B6%E8%8E%B7.pdf">本页PDF</a></p>
<h2 id="线程、进程、协程、事件循环" tabindex="-1"><a class="header-anchor" href="#线程、进程、协程、事件循环"><span>线程、进程、协程、事件循环</span></a></h2>
<p><strong>进程</strong>（资源分配基本单位）</p>
<ul>
<li>进程可以看作是一个程序，比如小红书、王者荣耀这些**，进程有自己的独立堆栈空间**，进程间<strong>内存不共享</strong>，如果需要则需要<strong>进程通信</strong></li>
<li>进程<strong>创立/销毁都需要分配/释放资源</strong>，进程之间具有<strong>隔离性</strong></li>
</ul>
<p><strong>线程</strong>（调度执行基本单位）</p>
<ul>
<li>熟悉CPU可以从CPU核心入手，一个核心可以处理一个线程，<strong>多核心就可以执行多线程任务</strong>
<ul>
<li>线程<strong>并非越多越好</strong>，因为线程本质上是会<strong>抢占CPU资源执行任务的</strong>，表面上我们看起来是并行执行任务，实际上是<strong>CPU在瞬间不断切换去处理各个线程导致的</strong></li>
</ul>
</li>
<li>线程共享进程资源，这样会导致<strong>资源竞争问题</strong>，多个线程<strong>访问同一资源，管理不当会导致线程崩溃</strong>，常见方法有加锁（易导致死锁）</li>
<li><strong>一个进程中有多个线程</strong>，线程比进程更加轻量，<strong>线程是抢占式的</strong></li>
</ul>
<p><strong>协程</strong></p>
<ul>
<li><strong>比线程更加轻量，是由程序调度的</strong>，协程是<strong>协作式</strong>的
<ul>
<li>比如python，使用<code v-pre>await</code>的时候<strong>协程会让出CPU给其它协程执行任务</strong>，等到<strong>I/O（耗时操作，如文件读写等）操作结束后再执行自己的任务</strong></li>
<li>go、cpp都有自己的协程接口，这就是为什么大厂做后端用go比较多</li>
</ul>
</li>
<li><strong>多个协程在一个线程内交替执行</strong>，一个线程同一时刻<strong>只有一个协程进行</strong></li>
</ul>
<p><strong>事件循环</strong></p>
<ul>
<li>在js中较常见</li>
<li><strong>先</strong>处理同步任务，<strong>再</strong>处理异步任务
<ul>
<li>异步任务会有回调函数，异步任务执行完后会把<strong>回调函数放到任务队列里</strong></li>
<li>引擎执行完同步任务就会去<strong>任务队列取回调函数，执行异步任务</strong></li>
</ul>
</li>
<li>微任务和宏任务都是<strong>异步任务</strong>
<ul>
<li>微任务等级<strong>高</strong>，宏任务等级<strong>低</strong></li>
<li>引擎做完同步任务会执行完<strong>微任务队列的全部回调函数</strong></li>
<li>然后<strong>每执行一次宏任务队列的回调函数</strong>就再回到微任务队列看有没有<strong>新进来的微任务</strong></li>
</ul>
</li>
</ul>
</div></template>


