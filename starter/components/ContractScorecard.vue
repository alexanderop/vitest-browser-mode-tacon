<script setup lang="ts">
type Contract = 'behavior' | 'accessibility' | 'visual'

const { achieved = [] } = defineProps<{
  achieved?: Contract[]
}>()

const contracts: ReadonlyArray<{
  id: Contract
  title: string
  question: string
}> = [
  { id: 'behavior', title: 'Verhalten', question: 'Kann der Nutzer handeln?' },
  { id: 'accessibility', title: 'Accessibility', question: 'Stimmen Bedeutung und Bedienung?' },
  { id: 'visual', title: 'Darstellung', question: 'Sieht die Komponente richtig aus?' },
]
</script>

<template>
  <div class="scorecard" role="list" aria-label="Verträge einer Komponente">
    <div
      v-for="contract in contracts"
      :key="contract.id"
      class="contract"
      :class="{ 'contract--achieved': achieved.includes(contract.id) }"
      role="listitem"
    >
      <div class="contract__status" aria-hidden="true">
        {{ achieved.includes(contract.id) ? '✓' : '○' }}
      </div>
      <div class="contract__title">{{ contract.title }}</div>
      <div class="contract__question">{{ contract.question }}</div>
    </div>
  </div>
</template>

<style scoped>
.scorecard {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 4rem;
}

.contract {
  text-align: center;
  color: color-mix(in srgb, var(--brand-text), transparent 30%);
  transition: color 240ms ease, transform 240ms ease;
}

.contract--achieved {
  color: var(--brand-text);
  transform: translateY(-0.25rem);
}

.contract__status {
  min-height: 4rem;
  color: color-mix(in srgb, var(--brand-text), transparent 72%);
  font-family: 'Geist Mono', monospace;
  font-size: 3.5rem;
  line-height: 1;
}

.contract--achieved .contract__status {
  color: var(--brand-accent);
  text-shadow: 0 0 1.4rem color-mix(in srgb, var(--brand-accent), transparent 55%);
}

.contract__title {
  margin-top: 1rem;
  font-size: 1.9rem;
  font-weight: 700;
}

.contract__question {
  margin-top: 1.25rem;
  font-size: 1.15rem;
  line-height: 1.45;
}
</style>
