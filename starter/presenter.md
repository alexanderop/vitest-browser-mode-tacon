# TACON presenter guide

34 Hauptfolien: 38 Minuten Vortrag, fünf Minuten Fragen und zwei Minuten Reserve. Folien 35–43 sind Backups. Die Zeitfenster in `slides.md` sind die verbindliche Planung; eine vollständige Sprechprobe steht noch aus.

## Start

Im Vortrag-Repository `pnpm dev` starten. Die ausgegebene Adresse öffnen, `p` öffnet den Presenter-Modus. Die Shop-Einführung nutzt ein lokales Bild; die interaktiven Folien benötigen kein Konferenz-WLAN.

Für die einzige geplante Live-Testsequenz zusätzlich im Shop starten:

```sh
cd /Users/alexanderopalic/Projects/opensource/claw-and-chew
pnpm demo status
```

Terminal mit großer Schrift vorbereiten. Vitest-Watcher stoppen. Benachrichtigungen ausschalten. Keine Builds oder anderen Suiten parallel zum quelltextverändernden Szenario-Verifier ausführen.

## Timing

| Folien | Zeit | Inhalt |
| --- | --- | --- |
| 1–3 | 0:00–2:00 | Frage, Beispiel-Shop, eine Publikumsfrage |
| 4–7 | 2:00–6:50 | JSDOM-Test, verdeckter Button, roter Browser-Test, drei Verträge |
| 8–12 | 6:50–12:30 | Browser-Laufzeit, Black-Box-Strategie, Locator-Vergleich |
| 13–17 | 12:30–19:35 | Kaufvorgang, Page Object, Factory, Integrationsgrenze |
| 18–22 | 19:35–26:00 | Tabs-Demonstration, axe, ARIA-Snapshot, Tastatur |
| 23–26 | 26:00–30:45 | Screenshot-Test, tatsächlicher Diff, drei Verträge |
| 27–30 | 30:45–36:15 | Testgrenzen, PWA-Messung, Browser-Konfiguration |
| 31–33 | 36:15–38:00 | Migration und Empfehlung |
| 34 | 38:00–45:00 | Fragen und Reserve |

## Verdeckter Button: Folien 5–6

Folie 5 ist eine eigenständige interaktive Rekonstruktion. Zuerst Working → Add plush: Zähler 1. Dann Introduce defect → Add plush: Zähler 0. Dispatch a direct DOM click ruft `HTMLButtonElement.click()` auf demselben Produktbutton auf; dessen Handler erhöht den Zähler trotz verdeckender Ebene.

Folie 6 zeigt die Testsequenz aus dem eigentlichen Shop. Befehle einzeln ausführen:

```sh
pnpm demo blocked-button
pnpm exec vitest run --project jsdom app/catalog/ProductCard.dom.test.ts
pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts
pnpm demo reset
pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts
```

Erwartung: JSDOM grün, Browser rot wegen abgefangenem Pointer-Input, nach Reset Browser grün. Nicht mit `force` klicken. Auch nach einem Abbruch immer zurücksetzen. Für diese Sequenz maximal 90 Sekunden verwenden; danach die vorbereitete Meldung auf der Folie erklären. Die lokale Interaktion auf Folie 5 trägt den Beweis auch bei einem Terminalproblem.

Für eine Probe mit gespeicherten Ergebnissen:

```sh
node scripts/verify-scenarios.mjs blocked-button
```

## Kaufvorgang und Helper: Folien 13–17

Die Folien verwenden `talk/tacon/purchase.browser.test.ts`, `shop-page.ts`, `cart-line.ts` und `shipping.unit.test.ts` aus dem Shop. Die Factory ist echt; die Versand-Assertion ist auf `shipping` gekürzt. Der interne Ref-Test auf Folie 10 ist ausdrücklich ein didaktisches Gegenbeispiel.

```sh
pnpm exec vitest run --config talk/vitest.tacon.config.ts --project browser
pnpm exec vitest run --config talk/vitest.tacon.config.ts --project unit
```

Die Assertion bleibt sichtbar im Test. Das Page Object bündelt wiederkehrende Nutzerhandlungen. Der Kaufvorgang mountet Vue-Komponenten; Server, Zahlung und Versand sind damit nicht bewiesen.

