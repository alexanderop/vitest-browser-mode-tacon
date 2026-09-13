<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { create } from 'asciinema-player'
import 'asciinema-player/dist/bundle/asciinema-player.css'

const host = ref<HTMLDivElement | null>(null)
const error = ref(false)
let player: ReturnType<typeof create> | undefined
onMounted(() => {
  if (!host.value) return
  player = create(`${import.meta.env.BASE_URL}shop/terminal/blocked-button-jsdom.cast`, host.value, {
    cols: 100, rows: 15, autoPlay: false, preload: true, fit: 'width',
    terminalFontSize: 20, theme: 'dracula', poster: 'npt:0:0.5',
  })
  player.addEventListener('error', () => { error.value = true })
})
onBeforeUnmount(() => player?.dispose())
</script>

<template>
  <div class="terminal-recording" @keydown.stop>
    <div ref="host" aria-label="Aufgezeichneter JSDOM-Testlauf mit aktivem CSS-Bug" />
    <p v-if="error" role="alert">Die Aufnahme konnte nicht geladen werden.</p>
  </div>
</template>

<style scoped>
.terminal-recording { width: 100%; margin-top: 2rem; }
.terminal-recording :deep(pre.ap-term-text) {
  font-size: inherit !important;
  line-height: var(--term-line-height) !important;
  background-color: transparent !important;
}
</style>
