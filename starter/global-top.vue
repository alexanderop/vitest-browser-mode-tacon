<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideRoute } = useNav()
const chapter = computed(() => currentSlideRoute.value?.meta?.slide?.frontmatter?.contractChapter)
</script>

<template>
  <div v-if="chapter" class="contract-progress">{{ chapter }}</div>
</template>

<style scoped>
.contract-progress { position: absolute; top: 12px; right: 32px; font-size: 14px; color: var(--brand-accent); pointer-events: none; }
</style>
