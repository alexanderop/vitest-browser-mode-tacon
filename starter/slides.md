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

<div class="mt-12 text-xl opacity-70">
Alexander Opalic<br>
Developer bei Otto Payments
</div>

</div>

<!--
0:00 bis 0:40.

Wenn der Test sagt, dass ein Kunde ein Produkt kaufen kann, kann der Kunde es dann wirklich?
-->

---
layout: default
---

# Unser Beispiel: Claw & Chew

<img src="/shop/storefront.jpg" alt="Claw & Chew: Demo-Shop mit Plüschtier und Warenkorb" class="w-full h-80 object-cover object-top" />

<div class="text-xl">Demo-Shop · simulierter Checkout · Erfahrungen aus meiner produktiven Vue-PWA</div>

<!--
0:40 bis 1:35.

Ein Kunde legt ein Plüschtier in den Warenkorb und bestellt. Diesen Ablauf schützen wir heute.
Der Shop rekonstruiert Probleme aus meiner PWA. Er ist eine Demo, kein produktiver Zahlungsdienst. Zahlen beziehen sich auf die PWA.
Die lokale Aufnahme funktioniert ohne Konferenz-WLAN; die Shop-Tour ist optional vor dem Vortrag.
Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
-->

---
layout: statement
---
# Wer testet Komponenten mit JSDOM?

<!--
1:35 bis 2:00.

Kurz Hände ansehen. Die Beispiele sind Vue; das Prinzip gilt auch für andere UI-Frameworks. Danach direkt den Test zeigen.
-->

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

<!--
2:00 bis 2:55.

Das ist der echte Test aus Claw & Chew. Er rendert die ProductCard, sucht den Button semantisch, klickt ihn mit user-event und prüft anschließend den sichtbaren Warenkorbstand.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/catalog/ProductCard.dom.test.ts
-->

---
layout: default
---
<BlockedButtonSlide />

<!--
2:55 bis 4:25.

Zuerst in Working auf „Add plush to demo bag“ klicken: Zähler 1.
Dann „Introduce defect“ wählen und denselben Button klicken: Zähler 0, die Dekoration fängt den Klick ab.
„Dispatch a direct DOM click“ ruft tatsächlich button.click() auf: Der gleiche Handler erhöht den Zähler auf 1, obwohl die Ebene weiterhin darüber liegt.
Das ist eine lokale, vereinfachte Demonstration desselben Defekts. Der folgende Testlauf stammt aus dem Shop.
Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
-->

---
layout: default
---

# Gleiche Assertion, anderer Klick

<div class="grid grid-cols-2 gap-10 mt-10">
<div><h2>JSDOM: PASS</h2><p>Der Code reagiert auf das Event.</p></div>
<div><h2>Browser Mode: FAIL</h2><p>Die Dekoration fängt den Klick ab.</p></div>
</div>

<div class="mt-10 text-2xl">product-decoration intercepts pointer events</div>

<!--
4:25 bis 6:15.

Nur diese eine Terminalsequenz live zeigen: Defekt einbauen, JSDOM-Test grün, Browser-Test rot, zurücksetzen, Browser-Test grün.
Stoppe nach spätestens 90 Sekunden. Bei Verzögerung die vorbereitete Fehlermeldung auf der Folie erklären.
Beide Tests prüfen denselben Warenkorbstand. Der Unterschied liegt in der Interaktion.
Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
-->

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

<!--
6:15 bis 6:50.

Nach dem False-Green-Beispiel das Modell für den restlichen Talk einführen.

Ein einzelner Test muss nicht alle drei Fragen beantworten. Die Scorecard begleitet uns durch den Vortrag. Nach jedem Kapitel kommt ein geschützter Vertrag hinzu.
-->

---
layout: default
---
<PartSlide part="1" title="Verhalten" subtitle="Kann der Nutzer wirklich handeln?" />

<!--
6:50 bis 7:10.

Jetzt lösen wir auf, wie Vitest Browser Mode echte Nutzerhandlungen prüft.
-->

---
layout: center
clicks: 2
---
# Wo läuft der Test?

<RoughSvg :width="760" :height="230" :padding="24">
  <RoughNode id="test" :x="0" :y="70" label="Vitest" sublabel="Test-API" />
  <RoughNode id="vite" :x="290" :y="70" label="Vite" sublabel="Module + CSS" variant="accent" :step="1" />
  <RoughNode id="browser" :x="580" :y="70" label="Chromium" sublabel="DOM + Interaktion" variant="success" :step="2" />
  <RoughEdge from="test" to="vite" :step="1" />
  <RoughEdge from="vite" to="browser" :step="2" />
