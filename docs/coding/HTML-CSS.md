---
title: HTML和CSS
author: xbZhong
isOriginal: true
article: true
category: code
timeline: true
icon: skill-icons:html
date: 2024-03-24
---
### HTML
超文本（链接）标记（标签）语言
#### 标签语法
* 成对出现，中间包含内容
* 结束标签比开始标签多/
#### 基本骨架
* html:整个网页
* head:网页头部，存放给浏览器看的代码，如css
* body:网页主体，存放给用户看的代码，如图片，文字
* title:网页标题
* 快捷生成方式:!（英文）配合回车
#### 注释
**注释标签：`< !--...-- >`
**快捷键：ctrl + /**

#### 标签
##### 标题标签
* 标签名:h1-h6，一共有6级

* ```html
  <h1>
      1
  </h1>
  <h2>
      2
  </h2>
  ```

* <h2>
      2
  </h2>
##### 段落标签
* 标签名：p（双标签）
##### 换行与水平线标签
* 换行:< br >(单标签)
* 水平线:< hr >(单标签)
#####   切换到桌面cd Desktop/bash
|标签名|效果|
|---|---|
|strong|加粗|
|em|倾斜|
|ins|下划线|
|del|删除线|
```html
<strong>我真帅</strong>
<em>还可以</em>
<ins>不错</ins>
<del>一般般</del>
```

<strong>我真帅</strong>
<em>还可以</em>
<ins>不错</ins>
<del>一般般</del>



##### 图像标签

格式:< img src="图片的URL" >(src时图片路径或在线网址)
**写的时候写"./"就有提示，用鼠标选取所选图片即可**
|属性|作用|说明|
|---|---|---|
|alt|替换文本|图片无法显示的时候出现的文字|
|title|提示文本|鼠标悬停在图片上时显示的文字|
|width|图片宽度|值为数字，无单位|
|heigth|图片高度|值为数字，无单位|
##### 路径
###### 相对路径(找图片时有用)
* .:表示当前文件所在文件夹
* ..:表示当前文件上一级文件夹
* /:进入某个文件夹里面
###### 绝对路径
* 从盘符出发 可以用\也可以用/
##### 超链接
< a href="" > 内容 < /a >
**href是跳转地址，必须属性，内容为要显示的文字**
<br>

**加上target= "_blank"即可实现新窗口打开超链接**
##### 音频标签
* 格式:< audio src="" controls >< /audio > 
|属性|作用|说明|
|---|---|---|
|src|音频URL|MP3,Ogg，Wav|
|controls|显示控制面板||
|loop|循环播放||
|autoplay|自动播放|一般都禁用|
##### 视频标签
* 格式:< video src="" controls >< /video > 
|属性|作用|说明|
|---|---|---|
|src|视频URL|MP4,Ogg|
|controls|显示控制面板||
|loop|循环播放||
|muted|静音播放|
|autoplay|自动播放|在静音状态下支持自动播放|
#### 列表
1. 有序列表
    * ol(父级)嵌套li(子级)，且ol标签里面只能包裹li标签
    
    * ```html
      <ol>
          <li>你真帅啊</li>
          <li>我肯定知道</li>
      </ol>
      ```
    
    * <ol>
          <li>你真帅啊</li>
          <li>我肯定知道</li>
      </ol>
    
2. 无序列表
    * ul(父级)嵌套li(子级)，且ol标签里面只能包裹li标签
    
    * ```html
      <ul>
          <li>我不帅</li>
          <li>没关系</li>
      </ul>
      ```
    
    * <ul>
          <li>我不帅</li>
          <li>没关系</li>
      </ul>
    
3. 定义列表
    * dl(父级)嵌套dt和dd(子级)，dl是定义列表，dt是定义列表标题，dd是定义列表详情
    * 且dl标签里面只能包裹dd和dt标签
#### 表格
* 标签:table嵌套tr，tr嵌套td/th
  ```html
  <table>
      <tr>
          <th>命令</th>
          <th>说明</th>
      </tr>
      <tr>
          <td>select * from students</td>
          <td>从students中取所有的信息</td>
      </tr>
  </table>
  ```

* <table>
      <tr>
          <th>命令</th>
          <th>说明</th>
      </tr>
      <tr>
          <td>select * from students</td>
          <td>从students中取所有的信息</td>
      </tr>
  </table>

|标签名|说明|
|---|---|
|table|表格|
|tr|行|
|th|表头单元格|
|td|内容单元格|

**使用border属性可以给表格添加边框线**

#### 合并单元格
##### 跨行合并
* 保留最上单元格，添加属性rowspan(取值是数字，表示需要合并的单元格数量)
##### 跨列合并
* 保留最左单元格，添加属性colspan(取值是数字，表示需要合并的单元格数量)

#### 表单
作用：收集用户信息
* input标签
    * type属性值不同则功能不同(< type="" >)
    
    * ```html
      <!--文本框 -- >
      <input type="text">
      <!--密码框 -- >
      <input type="password">
      <!--多选框 -- >
      <input type="checkbox">
      ```
|type属性值|说明|
|---|---|
|text|文本框，用于输入单行文本|
|password|密码框|
|radio|单选框|
|checkbox|多选框|
|file|上传文件|

* input标签占位文本(提示信息)
    * placeholder="提示信息"

* radio标签
|属性名|作用|特殊说明|
|------|-----|-----|
|name|控件名称|控件分组，同组只能选中一个|
|checked|默认选中|属性名与属性值相同|

* file
添加属性multiple可以实现文件多选功能

* checkbox
默认选中：checked

#### 下拉菜单
标签：select嵌套option，select是下拉菜单整体，option是下拉菜单的每一项(都是双标签)
**selected属性可以帮助确定下拉菜单的默认选中**
< option selected> < option >

```html
<select>
    <option>王毫升</option>
    <option selected>可泣鬼神</option>
    <option>夏夜星空梦</option>
</select>
```

<select>
    <option>王毫升</option>
    <option selected>可泣鬼神</option>
    <option>夏夜星空梦</option>
</select>


#### 文本域
作用:输入**多行**文本
标签:textarea(字面翻译，双标签)

```html
<textarea>你好</textarea>
```



#### label标签(双标签)
作用:某个标签的说明文本，也可以增大表单控件的点击范围
* 写法一
    * label标签只包裹内容
    * 设置label标签的for属性值和表单控件的id属性值相同>

```html
< body >
< input type = "radio" name = "gender" id = "man">
< label for = "gender">男< /label >
< /body >
```





* 写法二
    * 使用label标签包裹文字和表单控件，不需要属性

```html
<label> <input type = "radio"> 女</label>
```

#### 按钮(双标签)(button)
标签:< button type = ""> 按钮 < /button >

|type属性值|说明|
|---|---|
|submit|提交按钮，点击后可以提交数据到后台(默认功能)|
|password|重置按钮，点击后将表单控件恢复默认值|
|button|普通按钮，没有功能，一般配合javascript使用|

```html
<!-- 重置按钮 -->
<button type = "reset">
    确定
</button>
<!-- 提交按钮 -->
<button type = "submit">
    提交
</button>
```

<!-- 重置按钮 -->
<button type = "reset">
    确定
</button>
<!-- 提交按钮 -->
<button type = "submit">
    提交
</button>

#### form标签

要想表单标签可以用，要讲这些标签放在form标签里

**表单属性设置**

* action：设置表单数据提交地址
* method：设置表单提交的方式，通常有get和post

**表单元素属性设置**

- name：表单元素的名称，用于作为提交表单数据时的参数名
- value：表单元素的值，用于提交表单数据时参数名所对应的值
  - ==在单选框，多选框等需要选择的表单元素==中需要设置value值，提交的时候会携带给服务器
  - ==需要用户手动输入的表单元素==可以不用设置value值
    - 如果设置了 `value` 属性，提交的数据在用户未进行修改时会是 `value` 中的内容。
    - 如果用户修改了输入框的内容，则提交的数据将是用户输入的新内容，而不是 `value` 属性的值。

```html css
<form action = '地址' method = 'GET'>
    <label><input type = 'text'>输入你的姓名</label>
    <br>
    <label><input type = 'password'>输入你的密码</label>
    <br>
    <label><input type = 'radio' name = 'gender' value = '1'>男  <input type = 'radio' name = 'gender' value = '0'>女</label>
</form>
```



#### 无语义的布局标签
* div:独占一行
* span:不换行

|显示结果|描述|实体名称|
|------|-----|-----|
| |空格|&nbsp;|
|<|小于号|&lt;|
|>|大于号|&gt;|


### CSS(Cascading Style Sheets) 
**用来描述HTML文档的呈现(美化内容)**
* 书写位置:title标签下方添加style双标签，style标签里面书写CSS代码
* 其是由选择器+大括号
* 大括号里面填属性名:属性值;
* 引入方式
    * 内部样式表:写在style标签里面
    * 外部样式表:写在单独的CSS文件里面，在HTML使用link标签引入
    * 行内样式:配合js使用，CSS写在标签的style属性值里
      * < div style="color:red;font-size:30px;"> 这是 div标签< /div >

```html css
< style >
div
{
color:red;    
}
< /style >
<div>这是div标签</div>
```

#### 选择器
* 标签选择器：以标签名作为选择器，选中同名标签设置相同的样式
* 类选择器：查找标签，差异化设置标签的显示效果
    1. 定义类选择器->.类名
    2. 使用类选择器->标签添加class="类名"
    
    ```css
    < style >
    .red
    {
    color:red;    
    }
    < /style >
    < div class="red">这是div标签< /div >
    ```
    
    3. 一个标签可以使用多个类名，class属性可以写多个类名，用空格隔开
* id选择器:查找标签，差异化设置标签的显示效果(一般用来配合js使用)
    1. 定义id选择器->#id名
    2. 使用id选择器->标签添加id="id名 "

```html css
<style>
#id
{
 	color:red;
 	font-size:300px;   
}
</style>
<div id = "id">你好呀</div>
```



* 通配符选择器:查找页面所有标签，设置相同样式
    * 格式:*，不需要调用，浏览器自动查找页面所有标签设置相同的格式

##### 新属性
|属性名|作用|
|---|---|
|width|宽度|
|height|高度|
|background-color|背景色|

|描述|属性|
|------|----|
|字体大小|font-size|
|字体粗细|font-weight|
|字体倾斜|font-style|
|行高|line-height|
|字体族|font-family|
|字体复合属性|font|
|文本缩进|text-indent|
|文本对齐|text-align|
|修饰线|text-decoration|
|颜色|color|

  1. * 属性名：font-size

     * 属性值：文字尺寸(以px为单位)

```css
<style>
#id
{
 	color:red;
 	font-size:300px;   
}
</style>
```

2. font-weight

* 数字

|1|2|
|---|---|
|正常|400|
|加粗|700|

```html css
<style>
#id{
    font-weight:400;
}
.font{
    font-weight:700;
}
</style>
```

3. font-style

* 属性值:正常：normal;倾斜:italic

4. line-height

* 作用:设置多行文本的间距
* 属性值:数字+px或者数字(当前标签属性值的倍数)
* 垂直居中技巧:行高属性值等于盒子属性值大小

5. font-family

* 属性值:字体名称

6. font属性

* 字号和字体值必须书写

* font:是否倾斜 是否加粗 字号/行高 字体(必须按顺序书写)

* ```css
  < style >
  div
  {
      font-style: italic;
      font-weight: 700; /* 700表示粗体 */
      font-size: 30px;
      font-family: "楷体", serif;
  }
  < /style >
  <div>这是div标签</div>
  ```

7. text-indent

* 属性值:数字+px或者数字+em(1em = 当前标签的字号大小)

8. text-allign

* 作用:控制内容水平对齐方式

|属性值|效果|
|---|---|
|left|左对齐(默认)|
|center|居中对齐|
|right|右对齐|

9. text-decoration

|属性值|效果|
|---|---|
|none|无|
|underline|下划线|
|line-through|删除线|
|overline|上划线|

10. color

* rgb表示法:rgb(r,g,b)：r,g,b分别表示红绿蓝三原色，取值0-255
* rgba表示法:rgb(r,g,b,a):a表示透明度，取值0-1

##### 复合选择器
* 定义:由两个或多个基础选择器，通过不同方式组合而成
* 作用:更准确、更高效的选择目标元素
###### 后代选择器
* 选中某元素的后代元素

* 写法: 父选择器 子选择器{CSS属性},父子选择器之间用空格隔开

* ```html css
  <style>
  div span{
      color:red;
  }
  </style>
  <div>
      <span>我是你爸爸</span>
  </div>
  ```

###### 子代选择器
* 选中某元素的子代元素(最近的子级)

* 写法:父选择器>子选择器{CSS属性}

* ```html css
  <style>
  div > span{
      color:red;
  }
  </style>
  <div>
      <span>我是你爸爸</span>
  </div>
  ```

###### 并集选择器
* 选中多组标签设置相同的样式
* 写法：选项器1，选择器2，选择器3，....{CSS属性}

###### 交集选择器
* 选中同时满足多个条件的元素
* 写法:选择器1选择器2{CSS属性}，选择器之间连写，无任何符号

###### 伪类选择器
* 伪类表示元素状态，选中元素的某个状态设置样式
* 鼠标悬停状态：选择器：hover{CSS属性}
* 伪类-超链接（要按lvha的顺序写）
    |选择器|作用|
    |---|---|
    |:link|访问前|
    |:visited|访问后|
    |:hover|鼠标悬停|
    |:acctive|点击时(激活)|
    
    ```html css
    <style>
    div:hover{
        color:red;
    }
    a:link{
        color:blue;
    }
    </style>
    <div>
        我是你爸爸
    </div>
    <a href=''>哈哈</a>
    ```
    
    

#### CSS特性
* 继承性
    * 子级默认继承父级的文字控制属性(子级有自己的样式就不继承)
* 层叠性
    * 相同的属性会覆盖:后面的CSS属性覆盖前面的CSS属性
    * 不同的属性会叠加:不同的CSS属性都生效
* 优先级
    * 当一个标签使用了多种选择器时，基于不同种类的选择器的匹配规则
    * 公式:通配符选择器< 标签选择器 < 类选择器 < id选择器 < 行内样式 < !important
    * 选中标签的范围越大，优先级越低
    * 叠加计算规则
        * 如果是复合选择器，需要权重叠加计算
        * (行内样式，id选择器个数，类选择器个数，标签选择器个数)
            * 从左向右依次比较个数，同一级个数多的优先级高，个数相同则向后比较
            * ！important权重最高
            * 继承权重最低

#### Emmet写法
代码的简写方式
* HTML
    ![alt text]\(image.png)
* CSS(大多数简写方式为属性单词的首字母)

#### 背景属性
|描述|属性|
|---|---|
|背景色|background-color|
|背景图|background-image(bgi)|
|背景图平铺方式|background-repeat(bgr)|
|背景图位置|background-position(bgp)|
|背景图缩放|background-size(bgz)|
|背景图固定|background-attachment(bga)|
|背景图复合属性(不区分先后顺序)|background(bg)|

* background-repeat

|属性值|效果|
|---|---|
|no-repeat|不平铺|
|repeat|平铺(默认效果)|
|repeat-x|水平方向平铺|
|repeat-y|垂直方向平铺|

* background-position
* 属性值:水平方向位置 垂直方向位置
    * 关键字

|关键字|位置|
|---|---|
|left|左侧|
|right|右侧|
|center|居中|
|top|顶部|
|bottom|底部|

  * 坐标(数字+px，正负都可以)
  * 正数向右(下)，负数向左(上)

提示:
* 关键字取值写法，可以颠倒取值顺序
* 也可以只写一个关键字，另一个方向默认居中；数字只写一个值表示水平方向，垂直方向为居中

* background-size
    * 关键字
      * cover：等比例缩放背景图片以完全覆盖背景区，可能背景图片部分看不见
      * contain：等比例缩放背景图片以完全装入背景区，可能背景区部分空白
      * 百分比:根据盒子尺寸计算图片大小
      * 数字+单位(例如：px)

* 背景图固定(background-attachment)
作用：背景不会随着元素的内容滚动
属性值：fixed

* background
属性值：背景色 背景图 背景图平铺方式 背景图位置/背景图缩放 背景图固定

#### 显示模式
作用：布局网页的时候，根据标签的显示模式选择合适的标签摆放内容
* 转换显示模式
属性名：display
属性值：

|属性值|效果|
|---|---|
|block|块级|
|inline-block|行内块|
|inline|行内|

* 块级
独占一行，宽高属性生效
* 行内
一行共存多个，宽高属性不生效
* 行内块
一行共存多个，宽高属性生效


#### 结构伪类选择器
作用：根据元素的结构关系查找元素，然后添加对应的CSS
|选择器|说明|
|---|---|
|E:first-child|查找第一个E元素|
|E:last-child|查找最后一个E元素|
|E:nth-child(N)|查找第N个E元素(第一个元素N值为1)|

|功能|公式|
|---|---|
|偶数标签|2n|
|奇数标签|2n+1;2n-1|
|找到5的倍数的标签|5n|
|找到第五个以后的标签|n+5|
|找到第五个以前的标签|-n+5|

#### 伪元素选择器
作用：创建虚拟元素（伪元素），用来摆放装饰性的内容
|选择器|说明|
|---|---|
|E::before|在E元素里面最前面添加一个伪元素|
|E::after|在E元素里面最后面添加一个伪元素|
注意：必须设置content:""，用来设置伪元素的内容，无内容则引号留空

#### 盒子模型
作用：布局网页，摆放盒子和内容
重要组成部分：
* 内容区域-width&height
* 内边距-padding（出现在内容与盒子边缘之间），也有方位
  * 属性值：顺时针方向，上右下左
  * 四值：上右下左
  * 三值：上左右下
  * 两值：上下左右
* 边框线-border(bd)
  * 属性值：边框线粗细S，线条样式，颜色
  * 常用线条样式
    * solid：实线
    * dashed：虚线
    * dotted：点线
  * 方向边框线：属性名：border-方位名词
* 外边距-margin（出现在盒子外面,且四个方向都一样），可以设置方位，且可以加auto，数值由浏览器自己计算
    * 版心居中时盒子要有宽度
 * 盒子模型尺寸计算
   * 盒子尺寸=内容尺寸+border尺寸+内边距尺寸

##### 清楚默认样式
* 把内外边距清零即可
##### 元素溢出
**overflow**

|属性值|效果|
|---|---|
|hidden|溢出隐藏|
|scroll|溢出滚动（无论是否溢出，都显示滚动条位置）|
|auto|溢出滚动（溢出才显示滚动条位置）|

##### 外边距问题-合并现象
场景：垂直排列的兄弟元素，上下margin会合并
现象：取两个margin中的较大值生效
##### 外边距问题-塌陷问题
场景：父子级的标签，子级的添加上外边距会产生塌陷问题
现象：导致父级一起向下移动
解决方法：
* 取消子级margin，父级设置padding
* 父级设置overflow:hidden
* 父级设置border:top
##### 行内元素-内外边距问题
场景：行内元素添加margin和padding，无法改变元素垂直位置
解决方法：给行内元素添加line-height可以改变垂直位置
##### 盒子模型-圆角
作用：设置元素的外边框为圆角
属性名：border-radius
* 属性值：数字+px/百分比
  * 四个值：从左上角顺时针
  * 没有取值的角与对角取值相同
* 常见应用-正圆形状
  * 给正方形盒子设置圆角属性值为宽高的一半/50%
* 常见应用-胶囊形状
  * 给长方形盒子设置圆角属性值为盒子高度的一半
##### 盒子模型-阴影属性
作用：给元素设置阴影效果
属性名：box-shadow
属性值：x轴偏移量 y轴偏移量 模糊半径 扩散半径 颜色 内外阴影
**注意：x轴偏移量和y轴偏移量必须书写，默认是外阴影，内阴影要加inset**

#### 标准流
**指的是标签在页面中默认的排布规则**

#### 浮动
作用：让块水平水平排列
特点：顶对齐，具备行内块特点
属性名：float
属性值：
* left：左对齐
* right：右对齐
##### 浮动的脱标现象
* 浮动的盒子会脱标
* 在设置float时都设置上就不会

#### 清除浮动
场景：浮动元素会脱标，如果父级没有高度，子级无法撑开父级高度