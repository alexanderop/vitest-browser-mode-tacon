<script setup lang="ts">
defineProps<{
  step: number
  title: string
  subtitle: string
  image: string
  alt: string
}>()
</script>

<template>
  <section class="migration-scene">
    <img class="migration-scene__image" :src="image" :alt="alt" />
    <header class="migration-scene__heading">
      <div class="migration-scene__eyebrow">KI-Migration · Reka UI <span>{{ step }} / 3</span></div>
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </header>
  </section>
</template>

<style scoped>
.migration-scene {
  position: absolute;
  inset: 0;
  background: #08132e;
  color: #fff;
}
.migration-scene__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.migration-scene__heading {
  position: relative;
  padding: 22px 38px 38px;
  background: linear-gradient(#08132ef5 0%, #08132ee8 65%, #08132e00 100%);
}
.migration-scene__eyebrow {
  display: flex;
  justify-content: space-between;
  color: #88d9ff;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.migration-scene__heading h1 {
  margin: 8px 0 6px;
  color: #fff;
  font-size: 36px;
  font-weight: 750;
  line-height: 1.12;
}
.migration-scene__heading p {
  margin: 0;
  opacity: 1;
  color: #e4edff;
  font-size: 19px;
  line-height: 1.35;
}
</style>
