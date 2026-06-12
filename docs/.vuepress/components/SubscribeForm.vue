<template>
  <div class="subscribe-container">
    <section class="subscribe-card" aria-labelledby="subscribe-title">
      <div class="card-header">
        <span class="eyebrow">{{ mode === 1 ? "SUBSCRIBE" : "UNSUBSCRIBE" }}</span>
        <h2 id="subscribe-title" class="title">
          {{ mode === 1 ? "邮件订阅" : "取消订阅" }}
        </h2>
        <p class="subtitle">
          {{ mode === 1 ? "接收最新文章更新，不错过新的笔记和想法。" : "输入邮箱和验证码，即可取消邮件通知。" }}
        </p>
      </div>

      <div class="mode-switch" :class="{ unsubscribe: mode === 0 }">
        <button
          :class="['mode-btn', { active: mode === 1 }]"
          type="button"
          @click="setMode(1)"
        >
          订阅
        </button>
        <button
          :class="['mode-btn', { active: mode === 0 }]"
          type="button"
          @click="setMode(0)"
        >
          退订
        </button>
      </div>

      <div class="input-group">
        <label for="subscribe-email">邮箱地址</label>
        <input
          id="subscribe-email"
          v-model="email"
          type="email"
          placeholder="name@example.com"
          :disabled="loading"
        />
      </div>

      <div class="input-group verify-group">
        <div class="verify-field">
          <label for="subscribe-code">验证码</label>
          <input
            id="subscribe-code"
            v-model="verifyCode"
            type="text"
            placeholder="输入验证码"
            :disabled="loading"
            class="verify-input"
            @keyup.enter="handleSubmit"
          />
        </div>
        <button
          class="btn btn-verify"
          type="button"
          :class="{ loading: loading && activeAction === 'verify' }"
          :disabled="loading || countdown > 0"
          @click="handleGetVerifyCode"
        >
          <span>{{ verifyButtonText }}</span>
        </button>
      </div>

      <div class="action-buttons">
        <button
          class="btn btn-primary btn-block"
          type="button"
          :class="{ loading: loading && activeAction === 'submit' }"
          :disabled="loading"
          @click="handleSubmit"
        >
          <span>{{ submitButtonText }}</span>
        </button>
      </div>

      <p v-if="message" :class="['message', messageType]">
        {{ message }}
      </p>

      <p class="support-note">
        有问题请发送邮件至
        <a href="mailto:zhongxianbo@xbzhong.cn">zhongxianbo@xbzhong.cn</a>
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";

const email = ref("");
const verifyCode = ref("");
const mode = ref(1); // 1: Subscribe, 0: Unsubscribe
const countdown = ref(0);
const loading = ref(false);
const message = ref("");
const messageType = ref("info"); // 'success', 'error', 'info'
const activeAction = ref<"verify" | "submit" | "">("");
let timer: ReturnType<typeof setInterval> | null = null;

const verifyButtonText = computed(() => {
  if (loading.value && activeAction.value === "verify") return "发送中";
  return countdown.value > 0 ? `${countdown.value}s` : "获取验证码";
});

const submitButtonText = computed(() => {
  if (loading.value && activeAction.value === "submit") return "处理中";
  return mode.value === 1 ? "立即订阅" : "取消订阅";
});

const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const setMode = (newMode: number) => {
  mode.value = newMode;
  message.value = "";
};

const startCountdown = () => {
  countdown.value = 60;
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};

