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
layout: default
class: p-0
background: false
hideFooter: true
---
<TalkTitle />

---
layout: default
hideFooter: true
---
<AudienceQuestion>
Wer hatte trotz grüner Tests einen Bug im Release?
</AudienceQuestion>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Die klassische Testpyramide</h1>
<img
  src="/memes/hamcrab-testing-pyramid-consistent-v1.png"
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
  src="/memes/hamcrab-jsdom-isolated-components-2021-consistent-v1.png"
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
<div class="mt-6 text-xl">Warum klappt genau das im Shop nicht?</div>

---
layout: default
---
<BlockedButtonSlide />

---
layout: default
hideFooter: true
---
# jsdom beschreibt diese Grenze selbst

<div class="mt-14 text-lg opacity-60">Aus der jsdom-Dokumentation</div>
<blockquote class="!m-0 !mt-5 !border-0 !p-0" style="font-size: 46px; line-height: 1.35; background: transparent">
  “jsdom still <strong style="color: #ff55e7">does not do any<br>layout or rendering</strong>”
</blockquote>

<div class="mt-9 text-2xl">Auch mit <code>pretendToBeVisual: true</code>.</div>

<div class="mt-10 text-base opacity-70">
  <a href="https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser">jsdom README · Pretending to be a visual browser ↗</a>
</div>

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

<TerminalRecording
  src="shop/terminal/blocked-button-browser.cast"
  label="Aufgezeichneter fehlgeschlagener Chromium-Testlauf mit aktivem CSS-Bug"
/>

<div class="mt-5 text-xl">Chromium · echter aufgezeichneter Testlauf · CSS-Bug aktiv</div>
<div class="mt-3 text-xl text-rose-300"><code>product-decoration</code> blockiert den Klick.</div>

---
layout: default
class: p-0
hideFooter: true
---
<img
  src="/memes/hamcrab-three-component-contracts-consistent-v1.png"
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
contractChapter: "1 / 3 · Verhalten"
---
# Der Klick funktioniert.<br>Klappt auch die Bestellung?

<div class="mt-8 text-xl">Produkt → Warenkorb → Checkout → Bestätigung</div>

---
layout: default
contractChapter: "1 / 3 · Verhalten"
hideFooter: true
---

# Shop.vue: die Bestellung zusammensetzen

<img src="/shop/shop-component-boundaries.png" alt="Claw & Chew: Shop.vue umfasst die Produktkarte ProductCard.vue und den CartDrawer.vue mit eingebettetem CheckoutForm.vue. Farbige Rechtecke markieren die Komponenten im Shop-UI." class="w-full h-[365px] object-contain" />

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
contractChapter: "1 / 3 · Verhalten"
class: factory-data-slide
hideFooter: true
---
# Testdaten mit einer Factory

<div class="mt-5 grid grid-cols-[1.15fr_1fr] gap-7">
<div>
<div class="mb-3 text-xl font-bold">Faker erzeugt die Produktdaten</div>

```ts
import { faker } from '@faker-js/faker'

function aProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
  }
}
```

</div>
<div>
<div class="mb-3 text-xl font-bold">Im Test reicht ein Aufruf</div>

```ts
const product = aProduct()
```

<div class="mt-5 text-2xl font-bold text-teal-300">Ein neues Produkt als Testdaten</div>
<div class="mt-3 text-base opacity-70">ID, Name und Preis kommen von Faker.js</div>
</div>
</div>

<div class="mt-6 text-xl">Einmal definieren · in Tests wiederverwenden</div>

<style>
.factory-data-slide pre { font-size: 15px !important; line-height: 1.55 !important; }
</style>

---
layout: default
contractChapter: "1 / 3 · Verhalten"
class: factory-msw-slide
hideFooter: true
---
# API-Mocks: weniger Testdaten schreiben

<div class="mt-5 grid grid-cols-2 gap-7">
<div>
<div class="mb-3 text-xl font-bold">Ohne Factory</div>

```ts
http.get('/api/products', () => {
  return HttpResponse.json([
    {
      id: 'product-1',
      name: 'Plüschtier',
      price: 25,
    },
    {
      id: 'product-2',
      name: 'Tasse',
      price: 12,
    },
  ])
})
```