</RoughSvg>

<!--
7:10 bis 8:35.

Der Test behält die Vitest-APIs.

[click] Vite lädt die Komponente, ihre Module und das echte Stylesheet.

[click] Der Testcode und die Anwendung laufen in Chromium. Playwright oder WebdriverIO steuert die Browser-Interaktionen über einen Provider.

Quelle: research/raw/2026-08-18-vitest-4-1-11-browser-mode-documentation.md
-->

---
layout: default
---

# Black-Box beschreibt die Teststrategie

<div class="grid grid-cols-2 gap-8">
<div>

## Interner Zustand

```ts
expect(wrapper.vm.bagCount).toBe(1)
```

Kennt die Implementierung.

</div>
<div>

## Sichtbares Verhalten

```ts
await expect.element(
  screen.getByLabelText('Bag count'),
).toHaveTextContent('1 items in bag')
```

Kennt den Vertrag.

</div>
</div>

<div class="mt-8 text-2xl">Auch unser JSDOM-Test ist ein Black-Box-Test.</div>

<!--
8:35 bis 10:05.

Der linke Ausschnitt ist ein didaktisches Gegenbeispiel, kein Test aus dem Shop. Ein Refactoring kann bagCount entfernen, obwohl der Kunde weiterhin bestellen kann.
Rechts bleibt das beobachtbare Ergebnis gleich.
Beide Tests aus der Klick-Demo sind bereits Black-Box-Tests. Trotzdem fehlt einem davon das echte Browser-Verhalten. Strategie und Laufzeit sind zwei unabhängige Entscheidungen.
Quellen: research/wiki/testing-strategy-by-confidence-and-cost.md; research/raw/2025-12-14-vue-3-testing-pyramid-vitest-browser-mode.md
-->

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

<!--
10:05 bis 12:05.

Links steht der JSDOM-Test. Rechts steht Browser Mode. Die Absicht ist gleich. Beide suchen semantisch, klicken und prüfen sichtbaren Text.

render kommt aus vitest-browser-vue. page und userEvent kommen im Browser-Test aus vitest/browser; nicht aus @testing-library/user-event.

Browser Mode rendert asynchron. Der Locator bleibt wiederverwendbar. expect.element wartet auf den sichtbaren Zustand.

Entscheidend ist die Zeile mit `.click()`: Der Vitest-Locator schickt die Interaktion an den Browser-Provider. Ein direkt ausgelöstes DOM-Event würde die Actionability-Prüfung weiterhin umgehen.

Quellen:
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/catalog/ProductCard.dom.test.ts
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/catalog/ProductCard.browser.test.ts
- research/raw/2026-02-12-test-angular-components-like-a-real-user.md
-->

---
layout: center
---
# Vertrag 1: Verhalten

<ContractScorecard :achieved="['behavior']" />

<!--
12:05 bis 12:30.

Der erste Vertrag ist sichtbar geschützt. Der Browser-Test scheitert an demselben Hindernis wie der Kunde.

TRANSITION: Ein einzelner Klick ist ein guter Beweis. Jetzt skalieren wir dieselbe Idee auf einen vollständigen Kaufvorgang.
-->

---
layout: center
clicks: 3
---
# Ein vollständiger Kaufvorgang

<Steps :steps="['Produkt', 'Warenkorb', 'Checkout', 'Bestätigung']" />

<!--
12:30 bis 13:10.

Der nächste Test folgt einem vollständigen Kaufvorgang innerhalb der gerenderten Vue-Anwendung.

Ein Kunde wählt das Plüschtier.

[click] Der Kunde öffnet den Warenkorb.

[click] Der Kunde gibt seine Daten ein und bestellt.

[click] Die sichtbare Bestätigung ist das Ergebnis.
-->

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

<!--
13:10 bis 14:45.

Der Test liest sich wie die Aufgabe des Kunden.

[click] Diese Zeilen sind Handlungen. Die Implementierungsdetails der Vue-Komponenten bleiben verborgen.

[click] Die Assertion bleibt im Test. Ein Leser erkennt sofort, welches Ergebnis den Kaufvorgang beweist.

[click] Zum Schluss den vollständigen Test wieder hell zeigen.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/purchase.browser.test.ts
-->

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

<!--
14:45 bis 16:30.

