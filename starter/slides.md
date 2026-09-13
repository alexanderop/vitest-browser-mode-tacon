---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: 'Frontend-Testing neu gedacht'
layout: default
class: p-0
background: false
transition: slide-left
mdc: true
lineNumbers: false
duration: 45min
twoslash: false
hideFooter: true
---
<h1 class="sr-only">TACON Leipzig 2026</h1>
<img
  src="/memes/tacon-leipzig-2026-cover.png"
  alt="TACON Leipzig 2026 im Retro-Poster-Stil mit violettem Hintergrund und Leipziger Stadtsilhouette."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: cover
background: false
hideFooter: true
---
<div class="max-w-3xl">

# Frontend-Testing<br>neu gedacht

## Black-Box-Strategie mit Vitest Browser Mode

<div class="mt-6 text-2xl">KI schreibt Tests. Wir definieren, was grün bedeutet.</div>

<div class="mt-12 text-xl opacity-70">
Alexander Opalic<br>
Developer bei Otto Payments
</div>

</div>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Die klassische Testpyramide</h1>
<img
  src="/memes/hamcrab-testing-pyramid.png"
  alt="Testpyramide mit Unit-Tests als breiter Basis, Integrationstests in der Mitte und End-to-End-Tests an der Spitze. Beispiele: eine Preisberechnung, Produkt und Warenkorb, eine vollständige Bestellung. Die Verteilung ist eine Faustregel, keine feste Quote."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Ein Frontend besteht aus Komponenten</h1>
<img
  src="/memes/frontend-components-building-blocks.png"
  alt="Ein Onlineshop aus steckbaren Bausteinen: Header, SearchBar, wiederverwendete ProductCards mit Kaufen-Buttons sowie Cart und CartBadge. Kleine Komponenten bilden zusammen eine Anwendung."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Komponenten isoliert testen</h1>
<img
  src="/memes/frontend-components-isolated-blocks.png"
  alt="Der Kaufen-Button wird als einzelner Baustein aus dem bekannten Shop herausgelöst. mount(Button) rendert nur den Button. Ein Klick löst das geprüfte click-Event aus. Ein Baustein und sein Verhalten im Test."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Komponenten integriert testen</h1>
<img
  src="/memes/frontend-components-integrated-blocks.png"
  alt="mount(Shop) rendert den bekannten Baustein-Shop mit echten Kindkomponenten. Ein Klick auf Kaufen in der ProductCard fügt einen Artikel zum Cart hinzu und erhöht den CartBadge von null auf eins. Ein Mount prüft das Zusammenspiel mehrerer echter Komponenten."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<img
  src="/memes/hamcrab-jsdom-isolated-components-2021.png"
  alt="Isolierte Komponententests um 2021: Eine Komponente mit API-Mock, Router-Mock und Child-Stub in jsdom unter Node.js. jsdom bildet DOM und Events nach, berechnet aber kein Layout und rendert keine Darstellung."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Ich möchte dieses Plüschtier kaufen</h1>
<img
  src="/shop/plush-purchase-intro.png"
  alt="Illustration zur Claw & Chew Nuxt-E-Commerce-Demo: Ein großes Hamster-Plüschtier im roten Krabbenkostüm neben einer Produktkarte mit Add-to-bag-Button. Die Kaufabsicht: ein Klick auf Add to bag."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="blocked-button" title="Klicken. Nichts passiert." />

---
layout: default
class: talk-code
---
# Eine Zeile CSS

<div class="mb-5 text-xl opacity-70">Git-Diff · app/catalog/ProductCard.vue</div>

```diff
 .product-decoration {
   position: absolute;
   inset: 0;
   z-index: 2;
-  pointer-events: none;
+  pointer-events: auto;
 }
```

<div v-click class="mt-8 text-2xl">Die unsichtbare Dekoration liegt über dem Button.<br>Jetzt fängt sie den Klick ab.</div>

---
layout: default
zoom: 0.9
---
# Der echte JSDOM-Test

````md magic-move {duration:350}
```ts {*|7-8|10-12|13|15|*}
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import ProductCardHost from '../../tests/fixtures/ProductCardHost.vue'

test('adds a plush to the bag through the product button', async () => {
  const user = userEvent.setup()
  render(ProductCardHost)

  const add = screen.getByRole('button', {
    name: 'Add The little claw plush to bag',
  })
  await user.click(add)

  expect(screen.getByLabelText('Bag count')).toHaveTextContent('1 items in bag')
})
```
````

---
layout: default
---
# Der Bug ist da. Der Test bleibt grün.

<TerminalRecording />

<div class="mt-5 text-xl">JSDOM · echter aufgezeichneter Testlauf · CSS-Bug aktiv</div>

---
layout: default
class: p-0
hideFooter: true
---
<img
  src="/memes/oncall-02-am.png"
  alt="Fiktive Oncall-Szene: Ein übermüdeter Entwickler wird nachts vom Smartphone geweckt. Neben dem Bett stehen Laptop und Hamcrab-Plüschtier."
  class="absolute inset-0 h-full w-full object-cover"
/>
<div class="absolute left-12 top-18 w-90 text-white">
  <div class="text-xl tracking-widest opacity-80">ONCALL</div>
  <h1 style="font-size: 60px; line-height: 1.1; margin-top: 16px; color: white; white-space: nowrap">02:00 Uhr</h1>
  <p style="margin-top: 32px; font-size: 26px; line-height: 1.4; color: white; opacity: 1">„Niemand kann das<br>Plüschtier kaufen.“</p>
</div>
<div class="absolute bottom-8 left-12 text-sm text-white opacity-70">Fiktiver Incident im Demo-Shop</div>

---
layout: statement
---
# Was soll dieser grüne Test beweisen?

<div class="mt-10 text-2xl">Ich kann das Plüschtier in den Warenkorb legen.</div>
<div v-click class="mt-6 text-xl">Warum klappt genau das im Shop nicht?</div>

---
layout: default
---
<BlockedButtonSlide />

---
layout: statement
---
# Würdet ihr euren Node.js-Backend-Server in Chrome laufen lassen?

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Vitest Browser Mode to the rescue</h1>
<img
  src="/memes/browser-mode-gandalf-rescue.png"
  alt="Gandalf als Vitest Browser Mode stellt sich auf der Brücke dem Bug entgegen, den jsdom durchlässt: YOU SHALL NOT PASS!"
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Hi, ich bin Alex. alexop.dev</h1>
<img
  src="/memes/alexop-introduction.png"
  alt="Alex mit Brille, Kappe und gemustertem Hemd vor einem Konferenzhintergrund. Hi, ich bin Alex. alexop.dev."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Was ist Vitest Browser Mode?</h1>
<img
  src="/diagrams/browser-mode-definition.png"
  alt="Ein echter Browser enthält Testcode und Komponente. Beide verwenden das echte DOM, CSS und Layout."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Ein Browser Mode. Drei Provider.</h1>
<img
  src="/diagrams/browser-mode-providers.png"
  alt="Vitest Browser Mode verzweigt zu Preview und zu Playwright oder WebdriverIO. Preview rendert im echten Browser, simuliert Events und unterstützt weder CI noch Headless. Playwright und WebdriverIO steuern den Browser automatisiert, lokal und in CI."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
clicks: 2
---
# Vom Vue-Projekt zum Browser-Test

<div class="mb-6 text-xl opacity-70">1 / 3 · Ein frisches Vite-Projekt mit Vue und TypeScript</div>

<TerminalWindow title="Terminal · vue-browser-demo" stepped :lines="[
  { cmd: 'pnpm create vite vue-browser-demo --template vue-ts' },
  { cmd: 'cd vue-browser-demo' },
  { cmd: 'pnpm install' },
]" />

<div v-click="2" class="mt-6">

```sh
pnpm add -D vitest @vitest/browser-playwright vitest-browser-vue playwright
pnpm exec playwright install chromium
```

<div class="mt-3 text-lg opacity-70">Test-Runner · Provider · Vue-Renderer · Browser installieren</div>

</div>

