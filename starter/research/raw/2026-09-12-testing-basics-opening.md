---
kind: note
title: Testing basics before the jsdom problem
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-12
collected: 2026-09-12
status: complete
---

# User direction

Start with basic frontend testing context: the testing pyramid with unit, integration and end-to-end tests; then Vue and React components as an additional test subject; then component testing with jsdom or Happy DOM; then demonstrate the jsdom problems.

This supersedes the earlier immediate shop-first opening. Retain the generated historical jsdom illustration as the bridge into the shop.

# Source inspection and paraphrases

These are research notes, not full article captures. Sources inspected on 2026-09-12:

- Ham Vocke, The Practical Test Pyramid, published 2018-02-26: https://martinfowler.com/articles/practical-test-pyramid.html . The pyramid distinguishes test granularity and suggests fewer broader tests. Its original labels were unit, service and UI; alternative consistent labels are legitimate. Modern frontend frameworks permit UI tests below the end-to-end level. The slide uses unit, integration and E2E as the requested teaching vocabulary, with shop examples authored for this talk.
- Vitest, Test Environment: https://vitest.dev/guide/environment.html . Vitest provides jsdom and happy-dom environments which emulate browser APIs; Browser Mode is a different browser execution mechanism. This supports environment choice, not adoption rates.
- Happy DOM project README: https://github.com/capricorn86/happy-dom . The project implements browser-related JavaScript APIs without a graphical user interface.
- jsdom project README: https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser . jsdom implements DOM/HTML standards in JavaScript for Node.js and does not perform layout or rendering.

# Editorial boundaries

No reviewed source establishes that most frontend projects currently use jsdom or Happy DOM. Use “Ein etablierter Ansatz” rather than a majority claim. Component describes the subject; isolated versus integrated describes scope; environment describes runtime. Mocks and stubs in the illustration are an isolation choice, not a jsdom requirement. The illustration's 2021 label is a retrospective example, not usage statistics.

# Opening sequence

Title → classic pyramid → Vue/React components → jsdom/Happy DOM → historical illustration → purchase intent → blocked button → actual green jsdom test → what should green prove?
