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


## 高斯混合模型
高斯分布
$$
\phi(y|\theta_{k}) = \frac{1}{\sqrt{2\pi}\sigma_{k}}exp(-\frac{(x-\mu_k)^2}{2\sigma_{k}^2})
$$


用多个高斯分布的加权组合描述复杂数据的分布
$$
\begin{aligned}
&P(y|\theta) = \sum_{k=1}^K \alpha_k \phi(y|\theta_k) \\
&\text{s.t.} \quad \alpha_k \geq 0 \ (k=1,\dots,K), \quad \sum_{k=1}^K \alpha_k = 1 
\end{aligned}
$$

**Q函数的定义**
$$
Q(\theta,\theta^{(i)}) = \mathbb{E}_{\gamma}[\log{P(y,\gamma|\theta)}|y,\theta^{(i)}]
$$

观测数据是由高斯混合模型产生的，模型参数为
$$
\theta = (\alpha_{k},\mu_{k},\sigma_{k}^2)
$$

隐变量定义为
$$
\gamma_{jk} = 
\begin{cases}
1 &\text{第j个观测样本来自第k个高斯模型} \\
0
\end{cases}
$$

现在来推导完全数据的似然函数，因为后续会使用这个代入Q函数
$$
\begin{aligned}
P(y,\gamma|\theta) &= \prod_{j = 1}^{N}{p(y_j,\gamma_{j1},\gamma_{j2},\dots,\gamma_{jk}|\theta)} \\
&=\prod_{j = 1}^{N}{\prod_{k=1}^{K}{[\alpha_{k}\phi(y_j|\theta_k)]^{\gamma_{jk}}}} 
\end{aligned} 
$$

令
$$
n_k = \sum_{j=1}^{N}\gamma_{jk}
$$

有
$$
\begin{aligned} 
\prod_{j = 1}^{N}{\prod_{k=1}^{K}{[\alpha_{k}\phi(y_i|\theta_k)]^{\gamma_{jk}}}}  &= \prod_{k = 1}^K{\alpha_k^{n_k}}\prod_{j=1}^N[\phi(y_j|\theta_k)]^{\gamma_{jk}}
\end{aligned} 
$$

代入到Q函数中
$$
\begin{aligned}
Q(\theta,\theta^{(i)}) &= \mathbb{E}_{\gamma}\{\sum_{k=1}^N\{n_k\log{\alpha_{k} + \sum_{j=1}^N{\gamma_{jk}[\log{\phi(y_j|\theta_{k})}]}}\}|y,\theta^{(i)}\} \\
&= \mathbb{E}_{\gamma}\{\sum_{k=1}^N\{n_k\log{\alpha_{k} + \sum_{j=1}^N{\gamma_{jk}[(\log{\frac{1}{\sqrt{2\pi}}}- \log{\sigma_{k}} - \frac{(y_j - \mu_k)^2}{2\sigma_k^2})]}}\}|y,\theta^{(i)}\} \\

\end{aligned}
$$

我们可以很轻松地发现，真正需要计算的只有$\mathbb{E}(\gamma_{jk}|y,\theta^{(i)})$，因为其它的都可以通过期望的线性性质直接拆开得到结果
$$
\begin{aligned}
\mathbb{E}(\gamma_{jk}|y,\theta^{(i)}) &= P(\gamma_{jk} = 1|y,\theta^{(i)}) \\
&= \frac{P(\gamma_{jk} = 1|\theta^{(i)})P(y_j|\gamma_{jk} = 1,\theta^{(i)})}{P(y|\theta^{(i)})}\\
&= \frac{\alpha_{k}\phi(y_j|\theta_k)}{\sum_{k=1}^K{\alpha_{k}\phi(y_j|\theta_k)}} \\
&= \hat{\gamma}_{jk}
\end{aligned}
$$

并且我们有
$$
\begin{aligned}
n_k &= \sum_{j=1}^{N}{\gamma_{jk}} \\
\mathbb{E}[n_k|y,\theta^{(i)}] &= \sum_{j=1}^N{\mathbb{E}[\gamma_{jk}|y,\theta^{(i)}]} = \sum_{j=1}^{N}{\hat{\gamma}_{jk}}
\end{aligned}
$$


最后得到**Q函数的最终形式**
$$
\begin{aligned}
Q(\theta,\theta^{(i)}) &= \sum_{k = 1}^{N}\{\sum_{j=1}^{N}{(\mathbb{E}{\gamma_{jk}})}\log{\alpha_k}+ \sum_{j=1}^N{(\mathbb{E}{\gamma_{jk}})}[(\log{\frac{1}{\sqrt{2\pi}}}- \log{\sigma_{k}} - \frac{(y_j - \mu_k)^2}{2\sigma_k^2})]|y,\theta^{(i)}\}\\
&= \sum_{k = 1}^{N}\{\sum_{j=1}^{N}{\hat{\gamma}_{jk}}\log{\alpha_k}+ \sum_{j=1}^N{\hat{\gamma}_{jk}}[(\log{\frac{1}{\sqrt{2\pi}}}- \log{\sigma_{k}} - \frac{(y_j - \mu_k)^2}{2\sigma_k^2})]|y,\theta^{(i)}\}
\end{aligned}
$$


> 解释一下上方公式难以理解的点
> 
> - $\mathbb{E}(\gamma_{jk}|y,\theta^{(i)})$的值其实就是$P(\gamma_{jk} = 1|y,\theta^{(i)})$，因为前面定义过隐变量的值不是1就是0，这里可以很容易看出
> - $\hat{\gamma}_{jk}$其实就是样本点$y_j$对高斯分布$k$的隶属度
> - $P(y|\theta^{(i)})$不是条件概率，而是在参数为$\theta^{(i)}$的情况下的似然函数，而$y$可以来自不同的高斯分布，因此写成求和的形式
> - $P(\gamma_{jk} = 1|\theta^{(i)})$就是在参数为$\theta^{(i)}$的情况下数据点来自第k个分量的概率，也就是权重$\alpha_k$


最后对模型参数$\alpha,\mu,\sigma$进行更新
$$
\begin{aligned}
\hat{\alpha}_k &= \frac{n_k}{N} = \frac{\sum_{j=1}^{N}{\hat{\gamma}_{jk}}}{N}\\
\hat{\mu}_k &= \frac{\sum_{j = 1}^N{\hat{\gamma}_{jk}y_j}}{\sum_{j = 1}^N{\hat{\gamma}_{jk}}}\\
\hat{\sigma}_k &= \frac{\sum_{j = 1}^N{\hat{\gamma}_{jk}(y_j-\mu_k)^2}}{\sum_{j = 1}^N{\hat{\gamma}_{jk}}}
\end{aligned}
$$