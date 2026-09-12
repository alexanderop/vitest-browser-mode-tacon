# TACON presenter guide

42 Hauptfolien einschließlich Fragen, danach 26 Backup-Folien (43–68). Geplant: 40 Minuten Inhalt und fünf Minuten Fragen. Die zusätzliche Locator-Minute nutzt die bisherige Reserve. Die Browser-Mode-Einführung erhält sechs Minuten; sie ersetzt die bisherige kurze Architektur-Erklärung. Diese Zeiten sind keine gemessene Sprechprobe.

Die Geschichte folgt dem Einkauf: Ich will das Plüschtier kaufen. Der Test ist grün, aber der Button funktioniert nicht. Wir erklären und reparieren diesen Widerspruch, prüfen danach den Kaufablauf, die Bedienung und die Darstellung. Nach der Erklärung des Button-Fehlers zeigen wir die drei Verträge als Überblick. Danach vertiefen wir Verhalten, Accessibility und Darstellung in dieser Reihenfolge. Testgrenzen und KI-Auftrag wenden das Gelernte an.

## Start und Vorbereitung

Im Vortrag-Repository `pnpm dev` starten und die ausgegebene Adresse öffnen. `p` öffnet den Presenter-Modus. Bilder und interaktive Rekonstruktionen liegen lokal. `ShopDemoFrame.vue` ist aktuell eine lokale interaktive Rekonstruktion des Shops, kein iframe der laufenden Nuxt-App. Das beim Einstieg kurz benennen. Die gespeicherten JSDOM-Ergebnisse stammen aus dem dokumentierten Quelltext-Vergleich.

Für die einzige Live-Testsequenz im Shop `/Users/alexanderopalic/Projects/opensource/claw-and-chew` zusätzlich `pnpm demo status` ausführen. Terminal mit großer Schrift vorbereiten, Vitest-Watcher stoppen und Benachrichtigungen ausschalten. Keine Builds oder anderen Suiten parallel zum quelltextverändernden Szenario-Verifier ausführen.

## Timing und Übergänge

| Folien | Zeit | Geschichte |
| --- | --- | --- |
| 1–5 | 0:00–3:00 | Testgrundlagen |
| 6–9 | 3:00–6:00 | Kaputter Button, grüner Test |
| 10–11 | 6:00–7:00 | Ursache und Gandalf |
| 12–17 | 7:00–13:00 | Browser Mode formal und technisch einführen |
| 18–19 | 13:00–16:00 | Browser rot, repariert grün; Verhalten benennen |
| 20–21 | 16:00–18:30 | Ganzer Kaufablauf |
| 22–26 | 18:30–23:30 | Tastatur und Bedeutung |
| 27–31 | 23:30–28:00 | Darstellung und drei Verträge |
| 32–36 | 28:00–33:00 | Testgrenzen |
| 37–40 | 33:00–38:30 | KI-Auftrag und Migration |
| 41 | 38:30–40:00 | Schluss |
| 42 | 40:00–45:00 | Fünf Minuten Fragen |

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

## Folien 22–26: Bedienung und Bedeutung

Übergang auf Folie 22: „Mit unserem Kauf-Test kommen wir zur Bestätigung. Aber wir haben noch nicht geprüft, wie sich die Oberfläche mit der Tastatur bedienen lässt und was ein Screenreader über die Auswahl erfährt.“

Folie 23 führt ein ergänzendes Kundenkonto-Szenario ein: „Stellen wir uns vor, unser Shop bekommt ein Kundenkonto.“ Claw & Chew implementiert dieses Konto nicht. Die Tabs-Demo ist eine gekennzeichnete Rekonstruktion aus dem Reka-Vergleichskorpus.

Account anklicken, dann ArrowRight: Password-Inhalt und Bedeutung stimmen überein. Defekt einbauen: Inhalt bleibt Password, ARIA meldet Account. Die neue Folie „axe automatisch im Browser-Test ausführen“ zeigt den echten Checkout-Test; die Tabs-Demo selbst startet keinen axe-Audit. Folie 25 ergänzt die Erwartungen für Tastatur, Fokus, Bedeutung und Auswahl.

Folie 26 benennt das Gelernte: den Accessibility-Vertrag dieser Tabs. Keine pauschale Zusage von Barrierefreiheit. axe, Rollenabfragen und ARIA-Snapshots ersetzen keinen vollständigen Audit.

## Folien 27–31: Darstellung und gemeinsames Modell

