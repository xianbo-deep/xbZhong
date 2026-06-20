<template>
  <div class="subscribe-container">
    <div class="subscribe-stage" :class="`is-${currentStep}`" aria-live="polite">
      <Transition name="card-slide" mode="out-in">
        <section
          v-if="currentStep === 'email'"
          key="email"
          :class="['subscribe-card', 'email-card', { 'is-unsubscribe': mode === 0 }]"
          aria-labelledby="subscribe-title"
        >
          <div class="email-flip">
            <div class="email-face email-front" :aria-hidden="mode === 0" :inert="mode === 0">
              <div class="card-header">
                <span class="eyebrow">SUBSCRIBE</span>
                <h2 id="subscribe-title" class="title">邮件订阅</h2>
                <p class="subtitle">留下邮箱，新的文章会安静地送达。</p>
              </div>

              <div class="input-group">
                <label for="subscribe-email">邮箱地址</label>
                <input
                  id="subscribe-email"
                  v-model="email"
                  type="email"
                  placeholder="name@example.com"
                  :disabled="loading"
                  @keyup.enter="handleGetVerifyCode"
                />
              </div>

              <button
                class="btn btn-primary btn-block"
                type="button"
                :class="{ loading: loading && activeAction === 'verify' }"
                :disabled="loading || countdown > 0"
                @click="handleGetVerifyCode"
              >
                <span>{{ verifyButtonText }}</span>
              </button>

              <button class="text-button" type="button" :disabled="loading" @click="setMode(0)">
                我要退订
              </button>

              <p v-if="message" :class="['message', messageType]">
                {{ message }}
              </p>

              <p class="support-note">
                有问题请发送邮件至
                <a href="mailto:zhongxianbo@xbzhong.cn">zhongxianbo@xbzhong.cn</a>
              </p>
            </div>

            <div class="email-face email-back" :aria-hidden="mode === 1" :inert="mode === 1">
              <div class="card-header">
                <span class="eyebrow">UNSUBSCRIBE</span>
                <h2 class="title">取消订阅</h2>
                <p class="subtitle">输入邮箱并验证，即可停止邮件通知。</p>
              </div>

              <div class="input-group">
                <label for="unsubscribe-email">邮箱地址</label>
                <input
                  id="unsubscribe-email"
                  v-model="email"
                  type="email"
                  placeholder="name@example.com"
                  :disabled="loading"
                  @keyup.enter="handleGetVerifyCode"
                />
              </div>

              <button
                class="btn btn-primary btn-block"
                type="button"
                :class="{ loading: loading && activeAction === 'verify' }"
                :disabled="loading || countdown > 0"
                @click="handleGetVerifyCode"
              >
                <span>{{ verifyButtonText }}</span>
              </button>

              <button class="text-button" type="button" :disabled="loading" @click="setMode(1)">
                返回订阅
              </button>

              <p v-if="message" :class="['message', messageType]">
                {{ message }}
              </p>

              <p class="support-note">
                有问题请发送邮件至
                <a href="mailto:zhongxianbo@xbzhong.cn">zhongxianbo@xbzhong.cn</a>
              </p>
            </div>
          </div>
        </section>

        <section
          v-else
          key="code"
          class="subscribe-card code-card"
          aria-labelledby="verify-title"
        >
          <div class="card-header">
            <span class="eyebrow">VERIFY</span>
            <h2 id="verify-title" class="title">输入验证码</h2>
            <p class="subtitle">{{ codeStepText }}</p>
          </div>

          <div class="code-grid" @paste.prevent="handlePaste">
            <input
              v-for="(_, index) in codeDigits"
              :key="index"
              :ref="(el) => setCodeInputRef(el, index)"
              v-model="codeDigits[index]"
              class="code-input"
              inputmode="numeric"
              maxlength="1"
              autocomplete="one-time-code"
              :aria-label="`验证码第 ${index + 1} 位`"
              :disabled="loading"
              @input="handleCodeInput(index)"
              @keydown="handleCodeKeydown($event, index)"
            />
          </div>

          <button
            class="btn btn-primary btn-block"
            type="button"
            :class="{ loading: loading && activeAction === 'submit' }"
            :disabled="loading || verifyCode.length !== 6"
            @click="handleSubmit"
          >
            <span>{{ submitButtonText }}</span>
          </button>

          <button
            class="text-button"
            type="button"
            :disabled="loading"
            @click="returnToEmail"
          >
            返回修改邮箱
          </button>
        </section>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref } from "vue";

