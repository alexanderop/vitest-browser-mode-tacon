# TACON presenter guide

75 Hauptfolien einschließlich Fragen, danach der Backup-Trenner und 30 Backup-Folien (76–106). Geplant: 40 Minuten Inhalt und fünf Minuten Fragen. Die zusätzliche Locator-Minute nutzt die bisherige Reserve. Die Browser-Mode-Einführung erhält sechs Minuten; sie ersetzt die bisherige kurze Architektur-Erklärung. Diese Zeiten sind keine gemessene Sprechprobe.

Die Geschichte folgt dem Einkauf: Ich will das Plüschtier kaufen. Der Test ist grün, aber der Button funktioniert nicht. Wir erklären und reparieren diesen Widerspruch, prüfen danach den Kaufablauf, die Bedienung und die Darstellung. Nach der Erklärung des Button-Fehlers zeigen wir die drei Verträge als Überblick. Danach vertiefen wir Verhalten, Accessibility und Darstellung in dieser Reihenfolge. Testgrenzen und KI-Auftrag wenden das Gelernte an.

## Einstieg in die drei Kapitel

Zur Vertragsübersicht: „Drei Blickwinkel auf dieselbe Komponente. Für jeden legen wir fest, was ein grüner Test uns versprechen soll.“

Jedes Kapitel beginnt mit Kapitelnummer, Hamcrab und Leitfrage, danach folgt eine kurze Definition am Shop-Beispiel. Die Kapitelfolien ersetzen die bisherigen Übergänge. Die Definitionen jeweils kurz einordnen und direkt zum Beispiel wechseln. Die Blickwinkel überschneiden sich, etwa bei Tastaturverhalten und sichtbarem Fokus.

## Start und Vorbereitung

Im Vortrag-Repository `pnpm dev` starten und die ausgegebene Adresse öffnen. `p` öffnet den Presenter-Modus. Bilder und interaktive Rekonstruktionen liegen lokal. `ShopDemoFrame.vue` ist aktuell eine lokale interaktive Rekonstruktion des Shops, kein iframe der laufenden Nuxt-App. Das beim Einstieg kurz benennen. Die gespeicherten JSDOM-Ergebnisse stammen aus dem dokumentierten Quelltext-Vergleich.

Für die einzige Live-Testsequenz im Shop `/Users/alexanderopalic/Projects/opensource/claw-and-chew` zusätzlich `pnpm demo status` ausführen. Terminal mit großer Schrift vorbereiten, Vitest-Watcher stoppen und Benachrichtigungen ausschalten. Keine Builds oder anderen Suiten parallel zum quelltextverändernden Szenario-Verifier ausführen.

## Timing und Übergänge

| Folien | Zeit | Geschichte |
| --- | --- | --- |
| 1–6 | 0:00–3:00 | Testgrundlagen |
| 7–13 | 3:00–6:00 | Kaputter Button, grüner Test |
| 14–17 | 6:00–7:00 | Ursache und Übergang zu Browser Mode |
| 18–25 | 7:00–13:00 | Browser Mode und Vue-Setup |
| 26–30 | 13:00–16:00 | Browser findet den Fehler; Verhalten benennen |
| 31–36 | 16:00–18:30 | Ganzer Kaufablauf |
| 37–48 | 18:30–23:30 | Tastatur, Bedeutung und axe |
| 49–59 | 23:30–28:00 | Darstellung |
| 60–64 | 28:00–33:00 | Hydration, automatische Fixture und Testgrenzen |
| 65–72 | 33:00–37:00 | KI-Auftrag und sechs Migrationsschritte |
| 73–74 | 37:00–40:00 | Klickkosten und Schluss |
| 75 | 40:00–45:00 | Fünf Minuten Fragen |

Die Tabelle enthält historische Foliennummern; maßgeblich sind die Folientitel und der folgende Testgrenzen-Abschnitt. Ältere Detailabschnitte vor den Testgrenzen verwenden teilweise historische Nummern; dort nach Folientitel navigieren. Der gekürzte Testgrenzen-Abschnitt mit Fixture-Tipp bleibt auf fünf Minuten begrenzt; kein zusätzlicher Live-Test.

## Folien 1–9: Die offene Frage

Folie 1: „Ich lasse KI Code und Tests schreiben. Ich muss entscheiden, was ein grüner Test beweisen soll.“ Den Arbeitskontext kurz nennen; bis zur Lösung des Buttons keinen zweiten KI-Einstieg machen.

Folien 2–5 führen Testpyramide, Komponenten und Testumgebung ein. Die Pyramide ist eine Faustregel, keine Quote. Ein Mount von Shop mit echten Kindkomponenten kann deren Zusammenspiel prüfen. Komponenten sind kein viertes Stockwerk der Pyramide. jsdom/Happy DOM und Testumfang sind getrennte Entscheidungen; jsdom erzwingt keine Isolation. Das Bild um 2021 illustriert einen historischen Ansatz. Keine unbelegte Behauptung über Mehrheitsnutzung.

