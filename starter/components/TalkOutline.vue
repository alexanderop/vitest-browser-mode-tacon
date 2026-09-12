<script setup lang="ts">
defineProps<{
  items: ReadonlyArray<{ title: string; subtitle: string }>
}>()
</script>

<template>
  <div class="outline">
    <div v-for="(item, index) in items" :key="item.title" v-click class="outline__item">
      <span class="outline__number">{{ String(index).padStart(2, '0') }}</span>
      <div class="outline__text">
        <span class="outline__title">{{ item.title }}</span>
        <span class="outline__subtitle">{{ item.subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outline {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  padding: 2.5rem 5rem;
}

.outline__item {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--brand-text), transparent 92%);
  transition: opacity 400ms ease, transform 400ms ease;
}

:global(.slidev-vclick-hidden).outline__item {
  opacity: 0;
  transform: translateY(0.75rem) !important;
}

.outline__number {
  flex-shrink: 0;
  color: color-mix(in srgb, var(--brand-accent), transparent 45%);
  font-family: 'Geist Mono', monospace;
  font-size: 0.85rem;
  font-weight: 500;
}

.outline__text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.outline__title {
  font-size: 1.4rem;
  font-weight: 700;
}

.outline__subtitle {
  color: color-mix(in srgb, var(--brand-text), transparent 65%);
  font-size: 0.95rem;
}
</style>