Folie 27: „Zurück zu unserer Produktkarte. Sie lässt sich bedienen. Kann trotzdem etwas falsch sein?“ Folie 28 zeigt zuerst Referenz, veränderte Farbe und Diff. Die Interaktion blieb im dokumentierten Versuch grün.

Erst danach auf Folie 29 den Screenshot-Test erklären: Bilder und Fonts abwarten, Umgebung und Viewport kontrollieren, relevante Komponente vergleichen. Die Aufnahmen sind lokale Ergebnisse des vorbereiteten Versuchs; keinen weiteren Live-Test starten. Optionale Probe: `pnpm exec vitest run --config talk/vitest.tacon.config.ts --project visual`.

Folie 30 begrenzt die Auswahl: eigene Core-UI-Zustände und fachliche Kompositionen mit konkretem Risiko. Keine Screenshots nach jedem Kaufschritt und keine blinde Aktualisierung der Referenzen.

Folie 31 führt die Namen zusammen: „Wir haben drei verschiedene Erwartungen geprüft: handeln können, richtige Bedeutung und Bedienung, richtige Darstellung.“ Das Bild fasst bekannte Beispiele zusammen. Es eröffnet kein neues Kapitel.

## Folien 32–36: Die Grenze unseres Beweises

Folie 32: „Ist damit der ganze Shop getestet?“ Folie 33 zeigt, was der Mount tatsächlich integriert: echte Komponenten und Client-Zustand. Server, Zahlung und Versand bleiben außerhalb.

Folie 34: Unser Nuxt-Shop liefert HTML vom Server. Server-HTML, Hydration und anschließende Interaktion brauchen einen Test der laufenden Anwendung. Der konkrete Hydration-Code steht im Backup.

Folie 35: Nur ein kurzer Transfer zur SPA: Dort kann App.vue die Grenze eines funktionalen UI-Tests sein. Kein zweiter App-Rundgang. Playwright als Browser-Provider ist vom separaten E2E-Runner zu unterscheiden. Reload, Offline-Verhalten, Persistenz und ausgelieferter Build brauchen bei entsprechenden Zusagen passende Prüfungen. Der tatsächliche Workout Tracker hat weiterhin E2E-Tests.

Folie 36 kehrt zum Shop zurück: Browser-Layout, Interaktion und verfügbare Browser-APIs echt lassen, externe Antworten, Zeit und Testdaten gezielt kontrollieren. Übergang: „Diese Entscheidungen kann ich jetzt in einen konkreten Auftrag übersetzen.“

## Folien 37–42: KI-Auftrag und Rückkehr zur Leitfrage

Folie 37 liest sich als Auftrag für genau unseren Button: echte Komponenten, Rollen und Namen, provider-gesteuerter Klick, sichtbares Ergebnis, begründete Mocks. Die entscheidende Kontrolle: Button verdecken muss rot werden, Wiederherstellung wieder grün. Ein Browser allein garantiert keine guten Assertions.

Übergang zu Folie 38: „Für einen neuen Test kann ich das so formulieren. Und wenn ich eine bestehende Suite migriere?“ Die drei Werkstattbilder erzählen die Anwendung dieses Prinzips: Pilot prüfen, unabhängig reviewen, Anleitung verbessern. Je Bild etwa eine Minute; keine weitere Tool-Einführung.

Folie 41: Zurück zum Plüschtier. „Wir haben festgelegt, was der Klick bewirken muss, die passende Laufzeit gewählt und mit einem Defekt geprüft, ob der Test anschlägt. Diese Struktur gebe ich der KI.“ Die drei Schlusszeilen mit dem bekannten Beispiel verbinden.

Folie 42 öffnet die Fragen: „Was soll euer nächster Test beweisen?“

## Migration: Evidenz und genaue Sprechhinweise

### Folie 38

Dauer: etwa 50 Sekunden. Übergang: Und wenn ihr schon viele jsdom-Tests habt?
In meinem Reka-UI-Fork habe ich zuerst Browser Mode neben jsdom eingerichtet und Vergleichsprüfungen gebaut. Dann drei unterschiedliche Dateien verstanden: Slider, useForwardExpose und Label. Das sind drei Pilotdateien, nicht nur drei einzelne it-Blöcke.
Der Slider ist der konkrete Beleg: setPointerCapture entfernen. Laut historischem Commit wird der Browser-Test rot, während der jsdom-Test grün bleibt. Anschließend den Defekt zurücknehmen. Die Zeichnung übersetzt diesen Versuch in ein sichtbares Kabel; sie zeigt keinen tatsächlichen Testlauf.
Die einfachen Tests ohne DOM gingen nach Node. Bestehende jsdom-Dateien blieben zum Vergleich erhalten.
Quellen: research/raw/2026-09-12-reka-migration-git-history.md; Commits bd93d9b1, f050ec36, cb8fd28c, 657fb236, 9d66767d. Historische Ergebnisse, heute nicht erneut ausgeführt.