Folie 6: „Ich möchte dieses Plüschtier kaufen.“ Die Illustration zeigt die Absicht, keinen Testlauf.

Folie 7: Die lokale Shop-Rekonstruktion als solche benennen. Zweimal klicken und den unveränderten Bag-Zähler zeigen, dann „JSDOM-Ergebnis zeigen“ wählen. Die Warenkorb-Schublade verwendet feste Demoeinträge; sie eignet sich hier nicht als Beleg für einen leeren Warenkorb. Das Ergebnisbild ist gespeicherte Evidenz eines früheren Quelltext-Vergleichs, kein Test dieser Rekonstruktion.

Folie 8: Den Test von oben nach unten lesen: rendern, Button über Rolle und Namen finden, klicken, Warenkorbstand prüfen. Dieser Test ist bereits ein Black-Box-Test. Seine Entstehung nicht ohne Beleg der KI zuschreiben.

Folie 9: „Was soll dieser grüne Test beweisen? Dass ich das Plüschtier in den Warenkorb legen kann.“ Dann die Anschlussfrage aufdecken. Direkt zur Ursache gehen, keine Taxonomie dazwischenschieben.

## Folien 10–19: Den Widerspruch auflösen

Folie 10: „Eine Dekoration liegt über dem Button.“ In der lokalen Rekonstruktion zuerst „Introduce defect“ wählen. Der echte Klick erreicht den Button nicht. „Dispatch a direct DOM click“ erhöht dagegen den Zähler. Dieser Knopf ruft `HTMLButtonElement.click()` auf; er illustriert den Unterschied und ist nicht der user-event-Aufruf aus dem echten JSDOM-Test.

Folie 11: Gandalf kurz wirken lassen. „Was steckt technisch hinter unserem Türsteher?“

### Folien 12–17: Sechs Minuten Browser Mode

Die ersten vier Folien verwenden ganzflächige technische Diagrammbilder in `public/diagrams/browser-mode-*.png`. Sie sind vereinfachte Erklärbilder, keine Screenshots der Vitest-Oberfläche. Danach folgen zwei Codefolien mit schrittweiser Hervorhebung. Insgesamt sechs Minuten geplant, davon 1:00 für den Locator-Vergleich und 0:45 für die Assertion.

- **12 · Definition · 0:45:** Browser Mode ist ein Ausführungsmodus von Vitest. Testcode und Komponente laufen im echten Browser. `test` und `expect` bleiben vertraut; DOM, CSS und Layout kommen aus der Browser-Engine.
- **13 · Provider · 1:00:** Preview benötigt kein Playwright oder WebdriverIO. Es öffnet den lokalen Browser, simuliert aber Events. Für CI braucht es einen Automation-Provider; Preview unterstützt kein Headless. Auch lokal empfiehlt die Dokumentation Playwright oder WebdriverIO. „Wir verwenden ab jetzt Playwright.“ Preview ist echtes Rendering, aber keine gleichwertige Prüfung der Erreichbarkeit.
- **14 · Ausführungsorte · 1:15:** Links läuft Node: Vitest koordiniert, Vite liefert Module und CSS, Playwright steuert den Browser. Rechts verwaltet eine Orchestrator-Seite Test-Iframes. Testcode und Komponente laufen gemeinsam im Iframe. Bei aktivierter Isolation gibt es ein eigenes Iframe pro Testdatei, keinen neuen Browser pro `test()`.
- **15 · Klick-Rundweg · 1:15:** Den Code lesen und die vier Schritte verfolgen. Der Vitest-Locator sendet `__vitest_click` über WebSocket/RPC nach Node. Der Playwright-Provider ruft dort den Locator im Test-Iframe auf. Playwright prüft die Erreichbarkeit; die überlagernde Dekoration verhindert den normalen Klick. Kein `force` verwenden. Dieser Ablauf beschreibt den Playwright-Provider, nicht Preview.
- **16 · Locator behalten · 1:00:** Die drei Varianten sind Alternativen für denselben Klick, keine Abfolge von drei Käufen. Zunächst alles zeigen. [Klick 1] „Mit `.element()` verlange ich den DOM-Knoten genau jetzt. Fehlt der Button, wirft die Methode sofort. Ein zusätzliches `await` hilft nicht: `.element()` ist synchron.“ [Klick 2] „Behalte ich den Locator, kann Vitest das Element bei der Interaktion erneut suchen.“ Dasselbe gilt für `await userEvent.type(locator, '100')`. [Klick 3] „Den Klick kann ich direkt am Locator aufrufen.“ `userEvent` stammt hier aus `vitest/browser`, im früheren JSDOM-Test aus `@testing-library/user-event`. `.element()` bleibt für APIs sinnvoll, die einen echten DOM-Knoten verlangen. Die deutschen Button- und Status-Texte sind ein didaktisches Shop-Beispiel, kein wörtlicher Ausschnitt des englischen Claw-&-Chew-Tests.
- **17 · Assertions · 0:45:** [Klick 1] Ziel beschreiben, ohne den DOM-Knoten aufzulösen. [Klick 2] Aktion abwarten. [Klick 3] Erwarteten Zustand prüfen. Merksatz: „Locator erstellen: synchron. Aktion und Assertion: await. `.element()` nur, wenn ich wirklich einen DOM-Knoten brauche.“ `expect.element` verwendet intern `expect.poll`: Der DOM-Zustand wird wiederholt geprüft, bis die Assertion erfüllt oder das Zeitlimit erreicht ist. Testergebnisse gelangen per RPC zurück zu Vitest. Sichtbarkeit allein beweist nicht, dass ein anderes Element den Klick nicht abfängt. „Jetzt lassen wir unseren unveränderten Benutzerwunsch im Browser prüfen.“

