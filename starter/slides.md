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
layout: iframe
url: https://claw-and-chew.vercel.app/
---

<!--
0:40 bis 1:40.

Kurz durch den Shop klicken, das Plüschtier in den Warenkorb legen und den simulierten Checkout abschließen.

Claw & Chew ist das Beispiel, das wir im gesamten Vortrag verwenden. Der Shop rekonstruiert die Testprobleme aus meiner produktiven Vue-PWA. Die Zahlen später im Vortrag stammen aus der PWA. Die ausführbaren Beispiele stammen aus diesem Shop.

Nachdem der Fokus im Iframe liegt, im Presenter-Modus zur nächsten Folie wechseln.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/walkthrough.md
-->

---
layout: default
---

# Vue innerhalb von Nuxt

<ProjectArchitecture />

<!--
1:40 bis 2:15.

Unser Beispiel ist eine Nuxt-Anwendung. Wer Vue kennt, kennt bereits die Oberfläche mit Shop, Warenkorb und Checkout.

[click] Nuxt organisiert daraus eine vollständige Webanwendung.

[click] Dazu gehören Routing, Server-Rendering und Serverfunktionen.

[click] Für die Teststrategie ist diese Grenze wichtig. Eine Vue-Komponente kann isoliert funktionieren, während die gebaute Nuxt-Anwendung trotzdem an Routing, Server-Rendering oder Hydration scheitert.

Quellen:
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/README.md
- research/wiki/browser-native-component-testing.md
-->

---
layout: statement
---

# Warum testen wir?

<div class="mt-10 text-3xl">
Wir wollen Änderungen ausliefern, ohne unbemerkt bestehendes Verhalten zu brechen.
</div>

<div v-click class="mt-12 text-2xl opacity-70">
Ein guter Test warnt uns vor einer Regression, bevor sie den Kunden erreicht.
</div>

<!--
2:15 bis 2:45.

Automatisierte Tests geben einem Team Vertrauen bei Änderungen. Sie finden Regressionen früh und fördern klare Grenzen zwischen Logik, Komponenten und der vollständigen Anwendung.

[click] Die Anzahl der Tests ist dabei nicht das Ziel. Ein Test verdient seinen Platz, wenn er ein relevantes Risiko zuverlässig und verständlich abdeckt.

Quelle: research/wiki/testing-strategy-by-confidence-and-cost.md
-->

---
layout: statement
---

# Wer hat Vitest noch nie benutzt?

<div class="mt-12 text-3xl opacity-70">
Kurzes Handzeichen genügt.
</div>

<!--
2:45 bis 3:00.

Kurzes Handzeichen abfragen. Die Antwort ändert den Ablauf nicht. Ich erkläre Vitest jetzt einmal in 40 Sekunden, damit alle dieselbe Grundlage haben.
-->

---
layout: two-cols-header
---

# Vitest in 40 Sekunden

::left::

```ts {1|3-7|all}
import { expect, test } from 'vitest'

test('three plush toys ship free', () => {
  const cost = calculateShipping(3)

  expect(cost).toBe(0)
})
```

::right::

<div class="mt-4 text-2xl max-w-xl">

Vitest findet und startet Tests.

`test` beschreibt das Verhalten.

`expect` prüft das Ergebnis.

Beim Speichern laufen betroffene Tests erneut.

</div>

<div v-click class="mt-8 text-center text-2xl font-600">
Vitest nutzt Vite, um Anwendungscode im Test zu laden.
</div>

<!--
3:00 bis 3:40.

[click] Vitest stellt den Test Runner und die vertraute Test-API bereit.

[click] test benennt ein Verhalten. Die Funktion führt den Anwendungscode aus. expect vergleicht das beobachtete Ergebnis mit dem erwarteten Wert.

[click] Im Watch Mode startet Vitest betroffene Tests nach einer Änderung erneut. Weil Vitest Vite verwendet, kann es TypeScript, Vue-Komponenten und die Projektkonfiguration über dieselbe Frontend-Infrastruktur laden.

Quellen:
- https://vitest.dev/guide/why.html
- research/raw/2022-02-14-vitest-simplified.md
-->

---
layout: two-cols-header
zoom: 0.75
---

# Welche Tests laufen wo?

