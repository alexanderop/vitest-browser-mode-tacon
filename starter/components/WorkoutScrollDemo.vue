<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import ScrollFadeContainer from './workout/ScrollFadeContainer.vue'

const wide = ref(false)
const selected = ref('Plank')
const demo = useTemplateRef<HTMLElement>('demo')
const exercises = ['Plank', 'Squat', 'Deadlift', 'Bench Press', 'Pull-up']

function scroll(edge: 'start' | 'end') {
  const content = demo.value?.querySelector('.scroll-fade-content')
  content?.scrollTo({ left: edge === 'start' ? 0 : content.scrollWidth, behavior: 'smooth' })
}
</script>

<template>
  <section ref="demo" class="workout-demo" aria-label="Workout Tracker: Scroll-Vertrag">
    <p class="origin">Originalkomponente: ScrollFadeContainer.vue · Demo-Inhalt für den Talk</p>
    <div class="controls">
      <button @click="scroll('start')">Zum Anfang</button>
      <button @click="scroll('end')">Zum Ende</button>
      <button :aria-pressed="wide" @click="wide = !wide">{{ wide ? 'Schmaler Container' : 'Breiter Container' }}</button>
    </div>
    <div class="frame" :class="{ wide }">
      <ScrollFadeContainer>
        <div class="exercises" aria-label="Übungen">
          <button v-for="exercise in exercises" :key="exercise" :aria-pressed="selected === exercise" @click="selected = exercise">{{ exercise }}</button>
        </div>
      </ScrollFadeContainer>
    </div>
    <p role="status">Ausgewählte Übung: <strong>{{ selected }}</strong></p>
    <p class="contract">Am Anfang: Verlauf rechts · Am Ende: links · Ohne Überlauf: keiner</p>
  </section>
</template>

<style scoped>
.workout-demo { --background: #18181b; margin-top: 1.5rem; }
.origin { font-size: .85rem; opacity: .75; }
.controls { display: flex; gap: .7rem; margin: 1.2rem 0; }
button { border: 1px solid var(--brand-accent); border-radius: .5rem; padding: .6rem .85rem; font-size: 1rem; }
button:focus-visible { outline: 3px solid var(--brand-accent); outline-offset: 3px; }
button[aria-pressed=true] { background: var(--brand-accent); color: #18181b; }
.frame { width: 350px; max-width: 100%; padding: 1rem 0; background: var(--background); border-radius: .6rem; }
.frame.wide { width: 100%; }
.exercises { display: flex; gap: 12px; width: 660px; padding: 8px; }
.exercises button { flex: 1; white-space: nowrap; }
.contract { font-size: 1rem; opacity: .8; }
</style>
