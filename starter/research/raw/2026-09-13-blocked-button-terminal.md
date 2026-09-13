---
kind: note
title: CSS diff, real terminal recording and fictional oncall incident
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-13
collected: 2026-09-13
status: complete
---

User direction: after the broken shop demonstration, show the developer's Git change, a terminal recording of the passing test despite the bug, then a developer woken by oncall at 02:00.

The diff reproduces the existing blocked-button scenario in Claw & Chew: app/catalog/ProductCard.vue changes pointer-events: none to auto on the absolutely positioned product-decoration, with inset: 0 and z-index: 2.

starter/scripts/record-blocked-button-terminal.mjs copies the current shop sources into a temporary directory, applies that one mutation, runs the real ProductCard JSDOM test and captures process output with measured timing as asciicast v2. The original working tree is not edited. The test exits successfully with one passing test. The recording is not a live run during the presentation. Absolute temporary paths are redacted; output starts after a one-second presentation delay.

Artifacts: starter/public/shop/terminal/blocked-button-jsdom.cast and its companion JSON metadata. The displayed CSS diff is an editable excerpt of the deliberate scenario, not an attributed historical developer commit. The 02:00 illustration depicts a fictional demo incident, not a real production outage.

Player integration follows https://docs.asciinema.org/manual/player/api/ and https://docs.asciinema.org/manual/player/quick-start/ (accessed 2026-09-13). Assets and player are served locally.
