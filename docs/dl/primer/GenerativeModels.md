---
title: 常见的生成式模型
description: 蛮多都过时了，可以了解
author: xbZhong
isOriginal: true
article: true
category: primer
timeline: true
icon: oui:generate
date: 2024-06-18
---
## PixelRNN

- 随机给一个像素，给予模型**random**值

- 本质上是根据已生成的结果生成新的输出，会考虑**当前时间点**之前的**所有**输出
- 一个像素一个像素生成



## Generative Adversarial Network（GAN 生成对抗网络）

**工作原理**

- 两个网络同时训练，形成一个动态对抗系统
- 生成器学习生成更逼真的数据
- 判别器学习更准确地识别真假数据
- 当判别器无法识别生成器生成的数据是真是假时，生成器就成功了

### Generator（生成器）

**工作流程**

- 接收**随机噪声**作为输入
- 尝试将这些噪声转换成看起来**真实**的数据(如图像、文本等)
- 目标是生成能够**"欺骗"**判别器的数据

### Discriminator（判别器）

**工作流程**

- 接收真实数据样本和生成器创建的假数据样本
- 尝试区分哪些是真实的，哪些是假的
- 目标是正确地分类真实和生成的数据

### **Divergence（散度）**

*是指两个概率分布之间的差异或距离的度量*

- **目标函数**：GAN的训练目标可以被表述为**最小化**真实数据分布和生成数据分布之间的某种散度

### Mode Collapse



[Diffusion（扩散模型）](/dl/cv/DiffusionModel.md)