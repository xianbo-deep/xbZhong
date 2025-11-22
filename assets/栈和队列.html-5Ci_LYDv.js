import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,e,o as l}from"./app-CLY6NbeB.js";const r="/screenshot/ds/image-9.png",s="/screenshot/ds/image-20.png",a="/screenshot/ds/image-10.png",p="/screenshot/ds/image-12.png",o="/screenshot/ds/image-15.png",c="/screenshot/ds/image-16.png",u="/screenshot/ds/image-17.png",g="/screenshot/ds/image-18.png",m="/screenshot/ds/image-19.png",d={};function f(h,n){return l(),i("div",null,[...n[0]||(n[0]=[e('<h2 id="括号匹配" tabindex="-1"><a class="header-anchor" href="#括号匹配"><span>括号匹配</span></a></h2><p><img src="'+r+`" alt="alt text" loading="lazy"><br><em><strong>用栈来模拟括号匹配的过程</strong></em><br><strong>用栈是因为栈可以解决具有完全包含关系的问题</strong></p><pre><code>#include&lt;bits/stdc++.h&gt;
using namespace std;
int main()
{
int n;
int flag = 0;
cin &gt;&gt; n;
vector&lt;string&gt; temp[n] , s;
string str;
string target;
for(int i = 0; i &lt; n; i++)
{
    cin &gt;&gt; str;
        temp[i] = str;
        str = NULL ;
}
cin &gt;&gt; target;
for(int i = 0; i &lt; n; i++)
{
    if(temp[i] == target)
    {
        s.push_back(temp[i]);
        flag = 1;
        break;
    }
    if(temp[i] == &quot;return&quot;)
    s.pop_back(temp[i]);
    else
    s.push_back(temp[i]);
}
if(flag)
{
    for(int i = 0; i &lt; s.size();i++)
    {
        if(i) cout &lt;&lt; &quot;-&gt;&quot;
            cout &lt;&lt; s[i];
    }
    cout &lt;&lt; endl;
    else
        {
            cout &lt;&lt; &quot;NOT REFERENCED&quot;
        }
}
return 0;
}
</code></pre><h2 id="考研题-三元组最小距离" tabindex="-1"><a class="header-anchor" href="#考研题-三元组最小距离"><span>考研题 三元组最小距离</span></a></h2><p><strong>思路挺巧妙的</strong><br><img src="`+s+`" alt="alt text" loading="lazy"></p><ul><li><p>栈里面的数字是从小到大排列的</p></li><li><p>因此我们只需要找到三个数字中最小的那个</p><ul><li>对于他来说，其它两个数字再取栈后面的数字，其距离会越来越大</li><li>因此我们找到三个数字中的最小数字，就说明当前答案已经是对于这个数字来说的最小距离</li><li>我们便可以将它从栈中删除</li><li>同时要记录最小值</li></ul></li><li><p>当有一个栈为空战时，就说明已经无数字可比，此时找到那个记录的最小值，输出即可</p><pre><code>  #include &lt;iostream&gt;
  #include &lt;cstdlib&gt;
  #include &lt;queue&gt;
  using namespace std;

  int min_num(int a, int b, int c) {
      if (a &gt; b) swap(a, b);
      if (a &gt; c) swap(a, c);
      return a;
  }

  int func(queue&lt;int&gt; que1, queue&lt;int&gt; que2, queue&lt;int&gt; que3) {
      int min = 0x3f3f3f;  //这个是16进制表示法，可以看成是正无穷
      while(!que1.empty() &amp;&amp; !que2.empty() &amp;&amp; !que3.empty())
      {
          int a = que1.front(),b = que2.front(),c = que3.front();
          int min_n = abs(a-b) + abs(a-c) + abs (b-c);
          if(min_n&lt;min)  min = min_n;
          int d = min_num(a,b,c);
          if(a == d) que1.pop();
          if(b == d) que2.pop();
          if(c == d) que3.pop();
  }
      return min;
  }

  int main() {
      int m, n, k, x;
      queue&lt;int&gt; que1, que2, que3;
      cin &gt;&gt; m &gt;&gt; n &gt;&gt; k;
      for (int i = 0; i &lt; m; i++) {
          cin &gt;&gt; x;
          que1.push(x);
      }
      for (int i = 0; i &lt; n; i++) {
          cin &gt;&gt; x;
          que2.push(x);
      }
      for (int i = 0; i &lt; k; i++) {
          cin &gt;&gt; x;
          que3.push(x);
      }
      cout &lt;&lt; func(que1, que2, que3) &lt;&lt; endl;
      return 0;
  }
</code></pre></li></ul><h2 id="比较含退格的字符串" tabindex="-1"><a class="header-anchor" href="#比较含退格的字符串"><span>比较含退格的字符串</span></a></h2><p><img src="`+a+`" alt="alt text" loading="lazy"><br><strong>使用栈的思想</strong></p><ul><li><p>遇到#就出栈，否则就入栈</p></li><li><p>比较俩栈的字符</p><pre><code>  class Solution {
  public:
      bool backspaceCompare(string s, string t) {
          stack&lt;char&gt; temp1,temp2;
          for(int i = 0;s[i];i++)
          {
              if(s[i] == &#39;#&#39;)   //判断是否为退格字符
              {
                  if(!temp1.empty()) //判断栈是否非空 若无这个判断条
              temp1.pop(); 件 遇到a##b时便会把#压入栈，使得逻辑错误          
              }            
              else temp1.push(s[i]);
          }
          for(int i = 0;t[i];i++)
          {
              if(t[i] == &#39;#&#39;)
              {
                  if(!temp2.empty())
              temp2.pop();
              }
              else temp2.push(t[i]);
          }
          if(temp1.size() != temp2.size()) return false;
          while(!temp1.empty())
          {
              if(temp1.top() != temp2.top() ) return false;
              temp1.pop();
              temp2.pop(); 
          }
          return true;
      }
  };
</code></pre></li></ul><h2 id="火车进栈" tabindex="-1"><a class="header-anchor" href="#火车进栈"><span>火车进栈</span></a></h2><figure><img src="`+p+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>全排列输出</p></li><li><p>重点是判断输出序列是否为合法序列</p></li><li><p>用栈模拟</p><ol><li>假设有一组输出序列a1，a2，a3，a4，栈顶元素为x</li><li>现在轮到a2输出，用a2与x比较</li><li>a2 &gt; x 说明a2还没进栈，此时应该继续进栈，直到a2进栈</li><li>a2 = x 栈顶元素即进站的火车编号为x，此时a2弹出栈</li><li>a2 &lt; x 说明a2在栈顶元素下方，无法弹出，此时序列不合法</li></ol></li><li><p>一种是使用next_permutation函数来进行全排列</p></li><li><p>一种是使用递归的排列型枚举来进行全排列</p></li><li></li></ul><p><strong>next_permutation函数做法</strong></p><pre><code>#include&lt;iostream&gt;
#include&lt;string&gt;
#include&lt;cstring&gt;
#include&lt;stack&gt;
#include&lt;algorithm&gt;
#include&lt;queue&gt;
using namespace std;
bool valid(int a[],int n)
{
    stack&lt;int&gt; s;
    int x = 1;
    for(int i = 0;i &lt; n;i++)
    {
        if(s.empty() || s.top() &lt; a[i]) //血的教训！！ 先判空再比较
        { 
            while (x&lt;=a[i]) s.push(x),x+=1;
        }
        if(s.top() != a[i])  return false;
        s.pop();
    }
    return true;
}
int main()
{
    int a[25],n,cnt = 20;
    cin &gt;&gt; n;
    for(int i =0;i &lt; n;i++)
        a[i] = i + 1;
    do
    {   if(valid(a,n))
    {
        for(int i = 0;i &lt;n;i++)
        {
            cout &lt;&lt; a[i];
        }
        cout &lt;&lt; endl;
        cnt-=1;
        }
    }while(next_permutation(a,a+n) &amp;&amp; cnt);
    return 0;
}
</code></pre><p><strong>递归的排列型枚举做法</strong></p><pre><code>#include&lt;iostream&gt;
#include&lt;cstdlib&gt;
#include&lt;cstdio&gt;
#include&lt;string&gt;
#include&lt;cstring&gt;
#include&lt;stack&gt;
#include&lt;algorithm&gt;
#include&lt;queue&gt;
using namespace std;
int vis[25]={0};
int a[25],b[25];
int times = 0;
bool valid(int n)
{
    stack&lt;int&gt; s;
    int x = 1;
    for(int i = 0;i &lt; n;i++)
    {
        if(s.empty() || s.top()&lt;a[i])
        {
            while (x&lt;=a[i])
            {
                s.push(x);
                x+=1;
            }
        }
        if(s.top()!=a[i]) return false;
        s.pop();
    }
    return true;
}
void print(int n)
{
    for(int i = 0;i &lt; n;i++)
    {
            cout &lt;&lt; b[i];
    }
    cout &lt;&lt; endl;
}

void f(int i,int n)
{
    if(times == 20) return ;
    if(i == n &amp;&amp; valid(n))
    {
        print(i);
        times ++;
        return;
    }
    for(int j = 1;j &lt;= n;j++)
    {
        if(vis[j]) continue;
        b[i] = j;
        a[i] = j;
        vis[j] = 1;
        f(i+1,n);
        vis[j] = 0;
    }
}
int main()
{
    int n;
    cin &gt;&gt; n;
    f(0,n);
}
</code></pre><p><strong>重点解释一下next_permutation函数</strong></p><ul><li>在头文件include&lt; algorithm &gt;中</li><li>接受两个迭代器作为参数，并返回一个bool值，表示是否成功生成下一个排列 <ul><li>迭代器：访问数据结构中的元素</li><li>函数是对这两个迭代器之间的数据进行字典序排序</li></ul></li><li>当序列已经是字典序最大排列，返回false，循环结束</li><li>作用：生成给定序列的下一个较大排序，直到序列按降序排列为止</li><li>常与do while联用 <ul><li>若与while连用，则会丢失初始时的排序</li><li>若你想要得到所有的排序结果，初始时要按照升序来排序</li></ul></li></ul><h2 id="验证栈序列" tabindex="-1"><a class="header-anchor" href="#验证栈序列"><span>验证栈序列</span></a></h2><p><img src="`+o+'" alt="alt text" loading="lazy"><br><strong>题目意思是按照所给顺序对空栈进行入栈和出栈操作</strong><br><strong>若执行到最后栈为空，则return true</strong></p><ul><li>要对出栈序列进行分析</li><li>若出栈序列当前元素与栈顶元素相同，则pop</li><li>不相同则一直入栈</li><li>若将入栈序列遍历完也没有找到当前元素，且栈顶元素也与其不同，return false <ul><li>因为该元素在栈顶元素下方 无法pop</li></ul></li></ul><blockquote><figure><img src="'+c+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure></blockquote><pre><code>class Solution {
public:
    bool validateStackSequences(vector&lt;int&gt;&amp; pushed, vector&lt;int&gt;&amp; popped) {
        int x = 0,n = pushed.size();
        stack&lt;int&gt; s;
        for(int i = 0;i &lt; n;i++)
        {
            if(s.empty() || s.top() != popped[i])
            {
        while(x &lt; pushed.size() &amp;&amp; pushed[x] != popped[i])
        {
            s.push(pushed[x]);
            x += 1;
        }
        if(x == pushed.size()) return false;
        s.push(pushed[x]);
        x +=1 ;
            }
        s.pop();
        }
        return true;
    }
};
</code></pre><h2 id="括号画家" tabindex="-1"><a class="header-anchor" href="#括号画家"><span>括号画家</span></a></h2><p><img src="`+u+`" alt="alt text" loading="lazy"><br><strong>要让匹配到的一对括号做上标记</strong></p><pre><code>#include&lt;iostream&gt;
#include&lt;stack&gt;
using namespace std;
stack&lt;int&gt; s;
char str[10005];
int match[10005];
int main()
{
    cin &gt;&gt; (str + 1);  //让字符数组下标从1开始
    for(int i = 1;str[i];i++)
    {
        switch(str[i])
        {
        case&#39;(&#39;:
        case&#39;[&#39;:
        case&#39;{&#39;: s.push(i); break;
        case&#39;)&#39;:
            if(!s.empty() &amp;&amp; str[s.top()] == &#39;(&#39;)
            {
                match[s.top()] = i;  //表明s.top()和i位置是匹配的
                s.pop();
            }
            else  s.push(i); //表明i位置之前的括号序列非法，做一个信息阻隔
            break;
        case&#39;]&#39;:

            if(!s.empty() &amp;&amp; str[s.top()] == &#39;[&#39;)
            {
                match[s.top()] = i;
                s.pop();
            }
            else s.push(i);
            break;
        case&#39;}&#39;:
            if(!s.empty() &amp;&amp; str[s.top()] == &#39;{&#39;)
            {
                match[s.top()] = i;
                s.pop();
            }
            else s.push(i);
            break;
            }
    }
    int temp_ans = 0,ans = 0,i = 1;
    while(str[i])
    {
        if(match[i])
        {
            temp_ans += (match[i] - i + 1); //临时的长度 +=是因为可能会出现([]){}的形式
            i = match[i] + 1;            //跳转到匹配位置的下一个位置，寻找下一个美观长度
        }
        else
        {
            temp_ans = 0;
            i++;
        }
        if(temp_ans &gt; ans) ans = temp_ans; //取最大长度
    }
    cout &lt;&lt; ans;
    return 0;
}
</code></pre><h2 id="设计循环队列" tabindex="-1"><a class="header-anchor" href="#设计循环队列"><span>设计循环队列</span></a></h2><figure><img src="`+g+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><p><strong>本题难点：需要确定初始时尾指针位置</strong></p><ul><li><p>与队列结构定义不一样，队列机构定义头尾指针采取左闭右开式</p></li><li><p>在本题头尾指针采取左闭右闭式</p></li><li><p>因此尾指针初始位置应该在头指针前一位才能表示队列为空</p><p>struct Node<br> {<br> int data;<br> Node *next;<br> };<br> class MyCircularQueue {<br> public:<br> int count,size;<br> Node *head,*tail;<br> MyCircularQueue(int k) {<br> head = new Node();<br> tail = head;<br> for(int i = 0;i &lt; k;i++)<br> {<br> tail-&gt;next = new Node();<br> tail = tail-&gt;next;<br> }<br> count = 0;<br> size = k;<br> tail-&gt;next = head;<br> }</p><pre><code>  bool enQueue(int value) {
      if(isFull())  return false;
      tail = tail-&gt;next;
      tail-&gt;data = value;
      count+=1;
      return true;
  }
  
  bool deQueue() {
      if(isEmpty()) return false;
      head = head-&gt;next;
      count-=1;
      return true;
  }
  
  int Front() {
      if(isEmpty()) return -1;
      return head-&gt;data;
  }
  
  int Rear() {
      if(isEmpty()) return -1;
      return tail-&gt;data;
  }
  
  bool isEmpty() {
      return count == 0; 
  }

  bool isFull() {
      return count == size;
  }
  };
</code></pre></li></ul><h2 id="表达式求值" tabindex="-1"><a class="header-anchor" href="#表达式求值"><span>表达式求值</span></a></h2><figure><img src="`+m+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li>使用递归的思想 <ul><li>找到计算优先度最低的符号进行分割</li><li>对符号左右进行求值</li><li>最后返回计算结果</li></ul></li><li>要找计算优先度最低的符号须计算权重比 <ul><li>对于括号内部的符号权重比加100</li><li>考虑负数，对于数字前的负号，权重比更大，加1000 <ul><li>因为负数与相减相比优先度更高</li><li>负数实现过程是用负号分割。用0减去当前数字</li></ul></li></ul></li><li>为了让分割位置指向符号，我们让数字优先度达到正无穷 <ul><li>pos代表要分割的位置</li><li>cur_pri统计当前位置的权重</li><li>temp_pri统计遇到括号的权重</li><li>设定pri为正无穷-1 <ul><li><p>目的是为了找出分割位置</p></li><li><p>减去1是为了不让pos指向数字</p></li><li><p>找分割位置条件带等于号是因为当遇见权重比相同的符号时，靠后的符号权重比更小 例如<strong>7-5-2</strong>，先计算7-5，再计算后面的表达式</p><pre><code>  #include&lt;bits/stdc++.h&gt;
  using namespace std;
  #define INF 0x3f3f3f3f
  string str;
  bool is_operator(char c)
  {
      switch(c)
      {
      case&#39;+&#39;:
      case&#39;-&#39;:
      case&#39;*&#39;:
      case&#39;/&#39;:
      case&#39;^&#39;: return true;
      default : return false;
      }
      return false;
  }

  long long result(string &amp;s, long long l,long long r)
  {
      long long pos = -1 , pri =INF - 1 , cur_pri , temp_pri = 0;
      for(long long i = l;i &lt; r;i++)
      {
          cur_pri = INF;
          switch(s[i])
          {
          case&#39;(&#39;:
              temp_pri += 100;
              break;
          case&#39;)&#39;:
              temp_pri -=100;
              break;
          case&#39;+&#39;:
          case&#39;-&#39;:
              cur_pri = 1 + temp_pri;
              break;
          case&#39;*&#39;:
          case&#39;/&#39;:
              cur_pri = 2 + temp_pri;
              break;
          case&#39;^&#39;:
              cur_pri = 3 + temp_pri;
              break;
          }
          if((s[i] == &#39;-&#39; || s[i] == &#39;+&#39;) &amp;&amp; (i -1 &lt; 0 || is_operator(s[i - 1])))
          cur_pri += 1000;
          if(pri &gt;= cur_pri)  //要找优先级最小的一个位置
          {
              pri = cur_pri;  // 更新最小值
              pos = i;
          }
      }
      if(pos == -1)
      {
      long long num = 0;
      for(long long i = l;i &lt; r;i++)
      {
          if(s[i] &lt; &#39;0&#39;|| s[i] &gt; &#39;9&#39;) continue;
          num = num * 10 + (s[i]-&#39;0&#39;);
      }
      return num;
      }
      else
      {
          long long a = result(s,l,pos);
          long long b = result(s,pos+1,r);
          switch(s[pos])
          {
              case&#39;+&#39;: return a+b;
              case&#39;-&#39;: return a-b;
              case&#39;*&#39;: return a*b;
              case&#39;/&#39;: return a/b;
              case&#39;^&#39;: return pow(a,b);
          }
      }
  }
  int main()
  {
      cin &gt;&gt; str;
      cout &lt;&lt; result(str,0,str.size());
      return 0;
  }
</code></pre></li></ul></li></ul></li></ul>`,33)])])}const _=t(d,[["render",f]]),y=JSON.parse('{"path":"/ds/%E6%A0%88%E5%92%8C%E9%98%9F%E5%88%97.html","title":"栈和队列","lang":"zh-CN","frontmatter":{"title":"栈和队列","author":"xbZhong","isOriginal":true,"article":false,"category":"ds","timeline":true,"icon":"mingcute:code-line","description":"括号匹配 alt text 用栈来模拟括号匹配的过程 用栈是因为栈可以解决具有完全包含关系的问题 考研题 三元组最小距离 思路挺巧妙的 alt text 栈里面的数字是从小到大排列的 因此我们只需要找到三个数字中最小的那个 对于他来说，其它两个数字再取栈后面的数字，其距离会越来越大 因此我们找到三个数字中的最小数字，就说明当前答案已经是对于这个数字来说...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"栈和队列\\",\\"description\\":\\"括号匹配 alt text 用栈来模拟括号匹配的过程 用栈是因为栈可以解决具有完全包含关系的问题 考研题 三元组最小距离 思路挺巧妙的 alt text 栈里面的数字是从小到大排列的 因此我们只需要找到三个数字中最小的那个 对于他来说，其它两个数字再取栈后面的数字，其距离会越来越大 因此我们找到三个数字中的最小数字，就说明当前答案已经是对于这个数字来说...\\"}"],["meta",{"property":"og:url","content":"https://xbzhong.cn/ds/%E6%A0%88%E5%92%8C%E9%98%9F%E5%88%97.html"}],["meta",{"property":"og:site_name","content":"阿b的博客"}],["meta",{"property":"og:title","content":"栈和队列"}],["meta",{"property":"og:description","content":"括号匹配 alt text 用栈来模拟括号匹配的过程 用栈是因为栈可以解决具有完全包含关系的问题 考研题 三元组最小距离 思路挺巧妙的 alt text 栈里面的数字是从小到大排列的 因此我们只需要找到三个数字中最小的那个 对于他来说，其它两个数字再取栈后面的数字，其距离会越来越大 因此我们找到三个数字中的最小数字，就说明当前答案已经是对于这个数字来说..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image","content":"https://xbzhong.cn/screenshot/ds/image-9.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-10T12:45:16.000Z"}],["meta",{"property":"article:author","content":"xbZhong"}],["meta",{"property":"article:modified_time","content":"2025-10-10T12:45:16.000Z"}]]},"git":{"createdTime":1760100316000,"updatedTime":1760100316000,"contributors":[{"name":"BO","username":"BO","email":"2396768163@qq.com","commits":1,"url":"https://github.com/BO"}]},"readingTime":{"minutes":7.8,"words":2341},"filePathRelative":"ds/栈和队列.md","excerpt":"<h2>括号匹配</h2>\\n<p><img src=\\"/screenshot/ds/image-9.png\\" alt=\\"alt text\\" loading=\\"lazy\\"><br>\\n<em><strong>用栈来模拟括号匹配的过程</strong></em><br>\\n<strong>用栈是因为栈可以解决具有完全包含关系的问题</strong></p>\\n<pre><code>#include&lt;bits/stdc++.h&gt;\\nusing namespace std;\\nint main()\\n{\\nint n;\\nint flag = 0;\\ncin &gt;&gt; n;\\nvector&lt;string&gt; temp[n] , s;\\nstring str;\\nstring target;\\nfor(int i = 0; i &lt; n; i++)\\n{\\n    cin &gt;&gt; str;\\n        temp[i] = str;\\n        str = NULL ;\\n}\\ncin &gt;&gt; target;\\nfor(int i = 0; i &lt; n; i++)\\n{\\n    if(temp[i] == target)\\n    {\\n        s.push_back(temp[i]);\\n        flag = 1;\\n        break;\\n    }\\n    if(temp[i] == \\"return\\")\\n    s.pop_back(temp[i]);\\n    else\\n    s.push_back(temp[i]);\\n}\\nif(flag)\\n{\\n    for(int i = 0; i &lt; s.size();i++)\\n    {\\n        if(i) cout &lt;&lt; \\"-&gt;\\"\\n            cout &lt;&lt; s[i];\\n    }\\n    cout &lt;&lt; endl;\\n    else\\n        {\\n            cout &lt;&lt; \\"NOT REFERENCED\\"\\n        }\\n}\\nreturn 0;\\n}\\n</code></pre>","autoDesc":true}');export{_ as comp,y as data};
