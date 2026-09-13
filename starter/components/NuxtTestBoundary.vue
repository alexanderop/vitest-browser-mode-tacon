<script setup lang="ts">
defineProps<{ step: 'mount' | 'request' | 'boundaries' | 'mismatch' | 'spa' }>()
</script>

<template>
  <div class="nuxt-boundary" :class="`is-${step}`">
    <template v-if="step === 'mismatch'">
      <div class="mismatch-label">Eingebauter Defekt: unterschiedliche Startkategorie</div>
      <div class="mismatch-comparison">
        <section>
          <h2>Server liefert</h2>
          <strong class="category">Wearables</strong>
          <p>Nur Kleidung</p>
        </section>
        <span class="unequal" aria-label="ungleich">≠</span>
        <section>
          <h2>Client erwartet</h2>
          <strong class="category">All the good stuff</strong>
          <p>Der ganze Katalog</p>
        </section>
      </div>
      <div v-click="1" class="results">
        <div><span>Direkter Mount</span><strong class="pass">✓ Kaufablauf grün</strong></div>
        <div><span>Test der laufenden App</span><strong class="fail">× Hydration-Prüfung rot</strong></div>
      </div>
      <p v-click="1" class="takeaway">Erwartung: keine Hydration-Mismatches.</p>
      <p class="evidence">Erklärmodell des vorbereiteten Shop-Defekts · kein Live-Testlauf</p>
    </template>

    <template v-else-if="step === 'spa'">
      <div class="spa-root"><code>await render(App)</code><span>mit Router und Services</span></div>
      <div class="spa-flow" aria-label="Ein App-Mount integriert Seiten, Warenkorb und Checkout">
        <span>Seiten</span><b aria-hidden="true">→</b><span>Warenkorb</span><b aria-hidden="true">→</b><span>Checkout</span>
      </div>
      <p class="spa-caption">Ein Mount kann den fachlichen UI-Ablauf integrieren.</p>
      <div class="additional"><strong>Zusätzlich nach Risiko prüfen</strong><p>Echter Reload · Persistenz · Offline-Start · ausgelieferter Build</p></div>
      <p class="evidence">Playwright als Vitest-Provider ≠ separater Playwright-E2E-Runner</p>
    </template>

    <template v-else>
      <div class="scene" :class="{ 'client-only': step === 'mount' }">
        <img src="/memes/hamcrab-nuxt-server-browser.png" alt="Illustration: Ein Server liefert eine Shop-Seite an den Browser. Hamcrab kauft dort ein Plüschtier." />
        <div v-if="step === 'mount'" class="mount-entry"><code>await render(Shop)</code><span>↓</span></div>
        <div v-else class="scene-labels"><span>Nuxt-Server</span><span>Shop-HTML</span><span>Browser</span></div>
      </div>

      <template v-if="step === 'mount'">
        <div class="purchase-flow"><span>Produkt</span><b aria-hidden="true">→</b><span>Warenkorb</span><b aria-hidden="true">→</b><span>Checkout</span></div>
        <p class="takeaway">Echte Komponenten. Gemeinsamer Client-Zustand.</p>
        <p class="evidence">Der Test baut den Shop direkt im Browser auf.</p>
      </template>

      <template v-else-if="step === 'request'">
        <div class="request-flow" aria-label="URL öffnen, Server liefert HTML, Vue übernimmt, Einkauf">
          <span>URL öffnen</span><b aria-hidden="true">→</b>
          <span v-click="1">Server liefert HTML<small>SSR: Shop schon sichtbar</small></span><b v-click="2" aria-hidden="true">→</b>
          <span v-click="2">Vue übernimmt<small>Hydration</small></span><b v-click="3" aria-hidden="true">→</b>
          <span v-click="3">Einkauf</span>
        </div>
        <p v-click="2" class="takeaway">Hydration: Vue verbindet das vorhandene HTML mit Zustand und Event-Handlern.</p>
        <p v-click="3" class="evidence">Unser direkter Test beginnt bei <code>render(Shop)</code> – ohne Server-HTML und Hydration.</p>
      </template>

      <template v-else>
        <div class="test-path app-path"><span>App-Test</span><div>URL → Server-HTML → Hydration → Einkauf</div></div>
        <div class="test-path mount-path"><span>Browser Mode</span><div><code>render(Shop)</code> → Einkauf</div></div>
        <p class="takeaway">Beide im echten Browser. Unterschiedlicher Einstieg.</p>
      </template>
    </template>
  </div>
