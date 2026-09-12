---
theme: '@alexop/slidev-theme-brand'
addons:
  - '@alexop/slidev-addon-utils'
title: 'Frontend-Testing neu gedacht'
layout: cover
background: false
transition: slide-left
mdc: true
lineNumbers: false
duration: 45min
twoslash: false
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
<h1 class="sr-only">Im Frontend testen wir Komponenten</h1>
<img
  src="/memes/frontend-components-one-mount.png"
  alt="Isoliert: mount(Button) prüft den einzelnen Button und sein Click-Event. Integriert: mount(Shop) rendert echte Kindkomponenten: ProductCard mit Button, Cart mit CartItem und CartBadge. Ein Klick aktualisiert über gemeinsamen Zustand Warenkorb und Zähler. Ein Mount testet das Zusammenspiel mehrerer Komponenten."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: p-0
hideFooter: true
---
<h1 class="sr-only">Komponententests in Node.js</h1>
<img
  src="/memes/hamcrab-jsdom-happy-dom.png"
  alt="Ein Test läuft in Node.js mit jsdom oder alternativ Happy DOM. Beide bilden DOM und Browser-APIs nach. Ablauf: Komponente mounten, interagieren, DOM prüfen. Die Testumgebung läuft ohne echte Browser-Engine."
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
zoom: 0.9
---
# Der echte JSDOM-Test

```ts
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
<h1 class="sr-only">Der Klick macht einen Rundweg</h1>
<img
  src="/diagrams/browser-mode-click.png"
  alt="Mit dem Playwright-Provider sendet button.click den Befehl __vitest_click per WebSocket-RPC an Node.js. Der Provider ruft locator.click auf und steuert den Browser. Ein Overlay fängt den Klick ab; der Test schlägt fehl."
  class="absolute inset-0 h-full w-full object-contain"
/>

---
layout: default
class: talk-code
---
# Locator behalten

<div class="mb-4 text-xl">Vitest übernimmt das Warten.</div>

```ts {all|4-5|7-8|10-11}
import { page, userEvent } from 'vitest/browser'
const kaufen = page.getByRole('button', { name: /kaufen/i })

// Sofort auflösen: Fehlt der Button, wirft element().
await userEvent.click(kaufen.element())

// Locator behalten: Die Interaktion kann warten.
await userEvent.click(kaufen)

// Kürzer:
await kaufen.click()
```

---
layout: default
class: talk-code
---
# Auf den Zustand warten

```ts {all|1-2|4-5|7-9}
// Ziel beschreiben
const kaufen = page.getByRole('button', { name: /kaufen/i })

// Aktion abwarten
await kaufen.click()

// Erwarteten Zustand wiederholt prüfen
await expect.element(page.getByRole('status'))
  .toHaveText('1 Artikel im Warenkorb')
```

<div class="mt-8 text-xl">Locator erstellen: synchron. Aktion und Assertion: <code>await</code>.</div>
<div class="mt-3 text-lg"><code>.element()</code> nur, wenn ich wirklich einen DOM-Knoten brauche.</div>

---
layout: default
---
# Der Browser findet den Fehler

<BrowserFailureFlow />

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
layout: statement
---
# Das Plüschtier landet im Warenkorb

<div class="mt-10 text-2xl">Ein erreichbarer Button. Ein Klick. Ein Artikel im Warenkorb.</div>
<div class="mt-6 text-xl">Dieses beobachtbare Versprechen nennen wir einen Verhaltensvertrag.</div>

---
layout: center
clicks: 3
---
# Vom Klick zur ganzen Bestellung

<Steps :steps="['Produkt', 'Warenkorb', 'Checkout', 'Bestätigung']" />

---
layout: default
class: talk-code
---
# Ein Test liest sich wie eine Bestellung

```ts {all|5-8|9|all}
import { expect, test } from 'vitest'
import { renderShop } from './shop-page'

