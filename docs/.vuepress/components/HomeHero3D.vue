<template>
  <section
    ref="root"
    class="home-hero-3d"
    :class="{ 'is-card-flipped': isFlipped }"
  >
    <div ref="spotlight" class="spotlight" />

    <div
      ref="cursorRing"
      class="cursor-ring"
      :class="{ 'is-disabled': isFlipped }"
      aria-hidden="true"
    >
      <span class="cursor-title">
        <span
          v-for="(char, index) in cursorBackChars"
          :key="`cursor-back-${index}`"
          class="cursor-char"
        >
          {{ char === " " ? "\u00A0" : char }}
        </span>
      </span>
    </div>

    <div ref="tiltLayer" class="tilt-layer">
      <div class="card-tilt">
        <div
          class="flip-card"
          :class="[
            { 'is-flipped': isFlipped },
            `flip-${flipDirection}`,
          ]"
          role="button"
          tabindex="0"
          :aria-pressed="isFlipped"
          aria-label="翻转主页介绍卡片"
          @keydown.enter.prevent="toggleFlip"
          @keydown.space.prevent="toggleFlip"
        >
          <div
            class="flip-inner"
          >
            <div class="card-face card-front">
              <div ref="textZone" class="text-zone">
                <h1
                  ref="titleEl"
                  class="title"
                  :aria-label="`${frontText} / ${backText}`"
                  :data-title="frontText"
                >
                  <span class="title-front" aria-hidden="true">
                    <span
                      v-for="(char, index) in frontChars"
                      :key="`front-${index}`"
                      class="char"
                    >
                      {{ char === " " ? "\u00A0" : char }}
                    </span>
                  </span>
                </h1>

                <div class="meta-wrap" :aria-label="metaText">
                  <div class="meta-depth">{{ metaText }}</div>
                  <div class="meta-depth deep">{{ metaText }}</div>

                  <p class="meta">
                    <span
                      v-for="(char, index) in metaChars"
                      :key="`meta-${index}`"
                      class="meta-char"
                    >
                      {{ char === " " ? "\u00A0" : char }}
                    </span>
                  </p>

                  <span class="flip-cue" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div class="card-face card-back">
              <div class="calendar-shell" aria-label="创意日历">
                <header class="calendar-header">
                  <div class="calendar-year" aria-label="当前年份">
                    <span class="calendar-year-progress" :style="{ '--year-progress': yearProgress + '%' }">{{ currentYear }}</span>
                    <span class="calendar-year-ghost">{{ currentYear + 1 }}</span>
                  </div>
                </header>
                <nav class="month-list" aria-label="月份">
                  <span
                    v-for="month in months"
                    :key="month"
                    class="month-item"
                    :class="{ 'is-current': month === currentMonth }"
                    :style="{ '--month-progress': monthFillProgress(month) + '%' }"
                  >
                    <span class="month-value">{{ month }}</span>
                  </span>
                </nav>
                <div class="calendar-main">
                  <section class="month-card">
                    <div class="month-card-top"><span class="month-name">{{ monthName }}</span><span class="month-index">{{ currentMonth }} / {{ currentYear }}</span></div>
                    <div class="weekday-row"><span v-for="weekday in weekdays" :key="weekday">{{ weekday }}</span></div>
                    <div class="days-grid"><span v-for="(day, index) in calendarDays" :key="day + '-' + index" class="day-cell" :class="{ 'is-empty': !day, 'is-elapsed': day && day < currentDay, 'is-future': day && day > currentDay, 'is-today': day === currentDay, 'is-weekend': index % 7 === 0 || index % 7 === 6 }">{{ day || "" }}</span></div>
                  </section>
                  <div class="time-flow" aria-label="年度时间进度">
                    <div class="time-flow-track">
                      <span class="time-flow-fill" :style="{ width: yearProgress + '%' }" />
                      <span class="time-flow-marker" :style="{ left: yearProgress + '%' }" />
                    </div>
                    <div class="time-flow-meta">
                      <span>TIME / FLOW</span>
                      <span>{{ yearProgress }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";

const frontText = "HELLO, I'M zxb";
const backText = "你好，我是 zxb";
const metaText = "21岁 / ECUST";
const frontChars = computed(() => [...frontText]);
const cursorBackChars = computed(() => [...backText]);
const metaChars = computed(() => [...metaText]);
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthName = monthNames[currentMonth - 1];
const firstWeekday = new Date(currentYear, currentMonth - 1, 1).getDay();
const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
const calendarDays = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
const dayOfYear = Math.floor((today.getTime() - new Date(currentYear, 0, 0).getTime()) / 86400000);
const totalDays = ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) ? 366 : 365;
const yearProgress = Math.round((dayOfYear / totalDays) * 1000) / 10;
const monthProgress = Math.round((currentDay / daysInMonth) * 1000) / 10;
const monthFillProgress = (month: number) => {
  const elapsedMonths = (dayOfYear / totalDays) * 12;
  return Math.max(0, Math.min(100, (elapsedMonths - (month - 1)) * 100));
};

