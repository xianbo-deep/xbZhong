<template>
  <div class="subscribe-container">
    <div class="subscribe-card">
      <h2 class="title">邮件订阅</h2>
      <p class="subtitle">获取最新文章更新通知，不错过任何精彩内容。</p>
      
      <div class="input-group">
        <input 
          v-model="email" 
          type="email" 
          placeholder="请输入您的邮箱地址" 
          :disabled="loading"
          @keyup.enter="handleSubscribe(1)"
        />
      </div>

      <div class="action-buttons">
        <button class="btn btn-primary" :disabled="loading" @click="handleSubscribe(1)">
          {{ loading ? '处理中...' : '立即订阅' }}
        </button>
        <button class="btn btn-secondary" :disabled="loading" @click="handleSubscribe(0)">
          {{ loading ? '处理中...' : '取消订阅' }}
        </button>
      </div>

      <p v-if="message" :class="['message', messageType]">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const loading = ref(false);
const message = ref('');
const messageType = ref('info'); // 'success', 'error', 'info'

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubscribe = async (subscribe: number) => {
  if (!email.value) {
    message.value = '请输入邮箱地址';
    messageType.value = 'error';
    return;
  }
  
  if (!validateEmail(email.value)) {
    message.value = '请输入有效的邮箱地址';
    messageType.value = 'error';
    return;
  }

  loading.value = true;
  message.value = '';

  try {
    const response = await fetch(`https://api.xbzhong.cn/blog/subscribe?email=${encodeURIComponent(email.value)}&subscribe=${subscribe}`, {
      method: 'GET',
    });

    const data = await response.json();

    // 适配常见的 API 返回格式，如果不成功则视为失败
    // 请根据实际 API 返回调整判断逻辑
    if (data.code === 200 || data.code === 0 || data.success === true || data.msg === '操作成功') {
       message.value = subscribe === 1 ? '订阅成功！感谢您的关注。' : '已成功取消订阅。';
       messageType.value = 'success';
       if (subscribe === 1) email.value = '';
    } else {
       if (data.code === 1005) {
          message.value = subscribe === 1 ? '您已订阅，请勿重复操作。' : '您尚未订阅，无需取消。';
       } else {
          message.value = subscribe === 1 ? '订阅失败，请稍后重试。' : '取消订阅失败，请稍后重试。';
       }
       messageType.value = 'error';
    }

  } catch (error) {
    console.error(error);
    message.value = '网络请求失败，请检查您的网络连接。';
    messageType.value = 'error';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.subscribe-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.subscribe-card {
  background: var(--bg-color-float, #fff);
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.subscribe-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  background: linear-gradient(to right, #29437d, #506cb0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--text-color-light, #666);
  margin-bottom: 2rem;
  font-size: 1rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  background-color: var(--bg-color, #fff);
  color: var(--text-color, #333);
  box-sizing: border-box; 
}

input:focus {
  border-color: #29437d;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(to right, #29437d, #506cb0);
  color: white;
  box-shadow: 0 2px 10px rgba(41, 67, 125, 0.3);
}

.btn-primary:not(:disabled):hover {
  box-shadow: 0 4px 15px rgba(41, 67, 125, 0.4);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid var(--border-color, #e2e8f0);
  color: var(--text-color-light, #666);
}

.btn-secondary:not(:disabled):hover {
  border-color: #666;
  color: var(--text-color, #333);
}

.message {
  margin-top: 1.5rem;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.95rem;
}

.message.success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.message.error {
  background-color: rgba(255, 71, 87, 0.1);
  color: #ff4757;
}

.message.info {
  display: none;
}
</style>