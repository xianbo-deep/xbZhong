import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,e as a,o as i}from"./app-CvT_P91O.js";const r="/screenshot/ds/image-6.png",p="/screenshot/ds/image-3.png",o="/screenshot/ds/image-4.png",s="/screenshot/ds/image-5.png",l="/screenshot/ds/image-7.png",d="/screenshot/ds/image-8.png",h={};function c(g,e){return i(),t("div",null,[...e[0]||(e[0]=[a('<h2 id="反转链表" tabindex="-1"><a class="header-anchor" href="#反转链表"><span>反转链表</span></a></h2><figure><img src="'+r+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><h3 id="反转链表迭代做法" tabindex="-1"><a class="header-anchor" href="#反转链表迭代做法"><span>反转链表迭代做法</span></a></h3><p><strong>通过创建一个新的节点prev，将旧链表从前往后遍历</strong></p><pre><code>class Solution {
public:
    ListNode* reverseList(ListNode* head) {
    ListNode *prev=NULL,*temp = head;
    while(temp)
    {
        ListNode *next = temp-&gt;next;
        temp-&gt;next = prev;
        prev = temp ;
        temp = next;
    }
    return prev;
    }
};
</code></pre><h3 id="反转链表头插法做法" tabindex="-1"><a class="header-anchor" href="#反转链表头插法做法"><span>反转链表头插法做法</span></a></h3><pre><code>class Solution {
public:
    ListNode* reverseList(ListNode* head) {
    ListNode new_head, *p =head ,*q;
    new_head.next = NULL;
    while(p)
    {
        q = p-&gt;next;
        p-&gt;next = new_head.next;
        new_head.next = p;
        p = q;
    }
    return new_head.next;
    }
};
</code></pre><h3 id="反转链表递归做法" tabindex="-1"><a class="header-anchor" href="#反转链表递归做法"><span>反转链表递归做法</span></a></h3><pre><code>class Solution {
public:
    ListNode* reverseList(ListNode* head) {
    if(head == NULL || head-&gt;next == NULL) return head;
    ListNode* tail = head-&gt;next;
    ListNode* newhead = reverseList(head-&gt;next);   //把reverseList
    head-&gt;next = tail-&gt;next;     （head-&gt;next）看成一个新的链表，其头节
    tail-&gt;next = head;     点为newhead
    return newhead;
    }
};
</code></pre><h3 id="判断环形链表" tabindex="-1"><a class="header-anchor" href="#判断环形链表"><span>判断环形链表</span></a></h3><h4 id="快慢指针法" tabindex="-1"><a class="header-anchor" href="#快慢指针法"><span>快慢指针法</span></a></h4><ul><li>用两个指针来判断</li><li>一个指针跑得快，一个指针跑得慢</li><li>若不是环形结构，跑的慢的永远追不上跑得快的，因此一定会返回false</li><li>若是环形结构，跑得慢的一定会遇到跑得快的，因此一定会返回true</li></ul><p><strong>根据上述思考来设计代码</strong></p><pre><code>class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *p = head , *q = head;
        while(q &amp;&amp; q-&gt;next)   //要加上q-&gt;next不指向null的条件
        {                      否则当链表只有一个节点时便会出错
            p = p-&gt;next;
            q = q-&gt;next-&gt;next;
            if(p == q) return true;
        }
        return false;
    }
}; 
</code></pre><h3 id="快乐数" tabindex="-1"><a class="header-anchor" href="#快乐数"><span>快乐数</span></a></h3><h4 id="使用快慢指针思想来做这道题" tabindex="-1"><a class="header-anchor" href="#使用快慢指针思想来做这道题"><span>（使用快慢指针思想来做这道题）</span></a></h4><figure><img src="`+p+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li>情况1：一直在1中死循环</li><li>情况2：一直在某些数据中死循环，但到达不了1<br><strong>因此，我们可以使用快慢指针的思想来解题</strong></li></ul><p>代码：</p><pre><code>class Solution {
public:
    int get(int n)
    {
        int y=0,d;
        while(n)
        {
        d = n % 10;
        y += d * d;
        n = n / 10; 
        }
        return y;
    }
    bool isHappy(int n) {
        int p = n,q = n;
        while(q!=1)  // q是快指针，因此使用q来判定是否循环（q若可以等于
        {               1，则p也一定可以等于1）
            p=get(p);
            q=get(get(q));
            if(p==q &amp;&amp; q!=1) // p和q相等但不是在1中死循环
            return false;
        }
        return true;
    }
};
</code></pre><h2 id="双指针等距移动法" tabindex="-1"><a class="header-anchor" href="#双指针等距移动法"><span>双指针等距移动法</span></a></h2><h3 id="旋转链表" tabindex="-1"><a class="header-anchor" href="#旋转链表"><span>旋转链表</span></a></h3><figure><img src="`+o+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><p>个人解法：</p><pre><code>class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if(head == NULL) return head;
    int len = 0;      //链表长度
    ListNode *p = head ;
    ListNode *q = head,*temp,*newhead;
    while (q)
    {
        q = q-&gt;next;
        len+=1;
    }
    int x = k % len; 
    if(x == 0) return head;
    for(int i = 1;i &lt; len-x ; i++)//分割成俩链表
        p = p-&gt;next;          //遍历至前一链表末端
    temp = p-&gt;next;         //记录下一链表的头节点
    newhead = p-&gt;next;       
    p-&gt;next = NULL;       //将前一链表末端指null       
    while(temp-&gt;next != NULL) //遍历后一链表至末端
    temp = temp-&gt;next;      
    temp-&gt;next = head;
    return newhead;  
    }
};
</code></pre><p>双指针移动法：<br><strong>要判断特殊情况</strong></p><pre><code>class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if(head == NULL)   return head;
        ListNode *p = head , *q = head,*temp = head;
        int len = 0;
        while(head)
        {
            head = head-&gt;next;
            len+=1;
        }
        k %= len;
        if(k==0) return temp;
        for(int i = 0;i &lt;= k ;i++)
        q = q-&gt;next;
        while(q)
        {
            p = p-&gt;next;
            q = q-&gt;next;
        }  
        q = p-&gt;next;
        p-&gt;next = NULL;
        p = q;
        while(p-&gt;next)
        p = p-&gt;next;
        p-&gt;next = temp;
        return q; 
    }
};
</code></pre><h3 id="删除链表的倒数第n个节点" tabindex="-1"><a class="header-anchor" href="#删除链表的倒数第n个节点"><span>删除链表的倒数第N个节点</span></a></h3><p><img src="`+s+`" alt="alt text" loading="lazy"><br> 个人解法：</p><pre><code>class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {

    ListNode *p = head,*q = head;
    ListNode new_head;
    new_head.next = head;
    int len = 0;
    while(q)
    {
        q = q-&gt;next;
        len +=1;
    }
    if(n == len)
    {
    new_head.next = head-&gt;next;
    return new_head.next;
    }
    for(int i = 1;i &lt; len-n ;i++)
        p = p-&gt;next;
        p-&gt;next = p-&gt;next-&gt;next;
        return head;
    }
};
</code></pre><p><strong>需要考虑边界条件，当要删除第一个节点时，便不能return head，而需要找到虚拟头节点进行return，同时运行速度也不快</strong></p><p>双指针移动法：（使用虚拟头节点）</p><ul><li><p>使用两个指针，一快一慢，并且都指向虚拟头节点</p></li><li><p>让快的指针先往后走n+1位</p></li><li><p>然后两个指针一起往后走，当快指针走到null时，慢指针走到了待删除节点的前一位</p><pre><code>  class Solution {
  public:
      ListNode* removeNthFromEnd(ListNode* head, int n) {
          ListNode new_head , *p = &amp;new_head , *q = p;
          new_head.next = head;
          for(int i = 1; i &lt;= n+1;i++)
          q = q-&gt;next;
          while (q)
          {
              p = p-&gt;next;
              q = q-&gt;next;
          }
          p-&gt;next = p-&gt;next-&gt;next;
          return new_head.next;
      }
  };
