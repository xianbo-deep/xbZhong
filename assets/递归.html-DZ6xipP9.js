import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as o,o as i}from"./app-DSpxlwYV.js";const r={};function a(p,n){return i(),e("div",null,[...n[0]||(n[0]=[o(`<h2 id="汉诺塔问题" tabindex="-1"><a class="header-anchor" href="#汉诺塔问题"><span>汉诺塔问题</span></a></h2><p>汉诺塔（又称河内塔）问题是源于印度一个古老传说的益智玩具。大梵天创造世界的时候做了三根金刚石柱子，在一根柱子上从下往上按照大小顺序摞着 64 片黄金圆盘。大梵天命令婆罗门把圆盘从下面开始按大小顺序重新摆放在另一根柱子上。并且规定，在小圆盘上不能放大圆盘，在三根柱子之间一次只能移动一个圆盘。</p><p>现在路飞开始玩汉诺塔游戏， 他放了 n 片黄金圆盘在第一根柱子上，从上到下依次编号为 1 到 n ，1 号圆盘最小，n 号圆盘最大。路飞移动第i 号圆盘的时候需要花费 i 点体力。现在路飞想把圆盘全部移动到第 2​ 根柱子上，移动过程中路飞必须准守游戏规则。</p><p>现在路飞想知道他完成游戏的最小移动次数和最少消耗的体力。</p><p><strong>在这道题中我们使用递归思想，因此只需要考虑边界条件以及n和n-1之间的关系，具体的实现过程我们不加考虑</strong></p><blockquote><p>我们知道，对于两个盘子的情况，我们可以直接移动。<br> 那么现在对于n个盘子的情况，我们将其看成最底下一个盘子和上面n-1个盘子两部分，因此我们可以将上面的<strong>n-1个盘子看成一个盘子</strong></p><ul><li>我们首先要做的就是将n-1个盘子移动到辅助塔，再将剩下的盘子移动到目标塔，再将n-1个盘子移动到目标塔</li><li>接着便是对剩下的n-1个盘子进行操作，将n-2个盘子移动到辅助塔，再将剩下的一个盘子移动到目标塔，再将n-2个盘子移动到目标塔</li><li>对于后面的情况，以此类推</li></ul></blockquote><p><strong>因此 对于汉诺塔问题 可以将其分解成3步</strong></p><ul><li>将n-1个盘子移动到辅助塔</li><li>将剩下的一个盘子移动到目标塔</li><li>将n-1个盘子移动到目标塔</li></ul><p><strong>可以写出代码</strong></p><pre><code>#include&lt;iostream&gt;
using namespace std;
int t=0;
int p=0;
int f(int n,char a,char b,char c)  //将f（n）看成n个盘子所需移动的次数
{
    if(n==1) {t++;p++;}
    else
    {
    f(n-1,a,c,b);  //n-1个盘子移动到辅助塔
    t++;          //剩下的一个盘子移动到目标塔
    p+=n;         //消耗的体力
    f(n-1,c,b,a);  //n-1个盘子移动到目标塔

    }
}
int main()
{
    int n;
    char a,b,c;
    cin&gt;&gt;n;
    f(n,a,b,c);
    cout &lt;&lt; t &lt;&lt;&quot; &quot;&lt;&lt; p;
}
</code></pre><p><strong>需要注意的是，这种代码的时间复杂度O(N)为O(2^n) 代码运行效率太低</strong><br><strong>因此使用递推算法 可以知道f（n）= 2 * f（n-1）+ 1 ，f（n）为n个盘子所需移动的次数 g(n)=2*g(n-1)+n g(n)为移动n个盘子所需耗费的体力</strong></p><pre><code>#include&lt;iostream&gt;
using namespace std;
#define N 60
int a[N+1];
int b[N+1];
int main()
{
    int n;
    a[1]=1;
    b[1]=1;
    cin &gt;&gt; n;
    for(int i=2;i&lt;=n;i++)
    {
        a[i] =a[i-1]*2 + 1;
        b[i] =b[i-1]*2 + i;
    }
     cout&lt;&lt;a[n]&lt;&lt;&quot; &quot;&lt;&lt;b[n];
}
</code></pre><p><strong>这个代码的时间复杂度为O（n），相对于前面的代码速度更快</strong></p>`,13)])])}const s=t(r,[["render",a]]),m=JSON.parse('{"path":"/ds/%E9%80%92%E5%BD%92.html","title":"递归","lang":"zh-CN","frontmatter":{"title":"递归","author":"xbZhong","isOriginal":true,"article":false,"category":"ds","timeline":true,"icon":"mingcute:code-line","description":"汉诺塔问题 汉诺塔（又称河内塔）问题是源于印度一个古老传说的益智玩具。大梵天创造世界的时候做了三根金刚石柱子，在一根柱子上从下往上按照大小顺序摞着 64 片黄金圆盘。大梵天命令婆罗门把圆盘从下面开始按大小顺序重新摆放在另一根柱子上。并且规定，在小圆盘上不能放大圆盘，在三根柱子之间一次只能移动一个圆盘。 现在路飞开始玩汉诺塔游戏， 他放了 n 片黄金圆盘...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"递归\\",\\"description\\":\\"汉诺塔问题 汉诺塔（又称河内塔）问题是源于印度一个古老传说的益智玩具。大梵天创造世界的时候做了三根金刚石柱子，在一根柱子上从下往上按照大小顺序摞着 64 片黄金圆盘。大梵天命令婆罗门把圆盘从下面开始按大小顺序重新摆放在另一根柱子上。并且规定，在小圆盘上不能放大圆盘，在三根柱子之间一次只能移动一个圆盘。 现在路飞开始玩汉诺塔游戏， 他放了 n 片黄金圆盘...\\"}"],["meta",{"property":"og:url","content":"https://xbzhong.cn/ds/%E9%80%92%E5%BD%92.html"}],["meta",{"property":"og:site_name","content":"阿b的博客"}],["meta",{"property":"og:title","content":"递归"}],["meta",{"property":"og:description","content":"汉诺塔问题 汉诺塔（又称河内塔）问题是源于印度一个古老传说的益智玩具。大梵天创造世界的时候做了三根金刚石柱子，在一根柱子上从下往上按照大小顺序摞着 64 片黄金圆盘。大梵天命令婆罗门把圆盘从下面开始按大小顺序重新摆放在另一根柱子上。并且规定，在小圆盘上不能放大圆盘，在三根柱子之间一次只能移动一个圆盘。 现在路飞开始玩汉诺塔游戏， 他放了 n 片黄金圆盘..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-10T12:45:16.000Z"}],["meta",{"property":"article:author","content":"xbZhong"}],["meta",{"property":"article:modified_time","content":"2025-10-10T12:45:16.000Z"}]]},"git":{"createdTime":1760100316000,"updatedTime":1760100316000,"contributors":[{"name":"BO","username":"BO","email":"2396768163@qq.com","commits":1,"url":"https://github.com/BO"}]},"readingTime":{"minutes":2.89,"words":867},"filePathRelative":"ds/递归.md","excerpt":"<h2>汉诺塔问题</h2>\\n<p>汉诺塔（又称河内塔）问题是源于印度一个古老传说的益智玩具。大梵天创造世界的时候做了三根金刚石柱子，在一根柱子上从下往上按照大小顺序摞着 64 片黄金圆盘。大梵天命令婆罗门把圆盘从下面开始按大小顺序重新摆放在另一根柱子上。并且规定，在小圆盘上不能放大圆盘，在三根柱子之间一次只能移动一个圆盘。</p>\\n<p>现在路飞开始玩汉诺塔游戏， 他放了 n 片黄金圆盘在第一根柱子上，从上到下依次编号为 1 到 n ，1 号圆盘最小，n 号圆盘最大。路飞移动第i 号圆盘的时候需要花费 i 点体力。现在路飞想把圆盘全部移动到第 2​ 根柱子上，移动过程中路飞必须准守游戏规则。</p>","autoDesc":true}');export{s as comp,m as data};