Quellen: [Locator-Learning und API-Belege](research/raw/browser-mode-locator-maintainer-comment.md), `research/raw/2026-09-12-vitest-browser-internals.md`, `research/raw/2026-08-18-vitest-4-1-11-browser-mode-documentation.md`; lokale Preview-Dokumentation `docs/config/browser/preview.md` im Vitest-Checkout. Implementierungsstand `9bd8d464e`; sechs Minuten sind geplant, nicht durch eine Sprechprobe gemessen.

Folie 18 begleitet die einzige Live-Testsequenz:

```sh
pnpm demo blocked-button
pnpm exec vitest run --project jsdom app/catalog/ProductCard.dom.test.ts
pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts
pnpm demo reset
pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts
```

JSDOM grün, Browser rot wegen abgefangenem Pointer-Input, nach Reset Browser grün. Nicht mit `force` klicken. Nach spätestens 90 Sekunden abbrechen und den vorbereiteten Vergleich erklären. Auch nach einem Abbruch zurücksetzen. Die Folie fasst bereits belegte Ergebnisse zusammen; sie ist selbst kein Live-Testbericht.

Folie 19 schließt die Frage aus Folie 9: „Der Kunde kann das Plüschtier hinzufügen. Dieses beobachtbare Versprechen nennen wir einen Verhaltensvertrag.“ Das ist der erste erklärende Einsatz des Begriffs. Der konkrete Button-Vertrag ist geprüft, nicht jede Eigenschaft des Shops.

## Folien 20–21: Vom Button zur Bestellung

Übergang: „Ein Artikel im Warenkorb ist noch keine Bestellung. Dieselbe Idee können wir auf den ganzen Ablauf anwenden.“ Produkt, Warenkorb, Checkout, Bestätigung zeigen und anschließend den Test lesen.

Die Handlungen im Helper nur in einem Satz erklären; die Assertion bleibt sichtbar im Test. Page-Object-Code und Factory stehen im Backup. Der Test mountet echte Vue-Komponenten; Server, Zahlung und Versand sind damit nicht bewiesen. Diese Grenze nach den drei Beispielen gemeinsam erklären.

Quellen im Shop: `talk/tacon/purchase.browser.test.ts`, `shop-page.ts`, `cart-line.ts`, `shipping.unit.test.ts`. Probe bei Bedarf mit `pnpm exec vitest run --config talk/vitest.tacon.config.ts --project browser` beziehungsweise `--project unit`.

## Bedienung und Bedeutung: interaktive Demo und ARIA-Snapshot

Die Folie „Sichtbar gewechselt. Falsch gemeldet.“ bleibt interaktiv: Tabs bedienen, Defekt umschalten und Knoten im Accessibility Tree inspizieren. Die Kundenkonto-Komponente ist eine Demo-Rekonstruktion, kein implementiertes Konto im Shop.

Die Demo startet mit sichtbarem Password und aktivem Defekt: Account ist als ausgewählt gemeldet. Account anklicken und mit ArrowRight zu Password wechseln. Im Tree den falschen Panel-Namen zeigen. „Defekt aktiv“ ausschalten und den reparierten Zustand zeigen. Danach direkt zum ARIA-Snapshot übergehen.