## Accessibility: Folien 19–21

Die interaktive Tabs-Folie ist eine vereinfachte Rekonstruktion eines **absichtlich eingebauten Defekts** aus dem Reka-Vergleichskorpus, kein behaupteter Fehler der aktuellen Reka-Version.

1. Account anklicken und ArrowRight drücken: Password-Inhalt und Password-Bedeutung stimmen überein.
2. Defekt einbauen: Inhalt bleibt Password, ARIA meldet Account.
3. Folie 20 zeigt das gespeicherte axe-Ergebnis des Quellversuchs. Auf der interaktiven Folie läuft kein axe-Audit; die rechte Spalte erklärt die gesetzten Attribute und ist kein Screenreader.
4. Folie 21 erklärt den vollständigen Password-Text aus dem echten Test. Keyboard und Fokus prüfen Bedienung, der Snapshot Bedeutung, die zusätzliche Assertion genau einen ausgewählten Tab.

Quelltest bei einer Probe:

```sh
cd /Users/alexanderopalic/Projects/reka-ui-bench-mark
pnpm --filter reka-ui exec vitest run --project=browser src/Tabs/Tabs.aria.browser.test.ts
```

axe, Rollenabfragen und ARIA-Snapshots ersetzen keinen vollständigen Accessibility-Audit. Semantische Locators geben Feedback zu Namen und Rollen; sie erzeugen keine vollständige Barrierefreiheit als Nebenprodukt.

## Visueller Vertrag: Folien 24–25

Die tatsächlichen Referenz-, Ist- und Diff-Bilder sind lokal eingebettet. Im Vortrag keinen zusätzlichen visuellen Testlauf starten. Bilder und Fonts abwarten, Viewport und Ausführungsumgebung kontrollieren, nur relevante Komponenten erfassen. Geänderte Referenzen immer prüfen.

Optional zur Probe im Shop:

```sh
pnpm exec vitest run --config talk/vitest.tacon.config.ts --project visual
```

## Projektmessung: Folie 29

70/20/10 und 53,72 → 13,59 Sekunden stammen aus der beschriebenen PWA, nicht aus Claw & Chew. Beide Läufe hatten vier fehlgeschlagene Tests. Kein kontrollierter allgemeiner Benchmark und keine vorgeschriebene Testverteilung. Accessibility und visuelle Assertions können Bestandteil von Integrationstests sein.

## Backup-Folien 35–43

35: Messung im Detail. 36: Pointer Capture. 37–38: Scrollbarkeit. 39–40: Resize-Geometrie. 41–43: Hydration und Grenzen.

Folie 40 misst Browser-Geometrie. Erst Resize preview und Calculate at 75%, 60% im Working-Zustand: 75%, 60%. Dann Introduce defect, Resize, Calculate: 53%, 60%. Auch freies Ziehen mit dem Pointer ist möglich. Die fehlerhafte Variante verwendet die vor dem Resize gemessene Breite.

Die Hydration-Gegenüberstellung auf Folie 42 ist ein Modell, keine laufende Server-Hydration. Der echte Nachweis benötigt die gebaute Nuxt-App:

```sh
pnpm demo:verify:hydration
```

## Kürzen bei Zeitverlust

Alle drei Verträge beibehalten. Page Object und Factory jeweils auf Kernzeile plus einen Satz kürzen; Konfiguration nur verlinken. Spätestens bei Minute 36 zur Migration wechseln, bei Minute 38 Fragen öffnen. Die Aussage zur projektbezogenen Geschwindigkeitsmessung ausdrücklich einordnen, auch wenn die Erklärung kurz ausfällt.

## Quellen und Versionen

Quellen stehen in den Foliennotizen und in `research/wiki/index.md`. Shop-Beispiele: Vitest 5.0.0, vitest-browser-vue 3.1.0. Der historische Dokumentations-Capture bezieht sich auf Vitest 4.1.11. Ausführbare Beispiele und Lockfiles sind für die Probe maßgeblich.

Shop-Bilder und Screenshot-Diff stammen aus den vorbereiteten Browseraufnahmen. Das Hamcrab-Bild illustriert die drei Verträge; es ist kein Testergebnis.
