<script setup lang="ts">
import { computed, ref } from 'vue'
import AccessibilityTreePreview from './AccessibilityTreePreview.vue'

const broken = ref(true)
const selected = ref<'Account' | 'Password'>('Password')
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
    <div class="demo-toolbar">
      <p>{{ broken ? 'Der Inhalt wechselt. Die ARIA-Attribute bleiben auf Account.' : 'Repariert: Inhalt und ARIA-Attribute wechseln gemeinsam.' }}</p>
      <button type="button" class="defect-switch" role="switch" :aria-checked="broken" @click="broken = !broken; selected = 'Password'">
        <span>Defekt aktiv</span>
        <span class="switch-track" aria-hidden="true"><span class="switch-thumb" /></span>
      </button>
    </div>
    <div class="comparison">
      <section class="shop" aria-label="Kundenkonto im Demo-Shop">
        <header><span>Claw &amp; Chew</span><span class="shop-nav">Shop / My account</span></header>
        <div class="shop-body">
          <div class="customer"><div><small>YOUR LITTLE CORNER</small><h2>My account</h2></div><img src="/shop/plush-card-actual.png" alt="" /></div>
          <div role="tablist" aria-label="Manage your account" @keydown="navigate">
            <button id="demo-account" ref="account" role="tab" :aria-selected="semanticName === 'Account'" aria-controls="demo-panel" :tabindex="selected === 'Account' ? 0 : -1" :class="{ active: selected === 'Account' }" @click="selected = 'Account'">Account</button>
            <button id="demo-password" ref="password" role="tab" :aria-selected="semanticName === 'Password'" aria-controls="demo-panel" :tabindex="selected === 'Password' ? 0 : -1" :class="{ active: selected === 'Password' }" @click="selected = 'Password'">Password</button>
          </div>
          <div id="demo-panel" role="tabpanel" :aria-labelledby="semanticName === 'Account' ? 'demo-account' : 'demo-password'" tabindex="0">
            <h3>{{ selected }}</h3>
            <p>{{ selected === 'Password' ? 'Change your password here.' : 'Make changes to your account here.' }}</p>
            <label>{{ selected === 'Password' ? 'New password' : 'Your name' }}<input :key="selected" :type="selected === 'Password' ? 'password' : 'text'" :value="selected === 'Password' ? 'littleclaws' : 'Alex'" /></label>
          </div>
        </div>
      </section>
      <AccessibilityTreePreview :selected="selected" :semantic-name="semanticName" />
    </div>
    <div class="test-explanation"><span>Vitest Browser Mode</span><p>Mit der Tastatur wechseln → Fokus, Auswahl und Panel-Namen prüfen.</p><small>Der Test braucht diese Assertions. Browser Mode erkennt den Fehler nicht automatisch.</small></div>
  </div>
</template>

<style scoped>
.demo-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin: 12px 0 18px; }
.demo-toolbar p { margin: 0; font-size: 16px; } .demo-toolbar b { color: var(--brand-text); font-weight: 600; }
button { cursor: pointer; font: inherit; }
.defect-switch { display: inline-flex; align-items: center; gap: 10px; flex-shrink: 0; padding: 7px 0; border: 0; border-radius: 6px; background: transparent; font-size: 13px; }
.switch-track { display: flex; align-items: center; width: 38px; height: 22px; padding: 3px; box-sizing: border-box; border: 1px solid #9ca3af; border-radius: 999px; background: #454957; }
.switch-thumb { width: 14px; height: 14px; border-radius: 50%; background: #fff; }
.defect-switch[aria-checked=true] .switch-track { border-color: var(--brand-accent); background: var(--brand-accent); }
.defect-switch[aria-checked=true] .switch-thumb { transform: translateX(16px); background: #222735; }
.comparison { display: grid; grid-template-columns: 1.12fr 1fr; gap: 30px; text-align: left; }
.shop { line-height: 1.25; overflow: hidden; border-radius: 10px; color: #2c2925; background: #f4eee3; }
.shop header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid #d8cdbd; background: #fffaf1; font-family: Georgia, serif; font-size: 20px; }
.shop-nav { font: 10px ui-sans-serif, sans-serif; color: #655f57; }
.shop-body { padding: 10px 22px; }.customer { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }.customer img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }.customer small { font-size: 8px; letter-spacing: .14em; color: #78563b; }.shop h2 { font-family: Georgia, serif; color: #2c2925; font-size: 25px; margin: 3px 0 0; line-height: 1.1; }
[role=tablist] { display: flex; gap: 18px; border-bottom: 1px solid #b5a999; }
[role=tab] { padding: 7px 4px; border-bottom: 3px solid transparent; font-size: 14px; color: #716a61; }
[role=tab].active { border-color: #805533; color: #2c2925; font-weight: 700; }
button:focus-visible, [role=tabpanel]:focus-visible, input:focus-visible { outline: 3px solid #bd46b5; outline-offset: 3px; }
[role=tabpanel] { padding-top: 12px; }.shop h3 { line-height: 1.2; margin: 0; font-size: 17px; color: #2c2925; }.shop p { line-height: 1.3; margin: 4px 0 10px; color: #655f57; font-size: 11px; }.shop label { display: grid; gap: 4px; font-size: 10px; }.shop input { width: 100%; box-sizing: border-box; padding: 7px 9px; background: #fffaf1; border: 1px solid #b5a999; border-radius: 4px; color: #2c2925; font-size: 12px; }
.test-explanation { line-height: 1.3; margin-top: 14px; padding-left: 14px; border-left: 3px solid var(--brand-accent); }.test-explanation span { color: var(--brand-accent); font-size: 13px; font-weight: 650; }.test-explanation p { margin: 3px 0; font-size: 15px; line-height: 1.3; }.test-explanation small { display: block; font-size: 10px; line-height: 1.3; opacity: .7; }
</style>