„Den A11y-Tree als Erwartung speichern“: „Diesen Baum können wir Vitest als Erwartung geben. Rollen, Namen und Zustände werden zu einem lesbaren Snapshot.“ Links steht der geprüfte Sollzustand, rechts die gleiche Tab-Liste als Snapshot. Der Snapshot wird zunächst erzeugt und überprüft; bei späteren Läufen vergleicht Vitest damit. Inline steht er im Test, mit `toMatchAriaSnapshot()` liegt er in einer `.snap`-Datei. Experimentell ab Vitest 4.1.4, laut [offizieller Dokumentation](https://vitest.dev/guide/browser/aria-snapshots).

„Der Snapshot erkennt die falsche Auswahl“: „Wir erwarten Password mit selected. Im Defekt fehlt genau dieser Zustand. Nach der Reparatur erfüllt dieselbe Komponente dieselbe Erwartung.“ Der Ausschnitt setzt den vorher gezeigten Tastaturwechsel voraus und prüft nur die Tab-Liste. Fokus mit `toHaveFocus()` und Panel-Name mit `toHaveAccessibleName('Password')` bleiben zusätzliche Prüfungen. Vollständiger Test und einzelne Assertions stehen im Backup.

Nicht jede Snapshot-Änderung einfach mit `-u` übernehmen: zuerst entscheiden, ob sich die gewünschte Bedeutung geändert hat. Ein erzeugter Snapshot ist nicht automatisch eine korrekte Erwartung. HTML-Wrapper dürfen sich ändern, solange die geprüften semantischen Erwartungen weiter erfüllt sind. Der Snapshot ist ein aus dem DOM abgeleitetes semantisches Modell, keine Screenreader-Aufzeichnung und kein vollständiger Audit. Browser Mode entdeckt den ARIA-Fehler nicht automatisch; auch JSDOM kann diese Attribute prüfen. Details und Quelle: [Research-Synthese](research/wiki/browser-native-component-testing.md), [Guide-Capture](research/raw/2026-09-13-aria-snapshots-guide.md).

Anschließend bleibt der axe-Abschnitt erhalten. Die Tabs-Demo startet keinen axe-Audit. axe, Rollenabfragen und Snapshots ersetzen keinen vollständigen Accessibility-Audit.

## Folien 27–31: Darstellung und gemeinsames Modell

Folie 27: „Zurück zu unserer Produktkarte. Sie lässt sich bedienen. Kann trotzdem etwas falsch sein?“ Folie 28 zeigt zuerst Referenz, veränderte Farbe und Diff. Die Interaktion blieb im dokumentierten Versuch grün.

Erst danach auf Folie 29 den Screenshot-Test erklären: Bilder und Fonts abwarten, Umgebung und Viewport kontrollieren, relevante Komponente vergleichen. Die Aufnahmen sind lokale Ergebnisse des vorbereiteten Versuchs; keinen weiteren Live-Test starten. Optionale Probe: `pnpm exec vitest run --config talk/vitest.tacon.config.ts --project visual`.

Folie 30 begrenzt die Auswahl: eigene Core-UI-Zustände und fachliche Kompositionen mit konkretem Risiko. Keine Screenshots nach jedem Kaufschritt und keine blinde Aktualisierung der Referenzen.

Folie 31 führt die Namen zusammen: „Wir haben drei verschiedene Erwartungen geprüft: handeln können, richtige Bedeutung und Bedienung, richtige Darstellung.“ Das Bild fasst bekannte Beispiele zusammen. Es eröffnet kein neues Kapitel.

## Testgrenzen: Hydration und automatische Prüfung · fünf Minuten

Nach Folientiteln navigieren; die folgende Abfolge ersetzt die frühere Erklärung in sieben Schritten.

**Der Shop ist sichtbar. Jetzt übernimmt Vue. · 1:00:** „Unser Test hat Shop.vue mit seinen echten Komponenten gerendert. Unsere Nutzer öffnen eine URL.“ [Klick 1] „SSR heißt: Der Server erzeugt HTML; der Browser kann den Shop schon anzeigen.“ [Klick 2] „Vue verbindet dieses vorhandene HTML mit Zustand und Event-Handlern. Das nennt man Hydration. Der erste Client-Render muss zum Server-HTML passen.“ [Klick 3] „Unser direkter Mount überspringt diesen Übergang.“ Native Links oder Formulare können vor Hydration funktionieren; keine allgemeine Unbedienbarkeit behaupten.

**Server und Browser müssen zusammenpassen · 0:50:** „Server: Wearables. Client: All the good stuff. Zwei unterschiedliche Startkategorien.“ [Klick] „Der direkte Mount sieht nur den Client-Zustand. Der App-Test öffnet die URL und prüft zusätzlich auf Hydration-Mismatches.“ Rot ist die Diagnostic-Assertion, nicht notwendigerweise der Kauf. Das ist das Erklärmodell des vorbereiteten Defekts, kein neuer Live-Testlauf.

**Tipp: Hydration-Fehler automatisch prüfen · 1:30:** „Die Seite kann funktionieren und trotzdem einen Mismatch melden. Deshalb höre ich die Konsole mit.“ Fixture in einem Satz definieren: gemeinsamer Aufbau und Abschluss eines Tests. Drei Stellen zeigen: Listener registrieren, `await use()` führt den eigentlichen Test aus, danach gesammelte Meldungen prüfen. `auto: true` aktiviert den Guard für jeden Test, der unser erweitertes `test` importiert; niemand muss die Liste ausdrücklich anfordern. Der Code ist absichtlich auf Vue/Nuxt-Konsole begrenzt. React-Meldungen und `pageerror` wären weitere Signale.

Vor `page.goto` registrieren. Im Test auf ein verlässliches Client-Bereitschaftssignal warten und einen interaktiven Effekt prüfen. Ein sichtbarer SSR-Titel, `domcontentloaded` oder eine fixe Pause allein beweist keine abgeschlossene Hydration. Bei der Shop-Anwendung den vorhandenen Kaufablauf samt Warenkorb-Assertion verwenden. Später hydrierende Widgets müssen innerhalb des Testablaufs aktiviert und geprüft werden. Im Artikel ist `waitUntil: 'hydration'` Teil eines projektspezifischen goto-Helpers, keine Standardoption von Playwright. Der Beispielcode im Hauptteil wurde nicht als neuer Shop-E2E-Lauf ausgeführt.

**Dafür behalten wir Playwright-E2E · 1:00:** Drei Beispiele: Serverübergabe; geschützte URL mit Login und Rückkehr; echter Reload mit persistentem Warenkorb und ausgeliefertem Build. Das sind Prüffragen, keine Behauptung, der Demo-Shop besitze bereits eine Anmeldung. „Diese Wege brauchen die laufende Anwendung. Playwright ist unser Werkzeug dafür.“ Auch eine SPA kann zusätzliche Tests für direkte URLs, Persistenz und Offline-Start benötigen. Playwright als Vitest-Provider von seinem separaten E2E-Runner unterscheiden. Nicht die iframe-Isolation zur Ursache der Testlücke erklären.

**Was bleibt für unseren Shop echt? · 0:40:** Reale Komponenten, Zustand, Layout und Browser-Interaktion; kontrollierte externe Antworten, Zeit und Testdaten. Übergang zum KI-Auftrag.

Quellen: [vollständiger Artikel](research/raw/2026-09-13-hydration-playwright-user-article.md), [offizielle Verifikation und Grenzen](research/raw/2026-09-13-hydration-fixture-verification.md), [vorbereiteter Shop-Defekt](research/raw/2026-09-13-nuxt-test-boundaries.md). Die Behauptung, jede ungeprüfte SSR-App habe bereits einen Produktionsfehler, wird nicht übernommen. Offen bleibt ein projektspezifisches Bereitschaftssignal für jede zusätzlich getestete Route.

## Folien 64–70: KI-Auftrag und Rückkehr zur Leitfrage

Folie 64 liest sich als Auftrag für genau unseren Button: echte Komponenten, Rollen und Namen, provider-gesteuerter Klick, sichtbares Ergebnis, begründete Mocks. Die entscheidende Kontrolle: Button verdecken muss rot werden, Wiederherstellung wieder grün. Ein Browser allein garantiert keine guten Assertions.

Übergang zu Folie 65: „Für einen neuen Test kann ich das so formulieren. Und wenn ich eine bestehende Suite migriere?“ Die drei Werkstattbilder erzählen die Anwendung dieses Prinzips: Pilot prüfen, unabhängig reviewen, Anleitung verbessern. Je Bild etwa eine Minute; keine weitere Tool-Einführung.

Folie 68 ordnet die lokalen Klickkosten ein. Die zusätzliche Arbeit eines echten Klicks erklären; die Zahlen nicht als allgemeinen Benchmark verwenden.

Folie 69: Zurück zum Plüschtier. „Wir haben festgelegt, was der Klick bewirken muss, die passende Laufzeit gewählt und mit einem Defekt geprüft, ob der Test anschlägt. Diese Struktur gebe ich der KI.“ Die drei Schlusszeilen mit dem bekannten Beispiel verbinden.

Folie 70 öffnet die Fragen: „Was soll euer nächster Test beweisen?“

## Migration: sechs Schritte im Code-Editor

Folie 66 zeigt zuerst die Übersicht: 97 Dateien, zwei Testziele, Migration mit Review und Projekt-Memory. Den Loop betonen: Erkenntnisse in AGENTS.md und Prompts festhalten; der nächste Agent liest und nutzt sie. Verbessert werden die gespeicherten Anweisungen und der Arbeitsablauf, nicht automatisch die Modellgewichte. Dann folgen die Code-Editoren auf 67–72, zusammen etwa drei Minuten. Pro Schritt einen kurzen Gedanken erklären. Die Ausschnitte sind für die Folien gekürzt und nicht als vollständige Dateien ausführbar. Auf 67 ergänzt ein Klick das Browser-Projekt; auf 68 wechselt ein Klick vom Original zum Browser-Test einschließlich aktivem Tab. Auf 69–71 heben weitere Klicks die relevanten Zeilen hervor. Auf 72 steht eine redaktionelle Inventar-Zusammenfassung, keine Terminalaufnahme.

1. **Browser Mode parallel einrichten:** Reka-UI-Fork mit 97 jsdom-Testdateien. Bereits beim Setup gab es Inventar, Strukturvergleich und Coverage-Prüfung. Commit `bd93d9b1`.
2. **Slider migrieren:** 39 Tests portiert, Browser-Mocks entfernt. Beim gezielten Entfernen von `setPointerCapture` wurde der Browser-Test rot, während der jsdom-Test grün blieb. Commit `f050ec36`.
3. **Reine Logik nach Node:** Zehn Dateien ohne DOM erhielten ein eigenes Node-Projekt. Danach weitere Pilotdateien: useForwardExpose und Label. Commits `cb8fd28c`, `657fb236`, `9d66767d`.
4. **Migration und Review:** Ein Agent pro Datei, unabhängiger Reviewer mit Original und Port. Gleiche Test- und Assertion-Zahlen beweisen keine gleich starken Erwartungen; deshalb zusätzlich Review und gezielte Defekte.
5. **Anleitung verbessern:** Nach ersten Versuchen und Batches wiederverwendbare Prompts festgehalten. Erkenntnisse und Korrekturen in die Anweisungen übernommen, darunter die falsche Teleport-Regel. Commits `675792e3`, `8829a1bb`.
6. **Ergebnis:** 87 Browser-Gegenstücke und zehn Node-Dateien. jsdom-Originale als Vergleich behalten. Nach dem Migrationsabschluss folgte weitere Qualitätsarbeit. Commits `12d75a3b`, `864db198`.

Quellen: [Git-Chronologie](research/raw/2026-09-12-reka-migration-git-history.md) und [Prompts und Prüfablauf](research/raw/2026-09-12-reka-ai-migration.md). Checkout und Git am 13. September erneut gelesen. Historische Testergebnisse nicht erneut ausgeführt. Keine Aussage über aktive Arbeitsdauer oder KI-Zeitersparnis.

## Backup nach Frage auswählen

| Folien | Vertiefung |
| --- | --- |
| 71 | Backup-Trenner |
| 72–77 | Drei Verträge und vollständige ARIA-Beispiele |
| 78–80 | Scroll-Codevergleich, unerreichbarer Warenkorb, Resize-Demo |
| 81 | Fachlicher Ablauf und öffentlicher Komponentenvertrag |
| 82 | Nuxt-Test vom Server-HTML zum Warenkorb |
| 83–84 | SPA-Root-Mount und echte Workout-Scroll-Komponente |
| 85–86 | Entscheidungsmodell und drei Review-Fragen |
| 87 | Historische PWA-Zeitmessung, kein allgemeiner Benchmark |
| 88–91 | Weitere vorbereitete Shop-Defekte |
| 92–94 | Private Refs, Factory und überlappende Erwartungen |
| 95–96 | Pointer Capture und Resize-Codevergleich |
| 97–99 | Hydration-Vergleich, Rekonstruktion und Browser-Mode-Grenzen |
| 100–101 | JSDOM/Browser-API-Vergleich und Konfiguration |

Die Workout-Demo verwendet die lokal kopierte `src/components/ScrollFadeContainer.vue`: zum Ende scrollen, zurück zum Anfang, dann verbreitern. Verläufe verschwinden ohne Überlauf. Die Resize-Rekonstruktion ergibt im funktionierenden Zustand 75%, 60%, mit Defekt 53%, 60%; die echte Shop-Aufnahme hat andere Geometrie. Rekonstruktion und Aufnahme nicht gleichsetzen.

## Kürzen bei Zeitverlust

Den Button immer vollständig auflösen. Danach zuerst Erläuterungen zur Screenshot-Auswahl und den SPA-Vergleich kürzen. Keine Backup-Demos spontan in den Hauptteil ziehen. Spätestens Minute 33 zum KI-Auftrag wechseln. Die sechs Migrationsschritte lassen sich auf je einen Satz kürzen. Fragen möglichst bei Minute 39, spätestens bei Minute 40 öffnen.

## Quellen und Illustrationen

[Research-Index](research/wiki/index.md), [akzeptierte Erzählfolge](research/raw/2026-09-12-shop-story-revision.md), [ausgeführte Shop-Beispiele](research/raw/2026-09-11-claw-and-chew-talk-examples.md), [Grundlagen des Einstiegs](research/raw/2026-09-12-testing-basics-opening.md), [KI-Verträge](research/raw/2026-09-12-ai-test-contracts.md).

Die Aufzeichnungen nennen für die Shop-Beispiele Vitest 5.0.0 und vitest-browser-vue 3.1.0; der ältere Dokumentations-Capture bezieht sich auf Vitest 4.1.11. Für eine erneute Probe sind die aktuellen App-Checkouts und Lockfiles maßgeblich.

Sprechhinweise und detaillierte Quellen stehen in diesem Dokument, nicht in `slides.md`. Hamcrab-Bilder sind Illustrationen, keine Ausführungsergebnisse. Shop-Screenshot-Diffs stammen aus dem vorbereiteten Versuch.

Bildprompts: `../output/imagegen/testing-basics-prompts.json`, `frontend-components-one-mount-prompt.md`, `plush-purchase-intro-prompt.md` und `hamcrab-migration-prompts.json` im selben Verzeichnis. Folie 3 zeigt einen didaktischen Komponentenbaum, keine exakte Demo-Implementierung. Die Pfeile zeigen den Verhaltensfluss über gemeinsamen Zustand. Folie 6 illustriert die Kaufabsicht anhand einer Shop-Referenz. Die Migrationsfolien enthalten jetzt ausschließlich editierbaren Text.


## Ergänzung im Visual-Teil: GitHub Actions (ca. 60–90 Sekunden)

Nach „Ein Screenshot für einen konkreten Vertrag“ die beiden CI-Folien zeigen. „Der gleiche Test läuft bei jedem PR. Das vrt-Projekt ist separat konfiguriert: Playwright-Provider, Chromium, headless und ein fester Viewport. Node, pnpm und Checkout sind im Auszug ausgelassen. Playwright ist im Projekt gepinnt und wird über den Lockfile installiert. Bei Abweichungen lade ich Referenz, aktuelles Bild und Diff aus den Actions-Artefakten herunter.“ `include-hidden-files` nimmt den versteckten `.vitest`-Ordner mit. Den Beispieljob nicht als bereits installierte oder ausgeführte Pipeline bezeichnen.

„Ist die Änderung gewollt, starte ich einen separaten Workflow manuell auf meinem Feature-Branch. Er erzeugt mit --update Referenzen in derselben Umgebung. Bilder reviewen, committen, normalen PR-Check erneut starten. Ein Update darf den normalen Vergleich nicht ersetzen.“ Der kurze Update-Ablauf zeigt absichtlich keinen automatischen Push; die Quelle enthält einen ausführlicheren Bot-Commit-Ansatz. GitHub-hosted Runner können sich trotz gleicher Ubuntu-Bezeichnung verändern; Browser und Fonts kontrollieren, bei Bedarf ein festes Container-Image nutzen. Quelle: [Vitest Visual Regression Testing](research/raw/2026-09-12-vitest-visual-regression-ci.md).


## axe-Codefolie: Checkout statt Tabs

Nach dem ARIA-Snapshot den vorhandenen Checkout-Test zeigen. axe wird explizit importiert und aufgerufen; pnpm test:browser führt den Check automatisch mit aus. Browser-Setup lädt die echte Shop-CSS. Im gezeigten Auszug ist color-contrast bewusst die einzige Regel. Das Original prüft zusätzlich, dass diese Regel tatsächlich Knoten ausgewertet hat. Der aktuelle lokale Chromium-Lauf war grün; mit injiziertem low-contrast-notice-Defekt meldete dieselbe Assertion color-contrast. Keine Behauptung eines vollständigen Audits oder eines bereits ausgeführten Hosted-CI-Laufs. Tastatur, Fokus und produktspezifische Tab-Bedeutung bleiben eigene Assertions.

## Was kostet ein echter Klick?

Platzierung: nach „Der nächste Agent lernt mit“, vor „Wir definieren, was grün bedeutet“. Etwa eine Minute.

„Bei element.click() in jsdom löse ich direkt ein Klick-Event aus. Dafür muss keine Maus den Button erreichen. Playwright prüft beim locator.click(): Ist der Button sichtbar und aktiviert? Empfängt er Mausereignisse oder liegt etwas darüber? Bewegt er sich noch? Für die Stabilität müssen Position und Größe in zwei aufeinanderfolgenden Animationsframes gleich bleiben. Diese Wartezeit vergeht auch auf einem schnellen Rechner. In meiner Messung waren das ungefähr 18 Millisekunden. Danach werden Mausbewegung, Drücken und Loslassen über den Browser gesteuert. Die Kommunikation mit dem Browserprozess und die Verarbeitung der Eingaben kosten ebenfalls Zeit. Insgesamt waren es ungefähr 26 Millisekunden pro Klick. Viele Interaktionen summieren sich: Meine gesamte Suite brauchte etwa 13 Prozent länger.“

Quelle: [lokal erfasste PERFORMANCE.md](research/raw/2026-09-13-reka-click-performance.md), Abschnitte 1–4. Historische Messung, hier nicht wiederholt: M4 Pro, Chromium headless, Vitest 4.1.10. Suite: Median aus drei Läufen; 87 jsdom-Dateien gegenüber 87 Portierungen plus zwei Browser-Harness-Dateien. Die Mikrobenchmarks nutzen Schleifen mit 20–50 Operationen. jsdom-Vergleich ausdrücklich element.click(), nicht Testing Library userEvent.click(). Die 18 ms sind die gemessene Differenz zwischen normalem und erzwungenem Klick; force überspringt mehrere Actionability-Prüfungen, die Zuordnung zur Stabilität wird durch die separate Zwei-Frame-Messung gestützt. force ist hier ein Diagnosevergleich, keine Empfehlung zum Beschleunigen der Tests. Geringere Setup-Kosten gleichen einen Teil der teureren Interaktionen aus; die 13 Prozent lassen sich nicht allein aus einem Klick hochrechnen.


## Black-Box-Einschub nach der Verhalten-Definition (ca. 30 Sekunden)

„Mit Black Box meine ich: Mein Test bedient die Komponente von außen. Er klickt auf ‚In den Warenkorb‘ und prüft, ob das Plüschtier dort erscheint. Ob intern ein ref, ein Store oder eine andere Funktion dahintersteckt, ist für diesen Test egal. So kann ich die Implementierung umbauen, solange das erwartete Verhalten gleich bleibt.“

White-Box-Gegenpol nur mündlich: „Wenn ich direkt addToCart() aufrufe, weiß ich noch nicht, ob der Button überhaupt funktioniert.“ Übergang: „Dasselbe Prinzip gilt für die ganze Bestellung.“

Quelle: [eigener Blogartikel](research/raw/2025-04-19-stop-white-box-testing-vue.md). Black Box beschreibt die Teststrategie; auch der frühere JSDOM-Test arbeitet von außen. Die neue Folie ergänzt die obige, noch nicht neu eingeprobte Zeitplanung um etwa 30 Sekunden.


## Editor-Sequenz: Bestellung → Page Object → Factory

Nach „Vom Klick zur ganzen Bestellung“, etwa 2–3 Minuten.

1. **Direkter Test:** Die Bestellung einmal lesen. Erster Klick markiert die beiden Kundeneingaben: „Diese Schritte gehören zusammen.“ Zweiter Klick markiert die Assertion: „Dieses Ergebnis muss beim Umbau gleich bleiben.“
2. **Page Object:** Erster Klick bündelt die Eingaben in `enterCustomer()`. Zweiter Klick zeigt die weiteren Handlungen und den Bestätigungs-Locator. „Ein Page Object bündelt die Bedienung. Eine Klasse brauchen wir dafür nicht.“ Der Ausschnitt verwendet den `render`-Import aus `shop-page.ts`.
3. **Factory:** Rendern und Rückgabe erklären; dann zum Test wechseln. „Eine Factory ist eine Funktion, die ein Objekt erzeugt und zurückgibt. Hier bereitet `renderShop()` die Oberfläche und ihre Bedienung vor.“ Das ist eine Setup-Factory; eine Testdaten-Factory wäre ein separater Anwendungsfall.
4. **Fertiger Test:** Handlungskette, dann Assertion hervorheben. „Wir ändern die Struktur. Die Bestellung und das erwartete Ergebnis bleiben gleich.“ Lesbarkeit und Wiederverwendung verbessern sich; die Assertion bestimmt weiterhin, welches Verhalten abgesichert wird.

Die Editor-Schritte sind vorbereitete Code-Ausschnitte, keine ausführbare Testumgebung. Sie zerlegen den bestehenden `talk/tacon/shop-page.ts` aus Claw & Chew didaktisch in `createShopPage(screen)` und `renderShop()`. Button-Namen, Handlungen und Assertion bleiben gleich. Die frühere Page-Object-Backupfolie ist in diese Hauptsequenz integriert.


## Was prüft axe?

Direkt nach „axe: automatische Regeln, echte Browserdaten“. axe-core ist die Regelbibliothek; Vitest führt den Test aus. Namen, Labels und gültige ARIA-Attribute brauchen oft nur den DOM. Farbkontrast benötigt echte Renderingdaten und geladene Styles. Das ist kein exklusives Vitest-Feature: axe kann auch in anderen echten Browser-Testumgebungen laufen. JSDOM ist nur eingeschränkt unterstützt; die Tabelle zeigt Beispiele, keine vollständige Kompatibilitätsliste.

Referenz: Reka UI AlertDialog. Der dokumentierte JSDOM-Audit prüft reale Knoten (unter anderem Dialog- und Buttonnamen). Chromium findet zusätzlich den Kontrastfehler des Aktionsbuttons. Die Migrationsnotizen nennen 4,07:1 gegenüber 4,5:1. Diese historischen Messwerte wurden für diese Folie nicht erneut ausgeführt. Fehlende Kontrastbefunde sind kein bestandener Kontrastcheck: je nach Zustand steht die Regel in incomplete oder inapplicable. Auch im Browser können Befunde unentscheidbar bleiben. Eigene Tastatur-, Fokus- und Zustandsassertions ergänzen axe.

Quellen: [Recherche und lokale Belege](research/raw/2026-09-13-axe-rule-scope.md), [axe-core](https://github.com/dequelabs/axe-core), [Regelübersicht](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md).


## Ergänzung: Button-Varianten gemeinsam absichern

Nach „Ein Screenshot für einen konkreten Vertrag“ folgen drei Folien: Galerie, Fixture/Test, fehlende Variante. Etwa 90 Sekunden: „Unsere eigenen Basis-Komponenten haben viele Varianten. Ich rendere eine bewusst ausgewählte Matrix und fotografiere den gesamten Container. Verschwindet der bereits freigegebene Outline-Button im Disabled-Zustand, weicht das Bild ab. Eine nie eingetragene Variante kann dieser Test nicht erraten.“ Die drei Ansichten sind als schematischer Vergleich gekennzeichnet, keine aufgezeichnete Vitest-Ausgabe. Das Vue-Beispiel kürzt Beschriftungen und Layout; BaseButton steht für die eigene Designsystem-Komponente. Der gezeigte Matcher braucht das bereits erklärte Browser-Projekt mit Playwright und festem Viewport. Vitest 5 übernimmt Aufnahme und Bildvergleich; der alte Artikel brauchte dafür einen Base64-Workaround. Erstes Referenzbild prüfen und committen; Updates bleiben bewusste Reviews. Quellen: [API und redaktionelle Grenzen](research/raw/2026-09-13-vitest-5-button-variants.md). Die zusätzliche Zeit ist noch nicht durch eine Sprechprobe bestätigt.