</div>
<div>
<div class="mb-3 text-xl font-bold">Mit Factory</div>

```ts
http.get('/api/products', () => {
  return HttpResponse.json([
    aProduct(),
    aProduct(),
  ])
})
```

<div class="mt-5 text-2xl font-bold text-teal-300">Zwei Produkte. Fertig.</div>
<div class="mt-3 text-base opacity-70">Die Produktstruktur steht einmal in der Factory.</div>
</div>
</div>

<div class="mt-5 text-xl">MSW mockt die API · die Factory liefert die Daten</div>

<style>
.factory-msw-slide pre { font-size: 15px !important; line-height: 1.45 !important; }
</style>

---
layout: default
---
<AudienceQuestion>
Wer testet regelmäßig nur mit der Tastatur?
</AudienceQuestion>

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
<AudienceQuestion>
Wer findet Darstellungsfehler, die automatisierte Tests übersehen?
</AudienceQuestion>

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
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Und die anderen Button-Zustände?

<div class="mt-14 flex justify-center">
  <VisualDemoButton variant="primary" size="large" />
</div>

<div v-click class="mt-12 flex items-end justify-center gap-12">
  <div class="text-center"><VisualDemoButton variant="secondary" size="large" /><div class="mt-4 text-lg">Secondary</div></div>
  <div class="text-center"><VisualDemoButton variant="outline" size="large" /><div class="mt-4 text-lg">Outline</div></div>
  <div class="text-center"><VisualDemoButton variant="primary" size="large" disabled /><div class="mt-4 text-lg">Disabled</div></div>
</div>

<div v-click class="mt-12 text-center text-2xl">Wie behalten wir sie gemeinsam im Blick?</div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Jeder Zustand bekommt einen festen Platz

<div class="mt-4 text-xl">Wie Stories in Storybook oder Histoire: gezielt vorbereitete Beispiele</div>
<div class="mt-5 flex justify-center"><ButtonVariantGallery /></div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Diese Galerie wird unser Referenzbild

<div class="mt-4 text-xl">3 Varianten × 4 Größen und Zustände · ein gemeinsamer Bildvergleich</div>
<div class="mt-5 flex justify-center">
  <div class="rounded-xl p-2" style="outline: 3px solid var(--brand-accent, #ff55e7)"><ButtonVariantGallery /></div>
</div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Eine Variante fehlt — der Vergleich wird rot

<ButtonVariantComparison />

<div class="mt-8 text-2xl">Der Outline-Button fehlt. Der Bildvergleich erkennt die Änderung.</div>
<div v-click class="mt-6 text-2xl">Wie bauen wir diese Galerie und den Test?</div>

---
layout: two-cols-header
contractChapter: "3 / 3 · Darstellung"
---
# Wie bauen wir diese Galerie selbst?

<div class="button-gallery-code" aria-hidden="true" />

::left::

<div class="mb-3 text-lg">ButtonVariantGallery.vue · Ausschnitt</div>

```vue
<section aria-label="Button-Varianten">
  <BaseButton variant="primary">
    In den Warenkorb
  </BaseButton>
  <BaseButton variant="secondary">
    In den Warenkorb
  </BaseButton>
  <BaseButton disabled>
    In den Warenkorb
  </BaseButton>
</section>
```

<div class="mt-4 text-base">Die vollständige Galerie enthält alle Kombinationen.</div>

::right::

<div class="mb-5 text-lg">Feste Beispiele in einer Vue-Komponente</div>
<div class="button-gallery-preview"><ButtonVariantGallery /></div>

---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Ein Screenshot für die ganze Galerie

<div class="mt-5 text-base opacity-70">Test-Ausschnitt · Vitest Browser Mode mit Playwright</div>

<div v-click="1" class="mt-4">
<div class="mb-2 text-xl">1 · Galerie im Browser rendern</div>

```ts
const screen = await render(Gallery)
```

</div>
<div v-click="2" class="mt-4">
<div class="mb-2 text-xl">2 · Den gesamten Galerie-Bereich auswählen</div>

```ts
const gallery = screen.getByRole('region', { name: 'Button-Varianten' })
```

</div>
<div v-click="3" class="mt-4">
<div class="mb-2 text-xl">3 · Screenshot aufnehmen und mit der Referenz vergleichen</div>

