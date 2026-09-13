---
kind: note
title: axe rule scope in JSDOM and a real browser, with Reka migration evidence
url: https://github.com/dequelabs/axe-core
author: Codex source inspection
publisher: Local checkout and official axe documentation
published: 2026-09-13
collected: 2026-09-13
status: complete
---

User requested one explanatory slide after the axe diagram, using the Reka migration as reference. Inspected local checkout at /Users/alexanderopalic/Projects/reka-ui-bench-mark. This is source inspection, not a new execution of its tests.

## Official documentation checked

https://github.com/dequelabs/axe-core describes axe-core as an automated accessibility testing engine. Its supported-environments section documents limited JSDOM support and specifically identifies color-contrast as unsupported there.

https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md catalogs checks for accessible button/dialog names, input labels, valid ARIA roles and attributes, and text contrast. These checks examine the rendered state; they do not infer a product's intended interactions. The slide shows representative DOM checks rather than asserting complete JSDOM compatibility. Browser Mode supplies a real browser; other browser runners can also host axe. Real styles must be loaded and incomplete results require review.

## Verbatim local migration records

The following records are historical evidence retained in the checkout. They are not newly reproduced measurements.

### Toolbar/Toolbar.test.ts#axe-color-contrast-only-delta

Toolbar/Toolbar.test.ts#axe-color-contrast-only-delta	ported	-	-	-	AXE VACUITY CHECK, both environments MEASURED rather than reasoned about, and this file is the clean control case: neither suite's axe test is vacuous, and the jsdom/Chromium delta is EXACTLY ONE RULE. Census over the same story fixture — jsdom: 15 passing rules, 0 violations, 70 inapplicable, and color-contrast sitting in INCOMPLETE WITH ZERO NODES. Chromium: 16 passing, 0 violations, 70 inapplicable, and color-contrast PASSING WITH 2 NODES. Rule sets are otherwise identical, name for name. jsdom is not skipping the rule out of laziness — axe cannot compute a contrast ratio with no layout and no resolved colours, so it reports the rule as attempted-and-abandoned; the 0-node incomplete entry is the tell, and it is easy to misread as "ran and found nothing". The 2 Chromium nodes are the only text in the fixture: the ToolbarLink ("Edited 2 hours ago", mauve11 on white) and the Share ToolbarButton (white on violet9). The other 6 buttons hold @iconify/vue <Icon> glyphs and no text, so there is nothing to contrast. That is the concrete payoff of keeping colours in tailwind.browser.config.js, and it is honestly small: 2 nodes on a 7-button toolbar, both passing. UNLIKE Slider#axe, NOTHING WAS HIDDEN BY AN UNFLUSHED MOUNT — probed the jsdom original's [role=toolbar] tabindex at axe time and it is already "0", i.e. VTU had flushed and the live component really was audited. The rules doing actual work in both environments, and which would catch a regression: button-name (7 nodes, one per toggle item's aria-label), link-name (1), aria-hidden-focus (6), nested-interactive (9), tabindex (9), aria-allowed-role (11). ALSO MEASURED WHILE IN THERE: every button is 0x0 under jsdom and 23x25 in Chromium (toolbar root 414x45). That is both the mechanical reason color-contrast cannot run under jsdom and a standing reminder that any future click test on this fixture works only because the CSS shim exists.

### AlertDialog/AlertDialog.test.ts#axe-color-contrast

AlertDialog/AlertDialog.test.ts#axe-color-contrast	found-bug	-	-	-	THE OPEN DIALOG HAS A REAL COLOUR-CONTRAST VIOLATION AND jsdom CANNOT SEE IT. Quarantined under it.fails with the assertion unchanged. axe over document.body after opening reports color-contrast, 1 node: the fixture action button (text-red11 on bg-red4) computes #ce2c31 on #ffdbdc = 4.07:1 against the 4.5:1 threshold at 16px/normal. Not a shim artifact - tailwind.browser.config.js carries the same @radix-ui/colors palette as .histoire/tailwind.config.js verbatim (diffed), so this is what a Histoire viewer sees. Lives in story/_AlertDialog.vue, i.e. fixture styling, not library code, so rule 7 applies: reported not patched. Same shape as the Slider axe row but arrived at differently - the jsdom original here is NOT vacuous (see #axe-census), it simply runs a rule set that structurally excludes contrast.

### AlertDialog/AlertDialog.test.ts#axe-census

AlertDialog/AlertDialog.test.ts#axe-census	ported	-	-	-	NEGATIVE RESULT on vacuity, recorded because the Slider precedent predicts the opposite. The jsdom axe test here is NOT vacuous: with the dialog open it reports 17 passing rules over real nodes (aria-dialog-name 1, button-name 4, nested-interactive 4, tabindex 1, duplicate-id-aria 3, heading-order 1) and 0 violations, so it genuinely audits the open dialog. Slider was vacuous for a reason that does not apply here - an element display:none at mount time - and mount() renders this fixture synchronously with nothing hidden. What Chromium adds is exactly two rules that have nodes to examine: color-contrast (5 passes + 1 violation, see #axe-color-contrast) and avoid-inline-spacing (3 passes). Everything else is identical. ONE CORRECTION TO THE AGENTS.md CENSUS ADVICE, measured here: "under jsdom color-contrast lands in incomplete with zero nodes" is only half right - in the SAME test file, the same rule landed in `incomplete` (0 nodes) on the closed dialog and in `inapplicable` (0 nodes) on the open one. The bucket is not stable, so a census must treat zero-node entries in BOTH incomplete and inapplicable as "did not run"; counting buckets is not enough, you have to read the node counts.

### AlertDialog browser test excerpt

```ts
  // Quarantined: the port is faithful and the assertion is unchanged. Opening
  // the dialog produces a real `color-contrast` violation (4.07:1 against a
  // 4.5:1 threshold) on the fixture's `text-red11 bg-red4` action button. jsdom
  // cannot see it — `color-contrast` reports zero nodes there, landing in
  // `inapplicable` on the open dialog and in `incomplete` on the closed one.
  // The rest of the audit is NOT vacuous in either environment; see
  // `#axe-census`.
  // @finding AlertDialog/AlertDialog.test.ts#axe-color-contrast
  it.fails('should pass axe accessibility tests', async () => {
    expect(await axe(document.body)).toHaveNoViolations()

    // open modal
    await trigger.click()
    expect(await axe(document.body)).toHaveNoViolations()
  })

```