### Folie 39

Dauer: etwa 50 Sekunden.
Ein Agent bekam genau eine Datei. Ein zweiter bekam Original und Port, ohne vorher die Erklärung des ersten zu lesen. Sein Auftrag: Prüft der Test noch dasselbe Verhalten? Welche Assertion wurde schwächer? Würde der Test auch ohne funktionierendes Feature bestehen?
Checkliste, Testnamen und Assertion-Anzahl sowie Coverage wurden automatisch verglichen. Diese Prüfungen erkennen bestimmte Verluste, aber gleiche Zahlen beweisen keine gleich starken Assertions. Deshalb unabhängiges Review und gezielte Defekte.
Das fehlende Puzzleteil ist eine didaktische Metapher für den dokumentierten Fehlermodus, kein Screenshot eines konkreten Agentenfehlers. Keine pauschale Aussage über alle KI-Tests.
Quellen: research/raw/2026-09-12-reka-ai-migration.md, PORT-PROMPTS.md Implementer und Reviewer; research/raw/2026-09-12-reka-migration-git-history.md, Commit 675792e3.

### Folie 40

Dauer: etwa 50 Sekunden.
Die wiederverwendbaren Aufträge habe ich nach den ersten Versuchen in PORT-PROMPTS.md festgehalten. Neue Erkenntnisse kamen in die Prompts und AGENTS.md. Der nächste Agent erhielt diese Dateien als Kontext; das ist keine automatische Änderung des Modells.
Auch die Anleitung wurde überprüft: Eine Behauptung über Teleport-Abfragen war falsch und wurde nach einem späteren Batch korrigiert. Regeln brauchen Belege.
Kleine Batches, laut PORTING.md drei gleichzeitig arbeitende Agenten. Abschluss der Migration: 87 Browser-Zieldateien und 10 Node-Dateien. Danach folgte eine eigene Qualitätsphase mit stärkeren echten Interaktionen. Kein Versprechen über Zeitersparnis.
Merksatz: Ich gebe der KI eine geprüfte Anleitung, einen kleinen Auftrag und eine unabhängige Kontrolle.
Quellen: research/raw/2026-09-12-reka-migration-git-history.md; Commits 675792e3, 8829a1bb, 12d75a3b, 864db198. research/raw/2026-09-12-reka-ai-migration.md.

## Backup nach Frage auswählen

| Folien | Vertiefung |
| --- | --- |
| 43 | Backup-Trenner |
| 44 | Page Object: Handlungen bündeln, Assertion im Test |
| 45–47 | Scroll-Codevergleich, unerreichbarer Warenkorb, Resize-Demo |
| 48 | Fachlicher Ablauf und öffentlicher Komponentenvertrag |
| 49 | Nuxt-Test vom Server-HTML zum Warenkorb |
| 50–51 | SPA-Root-Mount und echte Workout-Scroll-Komponente |
| 52–53 | Entscheidungsmodell und drei Review-Fragen |
| 54 | Historische PWA-Zeitmessung, kein allgemeiner Benchmark |
| 55–58 | Weitere vorbereitete Shop-Defekte |
| 59–61 | Private Refs, Factory und überlappende Erwartungen |
| 62–63 | Pointer Capture und Resize-Codevergleich |
| 64–66 | Hydration-Vergleich, Rekonstruktion und Browser-Mode-Grenzen |
| 67–68 | JSDOM/Browser-API-Vergleich und Konfiguration |

Die Workout-Demo verwendet die lokal kopierte `src/components/ScrollFadeContainer.vue`: zum Ende scrollen, zurück zum Anfang, dann verbreitern. Verläufe verschwinden ohne Überlauf. Die Resize-Rekonstruktion ergibt im funktionierenden Zustand 75%, 60%, mit Defekt 53%, 60%; die echte Shop-Aufnahme hat andere Geometrie. Rekonstruktion und Aufnahme nicht gleichsetzen.

## Kürzen bei Zeitverlust