::left::

```ts {3-5|6-8|9-17}
test: {
  projects: [
    { test: {
      name: 'unit',
      environment: 'node',
      include: ['**/*.unit.test.ts'],
    } },
    { test: {
      name: 'jsdom',
      environment: 'jsdom',
      include: ['**/*.dom.test.ts'],
    } },
    { test: {
      name: 'browser',
      include: ['**/*.browser.test.ts'],
      browser: {
        enabled: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
    } },
  ],
}
```

::right::

<div class="mt-6 text-2xl max-w-xl">

`*.unit.test.ts` -> Node

`*.dom.test.ts` -> JSDOM

`*.browser.test.ts` -> Chromium

</div>

<div v-click class="mt-12 text-2xl font-600">
Die Config ordnet Testdateien einer Laufzeitumgebung zu.
</div>

<!--
3:40 bis 4:10.

Vitest wird in einer TypeScript-Datei konfiguriert. Über projects können wir mehrere benannte Testgruppen in derselben Suite definieren.

[click] Reine Logik läuft in Node. Das ist die Standardumgebung, hier schreiben wir sie ausdrücklich hin.

[click] Bestehende DOM-Tests können weiter in JSDOM laufen.

[click] Für Browser Mode aktivieren wir browser, wählen Playwright als Provider und starten die Tests hier in Chromium. Die include-Muster ordnen jede Testdatei dem passenden Projekt zu.

Das ist die zentrale Entscheidung: Nicht Vitest allein bestimmt die Realität des Tests, sondern die konfigurierte Laufzeitumgebung.

Quellen:
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/vitest.config.ts
- research/raw/2026-08-18-vitest-4-1-11-browser-mode-documentation.md
-->

---
layout: center
clicks: 3
---

# Drei Testebenen für ein Frontend

<RoughSvg :width="900" :height="250" :padding="24">
  <RoughNode id="unit" :x="0" :y="70" label="Unit" sublabel="reine Logik" :step="1" />
  <RoughNode id="component" :x="310" :y="70" label="Komponente" sublabel="Vue im Browser" variant="accent" :step="2" />
  <RoughNode id="e2e" :x="620" :y="70" label="End-to-End" sublabel="gebaute Nuxt-App" variant="success" :step="3" />
  <RoughEdge from="unit" to="component" :step="2" />
  <RoughEdge from="component" to="e2e" :step="3" />
</RoughSvg>

<!--
4:10 bis 4:30.

Eine moderne Frontend-Suite verteilt Risiken auf drei Ebenen.

[click] Unit-Tests prüfen kleine, isolierte Funktionen und Composables. Für reine Geschäftslogik brauchen wir keinen Browser.

[click] Komponententests mounten Vue-Komponenten. Sie prüfen Props, sichtbare Zustände und Interaktionen. Sobald CSS, Fokus, Layout oder Browser-APIs zum Risiko gehören, laufen diese Tests in einem echten Browser.

[click] End-to-End-Tests besuchen die gebaute Nuxt-Anwendung. Sie behalten die wenigen kritischen Abläufe, die Routing, Server-Rendering, Hydration, Assets oder echte Dienste brauchen.

Jede Ebene schützt vor anderen Fehlern. Die Architektur und das Risiko bestimmen die Verteilung. Es gibt keine feste Prozentzahl für jedes Projekt.

Quellen:
- research/wiki/browser-native-component-testing.md
- research/wiki/testing-strategy-by-confidence-and-cost.md
-->

---
layout: statement
---

# Kann der Kunde das Produkt wirklich kaufen?

<!--
4:30 bis 5:10.