```ts
await expect(gallery).toMatchScreenshot('button-variants')
```

</div>

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
class: reference-update
contractChapter: "3 / 3 · Darstellung"
---
# Gewollte Änderung? Referenz bewusst aktualisieren

<img class="reference-update__visual" src="/diagrams/reference-update-workflow.png" alt="Illustration: Ein Workflow wird manuell gestartet, ein CI-Server erzeugt Vergleichsbilder und eine Lupe steht für das bewusste Review der neuen Referenzen." />

<div class="reference-update__steps">
<section><h2>1 · Manuell starten</h2><p><code>workflow_dispatch</code><br>auf dem Feature-Branch.</p></section>
<section><h2>2 · In CI erzeugen</h2><p>Dieselbe Umgebung wie<br>beim normalen Vergleich.</p></section>
<section><h2>3 · Bilder reviewen</h2><p>Referenzen committen.<br>PR-Check erneut ausführen.</p></section>
</div>

```sh
pnpm exec vitest run --project vrt --update
```

<div class="reference-update__rule">Ein roter Vergleich braucht ein bewusstes Review.</div>
<div class="reference-update__caution">Kein <code>--update</code> im PR-Check · Keine Mac-Referenzen für den Linux-Vergleich.</div>
<div class="reference-update__credit">KI-Illustration</div>

