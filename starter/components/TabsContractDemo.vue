<script setup lang="ts">
import { computed, ref } from 'vue'

const broken = ref(false)
const selected = ref<'Account' | 'Password'>('Account')
const account = ref<HTMLButtonElement | null>(null)
const password = ref<HTMLButtonElement | null>(null)
const semanticName = computed(() => broken.value ? 'Account' : selected.value)

function navigate(event: KeyboardEvent) {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const next = event.key === 'Home' ? 'Account' : event.key === 'End' ? 'Password' : selected.value === 'Account' ? 'Password' : 'Account'
  selected.value = next
  const tab = next === 'Account' ? account.value : password.value
  tab?.focus()
}
</script>

<template>
  <div class="tabs-contract-demo">
    <p class="explanation">Vereinfachte Demonstration · Defekt absichtlich eingebaut</p>
    <button class="defect-switch" :aria-pressed="broken" @click="broken = !broken">
      {{ broken ? 'Defekt beheben' : 'Defekt einbauen' }}
    </button>
    <div class="comparison">
      <section>
        <h2>Sichtbare Oberfläche</h2>
        <div role="tablist" aria-label="Manage your account" @keydown="navigate">
          <button id="demo-account" ref="account" role="tab" :aria-selected="semanticName === 'Account'" aria-controls="demo-panel" :tabindex="selected === 'Account' ? 0 : -1" :class="{ active: selected === 'Account' }" @click="selected = 'Account'">Account</button>
          <button id="demo-password" ref="password" role="tab" :aria-selected="semanticName === 'Password'" aria-controls="demo-panel" :tabindex="selected === 'Password' ? 0 : -1" :class="{ active: selected === 'Password' }" @click="selected = 'Password'">Password</button>
        </div>
        <div id="demo-panel" role="tabpanel" :aria-labelledby="semanticName === 'Account' ? 'demo-account' : 'demo-password'" tabindex="0">
          <strong>{{ selected }}</strong>
          <p>{{ selected === 'Password' ? 'Change your password here.' : 'Make changes to your account here.' }}</p>
        </div>
      </section>
      <section aria-label="Erklärung der gesetzten ARIA-Attribute">
        <h2>Gemeldete Bedeutung</h2>
        <p>Ausgewählter Tab: <strong>{{ semanticName }}</strong></p>
        <p>Name des Panels: <strong>{{ semanticName }}</strong></p>
        <p class="result" role="status">{{ semanticName === selected ? 'Inhalt und Bedeutung stimmen überein.' : 'Password sichtbar. Account gemeldet.' }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.explanation { font-size: 1rem; color: var(--brand-text); opacity: .8; }
.defect-switch { padding: .5rem 1rem; border: 1px solid var(--brand-accent); border-radius: .4rem; margin-bottom: 1.5rem; }
.comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; text-align: left; }
h2 { font-size: 1.4rem; margin-bottom: 1.2rem; }
[role=tablist] { display: flex; gap: 1rem; border-bottom: 1px solid var(--brand-text); }
[role=tab] { padding: .6rem 1rem; border-bottom: 3px solid transparent; }
[role=tab].active { border-color: var(--brand-accent); color: var(--brand-accent); }
button:focus-visible, [role=tabpanel]:focus-visible { outline: 3px solid var(--brand-accent); outline-offset: 4px; }
[role=tabpanel] { padding: 1.3rem 0; }
p { font-size: 1.2rem; line-height: 1.5; }
.result { color: var(--brand-accent); margin-top: 1.5rem; }
</style>
