<script setup lang="ts">
defineProps<{ title: string; definition: string; example: string }>()
</script>

<template>
  <div class="contract-definition">
    <h1>{{ title }}</h1>
    <div class="contract-definition__text">{{ definition }}</div>
    <div class="contract-definition__example">
      <div class="contract-definition__label">Im Shop</div>
      <div>{{ example }}</div>
    </div>
  </div>
</template>

<style scoped>
.contract-definition { padding-top: 30px; }
.contract-definition__text { margin-top: 40px; font-size: 30px; line-height: 1.4; max-width: 820px; }
.contract-definition__example { margin-top: 36px; padding-left: 22px; border-left: 3px solid var(--brand-accent); font-size: 24px; line-height: 1.45; max-width: 800px; }
.contract-definition__label { color: var(--brand-accent); font-size: 18px; margin-bottom: 8px; }
</style>
