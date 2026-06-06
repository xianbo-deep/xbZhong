---
title: 人工智能芯片设计导论
index: false
article: false
timeline: false
---

[本页PDF](/pdfs/resource/coursenote/junior/ai_chip.pdf)


**题型**

- 填空
- 简答
- 一道大题

## 面向AI的处理器设计

**世界三大尖端技术**：空间技术、能源技术、人工智能

**人工智能广泛应用的领域**：人脸识别、智能医疗、智能语音、自动驾驶、智能机器人

### CNN & IP

**常见的CNN**：GoogleNet、VGG16、AlexNet、DenseNet、MobileNet、ResNet等

**CNN由很多层组成**

- 卷积层
- 池化层
- 线性整流层（引入非线性）
- 全连接层

**CNN计算特点**

- 操作相对固定
- 计算量大
- 需要的带宽大

**CNN IP方案分类**

- GPU类
- DSP类
- ASIC类
- ASIP类

### ASIP处理器架构设计

**步骤**

1. 算法需求分析
2. 软硬件切割
3. 架构定义
4. 指令集定义
5. 指令集模拟器开发（ISS）
6. ISS仿真 & 架构优化迭代
7. 确定微架构和指令集，进入开发阶段


### ASIP处理器实现难点

**RTL开发过程的注意事项**

- 时序
- 功耗
- 与后端密切迭代


**验证过程中的难点**



**物理实现的难点**

- memory size 过大，导致 memory timing 有问题


### ASIP处理器配套工具链

![](/myMajor/note/image-20260605104131527.png)


## 中国AI芯片行业研究报告