Ich beginne nicht mit einer Konfiguration. Wir probieren den Shop so aus, wie ein Kunde ihn benutzt.
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

  await user.click(screen.getByRole('button', { name: 'Add The little claw plush to bag' }))

  expect(screen.getByLabelText('Bag count')).toHaveTextContent('1 items in bag')
})
```

<!--
5:10 bis 5:40.

Das ist der echte Test aus Claw & Chew. Er rendert die ProductCard, sucht den Button semantisch, klickt ihn mit user-event und prüft anschließend den sichtbaren Warenkorbstand.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/catalog/ProductCard.dom.test.ts
-->

---
layout: fact
---

# PASS

Der JSDOM-Test findet den Button, klickt ihn und sieht den neuen Warenkorbstand.

<!--
5:40 bis 6:00.

Zuerst führe ich den JSDOM-Test aus. Er ist vernünftig geschrieben. Er sucht den Button über Rolle und Namen, klickt ihn und prüft den sichtbaren Warenkorbstand.

Live: pnpm exec vitest run --project jsdom app/catalog/ProductCard.dom.test.ts
-->

---
layout: default
---

<BlockedButtonSlide />

<!--
6:00 bis 7:50.

Jetzt aktiviere ich den Defekt im echten Testing Lab. Die Dekoration erhält Pointer-Events und liegt über dem Button. Der JSDOM-Test bleibt grün. Im interaktiven Beispiel erreicht der Klick den Button nicht.

Live auf der Folie: „Introduce defect“ wählen und anschließend „Add plush to demo bag“ klicken. Der Zähler bleibt bei null. Mit „Dispatch a direct DOM click“ steigt er trotzdem auf eins.

Live: pnpm demo blocked-button
Live: pnpm exec vitest run --project jsdom app/catalog/ProductCard.dom.test.ts

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/learn/LearningGuide.vue

Falls die Live-Demo scheitert, nutze das gespeicherte Szenario aus artifacts/scenarios.
-->

---
layout: two-cols-header
---

# Grün ist nicht gleich grün

::left::

<div class="text-center">

## JSDOM

Der Code reagiert auf ein ausgelöstes Event.

</div>

::right::

<div class="text-center">

## Chromium

Der Nutzer kann das Event tatsächlich auslösen.

</div>

<!--
7:50 bis 9:20.

Browser Mode schlägt jetzt fehl. Playwright meldet, dass ein anderes Element den Pointer-Input abfängt.

Der Unterschied liegt nicht in der Assertion. Beide Tests prüfen denselben Warenkorbstand. Der Unterschied liegt in der Interaktion.

Live: pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts

Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
-->

---
layout: statement
---

# Teste Verhalten, das Nutzer beobachten können

<div v-click class="mt-12 text-2xl opacity-70">
Nutze einen echten Browser, sobald Browser-Verhalten Teil des Risikos ist.
</div>

<!--
9:20 bis 11:00.

Das ist die zentrale Regel des Vortrags. Ein Black-Box-Test kennt die öffentliche Bedienung und das sichtbare Ergebnis. Er kennt keine privaten Refs oder Methoden.

[click] Der zweite Satz entscheidet über die Umgebung. Reine Berechnungen brauchen keinen Browser. Ein Klick, Fokus, Layout oder eine Browser-API kann den Browser zum Teil des Systems machen.

Quelle: research/wiki/testing-strategy-by-confidence-and-cost.md
-->

---
layout: Section
---

# Der Browser gehört zum System

<!--
11:00 bis 11:20.

Jetzt lösen wir auf, was Vitest Browser Mode an dieser Stelle verändert.
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
11:20 bis 12:40.

Der Test behält die Vitest-APIs.

[click] Vite lädt die Komponente, ihre Module und das echte Stylesheet.

[click] Der Testcode und die Anwendung laufen in Chromium. Playwright oder WebdriverIO steuert die Browser-Interaktionen über einen Provider.

Quelle: research/raw/2026-08-18-vitest-4-1-11-browser-mode-documentation.md
-->

---
layout: statement
---

# Ein echter Browser reicht allein nicht

<div v-click class="mt-10 text-2xl">Der Klick muss über den Browser-Provider laufen.</div>

<!--
12:40 bis 13:40.

Testcode kann auch im Browser direkt DOM-Events auslösen. Dann läuft der Test zwar in Chromium, umgeht aber weiterhin die Actionability-Prüfung.

[click] Die Vitest-Locators schicken die Interaktion an den Provider. Playwright kann dann prüfen, ob das Ziel erreichbar ist.

Quelle: research/raw/2026-02-12-test-angular-components-like-a-real-user.md
-->

---
layout: two-cols-header
zoom: 0.88
---

# Gleiche Absicht, andere Ausführung

::left::

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
13:40 bis 15:10.

Links steht der JSDOM-Test. Rechts steht Browser Mode. Die Absicht ist gleich. Beide suchen semantisch, klicken und prüfen sichtbaren Text.

Browser Mode rendert asynchron. Der Locator bleibt wiederverwendbar. expect.element wartet auf den sichtbaren Zustand.

Quellen:
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/catalog/ProductCard.dom.test.ts
- /Users/alexanderopalic/Projects/opensource/claw-and-chew/app/catalog/ProductCard.browser.test.ts
-->

---
layout: fact
---

# FAIL

`<div class="product-decoration">` intercepts pointer events

<!--
15:10 bis 16:30.

Diese Fehlermeldung beschreibt das Problem des Kunden und keine interne Methode.

Ich setze das Szenario jetzt zurück. Der Browser-Test läuft danach grün.

Live: pnpm demo reset
Live: pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts

Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
-->

---
layout: center
clicks: 4
---

# Ein vollständiger Kaufvorgang

<Steps :steps="['Produkt', 'Warenkorb', 'Checkout', 'Bestätigung']" />

<!--
16:30 bis 18:10.

Der nächste Test folgt einem vollständigen Kaufvorgang innerhalb der gerenderten Vue-Anwendung.

[click] Ein Kunde wählt das Plüschtier.

[click] Der Kunde öffnet den Warenkorb.

[click] Der Kunde gibt seine Daten ein und bestellt.

[click] Die sichtbare Bestätigung ist das Ergebnis.
-->

---
layout: code-editor
project: claw-and-chew
activeFile: purchase.browser.test.ts
tabs: purchase.browser.test.ts
files: |
  talk/tacon/
    purchase.browser.test.ts
---

```ts {all|4-7|8}
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
18:10 bis 19:50.

