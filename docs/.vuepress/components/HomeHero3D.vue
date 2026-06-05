<template>
  <section ref="root" class="home-hero-3d">
    <div ref="spotlight" class="spotlight" />
    <div ref="cursorRing" class="cursor-ring" aria-hidden="true">
      <span ref="cursorTitle" class="cursor-title">{{ backText }}</span>
    </div>

    <div ref="tiltLayer" class="tilt-layer">
      <div ref="enterLayer" class="enter-layer">
        <div class="text-scene">
          <div class="depth title-depth near">{{ frontText }}</div>
          <div class="depth title-depth mid">{{ frontText }}</div>
          <div class="depth title-depth deep">{{ frontText }}</div>

          <div ref="textZone" class="text-zone">
            <h1 ref="titleEl" class="title" :aria-label="`${frontText} / ${backText}`">
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
const metaChars = computed(() => [...metaText]);

const root = ref<HTMLElement | null>(null);
const tiltLayer = ref<HTMLElement | null>(null);
const enterLayer = ref<HTMLElement | null>(null);
const spotlight = ref<HTMLElement | null>(null);
const cursorRing = ref<HTMLElement | null>(null);
const cursorTitle = ref<HTMLElement | null>(null);
const textZone = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);

let ctx: ReturnType<typeof gsap.context> | null = null;
let cleanup: (() => void) | null = null;