Das ist die enterCustomer-Methode aus dem gerade verwendeten renderShop-Helper, nur umgebrochen.
Der Helper bündelt wiederkehrende Rollenabfragen. Ändert sich eine Beschriftung, gibt es eine Stelle zum Anpassen.
Er versteckt weder eine Wartezeit noch das erwartete Ergebnis. Ein Helper lohnt sich, wenn mehrere Tests dieselben Handlungen brauchen.
Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/shop-page.ts
-->

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

<!--
16:30 bis 18:30.

Oben steht die echte Factory aus cart-line.ts, nur kompakter formatiert. Unten ist die Versand-Assertion aus shipping.unit.test.ts auf ihren relevanten Teil gekürzt.
Die Factory liefert gültige Standarddaten. Der Test nennt nur die für diese Regel wichtige Abweichung: quantity 3.
Keine universelle Zufallsdaten-Fabrik bauen. Diese kleine Funktion beschreibt genau einen gültigen Warenkorbposten.
Quellen: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/cart-line.ts; /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/shipping.unit.test.ts
-->

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

<!--
18:30 bis 19:35.

Integration bedeutet hier nicht das komplette Produktionssystem.

[click] Der Test integriert die echten Vue-Komponenten, ihren Zustand, CSS und die Benutzerinteraktionen.

[click] Externe Systeme bleiben an ihren Grenzen ersetzt. Die End-to-End-Suite übernimmt später die vollständige Anwendung.

Quelle: research/raw/2025-12-14-vue-3-testing-pyramid-vitest-browser-mode.md
-->

---
layout: default
---
<PartSlide part="2" title="Accessibility" subtitle="Stimmen Bedeutung und Bedienung?" />

<!--
19:35 bis 19:55.

Accessibility ist der zweite Vertrag einer Komponente: Welche Bedeutung vermittelt sie, und kann ein Nutzer sie mit Tastatur und Fokus bedienen?
-->

---
layout: default
---

# Sichtbarer Inhalt und zugänglicher Zustand

<TabsContractDemo />

<!--
19:55 bis 21:55.

Wechsel vom Demo-Shop zur Component Library: Dieser Fall basiert auf einem absichtlich defekten Tab-Widget aus dem Reka-Vergleichskorpus. Es ist kein behaupteter Fehler der aktuellen Reka-Version.
Hier zeigen wir eine vereinfachte interaktive Rekonstruktion. Zuerst Account fokussieren und ArrowRight drücken: Password ist sichtbar und gemeldet.
Dann „Defekt einbauen“ klicken: Password bleibt sichtbar, ARIA meldet Account. Rechts stehen die aus den Attributen abgeleiteten Namen, kein Live-Screenreader.
Quelle: /Users/alexanderopalic/Projects/reka-ui-bench-mark/MIGRATING-TO-BROWSER-MODE.md, Abschnitt Valid is not the same as correct
-->

---
layout: two-cols-header
zoom: 0.9
---
# Axe bleibt grün

::left::

## Sichtbarer Inhalt

```text
Password

Change your password here.
```

::right::

## Accessibility-Modell

```text
tab "Account" [selected]
tabpanel "Account"
```

<div v-click class="mt-10 text-center text-2xl">
Jedes Attribut ist gültig. Die gemeinsame Bedeutung ist falsch.
</div>

<!--
21:55 bis 23:15.

Axe meldet null Violations. Das ist kein Fehler von Axe. Ein Regelwerk weiß nicht, welchen Tab die Anwendung gerade auswählen wollte.

[click] Erst der Zusammenhang ist falsch. Genau diesen Produktvertrag hält ein ARIA Snapshot fest.

Quellen:
- /Users/alexanderopalic/Projects/reka-ui-bench-mark/MIGRATING-TO-BROWSER-MODE.md
- /Users/alexanderopalic/Projects/reka-ui-bench-mark/A11Y-FINDINGS.md
-->

---
layout: default
class: talk-code
---
# Tastatur, Bedeutung und Auswahl prüfen

```ts {1-3|4-10|11-12|all}
await account.click()
await userEvent.keyboard('{ArrowRight}')
await expect.element(password).toHaveFocus()
await expect.element(document.body).toMatchAriaInlineSnapshot(`
  - tablist "Manage your account":
    - tab "Account"
    - tab "Password" [selected]
  - tabpanel "Password":
    - paragraph: Change your password here. After saving, you'll be logged out.
`)
await expect.element(page.getByRole('tab', { selected: true }))
  .toHaveLength(1)
```