Der Test liest sich wie die Aufgabe des Kunden.

[click] Diese Zeilen sind Handlungen. Die Implementierungsdetails der Vue-Komponenten bleiben verborgen.

[click] Die Assertion bleibt im Test. Ein Leser erkennt sofort, welches Ergebnis den Kaufvorgang beweist.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/purchase.browser.test.ts
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
19:50 bis 21:30.

Integration bedeutet hier nicht das komplette Produktionssystem.

[click] Der Test integriert die echten Vue-Komponenten, ihren Zustand, CSS und die Benutzerinteraktionen.

[click] Externe Systeme bleiben an ihren Grenzen ersetzt. Die End-to-End-Suite übernimmt später die vollständige Anwendung.

Quelle: research/raw/2025-12-14-vue-3-testing-pyramid-vitest-browser-mode.md
-->

---
layout: two-cols-header
---

# Testdaten brauchen eine Factory

::left::

```ts
const lines = [
  aPlushLine({ quantity: 3 }),
]
```

::right::

```ts
export function aPlushLine(
  { quantity = 1 } = {},
): CartLine {
  return {
    key: 'plush-fixture',
    product,
    variant: 'One size · 18 cm',
    print: null,
    quantity,
  }
}
```

<!--
21:30 bis 23:50.

Factories lösen ein konkretes Problem. Tests brauchen kleine, gültige Daten mit wenigen relevanten Unterschieden.

Diese Factory ist bewusst eng. Sie erzeugt genau eine gültige Warenkorbzeile für das Plüschtier. Sie ist kein universeller Testdaten-Builder.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/cart-line.ts
-->

---
layout: two-cols-header
zoom: 0.9
---

# Wiederholte Handlungen bekommen ein Page Object

::left::

```ts
await screen
  .getByRole('button', {
    name: 'Add The little claw plush to bag',
  })
  .click()

await screen
  .getByRole('button', {
    name: 'Open bag, 1 items',
  })
  .click()
```

::right::

```ts
const shop = await renderShop()

await shop.addPlushAndCheckout()
await shop.enterCustomer({
  name: 'Claw Fan',
  email: 'fan@example.com',
})
await shop.placeOrder()
```

<!--
23:50 bis 26:10.

Ein Page Object bündelt wiederkehrende DOM-Interaktionen und ihre semantischen Locators.

Es darf die Sprache des Kunden verwenden. addPlushAndCheckout sagt mehr als clickFirstButton.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/shop-page.ts
-->

---
layout: statement
---