---
layout: code-editor
project: vue-browser-demo
activeFile: vite.config.ts
tabs: vite.config.ts, vitest.config.ts@1
clicks: 4
files: |
  src/
    components/
      HelloWorld.vue
      HelloWorld.browser.test.ts
    App.vue
    main.ts
  package.json
  vite.config.ts
  vitest.config.ts
hideFooter: true
---

<div class="mb-4 text-xl font-bold">Die Vue-Konfiguration bleibt die Grundlage</div>

````md magic-move {duration:400}
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
```
```ts {1-2,4}
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(viteConfig, defineConfig({
  test: {},
}))
```
```ts {6-8}
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    include: ['src/**/*.browser.test.ts'],
    browser: {
      enabled: true,
    },
  },
}))
```
```ts {2,10-11|*}
import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config.ts'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    include: ['src/**/*.browser.test.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
}))
```
````

<div class="mt-5 text-lg opacity-70">Vite übernehmen → Browser aktivieren → Playwright + Chromium</div>

---
layout: code-editor
project: vue-browser-demo
activeFile: HelloWorld.vue
tabs: HelloWorld.vue, HelloWorld.browser.test.ts@1
clicks: 5
files: |
  src/
    components/
      HelloWorld.vue
      HelloWorld.browser.test.ts
    App.vue
    main.ts
  package.json
  vite.config.ts
  vitest.config.ts
hideFooter: true
---

<div class="mb-4 text-xl font-bold">{{ $clicks === 0 ? 'Der Zähler aus dem Vite-Starter' : 'Der Browser-Test für den Zähler' }}</div>

````md magic-move {duration:400}
```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">
    Count is {{ count }}
  </button>
</template>
```
```ts {*|6|7-9|*}
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import HelloWorld from './HelloWorld.vue'

test('zählt beim Klick hoch', async () => {
  const screen = await render(HelloWorld)
  const counter = screen.getByRole('button', { name: /count is/i })
  await counter.click()
  await expect.element(counter).toHaveTextContent('Count is 1')
})
```
````

<div v-click="5" class="mt-5">

```sh
pnpm exec vitest
```

<div class="mt-3 text-sm opacity-70">Im Projektordner starten · einmalig headless:<br><code>pnpm exec vitest run --browser.headless</code></div>

</div>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Wo läuft was?</h1>
<img
  src="/diagrams/browser-mode-architecture.png"
  alt="Node.js führt Vitest, Vite und den Playwright-Provider aus. Im Browser verwaltet ein Orchestrator die Test-Iframes mit Testcode und Komponenten. Vite liefert Module und CSS; Playwright steuert den Browser; Ergebnisse gehen per RPC zurück. Bei aktivierter Isolation gibt es ein Iframe pro Testdatei."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="absolute left-6 top-5 !m-0 !text-3xl">Claw & Chew im Browser Mode</h1>
<div class="absolute left-6 right-6 top-17 grid grid-cols-[33%_22%_45%] text-lg">
  <span class="text-violet-300">Test auswählen</span>
  <span class="text-emerald-300">Komponente sehen</span>
  <span class="text-lime-300">Ergebnis prüfen</span>
</div>
<img
  src="/shop/vitest-browser-ui.png"
  alt="Echter Vitest-5-Screenshot aus Claw & Chew: links der bestandene ProductCard-Test, in der Browser UI die gerenderte Hamcrab-Produktkarte mit 1 items in bag, rechts All tests passed in this file."
  class="absolute left-6 right-6 top-26 w-[calc(100%-3rem)] rounded-lg"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="absolute left-6 top-5 !m-0 !text-3xl">Und mit jsdom + Testing Library?</h1>
<div class="absolute left-6 right-6 top-22 grid grid-cols-[1fr_1fr] gap-8">
<div>
<div class="mb-3 text-xl text-violet-300">DOM im Terminal</div>

```ts
import { screen } from '@testing-library/vue'

screen.debug()
```

<div class="mb-2 mt-5 text-sm opacity-60">Gekürzte Beispielausgabe</div>

```html
<body>
  <article class="product-card">
    <img src="/hamcrab.png" alt="Hamcrab" />
    <h2>The little claw plush</h2>
    <p>€28.00</p>
    <button>Add to bag</button>
  </article>
  <p>1 items in bag</p>
</body>
```

</div>
<div>
<div class="mb-3 text-xl text-violet-300">DOM ins Testing Playground</div>

```ts
screen.logTestingPlaygroundURL()
```

<p class="!mt-5 !text-xl">Link öffnen → Markup untersuchen<br>und passende Queries finden.</p>
<p class="!mt-5 !text-lg opacity-75">Übertragen wird HTML — die laufende Vue-Komponente und ihr App-CSS kommen nicht mit.</p>
<div class="mt-7 border-l-3 border-emerald-300 pl-4">
<div class="text-xl text-emerald-300">Im Browser Mode sehe ich die UI</div>
<p class="!mb-0 !mt-2 !text-lg">Mit geladenem CSS, echtem Layout<br>und Browser-DevTools.</p>
</div>
</div>
</div>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Der Klick macht einen Rundweg</h1>
<img
  src="/diagrams/browser-mode-click.png"
  alt="Mit dem Playwright-Provider sendet button.click den Befehl __vitest_click per WebSocket-RPC an Node.js. Der Provider ruft locator.click auf. Playwright prüft, ob der Button Pointer-Events empfangen kann, und wartet bei einem blockierenden Overlay. Bleibt es bestehen, schlägt die Aktion beim Timeout fehl."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
---
# Der Browser findet den Fehler

<BrowserFailureFlow />

---
layout: default
---
# Derselbe Warenkorb-Test im Browser Mode

<div class="mb-4 text-sm opacity-65">ProductCard.browser.test.ts · Claw & Chew</div>

```ts {all|1-3|6-10|12-13|all}
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import ProductCardHost from '../../tests/fixtures/ProductCardHost.vue'

test('adds a plush to the bag through the product button', async () => {
  const screen = await render(ProductCardHost)

  await screen
    .getByRole('button', { name: 'Add The little claw plush to bag' })
    .click({ timeout: 1500 })

  await expect.element(screen.getByLabelText('Bag count'))
    .toHaveTextContent('1 items in bag')
})
```

---
layout: default
---
# Der Test scheitert schon beim Klick

<div class="mb-4 text-sm opacity-65">Aufgezeichneter Chromium-Lauf · Originalauszug, Wiederholungen gekürzt</div>

```text
TimeoutError: locator.click: Timeout 1500ms exceeded.

Call log:
  - attempting click action
      - element is visible, enabled and stable
      - done scrolling
```

<div class="my-4 border-l-3 border-rose-400 pl-4 text-xl text-rose-300">
<code>class="product-decoration"</code><br>
<strong>intercepts pointer events</strong>
</div>

```ts
  .click({ timeout: 1500 })
// ^ Hier bricht der Test ab.
```

<div class="mt-4 text-xl">Die Dekoration blockiert den Klick.<br>Die Warenkorb-Assertion wird gar nicht mehr erreicht.</div>

---
layout: default
class: p-0
hideFooter: true
---
<img
  src="/memes/hamcrab-three-component-contracts-v2.png"
  alt="Drei Hamcrabs zeigen die Verträge Verhalten, Accessibility und Darstellung"
  class="absolute inset-0 h-full w-full object-contain"
/>


---
layout: default
---
<ContractChapter :number="1" title="Verhalten" question="Tut die Komponente, was sie soll?" />

---
layout: default
contractChapter: "1 / 3 · Verhalten"
---
<ContractDefinition
  title="Was meinen wir mit Verhalten?"
  definition="Wir prüfen, ob eine Handlung zum erwarteten beobachtbaren Ergebnis führt."
  example="Nach „In den Warenkorb“ erscheint das Plüschtier im Warenkorb."
/>

---
layout: default
contractChapter: "1 / 3 · Verhalten"
---
<BlackBoxBehavior />

---
layout: center
clicks: 3
contractChapter: "1 / 3 · Verhalten"
---
# Vom Klick zur ganzen Bestellung

<Steps :steps="['Produkt', 'Warenkorb', 'Checkout', 'Bestätigung']" />

---
layout: code-editor
project: claw-and-chew
activeFile: Shop.vue
tabs: Shop.vue
step: Komponente · vereinfacht
files: |
  app/
    components/
      Shop.vue
    catalog/
      ProductCard.vue
    cart/
      CartDrawer.vue
hideFooter: true
---

<div class="mb-3 text-xl font-bold">Shop.vue: die Bestellung zusammensetzen</div>

```vue
<template>
  <!-- Warenkorb öffnen -->
  <button :aria-label="`Open bag, ${totals.count} items`"
    @click="bagOpen = true">Bag</button>

  <!-- Produkt auswählen und hinzufügen -->
  <ProductCard v-for="product in products" :key="product.id"
    :product="product" @add="quickAdd" />

  <!-- Warenkorb → Checkout → Bestätigung -->
  <CartDrawer v-model:open="bagOpen" :lines="lines"
    @ordered="completeOrder" />