</code></pre></li></ul><p><strong>好处：</strong></p><ol><li>不需要考虑边界条件，因为有了虚拟头节点的存在</li><li>运行速度更快</li></ol><h2 id="环形链表ii" tabindex="-1"><a class="header-anchor" href="#环形链表ii"><span>环形链表Ⅱ</span></a></h2><p><img src="`+l+'" alt="alt text" loading="lazy"><br><strong>这道题的解法非常巧妙</strong><br><strong>同样使用快慢指针，得出其路程之间的关系</strong></p><ul><li>设定两个指针，一个一次走两步，一个一次走一步（设头节点距环入口为的距离为a）</li><li>如果有环，他俩必定相遇</li><li>通过数学关系得出相遇的位置到环入口的距离等于头节点到环入口的距离 <ul><li>设环长度为x，在慢指针刚到达环入口时，快指针领先他a的距离</li><li>快指针与慢指针距离为x-a</li><li>快指针追上慢指针需要再走x-a次</li><li>慢指针在此过程中走了x-a步，相遇时的位置距离环入口为x-（x-a）=a的距离</li><li>相遇位置与头节点距环入口距离相同<br><img src="'+d+`" alt="alt text" loading="lazy"></li></ul></li><li>将其中一个指针指向头节点，让它们以相同速度走，相遇位置即环入口</li></ul><p>附上代码：</p><pre><code>class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *q =head , *p = head;
        while(p &amp;&amp; p-&gt;next)
        {
            q = q-&gt;next;
            p = p-&gt;next-&gt;next;
            if(p==q)
            break;
        }
        if (p == NULL || p-&gt;next == NULL)
        return NULL;
        q = head;
        while(p != q)
        {
            p = p-&gt;next;
            q = q-&gt;next;
        }  
        return q;
    }
};
</code></pre>`,40)])])}const u=n(h,[["render",c]]),L=JSON.parse('{"path":"/ds/%E9%93%BE%E8%A1%A8.html","title":"链表常见题目","lang":"zh-CN","frontmatter":{"title":"链表常见题目","author":"xbZhong","isOriginal":true,"article":false,"category":"ds","timeline":true,"icon":"mingcute:code-line","description":"反转链表 alt textalt text 反转链表迭代做法 通过创建一个新的节点prev，将旧链表从前往后遍历 反转链表头插法做法 反转链表递归做法 判断环形链表 快慢指针法 用两个指针来判断 一个指针跑得快，一个指针跑得慢 若不是环形结构，跑的慢的永远追不上跑得快的，因此一定会返回false 若是环形结构，跑得慢的一定会遇到跑得快的，因此一定会返回...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"链表常见题目\\",\\"description\\":\\"反转链表 alt textalt text 反转链表迭代做法 通过创建一个新的节点prev，将旧链表从前往后遍历 反转链表头插法做法 反转链表递归做法 判断环形链表 快慢指针法 用两个指针来判断 一个指针跑得快，一个指针跑得慢 若不是环形结构，跑的慢的永远追不上跑得快的，因此一定会返回false 若是环形结构，跑得慢的一定会遇到跑得快的，因此一定会返回...\\"}"],["meta",{"property":"og:url","content":"https://xbzhong.cn/ds/%E9%93%BE%E8%A1%A8.html"}],["meta",{"property":"og:site_name","content":"阿b的博客"}],["meta",{"property":"og:title","content":"链表常见题目"}],["meta",{"property":"og:description","content":"反转链表 alt textalt text 反转链表迭代做法 通过创建一个新的节点prev，将旧链表从前往后遍历 反转链表头插法做法 反转链表递归做法 判断环形链表 快慢指针法 用两个指针来判断 一个指针跑得快，一个指针跑得慢 若不是环形结构，跑的慢的永远追不上跑得快的，因此一定会返回false 若是环形结构，跑得慢的一定会遇到跑得快的，因此一定会返回..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image","content":"https://xbzhong.cn/screenshot/ds/image-6.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-10T12:45:16.000Z"}],["meta",{"property":"article:author","content":"xbZhong"}],["meta",{"property":"article:modified_time","content":"2025-10-10T12:45:16.000Z"}]]},"git":{"createdTime":1760100316000,"updatedTime":1760100316000,"contributors":[{"name":"BO","username":"BO","email":"2396768163@qq.com","commits":1,"url":"https://github.com/BO"}]},"readingTime":{"minutes":4.4,"words":1319},"filePathRelative":"ds/链表.md","excerpt":"<h2>反转链表</h2>\\n<figure><img src=\\"/screenshot/ds/image-6.png\\" alt=\\"alt text\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>alt text</figcaption></figure>\\n<h3>反转链表迭代做法</h3>\\n<p><strong>通过创建一个新的节点prev，将旧链表从前往后遍历</strong></p>\\n<pre><code>class Solution {\\npublic:\\n    ListNode* reverseList(ListNode* head) {\\n    ListNode *prev=NULL,*temp = head;\\n    while(temp)\\n    {\\n        ListNode *next = temp-&gt;next;\\n        temp-&gt;next = prev;\\n        prev = temp ;\\n        temp = next;\\n    }\\n    return prev;\\n    }\\n};\\n</code></pre>","autoDesc":true}');export{u as comp,L as data};
