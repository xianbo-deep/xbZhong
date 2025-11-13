---
title: 模式识别与统计学习
index: false
article: false
timeline: false
---

## EM算法的推导
它的推导和VAE（变分自编码器）以及Diffusion Model（扩散模型）很像，都是由于原函数难以求解，去找到它的下界函数，对下界函数求得最优解，达到优化原函数的目的。感兴趣的可以看一下[VAE](/dl/cv/VAE.md)和[Diffusion Model](/dl/cv/DiffusionModel.md)的推导

首先要了解EM算法的核心：**EM算法是计算每个潜在变量$Z$的后验概率，然后通过加权平均，也就是求期望的方式得到一个近似的估计，最后我们要找到一个能让这个近似估计最大的参数$\theta$**

先来认识一下**KL散度**
$$
KL(q||p) = \sum_{Z}q(Z)\log{\frac{q(Z)}{p(Z)}}
$$
描述的是q分布和p分布之间的距离，因此取值是大于等于0的

首先要明确，EM算法的核心是在每一步**最大化Q函数**
$$
\begin{aligned}
Q(\theta,\theta^{(i)})&=\mathbb{E}_{Z}(\log{P(Y,Z|\theta)}|Y,\theta^{(i)}) \\
&= \sum_{Z}\log{P(Y,Z|\theta)}P(Z|Y,\theta^{(i)})
\end{aligned}
$$

现在来看如何推导出上面这个Q函数

对于EM算法，我们希望最大化观测数据$Y$关于参数$\theta$的对数似然函数
$$
\begin{aligned}
L(\theta) = \log{P(Y|\theta)} &= \log{\sum_{Z}{P(Y,Z|\theta)}} \\
&=\log{\sum_{Z}{q(Z)\frac{P(Y,Z|\theta)}{q(Z)}}}
\end{aligned}
$$

使用**Jeason不等式**
$$
\begin{aligned}
\log{\sum_{Z}{q(Z)\frac{P(Y,Z|\theta)}{q(Z)}}} &\ge \sum_{Z}q(Z)\log{\frac{P(Y,Z|\theta)}{q(Z)}} \\
&=  \sum_{Z}q(Z)\log{P(Y,Z|\theta)} -  \sum_{Z}q(Z)\log{q(Z)}
\end{aligned}
$$

记上式为
$$
\begin{aligned}
\mathcal{{L}}(q,\theta) = \sum_{Z}q(Z)\log{P(Y,Z|\theta)} -  \sum_{Z}q(Z)\log{q(Z)}
\end{aligned}
$$

因为
$$
\log{P(Y,Z|\theta)} = \log{P(Z|Y,\theta)P(Y|\theta)}
$$

因此有
$$
\begin{aligned}
\mathcal{{L}}(q,\theta) &= \sum_{Z}q(Z)\log{P(Y,Z|\theta)} -  \sum_{Z}q(Z)\log{q(Z)} \\
&= \sum_{Z}q(Z)\log{P(Z|Y,\theta)P(Y|\theta)} - \sum_{Z}q(Z)\log{q(Z)} \\
&= \sum_{Z}q(Z)(\log{P(Z|Y,\theta)}+\log{P(Y|\theta)} - \log{q(Z)})\\
&= \log{P(Y|\theta)}\sum_{Z}q(Z) + \sum_{Z}q(Z)\log{\frac{P(Z|Y,\theta)}{q(Z)}} \\
&= \log{P(Y|\theta)} - KL(q(Z)||P(Z|Y,\theta))
\end{aligned}
$$

最终等式
$$
\begin{aligned}
\log{P(Y|\theta)} &=  KL(q(Z)||P(Z|Y,\theta)) + \mathcal{{L}}(q,\theta)\\
\end{aligned}
$$
且
$$
\log{P(Y|\theta)} \ge \mathcal{{L}}(q,\theta)
$$

老师上课的时候没有说$q(Z)$为什么要取$P(Z|Y,\theta^{i})$，这里解释一下
> **在E步的时候**，理论上我们可以取任意的$q(Z)$来构造下界$\mathcal{{L}}(q,\theta)$，但是为了让当前参数的似然函数与下界相等，我们要让
> $$
 q(Z) = P(Z|Y,\theta^{i})
> $$
> 为什么要这样？
> 这样选择能让在参数$\theta^{(i)}$处，下界紧贴似然函数，即：
> $$
\log{P(Y,Z|\theta^{(i)})} = \mathcal{{L}}(q,\theta^{(i)})
> $$
>（此时KL散度为0）
>
> 当下界紧贴似然函数时，提升下界会对似然函数产生最大程度的提升，收敛速度最快
>
> 如果下界很松（KL散度很大），即使提升了下界，似然函数可能只有很小的增长
>
> **注意**：选择$q(Z) = P(Z|Y,\theta^{(i)})$只是为了在$E$步的当前点$\theta^{(i)}$使得KL散度为零、下界紧贴似然函数，从而让后续优化更高效，一旦进入$M$步，参数$\theta$开始更新，真实后验$P(Z∣Y,\theta)$随之改变，KL 散度立即变为正数，下界与似然函数不再紧贴。
> 

因此
$$
\begin{aligned}
\log{P(Y|\theta)} &\ge \mathcal{{L}}(q,\theta)\\
&= \sum_{Z}P(Z|Y,\theta^{(i)})\log{P(Y,Z|\theta)} + const \\
&= \underbrace{\mathbb{E}_{Z}(\log{P(Y,Z|\theta)}|Y,\theta^{(i)})}_{\text{Q函数}} + \underbrace{\sum_{Z}{P(Z|Y,\theta^{(i)})\log{P(Z|Y,\theta^{(i)})}}}_{\text{常数}}
\end{aligned}
$$



**单调性的证明**

在E步的时候，取
$$
q(Z) = P(Z|Y,\theta)
$$
做完M步之后，新下界大于旧下界
$$
\mathcal{{L}}(q,\theta^{(i + 1)}) \ge \mathcal{{L}}(q,\theta^{(i)})
$$
旧似然等于旧下界
$$
\log{P(Y,Z|\theta^{i})} = \mathcal{{L}}(q,\theta^{(i)})
$$
新似然做完M步后KL散度大于0，因此
$$
\log{P(Y,Z|\theta^{i + 1})} \ge \mathcal{{L}}(q,\theta^{(i + 1)})
$$
最后有
$$
\log{P(Y,Z|\theta^{i + 1})} \ge \mathcal{{L}}(q,\theta^{(i + 1)})\ge\mathcal{{L}}(q,\theta^{(i)})=\log{P(Y,Z|\theta^{i})}
$$
保证了**EM算法的单调性**
