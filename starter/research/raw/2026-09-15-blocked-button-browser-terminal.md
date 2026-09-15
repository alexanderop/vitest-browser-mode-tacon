---
kind: note
title: Recorded Chromium failure with the blocked-button defect
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-15
collected: 2026-09-15
status: complete
---

Ran `node starter/scripts/record-blocked-button-terminal.mjs --browser` against an isolated copy of the local Claw & Chew sources. The script changes the single `pointer-events: none;` declaration in ProductCard.vue to `pointer-events: auto;` and records real process output and measured timing. The source checkout is not edited.

Command: `pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts --reporter=default`.

Observed exit code 1, one failed test, `TimeoutError: locator.click: Timeout 1500ms exceeded.`, and `product-decoration` intercepting pointer events. The recording retains the complete output with temporary working paths redacted and the same one-second presentation delay as the earlier JSDOM recording.

Artifacts: `starter/public/shop/terminal/blocked-button-browser.cast` and companion JSON metadata. The existing terminal player displays the recording on “Der Test scheitert schon beim Klick”, replacing the static error excerpt. This is recorded playback, not a live terminal.