</template>
```

<div class="mt-3 text-lg">Der Test bedient diese Komponenten gemeinsam über <code>Shop</code>.</div>

---
layout: code-editor
project: claw-and-chew
activeFile: purchase.browser.test.ts
tabs: purchase.browser.test.ts
step: 1 / 4 · Direkter Test
clicks: 2
files: |
  talk/
    tacon/
      purchase.browser.test.ts
      shop-page.ts
hideFooter: true
---

<div class="mb-3 text-xl font-bold">Die Bestellung, Schritt für Schritt</div>

```ts {all|10-11|13-15}
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import Shop from '../../app/components/Shop.vue'

test('a customer can order a plush', async () => {
  const screen = await render(Shop)
  await screen.getByRole('button', { name: 'Add The little claw plush to bag' }).click()
  await screen.getByRole('button', { name: 'Open bag, 1 items' }).click()
  await screen.getByRole('button', { name: 'Checkout' }).click()
  await screen.getByRole('textbox', { name: 'Your name' }).fill('Claw Fan')
  await screen.getByRole('textbox', { name: 'Email address' }).fill('fan@example.com')
  await screen.getByRole('button', { name: /^Place demo order/ }).click()
  await expect.element(screen.getByRole('heading', {
    name: 'Small claws. Big thank you.',
  })).toBeVisible()
})
```

<div class="mt-3 text-lg">Welche Browser-Aktionen gehören zu einer Handlung?</div>

---
layout: code-editor
project: claw-and-chew
activeFile: shop-page.ts
tabs: purchase.browser.test.ts, shop-page.ts
step: 2 / 4 · Page Object
clicks: 2
files: |
  talk/
    tacon/
      purchase.browser.test.ts
      shop-page.ts
hideFooter: true
---

<div class="mb-3 text-xl font-bold">Ein Page Object bündelt die Bedienung</div>

````md magic-move {duration:400}
```ts
await screen.getByRole('textbox', {
  name: 'Your name',
}).fill('Claw Fan')
await screen.getByRole('textbox', {
  name: 'Email address',
}).fill('fan@example.com')
```
```ts
function createShopPage(screen: Awaited<ReturnType<typeof render>>) {
  return {
    async enterCustomer({ name, email }: { name: string; email: string }) {
      await screen.getByRole('textbox', { name: 'Your name' }).fill(name)
      await screen.getByRole('textbox', { name: 'Email address' }).fill(email)
    },
  }
}
```
```ts
function createShopPage(screen: Awaited<ReturnType<typeof render>>) {
  return {
    async enterCustomer({ name, email }: { name: string; email: string }) {
      await screen.getByRole('textbox', { name: 'Your name' }).fill(name)
      await screen.getByRole('textbox', { name: 'Email address' }).fill(email)
    },
    async addPlushAndCheckout() {
      await screen.getByRole('button', { name: 'Add The little claw plush to bag' }).click()
      await screen.getByRole('button', { name: 'Open bag, 1 items' }).click()
      await screen.getByRole('button', { name: 'Checkout' }).click()
    },
    async placeOrder() {
      await screen.getByRole('button', { name: /^Place demo order/ }).click()
    },
    confirmation: screen.getByRole('heading', { name: 'Small claws. Big thank you.' }),
  }
}
```
````

<div class="mt-1 text-base">{{ $clicks === 0 ? 'Diese beiden Eingaben werden zu enterCustomer().' : 'Die Handlungen und Locator im Objekt. Die Assertion bleibt im Test.' }}</div>

---
layout: code-editor
project: claw-and-chew
activeFile: shop-page.ts
tabs: shop-page.ts, purchase.browser.test.ts@2
step: 3 / 4 · Factory
clicks: 2
files: |
  talk/
    tacon/
      purchase.browser.test.ts
      shop-page.ts
hideFooter: true
---

<div class="mb-3 text-xl font-bold">Eine Factory gibt uns den vorbereiteten Shop</div>

````md magic-move {duration:400}
```ts
import { render } from 'vitest-browser-vue'
import Shop from '../../app/components/Shop.vue'

// createShopPage steht in derselben Datei.
export async function renderShop() {
  const screen = await render(Shop)
  return createShopPage(screen)
}
```
```ts {5-7}
import { render } from 'vitest-browser-vue'
import Shop from '../../app/components/Shop.vue'

// createShopPage steht in derselben Datei.
export async function renderShop() {
  const screen = await render(Shop)
  return createShopPage(screen)
}
```
```ts
import { renderShop } from './shop-page'

// Im Test:
const shop = await renderShop()
await shop.enterCustomer({
  name: 'Claw Fan',
  email: 'fan@example.com',
})
```
````

<div class="mt-5 text-lg">Factory = Funktion, die ein Objekt erzeugt und zurückgibt.</div>
<div class="mt-2 text-lg opacity-70">Hier: Shop rendern → Page Object zurückgeben → im Test bedienen.</div>

---
layout: default
class: talk-code
contractChapter: "1 / 3 · Verhalten"
---
# Ein Test liest sich wie eine Bestellung

```ts {all|5-11|12|all}
import { expect, test } from 'vitest'
import { renderShop } from './shop-page'

test('a customer can order a plush', async () => {
  const shop = await renderShop()
  await shop.addPlushAndCheckout()
  await shop.enterCustomer({
    name: 'Claw Fan',
    email: 'fan@example.com',
  })
  await shop.placeOrder()
  await expect.element(shop.confirmation).toBeVisible()
})
```

---
layout: default
---
<ContractChapter :number="2" title="Accessibility" question="Der Kauf klappt.&#10;Auch mit der Tastatur?" />

---
layout: default
contractChapter: "2 / 3 · Accessibility"
---
<ContractDefinition
  title="Was meinen wir mit Accessibility?"
  definition="Menschen können die Komponente wahrnehmen, verstehen und bedienen, auch mit Tastatur und assistiven Technologien."
  example="Bei den Tabs stimmen Tastaturbedienung, Fokus, gemeldete Auswahl und sichtbarer Inhalt überein."
/>

---
layout: default
contractChapter: "2 / 3 · Accessibility"
---
# Sichtbar gewechselt. Falsch gemeldet.

<TabsContractDemo />

---
layout: default
contractChapter: "2 / 3 · Accessibility"
---
# Den A11y-Tree als Erwartung speichern

<AriaSnapshotExplanation />

---
layout: default
class: talk-code
contractChapter: "2 / 3 · Accessibility"
---
# Der Snapshot erkennt die falsche Auswahl

<div class="mt-4 mb-4 text-xl">Nach dem Tastaturwechsel zu Password:</div>

```ts
const tabs = page.getByRole('tablist')
await expect.element(tabs).toMatchAriaInlineSnapshot(`
  - tablist "Manage your account":
    - tab "Account"
    - tab "Password" [selected]
`)
```

<div class="mt-6 grid grid-cols-2 gap-8 text-xl">
<div style="color: #f38ba8">× Defekt: Account ausgewählt</div>
<div style="color: #a6e3a1">✓ Repariert: Password ausgewählt</div>
</div>
<div class="mt-6 text-lg">Der Snapshot prüft hier die Tab-Liste.<br>Fokus und Panel-Name prüfen wir weiterhin gezielt.</div>

---
layout: default
contractChapter: "2 / 3 · Accessibility"
---
# axe: automatische Regeln, echte Browserdaten

<div class="mt-4">
<img src="/memes/axe-browser-vs-jsdom.png" class="w-full" alt="Automatischer Ablauf: Komponente rendern, axe-Regeln prüfen, Ergebnis im Test prüfen. JSDOM unterstützt DOM-Regeln, aber kein echtes Layout: Der Kontrastcheck bleibt incomplete. Vitest Browser Mode liefert echtes Rendering mit Layout, Fonts und Farben: axe erkennt den Kontrastfehler. Manuelle Accessibility-Tests bleiben nötig." />
</div>

---
layout: default
contractChapter: "2 / 3 · Accessibility"
---
<img src="/memes/axe-rule-scope.png" class="w-full h-full object-contain" alt="Was prüft axe? In JSDOM und im Browser: Buttons ohne Namen, Eingaben ohne Label und ungültige ARIA-Rollen. Mit echtem Browser-Rendering zusätzlich: Textkontrast. Eigene Tests prüfen Tastatur, Fokus sowie die erwartete Auswahl und den passenden Inhalt." />

---
layout: default
class: talk-code
zoom: 0.85
contractChapter: "2 / 3 · Accessibility"
---
# axe automatisch im Browser-Test ausführen

```ts
// Claw & Chew · CheckoutForm.browser.test.ts (Auszug)
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import axe from 'axe-core'
import CheckoutForm from './CheckoutForm.vue'

