---
kind: note
title: "Frontend-Testing neu gedacht: Black-Box-Strategie mit Vitest Browser Mode"
url: unknown
author: Alexander Opalic
publisher: summit Community
published: unknown
collected: 2026-09-11
status: complete
---

# Original TACON 2026 abstract

Origin: The user pasted the conference agenda and session abstract into the conversation. This capture preserves the session excerpt. Navigation and unrelated agenda entries are omitted. The publication date and canonical URL were not supplied.

15:50 - 16:35 | Stage 1 | Vortrag

Frontend-Testing neu gedacht: Black-Box-Strategie mit Vitest Browser Mode

Alexander Opalic

Developer | Otto Payments

Unit-Tests in JSDOM waren gestern. Mit dem Vitest Browser Mode laufen Integrationstests in einem echten Chromium-Browser und sind dabei viermal schneller als die klassische JSDOM-Variante. Das verändert, wie Tests aufgebaut werden.

In diesem Vortrag zeige ich eine praxiserprobte Teststrategie aus einem realen Vue-Projekt: 70 % Integrationstests, 20 % Unit-Tests für extrahierte Logik sowie 10 % visuelle Regressionstests und Accessibility-Checks. Der Kern des Ansatzes ist konsequentes Black-Box-Testing. Statt Implementierungsdetails wie interne Refs oder Methodenaufrufe zu prüfen, wird ausschließlich das Verhalten aus Nutzersicht getestet: Buttons klicken, Eingaben vornehmen und sichtbare Ergebnisse überprüfen.

Alle Beispiele stammen aus einer produktiven Progressive Web App und sind direkt übertragbar. Du nimmst eine klare Strategie mit, um deine eigene Testsuite aufzubauen oder zu verbessern.

Key Takeways: • Du verstehst, warum Black-Box-Tests robuster, wartbarer und aussagekräftiger sind als White-Box-Tests. • Du lernst, wie der Vitest Browser Mode mit Playwright klassische JSDOM-Setups ersetzt. • Du erhältst praktische Patterns für skalierbare Testsuiten, etwa Data Factories für saubere Testdaten und Page Objects für wiederverwendbare DOM-Interaktionen. • Du lernst visuelles Regressionstesting durch Screenshot-Vergleiche für Design-System-Komponenten direkt in der Testsuite kennen. • Du erfährst, wie Accessibility-Tests als natürliches Nebenprodukt rollenbasierter Elementsuche entstehen.
