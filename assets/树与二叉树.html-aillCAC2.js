import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as r,o}from"./app-CJY8zoO9.js";const i="/screenshot/ds/image-21.png",l="/screenshot/ds/image-22.png",a="/screenshot/ds/image-23.png",d="/screenshot/ds/image-25.png",s="/screenshot/ds/image-26.png",c="/screenshot/ds/image-27.png",p="/screenshot/ds/image-28.png",g="/screenshot/ds/image-29.png",u="/screenshot/ds/image-30.png",h="/screenshot/ds/image-31.png",f="/screenshot/ds/image-32.png",b={};function m(N,n){return o(),e("div",null,[...n[0]||(n[0]=[r(`<h2 id="树" tabindex="-1"><a class="header-anchor" href="#树"><span>树</span></a></h2><p><strong>树的节点代表集合，树的边代表关系</strong></p><h3 id="广度优先遍历" tabindex="-1"><a class="header-anchor" href="#广度优先遍历"><span>广度优先遍历</span></a></h3><ul><li><p>也叫做层序遍历，一层一层来遍历树</p></li><li><p>使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点</p><pre><code>  void bfs(Node *root) //广度优先遍历
  {
      head = tail = 0;
      Queue[tail++] = root;
      while(head&lt;tail)
      {
          Node *node = Queue[head];
          cout &lt;&lt; node-&gt;key &lt;&lt; endl;
          if(node-&gt;lchild) Queue[tail++] = node-&gt;lchild;
          if(node-&gt;rchild) Queue[tail++] = node-&gt;rchild;
          head++;
      }
      return;
  }
</code></pre></li></ul><h3 id="深度优先遍历" tabindex="-1"><a class="header-anchor" href="#深度优先遍历"><span>深度优先遍历</span></a></h3><ul><li><p>使用栈来实现遍历</p></li><li><p>先左后右</p></li><li><p>判断栈顶元素是否有子节点，有子节点则入栈，无子节点则出栈，直到变为空栈</p><pre><code>  void dfs(Node *root) //用栈模拟
  {
      if(root == NULL) return;
      int start,end;
      tot += 1;
      start = tot;
      if(root-&gt;lchild) dfs(root-&gt;lchild); //递归，调用系统栈
      if(root-&gt;rchild) dfs(root-&gt;rchild); //调用一次函数实质就是入一次栈
      tot += 1;                           //函数返回实质就是出栈
      end = tot;
      cout &lt;&lt; root-&gt;key &lt;&lt; endl;
      return;
  }
</code></pre></li></ul><h3 id="二叉树性质" tabindex="-1"><a class="header-anchor" href="#二叉树性质"><span>二叉树性质</span></a></h3><ul><li>度为0的节点比度为2的节点多一个</li><li>种类 <ul><li>完全二叉树：只有最后一层缺少右侧节点 <ol><li>对于编号为i的节点 <ul><li>该节点左节点：2*i</li><li>该节点右节点：2*i+1</li></ul></li><li>其编号连续，可以用连续的数组存储</li></ol></li><li>满二叉树：没有度为1的节点</li><li>完美二叉树：每一层都是满的</li></ul></li><li>遍历</li></ul><table><thead><tr><th>前序遍历</th><th>中序遍历</th><th>后序遍历</th></tr></thead><tbody><tr><td>根左右</td><td>左根右</td><td>左右根</td></tr></tbody></table><ul><li>实现树的序列化</li><li>前加后不能还原，因为不能判断有多少节点</li></ul><h4 id="二叉树线索化" tabindex="-1"><a class="header-anchor" href="#二叉树线索化"><span>二叉树线索化</span></a></h4><p><strong>有利于让二叉树的遍历方式由递归变为非递归</strong><br><strong>本质上是利用冗余的指针空间</strong></p><ul><li>左指针指向前驱</li><li>右指针指向后继 <ul><li><p>前驱指的是在相应遍历方式下某节点的前一个节点</p></li><li><p>后继指的是在相应遍历方式下某节点的后一个节点</p><pre><code>      #include&lt;bits/stdc++.h&gt;
      using namespace std;
      void build_inorder_thread(Node *root)
      {
          if(root == NULL) return ;
          if(root-&gt;ltag == 0) build_inorder_thread(root-&gt;lchild);
          if(inorder_root == NULL) inorder_root = root; //root
          是中序遍历的第一个节点，赋值给inorder_root
          if(root-&gt;lchild == NULL) //前驱
          {
              root-&gt;lchild = prenode;
              root-&gt;ltag = 1;
          }
          if(prenode &amp;&amp; prenode-&gt;rchild == NULL) //后继
          {
              prenode-&gt;rchild = root;
              prenode-&gt;rtag = 1;
          }
          prenode = root;  //更新prenode，让其指向当前已经处理完
          毕的节点
          if(root-&gt;rtag == 0) build_inorder_thread(root-&gt;rchild);
          return;
      }

      void __build_inorder_thread(Node *root)
      {
          build_inorder_thread(root);
          prenode-&gt;rchild = NULL; //处理完前面所有节点后，prenode指向最后一个节点
          prenode-&gt;rtag = 1;
          return;
      }

      Node *getnext(Node *root)
      {
      if(root-&gt;rtag == 1) return root-&gt;rchild; //要注意的是，线
      索化的实现是按照中序遍历的顺序来的
          root = root-&gt;rchild;         //代码到这一行说明root的
          后继是一条实实在在的边，而在中序遍历中，当前节点的后继是这
          个节点右子树的最左边的节点，因此使用循环遍历
          while(root-&gt;ltag == 0 &amp;&amp; root-&gt;lchild) //当root-&gt;tag
          为1时，就说明其没有左子树，因此其就是当前节点右子树的最左
          边的节点
          {
              root = root-&gt;lchild;
          }
          return root;
      }
      int main()
      {
          Node *node = inorder_root; //要指向中序遍历的第一个节点
          while(node)
          {
          cout &lt;&lt; node-&gt;key &lt;&lt; &quot; &quot;;
          node = getnext(node);
          }
          clear(root);
          return 0;
      }
</code></pre></li></ul></li></ul><p><strong>使用的方法是站在每个节点的下一个节点去处理当前节点的后继</strong><br><strong>对于最后一个节点，由于其没有下一个节点，因此无法处理其后继</strong></p><h3 id="二叉树与广义表" tabindex="-1"><a class="header-anchor" href="#二叉树与广义表"><span>二叉树与广义表</span></a></h3><h4 id="二叉树转广义表" tabindex="-1"><a class="header-anchor" href="#二叉树转广义表"><span>二叉树转广义表</span></a></h4><pre><code>#include&lt;bits/stdc++.h&gt;
using namespace std;
#define KEY(n) (n ? n-&gt;key : -1) //空地址返回负一

typedef struct Node
{
    int key;
    struct Node *lchild,*rchild;
}Node;

Node *getnewnode(int key)
{
    Node *p = new Node;
    p-&gt;key = key;
    p-&gt;lchild = p-&gt;rchild = NULL;
    return p;
}

void clear(Node *root)
{
    if(root == NULL)  return ;
    clear(root-&gt;lchild);
    clear(root-&gt;rchild);
    delete root;
    return ;
}

Node *insert(Node *root,int key)
{
    if(root == NULL) return getnewnode(key);
    if(rand()%2) root-&gt;lchild = insert(root-&gt;lchild,key);
    else root-&gt;rchild = insert(root-&gt;rchild,key);
    return root;
}

Node *getranderbinarytree(int n)
{
    Node *root =NULL;
    for(int i = 0;i &lt; n;i++)
    {
        root = insert(root,rand() % 100);
    }
    return root;
}

char buff[1000];
int len = 0; //广义表信息长度

void __serialize(Node *root) //使用前序遍历序列化
{
    if(root == NULL) return;
    len += sprintf(buff + len ,&quot;%d&quot;,root-&gt;key);//sprintf的返回值是输出的字符数
    if(root-&gt;lchild == NULL &amp;&amp; root-&gt;rchild == NULL) return;
    len += sprintf(buff + len ,&quot;(&quot;);
    __serialize(root-&gt;lchild);
    if(root-&gt;rchild)
    {
        len += sprintf(buff + len ,&quot;,&quot;);
        __serialize(root-&gt;rchild);
    }
    len += sprintf(buff + len ,&quot;)&quot;);
    return ;
}

void serialize(Node *root)
{
    memset(buff,0,sizeof(buff));
    len = 0;
    __serialize(root);
    return;
}


void print(Node *node)
{
    printf(&quot;%d(%d,%d)\\n&quot;,KEY(node),KEY(node-&gt;lchild),KEY(node-&gt;rchild));
    return ;
}

void output(Node *root)
{
    if(root == NULL) return;
    print(root);
    output(root-&gt;lchild);
    output(root-&gt;rchild);
    return;
}
int main()
{
    srand((unsigned)time(NULL));
    #define n 10
    Node *root = getranderbinarytree(n);
    serialize(root);
    output(root);
    cout &lt;&lt; buff &lt;&lt; &quot; &quot; &lt;&lt;&quot;广义表&quot;;
    clear(root);
    return 0;
}
</code></pre><h5 id="广义表转二叉树" tabindex="-1"><a class="header-anchor" href="#广义表转二叉树"><span>广义表转二叉树</span></a></h5><figure><img src="`+i+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>运用栈的思想</p><ul><li>遇到关键字，生成节点</li><li>碰到左括号入栈</li><li>碰到逗号标记flag为1（flag为0代表左子树，为1代表右子树）</li><li>碰到右括号弹栈</li></ul></li><li><p>设立左右子树时是为栈顶元素设立的<br><strong>这道题使用状态机的算法思想，使用对应数字来分配任务</strong><br><strong>但分配完任务i须减1，同样地，完成任务后scode要设置为0</strong></p><pre><code>  #include&lt;bits/stdc++.h&gt;
  using namespace std;
  #define KEY(n) (n ? n-&gt;key : -1) //空地址返回负一

  typedef struct Node
  {
      int key;
      struct Node *lchild,*rchild;
  }Node;

  Node *getnewnode(int key)
  {
      Node *p = new Node;
      p-&gt;key = key;
      p-&gt;lchild = p-&gt;rchild = NULL;
      return p;
  }

  void clear(Node *root)
  {
      if(root == NULL)  return ;
      clear(root-&gt;lchild);
      clear(root-&gt;rchild);
      delete root;
      return ;
  }

  Node *insert(Node *root,int key)
  {
      if(root == NULL) return getnewnode(key);
      if(rand()%2) root-&gt;lchild = insert(root-&gt;lchild,key);
      else root-&gt;rchild = insert(root-&gt;rchild,key);
      return root;
  }

  Node *getranderbinarytree(int n)
  {
      Node *root =NULL;
      for(int i = 0;i &lt; n;i++)
      {
          root = insert(root,rand() % 100);
      }
      return root;
  }
  char buff[1000];
  int len = 0; //广义表信息长度

  void __serialize(Node *root) //使用前序遍历序列化
  {
      if(root == NULL) return;
      len += sprintf(buff + len ,&quot;%d&quot;,root-&gt;key);//sprintf的返回值是输出的字符数
      if(root-&gt;lchild == NULL &amp;&amp; root-&gt;rchild == NULL) return;
      len += sprintf(buff + len ,&quot;(&quot;);
      __serialize(root-&gt;lchild);
      if(root-&gt;rchild)
      {
          len += sprintf(buff + len ,&quot;,&quot;);
          __serialize(root-&gt;rchild);
      }
      len += sprintf(buff + len ,&quot;)&quot;);
      return ;
  }



  void serialize(Node *root)
  {
      memset(buff,0,sizeof(buff));
      len = 0;
      __serialize(root);
      return;
  }


  Node *deserialize(char *buff,int n)
  {
      Node **s = (Node **)malloc(sizeof(Node *) * 100);
      int top = -1,flag = 0,scode = 0; //这里使用了状态机的算法思维
      Node *p = NULL , *root =NULL;
      for(int i = 0 ; buff[i];i++)
      {
          switch(scode)
          {
          case 0:
              {
              if(buff[i] &gt;= &#39;0&#39; &amp;&amp; buff[i] &lt;= &#39;9&#39;) scode = 1;
              else if(buff[i] == &#39;(&#39;) scode = 2;
              else if(buff[i] == &#39;,&#39;) scode = 3;
              else scode = 4;
              i -= 1;
              }
              break;
          case 1:
              {
              int num = 0;
              while(buff[i] &lt;= &#39;9&#39; &amp;&amp; buff[i] &gt;= &#39;0&#39;)
              {
                  num = num * 10 +(buff[i] - &#39;0&#39;);
                  i += 1;
              }
              p = getnewnode(num);
              if(top &gt;= 0 &amp;&amp; flag == 0) s[top]-&gt;lchild = p;
              if(top &gt;= 0 &amp;&amp; flag == 1) s[top]-&gt;rchild = p;
              i -= 1; //得到num后，i会指向下一个位置，但外层循环有i+1，为抵消影响，在这i-1
              scode = 0;
              }
              break;
          case 2:
              {
              s[++top] = p;
              flag = 0;
              scode = 0;
              }
              break;
          case 3:
              {
              flag = 1;
              scode = 0;
              }
              break;
          case 4:
              {
              root = s[top--];
              scode = 0;
              }
              break;
          }
      }
      return root;
  }

  void print(Node *node)
  {
      printf(&quot;%d(%d,%d)\\n&quot;,KEY(node),KEY(node-&gt;lchild),KEY(node-&gt;rchild));
      return ;
  }

  void output(Node *root)
  {
      if(root == NULL) return;
      print(root);
      output(root-&gt;lchild);
      output(root-&gt;rchild);
      return;
  }
  int main()
  {
      srand((unsigned)time(NULL));
      #define n 10
      Node *root = getranderbinarytree(n);
      serialize(root);
      output(root);
      cout &lt;&lt; buff &lt;&lt; &quot; &quot; &lt;&lt;&quot;广义表&quot;;
      Node *new_root = deserialize(buff,len);
      output(new_root);
      clear(root);
      return 0;
  }
</code></pre></li></ul><h3 id="哈夫曼编码" tabindex="-1"><a class="header-anchor" href="#哈夫曼编码"><span>哈夫曼编码</span></a></h3><p><img src="`+l+`" alt="alt text" loading="lazy"><br><strong>两个字符编码不能形成前缀关系</strong></p><pre><code>#include&lt;bits/stdc++.h&gt;
using namespace std;
typedef struct Node
{
    int freq;
    char ch;
    struct Node *lchild,*rchild;
}Node;

Node *getnewnode(int freq,char ch)
{
    Node *p = new Node;
    p-&gt;ch = ch;
    p-&gt;freq = freq;
    p-&gt;lchild = p-&gt;rchild = NULL;
    return p;
}


void swap_node(Node **node_arr,int i,int j)
{
    Node *temp = node_arr[i];
    node_arr[i] = node_arr[j];
    node_arr[j] = temp;
    return;
}

int find_min_node(Node **node_arr,int n)
{
    int ind = 0;
        for(int j = 1;j &lt;= n;j++)
        {
            if(node_arr[ind]-&gt;freq &gt; node_arr[j]-&gt;freq) ind = j;
        }
    return ind;
}
//重难点：哈夫曼树建立过程
Node *buildhaffmantree(Node **node_arr,int n)
{
    for(int i = 1;i &lt; n;i++)
    {
        int ind1 = find_min_node(node_arr,n - i);
        swap_node(node_arr,ind1,n-i); //将最小值与当前最后一个节点交换位置
        int ind2 = find_min_node(node_arr,n - i - 1);
        swap_node(node_arr ,ind2,n - i - 1);
        int freq = node_arr[n - i]-&gt;freq + node_arr[n - i - 1]-&gt;freq;
        Node *node = getnewnode(freq , 0);
        node-&gt;lchild = node_arr[n - i];
        node-&gt;rchild = node_arr[n- i - 1];
        node_arr[n - i - 1] = node;
    }
    return node_arr[0];
}

void extracthaffmancode(Node *root ,char buff[],int k)
{
    buff[k] = 0;
    if(root-&gt;lchild == NULL &amp;&amp; root-&gt;rchild == NULL)
    {
        cout &lt;&lt; root-&gt;ch &lt;&lt; buff &lt;&lt; endl;
        return ;
    }
    buff[k] = &#39;0&#39;;
    extracthaffmancode(root-&gt;lchild,buff,k+1);
    buff[k] = &#39;1&#39;;
    extracthaffmancode(root-&gt;rchild,buff,k+1);
    return ;
}
void clear(Node *root)
{
    if(root = NULL) return ;
    clear(root-&gt;lchild);
    clear(root-&gt;rchild);
    delete root;
    return ;
}


int main()
{
    int n,freq;
    char s[10];
    cin &gt;&gt; n;
    Node **node_arr = new Node *[n];
    for(int i = 0;i &lt; n;i++)
    {
        cin &gt;&gt; s &gt;&gt; freq;
        node_arr[i] = getnewnode(freq,s[0]);
    }
    Node *root = buildhaffmantree(node_arr,n);
    char buff[1000];
    extracthaffmancode(root,buff,0);
    clear(root);
    return 0;
}
</code></pre><h2 id="n叉树前序遍历" tabindex="-1"><a class="header-anchor" href="#n叉树前序遍历"><span>n叉树前序遍历</span></a></h2><p><img src="`+a+`" alt="alt text" loading="lazy"><br> /*<br> // Definition for a Node.<br> class Node {<br> public:<br> int val;<br> vector&lt;Node*&gt; children;</p><pre><code>    Node() {}

    Node(int _val) {
        val = _val;
    }

    Node(int _val, vector&lt;Node*&gt; _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
public:
    vector&lt;int&gt; preorder(Node* root) {
    if(root == NULL) return vector&lt;int&gt;();
    vector&lt;int&gt; ans;
    ans.push_back(root-&gt;val);
    for(auto x: root-&gt;children)
    {
        vector&lt;int&gt; temp = preorder(x);
        for(auto y : temp) ans.push_back(y);
    } 
    return ans;
    }
};      
</code></pre><h4 id="从前序与中序遍历序列构造二叉树" tabindex="-1"><a class="header-anchor" href="#从前序与中序遍历序列构造二叉树"><span>从前序与中序遍历序列构造二叉树</span></a></h4><figure><img src="`+d+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li>使用递归思想</li><li>对大树使用前序与中序遍历结果恢复二叉树 <ul><li><p>对左右子树也分别用前中序遍历结果恢复</p></li><li><p>返回根节点</p><pre><code>  class Solution {
  public:
      TreeNode* buildTree(vector&lt;int&gt;&amp; preorder, vector&lt;int&gt;&amp; inorder) {
      if(preorder.size() == 0) return NULL;
      int pos = 0;
      while(inorder[pos] != preorder[0]) pos += 1;
      TreeNode *root = new TreeNode(preorder[0]);
      vector&lt;int&gt; pre , in;
      for(int i = 1;i &lt;= pos;i++) pre.push_back(preorder[i]);
      for(int i = 0;i &lt;= pos -1;i++) in.push_back(inorder[i]);
      root-&gt;left = buildTree(pre,in);
      pre.clear();
      in.clear();
      for(int i = pos + 1;i &lt; preorder.size();i++) 
      {
      pre.push_back(preorder[i]);
      in.push_back(inorder[i]);
      }
      root-&gt;right = buildTree(pre,in);
      return root;
      }
  };
</code></pre></li></ul></li></ul><h4 id="二叉树的层序遍历" tabindex="-1"><a class="header-anchor" href="#二叉树的层序遍历"><span>二叉树的层序遍历</span></a></h4><figure><img src="`+s+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><p>广搜</p><pre><code>class Solution {
public:
    vector&lt;vector&lt;int&gt;&gt; levelOrder(TreeNode* root) {
    if(root == NULL) return vector&lt;vector&lt;int&gt;&gt;();
    TreeNode *node;
    queue&lt;TreeNode *&gt; q;
    q.push(root);
    vector&lt;vector&lt;int&gt;&gt; ans;
    while(!q.empty())
    {
        int cnt = q.size();
        vector&lt;int&gt; temp;
        for(int i = 0;i &lt; cnt;i++)
        {
            node = q.front();
            temp.push_back(node-&gt;val);
            if(node-&gt;left) q.push(node-&gt;left);
            if(node-&gt;right) q.push(node-&gt;right);
            q.pop();
        }
        ans.push_back(temp);
    }
    return ans;
}
};
</code></pre><p>深搜</p><ul><li><p>深搜的精髓是要找到当前节点的层数，并在相应二维数组的一维数组的位置插入数值</p></li><li><p>要记得在相应层数扩充一维数组</p><pre><code>  class Solution {
      void dfs(TreeNode *root,int k,vector&lt;vector&lt;int&gt;&gt; &amp;ans)
      {
          if(root == NULL) return ;
          if(k == ans.size()) ans.push_back(vector&lt;int&gt;());
          ans[k].push_back(root-&gt;val);
          dfs(root-&gt;left,k+1,ans);
          dfs(root-&gt;right,k+1,ans);
          return ;
      }
  public:
      vector&lt;vector&lt;int&gt;&gt; levelOrder(TreeNode* root) {
      vector&lt;vector&lt;int&gt;&gt; ans;
      dfs(root,0,ans);
      return ans;
  }
  };
</code></pre></li></ul><h4 id="翻转二叉树" tabindex="-1"><a class="header-anchor" href="#翻转二叉树"><span>翻转二叉树</span></a></h4><figure><img src="`+c+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><ul><li><p>利用递归思想 解决完当前根节点的子节点 就解决子节点的子节点</p></li><li><p>可以利用c++里面的swap函数，不需要手写交换函数</p><pre><code>  class Solution {
  public:
      TreeNode* invertTree(TreeNode* root) {
          if(root == NULL) return NULL;
          swap(root-&gt;right,root-&gt;left);
          invertTree(root-&gt;left);
          invertTree(root-&gt;right);
          return root;    
      }
  };
</code></pre></li></ul><h4 id="二叉树层序遍历" tabindex="-1"><a class="header-anchor" href="#二叉树层序遍历"><span>二叉树层序遍历</span></a></h4><figure><img src="`+p+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><pre><code>    class Solution {
    public:
        void dfs(TreeNode *root,int k,vector&lt;vector&lt;int&gt;&gt; &amp;ans)
        {
            if(root == NULL) return;
            if(k == ans.size()) ans.push_back(vector&lt;int&gt;());
            ans[k].push_back(root-&gt;val);
            dfs(root-&gt;left,k+1,ans);
            dfs(root-&gt;right,k+1,ans);
            return ;
        }
        vector&lt;vector&lt;int&gt;&gt; levelOrderBottom(TreeNode* root){
            vector&lt;vector&lt;int&gt;&gt; ans;
            dfs(root,0,ans);
            for(int i = 0,j = ans.size()-1;i &lt; j;i++,j--)
            {
                swap(ans[i],ans[j]);
            }
        return ans;
        }
    };
</code></pre><h4 id="二叉树的锯齿形层序遍历" tabindex="-1"><a class="header-anchor" href="#二叉树的锯齿形层序遍历"><span>二叉树的锯齿形层序遍历</span></a></h4><figure><img src="`+g+`" alt="alt text" tabindex="0" loading="lazy"><figcaption>alt text</figcaption></figure><pre><code>    class Solution {
    public:
        void dfs(TreeNode *root,int k,vector&lt;vector&lt;int&gt;&gt; &amp;ans)
            {
            if(root == NULL) return;
            if(k == ans.size()) ans.push_back(vector&lt;int&gt;());
            ans[k].push_back(root-&gt;val);
            dfs(root-&gt;left,k+1,ans);
            dfs(root-&gt;right,k+1,ans);
            return ;
            }
        vector&lt;vector&lt;int&gt;&gt; zigzagLevelOrder(TreeNode* root){
            vector&lt;vector&lt;int&gt;&gt; ans;
            dfs(root,0,ans);
            for(int k = 1;k &lt; ans.size();k+=2)
            {
                for(int i = 0,j = ans[k].size()-1;i &lt; j;i++,j--)
                swap(ans[k][i],ans[k][j]);
            }
            return ans;
        }
    };
</code></pre><h4 id="合并果子" tabindex="-1"><a class="header-anchor" href="#合并果子"><span>合并果子</span></a></h4><p><img src="`+u+'" alt="alt text" loading="lazy"><br><strong>哈夫曼编码的应用</strong><br><img src="'+h+`" alt="alt text" loading="lazy"></p><ul><li><p>最优体力是堆的数量乘以路径长度（个人理解是层数）</p></li><li><p>与哈夫曼算法本质是一样的</p></li><li><p>这里用到了set类模板 要使用pair才可以存储键值对</p></li><li><p>先找出最小的，将其删除，再找出次小的，再删除，然后将这两堆合并，合并次数为n-1次</p><pre><code>  #include&lt;bits/stdc++.h&gt; //合并果子 海贼oj287
  using namespace std;
  typedef pair&lt;int,int&gt; PII;
  int main()
  {
      int n;
      set&lt;PII&gt; s;
      cin &gt;&gt; n;
      for(int i = 0,a;i &lt; n;i++)
      {
          cin &gt;&gt; a;
          s.insert(PII(a,i));
      }
      int ans = 0;
      for(int i = 1;i &lt; n;i++)
      {
          int a = s.begin()-&gt;first;
          s.erase(s.begin());
          int b = s.begin()-&gt;first;
          s.erase(s.begin());
          ans += a+b;
          s.insert(PII(a + b,n + i));
      }
      cout &lt;&lt; ans;
      return 0;
  }
</code></pre></li></ul><h4 id="货仓选址" tabindex="-1"><a class="header-anchor" href="#货仓选址"><span>货仓选址</span></a></h4><p><img src="`+f+`" alt="alt text" loading="lazy"><br><strong>分析</strong></p><blockquote><p>设货仓建在x坐标，x左侧商店有P家，x右侧商店有Q家。若P &lt; Q,则每把货仓的选址向右移动1单位距离，距离之和就会变小Q - P(左侧的P家店到x的距离增加P，因为每家店到x的距离都增加了1单位距离，右侧的Q家店到x的距离减少Q，而P &lt; Q,因此距离减少了Q - P)，若P &gt; Q ,同理可证明距离增加了P - Q<br> 因此当货仓在所有位置的中位数时，距离之和最小</p></blockquote><pre><code>    #include&lt;bits/stdc++.h&gt; //海贼oj245 货仓选址
    using namespace std;
    int main()
    {
        int n;
        vector&lt;int&gt; arr;
        cin &gt;&gt; n;
        for(int i = 0,a;i &lt; n;i++)
        {
            cin &gt;&gt; a;
            arr.push_back(a);
        }
        sort(arr.begin(),arr.end());
        int p = arr[n/2],ans = 0;//n不论奇偶n/2都是中位数
        for(int i = 0;i &lt; n;i++)
        {
            ans += abs(arr[i] - p);
        }
        cout &lt;&lt; ans;
        return 0;
    }
</code></pre>`,51)])])}const L=t(b,[["render",m]]),k=JSON.parse('{"path":"/ds/%E6%A0%91%E4%B8%8E%E4%BA%8C%E5%8F%89%E6%A0%91.html","title":"树","lang":"zh-CN","frontmatter":{"title":"树","author":"xbZhong","isOriginal":true,"article":false,"category":"ds","timeline":true,"description":"树 树的节点代表集合，树的边代表关系 广度优先遍历 也叫做层序遍历，一层一层来遍历树 使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点 深度优先遍历 使用栈来实现遍历 先左后右 判断栈顶元素是否有子节点，有子节点则入栈，无子节点则出栈，直到变为空栈 二叉树性质 度为0的节点比度为2的节点多一个 种类 完全二叉树：只有最后一层缺少右侧节点 对于编号...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"树\\",\\"description\\":\\"树 树的节点代表集合，树的边代表关系 广度优先遍历 也叫做层序遍历，一层一层来遍历树 使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点 深度优先遍历 使用栈来实现遍历 先左后右 判断栈顶元素是否有子节点，有子节点则入栈，无子节点则出栈，直到变为空栈 二叉树性质 度为0的节点比度为2的节点多一个 种类 完全二叉树：只有最后一层缺少右侧节点 对于编号...\\"}"],["meta",{"property":"og:url","content":"https://xbzhong.cn/ds/%E6%A0%91%E4%B8%8E%E4%BA%8C%E5%8F%89%E6%A0%91.html"}],["meta",{"property":"og:site_name","content":"阿b的博客"}],["meta",{"property":"og:title","content":"树"}],["meta",{"property":"og:description","content":"树 树的节点代表集合，树的边代表关系 广度优先遍历 也叫做层序遍历，一层一层来遍历树 使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点 深度优先遍历 使用栈来实现遍历 先左后右 判断栈顶元素是否有子节点，有子节点则入栈，无子节点则出栈，直到变为空栈 二叉树性质 度为0的节点比度为2的节点多一个 种类 完全二叉树：只有最后一层缺少右侧节点 对于编号..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:image","content":"https://xbzhong.cn/screenshot/ds/image-21.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-10T12:45:16.000Z"}],["meta",{"property":"article:author","content":"xbZhong"}],["meta",{"property":"article:modified_time","content":"2025-10-10T12:45:16.000Z"}]]},"git":{"createdTime":1760100316000,"updatedTime":1760100316000,"contributors":[{"name":"BO","username":"BO","email":"2396768163@qq.com","commits":1,"url":"https://github.com/BO"}]},"readingTime":{"minutes":10.51,"words":3154},"filePathRelative":"ds/树与二叉树.md","excerpt":"<h2>树</h2>\\n<p><strong>树的节点代表集合，树的边代表关系</strong></p>\\n<h3>广度优先遍历</h3>\\n<ul>\\n<li>\\n<p>也叫做层序遍历，一层一层来遍历树</p>\\n</li>\\n<li>\\n<p>使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点</p>\\n<pre><code>  void bfs(Node *root) //广度优先遍历\\n  {\\n      head = tail = 0;\\n      Queue[tail++] = root;\\n      while(head&lt;tail)\\n      {\\n          Node *node = Queue[head];\\n          cout &lt;&lt; node-&gt;key &lt;&lt; endl;\\n          if(node-&gt;lchild) Queue[tail++] = node-&gt;lchild;\\n          if(node-&gt;rchild) Queue[tail++] = node-&gt;rchild;\\n          head++;\\n      }\\n      return;\\n  }\\n</code></pre>\\n</li>\\n</ul>","autoDesc":true}');export{L as comp,k as data};