test('Checkout-Hinweis hat ausreichend Kontrast', async () => {
  const screen = await render(CheckoutForm, { props: { total: 2250 } })
  const notice = screen.getByText(/This is a demo shop\./)
  await expect.element(notice).toBeVisible()
  const results = await axe.run(notice.element(), { runOnly: ['color-contrast'] })
  expect(results.violations.map(rule => rule.id)).toEqual([])
  expect(results.incomplete).toEqual([])
})
```

<div class="mt-4 text-lg"><code>pnpm test:browser</code> führt auch diesen Test aus – lokal und in CI.</div>
<div class="mt-2 text-base"><span style="color: #a6e3a1">✓ Original grün</span> · <span style="color: #f38ba8">✕ Kontrast-Defekt: color-contrast</span> · in Chromium geprüft</div>
<div class="mt-2 text-base opacity-80">Hier gezielt eine axe-Regel. Ohne <code>runOnly</code>: Standardregeln im gewählten DOM-Bereich. Tastatur und Tab-Bedeutung prüfen wir zusätzlich.</div>

---
layout: statement
contractChapter: "2 / 3 · Accessibility"
---
# Auswahl, Fokus und Inhalt stimmen überein

<div class="mt-10 text-2xl">Das prüfen wir zusätzlich zum Kaufablauf.</div>
<div class="mt-6 text-xl">Unser Accessibility-Vertrag für diese Tabs.</div>

---
layout: default
---
<ContractChapter :number="3" title="Darstellung" question="Bedienbar.&#10;Sieht es auch richtig aus?" />

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
<ContractDefinition
  title="Was sind visuelle Regressionstests?"
  definition="Wir vergleichen die aktuelle Darstellung mit einer freigegebenen Referenz und machen Abweichungen sichtbar."
  example="Die Produktkarte funktioniert noch, aber die Buttonfarbe hat sich verändert. Gewollte Änderung oder Fehler?"
/>

---
layout: center
contractChapter: "3 / 3 · Darstellung"
---
# Die Interaktion bleibt grün

<ScreenshotComparison
  class="mt-6"
  label="Visueller Vergleich der Produktkarte"
  :expected="{ src: '/shop/plush-card.png', alt: 'Referenz der Produktkarte' }"
  :actual="{ src: '/shop/plush-card-actual.png', alt: 'Produktkarte mit falscher Buttonfarbe' }"
  :diff="{ src: '/shop/plush-card-diff.png', alt: 'Visueller Unterschied der Produktkarte' }"
/>

---
layout: two-cols-header
class: visual-contract
contractChapter: "3 / 3 · Darstellung"
---
# Ein Screenshot für einen konkreten Vertrag

::left::

```ts
const screen = await render(
  ProductCardHost,
)
const artwork = screen
  .getByRole('img', {
    name: 'The little claw plush',
  })
  .element()
if (!(artwork instanceof HTMLImageElement))
  throw new Error('Produktbild fehlt')
await artwork.decode()
await document.fonts.ready

await expect(screen.getByRole('article'))
  .toMatchScreenshot('plush-card')
```

::right::

<div class="pl-6 text-2xl leading-relaxed">

Fester Viewport.

Geladene Bilder und Fonts.

Nur die relevante Komponente.

</div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Viele Button-Varianten, eine Referenz

<div class="mt-5 text-xl">3 Varianten × 4 Zustände · ein Screenshot des gesamten Containers</div>
<div class="mt-6 flex justify-center"><ButtonVariantGallery /></div>

---
layout: two-cols-header
contractChapter: "3 / 3 · Darstellung"
---
# Die Galerie ist unsere Test-Fixture

<div class="button-gallery-code" aria-hidden="true" />

::left::

<div class="mb-3 text-lg">ButtonVariantGallery.vue · Ausschnitt</div>

```vue
<section
  aria-label="Button-Varianten">
  <template v-for="state in states"
    :key="state.name">
    <BaseButton
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      :size="state.size"
      :disabled="state.disabled"
    >In den Warenkorb</BaseButton>
  </template>
</section>
```

::right::

<div class="mb-3 text-lg">Vitest 5 · Browser Mode / Playwright</div>

```ts
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import Gallery from './ButtonVariantGallery.vue'

