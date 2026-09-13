<template>
  <section class="black-box-behavior">
    <h1>Black Box</h1>
    <p class="subtitle">Die Komponente von außen testen</p>
    <div class="labels" aria-hidden="true">
      <span>Handlung</span><span>Komponente</span><span>Beobachtbares Ergebnis</span>
    </div>
    <img
      src="/memes/black-box-behavior.png"
      alt="Ein Klick auf den Button führt durch eine geschlossene Black Box zum Plüschtier im Warenkorb. Die interne Implementierung bleibt verborgen."
    />
    <div class="captions">
      <p>Klick auf<br />„In den Warenkorb“</p>
      <p class="muted">Implementierung<br />bleibt verborgen</p>
      <p>Das Plüschtier erscheint<br />im Warenkorb</p>
    </div>
    <p class="takeaway">Die Implementierung darf sich ändern.<br />Das erwartete Verhalten bleibt.</p>
  </section>
</template>

<style scoped>
.black-box-behavior { padding-top: 12px; }
.subtitle { margin: 8px 0 24px; font-size: 25px; }
.labels, .captions { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; gap: 12px; width: 640px; margin-inline: auto; }
.labels { color: var(--brand-accent); font-size: 17px; white-space: nowrap; }
img { display: block; width: 100%; height: 178px; object-fit: contain; margin: 5px 0; }
.captions p { margin: 0; font-size: 18px; line-height: 1.35; }
.muted { color: #abb0be; }
.takeaway { margin: 26px 0 0; color: var(--brand-accent); font-size: 25px; line-height: 1.35; }
</style>