# Handlungen dürfen verschwinden

<div v-click class="mt-8 text-3xl">Die erwartete Wirkung bleibt im Test.</div>

<!--
26:10 bis 27:10.

Das ist meine Grenze für Page Objects.

[click] Wiederholte Handlungen dürfen hinter einer verständlichen Methode verschwinden. Die Assertion bleibt sichtbar. Sonst muss ein Leser zwei Dateien öffnen, um die Aussage des Tests zu verstehen.
-->

---
layout: center
---

# Die Verteilung in meiner PWA

<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4rem;margin-top:4rem;text-align:center">
  <div><div style="font-size:5rem;font-weight:700">70%</div><div style="margin-top:1rem;font-size:1.4rem">Browser-Integration</div></div>
  <div><div style="font-size:5rem;font-weight:700">20%</div><div style="margin-top:1rem;font-size:1.4rem">reine Logik</div></div>
  <div><div style="font-size:5rem;font-weight:700">10%</div><div style="margin-top:1rem;font-size:1.4rem">visuell und Accessibility</div></div>
</div>

<div class="mt-14 text-center text-xl opacity-70">Eine Fallstudie. Keine allgemeine Formel.</div>

<!--
27:10 bis 28:30.

Diese Verteilung beschreibt eine produktive lokale Vue-PWA. Sie entstand aus den Risiken und der Architektur dieses Projekts.

Die Grafik ist keine neue Testpyramide. Eine serverlastige Anwendung kann mehr End-to-End-Tests benötigen. Eine Bibliothek kann mehr Unit-Tests benötigen.

Quelle: research/raw/2025-12-14-vue-3-testing-pyramid-vitest-browser-mode.md
-->

---
layout: code-editor
project: claw-and-chew
activeFile: shipping.unit.test.ts
tabs: shipping.unit.test.ts
files: |
  talk/tacon/
    shipping.unit.test.ts
    cart-line.ts
---

```ts {all|5|6-11}
import { expect, test } from 'vitest'
import { summarize } from '../../app/cart/cart'
import { aPlushLine } from './cart-line'

test('three plush toys qualify for free shipping', () => {
  const lines = [aPlushLine({ quantity: 3 })]
  expect(summarize(lines)).toEqual({
    subtotal: 8400,
    count: 3,
    shipping: 0,
    total: 8400,
  })
})
```

<!--
28:30 bis 30:00.

Versandkosten sind reine Berechnung. Ein Browser würde hier nur Laufzeit und Setup hinzufügen.

[click] Die Factory erzeugt den relevanten Zustand.

[click] Der Test prüft den vollständigen fachlichen Wert gegen ein literales Ergebnis.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/shipping.unit.test.ts
-->

---
layout: two-cols-header
---

# Rollen und Namen werden Teil des Vertrags

::left::

```ts
screen.getByRole('dialog', {
  name: 'Checkout',
})

screen.getByRole('textbox', {
  name: 'Email address',
})
```

::right::

<div class="text-2xl leading-relaxed">

Der Test braucht eine erkennbare Rolle.

Der Test braucht einen zugänglichen Namen.

CSS-Klassen spielen keine Rolle.

</div>

<!--
30:00 bis 31:40.

Black-Box-Tests geben uns noch eine zweite Perspektive. Menschen finden Elemente nicht über Vue-Komponentennamen. Ein semantischer Locator fragt dieselben Informationen ab, die auch Hilfstechnologien aus dem Accessibility Tree erhalten.

Das belohnt gutes Markup. Es beweist aber nicht, dass die gesamte Anwendung barrierefrei ist.

Quelle: research/raw/2026-08-18-vitest-4-1-11-browser-mode-documentation.md
-->

---
layout: image-right
image: /shop/keyboard-focus.jpg
---

# Der Fokus muss sichtbar weiterwandern

Tab öffnet den Warenkorb.

Escape schließt ihn.

Der Fokus kehrt zum Auslöser zurück.

<!--
31:40 bis 33:00.

Dieses Beispiel zeigt echte Tastaturbedienung und den sichtbaren Fokus. Wenn es zeitlich passt, spiele ich die lokale Aufnahme ab. Sonst bleibt das Standbild.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/videos/browser-mode/keyboard-focus.mp4
-->

