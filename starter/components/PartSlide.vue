<script setup lang="ts">
defineProps<{
  part: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="part-slide">
    <div class="part-slide__glow" />
    <div class="part-slide__grid" />
    <div class="part-slide__number">{{ part }}</div>

    <div class="part-slide__content">
      <div class="part-slide__label">Kapitel {{ part }}</div>
      <div class="part-slide__line" />
      <h1 class="part-slide__title">{{ title }}</h1>
      <p v-if="subtitle" class="part-slide__subtitle">{{ subtitle }}</p>
    </div>

    <div class="part-slide__corner" />
  </div>
</template>

<style scoped>
.part-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 60% at 70% 50%, color-mix(in srgb, var(--brand-accent), transparent 96%) 0%, transparent 70%),
    radial-gradient(ellipse 50% 80% at 20% 60%, rgba(52, 63, 96, 0.3) 0%, transparent 60%),
    var(--brand-bg);
}

.part-slide__glow {
  position: absolute;
  top: 50%;
  right: 12%;
  width: 21rem;
  height: 21rem;
  transform: translate(50%, -50%);
  background: radial-gradient(circle, color-mix(in srgb, var(--brand-accent), transparent 92%) 0%, transparent 70%);
}

.part-slide__grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(color-mix(in srgb, var(--brand-text), transparent 97%) 1px, transparent 1px);
  background-size: 2rem 2rem;
}

.part-slide__number {
  position: absolute;
  top: 50%;
  right: -2%;
  transform: translateY(-50%);
  color: transparent;
  font-size: clamp(17rem, 35vw, 26rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  -webkit-text-stroke: 1.5px color-mix(in srgb, var(--brand-accent), transparent 88%);
}

.part-slide__content {
  position: relative;
  z-index: 1;
  max-width: 70%;
  padding-left: 5rem;
}

.part-slide__label {
  margin-bottom: 1rem;
  color: var(--brand-accent);
  font-family: 'Geist Mono', monospace;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.part-slide__line {
  width: 3rem;
  height: 2px;
  margin-bottom: 1.25rem;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--brand-accent), color-mix(in srgb, var(--brand-accent), transparent 80%));
  box-shadow: 0 0 0.75rem color-mix(in srgb, var(--brand-accent), transparent 70%);
}

.part-slide__title {
  margin: 0 !important;
  color: var(--brand-text) !important;
  font-size: clamp(2.25rem, 5vw, 3.5rem) !important;
  font-weight: 700 !important;
  line-height: 1.15 !important;
  letter-spacing: -0.025em;
}

.part-slide__subtitle {
  margin-top: 0.75rem;
  color: color-mix(in srgb, var(--brand-text), transparent 20%);
  font-size: 1.25rem;
  line-height: 1.5;
}

.part-slide__corner {
  position: absolute;
  right: 2.5rem;
  bottom: 2.5rem;
  width: 2rem;
  height: 2rem;
  border-right: 1.5px solid color-mix(in srgb, var(--brand-accent), transparent 75%);
  border-bottom: 1.5px solid color-mix(in srgb, var(--brand-accent), transparent 75%);
}
</style>
