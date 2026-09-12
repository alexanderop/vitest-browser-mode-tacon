---
kind: file
title: Workout Tracker scroll fade component for the SPA comparison
url: unknown
author: Alexander Opalic
publisher: local workspace
published: unknown
collected: 2026-09-12
status: complete
---

# Workout Tracker scroll fade component

Origin: `/Users/alexanderopalic/Projects/active/workoutTracker/src/components/ScrollFadeContainer.vue`.
Repository HEAD at capture: `74f91bc6494322eefc4adf1c200235bda339adc3`. The code below captures the working-tree file.

The user wants the shop to explain behavior, accessibility, and visuals first, followed by the SPA strategy comparison. They then requested a component from their local Workout Tracker to demonstrate in the slides.

## Original source

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

/**
 * A container that adds fade indicators on horizontally scrollable content.
 * Shows gradient fades on edges where more content exists.
 */
defineSlots<{
  default(): unknown
}>()

const scrollRef = useTemplateRef<HTMLElement>('scrollRef')
const showLeftFade = ref(false)
const showRightFade = ref(false)

function updateFadeIndicators(): void {
  const element = scrollRef.value
  if (!element) return

  const { scrollLeft, scrollWidth, clientWidth } = element
  const threshold = 5 // Small threshold to handle sub-pixel rendering

  showLeftFade.value = scrollLeft > threshold
  showRightFade.value = scrollLeft + clientWidth < scrollWidth - threshold
}

onMounted(() => {
  const element = scrollRef.value
  if (!element) return

  updateFadeIndicators()
  element.addEventListener('scroll', updateFadeIndicators, { passive: true })

  // Watch for size changes
  const resizeObserver = new ResizeObserver(updateFadeIndicators)
  resizeObserver.observe(element)

  onUnmounted(() => {
    element.removeEventListener('scroll', updateFadeIndicators)
    resizeObserver.disconnect()
  })
})
</script>

<template>
  <div class="scroll-fade-container">
    <div
      ref="scrollRef"
      class="scroll-fade-content"
    >
      <slot />
    </div>
    <div
      class="scroll-fade-left"
      :class="{ 'opacity-100': showLeftFade, 'opacity-0': !showLeftFade }"
      aria-hidden="true"
    />
    <div
      class="scroll-fade-right"
      :class="{ 'opacity-100': showRightFade, 'opacity-0': !showRightFade }"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.scroll-fade-container {
  position: relative;
  width: 100%;
}

.scroll-fade-content {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.scroll-fade-content::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.scroll-fade-left,
.scroll-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2rem;
  pointer-events: none;
  transition: opacity 150ms ease-in-out;
}

.scroll-fade-left {
  left: 0;
  background: linear-gradient(to right, var(--background), transparent);
}

.scroll-fade-right {
  right: 0;
  background: linear-gradient(to left, var(--background), transparent);
}
</style>
```

## Deck integration

The deck contains an unchanged local copy under `components/workout/ScrollFadeContainer.vue`. `WorkoutScrollDemo.vue` supplies exercise buttons and explicit scroll/resize controls. Those controls and sample content belong to the talk, not the original application. The demo is interactive; it does not execute Vitest or demonstrate the full application. The component observes its container size and scroll position to update decorative edge fades.