test('Button-Varianten', async () => {
  const screen = await render(Gallery)
  await document.fonts.ready

  const gallery = screen.getByRole('region', {
    name: 'Button-Varianten',
  })
  await expect(gallery)
    .toMatchScreenshot('button-variants')
})
```

<div class="mt-4 text-lg">Aufnehmen und vergleichen mit einem Matcher.</div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Eine Variante fehlt — der Vergleich wird rot

<ButtonVariantComparison />

<div class="mt-8 text-2xl">Auch falsche Farben, Abstände oder abgeschnittene Labels werden sichtbar.</div>
<div class="mt-6 text-xl">Der Test kennt nur die freigegebene Matrix.<br>Nie aufgenommene Varianten entdeckt er nicht von selbst.</div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Visual Tests bei jedem Pull Request

<div class="mt-4">
<img
  src="/memes/visual-regression-pipeline.png"
  alt="Ein Pull Request startet Vitest und Chromium in CI. Der aktuelle Screenshot wird mit der Referenz aus Git verglichen: Bei Übereinstimmung ist der Check grün, bei Abweichung werden Referenz, aktuelles Bild und Diff geprüft. Browser, Fonts und Viewport bleiben gleich."
  class="w-full"
/>
</div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Gewollte Änderung? Referenz bewusst aktualisieren

<div class="grid grid-cols-3 gap-8 mt-10 text-xl">
<div><h2 style="font-size: 1.5rem">1 · Manuell starten</h2><p><code>workflow_dispatch</code><br>auf dem Feature-Branch.</p></div>
<div><h2 style="font-size: 1.5rem">2 · In CI erzeugen</h2><p>Dieselbe Umgebung wie beim normalen Vergleich.</p></div>
<div><h2 style="font-size: 1.5rem">3 · Bilder reviewen</h2><p>Referenzen committen.<br>PR-Check erneut ausführen.</p></div>
</div>

```sh
pnpm exec vitest run --project vrt --update
```

<div class="mt-7 text-xl">Ein roter Vergleich ist eine Review-Aufgabe, keine automatische Freigabe.</div>
<div class="mt-4 text-lg opacity-80">Kein <code>--update</code> im normalen PR-Check. Keine lokalen Mac-Referenzen für den Linux-Vergleich.</div>

---
layout: default
class: visual-coverage
contractChapter: "3 / 3 · Darstellung"
---
# Welche Darstellung sichern wir ab?

<div class="coverage-columns">
  <section>
    <h2>Eigene Core-UI</h2>
    <p class="coverage-example">Button · Dialog · Eingabefeld</p>
    <p>Ausgewählte Varianten<br>Fokus- und Fehlerzustände</p>
  </section>
  <section>
    <h2>Fachliche Screens</h2>
    <p class="coverage-example">Kompositionen · Layout-Risiken</p>
    <p>Gezielt die Ansichten absichern,<br>bei denen Darstellung zählt.</p>
  </section>
</div>

<div class="coverage-rule">
  <strong>Jede Referenz braucht einen Grund und ein Review.</strong>
  <span>Keine Screenshot-Matrix für jeden Schritt.</span>
</div>

<style>
.visual-coverage h1 { font-size: 34px; }
.visual-coverage .coverage-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 54px; text-align: left; }
.visual-coverage .coverage-columns section { border-top: 3px solid #a8cf80; padding-top: 20px; }
.visual-coverage .coverage-columns h2 { font-size: 27px; line-height: 1.2; margin: 0 0 18px; font-weight: 600; }
.visual-coverage .coverage-columns p { font-size: 21px; line-height: 1.5; margin: 12px 0 0; }
.visual-coverage .coverage-columns .coverage-example { color: #b9dba0; font-size: 20px; }
.visual-coverage .coverage-rule { margin-top: 42px; padding-top: 20px; border-top: 1px solid #ffffff30; display: flex; flex-direction: column; gap: 8px; }
.visual-coverage .coverage-rule strong { font-size: 23px; font-weight: 600; }
.visual-coverage .coverage-rule span { font-size: 19px; opacity: .7; }
</style>


---
layout: default
clicks: 3
---
# Der Shop ist sichtbar. Jetzt übernimmt Vue.

<NuxtTestBoundary step="request" />

---
layout: default
clicks: 1
---
# Server und Browser müssen zusammenpassen

<NuxtTestBoundary step="mismatch" />

---
layout: default
zoom: 0.9
---
# Tipp: Hydration-Fehler automatisch prüfen

<div class="mb-4 text-xl">Eine automatische Fixture für Vue/Nuxt: vor dem Test mithören, danach prüfen.</div>

```ts
import { test as base, expect, type ConsoleMessage } from '@playwright/test'
export const test = base.extend<{ hydrationCheck: void }>({
  hydrationCheck: [async ({ page }, use) => {
    const errors: string[] = []
    const collect = (message: ConsoleMessage) => {
      if (/hydration.*mismatch/i.test(message.text()))
        errors.push(message.text())
    }
    page.on('console', collect)
    await use() // Hier läuft der Test: URL öffnen, Interaktion prüfen.
    page.off('console', collect)
    expect(errors, 'Keine Hydration-Mismatches').toEqual([])
  }, { auto: true }],
})
```

<div class="mt-4 text-lg">Tests importieren <code>test</code> aus dieser Datei. Sichtbares HTML allein reicht nicht als Bereitschaftssignal.</div>

---
layout: default
---
# Dafür behalten wir Playwright-E2E

| An der laufenden Anwendung prüfen | Konkrete Frage |
| --- | --- |
| Server-HTML → Hydration | Übernimmt Vue den Shop ohne Mismatch? |
| Direkte URL → Anmeldung → Rückkehr | Komme ich nach dem Login zurück zu <code>/account</code>? |
| Reload und ausgelieferter Build | Startet der Shop und bleibt mein Warenkorb erhalten? |

<div class="mt-8 text-2xl">Direkter Mount: Komponenten zusammenspielen lassen.<br>Aufruf per URL: den Start der Anwendung mitprüfen.</div>

<div class="mt-6 text-lg opacity-70">Auch bei einer SPA: zusätzliche Prüfungen nach Produktversprechen wählen.</div>

---
layout: default
---
# Was bleibt für unseren Shop echt?

| Im Test behalten | Bewusst kontrollieren |
| --- | --- |
| Echte Komponenten und ihr Zustand | Antworten externer APIs |
| Layout, Scrollen und Browser-Geometrie | Zeit und fachliche Testdaten |
| Browser-APIs wie ResizeObserver | Fehlerfälle an Systemgrenzen |
| Klicks über den Browser-Provider | Screenshot-Umgebung |

<div class="mt-8 text-2xl">Der Browser liefert Layout und Interaktion. Externe Antworten steuern wir gezielt.</div>

---
layout: default
---
# Diese Erwartungen gebe ich der KI mit

<div class="mt-8 text-2xl">Vertrag: Nach „Add to bag“ erscheint das Produkt im Warenkorb.</div>

- Rendere die echten Komponenten mit ihrem Zustand.
- Klicke über Rollen und Namen mit dem Browser-Provider.
- Prüfe das sichtbare Ergebnis; lasse private Refs unberührt.
- Begründe jeden Mock. Nutze vorhandene Helper und Factories.
- Verdecke den Button: rot. Entferne den Defekt: grün.

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Reka UI</h1>
<img
  src="/shop/reka-ui-overview.png"
  alt="Reka UI mit Beispielen für Kalender, Farbauswahl, Slider, Zahleneingabe und weitere UI-Komponenten."
  class="absolute inset-0 h-full w-full object-contain"
  style="background: #0b100c"
/>

---
layout: default
---

<RekaMigrationOverview />

---
layout: code-editor
project: reka-ui
activeFile: vite.config.ts
tabs: vite.config.ts
step: 1 / 6 · Migration
clicks: 1
files: |
  packages/
    core/
      src/
        Slider/
          Slider.test.ts
          Slider.browser.test.ts
      vite.config.ts
  PORTING.md
  PORT-PROMPTS.md
  PORT-INVENTORY.tsv
hideFooter: true
---

<div class="mb-4 text-xl font-bold">1. Browser Mode neben jsdom ergänzen</div>

````md magic-move {duration:400}
```ts
// Ausschnitt: bestehendes Testprojekt
{
  name: 'unit',
  environment: 'jsdom',
  include: ['./**/*.test.{ts,js}'],
  setupFiles: './vitest.setup.ts',
}
```
```ts
// Neues Projekt neben dem bisherigen jsdom-Projekt
{
  name: 'browser',
  include: ['./**/*.browser.test.ts'],
  setupFiles: './vitest.browser.setup.ts',
  browser: {
    enabled: true,
    provider: playwright(),
    instances: [{ browser: 'chromium' }],
  },
}
```
````

<div class="mt-5 text-lg">97 Testdateien als Ausgangspunkt. Die Originale liefen weiter.</div>

---
layout: code-editor
project: reka-ui
activeFile: Slider.test.ts
tabs: Slider.test.ts, Slider.browser.test.ts@1
step: 2 / 6 · Migration
clicks: 1
files: |
  packages/
    core/
      src/
        Slider/
          Slider.test.ts
          Slider.browser.test.ts
      vite.config.ts
  PORTING.md
  PORT-PROMPTS.md
  PORT-INVENTORY.tsv
hideFooter: true
---

<div class="mb-4 text-xl font-bold">2. Den Slider in den Browser übertragen</div>

````md magic-move {duration:400}
```ts
// Ausschnitt aus Slider.test.ts
import { mount } from '@vue/test-utils'

window.HTMLElement.prototype.setPointerCapture = vi.fn()

beforeEach(() => {
  wrapper = mount(Slider, { props: { disabled: false } })
})

it('should have default value', () => {
  expect(wrapper.html()).toContain('aria-valuenow="50"')
})
```
```ts
// Ausschnitt aus Slider.browser.test.ts
import { render } from 'vitest-browser-vue'

// Pointer Capture kommt jetzt vom Browser.
beforeEach(async () => {
  screen = await renderSlider()
})