</template>

<style scoped>
.nuxt-boundary { margin-top: 18px; color: var(--brand-text, #e4e7ef); --mint: #a6e3a1; --blue: #89b4fa; --pink: #f38ba8; }
.scene { height: 230px; position: relative; overflow: hidden; border-radius: 8px; background: #07132f; }
.scene img { position: absolute; width: 100%; height: 100%; inset: 0; object-fit: cover; object-position: center 48%; }
.scene-labels { position: absolute; inset: auto 0 10px; display: grid; grid-template-columns: 30% 30% 40%; text-align: center; font-size: 18px; font-weight: 650; text-shadow: 0 2px 6px #000; }
.client-only img { object-position: center 48%; }
.client-only::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, #1f2330 0%, #1f2330 39%, #1f233000 70%); }
.mount-entry { position: absolute; z-index: 1; left: 20px; top: 61px; display: grid; gap: 9px; font-size: 27px; }
.mount-entry span { color: var(--mint); font-size: 35px; text-align: center; }
.nuxt-boundary code { color: inherit; background: transparent; padding: 0; }
.purchase-flow, .spa-flow { display: flex; align-items: center; justify-content: center; gap: 32px; font-size: 27px; margin-top: 24px; }
.purchase-flow b, .spa-flow b { color: var(--mint); font-weight: 400; }
.nuxt-boundary .takeaway { margin: 21px 0 0; font-size: 23px; line-height: 1.35; text-align: center; }
.nuxt-boundary .evidence { margin: 13px 0 0; font-size: 15px; line-height: 1.4; opacity: .7; text-align: center; }
.request-flow { display: flex; align-items: flex-start; justify-content: space-between; margin-top: 25px; font-size: 20px; font-weight: 600; }
.request-flow b { color: var(--blue); font-weight: 400; }
.request-flow small { display: block; margin-top: 5px; color: var(--blue); font-size: 17px; font-weight: 400; text-align: center; }
.is-request .takeaway { font-size: 21px; }
.test-path { display: grid; grid-template-columns: 155px 1fr; align-items: center; gap: 16px; margin-top: 15px; font-size: 18px; }
.test-path > span { font-weight: 600; }
.test-path > div { padding: 5px 0 9px; text-align: right; border-bottom: 3px solid currentColor; font-size: 21px; }
.app-path { color: var(--blue); }.mount-path { color: var(--mint); }.mount-path > div { margin-left: 190px; }
.is-boundaries .scene { height: 201px; }.is-boundaries .takeaway { font-size: 22px; margin-top: 20px; }
.mismatch-label { font-size: 20px; opacity: .8; margin-top: 30px; }
.mismatch-comparison { display: grid; grid-template-columns: 1fr 70px 1fr; align-items: center; text-align: center; margin-top: 30px; padding-bottom: 26px; border-bottom: 1px solid #555968; }
.mismatch-comparison h2 { font-size: 21px; margin: 0 0 17px; font-weight: 400; color: var(--blue); }
.category { font-size: 28px; }.mismatch-comparison p { font-size: 20px; margin: 10px 0 0; opacity: .8; }
.unequal { color: var(--pink); font-size: 54px; }.results { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 25px; text-align: center; }
.results > div { display: grid; gap: 9px; font-size: 18px; }.results strong { font-size: 24px; }.pass { color: var(--mint); }.fail { color: var(--pink); }
.is-mismatch .takeaway { margin-top: 22px; }.is-mismatch .evidence { margin-top: 16px; }
.spa-root { display: grid; justify-items: center; gap: 10px; margin-top: 35px; font-size: 32px; }.spa-root span { font-size: 19px; opacity: .8; }
.spa-flow { margin: 27px 35px 0; padding: 25px 0; border-top: 3px solid var(--mint); border-bottom: 3px solid var(--mint); }
.spa-caption { text-align: center; font-size: 22px; margin: 18px 0 0; }
.additional { margin-top: 30px; text-align: center; }.additional strong { font-size: 19px; color: var(--blue); }.additional p { font-size: 19px; margin: 9px 0 0; }
.is-spa .evidence { margin-top: 23px; }
</style>