<style>
pre code { white-space: pre-wrap; overflow-wrap: anywhere; }
</style>

<!--
23:15 bis 25:30.

Der Test beginnt mit echter Bedienung. ArrowRight bewegt Fokus und Auswahl.

[click] Der Snapshot prüft Rollen, berechnete Namen, Hierarchie und den ausgewählten Zustand als eine Bedeutung.

[click] Die zusätzliche Rollenabfrage beweist, dass genau ein Tab ausgewählt ist.

[click] Den vollständigen Ausschnitt wieder hell zeigen.

Quelle: /Users/alexanderopalic/Projects/reka-ui-bench-mark/packages/core/src/Tabs/Tabs.aria.browser.test.ts
-->

---
layout: center
---
# Vertrag 2: Accessibility

<ContractScorecard :achieved="['behavior', 'accessibility']" />

<!--
25:30 bis 26:00.

Der zweite Vertrag ist geschützt. Axe prüft allgemeine Regeln. Der Snapshot hält die konkrete Bedeutung fest. Die Tastatureingabe und die Fokus-Assertion prüfen die Bedienung.

Quelle: /Users/alexanderopalic/Projects/reka-ui-bench-mark/MIGRATING-TO-BROWSER-MODE.md
-->

---
layout: default
---
<PartSlide part="3" title="Darstellung" subtitle="Sieht die Komponente richtig aus?" />

<!--
26:00 bis 26:20.

Eine Komponente kann bedienbar und semantisch korrekt sein, aber sichtbar falsch aussehen.
-->

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

<!--
26:20 bis 28:15.

Ein funktionaler Test kann absichtlich blind für Gestaltung sein. Für ausgewählte visuelle Verträge brauchen wir einen anderen Test. Dieser Test wartet auf die variablen Eingaben. Danach vergleicht er nur die Produktkarte.

Ein Screenshot verdient seinen Platz, wenn die sichtbare Darstellung Teil des Vertrags ist.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/product-card.visual.test.ts
-->

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

<!--
28:15 bis 30:15.

Die absichtlich geänderte Buttonfarbe beeinflusst den Kaufvorgang nicht. Der funktionale Browser-Test bleibt grün. Der Screenshot-Test zeigt exakt die betroffene Fläche.

Wir aktualisieren die Referenz nicht blind. Wir prüfen zuerst, ob die Änderung beabsichtigt ist.

Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
-->

---
layout: center
---
# Drei Verträge, drei rote Tests

<ContractScorecard :achieved="['behavior', 'accessibility', 'visual']" />

<!--
30:15 bis 30:45.

Jeder rote Test beschreibt einen anderen gebrochenen Vertrag. Keiner ersetzt die beiden anderen.

Der Browser stellt für alle drei dieselbe gerenderte Komponente bereit.
-->

---
layout: default
---
<PartSlide part="4" title="Testgrenzen" subtitle="Welche Laufzeit enthält das echte Risiko?" />

<!--
30:45 bis 31:05.

Die drei Verträge sind vollständig. Jetzt wechseln wir von der Frage, was wir prüfen, zur Frage, wo der jeweilige Test laufen soll.
-->

---
layout: center
clicks: 3
---
# Welcher Test gehört wohin?

<RoughSvg :width="800" :height="240" :padding="24">
  <RoughNode id="node" :x="0" :y="70" label="Node" sublabel="reine Logik" variant="muted" />
  <RoughNode id="component" :x="300" :y="70" label="Browser Mode" sublabel="Komponentenverhalten" variant="accent" :step="1" />
  <RoughNode id="app" :x="600" :y="70" label="Playwright" sublabel="gebaute Anwendung" variant="success" :step="2" />
  <RoughEdge from="node" to="component" label="Browser-Risiko" :step="1" />
  <RoughEdge from="component" to="app" label="System-Risiko" :step="2" />
</RoughSvg>

<div v-click="3" class="mt-6 text-2xl text-center">
Teste auf der kleinsten Ebene, die das echte Risiko noch enthält.
</div>

<!--
31:05 bis 33:00.

Node prüft Berechnungen ohne DOM.

[click] Browser Mode prüft Komponenten mit echtem DOM, CSS, Fokus und Browser-APIs.

[click] Playwright besucht die gebaute Nuxt-Anwendung. Nur dort sehen wir Server-Rendering, Hydration, Routing und Produktions-Assets.

[click] Die höchste Ebene ist nicht automatisch die beste. Der Test muss das relevante Risiko enthalten.

