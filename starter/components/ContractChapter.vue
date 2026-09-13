<script setup lang="ts">
defineProps<{
  number: 1 | 2 | 3
  title: string
  question: string
}>()
</script>

<template>
  <div class="contract-chapter">
    <div>
      <div class="contract-chapter__number">{{ number }} / 3</div>
      <h1>{{ title }}</h1>
      <div class="contract-chapter__question">{{ question }}</div>
    </div>
    <div
      aria-hidden="true"
      class="contract-chapter__mascot"
      :style="{ backgroundPosition: `${[0, -344, -676][number - 1]}px -130px` }"
    />
  </div>
</template>

<style scoped>
.contract-chapter {
  display: grid;
  grid-template-columns: 1fr 324px;
  align-items: center;
  gap: 32px;
  height: 440px;
}
.contract-chapter__number {
  color: var(--brand-accent);
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 16px;
}
.contract-chapter h1 { font-size: 48px; font-weight: 700; }
.contract-chapter__question { font-size: 28px; line-height: 1.4; margin-top: 24px; white-space: pre-line; }
.contract-chapter__mascot {
  height: 324px;
  border-radius: 18px;
  background-image: url('/memes/hamcrab-three-component-contracts-v2.png');
  background-size: 1000px auto;
  background-repeat: no-repeat;
}
</style>
