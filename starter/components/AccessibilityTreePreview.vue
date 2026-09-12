<script setup lang="ts">
import { computed, ref } from 'vue'

type TabName = 'Account' | 'Password'
const props = defineProps<{ selected: TabName; semanticName: TabName }>()
const inspected = ref<'Account' | 'Password' | 'panel'>('panel')
const expanded = ref(true)
const mismatch = computed(() => props.selected !== props.semanticName)
const nodeName = computed(() => inspected.value === 'panel' ? props.semanticName : inspected.value)
</script>

<template>
  <section class="ax-preview" aria-label="Accessibility Tree des Tab-Beispiels">
    <div class="devtools">
      <div class="toolbar"><span>Elements</span><strong>Accessibility</strong><span class="more" aria-hidden="true">⋮</span></div>
      <div class="section-title">Accessibility tree <span>Demo · Ausschnitt</span></div>
      <div class="nodes" aria-label="Knoten im Accessibility Tree">
        <button class="node" :aria-expanded="expanded" @click="expanded = !expanded"><span class="arrow">{{ expanded ? '▾' : '▸' }}</span><span class="role">tablist</span> <span class="name">"Manage your account"</span></button>
        <template v-if="expanded">
          <button v-for="tab in (['Account', 'Password'] as const)" :key="tab" class="node child" :class="{ inspected: inspected === tab }" :aria-pressed="inspected === tab" @click="inspected = tab"><span class="arrow">·</span><span class="role">tab</span> <span class="name">"{{ tab }}"</span><span v-if="semanticName === tab" class="state">selected</span></button>
        </template>
        <button class="node" :class="{ inspected: inspected === 'panel' }" :aria-pressed="inspected === 'panel'" @click="inspected = 'panel'"><span class="arrow">▾</span><span class="role">tabpanel</span> <span class="name">"{{ semanticName }}"</span></button>
        <div class="node child"><span class="arrow">·</span><span class="role">heading</span> <span class="name">"{{ selected }}"</span></div>
        <div class="node child text-node"><span class="arrow">·</span><span class="role">StaticText</span> <span class="name">"{{ selected === 'Password' ? 'Change your password here.' : 'Make changes to your account here.' }}"</span></div>
      </div>
      <div class="section-title properties-title">▾ Computed Properties</div>
      <dl class="properties">
        <div><dt>Name</dt><dd>"{{ nodeName }}"</dd></div>
        <div><dt>Role</dt><dd>{{ inspected === 'panel' ? 'tabpanel' : 'tab' }}</dd></div>
        <div><dt>{{ inspected === 'panel' ? 'Focusable' : 'Selected' }}</dt><dd class="boolean">{{ inspected === 'panel' || semanticName === inspected }}</dd></div>
      </dl>
    </div>
    <p class="result" :class="{ mismatch }" role="status">{{ mismatch ? '× Password sichtbar. Account gemeldet.' : '✓ Auswahl und Inhalt passen zusammen.' }}</p>
  </section>
</template>

<style scoped>
.ax-preview { min-width: 0; text-align: left; }
.devtools { overflow: hidden; border: 1px solid #51545c; border-radius: 8px; background: #202124; color: #e8eaed; font: 12px/1.35 ui-monospace, SFMono-Regular, Consolas, monospace; }
.toolbar { display: flex; align-items: center; gap: 20px; height: 25px; padding: 0 12px; border-bottom: 1px solid #51545c; background: #292a2d; font: 12px/1.5 system-ui, sans-serif; color: #bdc1c6; }
.toolbar strong { display: flex; align-items: center; height: 100%; border-bottom: 2px solid #8ab4f8; color: #8ab4f8; font-weight: 500; }
.more { margin-left: auto; font-size: 20px; }
.section-title { display: flex; justify-content: space-between; padding: 4px 11px; font: 600 12px/1.4 system-ui, sans-serif; }
.section-title span { color: #bdc1c6; font-size: 10px; font-weight: 400; }
.nodes { padding: 2px 0 5px; }
.node { display: flex; align-items: baseline; gap: 6px; width: 100%; min-height: 19px; padding: 0 10px; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; }
button.node { cursor: pointer; }
button.node:hover { background: #30343b; }
button.node:focus-visible { outline: 2px solid #8ab4f8; outline-offset: -2px; }
.node.inspected { background: #394b68; }
.child { padding-left: 27px; }
.arrow { flex: 0 0 9px; color: #bdc1c6; }
.role { flex-shrink: 0; color: #a8c7fa; }
.name { color: #f6aea9; overflow-wrap: anywhere; }
.state { margin-left: auto; color: #a8dab5; font-size: 10px; }
.text-node { font-size: 10px; }
.properties-title { border-top: 1px solid #51545c; border-bottom: 1px solid #3c4043; }
.properties { margin: 0 !important; padding: 5px 12px 7px; }
.properties div { display: grid; grid-template-columns: 85px 1fr; padding: 1px 0; }
.properties dt { line-height: 1.4; color: #bdc1c6; }
.properties dd { margin: 0; line-height: 1.4; color: #f6aea9; }
.properties dd.boolean { color: #9980ff; }
.result { margin: 9px 0 0; color: #a6e3a1; font-size: 13px; font-weight: 600; line-height: 1.4; }
.result.mismatch { color: #f38ba8; }
</style>
