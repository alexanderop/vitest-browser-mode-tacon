<script setup lang="ts">
const stages = [
  { label: 'JSDOM', status: 'grün', detail: 'Das ausgelöste Event\nerreicht den Handler.', failed: false },
  { label: 'Browser', status: 'rot', detail: 'Die Dekoration fängt\nden Klick ab.', failed: true },
  { label: 'Repariert', status: 'grün', detail: 'Der Button ist\nwieder erreichbar.', failed: false },
] as const
</script>

<template>
  <div class="failure-flow">
    <ol class="stages" aria-label="Testergebnis vor und nach der Reparatur">
      <li v-for="stage in stages" :key="stage.label" class="stage" :class="{ 'stage--failed': stage.failed }">
        <div class="stage__signal" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path v-if="stage.failed" d="m16 16 16 16m0-16L16 32" />
            <path v-else d="m13 24 8 8 15-16" />
          </svg>
        </div>
        <h2>{{ stage.label }}</h2>
        <div class="stage__result">{{ stage.status }}</div>
        <p>{{ stage.detail }}</p>
      </li>
    </ol>
    <div class="expectation">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l3 12h11l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
      <div><span>Die Erwartung bleibt gleich</span><b>Ein Plüschtier im Warenkorb.</b></div>
    </div>
  </div>
</template>

<style scoped>
.failure-flow { margin-top: 38px; }
.stages { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; padding: 0; margin: 0; list-style: none; }
.stage { --signal: #a6e3a1; position: relative; text-align: center; margin: 0; padding: 0; }
.stage--failed { --signal: #f38ba8; }
.stages::before, .stages::after { content: '→'; position: absolute; top: 14px; color: #9399b2; font-size: 28px; transform: translateX(-50%); }
.stages::before { left: calc((100% - 36px) / 3); }
.stages::after { left: calc((200% + 36px) / 3); }
.stage__signal { width: 64px; height: 64px; margin: 0 auto 17px; border: 1px solid color-mix(in srgb, var(--signal), transparent 60%); border-radius: 50%; color: var(--signal); background: color-mix(in srgb, var(--signal), transparent 92%); }
.stage__signal svg { width: 100%; height: 100%; }
.stage h2 { margin: 0; font-size: 27px; line-height: 1.2; font-weight: 650; }
.stage__result { margin-top: 5px; color: var(--signal); font-size: 21px; font-weight: 600; }
.stage p { margin: 18px 0 0; font-size: 19px; line-height: 1.45; white-space: pre-line; color: var(--brand-text); opacity: .85; }
.expectation { display: flex; align-items: center; justify-content: center; gap: 19px; margin-top: 33px; padding-top: 23px; border-top: 1px solid color-mix(in srgb, var(--brand-text), transparent 82%); }
.expectation svg { width: 34px; height: 34px; color: var(--brand-accent); }
.expectation span { display: block; font-size: 15px; opacity: .65; margin-bottom: 3px; }
.expectation b { display: block; color: var(--brand-text); font-size: 23px; font-weight: 600; }
</style>