it('should have default value', async () => {
  await expect.element(screen.getByRole('slider'))
    .toHaveAttribute('aria-valuenow', '50')
})
```
````

<div class="mt-5 text-lg">39 Tests portiert. Gegenprobe ohne Pointer Capture: Browser rot, jsdom grün.</div>

---
layout: code-editor
project: reka-ui
activeFile: vite.config.ts
tabs: vite.config.ts
step: 3 / 6 · Migration
clicks: 2
files: |
  packages/
    core/
      src/
        Slider/
          Slider.test.ts
          Slider.browser.test.ts
      vite.config.ts
  PORTING.md
  PORT-PROMPTS.md
  PORT-INVENTORY.tsv
hideFooter: true
---

<div class="mb-4 text-xl font-bold">3. Zehn Dateien brauchen keinen Browser</div>

```ts {all|4-7|11-12}
// Eigenes Projekt für reine Logik
{
  extends: true,
  test: {
    name: 'node',
    environment: 'node',
    include: NODE_TESTS,
  },
}

// Im jsdom-Projekt: diese Dateien ausschließen.
exclude: ['**/node_modules/**', '**/*.browser.test.ts', ...NODE_TESTS]
```

<div class="mt-5 text-lg">Kein DOM, kein Browser-Setup. Weitere Pilotdateien: useForwardExpose und Label.</div>

---
layout: code-editor
project: reka-ui
activeFile: PORTING.md
tabs: PORTING.md
step: 4 / 6 · Migration
clicks: 3
files: |
  packages/
    core/
      src/
        Slider/
          Slider.test.ts
          Slider.browser.test.ts
      vite.config.ts
  PORTING.md
  PORT-PROMPTS.md
  PORT-INVENTORY.tsv
hideFooter: true
---

<div class="mb-4 text-xl font-bold">4. Jeden Port prüfen lassen</div>

```sh {all|1-2|4-7|9-10}
# Ein Agent migriert. Ein zweiter vergleicht Original und Port.
pnpm --filter reka-ui exec vitest run --project=browser Slider

# Fehlen Testfälle? Wurden Assertions oder Coverage verloren?
pnpm --filter reka-ui port:checklist Slider --complete
pnpm --filter reka-ui port:parity Slider --complete
pnpm --filter reka-ui port:coverage Slider

# Auch das Original muss weiter laufen.
pnpm --filter reka-ui exec vitest run --project=unit Slider
```

<div class="mt-5 text-lg">Der Reviewer sucht schwächere Assertions. Gleiche Zahlen allein reichen nicht.</div>

---
layout: code-editor
project: reka-ui
activeFile: PORT-PROMPTS.md
tabs: PORT-PROMPTS.md
step: 5 / 6 · Migration
clicks: 2
files: |
  packages/
    core/
      src/
        Slider/
          Slider.test.ts
          Slider.browser.test.ts
      vite.config.ts
  PORTING.md
  PORT-PROMPTS.md
  PORT-INVENTORY.tsv
hideFooter: true
---

<div class="mb-4 text-xl font-bold">5. Erkenntnisse in die Anleitung übernehmen</div>

```md {all|2-5|7-10}
<!-- Aufträge aus PORT-PROMPTS.md, gekürzt und übersetzt -->
## Migration
- Übertrage genau eine Testdatei.
- Behalte Testfälle und die Stärke der Assertions bei.
- Dokumentiere neue Erkenntnisse.

## Unabhängiges Review
- Lies Original und Port ohne die Erklärung des Implementierers.
- Suche fehlende oder schwächere Assertions.
- Würde der Test ohne funktionierendes Feature bestehen?
```

<div class="mt-5 text-lg">Prompts und AGENTS.md wurden korrigiert und für die nächsten Dateien genutzt.</div>

---
layout: code-editor
project: reka-ui
activeFile: PORT-INVENTORY.tsv
tabs: PORT-INVENTORY.tsv
step: 6 / 6 · Migration
files: |
  packages/
    core/
      src/
        Slider/
          Slider.test.ts
          Slider.browser.test.ts
      vite.config.ts
  PORTING.md
  PORT-PROMPTS.md
  PORT-INVENTORY.tsv
hideFooter: true
---

<div class="mb-4 text-xl font-bold">6. Jede Datei hat ein neues Testziel</div>

```text
Zusammenfassung der Migration · 97 ursprüngliche Dateien

Ziel                     Dateien
────────────────────────────────
Vitest Browser Mode           87
Node                          10
────────────────────────────────
Ohne neues Testziel            0

Die jsdom-Originale bleiben als Vergleich erhalten.
```

<div class="mt-5 text-lg">Danach folgte die Qualitätsarbeit an Interaktionen und Assertions.</div>

---
layout: default
---
# Was kostet ein echter Klick?

<div class="grid grid-cols-2 gap-10 mt-7">
  <div>
    <div class="text-xl opacity-70">jsdom · <code>element.click()</code></div>
    <div class="text-4xl font-bold mt-3">0,03 ms</div>
    <div class="text-xl mt-4">Löst das Klick-Event direkt im DOM aus.</div>
  </div>
  <div>
    <div class="text-xl opacity-70">Browser · <code>locator.click()</code></div>
    <div class="text-4xl font-bold mt-3">≈ 26 ms</div>
    <div class="text-xl mt-4">Prüft: sichtbar, aktiviert, erreichbar, stabil.</div>
    <div class="text-xl mt-2">Maus bewegen → drücken → loslassen</div>
  </div>
</div>

<div class="mt-7 text-2xl font-bold">≈ 18 ms davon: auf eine stabile Position warten</div>
<div class="mt-2 text-xl">Gleiche Position und Größe in zwei aufeinanderfolgenden Animationsframes.</div>
<div class="mt-5 text-xl">Meine Reka-UI-Suite: 10,75 s → 12,10 s · ≈ 13 % länger</div>
<div class="mt-3 text-sm opacity-70">Lokale Messung · M4 Pro · Chromium headless · kein allgemeines Tempo-Versprechen</div>

---
layout: statement
---
# Wir definieren, was grün bedeutet

<div class="mt-10 text-2xl">Der Vertrag bestimmt die Assertion.</div>
<div class="mt-6 text-2xl">Der Browser prüft echtes Browser-Verhalten.</div>
<div class="mt-6 text-2xl">Ein gezielter Defekt prüft unseren Test.</div>

---
layout: end
hideFooter: true
---
# Was soll euer nächster Test beweisen?

<div class="mt-10 text-xl opacity-70">Fragen · alexop.dev · Beispiele: claw-and-chew.vercel.app</div>

---
layout: statement
hideFooter: true
---
# Backup

---
layout: default
class: talk-code
contractChapter: "2 / 3 · Accessibility"
---
# Drei Erwartungen. Ein Vertrag.

<div class="mt-6 mb-6 text-xl">Nach dem Tastaturwechsel zu Password:</div>

```ts
await expect.element(password).toHaveFocus()
await expect.element(password).toHaveAttribute('aria-selected', 'true')
await expect.element(panel).toHaveAccessibleName('Password')
```

<div class="mt-8 flex gap-12 text-2xl" style="color: #ff55e7"><span>Fokus</span><span>Auswahl</span><span>Panel-Name</span></div>
<div class="mt-6 text-xl">Gleicher Test: mit Defekt rot, nach der Reparatur grün.</div>
<div class="mt-6 text-base opacity-75">Diese ARIA-Fehler sind auch in JSDOM prüfbar. Browser Mode ergänzt die echte Browserumgebung. Die Assertions bestimmen, was wir prüfen.</div>

---
layout: default
class: talk-code
zoom: 0.9
contractChapter: "2 / 3 · Accessibility"
---
# Der Bug: ARIA bleibt auf Account stehen

<div class="mb-4 text-lg">Aus unserer Demo: <code>broken = true</code> hält den gemeldeten Namen fest.</div>

```ts
const selected = ref<'Account' | 'Password'>('Password')
const semanticName = computed(() =>
  broken.value ? 'Account' : selected.value
)
```

```vue
<!-- Auszug: Der Password-Tab bekommt zwei verschiedene Zustände. -->
<button role="tab"
  :class="{ active: selected === 'Password' }"
  :aria-selected="semanticName === 'Password'"
  @click="selected = 'Password'">Password</button>