test('a customer can order a plush', async () => {
  const shop = await renderShop()
  await shop.addPlushAndCheckout()
  await shop.enterCustomer({ name: 'Claw Fan', email: 'fan@example.com' })
  await shop.placeOrder()
  await expect.element(shop.confirmation).toBeVisible()
})
```

---
layout: statement
---
# Der Kauf klappt.<br>Auch mit der Tastatur?

<div class="mt-10 text-2xl">Und erfährt ein Screenreader, welcher Bereich ausgewählt ist?</div>

---
layout: default
---
# Sichtbar gewechselt. Falsch gemeldet.

<TabsContractDemo />

---
layout: default
class: talk-code
zoom: 0.9
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
layout: default
---
# axe: automatische Regeln, echte Browserdaten

<div class="mt-4">
<img src="/memes/axe-browser-vs-jsdom.png" class="w-full" alt="Automatischer Ablauf: Komponente rendern, axe-Regeln prüfen, Ergebnis im Test prüfen. JSDOM unterstützt DOM-Regeln, aber kein echtes Layout: Der Kontrastcheck bleibt incomplete. Vitest Browser Mode liefert echtes Rendering mit Layout, Fonts und Farben: axe erkennt den Kontrastfehler. Manuelle Accessibility-Tests bleiben nötig." />
</div>

---
layout: default
class: talk-code
zoom: 0.85
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
---
# Auswahl, Fokus und Inhalt stimmen überein

<div class="mt-10 text-2xl">Das prüfen wir zusätzlich zum Kaufablauf.</div>
<div class="mt-6 text-xl">Unser Accessibility-Vertrag für diese Tabs.</div>

---
layout: statement
---
# Bedienbar.<br>Sieht es auch richtig aus?

<div class="mt-10 text-2xl">Zurück zur Produktkarte: Der Klick kann trotz falscher Farbe funktionieren.</div>

---
layout: center
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
layout: center
---
# Welche Darstellung sichern wir ab?

<div class="grid grid-cols-2 gap-10 mt-10 text-2xl">
<div><h2>Eigene Core-UI</h2><p>Button · Dialog · Eingabefeld</p><p>Ausgewählte Varianten, Fokus und Fehlerzustände</p></div>
<div><h2>Fachliche Screens</h2><p>Gezielte Kompositionen und Layout-Risiken</p><p>Jede Referenz hat einen Grund und einen Review</p></div>
</div>

<div class="mt-8 text-xl">Keine Screenshot-Matrix für jeden Schritt jedes Ablaufs.</div>


---
layout: statement
---
# Ist damit der ganze Shop getestet?

<div class="mt-10 text-2xl">Bisher haben wir Komponenten im Browser gerendert.</div>
<div class="mt-6 text-xl">Unser Nuxt-Shop liefert aber auch HTML vom Server.</div>

---
layout: center
clicks: 2
---
# Was integriert dieser Test?

<RoughSvg :width="820" :height="300" :padding="24">
  <RoughNode id="shop" :x="315" :y="0" label="Shop.vue" variant="accent" />
  <RoughNode id="catalog" :x="20" :y="190" label="Katalog" sublabel="echte Komponenten" :step="1" />
  <RoughNode id="cart" :x="315" :y="190" label="Warenkorb" sublabel="echter Zustand" :step="1" />
  <RoughNode id="checkout" :x="610" :y="190" label="Checkout" sublabel="echter Dialog" :step="1" />
  <RoughEdge from="shop" to="catalog" :step="1" />
  <RoughEdge from="shop" to="cart" :step="1" />
  <RoughEdge from="shop" to="checkout" :step="1" />
</RoughSvg>

<div v-click="2" class="text-center text-xl opacity-70">
Server, Zahlung und Versand bleiben außerhalb dieses Tests.
</div>

---
layout: two-cols-header
---
# Nuxt: Die Anwendung beginnt am Server

::left::

## Browser Mode

`Shop.vue` rendern

Produkt → Warenkorb → Checkout

Client-Verhalten und Varianten

::right::

## Laufende Nuxt-App

Request → Server-Daten → HTML

Hydration → Interaktion

Serververtrag und Client zusammen

---
layout: default
---
# Nuxt und SPA: andere Testgrenzen

| Unser Nuxt-Shop | Eine reine SPA |
| --- | --- |
| Kaufablauf über `Shop.vue` | Fachlicher Ablauf über `App.vue` |
| Server-HTML → Hydration → Interaktion | Komponenten, Router und Services |
| Zusätzlich die laufende Nuxt-App prüfen | Zusätzlicher E2E-Runner nach Risiko |

<div class="mt-8 text-xl">Playwright als Browser-Provider ist kein zusätzlicher E2E-Runner.</div>
<div class="mt-5 text-xl opacity-70">Reload, Offline-Verhalten und ausgelieferter Build brauchen passende Prüfungen.</div>

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
layout: none
hideFooter: true
---
<MigrationScene
  :step="1"
  title="Erst prüfen, dann vervielfältigen"
  subtitle="Drei Pilotdateien kennenlernen. Einen Defekt gezielt nachweisen."
  image="/memes/hamcrab-migration-prototype.png"
  alt="Hamcrab zieht am Slider ein Kabel ab. Die rote Prüflampe erkennt den Defekt; Label und Zahnrad stehen für die anderen Pilotdateien."
/>

---
layout: none
hideFooter: true
---
<MigrationScene
  :step="2"
  title="Einer migriert. Einer prüft."
  subtitle="Grün. Aber wo ist die Assertion?"
  image="/memes/hamcrab-migration-review.png"
  alt="Ein Hamcrab migriert am Laptop. Ein unabhängiger Reviewer entdeckt im Vergleich zum Original ein fehlendes Puzzleteil trotz grünem Haken."
/>

---
layout: none
hideFooter: true
---
<MigrationScene
  :step="3"
  title="Der nächste Agent lernt mit"
  subtitle="Erkenntnisse ins Regelbuch. Dann die nächste Datei."
  image="/memes/hamcrab-migration-rulebook.png"
  alt="Hamcrab und Reviewer ergänzen das gemeinsame Regelbuch. Drei weitere Agenten übernehmen die verbesserte Anleitung für ihre nächsten Dateien."
/>

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
---
# Das Page Object bündelt Handlungen

```ts
async enterCustomer({ name, email }: {
  name: string
  email: string
}) {
  await screen.getByRole('textbox', {
    name: 'Your name',
  }).fill(name)
  await screen.getByRole('textbox', {
    name: 'Email address',
  }).fill(email)
}
```

<div class="mt-6 text-2xl">Die Handlungen im Helper. Die Assertion im Test.</div>

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
const screen = render(App, {
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