Quelle: research/wiki/browser-native-component-testing.md
-->

---
layout: default
---

# Meine PWA: ein Erfahrungswert

<div class="grid grid-cols-3 gap-8 mt-10 text-center">
<div><div class="text-5xl">≈ 70 %</div><p>Integration</p></div>
<div><div class="text-5xl">≈ 20 %</div><p>Unit-Tests</p></div>
<div><div class="text-5xl">≈ 10 %</div><p>Visuell und Accessibility</p></div>
</div>

<div class="mt-10 text-2xl">82 Tests: 53,72 s in JSDOM → 13,59 s im Browser</div>

<div class="mt-5 text-xl">Projektmessung · beide Läufe mit vier Fehlern · kein allgemeiner Faktor vier</div>

<!--
33:00 bis 34:55.

Diese Werte erklären die Ankündigung des Vortrags. Sie stammen aus meiner PWA, nicht aus dem Demo-Shop und nicht aus einem kontrollierten allgemeinen Benchmark.
70/20/10 beschreibt die damalige Einteilung dieser Suite. Visuell und Accessibility sind Prüfziele, die auch in Integrationstests vorkommen können; die Kategorien sind keine universelle Taxonomie.
Die Testing Trophy begründet Integration über Vertrauen und Wartungsaufwand, nicht über eine feste Quote. Messt eure eigene Suite und wählt Tests nach eurem Risiko.
Quellen: research/raw/2025-12-14-vue-3-testing-pyramid-vitest-browser-mode.md; research/wiki/testing-strategy-by-confidence-and-cost.md
-->

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

<!--
34:55 bis 36:15.

Nur die relevanten Zeilen des Browser-Projekts zeigen. Vue-Plugin, übrige Projekte und Setup-Dateien stehen im verlinkten vollständigen Beispiel.
Der Browser-Test importiert render aus vitest-browser-vue, page und userEvent aus vitest/browser.
Die gezeigten Shop-Beispiele verwenden Vitest 5.0.0 und vitest-browser-vue 3.1.0. Versionen im Repository und dessen Lockfile sind maßgeblich.
Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/vitest.config.ts
-->

---
layout: two-cols-header
---
# Der erste Browser-Mode-Test

::left::

<div class="text-6xl font-700">1</div>

Wähle einen wichtigen Component Test.

<div class="mt-8 text-6xl font-700">2</div>

Portiere ihn neben den JSDOM-Test.

::right::

<div class="text-6xl font-700">3</div>

Nutze provider-gesteuerte Interaktionen.

<div class="mt-8 text-6xl font-700">4</div>

Baue einen echten Defekt ein.

<!--
36:15 bis 37:10.

Die Umstellung braucht keinen Big Bang. Beginnt mit einem wichtigen Ablauf und lasst den vorhandenen JSDOM-Test zunächst daneben laufen.

Nutzt provider-gesteuerte Interaktionen. Brecht danach bewusst das Verhalten, das der Test schützen soll. Ein beobachteter roter Test überzeugt stärker als ein Migrationsdokument.

Quelle: research/raw/2026-02-12-test-angular-components-like-a-real-user.md
-->

---
layout: statement
---
# Drei Fragen vor dem Merge

<div class="mt-10 text-3xl">Kann der Nutzer handeln?</div>
<div v-click class="mt-6 text-3xl">Stimmen Bedeutung und Bedienung?</div>
<div v-click class="mt-6 text-3xl">Bleibt die Darstellung korrekt?</div>

<!--
37:10 bis 37:40.

Diese Fragen machen die drei Verträge einer Komponente sichtbar.

[click] Accessibility braucht Regeln, Bedeutung und reale Bedienung.

[click] Visuelle Regression prüfen wir gezielt, wenn die Darstellung Teil des Vertrags ist.
-->

---
layout: statement
---
# Browser Mode<br>für Component Tests

Mein Default.

Reine Logik läuft in Node. Die gebaute Anwendung prüft Playwright End-to-End.

<!--
37:40 bis 38:00.

Wenn ihr nur einen Satz mitnehmt, dann diesen.

Gerenderte Komponenten starten im Vitest Browser Mode. Wir begründen Abweichungen über die Testgrenze, nicht den Browser über ein außergewöhnliches Risiko.

Vitest selbst empfiehlt Browser Mode für Component Testing. Unsere Reka-Migration erklärt, warum.

Quelle: /Users/alexanderopalic/Projects/opensource/vitest-dev/vitest/docs/guide/browser/component-testing.md
-->