```

<div class="mt-5 grid grid-cols-2 gap-8 text-xl">
<div><span style="color: #a6e3a1">Sichtbar: selected = Password</span><br>Markierung und Inhalt wechseln.</div>
<div><span style="color: #f38ba8">Gemeldet: semanticName = Account</span><br><code>aria-selected</code> bleibt falsch.</div>
</div>
<div class="mt-4 text-base opacity-80">Auch <code>aria-labelledby</code> nutzt semanticName: Der Passwort-Bereich heißt weiter „Account“.</div>

---
layout: default
class: talk-code
zoom: 0.85
contractChapter: "2 / 3 · Accessibility"
---
# Dieser JSDOM-Test bleibt grün

```ts
// @vitest-environment jsdom
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TabsContractDemo from './TabsContractDemo.vue'

test('zeigt den Passwort-Bereich', async () => {
  render(TabsContractDemo)
  const user = userEvent.setup()
  await user.click(screen.getByRole('tab', { name: 'Account' }))
  await user.click(screen.getByRole('tab', { name: 'Password' }))
  expect(screen.getByText('Change your password here.')).toBeTruthy()
})
```

<div class="mt-5 text-xl" style="color: #a6e3a1">✓ Der Text ist da. Genau das prüft dieser Test.</div>
<div class="mt-3 text-lg">Er prüft weder die gemeldete Auswahl noch den Namen des Panels.</div>
<div class="mt-3 text-base opacity-70">Testbeispiel: Mit derselben Text-Assertion wäre auch Browser Mode grün.</div>

---
layout: default
class: talk-code
zoom: 0.85
contractChapter: "2 / 3 · Accessibility"
---
# Dieser Browser-Test prüft auch die Bedeutung

```ts
import { expect, test } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import TabsContractDemo from './TabsContractDemo.vue'

test('wechselt Auswahl und Bedeutung per Tastatur', async () => {
  await render(TabsContractDemo)
  await page.getByRole('tab', { name: 'Account' }).click()
  await userEvent.keyboard('{ArrowRight}')
  const password = page.getByRole('tab', { name: 'Password' })
  await expect.element(password).toHaveFocus()
  await expect.element(password).toHaveAttribute('aria-selected', 'true')
  await expect.element(page.getByRole('tabpanel'))
    .toHaveAccessibleName('Password')
})
```

<div class="mt-4 text-xl" style="color: #f38ba8">✕ Erwartet: aria-selected="true" · Tatsächlich: "false"</div>
<div class="mt-2 text-base">Testbeispiel: Die Auswahl-Assertion schlägt fehl. Nach der Reparatur passen auch Auswahl und Panel-Name.</div>
<div class="mt-2 text-base opacity-70">Auch JSDOM könnte diese ARIA-Fehler prüfen. Browser Mode ergänzt die echte Browser- und Tastaturumgebung.</div>

---
layout: default
class: talk-code
zoom: 0.9
contractChapter: "2 / 3 · Accessibility"
---
# Der Fix: ARIA folgt der sichtbaren Auswahl

<div class="mb-4 text-lg">Den festgehaltenen Wert entfernen. Beide Darstellungen lesen denselben Zustand.</div>

```diff
- const semanticName = computed(() =>
-   broken.value ? 'Account' : selected.value
- )
+ const semanticName = computed(() => selected.value)
```

<div class="mt-5 text-lg">Nach dem Wechsel zu Password rendert Vue jetzt:</div>

```html
<button role="tab" aria-selected="false">Account</button>
<button role="tab" id="demo-password" aria-selected="true">Password</button>
<div role="tabpanel" aria-labelledby="demo-password">…</div>
```

<div class="mt-5 text-xl" style="color: #a6e3a1">✓ Password fokussiert · Password ausgewählt · Panel heißt Password</div>
<div class="mt-3 text-lg">Der Test bleibt unverändert. Die Komponente erfüllt jetzt seine Erwartungen.</div>
<div class="mt-3 text-base opacity-70">„Defekt aktiv“ ausschalten aktiviert in der Demo genau diesen Pfad: semanticName folgt selected.</div>

---
layout: default
class: talk-code
contractChapter: "2 / 3 · Accessibility"
---
# Den Zusammenhang als ARIA-Snapshot prüfen

```ts
await expect.element(page.getByRole('tablist')).toMatchAriaInlineSnapshot(`
  - tablist "Manage your account":
    - tab "Account"
    - tab "Password" [selected]
`)
await expect.element(page.getByRole('tabpanel'))
  .toHaveAccessibleName('Password')
```

<div class="mt-8 text-xl">Der Snapshot hält fest, welcher Tab als ausgewählt gemeldet werden soll.</div>
<div class="mt-4 text-xl">Im Defekt steht <code>[selected]</code> bei Account. Nach der Reparatur bei Password.</div>

<style>
pre code { white-space: pre-wrap; overflow-wrap: anywhere; }
</style>

---
layout: two-cols-header
zoom: 0.82
---
# Scrollbarer Warenkorb: dieselbe Absicht

::left::

## JSDOM bleibt grün

```ts
render(FullBagHost)
const user = userEvent.setup()

await user.click(await screen.findByRole(
  'button',
  { name: 'Remove Tiny claws sticker pack' },
))

expect(screen.queryByRole(
  'button',
  { name: 'Remove Tiny claws sticker pack' },
)).not.toBeInTheDocument()
```

::right::

## Browser Mode schlägt fehl

```ts
await page.viewport(375, 600)
const screen = await render(FullBagHost)
const remove = screen.getByRole('button', {
  name: 'Remove Tiny claws sticker pack',
})

await commands.scrollBag()
await expect.poll(() => {
  const item = remove.element().getBoundingClientRect()
  const bag = document.querySelector('.drawer-body')!
    .getBoundingClientRect()
  return item.top >= bag.top && item.bottom <= bag.bottom
}).toBe(true)
```

---
layout: default
zoom: 0.9
---
# Der unerreichbare Warenkorb

<TestingLabExample example="unscrollable-bag" />

---
layout: default
zoom: 0.9
---
# Produktvorschau: Resize vor dem Drag

<TestingLabExample example="fixed-preview-width" />

---
layout: default
---
# Zwei Ebenen, zwei Testverträge

| Fachlicher Ablauf | Wiederverwendbare Komponente |
| --- | --- |
| Shop: `Shop.vue` | Dialog · Eingabe · Button |
| Bestellung absenden | Escape schließt · Fokus kehrt zurück |
| Ausgangssituation → Handlung → Ergebnis | Öffentliche Props, Events und Bedienung |

<div class="mt-8 text-2xl">Beide testen Verhalten. Die Sprache des Vertrags ändert sich.</div>
<div class="mt-5 text-xl opacity-70">Private Refs und interne Methoden sind kein Nutzervertrag.</div>

---
layout: default
zoom: 0.9
---
# Nuxt: Vom Server-HTML zum Warenkorb

```ts
const hydrationErrors: string[] = []
page.on('console', (message) => {
  if (/hydration.*mismatch/i.test(message.text()))
    hydrationErrors.push(message.text())
})

await page.goto('/')
await page.getByRole('button', {
  name: 'Add The little claw plush to bag',
}).click()
await page.getByRole('button', { name: 'Open bag, 1 items' }).click()
await expect(page.getByRole('dialog', {
  name: 'Your little haul',
})).toBeVisible()
expect(hydrationErrors).toEqual([])
```

<div class="mt-5 text-xl">Direkter Mount: grün · eingebauter Hydration-Defekt: hier rot</div>

---
layout: default
---
# SPA: Eine Komponente ist meine App

```ts
import App from '@/App.vue'

