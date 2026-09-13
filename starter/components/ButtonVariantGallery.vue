<script setup lang="ts">
import VisualDemoButton from './VisualDemoButton.vue'

defineProps<{ illustration?: 'missing' | 'diff' }>()
const variants = ['primary', 'secondary', 'outline'] as const
const states = [
  { name: 'Small', size: 'small', disabled: false },
  { name: 'Medium', size: 'medium', disabled: false },
  { name: 'Large', size: 'large', disabled: false },
  { name: 'Disabled', size: 'medium', disabled: true },
] as const
</script>

<template>
  <section aria-label="Button-Varianten" class="button-gallery" :class="{ 'is-diff': illustration === 'diff' }">
    <div class="gallery-heading">CLAW & CHEW <span>BaseButton</span></div>
    <div class="gallery-grid">
      <span />
      <strong v-for="variant in variants" :key="variant" class="column-title">{{ variant }}</strong>
      <template v-for="state in states" :key="state.name">
        <span class="row-title">{{ state.name }}</span>
        <div v-for="variant in variants" :key="variant" class="button-cell"
          :class="{ 'diff-cell': illustration === 'diff' && variant === 'outline' && state.disabled }">
          <VisualDemoButton v-if="!(illustration && variant === 'outline' && state.disabled)"
            :variant="variant" :size="state.size" :disabled="state.disabled" />
          <span v-else-if="illustration === 'diff'" class="diff-mark">Fehlt</span>
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.button-gallery { width: 700px; box-sizing: border-box; padding: 22px; background: #fffaf3; color: #51311e; border-radius: 10px; }
.gallery-heading { font-size: 16px; font-weight: 800; letter-spacing: .05em; padding-bottom: 18px; border-bottom: 1px solid #decdb8; }
.gallery-heading span { float: right; font-size: 13px; font-weight: 500; letter-spacing: 0; }
.gallery-grid { display: grid; grid-template-columns: 70px repeat(3, 1fr); gap: 8px 10px; align-items: center; margin-top: 16px; }
.column-title { color: #51311e; font-size: 13px; text-transform: capitalize; text-align: center; }
.row-title { font-size: 12px; }
.button-cell { display: flex; align-items: center; justify-content: center; height: 49px; border-radius: 5px; }
.is-diff .button-cell:not(.diff-cell) { opacity: .18; filter: grayscale(1); }
.diff-cell { background: #ffd6e1; outline: 2px solid #cc2355; }
.diff-mark { color: #a91941; font-size: 16px; font-weight: 700; }
</style>