const handleGetVerifyCode = async () => {
  if (!email.value) {
    message.value = "请输入邮箱地址";
    messageType.value = "error";
    return;
  }

  if (!validateEmail(email.value)) {
    message.value = "请输入有效的邮箱地址";
    messageType.value = "error";
    return;
  }

  loading.value = true;
  activeAction.value = "verify";
  message.value = "";

  try {
    const response = await fetch(
      `https://api.xbzhong.cn/blog/verify?email=${encodeURIComponent(email.value)}&subscribe=${mode.value}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();

    if (
      data.code === 200 ||
      data.code === 0 ||
      data.success === true ||
      data.msg === "操作成功"
    ) {
      message.value = "验证码已发送到您的邮箱，5分钟内有效。";
      messageType.value = "success";
      startCountdown();
    } else {
      message.value = data.msg || "获取验证码失败，请稍后重试。";
      messageType.value = "error";
    }
  } catch (error) {
    console.error(error);
    message.value = "网络请求失败，请检查您的网络连接。";
    messageType.value = "error";
  } finally {
    loading.value = false;
    activeAction.value = "";
  }
};

const handleSubmit = async () => {
  if (!email.value) {
    message.value = "请输入邮箱地址";
    messageType.value = "error";
    return;
  }

  if (!validateEmail(email.value)) {
    message.value = "请输入有效的邮箱地址";
    messageType.value = "error";
    return;
  }

  if (!verifyCode.value) {
    message.value = "请输入验证码";
    messageType.value = "error";
    return;
  }

  loading.value = true;
  activeAction.value = "submit";
  message.value = "";

  try {
    const response = await fetch(
      `https://api.xbzhong.cn/blog/subscribe?email=${encodeURIComponent(email.value)}&subscribe=${mode.value}&vc=${encodeURIComponent(verifyCode.value)}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    if (
      data.code === 200 ||
      data.code === 0 ||
      data.success === true ||
      data.msg === "操作成功"
    ) {
      message.value = mode.value === 1 ? "订阅成功！感谢您的关注。" : "已成功取消订阅。";
      messageType.value = "success";
      email.value = "";
      verifyCode.value = "";
    } else {
      if (data.code === 1005) {
        message.value = mode.value === 1 ? "您已订阅，请勿重复操作。" : "您尚未订阅，无需取消。";
      } else {
        message.value =
          data.msg || (mode.value === 1 ? "订阅失败，请稍后重试。" : "取消订阅失败，请稍后重试。");
      }
      messageType.value = "error";
    }
  } catch (error) {
    console.error(error);
    message.value = "网络请求失败，请检查您的网络连接。";
    messageType.value = "error";
  } finally {
    loading.value = false;
    activeAction.value = "";
  }
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.subscribe-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.75rem, 2.4vw, 1.6rem) 1rem clamp(1.5rem, 4vw, 3rem);
}

.subscribe-card {
  position: relative;
  isolation: isolate;
  width: min(100%, 520px);
  padding: clamp(1.25rem, 3vw, 1.9rem);
  overflow: hidden;
  color: #050505;
  text-align: left;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.84), rgba(247, 247, 244, 0.62)),
    radial-gradient(rgba(5, 5, 5, 0.06) 1px, transparent 1px);
  background-size: auto, 24px 24px;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.78);
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.subscribe-card:hover {
  border-color: rgba(5, 5, 5, 0.24);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
  transform: translateY(-3px);
}

.subscribe-card::before {
  position: absolute;
  inset: 12px;
  z-index: -1;
  border: 1px solid rgba(5, 5, 5, 0.08);
  border-radius: 8px;
  content: "";
  pointer-events: none;
}

.card-header {
  margin-bottom: 1.05rem;
}

.eyebrow {
  display: block;
  margin-bottom: 0.42rem;
  color: rgba(5, 5, 5, 0.46);
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  line-height: 1;
}

.title {
  margin: 0;
  color: #050505;
  font-size: clamp(1.55rem, 3.5vw, 2.05rem);
  font-weight: 850;
  letter-spacing: 0;
  line-height: 1.08;
}

.subtitle {
  max-width: 30rem;
  margin: 0.55rem 0 0;
  color: rgba(5, 5, 5, 0.58);
  font-size: 0.96rem;
  line-height: 1.62;
}

.mode-switch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 4px;
  margin-bottom: 1rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
}