onMounted(() => {
  const rootEl = root.value;
  const tiltEl = tiltLayer.value;
  const enterEl = enterLayer.value;
  const spotlightEl = spotlight.value;
  const cursorEl = cursorRing.value;
  const cursorTitleEl = cursorTitle.value;
  const textZoneEl = textZone.value;
  const titleNode = titleEl.value;

  if (
    !rootEl ||
    !tiltEl ||
    !enterEl ||
    !spotlightEl ||
    !cursorEl ||
    !cursorTitleEl ||
    !textZoneEl ||
    !titleNode
  ) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  ctx = gsap.context(() => {
    if (!reduceMotion) {
      gsap.to(enterEl, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "expo.out",
        delay: 0.15,
      });

      gsap.to(".char", {
        opacity: 1,
        y: 0,
        z: 95,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "back.out(1.8)",
        stagger: 0.035,
        delay: 0.38,
      });

      gsap.to(".meta-char", {
        opacity: 1,
        y: 0,
        z: 32,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "back.out(1.35)",
        stagger: 0.026,
        delay: 0.78,
      });
    } else {
      gsap.set(enterEl, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "none",
      });

      gsap.set(".char, .meta-char", {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
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
      duration: 0.16,
      ease: "power3.out",
    });
    const cursorYTo = gsap.quickTo(cursorEl, "y", {
      duration: 0.16,
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
      const cursorSize = cursorEl.offsetWidth;
      const cursorRadius = cursorSize / 2;
      const titleLeft = textRect.left - rootRect.left;
      const titleTop = textRect.top - rootRect.top;
      const cursorLeft = pointerX - cursorRadius;
      const cursorTop = pointerY - cursorRadius;
      const isOverText =
        event.clientX >= textRect.left &&
        event.clientX <= textRect.right &&
        event.clientY >= textRect.top &&
        event.clientY <= textRect.bottom;

      rotateYTo(x * 20);
      rotateXTo(y * -14);
      xTo(x * 28);
      yTo(y * 20);
      zTo(72);
      lightXTo(pointerX);
      lightYTo(pointerY);
      rootEl.style.setProperty("--depth-near-x", `${x * -10}px`);
      rootEl.style.setProperty("--depth-near-y", `${y * -8}px`);
      rootEl.style.setProperty("--depth-mid-x", `${x * -24}px`);
      rootEl.style.setProperty("--depth-mid-y", `${y * -18}px`);
      rootEl.style.setProperty("--depth-deep-x", `${x * -52}px`);
      rootEl.style.setProperty("--depth-deep-y", `${y * -40}px`);
      rootEl.style.setProperty("--meta-near-x", `${x * -8}px`);
      rootEl.style.setProperty("--meta-near-y", `${y * -6}px`);
      rootEl.style.setProperty("--meta-deep-x", `${x * -18}px`);
      rootEl.style.setProperty("--meta-deep-y", `${y * -14}px`);
      rootEl.style.setProperty("--shine-x", `${50 + x * 24}%`);
      rootEl.style.setProperty("--shine-y", `${48 + y * 20}%`);
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
      rootEl.style.setProperty("--depth-near-x", "0px");
      rootEl.style.setProperty("--depth-near-y", "0px");
      rootEl.style.setProperty("--depth-mid-x", "0px");
      rootEl.style.setProperty("--depth-mid-y", "0px");
      rootEl.style.setProperty("--depth-deep-x", "0px");
      rootEl.style.setProperty("--depth-deep-y", "0px");
      rootEl.style.setProperty("--meta-near-x", "0px");
      rootEl.style.setProperty("--meta-near-y", "0px");
      rootEl.style.setProperty("--meta-deep-x", "0px");
      rootEl.style.setProperty("--meta-deep-y", "0px");
      rootEl.style.setProperty("--shine-x", "50%");
      rootEl.style.setProperty("--shine-y", "48%");
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
  --depth-near-x: 0px;
  --depth-near-y: 0px;
  --depth-mid-x: 0px;
  --depth-mid-y: 0px;
  --depth-deep-x: 0px;
  --depth-deep-y: 0px;
  --meta-near-x: 0px;
  --meta-near-y: 0px;
  --meta-deep-x: 0px;
  --meta-deep-y: 0px;
  --shine-x: 50%;
  --shine-y: 48%;
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
  perspective: 760px;
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
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.09), transparent 64%);
  opacity: 0.55;
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
  box-shadow: 0 22px 54px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.18s ease;
  will-change: transform;
}

.cursor-ring.is-visible {
  opacity: 1;
}

.cursor-title {
  position: absolute;
  top: var(--cursor-title-top);
  left: var(--cursor-title-left);
  display: block;
  width: var(--cursor-title-width);
  color: #fff;
  font-family: inherit;
  font-size: clamp(42px, 7vw, 104px);
  font-weight: 950;
  line-height: 0.92;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
  text-align: center;
  text-transform: none;
  transition: opacity 0.08s ease;
}

.cursor-ring.is-over-text .cursor-title {
  opacity: 1;
}

.tilt-layer,
.enter-layer,
.text-scene,
.text-zone,
.title,
.meta-wrap {
  transform-style: preserve-3d;
}

.tilt-layer {
  position: relative;
  z-index: 5;
  will-change: transform;
}

.enter-layer {
  opacity: 0;
  transform: translateY(60px) rotateX(40deg) scale(0.86);
  filter: blur(12px);
}

.text-scene {
  position: relative;
  padding: 48px;
  text-align: center;
}

.text-zone {
  position: relative;
  cursor: none;
}

.title,
.title-depth {
  font-size: clamp(42px, 7vw, 104px);
  font-weight: 950;
  line-height: 0.92;
  letter-spacing: 0;
  white-space: nowrap;
  text-transform: uppercase;
}

.title {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0;
  margin-inline: auto;
  color: #050505;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.42),
    0 16px 34px rgba(0, 0, 0, 0.18),
    0 36px 72px rgba(0, 0, 0, 0.12);
  transform: translateZ(88px);
}

.title-front {
  display: inline-block;
  transform-style: preserve-3d;
}

.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(48px) translateZ(-120px) rotateX(-85deg) scale(0.72);
  transform-origin: bottom center;
  will-change: transform;
}

.depth {
  position: absolute;
  inset: 48px;
  z-index: -1;
  pointer-events: none;
  user-select: none;
  will-change: transform;
}

.depth.near {
  color: rgba(0, 0, 0, 0.13);
  filter: blur(1.5px);
  transform: translate3d(calc(10px + var(--depth-near-x)), calc(12px + var(--depth-near-y)), -70px);
}

.depth.mid {
  color: rgba(0, 0, 0, 0.082);
  filter: blur(6px);
  transform: translate3d(calc(28px + var(--depth-mid-x)), calc(34px + var(--depth-mid-y)), -180px);
}

.depth.deep {
  color: rgba(0, 0, 0, 0.035);
  filter: blur(18px);
  transform: translate3d(calc(62px + var(--depth-deep-x)), calc(78px + var(--depth-deep-y)), -360px);
}

.meta-wrap {
  position: relative;
  width: fit-content;
  margin: 18px auto 0;
}

.meta {
  position: relative;
  z-index: 2;
  margin: 0;
  color: #111;
  font-size: clamp(14px, 1.45vw, 20px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: translateZ(54px);
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.45),
    0 10px 22px rgba(0, 0, 0, 0.12);
}

.meta-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(18px) translateZ(-64px) rotateX(-62deg) scale(0.82);
  transform-origin: bottom center;
}

.meta-depth {
  position: absolute;
  inset: 0;
  z-index: -1;
  color: rgba(0, 0, 0, 0.075);
  font-size: clamp(14px, 1.45vw, 20px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.08em;
  white-space: nowrap;
  text-transform: uppercase;
  filter: blur(4px);
  transform: translate3d(calc(8px + var(--meta-near-x)), calc(10px + var(--meta-near-y)), -80px);
}

.meta-depth.deep {
  color: rgba(0, 0, 0, 0.036);
  filter: blur(10px);
  transform: translate3d(calc(18px + var(--meta-deep-x)), calc(22px + var(--meta-deep-y)), -170px);
}

@media (max-width: 768px), (pointer: coarse) {
  .home-hero-3d {
    min-height: calc(100vh - var(--navbar-height));
    cursor: auto;
  }

  .cursor-ring {
    display: none;
  }

  .text-scene {
    padding: 28px;
  }

  .title,
  .title-depth {
    font-size: clamp(40px, 13vw, 72px);
    white-space: normal;
  }

  .depth {
    inset: 28px;
  }

  .meta,
  .meta-depth {
    font-size: clamp(13px, 4vw, 18px);
  }
}
</style>