const email = ref("");
const codeDigits = ref(["", "", "", "", "", ""]);
const currentStep = ref<"email" | "code">("email");
const mode = ref<0 | 1>(1);
const countdown = ref(0);
const loading = ref(false);
const message = ref("");
const messageType = ref("info"); // 'success', 'error', 'info'
const activeAction = ref<"verify" | "submit" | "">("");
const codeInputRefs = ref<Array<HTMLInputElement | null>>([]);
let timer: ReturnType<typeof setInterval> | null = null;

const CodeSuccess = 0;

const apiErrorMessages: Record<number, string> = {
  1000: "请求参数有误，请检查邮箱和验证码。",
  1001: "当前请求未授权。",
  1005: "服务器内部错误，请稍后重试。",
  2000: "登录状态无效。",
  2001: "登录状态已过期。",
  2002: "密码错误。",
  2003: "用户不存在。",
  2005: "缺少登录凭证。",
};

const isPreviewMode = () => {
  if (typeof window === "undefined") return false;

  const { hostname, search } = window.location;
  const isLocalHost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]";

  return isLocalHost && new URLSearchParams(search).get("preview") === "1";
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isApiSuccess = (data: any) => {
  return data?.code === CodeSuccess || data?.success === true;
};

const getApiMessage = (data: any, fallback: string) => {
  if (typeof data?.code === "number" && apiErrorMessages[data.code]) {
    return apiErrorMessages[data.code];
  }

  if (typeof data?.msg === "string" && data.msg && data.msg !== "success") {
    return data.msg;
  }

  return fallback;
};

const verifyCode = computed(() => codeDigits.value.join(""));

const maskedEmail = computed(() => {
  const [name, domain] = email.value.split("@");
  if (!name || !domain) return email.value;

  const visible = name.length <= 2 ? name[0] : `${name.slice(0, 2)}***`;
  return `${visible}@${domain}`;
});

const verifyButtonText = computed(() => {
  if (loading.value && activeAction.value === "verify") return "发送中";
  return countdown.value > 0 ? `${countdown.value}s 后可重发` : "发送验证码";
});

const submitButtonText = computed(() => {
  if (loading.value && activeAction.value === "submit") return "验证中";
  return mode.value === 1 ? "验证并订阅" : "验证并退订";
});

const codeStepText = computed(() => {
  const actionText = mode.value === 1 ? "完成订阅" : "取消订阅";
  return `已发送至 ${maskedEmail.value}，请填写 6 位验证码${actionText}。`;
});

const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const setMode = (value: 0 | 1) => {
  mode.value = value;
  message.value = "";
  stopCountdown();
  resetCode();
};

const setCodeInputRef = (el: Element | null, index: number) => {
  codeInputRefs.value[index] = el as HTMLInputElement | null;
};

const focusCodeInput = (index: number) => {
  codeInputRefs.value[index]?.focus();
  codeInputRefs.value[index]?.select();
};

const resetCode = () => {
  codeDigits.value = ["", "", "", "", "", ""];
};

const goToCodeStep = async () => {
  currentStep.value = "code";
  resetCode();
  await nextTick();
  focusCodeInput(0);
};

const returnToEmail = () => {
  currentStep.value = "email";
  resetCode();
};

