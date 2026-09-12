---
kind: note
title: Real shop incident videos and paired JSDOM results
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-12
collected: 2026-09-12
status: complete
---

# User direction

Record videos with Agent Browser in the actual running shop. Show the user-visible defect, then the green JSDOM test and the incident impact. Keep Browser Mode explanation later.

# Execution evidence

The Nuxt shop at `/Users/alexanderopalic/Projects/opensource/claw-and-chew` was started on `http://127.0.0.1:3080/`. All five recordings use the real storefront, not `/learn` or a fixture. Agent Browser 0.37.0 records MP4 through its CLI; Playwright sends real pointer/wheel input through the same CDP browser session. The visible cursor is a recording annotation with pointer-events disabled.

The recorder checks each browser action and JSDOM test in the baseline, activates exactly one existing source scenario, records the real defect, runs the unchanged JSDOM test, restores source, then repeats the baseline checks. Source and test hashes establish that the same defect was active during recording and the broken-state test. All 15 targeted JSDOM runs passed. The shop was clean with no active scenario after completion.

| Scenario | Observed broken shop | JSDOM |
| --- | --- | --- |
| blocked-button | {"bagCount": 0, "hitTarget": "product-decoration"} | passed |
| missing-pointer-capture | {"position": "Position: 50%, 45%", "expected": "Position: 75%, 60%", "previewWidth": 396} | passed |
| fixed-preview-width | {"position": "Position: 59%, 60%", "expected": "Position: 75%, 60%", "previewWidth": 316} | passed |
| unscrollable-bag | {"scrollTop": 0, "containerBottom": 476, "lastBottom": 1131, "overflow": "hidden"} | passed |
| low-contrast-notice | {"color": "rgb(68, 68, 68)", "background": "rgb(29, 29, 29)", "text": " This is a demo shop. No payment, shipping, or emails. Your details stay in this page. "} | passed |

# Interpretation and limits

These are simulated incidents: deliberately enabled defects in the real demo-shop source, not claims about historical production outages. The videos end with a card generated from the actual Vitest JSON report, not a filmed terminal. Logs and JSON are retained. Contrast still returns incomplete and is not a successful accessibility audit. The actual resized shop preview is 316 px, so the defect yields 59%, 60%; the isolated 280 px fixture yields 53%, 60%. Both demonstrate the same fixed-400-px source defect.

# Artifacts

- Reproduction: `starter/scripts/record-shop-incidents.mjs` in the talk repository.
- Finished MP4s and posters: `starter/public/shop/incidents/`.
- Per-scenario JSON, full test logs, raw recordings and source hashes: `output/shop-incidents/`.
- Combined provenance: `output/shop-incidents/manifest.json`.
- Slides 3–7 each show one clip; slide 8 leaves the question open.

# Video hashes

- `blocked-button.mp4`: SHA-256 `ed3085d775b98c9eb365e82b19c174d10db8aadbf554810503269167d3afd156`
- `missing-pointer-capture.mp4`: SHA-256 `ef43bf352dda965dc9cf0d95dddbc3de4ed6fad8b11485537dce8a32a437be29`
- `fixed-preview-width.mp4`: SHA-256 `a1bc31169e7fc12a1e02f792f588489d518f168f55071ab8aa50819a86fcd443`
- `unscrollable-bag.mp4`: SHA-256 `5a088597d85c8606a0f8425eef2b9d266aa60990031721aa531a19349e7f7b2d`
- `low-contrast-notice.mp4`: SHA-256 `58aeb2993aef7310704cd1e3f66c3511c185e589dd8f6fb465c8237208aeafc6`