Den Button immer vollständig auflösen. Danach zuerst Erläuterungen zur Screenshot-Auswahl und den SPA-Vergleich kürzen. Keine Backup-Demos spontan in den Hauptteil ziehen. Spätestens Minute 32 zum KI-Auftrag wechseln. Die drei Migrationsbilder lassen sich auf je einen Satz kürzen. Fragen möglichst bei Minute 39, spätestens bei Minute 40 öffnen.

## Quellen und Illustrationen

[Research-Index](research/wiki/index.md), [akzeptierte Erzählfolge](research/raw/2026-09-12-shop-story-revision.md), [ausgeführte Shop-Beispiele](research/raw/2026-09-11-claw-and-chew-talk-examples.md), [Grundlagen des Einstiegs](research/raw/2026-09-12-testing-basics-opening.md), [KI-Verträge](research/raw/2026-09-12-ai-test-contracts.md).

Die Aufzeichnungen nennen für die Shop-Beispiele Vitest 5.0.0 und vitest-browser-vue 3.1.0; der ältere Dokumentations-Capture bezieht sich auf Vitest 4.1.11. Für eine erneute Probe sind die aktuellen App-Checkouts und Lockfiles maßgeblich.

Sprechhinweise und detaillierte Quellen stehen in diesem Dokument, nicht in `slides.md`. Hamcrab-Bilder sind Illustrationen, keine Ausführungsergebnisse. Shop-Screenshot-Diffs stammen aus dem vorbereiteten Versuch.

Bildprompts: `../output/imagegen/testing-basics-prompts.json`, `frontend-components-one-mount-prompt.md`, `plush-purchase-intro-prompt.md` und `hamcrab-migration-prompts.json` im selben Verzeichnis. Folie 3 zeigt einen didaktischen Komponentenbaum, keine exakte Demo-Implementierung. Die Pfeile zeigen den Verhaltensfluss über gemeinsamen Zustand. Folie 6 illustriert die Kaufabsicht anhand einer Shop-Referenz. Folien 38–40 zeigen die Migration als Metapher; „lernt mit“ bedeutet verbesserte Projektanweisungen, kein Modelltraining.


## Ergänzung im Visual-Teil: GitHub Actions (ca. 60–90 Sekunden)

Nach „Ein Screenshot für einen konkreten Vertrag“ die beiden CI-Folien zeigen. „Der gleiche Test läuft bei jedem PR. Das vrt-Projekt ist separat konfiguriert: Playwright-Provider, Chromium, headless und ein fester Viewport. Node, pnpm und Checkout sind im Auszug ausgelassen. Playwright ist im Projekt gepinnt und wird über den Lockfile installiert. Bei Abweichungen lade ich Referenz, aktuelles Bild und Diff aus den Actions-Artefakten herunter.“ `include-hidden-files` nimmt den versteckten `.vitest`-Ordner mit. Den Beispieljob nicht als bereits installierte oder ausgeführte Pipeline bezeichnen.

„Ist die Änderung gewollt, starte ich einen separaten Workflow manuell auf meinem Feature-Branch. Er erzeugt mit --update Referenzen in derselben Umgebung. Bilder reviewen, committen, normalen PR-Check erneut starten. Ein Update darf den normalen Vergleich nicht ersetzen.“ Der kurze Update-Ablauf zeigt absichtlich keinen automatischen Push; die Quelle enthält einen ausführlicheren Bot-Commit-Ansatz. GitHub-hosted Runner können sich trotz gleicher Ubuntu-Bezeichnung verändern; Browser und Fonts kontrollieren, bei Bedarf ein festes Container-Image nutzen. Quelle: [Vitest Visual Regression Testing](research/raw/2026-09-12-vitest-visual-regression-ci.md).


## axe-Codefolie: Checkout statt Tabs

Nach dem ARIA-Snapshot den vorhandenen Checkout-Test zeigen. axe wird explizit importiert und aufgerufen; pnpm test:browser führt den Check automatisch mit aus. Browser-Setup lädt die echte Shop-CSS. Im gezeigten Auszug ist color-contrast bewusst die einzige Regel. Das Original prüft zusätzlich, dass diese Regel tatsächlich Knoten ausgewertet hat. Der aktuelle lokale Chromium-Lauf war grün; mit injiziertem low-contrast-notice-Defekt meldete dieselbe Assertion color-contrast. Keine Behauptung eines vollständigen Audits oder eines bereits ausgeführten Hosted-CI-Laufs. Tastatur, Fokus und produktspezifische Tab-Bedeutung bleiben eigene Assertions.