// Ausschnitt aus createTestApp()
const router = createAppRouter(createMemoryHistory())
const screen = await render(App, {
  global: {
    plugins: [router, i18n, {
      install: (app) => provideRuntime(runtime, app),
    }],
    provide: { [reloadPageKey]: reloadPage },
  },
})
await router.isReady()
```

<div class="mt-5 text-xl">Echte Komponenten, Navigation und Services arbeiten zusammen.</div>

---
layout: default
---
# SPA: Ein konkreter Komponentenvertrag

<WorkoutScrollDemo />

---
layout: default
---
# Zwei Entscheidungen vor jedem Test

<div class="grid grid-cols-2 gap-14 mt-14">
<div>

## Der Vertrag

<div class="mt-5 text-2xl">Welches beobachtbare Verhalten versprechen wir?</div>

</div>
<div>

## Die Testumgebung

<div class="mt-5 text-2xl">Welche Laufzeit enthält das echte Risiko?</div>

</div>
</div>

<div class="mt-14 text-2xl">Erst beides zusammen bestimmt, was ein grüner Test beweist.</div>

---
layout: statement
---
# Drei Fragen vor dem Merge

<div class="mt-10 text-3xl">Kann der Nutzer handeln?</div>
<div v-click class="mt-6 text-3xl">Stimmen Bedeutung und Bedienung?</div>
<div v-click class="mt-6 text-3xl">Bleibt die Darstellung korrekt?</div>

---
layout: center
---
<div class="text-center">

<div style="font-size:6rem;font-weight:700;line-height:1">53,72 s → 13,59 s</div>

<div style="margin-top:2rem;font-size:2rem;opacity:0.7">Dieselbe PWA-Suite mit 82 Tests.</div>

<div class="mt-8 text-xl opacity-70">Eine Projektmessung. Kein allgemeiner Benchmark.</div>
<div class="mt-5 text-xl">Damals: ≈ 70 % Integration · 20 % Unit · 10 % visuell / A11y</div>

</div>

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="missing-pointer-capture" title="Der Druck bleibt stehen" />

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="fixed-preview-width" title="Resize: Der Druck landet falsch" />

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="unscrollable-bag" title="Der letzte Artikel bleibt unerreichbar" />

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="low-contrast-notice" title="Der Checkout-Hinweis ist kaum lesbar" />

---
layout: default
---
# Teste den Vertrag, nicht den privaten Ref

<div class="grid grid-cols-2 gap-8">
<div>

## Interner Zustand

```ts
expect(wrapper.vm.bagCount).toBe(1)
```

Bricht beim Umbenennen von <code>bagCount</code>.

</div>
<div>

## Sichtbares Verhalten

```ts
await expect.element(
  screen.getByLabelText('Bag count'),
).toHaveTextContent('1 items in bag')
```

Prüft das Ergebnis für den Kunden.

</div>
</div>

<div class="mt-8 text-2xl">Auch unser JSDOM-Test ist ein Black-Box-Test.</div>

---
layout: default
---
# Eine Factory macht den Unterschied sichtbar

```ts
export function aPlushLine({ quantity = 1 } = {}): CartLine {
  const product = products.find((item) => item.id === 'plush')
  if (!product) throw new Error('The talk fixture requires the plush product')
  return {
    key: 'plush-fixture', product,
    variant: 'One size · 18 cm', print: null, quantity,
  }
}
```

```ts
const lines = [aPlushLine({ quantity: 3 })]
expect(summarize(lines).shipping).toBe(0)
```

<div class="mt-5 text-xl">Drei Plüschtiere → kostenloser Versand · reine Logik in Node</div>

---
layout: default
---
# Derselbe Button, andere Erwartungen

| Test | Seine Verantwortung |
| --- | --- |
| Shop-Ablauf | Die Bestätigung erscheint. |
| Button-Komponente | Disabled verhindert Aktivierung. |
| Visueller Core-UI-Test | Ausgewählte Button-Varianten sehen richtig aus. |

<div class="mt-8 text-2xl">Mehrfach ausgeführter Code ist normal.</div>
<div class="mt-4 text-xl">Dieselbe Erwartung an vielen Stellen kostet Wartung.</div>

---
layout: two-cols-header
---
# Pointer Capture

::left::

```ts
handle.setPointerCapture(event.pointerId)
```

JSDOM nimmt im Mock an, dass Capture aktiv ist.

::right::

Der Browser bewegt den Pointer aus dem Handle.

Ohne Capture bleibt der Print bei `50%, 45%` statt `75%, 60%`.

---
layout: two-cols-header
zoom: 0.82
---
# Responsive Preview: dieselbe Absicht

::left::

## JSDOM bleibt grün

```ts
render(CustomizerHost)
await fireEvent.click(screen.getByRole(
  'button', { name: 'Resize preview' },
))

await fireEvent.pointerMove(handle, {
  clientX: 300,
  clientY: 141,
})

expect(screen.getByLabelText('Print position'))
  .toHaveTextContent('Position: 75%, 60%')
```

JSDOM verwendet weiterhin das erfundene Rechteck mit 400 px.

::right::

## Browser Mode schlägt fehl

```ts
const screen = await render(CustomizerHost)
await screen.getByRole('button', {
  name: 'Resize preview',
}).click()

await expect.element(screen.getByLabelText(
  'Preview width',
)).toHaveTextContent('Preview: 280 px')

await commands.dragMascot()
await expect.element(screen.getByLabelText(
  'Print position',
)).toHaveTextContent('Position: 75%, 60%')
```

---
layout: two-cols-header
zoom: 0.84
---
# Hydration braucht die gebaute Anwendung

::left::

## Browser Mode bleibt grün

```ts
const screen = await render(Shop)

await screen.getByRole('button', {
  name: 'Add The little claw plush to bag',
}).click()

await screen.getByRole('button', {
  name: 'Open bag, 1 items',
}).click()

await expect.element(screen.getByRole(
  'dialog', { name: 'Your little haul' },
)).toBeVisible()
```

Browser Mode mountet nur den Client-Zustand.

::right::

## Playwright schlägt fehl

```ts
const hydrationErrors: string[] = []
page.on('console', (message) => {
  if (/hydration.*mismatch/i.test(message.text()))
    hydrationErrors.push(message.text())
})

await page.goto('/')

expect(
  hydrationErrors,
  'The server HTML must hydrate without mismatches',
).toEqual([])
```

Playwright beginnt mit dem HTML des Nuxt-Servers.

---
layout: default
zoom: 0.9
---
# Hydration: die Grenze im Modell

<TestingLabExample example="hydration-mismatch" />

---
layout: two-cols-header
---
# Browser Mode ersetzt nicht alles

::left::

- Kein Nuxt-Server beim direkten Mount
- Kein Beweis für Safari auf einem echten Gerät
- Kein vollständiger Accessibility-Audit
- Experimentelle ARIA- und Screenshot-APIs

::right::

## Dafür bleibt Playwright End-to-End

- Hydration
- Produktions-Routing und Assets
- kritische vollständige Abläufe

---
layout: two-cols-header
zoom: 0.88
---
# Gleiche Absicht, andere Ausführung

::left::

## JSDOM

```ts
const user = userEvent.setup()
render(ProductCardHost)

await user.click(
  screen.getByRole('button', {
    name: 'Add The little claw plush to bag',
  }),
)

expect(screen.getByLabelText('Bag count'))
  .toHaveTextContent('1 items in bag')
```

::right::

## Browser Mode

```ts
const screen = await render(ProductCardHost)

await screen
  .getByRole('button', {
    name: 'Add The little claw plush to bag',
  })
  .click()

await expect.element(
  screen.getByLabelText('Bag count'),
).toHaveTextContent('1 items in bag')
```

---
layout: default
---
# Browser Mode neben bestehenden Tests

```ts
import { playwright } from '@vitest/browser-playwright'

// Browser-Projekt innerhalb von test.projects
{
  test: {
    name: 'browser',
    include: ['**/*.browser.test.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
}
```

<div class="mt-4 text-xl">Node und vorhandene JSDOM-Projekte bleiben daneben.</div>