---
layout: statement
---

# Keine Violations bedeutet nicht, dass jede Prüfung lief

<div v-click class="mt-10 text-2xl opacity-70">
JSDOM meldet den Farbkontrast als unvollständig. Chromium berechnet ihn.
</div>

<!--
33:00 bis 34:30.

Der vorbereitete Kontrastdefekt macht einen Hinweis auf dunklem Hintergrund unlesbar. Beide Tests führen dieselbe axe-Regel aus.

[click] JSDOM meldet keine Verletzung, aber eine unvollständige Prüfung. Browser Mode berechnet die gerenderten Farben und findet den Fehler.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/testing.md
-->

---
layout: two-cols-header
---

# Ein Screenshot für einen konkreten Vertrag

::left::

```ts
const screen = await render(ProductCardHost)

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

<div class="text-2xl leading-relaxed">

Fester Viewport.

Geladene Bilder und Fonts.

Nur die relevante Komponente.

</div>

<!--
34:30 bis 36:30.

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
36:30 bis 38:50.

Die absichtlich geänderte Buttonfarbe beeinflusst den Kaufvorgang nicht. Der funktionale Browser-Test bleibt grün. Der Screenshot-Test zeigt exakt die betroffene Fläche.

Wir aktualisieren die Referenz nicht blind. Wir prüfen zuerst, ob die Änderung beabsichtigt ist.

Quelle: research/raw/2026-09-11-claw-and-chew-talk-examples.md
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
38:50 bis 40:50.

Node prüft Berechnungen ohne DOM.

[click] Browser Mode prüft Komponenten mit echtem DOM, CSS, Fokus und Browser-APIs.

[click] Playwright besucht die gebaute Nuxt-Anwendung. Nur dort sehen wir Server-Rendering, Hydration, Routing und Produktions-Assets.

[click] Die höchste Ebene ist nicht automatisch die beste. Der Test muss das relevante Risiko enthalten.

Quelle: research/wiki/browser-native-component-testing.md
-->

---
layout: two-cols-header
---

# So beginnt die Umstellung

::left::

<div class="text-6xl font-700">1</div>

Verschiebe reine Logik nach Node.

<div class="mt-8 text-6xl font-700">2</div>

Migriere einen wichtigen Komponentenablauf.

::right::

<div class="text-6xl font-700">3</div>

Nutze provider-gesteuerte Interaktionen.

<div class="mt-8 text-6xl font-700">4</div>

Entferne Browser-Mocks, die kein Szenario erzeugen.

<!--
40:50 bis 41:50.

Die Umstellung braucht keinen Big Bang. Beginnt mit einem wichtigen Ablauf, dessen Risiko JSDOM nicht gut abbildet.

Mocks für fachliche Szenarien dürfen bleiben. Mocks, die Browser-Verhalten erfinden, verdienen besondere Skepsis.

Quelle: research/raw/2026-02-12-test-angular-components-like-a-real-user.md
-->

---
layout: statement
---

# Was soll der Test beweisen?

<div v-click class="mt-10 text-3xl">Wähle danach die kleinste reale Umgebung.</div>

<!--
41:50 bis 42:30.

Wenn ihr nur einen Satz mitnehmt, dann diese Frage. Was soll dieser Test beweisen?

[click] Erst danach entscheidet ihr über Node, Browser Mode oder eine vollständige End-to-End-Anwendung.
-->

---
layout: end
hideFooter: true
---

# Fragen?

<div class="mt-10 text-xl opacity-70">alexop.dev</div>

<!--
42:30 bis 45:00.

Danke. Jetzt bleiben zwei bis fünf Minuten für Fragen.
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
Zuerst die Preview verkleinern und den Drag ausführen. Danach den Defekt aktivieren, erneut verkleinern und ziehen. Die falsche Berechnung landet bei 53%, 60% statt 75%, 60%.
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

# Server und Client widersprechen sich

<TestingLabExample example="hydration-mismatch" />

<!--
Den Defekt aktivieren. Links bleibt nur das T-Shirt im Server-HTML. Rechts erwartet der Client weiterhin alle vier Produkte. Genau diese Grenze kann der direkt gemountete Komponententest nicht enthalten.
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
