import{_ as t,c as i,a as e,o as l}from"./app-gbTnBwX4.js";const o="/xbZhong/screenshot/ds/image.png",r="/xbZhong/screenshot/ds/image-1.png",a="/xbZhong/screenshot/ds/image-2.png",s={};function c(p,n){return l(),i("div",null,[...n[0]||(n[0]=[e('<p><a href="/pdfs/ds/%E9%80%92%E5%BD%92%E5%AE%9E%E7%8E%B0%E6%9E%9A%E4%B8%BE.pdf" target="_blank" rel="noopener noreferrer">本页PDF</a></p><h2 id="递归实现指数型枚举" tabindex="-1"><a class="header-anchor" href="#递归实现指数型枚举"><span>递归实现指数型枚举</span></a></h2><p>这一栏十分抽象 隐晦难懂 没有计算机思维难以想到，也难以理解<br><em><strong>题目如下</strong></em><br><img src="'+o+`" alt="alt text" loading="lazy"></p><blockquote><p>对于这道题，我们依旧采取递归的思想来解决</p><ul><li>设计函数f（i，j，n） <ul><li>其中i表示一个位置</li><li>j表示i位置能存放的最小数字</li><li>n表示i位置能存放的最大数字</li></ul></li><li>边界条件：<strong>j &gt; n</strong></li><li>f（i，j，n）可以分成多种情况 <ul><li>i取j的情况下加上f（i+1，j+1，n）</li><li>i取j+1的情况下加上f（i+1，j+2，n）</li><li>i取j+2的情况下加上f（i+1，j+2，n）</li><li>.............<br><strong>因此当i位置存放的数字j&gt;n时，不满足题目要求，return即可</strong></li></ul></li></ul></blockquote><p>代码实现：</p><pre><code>#include&lt;iostream&gt;
using namespace std;
int arr[10];
void print(int n)
{
    for(int i=0;i&lt;=n;i++)
    {
        if(i) cout&lt;&lt;&quot; &quot;; 
    cout&lt;&lt;arr[i];    
    }
    cout&lt;&lt;endl;
}
int f(int i,int j,int n)
{
    if(j&gt;n) return 0 ;  //边界条件
    for(;j&lt;=n;j++)
    {
        arr[i]=j;
        print(i);       //循环起始下标是0，因此循环上限应是i，即当前状态的位置，因为要遍历
        f(i+1,j+1,n);   到起始位置到当前位置并进行输出
    }
}
int main()
{
    int n;
    cin &gt;&gt; n;
    f(0,1,n);  //起始状态
    return 0;
}
</code></pre><h1 id="递归实现组合型枚举" tabindex="-1"><a class="header-anchor" href="#递归实现组合型枚举"><span>递归实现组合型枚举</span></a></h1><figure><img src="`+r+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><blockquote><ul><li>设计函数f（i，j，n，m） <ul><li>i表示当前位置</li><li>j表示当前位置可选的最小值</li><li>n表示当前位置可选的最大值</li><li>m表示可选的数字的个数</li></ul></li><li><strong>边界条件：</strong> i==m <strong>i是从位置0开始，因此只需枚举到m-1即可</strong></li><li>f（i，j，n）可以分成多种情况 <ul><li>i取j的情况下加上f（i+1，j+1，n）</li><li>i取j+1的情况下加上f（i+1，j+2，n）</li><li>i取j+2的情况下加上f（i+1，j+2，n）</li><li>.............</li></ul></li></ul></blockquote><pre><code>#include&lt;iostream&gt;
using namespace std;
int n,m;
int a[10];
void print(int m)
{
    for(int i=0;i&lt;m;i++)
        cout &lt;&lt; a[i]&lt;&lt;&quot; &quot; ;
        cout&lt;&lt;endl;
}
void f(int i,int j,int n,int m)
{
    if(i==m){print(m);return;}
    else
    {
        for(;j&lt;=n &amp;&amp; m-1-i&lt;=n-j ;j++) 
        /*m-1-i&lt;=n-j的意思是从i位置开始枚举到m-1位置时数字一定要够，因此m-1-i代表的是从i
       +1位置到m-1位置剩下的位置个数，n-j代表的是i+1位置开始最多可填的数字个数，我们要保证
        数字个数大于等于位置个数*/
        {
            a[i]=j;
            f(i+1,j+1,n,m);
        }

    }
}
int  main()
{
    cin &gt;&gt; n &gt;&gt; m;
    f(0,1,n,m);
    return 0;
}
</code></pre><h2 id="递归实现排列型枚举" tabindex="-1"><a class="header-anchor" href="#递归实现排列型枚举"><span>递归实现排列型枚举</span></a></h2><figure><img src="`+a+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><blockquote><ul><li>设计函数f（i，n） <ul><li>i表示当前位置</li><li>n表示最大的整数，也表示一组里面数字的个数</li></ul></li><li><strong>边界条件：​​​​</strong>当i==n，即当前位置i达到了数字个数的上限时，进行return，print</li><li>f（i，n）可以表示成如下情况 <ul><li>b[0] + f(i+1,n)</li><li>b[1] + f(i+1,n)</li><li>b[2] + f(i+1,n)</li><li>........</li></ul></li></ul><blockquote><p>b[0],b[1],b[2]分别代表前面位置未出现的数字，枚举到使用过的数字舍弃，枚举到n暂停</p></blockquote></blockquote><pre><code>#include&lt;iostream&gt;
using namespace std;
int a[10];
int b[10]={0};   //判断数字是否出现过，出现过则标记为1，未出现则标记为0
int n;
void print(int n)
{
    for(int i=0;i&lt;n;i++)
    {
        if(i) cout &lt;&lt; &quot; &quot;;
        cout &lt;&lt; a[i] ;
    }
    cout &lt;&lt; endl;
    return ;
}
void f(int i,int n)
{
    if(i==n)
    {
        print(i);
        return ;
    }
    for(int j = 1;j &lt;= n ; j++)    //b[0]~n，枚举
    {
    if(b[j])      
        continue;     //判断其是否在前面出现过
    a[i]=j;           //当前位置填上数字
    b[j]=1;           //标记，表明其已经使用过
    f(i+1,n);         //进行下一个位置的遍历
    b[j]=0;           //难点！！  执行到这一步表明函数已经返回至当前位置，后面的枚举已经
    全部完成并且结果已经输出，结果输出后则必须要将此数字取消标记
    } 
}

int main()
{
    cin &gt;&gt; n;
    f(0,n);
    return 0;
}
</code></pre><p><strong>抽象，难以理解是必然的，反复看，慢慢理解吧</strong></p>`,15)])])}const m=t(s,[["render",c]]),u=JSON.parse('{"path":"/ds/%E9%80%92%E5%BD%92%E5%AE%9E%E7%8E%B0%E6%9E%9A%E4%B8%BE.html","title":"递归...","lang":"zh-CN","frontmatter":{"title":"递归...","author":"xbZhong","isOriginal":true,"article":false,"category":"ds","timeline":true,"icon":"mingcute:code-line","description":"本页PDF 递归实现指数型枚举 这一栏十分抽象 隐晦难懂 没有计算机思维难以想到，也难以理解 题目如下 alt text 对于这道题，我们依旧采取递归的思想来解决 设计函数f（i，j，n） 其中i表示一个位置 j表示i位置能存放的最小数字 n表示i位置能存放的最大数字 边界条件：j > n f（i，j，n）可以分成多种情况 i取j的情况下加上f（i+1...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"递归...\\",\\"description\\":\\"本页PDF 递归实现指数型枚举 这一栏十分抽象 隐晦难懂 没有计算机思维难以想到，也难以理解 题目如下 alt text 对于这道题，我们依旧采取递归的思想来解决 设计函数f（i，j，n） 其中i表示一个位置 j表示i位置能存放的最小数字 n表示i位置能存放的最大数字 边界条件：j > n f（i，j，n）可以分成多种情况 i取j的情况下加上f（i+1...\\"}"],["meta",{"property":"og:url","content":"https://xbzhong.cn/xbZhong/ds/%E9%80%92%E5%BD%92%E5%AE%9E%E7%8E%B0%E6%9E%9A%E4%B8%BE.html"}],["meta",{"property":"og:site_name","content":"阿b的博客"}],["meta",{"property":"og:title","content":"递归..."}],["meta",{"property":"og:description","content":"本页PDF 递归实现指数型枚举 这一栏十分抽象 隐晦难懂 没有计算机思维难以想到，也难以理解 题目如下 alt text 对于这道题，我们依旧采取递归的思想来解决 设计函数f（i，j，n） 其中i表示一个位置 j表示i位置能存放的最小数字 n表示i位置能存放的最大数字 边界条件：j > n f（i，j，n）可以分成多种情况 i取j的情况下加上f（i+1..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image","content":"https://xbzhong.cn/xbZhong/screenshot/ds/image.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-02-11T19:04:44.000Z"}],["meta",{"property":"article:author","content":"xbZhong"}],["meta",{"property":"article:modified_time","content":"2026-02-11T19:04:44.000Z"}]]},"git":{"createdTime":1770836684000,"updatedTime":1770836684000,"contributors":[{"name":"BO","username":"BO","email":"2396768163@qq.com","commits":1,"url":"https://github.com/BO"}]},"readingTime":{"minutes":3.49,"words":1046},"filePathRelative":"ds/递归实现枚举.md","excerpt":"<p><a href=\\"/pdfs/ds/%E9%80%92%E5%BD%92%E5%AE%9E%E7%8E%B0%E6%9E%9A%E4%B8%BE.pdf\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">本页PDF</a></p>\\n<h2>递归实现指数型枚举</h2>\\n<p>这一栏十分抽象 隐晦难懂 没有计算机思维难以想到，也难以理解<br>\\n<em><strong>题目如下</strong></em><br>\\n<img src=\\"/screenshot/ds/image.png\\" alt=\\"alt text\\" loading=\\"lazy\\"></p>\\n","autoDesc":true}');export{m as comp,u as data};
