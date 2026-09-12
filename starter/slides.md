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
duration: 40min
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
layout: image-right
image: /shop/storefront.jpg
---

# Ein kleiner Shop

Ein Plüschtier.

Ein Warenkorb.

Ein Checkout.

<div v-click class="mt-10 text-2xl">Die Tests sind grün.</div>

<!--
0:40 bis 2:00.

Claw & Chew ist ein vorbereiteter Nuxt-Demo-Shop. Der Shop rekonstruiert die Testprobleme aus meiner produktiven Vue-PWA. Die Zahlen später im Vortrag stammen aus der PWA. Die ausführbaren Beispiele stammen aus diesem Shop.

[click] Die Tests sagen, dass ein Kunde das Plüschtier kaufen kann.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/walkthrough.md
-->

---
layout: statement
---

# Kann der Kunde das Produkt wirklich kaufen?

<!--
2:00 bis 2:40.

Ich beginne nicht mit einer Konfiguration. Wir probieren den Shop so aus, wie ein Kunde ihn benutzt.
-->

---
layout: fact
---

# PASS

Der JSDOM-Test findet den Button, klickt ihn und sieht den neuen Warenkorbstand.

<!--
2:40 bis 3:30.

Zuerst führe ich den JSDOM-Test aus. Er ist vernünftig geschrieben. Er sucht den Button über Rolle und Namen, klickt ihn und prüft den sichtbaren Warenkorbstand.

Live: pnpm exec vitest run --project jsdom app/catalog/ProductCard.dom.test.ts
-->

---
layout: image-right
image: /shop/add-to-bag.jpg
---

# Sichtbar, aber nicht klickbar

Eine dekorative Ebene liegt über dem Button.

Der Kunde klickt.

Nichts passiert.

<!--
3:30 bis 5:20.

Jetzt aktiviere ich den Defekt. Die Dekoration erhält Pointer-Events und liegt über dem Button. Der JSDOM-Test bleibt grün. Im Shop erreicht der Klick den Button nicht.

Live: pnpm demo blocked-button
Live: pnpm exec vitest run --project jsdom app/catalog/ProductCard.dom.test.ts

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
5:20 bis 6:50.

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
6:50 bis 8:30.

Das ist die zentrale Regel des Vortrags. Ein Black-Box-Test kennt die öffentliche Bedienung und das sichtbare Ergebnis. Er kennt keine privaten Refs oder Methoden.

[click] Der zweite Satz entscheidet über die Umgebung. Reine Berechnungen brauchen keinen Browser. Ein Klick, Fokus, Layout oder eine Browser-API kann den Browser zum Teil des Systems machen.

Quelle: research/wiki/testing-strategy-by-confidence-and-cost.md
-->

---
layout: Section
---

# Der Browser gehört zum System

<!--
8:30 bis 8:50.

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
8:50 bis 10:10.

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
10:10 bis 11:10.

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
11:10 bis 12:40.

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
12:40 bis 14:00.

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
14:00 bis 15:40.

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
15:40 bis 17:20.

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
17:20 bis 19:00.

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
19:00 bis 21:20.

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
21:20 bis 23:40.

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
23:40 bis 24:40.

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
24:40 bis 26:00.

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
26:00 bis 27:30.

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
27:30 bis 29:10.

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
29:10 bis 30:30.

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
30:30 bis 32:00.

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
32:00 bis 34:00.

Ein funktionaler Test kann absichtlich blind für Gestaltung sein. Für ausgewählte visuelle Verträge brauchen wir einen anderen Test. Dieser Test wartet auf die variablen Eingaben. Danach vergleicht er nur die Produktkarte.

Ein Screenshot verdient seinen Platz, wenn die sichtbare Darstellung Teil des Vertrags ist.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/tacon/product-card.visual.test.ts
-->

---
layout: center
---

# Die Interaktion bleibt grün

<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2.5rem;margin-top:2rem;text-align:center">
  <figure><img src="/shop/plush-card.png" style="width:100%;height:28rem;object-fit:contain" alt="Referenz der Produktkarte" /><figcaption style="margin-top:0.75rem;opacity:0.7">Referenz</figcaption></figure>
  <figure><img src="/shop/plush-card-actual.png" style="width:100%;height:28rem;object-fit:contain" alt="Produktkarte mit falscher Buttonfarbe" /><figcaption style="margin-top:0.75rem;opacity:0.7">Neue Darstellung</figcaption></figure>
  <figure><img src="/shop/plush-card-diff.png" style="width:100%;height:28rem;object-fit:contain" alt="Visueller Unterschied der Produktkarte" /><figcaption style="margin-top:0.75rem;opacity:0.7">Diff</figcaption></figure>
</div>

<!--
34:00 bis 36:20.

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
36:20 bis 38:20.

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
38:20 bis 39:20.

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
39:20 bis 40:00.

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
40:00 bis 45:00.

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
---

# Layout braucht Geometrie

::left::

## Scrollbarer Warenkorb

JSDOM entfernt das letzte Produkt.

Chromium erkennt, dass der Kunde den Button nicht erreichen kann.

::right::

## Responsive Customizer

JSDOM behält sein erfundenes Rechteck mit 400 Pixeln.

Chromium misst nach dem Resize 280 Pixel.

<!--
Backup für Fragen zu Scrollen, ResizeObserver und Layout.

Die Beispiele beweisen bestimmte Grenzen, nicht die Unfähigkeit jedes JSDOM-Tests.

Quelle: /Users/alexanderopalic/Projects/opensource/claw-and-chew/talk/testing.md
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