const root = ref<HTMLElement | null>(null);
const tiltLayer = ref<HTMLElement | null>(null);
const spotlight = ref<HTMLElement | null>(null);
const cursorRing = ref<HTMLElement | null>(null);
const textZone = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);
const isFlipped = ref(false);
const flipDirection = ref<"left" | "right">("right");

let ctx: ReturnType<typeof gsap.context> | null = null;
let cleanup: (() => void) | null = null;

const resetDepth = (rootEl: HTMLElement) => {
  rootEl.style.setProperty("--card-rotate-x", "0deg");
  rootEl.style.setProperty("--card-rotate-y", "0deg");
  rootEl.style.setProperty("--scene-x", "0px");
  rootEl.style.setProperty("--scene-y", "0px");
  rootEl.style.setProperty("--meta-scene-x", "0px");
  rootEl.style.setProperty("--meta-scene-y", "0px");
  rootEl.style.setProperty("--card-bg-x", "0px");
  rootEl.style.setProperty("--card-bg-y", "0px");
  rootEl.style.setProperty("--title-shadow-x", "0px");
  rootEl.style.setProperty("--title-shadow-y", "0px");
  rootEl.style.setProperty("--meta-near-x", "0px");
  rootEl.style.setProperty("--meta-near-y", "0px");
  rootEl.style.setProperty("--meta-deep-x", "0px");
  rootEl.style.setProperty("--meta-deep-y", "0px");
};

const toggleFlip = () => {
  if (!isFlipped.value) {
    flipDirection.value = Math.random() > 0.5 ? "right" : "left";
  }

  isFlipped.value = !isFlipped.value;
  cursorRing.value?.classList.remove("is-over-text");
};