---
layout: end
hideFooter: true
---
# Welchen Test migriert ihr morgen?

<div class="mt-10 text-xl opacity-70">Fragen · alexop.dev · Beispiele: claw-and-chew.vercel.app</div>

<!--
38:00 bis 45:00.

Danke. Ab Minute 38 bleiben fünf Minuten für Fragen und zwei Minuten Reserve.
-->

---
layout: center
---
<div class="text-center">

<div style="font-size:6rem;font-weight:700;line-height:1">53,72 s → 13,59 s</div>

<div style="margin-top:2rem;font-size:2rem;opacity:0.7">Dieselbe PWA-Suite mit 82 Tests.</div>

<div class="mt-8 text-xl opacity-70">Eine Projektmessung. Kein allgemeiner Benchmark.</div>

</div>

<!--
Backup zur Frage nach der Aussage aus dem Abstract.

Beide Läufe hatten vier fehlschlagende Tests. Die Messung stützt die Aussage für dieses Projekt. Sie isoliert nicht die Ursache und beweist keinen allgemeinen Faktor vier.

Quelle: research/raw/2025-12-14-vue-3-testing-pyramid-vitest-browser-mode.md
-->

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

<!--
Backup für ein zweites False-Green-Beispiel.

Ein strengerer Mock könnte den fehlenden Aufruf finden. Der Browser führt den Vertrag aus, statt ihn nachzubauen.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/testing.md
-->

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

<!--
Der JSDOM-Test entfernt das Element direkt. Er beweist nicht, dass ein Kunde es durch Scrollen erreichen kann. Browser Mode sendet echtes Wheel-Input und prüft die sichtbare Geometrie.

Quellen:
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/cart/CartDrawer.dom.test.ts
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/cart/CartDrawer.browser.test.ts
-->

---
layout: default
zoom: 0.9
---
# Der unerreichbare Warenkorb

<TestingLabExample example="unscrollable-bag" />

<!--
Im fokussierten Beispiel zuerst scrollen. Danach den Defekt aktivieren und erneut versuchen. Der letzte Entfernen-Button bleibt außerhalb des erreichbaren Bereichs.
-->

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

<!--
Der Defekt rechnet nach dem Resize weiter mit 400 Pixeln. Der JSDOM-Mock bestätigt genau diese erfundene Geometrie. Chromium misst 280 Pixel und macht die falsche Position sichtbar.

Quellen:
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/customizer/ShirtCustomizer.dom.test.ts
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/customizer/ShirtCustomizer.browser.test.ts
-->

---
layout: default
zoom: 0.9
---
# Resize vor dem Drag

<TestingLabExample example="fixed-preview-width" />

<!--
Zuerst „Resize preview“, dann „Calculate at 75%, 60%“: 75%, 60%. Alternativ das Maskottchen mit dem Pointer ziehen.
Danach „Introduce defect“, erneut verkleinern und berechnen: 53%, 60%. Die Berechnung nutzt absichtlich die vor dem Resize gemessene Breite.
Mit Working zurücksetzen und wiederholen. Die Simulation misst echte Browser-Geometrie, ist aber eine eigenständige Rekonstruktion des Shop-Defekts.
Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
-->

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

<!--
Hier wäre JSDOM gegen Browser Mode die falsche Gegenüberstellung. Beide starten ohne Server-HTML. Erst der End-to-End-Test besucht die gebaute Nuxt-Anwendung und kann den Mismatch beobachten.

Quellen:
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/components/Shop.browser.test.ts
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/tests/e2e/hydration.spec.ts
-->

---
layout: default
zoom: 0.9
---
# Hydration: die Grenze im Modell

<TestingLabExample example="hydration-mismatch" />

<!--
Diese Folie illustriert den Unterschied; sie führt keine Nuxt-Hydration aus. Den Defekt aktivieren. Links bleibt nur das T-Shirt im Server-HTML. Rechts erwartet der Client weiterhin alle vier Produkte. Genau diese Grenze kann der direkt gemountete Komponententest nicht enthalten.
-->

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

<!--
Backup für Grenzen und Trade-offs.

Die vorbereitete Hydration-Demo zeigt die Grenze konkret. Browser Mode mountet Shop.vue und bleibt grün. Playwright besucht die gebaute Nuxt-Anwendung und findet die Hydration-Diagnose.

Quellen:
- research/wiki/browser-native-component-testing.md
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/playwright-reference.md
-->