<style>
.slidev-layout.reference-update { padding-top: 28px; }
.reference-update h1 { font-size: 32px; margin-bottom: 0; }
.reference-update .reference-update__visual { display: block; width: 100%; height: 230px; object-fit: cover; margin: 0; }
.reference-update .reference-update__steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 12px; }
.reference-update .reference-update__steps h2 { font-size: 23px; font-weight: 600; line-height: 1.25; margin: 0 0 8px; }
.reference-update .reference-update__steps p { font-size: 18px; line-height: 1.4; margin: 0; }
.reference-update .reference-update__rule { margin-top: 12px; font-size: 23px; color: #b9dc91; font-weight: 600; }
.reference-update .reference-update__caution { margin-top: 6px; font-size: 16px; line-height: 1.5; opacity: .8; }
.reference-update .reference-update__credit { position: absolute; right: 28px; bottom: 18px; font-size: 11px; opacity: .45; }
</style>

---
layout: default
class: visual-coverage
contractChapter: "3 / 3 · Darstellung"
---
# Welche Darstellung sichern wir ab?

<div class="coverage-columns">
  <section>
    <h2>Eigene Core-UI</h2>
    <img class="coverage-visual" src="/diagrams/visual-coverage-fields.png" alt="UI-Beispiel: ein E-Mail-Feld im Standardzustand, mit grünem Fokusring und mit roter Fehlermeldung." />
    <p>Ausgewählte Varianten und Zustände</p>
  </section>
  <section>
    <h2>Fachliche Screens</h2>
    <img class="coverage-visual" src="/diagrams/visual-coverage-checkout.png" alt="UI-Beispiel: Checkout mit Lieferadresse und Bestellübersicht. Ein langer Produktname ist als Layout-Risiko pink markiert." />
    <p>Kompositionen mit Layout-Risiken</p>
  </section>
</div>

<div class="coverage-rule">
  <strong>Jede Referenz braucht einen Grund und ein Review.</strong>
  <span>Keine Screenshot-Matrix für jeden Schritt.</span>
</div>

<style>
.visual-coverage h1 { font-size: 34px; }
.visual-coverage .coverage-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 22px; text-align: left; }
.visual-coverage .coverage-columns section { border-top: 3px solid #a8cf80; padding-top: 12px; min-width: 0; }
.visual-coverage .coverage-columns h2 { font-size: 27px; line-height: 1.2; margin: 0 0 8px; font-weight: 600; }
.visual-coverage .coverage-visual { display: block; width: 100%; height: 218px; object-fit: contain; }
.visual-coverage .coverage-columns p { color: #b9dba0; font-size: 18px; line-height: 1.4; margin: 8px 0 0; }
.visual-coverage .coverage-rule { margin-top: 20px; padding-top: 14px; border-top: 1px solid #ffffff30; display: flex; flex-direction: column; gap: 5px; }
.visual-coverage .coverage-rule strong { font-size: 23px; font-weight: 600; }
.visual-coverage .coverage-rule span { font-size: 18px; opacity: .7; }
</style>


---
layout: default
contractChapter: "3 / 3 · Darstellung"
---
# Visual Regression zum Nachlesen

<div class="mt-10 grid grid-cols-[1fr_280px] gap-12 items-center">
  <div>
    <p class="text-2xl leading-relaxed">In meinem Blogpost gehe ich genauer auf das Beispiel mit den Button-Varianten ein.</p>
    <a href="https://alexop.dev/posts/visual-regression-testing-with-vue-and-vitest-browser/" target="_blank" rel="noopener noreferrer" class="mt-8 block text-2xl leading-snug">
      How to Do Visual Regression<br>Testing in Vue with Vitest?
    </a>
    <p class="mt-5 text-xl opacity-70">alexop.dev</p>
  </div>
  <a href="https://alexop.dev/posts/visual-regression-testing-with-vue-and-vitest-browser/" target="_blank" rel="noopener noreferrer" aria-label="Blogpost über Visual Regression öffnen">
    <img src="/qr/visual-regression-blog.png" alt="QR-Code zum Blogpost über Visual Regression mit Vue und Vitest" width="280" height="280" />
  </a>
</div>

---
layout: default
---
# Drei Blickwinkel auf dieselbe UI

<div class="mt-10 text-2xl">Was soll ein grüner Test für unseren Shop beweisen?</div>

| Vertrag | Unser Beispiel | Prüfung |
| --- | --- | --- |
| Verhalten | Ich kann eine Bestellung abschließen. | Interaktion → sichtbares Ergebnis |
| Accessibility | Ich kann Tabs per Tastatur bedienen. | Fokus, ARIA-Zustand und axe |
| Darstellung | Die freigegebenen Button-Varianten bleiben erhalten. | Bewusst gewählte Bildreferenz |

<div class="mt-8 text-2xl">Zusammen bestimmen sie, was „funktioniert“ bedeutet.</div>

---
layout: default
---
# Browser Mode vs. jsdom

<div class="mt-3 text-lg opacity-75">Erkenntnisse aus der Reka-UI-Migration · mit Playwright</div>

<BrowserModeComparison />

---
layout: default
---
# So würde ich heute unsere Tests aufbauen

| Wo? | Was sichern wir ab? |
| --- | --- |
| **Vitest · Node** | Reine Logik: Preise, Rabatte, Validierung |
| **Vitest · Browser Mode** | Echte Komponenten im Zusammenspiel: die Bestellung |
| **Im Browser ergänzen** | Tastatur, Fokus und axe; ausgewählte Bildreferenzen |
| **Playwright · E2E** | Kritische Wege durch die laufende App: Start, Hydration, Reload |

<div class="mt-8 text-2xl">Mein Schwerpunkt: Nutzerabläufe mit echten Komponenten.</div>
<div class="mt-4 text-xl opacity-75">Typprüfung und Linting als Basis. Externe APIs gezielt kontrollieren.</div>

---
layout: default
class: npmx-strategy
---
# So testet npmx.dev

<div class="npmx-columns">
  <img class="npmx-pyramid" src="/diagrams/npmx-test-pyramid.png" alt="Testpyramide: unten Vitest in Node für reine Logik, mittig Vitest Browser Mode für Komponenten und axe, oben Playwright E2E. Die Flächen zeigen keine gemessene Mengenverteilung." />
  <figure>
    <img class="npmx-screenshot" src="/shop/npmx-vitest-overview.png" alt="npmx.dev zeigt die Vitest-Paketseite mit Suche, Dokumentation, Versionen und Paketinformationen." />
    <figcaption>Ein Open-Source-Browser für die npm-Registry</figcaption>
  </figure>
</div>

<div class="npmx-source"><a href="https://github.com/npmx-dev/npmx.dev/tree/0e3cdadf3d0d9759a91462a1045297c836701c51">npmx-dev/npmx.dev · Quellstand 0e3cdadf</a></div>

<style>
.npmx-strategy .npmx-columns { display: grid; grid-template-columns: 0.9fr 1.3fr; gap: 28px; align-items: center; margin-top: 24px; }
.npmx-strategy .npmx-pyramid { width: 100%; height: 360px; object-fit: contain; }
.npmx-strategy figure { margin: 0; }
.npmx-strategy .npmx-screenshot { width: 100%; height: auto; border: 1px solid #ffffff25; border-radius: 6px; }
.npmx-strategy figcaption { margin-top: 12px; font-size: 17px; opacity: .75; }
.npmx-strategy .npmx-source { margin-top: 16px; font-size: 12px; opacity: .65; }
</style>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">One more thing…</h1>
<img src="/memes/steve-jobs-one-more-thing.jpg" alt="Steve Jobs auf der Bühne vor der Aufschrift One more thing…" class="absolute inset-0 w-full h-full object-contain" style="background: #000" />

---
layout: default
hideFooter: true
---
# 2026. Also musste AI in den Talk.

<div class="mt-3 text-2xl">Mein Versuch: die Tests von Reka UI migrieren.</div>

<img src="/shop/reka-ui-overview.png" alt="Reka UI zeigt unter anderem Kalender, Farbauswahl und Slider." class="w-full h-80 object-contain mt-5" />

<div class="mt-4 text-xl"><a href="https://reka-ui.com/">Reka UI</a>: Vue-Bausteine mit Tastaturbedienung und ARIA.</div>

---
layout: default
class: reka-picture
hideFooter: true
---
# Vitest selbst als Nachschlagewerk

<img src="/memes/hamcrab-vitest-reference-v1.png" alt="Ein Hamcrab-Agent liest in einem großen Vitest-Buch Dokumentation, Code und Tests. Ein Slider-Beispiel zeigt die Änderung von 50 auf 51." />

<div class="reka-picture-caption">Lokal geklont: <strong>opensource/vitest</strong> · Doku, Code und eigene Tests.</div>
<div class="reka-picture-credit">KI-Illustration</div>



---
layout: default
class: reka-picture
hideFooter: true
---
# Einer migriert. Einer prüft.

<img src="/memes/hamcrab-migration-review-v2.png" alt="Ein Agent migriert einen Test. Ein zweiter vergleicht ihn mit dem Original, findet ein fehlendes Puzzleteil und ergänzt die gemeinsame Anleitung AGENTS.md." />

<div class="reka-picture-caption">Original vergleichen. Tests ausführen. Anleitung verbessern.</div>
<div class="reka-picture-credit">KI-Illustration</div>

---
layout: default
class: reka-pair
hideFooter: true
---
# Der Slider: vorher und nachher

<div class="reka-pair-grid">
<div>

### jsdom

```ts
// Setup · prototypname gekürzt
ResizeObserver = class { /* Stub */ }
proto.scrollIntoView = vi.fn()
proto.hasPointerCapture = vi.fn()
  .mockImplementation(id => id)
proto.releasePointerCapture = vi.fn()
proto.setPointerCapture = vi.fn()

await slider.trigger('keydown', {
  key: 'ArrowRight',
})
expect(slider.attributes('aria-valuenow'))
  .toBe('51')
```

</div>
<div>

### Browser Mode

```ts
const screen = await render(Slider)
const slider = screen.getByRole('slider')
slider.element().focus()

await userEvent.keyboard('{ArrowRight}')

await expect.element(slider)
  .toHaveAttribute('aria-valuenow', '51')
```

<div class="mt-6 text-xl" style="color: #a6e3a1">Diese fünf Browser-Stubs und Mocks entfallen.</div>

</div>
</div>

<div class="mt-5 text-xl">Gleiche Erwartung. Echte Browser-APIs.</div>
<div class="mt-2 text-sm opacity-60">Gekürzte Ausschnitte; der vollständige Test prüft zusätzlich die Änderung um 1.</div>

<style>
.reka-pair .reka-pair-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 22px; }
.reka-pair .reka-pair-grid > div { min-width: 0; }
.reka-pair h3 { margin: 0 0 12px; font-size: 24px; }
.reka-pair pre { font-size: 14px !important; line-height: 1.6 !important; }
</style>

---
layout: default
hideFooter: true
---
# 97 Dateien migriert

<div class="grid grid-cols-2 gap-16 mt-10 text-center">
  <div><div class="text-8xl font-bold" style="color: #ff55e7">87</div><div class="mt-4 text-2xl">Browser Mode</div></div>
  <div><div class="text-8xl font-bold" style="color: #a6e3a1">10</div><div class="mt-4 text-2xl">Node</div></div>
</div>

<div class="mt-10 text-3xl text-center">Für solche Migrationen ist AI richtig gut.</div>
<div class="mt-3 text-xl text-center opacity-75">Meine Erfahrung: mit guten Referenzen und Review.</div>
<div class="mt-7 text-lg text-center"><a href="https://github.com/alexanderop/reka-ui-bench-mark/tree/browserMode">Mein Fork: alexanderop/reka-ui-bench-mark</a></div>
<div class="mt-3 text-sm text-center opacity-60">Die jsdom-Originale bleiben zum Vergleich erhalten.</div>

---
layout: default
class: talk-thanks
hideFooter: true
---
# Danke!

<p class="thanks-message">Testet, was eure Nutzer tun – im echten Browser.</p>

<div class="thanks-grid">
  <div>
    <a class="thanks-blog" href="https://alexop.dev/">alexop.dev</a>
    <p class="thanks-intro">Die Teststrategie zum Nachlesen:</p>
    <a class="thanks-article" href="https://alexop.dev/posts/vue3_testing_pyramid_vitest_browser_mode/">Vue 3 Testing Pyramid:<br>A Practical Guide with<br>Vitest Browser Mode</a>
    <p class="thanks-topics">Logik · Integration · Accessibility · Visual Regression</p>
  </div>
  <a class="thanks-qr" href="https://alexop.dev/posts/vue3_testing_pyramid_vitest_browser_mode/" aria-label="Blogartikel zur Teststrategie öffnen">
    <span>Blogartikel</span>
    <img src="/qr/testing-strategy-blog.png" alt="QR-Code zum Blogartikel über die Teststrategie mit Vitest Browser Mode" width="195" height="195" />
  </a>
  <a class="thanks-qr" href="https://vitest-browser-mode-tacon.vercel.app" aria-label="Folien zum Talk öffnen">
    <span>Folien mitnehmen</span>
    <img src="/qr/tacon-slides.png" alt="QR-Code zu den Folien dieses Talks" width="195" height="195" />
  </a>
</div>

<a class="thanks-slides-link" href="https://vitest-browser-mode-tacon.vercel.app">vitest-browser-mode-tacon.vercel.app</a>

<style>
.talk-thanks h1 { font-size: 60px; margin-bottom: 16px; }
.talk-thanks .thanks-message { font-size: 26px; margin: 0; }
.talk-thanks .thanks-grid { display: grid; grid-template-columns: 1fr 195px 195px; gap: 28px; align-items: center; margin-top: 34px; }
.talk-thanks .thanks-qr { display: grid; gap: 14px; border: 0; text-align: center; font-size: 21px; font-weight: 600; }
.talk-thanks .thanks-qr img { width: 195px; height: 195px; }
.talk-thanks .thanks-slides-link { display: inline-block; margin-top: 26px; font-size: 18px; }
.talk-thanks .thanks-blog { font-size: 44px; font-weight: 600; }
.talk-thanks .thanks-intro { font-size: 19px; opacity: .75; margin: 22px 0 10px; }
.talk-thanks .thanks-article { font-size: 24px; line-height: 1.35; }
.talk-thanks .thanks-topics { font-size: 16px; opacity: .7; margin-top: 18px; max-width: 350px; }
</style>

---
layout: statement
hideFooter: true
---
# Backup

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="missing-pointer-capture" title="Der Druck bleibt stehen" />

---
layout: two-cols-header
zoom: 0.82
---
# Pointer Capture: derselbe Drag

::left::

## JSDOM bleibt grün

```ts
// Setup: Capture gilt im Mock immer als aktiv.
hasPointerCapture: { value: vi.fn(() => true) }

// Ausschnitt: Events direkt an das Handle senden.
await fireEvent.pointerDown(handle, {
  pointerId: 1, button: 0,
  clientX: 200, clientY: 106,
})
await fireEvent.pointerMove(handle, {
  pointerId: 1, buttons: 1,
  clientX: 300, clientY: 141,
})
expect(screen.getByLabelText('Print position'))
  .toHaveTextContent('Position: 75%, 60%')
```

Der Mock und das direkte Event umgehen das echte Pointer-Routing.

::right::

## Browser Mode schlägt fehl

```ts
const screen = await render(CustomizerHost)

await commands.dragMascot()

await expect.element(
  screen.getByLabelText('Print position'),
).toHaveTextContent('Position: 75%, 60%')
```

Der Helper bewegt die Maus mit gedrückter Taste aus dem Handle. Ohne Capture kommt der Drag dort nicht weiter an.

---
layout: default
class: talk-code
---
# Ohne Capture bleibt der Druck stehen

<div class="mb-5 text-lg"><code>ShirtCustomizer.browser.test.ts</code> · Defekt aktiv</div>

```text
Expected element to have text content:
  Position: 75%, 60%
Received:
  Position: 50%, 45%
```

<div class="mt-6 text-xl" style="color: #f38ba8">✕ Browser Mode: fehlgeschlagen</div>
<div class="mt-3 text-xl" style="color: #a6e3a1">✓ JSDOM: bestanden · nach dem Fix sind beide grün</div>
<div class="mt-6 text-lg">Der Fix stellt <code>setPointerCapture(event.pointerId)</code> wieder her.</div>
<div class="mt-4 text-sm opacity-60">Gekürzte Fehlerausgabe aus dem aufgezeichneten Claw-&amp;-Chew-Testlauf.</div>

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="unscrollable-bag" title="Der letzte Artikel bleibt unerreichbar" />

---
layout: default
zoom: 0.9
---
# Der unerreichbare Warenkorb

<TestingLabExample example="unscrollable-bag" />

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
class: talk-code
---
# Scrollen: Der letzte Artikel bleibt unerreichbar

<div class="mb-5 text-lg"><code>CartDrawer.browser.test.ts</code> · Defekt aktiv</div>

```text
The last bag item must be reachable by wheel scrolling:
expected false to be true
```

<div class="mt-6 text-xl" style="color: #f38ba8">✕ Browser Mode: fehlgeschlagen</div>
<div class="mt-3 text-xl" style="color: #a6e3a1">✓ JSDOM: bestanden · nach dem Fix sind beide grün</div>
<div class="mt-6 text-lg">Der Fix erlaubt Scrollen im Warenkorb wieder. Die Prüfung scheitert bereits vor dem Klick auf „Remove“.</div>
<div class="mt-4 text-sm opacity-60">Gekürzte Fehlerausgabe aus dem aufgezeichneten Claw-&amp;-Chew-Testlauf.</div>

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="fixed-preview-width" title="Resize: Der Druck landet falsch" />

---
layout: default
zoom: 0.9
---
# Produktvorschau: Resize vor dem Drag

<TestingLabExample example="fixed-preview-width" />

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
layout: default
class: talk-code
---
# Resize: Der Drag rechnet mit 400 px

<div class="mb-5 text-lg"><code>ShirtCustomizer.browser.test.ts</code> · Defekt aktiv</div>

```text
Expected element to have text content:
  Position: 75%, 60%
Received:
  Position: 53%, 60%
```

<div class="mt-6 text-xl" style="color: #f38ba8">✕ Browser Mode: fehlgeschlagen</div>
<div class="mt-3 text-xl" style="color: #a6e3a1">✓ JSDOM: bestanden · nach dem Fix sind beide grün</div>
<div class="mt-6 text-lg">Die Vorschau ist 280 px breit. Der Defekt rechnet noch mit 400 px; der Fix verwendet die gemessene Breite.</div>
<div class="mt-4 text-sm opacity-60">Gekürzte Fehlerausgabe aus dem aufgezeichneten Claw-&amp;-Chew-Testlauf.</div>

---
layout: default
class: p-0
hideFooter: true
---
<ShopDemoFrame scenario="low-contrast-notice" title="Der Checkout-Hinweis ist kaum lesbar" />

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
layout: statement
---
# Wir definieren, was grün bedeutet

<div class="mt-10 text-2xl">Der Vertrag bestimmt die Assertion.</div>
<div class="mt-6 text-2xl">Der Browser prüft echtes Browser-Verhalten.</div>
<div class="mt-6 text-2xl">Ein gezielter Defekt prüft unseren Test.</div>


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