onMounted(() => {
  const rootEl = root.value;
  const tiltEl = tiltLayer.value;
  const spotlightEl = spotlight.value;
  const cursorEl = cursorRing.value;
  const textZoneEl = textZone.value;
  const titleNode = titleEl.value;

  if (!rootEl || !tiltEl || !spotlightEl || !cursorEl || !textZoneEl || !titleNode) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  ctx = gsap.context(() => {
    if (!reduceMotion) {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.fromTo(
        ".text-zone",
        {
          opacity: 0,
          scale: 0.96,
          y: 42,
          z: -80,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          z: 0,
          filter: "blur(0px)",
          duration: 0.9,
        },
      );

      intro.to(
        ".char",
        {
          opacity: 1,
          y: 0,
          z: 72,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.82,
          stagger: 0.032,
          ease: "expo.out",
        },
        "-=0.48",
      );

      intro.to(
        ".meta-char",
        {
          opacity: 1,
          y: 0,
          z: 30,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.58,
          stagger: 0.024,
        },
        "-=0.48",
      );

      intro.fromTo(
        ".flip-cue",
        { opacity: 0, y: -10, scale: 0.72 },
        { opacity: 1, y: 0, scale: 1, duration: 0.42 },
        "-=0.18",
      );

    } else {
      gsap.set(".char, .meta-char", {
        opacity: 1,
        y: 0,
        z: 0,
        scale: 1,
      });
    }

    const lightXTo = gsap.quickTo(spotlightEl, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const lightYTo = gsap.quickTo(spotlightEl, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
    const xTo = gsap.quickTo(tiltEl, "x", {
      duration: 0.52,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(tiltEl, "y", {
      duration: 0.52,
      ease: "power3.out",
    });
    const zTo = gsap.quickTo(tiltEl, "z", {
      duration: 0.52,
      ease: "power3.out",
    });
    gsap.set([spotlightEl, cursorEl], { xPercent: -50, yPercent: -50 });

    const onMove = (event: MouseEvent) => {
      if (reduceMotion) return;

      const rootRect = rootEl.getBoundingClientRect();
      const textRect = titleNode.getBoundingClientRect();
      const pointerX = event.clientX - rootRect.left;
      const pointerY = event.clientY - rootRect.top;
      const x = (pointerX / rootRect.width - 0.5) * 2;
      const y = (pointerY / rootRect.height - 0.5) * 2;
      const cursorRadius = cursorEl.offsetWidth / 2;
      const cursorLeft = pointerX - cursorRadius;
      const cursorTop = pointerY - cursorRadius;
      const titleLeft = textRect.left - rootRect.left;
      const titleTop = textRect.top - rootRect.top;
      const isOverText =
        !isFlipped.value &&
        event.clientX >= textRect.left &&
        event.clientX <= textRect.right &&
        event.clientY >= textRect.top &&
        event.clientY <= textRect.bottom;

      xTo(x * 8);
      yTo(y * 6);
      zTo(76);
      lightXTo(pointerX);
      lightYTo(pointerY);

      rootEl.style.setProperty("--card-rotate-x", `${y * -16}deg`);
      rootEl.style.setProperty("--card-rotate-y", `${x * 24}deg`);
      rootEl.style.setProperty("--scene-x", `${x * 16}px`);
      rootEl.style.setProperty("--scene-y", `${y * 12}px`);
      rootEl.style.setProperty("--meta-scene-x", `${x * 6}px`);
      rootEl.style.setProperty("--meta-scene-y", `${y * 4}px`);
      rootEl.style.setProperty("--card-bg-x", `${x * -10}px`);
      rootEl.style.setProperty("--card-bg-y", `${y * -8}px`);
      rootEl.style.setProperty("--title-shadow-x", `${x * -22}px`);
      rootEl.style.setProperty("--title-shadow-y", `${y * -16}px`);
      rootEl.style.setProperty("--meta-near-x", `${x * -6}px`);
      rootEl.style.setProperty("--meta-near-y", `${y * -4}px`);
      rootEl.style.setProperty("--meta-deep-x", `${x * -12}px`);
      rootEl.style.setProperty("--meta-deep-y", `${y * -9}px`);

      gsap.set(cursorEl, { x: pointerX, y: pointerY });
      cursorEl.classList.add("is-visible");
      cursorEl.classList.toggle("is-over-text", isOverText);
      cursorEl.style.setProperty("--cursor-title-left", `${titleLeft - cursorLeft}px`);
      cursorEl.style.setProperty("--cursor-title-top", `${titleTop - cursorTop}px`);
      cursorEl.style.setProperty("--cursor-title-width", `${textRect.width}px`);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      zTo(0);
      resetDepth(rootEl);
      cursorEl.classList.remove("is-visible");
      cursorEl.classList.remove("is-over-text");
    };

    const onPointerUp = (event: PointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFlip();
    };

    rootEl.addEventListener("mousemove", onMove);
    rootEl.addEventListener("mouseleave", onLeave);
    rootEl.addEventListener("pointerup", onPointerUp);

    cleanup = () => {
      rootEl.removeEventListener("mousemove", onMove);
      rootEl.removeEventListener("mouseleave", onLeave);
      rootEl.removeEventListener("pointerup", onPointerUp);
    };
  }, rootEl);
});

onBeforeUnmount(() => {
  cleanup?.();
  ctx?.revert();
});
</script>

<style scoped>
.home-hero-3d {
  --card-rotate-x: 0deg;
  --card-rotate-y: 0deg;
  --scene-x: 0px;
  --scene-y: 0px;
  --meta-scene-x: 0px;
  --meta-scene-y: 0px;
  --card-bg-x: 0px;
  --card-bg-y: 0px;
  --title-shadow-x: 0px;
  --title-shadow-y: 0px;
  --meta-near-x: 0px;
  --meta-near-y: 0px;
  --meta-deep-x: 0px;
  --meta-deep-y: 0px;
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - var(--navbar-height));
  flex: 1 1 auto;
  align-self: stretch;
  place-items: center;
  overflow: hidden;
  cursor: none;
  perspective: 1100px;
  background-color: #f7f7f4;
  background-image: radial-gradient(#d6d6d1 1px, transparent 1px);
  background-size: 24px 24px;
}

.spotlight,
.cursor-ring {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.spotlight {
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.1), transparent 64%);
  opacity: 0.52;
  mix-blend-mode: multiply;
}

.cursor-ring {
  --cursor-title-left: 0px;
  --cursor-title-top: 0px;
  --cursor-title-width: auto;
  z-index: 20;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: #050505;
  box-shadow: 0 24px 58px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.16s ease;
  will-change: transform;
}

.cursor-ring.is-visible {
  opacity: 1;
}

.cursor-ring.is-disabled {
  opacity: 0;
}

.cursor-title {
  position: absolute;
  top: var(--cursor-title-top);
  left: var(--cursor-title-left);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: var(--cursor-title-width);
  color: #fff;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: clamp(42px, 7vw, 104px);
  font-style: normal;
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
  text-align: center;
  text-transform: none;
  transition: opacity 0.08s ease;
}

.cursor-char {
  display: block;
  flex: 0 0 auto;
}

.cursor-ring.is-over-text .cursor-title {
  opacity: 1;
}

.tilt-layer,
.card-tilt,
.flip-card,
.flip-inner,
.card-face,
.text-zone,
.title,
.meta-wrap {
  transform-style: preserve-3d;
}

.tilt-layer {
  position: absolute;
  inset: -48px;
  z-index: 5;
  will-change: transform;
}

.card-tilt {
  width: 100%;
  height: 100%;
  transform: rotateX(var(--card-rotate-x)) rotateY(var(--card-rotate-y));
  transform-style: preserve-3d;
  transition: transform 0.12s ease-out;
  will-change: transform;
}

.flip-card {
  --flip-angle: 180deg;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  color: inherit;
  font: inherit;
  text-align: center;
  background: transparent;
  cursor: none;
  transform-style: preserve-3d;
}

.flip-card.flip-left {
  --flip-angle: -180deg;
}

.flip-card.flip-right {
  --flip-angle: 180deg;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform 0.82s cubic-bezier(0.2, 0.72, 0.18, 1);
  will-change: transform;
}

.flip-card.is-flipped .flip-inner {
  transform: rotateY(var(--flip-angle));
}

.card-face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-front {
  background-color: #f7f7f4;
  background-image: radial-gradient(#d6d6d1 1px, transparent 1px);
  background-position: var(--card-bg-x) var(--card-bg-y);
  background-size: 24px 24px;
}

.card-back {
  padding: clamp(32px, 5vw, 72px);
  color: #050505;
  text-align: left;
  background-color: #f7f7f4;
  background-image: radial-gradient(#d6d6d1 1px, transparent 1px);
  background-size: 24px 24px;
  transform: rotateY(180deg);
}

.flip-cue {
  display: block;
  width: 22px;
  height: 22px;
  margin: 18px auto 0;
  border-right: 3px solid rgba(0, 0, 0, 0.12);
  border-bottom: 3px solid rgba(0, 0, 0, 0.12);
  transform: translateZ(64px) rotate(45deg);
  transition:
    border-color 0.18s ease,
    transform 0.18s ease;
}

.flip-card:hover .flip-cue {
  border-color: rgba(0, 0, 0, 0.22);
  transform: translateZ(64px) translateY(4px) rotate(45deg);
}

.title {
  font-size: clamp(48px, 7.2vw, 108px);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-style: normal;
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: 0;
  white-space: nowrap;
  text-transform: uppercase;
}

.title {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  color: #050505;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.64),
    0 10px 18px rgba(0, 0, 0, 0.14),
    0 30px 62px rgba(0, 0, 0, 0.12);
  transform: translate3d(var(--scene-x), var(--scene-y), 92px);
  transition: transform 0.08s linear;
}

.title::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  color: rgba(0, 0, 0, 0.08);
  content: attr(data-title);
  filter: blur(7px);
  pointer-events: none;
  transform: translate3d(
    calc(14px + var(--title-shadow-x)),
    calc(18px + var(--title-shadow-y)),
    -68px
  );
  transform-style: preserve-3d;
}

.title-front {
  position: relative;
  z-index: 2;
  display: inline-block;
  transform-style: preserve-3d;
}

.char {
  display: inline-block;
  opacity: 0;
  filter: blur(10px);
  transform: translateY(52px) translateZ(-96px) scale(0.78);
  transform-origin: bottom center;
  will-change: transform;
}

.text-zone {
  position: relative;
  cursor: none;
  transform-style: preserve-3d;
}

.meta-wrap {
  position: relative;
  width: fit-content;
  margin: 20px auto 0;
  transform: translate3d(var(--meta-scene-x), var(--meta-scene-y), 30px);
  transition: transform 0.08s linear;
}

.meta {
  position: relative;
  z-index: 2;
  margin: 0;
  color: rgba(5, 5, 5, 0.6);
  font-size: clamp(12px, 1.12vw, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: translateZ(54px);
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.42),
    0 8px 18px rgba(0, 0, 0, 0.08);
}

.meta-char {
  display: inline-block;
  opacity: 0;
  filter: blur(6px);
  transform: translateY(24px) translateZ(-46px) scale(0.86);
  transform-origin: bottom center;
}

.meta-depth {
  position: absolute;
  inset: 0;
  z-index: -1;
  color: rgba(0, 0, 0, 0.035);
  font-size: clamp(12px, 1.12vw, 16px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.08em;
  white-space: nowrap;
  text-transform: uppercase;
  filter: blur(3px);
  transform: translate3d(calc(5px + var(--meta-near-x)), calc(6px + var(--meta-near-y)), -40px);
}

.meta-depth.deep {
  color: rgba(0, 0, 0, 0.018);
  filter: blur(8px);
  transform: translate3d(calc(10px + var(--meta-deep-x)), calc(12px + var(--meta-deep-y)), -90px);
}

.back-kicker {
  width: min(760px, 100%);
  margin: 0 auto 22px;
  color: rgba(0, 0, 0, 0.56);
  font-size: clamp(13px, 1.2vw, 16px);
  font-weight: 400;
  letter-spacing: 0.12em;
  line-height: 1;
}

.back-copy {
  position: relative;
  width: min(820px, 86%);
  margin: 0 auto;
  padding: clamp(28px, 4vw, 54px);
  color: #050505;
  font-size: clamp(19px, 1.92vw, 28px);
  font-weight: 500;
  line-height: 1.78;
  letter-spacing: 0;
  text-align: left;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.5),
    0 12px 30px rgba(0, 0, 0, 0.08);
}

.back-copy::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 28px;
  background: rgba(247, 247, 244, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.78),
    inset 0 -1px 0 rgba(5, 5, 5, 0.035),
    0 18px 46px rgba(0, 0, 0, 0.045);
  content: "";
}

.calendar-shell {
  width: min(980px, 92vw);
  color: #050505;
  text-align: left;
}
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-bottom: clamp(18px, 2vw, 30px);
  border-bottom: 1px solid rgba(5, 5, 5, 0.14);
}
.month-index, .note-title, .note-foot {
  margin: 0;
}
.calendar-year {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: clamp(54px, 8.5vw, 132px);
  font-weight: 850;
  letter-spacing: -0.08em;
  line-height: 0.74;
}
.calendar-year-ghost {
  color: rgba(5, 5, 5, 0.17);
  font-weight: 500;
}
.month-list {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.25rem;
  padding: 16px 0 24px;
}
.month-item {
  position: relative;
  color: rgba(5, 5, 5, 0.38);
  font-size: clamp(10px, 1vw, 14px);
  font-weight: 750;
  text-align: center;
  letter-spacing: 0.04em;
}
.month-item.is-current { color: #050505; }
.month-item.is-current::after {
  position: absolute;
  right: 24%;
  bottom: -10px;
  left: 24%;
  height: 3px;
  background: #050505;
  border-radius: 4px;
  content: "";
}
.calendar-main {
  display: block;
  width: 100%;
}
.month-card {
  width: min(760px, 100%);
  margin: 0 auto;
  padding: clamp(18px, 2.2vw, 30px);
  border: 1px solid rgba(5, 5, 5, 0.14);
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.42);
  background-image:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(207, 207, 202, 0.34)),
    radial-gradient(#d6d6d1 1px, transparent 1px);
  background-size: 100% 100%, 24px 24px;
  background-position: 0 0, 0 0;
  box-shadow: 0 18px 42px rgba(5, 5, 5, 0.06);
}
.month-card-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 18px;
}
.month-name {
  font-size: clamp(26px, 3.7vw, 54px);
  font-weight: 820;
  letter-spacing: -0.05em;
  line-height: 0.9;
}
.month-index {
  color: rgba(5, 5, 5, 0.48);
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.1em;
}
.weekday-row, .days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
.weekday-row {
  padding: 12px 0 10px;
  border-top: 1px solid rgba(5, 5, 5, 0.12);
  color: rgba(5, 5, 5, 0.48);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-align: center;
}
.day-cell {
  display: grid;
  min-height: clamp(32px, 4vw, 58px);
  place-items: center;
  color: rgba(5, 5, 5, 0.78);
  font-size: clamp(13px, 1.5vw, 19px);
  font-weight: 650;
  border-radius: 50%;
}
.day-cell.is-weekend { color: rgba(5, 5, 5, 0.4); }
.day-cell.is-today {
  color: #f7f7f4;
  background: #050505;
  box-shadow:
    0 7px 16px rgba(5, 5, 5, 0.2),
    0 0 0 7px rgba(5, 5, 5, 0.045),
    0 14px 28px rgba(5, 5, 5, 0.12);
}
.calendar-note {
  padding-top: clamp(14px, 2vw, 30px);
}
.note-mark {
  display: block;
  margin-bottom: 22px;
  font-size: clamp(24px, 3vw, 42px);
  line-height: 1;
}
.note-title {
  font-size: clamp(24px, 3vw, 42px);
  font-weight: 820;
  letter-spacing: -0.06em;
}
.note-copy {
  max-width: 240px;
  margin: 16px 0 24px;
  color: rgba(5, 5, 5, 0.58);
  font-size: clamp(13px, 1.3vw, 17px);
  line-height: 1.75;
}
.note-rule {
  width: 100%;
  height: 1px;
  margin-bottom: 14px;
  background: rgba(5, 5, 5, 0.16);
}
.note-foot {
  display: flex;
  justify-content: space-between;
  color: rgba(5, 5, 5, 0.48);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
}
.note-foot span { color: #050505; font-size: 18px; }
[data-theme="dark"] .calendar-shell { color: #f7f7f4; }
[data-theme="dark"] .month-index,
[data-theme="dark"] .note-title,
[data-theme="dark"] .note-foot { color: rgba(247, 247, 244, 0.7); }
[data-theme="dark"] .calendar-header,
[data-theme="dark"] .month-card,
[data-theme="dark"] .weekday-row,
[data-theme="dark"] .note-rule { border-color: rgba(247, 247, 244, 0.18); }
[data-theme="dark"] .calendar-year-ghost,
[data-theme="dark"] .month-item,
[data-theme="dark"] .day-cell.is-weekend,
[data-theme="dark"] .note-copy { color: rgba(247, 247, 244, 0.42); }
[data-theme="dark"] .month-item.is-current,
[data-theme="dark"] .day-cell,
[data-theme="dark"] .note-foot span { color: #f7f7f4; }
[data-theme="dark"] .month-item.is-current::after { background: #f7f7f4; }
[data-theme="dark"] .month-card { background: rgba(5, 5, 5, 0.14); box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18); }
[data-theme="dark"] .day-cell.is-today { color: #050505; background: #f7f7f4; }

.calendar-year-progress {
  color: transparent;
  background: linear-gradient(
    to right,
    #050505 0 var(--year-progress),
    rgba(5, 5, 5, 0.17) var(--year-progress) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
}
.month-value {
  color: transparent;
  background: linear-gradient(
    to right,
    #050505 0 var(--month-progress),
    rgba(5, 5, 5, 0.24) var(--month-progress) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
}
.month-item.is-past .month-value {
  color: #050505;
}
.month-item.is-current .month-value {
  color: transparent;
  background: linear-gradient(
    to right,
    #050505 0 var(--month-progress),
    rgba(5, 5, 5, 0.28) var(--month-progress) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
}
[data-theme="dark"] .calendar-year-progress {
  background: linear-gradient(
    to right,
    #f7f7f4 0 var(--year-progress),
    rgba(247, 247, 244, 0.17) var(--year-progress) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
}
[data-theme="dark"] .month-value {
  color: rgba(247, 247, 244, 0.28);
}
[data-theme="dark"] .month-value {
  background: linear-gradient(
    to right,
    #f7f7f4 0 var(--month-progress),
    rgba(247, 247, 244, 0.24) var(--month-progress) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
}
.time-flow {
  width: min(760px, 100%);
  margin: clamp(18px, 2vw, 28px) auto 0;
}
.time-flow-track {
  position: relative;
  height: 3px;
  overflow: visible;
  background: rgba(5, 5, 5, 0.1);
}
.time-flow-fill {
  position: absolute;
  inset: 0 auto 0 0;
  display: block;
  background: #050505;
  transition: width 0.8s cubic-bezier(0.2, 0.72, 0.18, 1);
}
.time-flow-fill::after {
  position: absolute;
  top: -4px;
  right: -14px;
  width: 28px;
  height: 11px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent);
  content: "";
  animation: time-sweep 3.2s ease-in-out infinite;
}
.time-flow-marker {
  position: absolute;
  top: 50%;
  width: 9px;
  height: 9px;
  border: 2px solid #f7f7f4;
  border-radius: 50%;
  background: #050505;
  box-shadow: 0 0 0 4px rgba(5, 5, 5, 0.1), 0 5px 12px rgba(5, 5, 5, 0.18);
  transform: translate(-50%, -50%);
  transition: left 0.8s cubic-bezier(0.2, 0.72, 0.18, 1);
}
.time-flow-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 9px;
  color: rgba(5, 5, 5, 0.42);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
}
.day-cell.is-elapsed {
  color: rgba(5, 5, 5, 0.92);
}
.day-cell.is-future {
  color: rgba(5, 5, 5, 0.3);
}
[data-theme="dark"] .day-cell.is-future {
  color: rgba(247, 247, 244, 0.3);
}
.day-cell.is-today {
  animation: today-breathe 2.8s ease-in-out infinite;
}
@keyframes time-sweep {
  0%, 35% { opacity: 0; transform: translateX(-12px); }
  55% { opacity: 0.85; }
  75%, 100% { opacity: 0; transform: translateX(12px); }
}
@keyframes today-breathe {
  0%, 100% { box-shadow: 0 7px 16px rgba(5, 5, 5, 0.2), 0 0 0 7px rgba(5, 5, 5, 0.045), 0 14px 28px rgba(5, 5, 5, 0.12); }
  50% { box-shadow: 0 9px 20px rgba(5, 5, 5, 0.24), 0 0 0 9px rgba(5, 5, 5, 0.065), 0 18px 32px rgba(5, 5, 5, 0.14); }
}
[data-theme="dark"] .time-flow-track { background: rgba(247, 247, 244, 0.16); }
[data-theme="dark"] .time-flow-fill { background: #f7f7f4; }
[data-theme="dark"] .time-flow-marker { border-color: #050505; background: #f7f7f4; box-shadow: 0 0 0 4px rgba(247, 247, 244, 0.12), 0 5px 12px rgba(0, 0, 0, 0.28); }
[data-theme="dark"] .time-flow-meta { color: rgba(247, 247, 244, 0.44); }
[data-theme="dark"] .day-cell.is-elapsed { color: rgba(247, 247, 244, 0.92); }
@media (prefers-reduced-motion: reduce) {
  .time-flow-fill::after,
  .day-cell.is-today { animation: none; }
}
.card-back {
  padding: clamp(24px, 4vw, 52px);
}
.calendar-shell {
  width: min(1040px, 92vw);
  max-height: calc(100vh - var(--navbar-height) - 40px);
  margin: auto;
  overflow: visible;
}
.calendar-header {
  gap: 1.2rem;
  padding-bottom: clamp(14px, 1.6vw, 22px);
}
.calendar-year {
  font-size: clamp(54px, 8vw, 118px);
  line-height: 0.82;
}
.month-list {
  gap: 0.12rem;
  padding: 12px 0 18px;
}
.month-item {
  font-size: clamp(9px, 0.85vw, 12px);
}
.calendar-main {
  width: 100%;
}
.month-card {
  width: min(700px, 100%);
  padding: clamp(14px, 1.7vw, 24px);
}
.month-card-top {
  padding-bottom: 13px;
}
.month-name {
  font-size: clamp(23px, 3vw, 42px);
}
.month-index {
  font-size: 10px;
}
.weekday-row, .days-grid {
  gap: 3px;
}
.weekday-row {
  padding: 9px 0 7px;
  font-size: 9px;
}
.day-cell {
  min-height: clamp(34px, 4.2vw, 62px);
  font-size: clamp(13px, 1.45vw, 19px);
}
.day-cell.is-today {
  box-shadow:
    0 5px 12px rgba(5, 5, 5, 0.18),
    0 0 0 5px rgba(5, 5, 5, 0.04),
    0 10px 20px rgba(5, 5, 5, 0.1);
}
.time-flow {
  margin-top: 16px;
}
@media (max-width: 768px), (pointer: coarse) {
  .home-hero-3d {
    min-height: calc(100vh - var(--navbar-height));
    cursor: auto;
  }

  .cursor-ring {
    display: none;
  }

  .tilt-layer {
    inset: -24px;
  }

  .flip-card {
    cursor: pointer;
  }

  .flip-cue {
    width: 18px;
    height: 18px;
    margin-top: 16px;
  }

  .title {
    font-size: clamp(40px, 13vw, 72px);
    white-space: normal;
  }

  .meta,
  .meta-depth {
    font-size: clamp(13px, 4vw, 18px);
  }

  .back-copy {
    width: min(100%, 92vw);
    padding: clamp(24px, 7vw, 36px);
    font-size: clamp(18px, 5.2vw, 26px);
  }

  .back-copy::after {
    border-radius: 20px;
  }

  .calendar-shell {
    width: min(100%, 92vw);
  }

  .calendar-header {
    align-items: center;
    flex-direction: row;
    gap: 1.2rem;
  }

  .calendar-year {
    font-size: clamp(54px, 17vw, 92px);
  }

  .month-list {
    gap: 0.08rem;
    padding: 14px 0 22px;
  }

  .month-item {
    font-size: 9px;
  }

  .calendar-main {
    display: block;
  }

  .month-card {
    padding: 15px;
    border-radius: 14px;
  }

  .month-name {
    font-size: clamp(25px, 8vw, 40px);
  }

  .day-cell {
    min-height: 34px;
  }

  .calendar-note {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 14px;
    padding: 0 4px;
  }

  .note-mark {
    grid-row: span 3;
    margin: 2px 0 0;
  }

  .note-title {
    font-size: 24px;
  }

  .note-copy {
    margin: 7px 0 10px;
    font-size: 13px;
  }

  .note-rule,
  .note-foot {
    grid-column: 1 / -1;
  }
}
</style>
