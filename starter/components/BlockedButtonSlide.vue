<template>
  <div class="blocked-button-slide">
    <section class="copy">
      <h1>Sichtbar, aber nicht klickbar</h1>
      <p class="lead">Eine dekorative Ebene liegt über dem Button.</p>
      <p>Der Kunde klickt.</p>
      <p>Nichts passiert.</p>
    </section>
    <TestingLabExample example="blocked-button" />
  </div>
</template>

<style scoped>
.blocked-button-slide {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  align-items: center;
  gap: 2.5rem;
  height: 100%;
}

.copy h1 {
  margin: 0 0 1.1rem;
  font-size: 3.35rem;
  line-height: 1.08;
}

.copy p {
  margin: 1.8rem 0 0;
  font-size: 1.45rem;
}

.copy .lead {
  margin-top: 0;
  color: color-mix(in srgb, var(--brand-text), transparent 48%);
  line-height: 1.35;
}
</style>