.mode-switch::before {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  background: #050505;
  border-radius: 6px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
  content: "";
  transition: transform 0.24s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.mode-switch.unsubscribe::before {
  transform: translateX(100%);
}

.mode-btn {
  position: relative;
  z-index: 1;
  min-height: 42px;
  padding: 0.7rem 1rem;
  color: rgba(5, 5, 5, 0.58);
  font-size: 0.95rem;
  font-weight: 750;
  letter-spacing: 0;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.mode-btn.active {
  color: #fff;
}

.mode-btn:not(.active):hover {
  color: #050505;
  transform: translateY(-1px);
}

.input-group {
  margin-bottom: 0.82rem;
}

label {
  display: block;
  margin-bottom: 0.45rem;
  color: rgba(5, 5, 5, 0.64);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0;
}

input {
  width: 100%;
  min-height: 46px;
  padding: 0.8rem 0.95rem;
  box-sizing: border-box;
  color: #050505;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(5, 5, 5, 0.14);
  border-radius: 8px;
  outline: none;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

input::placeholder {
  color: rgba(5, 5, 5, 0.34);
}

input:focus {
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(5, 5, 5, 0.42);
  box-shadow: 0 0 0 4px rgba(5, 5, 5, 0.055);
  transform: translateY(-1px);
}

input:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.verify-group {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 132px;
  gap: 10px;
  align-items: end;
}

.verify-field {
  min-width: 0;
}

.verify-input {
  width: 100%;
}

.btn-verify {
  min-height: 46px;
  padding: 0.8rem 0.9rem;
  color: #050505;
  font-size: 0.9rem;
  font-weight: 750;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(5, 5, 5, 0.16);
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.btn-verify:not(:disabled):hover {
  color: #fff;
  background: #050505;
  border-color: #050505;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  transform: translateY(-1px);
}

.action-buttons {
  margin-top: 1.05rem;
}

.btn {
  position: relative;
  min-height: 48px;
  padding: 0.85rem 1.5rem;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 820;
  border-radius: 8px;
  cursor: pointer;
  transition:
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    transform 0.18s ease;
}

.btn span {
  position: relative;
  z-index: 1;
}

.btn.loading::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 0%,
    rgba(255, 255, 255, 0.24) 36%,
    transparent 72%
  );
  content: "";
  transform: translateX(-100%);
  animation: loading-sweep 1.05s linear infinite;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.68;
}

.btn-primary {
  color: white;
  background: #050505;
  border: 1px solid #050505;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
}

.btn-primary:not(:disabled):hover {
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  transform: translateY(-2px);
}

.btn-block {
  width: 100%;
}

.message {
  margin: 1.1rem 0 0;
  padding: 0.78rem 0.9rem;
  color: rgba(5, 5, 5, 0.72);
  font-size: 0.92rem;
  line-height: 1.5;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-left: 3px solid rgba(5, 5, 5, 0.32);
  border-radius: 8px;
}

.message.success {
  color: #12603d;
  background-color: rgba(18, 96, 61, 0.08);
  border-color: rgba(18, 96, 61, 0.16);
  border-left-color: #12603d;
}

.message.error {
  color: #8a1f1f;
  background-color: rgba(138, 31, 31, 0.08);
  border-color: rgba(138, 31, 31, 0.16);
  border-left-color: #8a1f1f;
}

.message.info {
  display: none;
}

.support-note {
  margin: 0.82rem 0 0;
  color: rgba(5, 5, 5, 0.46);
  font-size: 0.82rem;
  line-height: 1.6;
  text-align: center;
}

.support-note a {
  color: rgba(5, 5, 5, 0.72);
  font-weight: 650;
  text-decoration: none;
  border-bottom: 1px solid rgba(5, 5, 5, 0.24);
  transition:
    border-color 0.18s ease,
    color 0.18s ease;
}

.support-note a:hover {
  color: #050505;
  border-bottom-color: #050505;
}

@keyframes loading-sweep {
  to {
    transform: translateX(100%);
  }
}

[data-theme="dark"] .subscribe-card {
  color: rgba(255, 255, 255, 0.92);
  background:
    linear-gradient(135deg, rgba(28, 28, 28, 0.94), rgba(18, 18, 18, 0.9)),
    radial-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: auto, 24px 24px;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

[data-theme="dark"] .subscribe-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.46),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .subscribe-card::before {
  border-color: rgba(255, 255, 255, 0.08);
}

[data-theme="dark"] .eyebrow,
[data-theme="dark"] .subtitle,
[data-theme="dark"] label,
[data-theme="dark"] .support-note {
  color: rgba(255, 255, 255, 0.56);
}

[data-theme="dark"] .title,
[data-theme="dark"] .mode-btn:not(.active):hover {
  color: rgba(255, 255, 255, 0.94);
}

[data-theme="dark"] .mode-switch,
[data-theme="dark"] input,
[data-theme="dark"] .btn-verify,
[data-theme="dark"] .message {
  background: rgba(255, 255, 255, 0.045);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .mode-switch::before,
[data-theme="dark"] .btn-primary,
[data-theme="dark"] .btn-verify:not(:disabled):hover {
  color: #050505;
  background: #f7f7f4;
  border-color: #f7f7f4;
}

[data-theme="dark"] .mode-btn {
  color: rgba(255, 255, 255, 0.58);
}

[data-theme="dark"] .mode-btn.active {
  color: #050505;
}

[data-theme="dark"] input {
  color: rgba(255, 255, 255, 0.9);
}

[data-theme="dark"] input::placeholder {
  color: rgba(255, 255, 255, 0.34);
}

[data-theme="dark"] input:focus {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.055);
}

[data-theme="dark"] .btn-verify {
  color: rgba(255, 255, 255, 0.84);
}

[data-theme="dark"] .support-note a {
  color: rgba(255, 255, 255, 0.78);
  border-bottom-color: rgba(255, 255, 255, 0.22);
}

[data-theme="dark"] .support-note a:hover {
  color: rgba(255, 255, 255, 0.96);
  border-bottom-color: rgba(255, 255, 255, 0.72);
}

@media (max-width: 520px) {
  .subscribe-container {
    padding: 0.75rem 0.75rem 1.5rem;
  }

  .subscribe-card {
    padding: 1.25rem;
  }

  .subscribe-card::before {
    inset: 8px;
  }

  .verify-group {
    grid-template-columns: 1fr;
  }

  .btn-verify {
    width: 100%;
  }
}
</style>
