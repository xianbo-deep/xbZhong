<template>
  <section ref="root" class="home-hero-3d">
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
      <button
        class="flip-card"
        :class="{ 'is-flipped': isFlipped }"
        type="button"
        aria-label="翻转主页介绍卡片"
        @click="toggleFlip"
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
          <p class="back-copy">{{ backParagraph }}</p>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";

const frontText = "HELLO, I'M zxb";
const backText = "你好，我是 zxb";
const metaText = "21岁 / ECUST";
const backParagraph =
  "随着年龄的增长 生活让你变得谦卑 你不再追逐大事 开始珍惜小事：独处的时间 充足的睡眠 良好的饮食 长途散步 以及与所爱之人共度的高质量时光 简单成为最终目标"
const frontChars = computed(() => [...frontText]);
const cursorBackChars = computed(() => [...backText]);
const metaChars = computed(() => [...metaText]);

const root = ref<HTMLElement | null>(null);
const tiltLayer = ref<HTMLElement | null>(null);
const spotlight = ref<HTMLElement | null>(null);
const cursorRing = ref<HTMLElement | null>(null);
const textZone = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);
const isFlipped = ref(false);

let ctx: ReturnType<typeof gsap.context> | null = null;
let cleanup: (() => void) | null = null;

const resetDepth = (rootEl: HTMLElement) => {
  rootEl.style.setProperty("--title-shadow-x", "0px");
  rootEl.style.setProperty("--title-shadow-y", "0px");
  rootEl.style.setProperty("--meta-near-x", "0px");
  rootEl.style.setProperty("--meta-near-y", "0px");
  rootEl.style.setProperty("--meta-deep-x", "0px");
  rootEl.style.setProperty("--meta-deep-y", "0px");
};

const toggleFlip = () => {
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
        ".card-front",
        {
          opacity: 0,
          clipPath: "inset(18% 18% 18% 18% round 34px)",
          filter: "blur(14px)",
          scale: 0.96,
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          filter: "blur(0px)",
          scale: 1,
          duration: 0.9,
        },
      );

      intro.fromTo(
        ".text-zone",
        {
          opacity: 0,
          y: 42,
          z: -80,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          filter: "blur(0px)",
          duration: 0.8,
        },
        "-=0.55",
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
    const rotateXTo = gsap.quickTo(tiltEl, "rotationX", {
      duration: 0.52,
      ease: "power3.out",
    });
    const rotateYTo = gsap.quickTo(tiltEl, "rotationY", {
      duration: 0.52,
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
    const cursorXTo = gsap.quickTo(cursorEl, "x", {
      duration: 0.14,
      ease: "power3.out",
    });
    const cursorYTo = gsap.quickTo(cursorEl, "y", {
      duration: 0.14,
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

      rotateYTo(0);
      rotateXTo(0);
      xTo(x * 16);
      yTo(y * 12);
      zTo(72);
      lightXTo(pointerX);
      lightYTo(pointerY);

      rootEl.style.setProperty("--title-shadow-x", `${x * -16}px`);
      rootEl.style.setProperty("--title-shadow-y", `${y * -12}px`);
      rootEl.style.setProperty("--meta-near-x", `${x * -3}px`);
      rootEl.style.setProperty("--meta-near-y", `${y * -2}px`);
      rootEl.style.setProperty("--meta-deep-x", `${x * -7}px`);
      rootEl.style.setProperty("--meta-deep-y", `${y * -5}px`);

      cursorXTo(pointerX);
      cursorYTo(pointerY);
      cursorEl.classList.add("is-visible");
      cursorEl.classList.toggle("is-over-text", isOverText);
      cursorEl.style.setProperty("--cursor-title-left", `${titleLeft - cursorLeft}px`);
      cursorEl.style.setProperty("--cursor-title-top", `${titleTop - cursorTop}px`);
      cursorEl.style.setProperty("--cursor-title-width", `${textRect.width}px`);
    };

    const onLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      xTo(0);
      yTo(0);
      zTo(0);
      resetDepth(rootEl);
      cursorEl.classList.remove("is-visible");
      cursorEl.classList.remove("is-over-text");
    };

    rootEl.addEventListener("mousemove", onMove);
    rootEl.addEventListener("mouseleave", onLeave);

    cleanup = () => {
      rootEl.removeEventListener("mousemove", onMove);
      rootEl.removeEventListener("mouseleave", onLeave);
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
.flip-card,
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

.flip-card {
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
  transition: transform 0.78s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.flip-card.is-flipped {
  transform: rotateY(180deg);
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
  font-size: clamp(42px, 7vw, 104px);
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
  line-height: 0.92;
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
    0 1px 0 rgba(255, 255, 255, 0.52),
    0 13px 26px rgba(0, 0, 0, 0.16),
    0 34px 68px rgba(0, 0, 0, 0.1);
  transform: translateZ(72px);
}

.title::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  color: rgba(0, 0, 0, 0.14);
  content: attr(data-title);
  filter: blur(8px);
  pointer-events: none;
  transform: translate3d(
    calc(18px + var(--title-shadow-x)),
    calc(22px + var(--title-shadow-y)),
    -54px
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
}

.meta-wrap {
  position: relative;
  width: fit-content;
  margin: 20px auto 0;
}

.meta {
  position: relative;
  z-index: 2;
  margin: 0;
  color: #111;
  font-size: clamp(14px, 1.45vw, 20px);
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: translateZ(54px);
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.45),
    0 8px 18px rgba(0, 0, 0, 0.1);
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
  color: rgba(0, 0, 0, 0.045);
  font-size: clamp(14px, 1.45vw, 20px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.08em;
  white-space: nowrap;
  text-transform: uppercase;
  filter: blur(3px);
  transform: translate3d(calc(5px + var(--meta-near-x)), calc(6px + var(--meta-near-y)), -40px);
}

.meta-depth.deep {
  color: rgba(0, 0, 0, 0.024);
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
  width: min(760px, 100%);
  margin: 0 auto;
  color: #050505;
  font-size: clamp(20px, 2.3vw, 34px);
  font-weight: 650;
  line-height: 1.55;
  letter-spacing: 0;
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
    font-size: clamp(18px, 5.2vw, 26px);
  }
}
</style>
