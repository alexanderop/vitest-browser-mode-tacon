<script setup lang="ts">
interface TimelineItem {
  period: string
  title: string
  description: string
  tone?: 'default' | 'accent'
}

defineProps<{
  label: string
  items: readonly TimelineItem[]
}>()
</script>

<template>
  <ol class="history-timeline" :aria-label="label">
    <li
      v-for="item in items"
      :key="`${item.period}-${item.title}`"
      class="history-timeline__item"
      :class="{ 'history-timeline__item--accent': item.tone === 'accent' }"
    >
      <time class="history-timeline__period">{{ item.period }}</time>
      <span class="history-timeline__marker" aria-hidden="true" />
      <div class="history-timeline__card">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.history-timeline {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--timeline-columns, 6), minmax(0, 1fr));
  gap: 14px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.history-timeline::before {
  position: absolute;
  top: 47px;
  right: 3%;
  left: 3%;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--brand-border), var(--brand-accent));
  content: '';
  opacity: 0.75;
}

.history-timeline__item {
  position: relative;
  display: grid;
  grid-template-rows: 34px 28px 1fr;
  justify-items: center;
  min-width: 0;
}

.history-timeline__period {
  font-family: 'Geist Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: var(--brand-accent);
  letter-spacing: -0.02em;
}

.history-timeline__marker {
  z-index: 1;
  width: 17px;
  height: 17px;
  margin-top: 6px;
  border: 3px solid var(--brand-bg);
  border-radius: 50%;
  background: var(--brand-border);
  box-shadow: 0 0 0 2px var(--brand-border);
}

.history-timeline__card {
  box-sizing: border-box;
  width: 100%;
  min-height: 150px;
  padding: 18px 14px;
  border: 1px solid color-mix(in srgb, var(--brand-border), transparent 35%);
  border-radius: 14px;
  background: color-mix(in srgb, var(--brand-card), transparent 12%);
  text-align: left;
}

.history-timeline__card h2 {
  margin: 0 0 10px;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.1;
}

.history-timeline__card p {
  margin: 0;
  font-size: 14px;
  line-height: 1.35;
  color: color-mix(in srgb, var(--brand-text), transparent 22%);
}

.history-timeline__item--accent .history-timeline__marker {
  background: var(--brand-accent);
  box-shadow: 0 0 0 2px var(--brand-accent), 0 0 20px color-mix(in srgb, var(--brand-accent), transparent 40%);
}

.history-timeline__item--accent .history-timeline__card {
  border-color: var(--brand-accent);
  background: color-mix(in srgb, var(--brand-accent), var(--brand-card) 86%);
}

@media (max-width: 800px) {
  .history-timeline {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .history-timeline::before {
    display: none;
  }
}
</style>