const stopCountdown = () => {
  countdown.value = 0;
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
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

const handleCodeInput = (index: number) => {
  const value = codeDigits.value[index].replace(/\D/g, "").slice(-1);
  codeDigits.value[index] = value;

  if (value && index < codeDigits.value.length - 1) {
    focusCodeInput(index + 1);
  }
};

const handleCodeKeydown = (event: KeyboardEvent, index: number) => {
  if (event.key === "Backspace" && !codeDigits.value[index] && index > 0) {
    focusCodeInput(index - 1);
  }

  if (event.key === "Enter" && verifyCode.value.length === 6) {
    handleSubmit();
  }
};

const handlePaste = (event: ClipboardEvent) => {
  const pasted = event.clipboardData?.getData("text").replace(/\D/g, "").slice(0, 6);
  if (!pasted) return;

  codeDigits.value = Array.from({ length: 6 }, (_, index) => pasted[index] || "");
  focusCodeInput(Math.min(pasted.length, 6) - 1);
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
    if (isPreviewMode()) {
      await wait(520);
      message.value = "";
      messageType.value = "success";
      startCountdown();
      await goToCodeStep();
      return;
    }

    const response = await fetch(
      `https://api.xbzhong.cn/blog/verify?email=${encodeURIComponent(email.value)}&subscribe=${mode.value}`,
      {
        method: "GET",
      },
    );
    const data = await response.json();

    if (isApiSuccess(data)) {
      message.value = "";
      messageType.value = "success";
      startCountdown();
      await goToCodeStep();
    } else {
      message.value = getApiMessage(data, "获取验证码失败，请稍后重试。");
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
  if (!email.value || !validateEmail(email.value)) {
    currentStep.value = "email";
    message.value = "请输入有效的邮箱地址";
    messageType.value = "error";
    return;
  }

  if (verifyCode.value.length !== 6) {
    message.value = "请输入 6 位验证码";
    messageType.value = "error";
    return;
  }

  loading.value = true;
  activeAction.value = "submit";

  try {
    if (isPreviewMode()) {
      await wait(620);
      message.value =
        mode.value === 1
          ? "预览：订阅验证完成，已返回初始卡片。"
          : "预览：退订验证完成，已返回初始卡片。";
      messageType.value = "success";
      email.value = "";
      stopCountdown();
      return;
    }

    const response = await fetch(
      `https://api.xbzhong.cn/blog/subscribe?email=${encodeURIComponent(email.value)}&subscribe=${mode.value}&vc=${encodeURIComponent(verifyCode.value)}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    if (isApiSuccess(data)) {
      message.value = mode.value === 1 ? "订阅成功！感谢您的关注。" : "已成功取消订阅。";
      messageType.value = "success";
      email.value = "";
      stopCountdown();
    } else {
      message.value = getApiMessage(
        data,
        mode.value === 1 ? "订阅失败，请稍后重试。" : "取消订阅失败，请稍后重试。",
      );
      messageType.value = "error";
    }
  } catch (error) {
    console.error(error);
    message.value = "网络请求失败，请检查您的网络连接。";
    messageType.value = "error";
  } finally {
    loading.value = false;
    activeAction.value = "";
    returnToEmail();
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
  padding: clamp(0.45rem, 1.8vw, 1rem) 1rem clamp(1.4rem, 4vw, 2.6rem);
}

.subscribe-stage {
  position: relative;
  width: min(100%, 460px);
  min-height: 322px;
  box-sizing: border-box;
}

.subscribe-card {
  position: relative;
  width: 100%;
  min-height: 322px;
  padding: clamp(1.2rem, 3vw, 1.7rem);
  box-sizing: border-box;
  overflow: hidden;
  color: #050505;
  text-align: left;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(5, 5, 5, 0.1);
  border-radius: 8px;
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.07),
    0 1px 0 rgba(255, 255, 255, 0.9) inset;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.subscribe-card:hover {
  border-color: rgba(5, 5, 5, 0.2);
  box-shadow:
    0 22px 58px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.96) inset;
  transform: translateY(-2px);
}

.email-flip {
  position: relative;
  min-height: 268px;
  transition: transform 0.42s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.email-card.is-unsubscribe .email-flip {
  transform: translateY(-2px);
}

.email-face {
  width: 100%;
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.26s ease,
    transform 0.42s cubic-bezier(0.2, 0.72, 0.18, 1),
    visibility 0s linear 0s;
}

.email-back {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateX(18px) scale(0.985);
  transition-delay: 0s, 0s, 0.26s;
}

.email-card.is-unsubscribe .email-front {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-18px) scale(0.985);
  transition-delay: 0s, 0s, 0.26s;
}

.email-card.is-unsubscribe .email-back {
  opacity: 1;
  visibility: visible;
  transform: translateX(0) scale(1);
  transition-delay: 0.08s, 0.08s, 0s;
}

.email-card:not(.is-unsubscribe) .email-back,
.email-card.is-unsubscribe .email-front {
  pointer-events: none;
}

.card-header {
  margin-bottom: 1.05rem;
  text-align: center;
}

.eyebrow {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(5, 5, 5, 0.44);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  line-height: 1;
}

.title {
  margin: 0;
  color: #050505;
  font-size: clamp(1.45rem, 3vw, 1.9rem);
  font-weight: 850;
  letter-spacing: 0;
  line-height: 1.12;
}

.subtitle {
  max-width: 25rem;
  margin: 0.42rem auto 0;
  color: rgba(5, 5, 5, 0.58);
  font-size: 0.92rem;
  line-height: 1.58;
}

.input-group {
  margin-bottom: 0.95rem;
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
  min-height: 48px;
  padding: 0.78rem 0.9rem;
  box-sizing: border-box;
  color: #050505;
  font-size: 1rem;
  background: #fff;
  border: 1px solid rgba(5, 5, 5, 0.16);
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
  background: #fff;
  border-color: rgba(5, 5, 5, 0.48);
  box-shadow:
    0 0 0 4px rgba(5, 5, 5, 0.055),
    0 10px 24px rgba(0, 0, 0, 0.045);
}

input:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.code-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(0.42rem, 1.4vw, 0.62rem);
  margin: 1.2rem 0 1.05rem;
}

.code-input {
  aspect-ratio: 1 / 1.08;
  min-height: 0;
  padding: 0;
  font-size: clamp(1.28rem, 4vw, 1.58rem);
  font-weight: 850;
  line-height: 1;
  text-align: center;
}

.btn {
  position: relative;
  min-height: 48px;
  padding: 0.82rem 1.35rem;
  overflow: hidden;
  font-size: 0.96rem;
  font-weight: 820;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
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
  box-shadow: 0 13px 28px rgba(0, 0, 0, 0.16);
}

.btn-primary:not(:disabled):hover {
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
  transform: translateY(-1px);
}

.btn-block {
  width: 100%;
}

.text-button {
  display: block;
  width: fit-content;
  margin: 0.78rem auto 0;
  padding: 0.3rem 0;
  color: rgba(5, 5, 5, 0.56);
  font-size: 0.86rem;
  font-weight: 700;
  background: transparent;
  border: 0;
  cursor: pointer;
  transition:
    color 0.18s ease,
    transform 0.18s ease;
}

.text-button:not(:disabled):hover {
  color: #050505;
  transform: translateY(-1px);
}

.text-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.message {
  margin: 0.9rem 0 0;
  padding: 0.68rem 0.78rem;
  color: rgba(5, 5, 5, 0.72);
  font-size: 0.88rem;
  line-height: 1.5;
  background: rgba(5, 5, 5, 0.035);
  border: 1px solid rgba(5, 5, 5, 0.12);
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
  margin: 0.78rem 0 0;
  color: rgba(5, 5, 5, 0.46);
  font-size: 0.8rem;
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

.card-slide-enter-active,
.card-slide-leave-active {
  transition:
    opacity 0.28s ease,
    filter 0.28s ease,
    transform 0.44s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.card-slide-enter-from {
  opacity: 0;
  filter: blur(8px);
  transform: translate3d(0, 18px, 0) scale(0.982);
}

.card-slide-leave-to {
  opacity: 0;
  filter: blur(8px);
  transform: translate3d(0, -14px, 0) scale(0.982);
}

@keyframes loading-sweep {
  to {
    transform: translateX(100%);
  }
}

[data-theme="dark"] .subscribe-card {
  color: rgba(255, 255, 255, 0.92);
  background: rgba(24, 24, 24, 0.94);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

[data-theme="dark"] .subscribe-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.46),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

[data-theme="dark"] .eyebrow,
[data-theme="dark"] .subtitle,
[data-theme="dark"] label,
[data-theme="dark"] .support-note,
[data-theme="dark"] .text-button {
  color: rgba(255, 255, 255, 0.56);
}

[data-theme="dark"] .title,
[data-theme="dark"] .text-button:not(:disabled):hover {
  color: rgba(255, 255, 255, 0.94);
}

[data-theme="dark"] input,
[data-theme="dark"] .message {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
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

[data-theme="dark"] .btn-primary {
  color: #050505;
  background: #f7f7f4;
  border-color: #f7f7f4;
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
    padding: 0.45rem 0.75rem 1.4rem;
  }

  .subscribe-stage,
  .subscribe-card {
    min-height: 326px;
  }

  .subscribe-card {
    padding: 1.25rem;
  }

  .code-grid {
    gap: 0.38rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .subscribe-card,
  .card-slide-enter-active,
  .card-slide-leave-active,
  input,
  .btn,
  .text-button {
    transition: none;
  }
}
</style>
