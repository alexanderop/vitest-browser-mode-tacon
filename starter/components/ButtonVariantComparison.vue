<script setup lang="ts">
import ButtonVariantGallery from './ButtonVariantGallery.vue'
</script>

<template>
  <div class="variant-comparison">
    <figure v-for="panel in ['baseline', 'missing', 'diff'] as const" :key="panel">
      <figcaption>{{ panel === 'baseline' ? 'Referenz' : panel === 'missing' ? 'Aktuell' : 'Abweichung' }}</figcaption>
      <div class="mini-gallery"><ButtonVariantGallery :illustration="panel === 'baseline' ? undefined : panel" /></div>
    </figure>
  </div>
  <p class="comparison-caption">Schematischer Vergleich · Outline / Disabled fehlt im aktuellen Rendering.</p>
</template>

<style scoped>
.variant-comparison { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 30px; }
figure { margin: 0; min-width: 0; }
figcaption { margin-bottom: 14px; font-size: 21px; font-weight: 650; }
figure:last-child figcaption { color: var(--brand-accent, #ff55e7); }
.mini-gallery { width: 280px; height: 142px; overflow: hidden; }
.mini-gallery :deep(.button-gallery) { transform: scale(.4); transform-origin: top left; }
.comparison-caption { margin: 23px 0 0; font-size: 19px; }
</style>
