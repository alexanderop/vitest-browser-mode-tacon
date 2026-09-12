---
kind: file
title: Reka migration chronology from Git history
url: unknown
author: Alexander Opalic
publisher: local reka-ui-bench-mark Git repository
published: unknown
collected: 2026-09-12
status: complete
---

# Origin and limits

Read-only inspection of Git history and documentation in `/Users/alexanderopalic/Projects/reka-ui-bench-mark`, HEAD `ab4207bf38e4f72feb08f9202fd3eed97f728fbe`. Commit dates establish recorded milestones, not active working duration. Commit messages include Claude-Session references; those session transcripts were not opened. Historical test outcomes below are reported by the commits, not rerun here. This capture contains the complete commit log for the selected migration range and selected complete documentation diffs.

# Migration commit messages — verbatim

```text
bd93d9b1 2026-08-16T11:20:32+02:00 test(browser): set up Vitest Browser Mode alongside the jsdom suite
Splits packages/core/vite.config.ts into two projects over one source tree:
`unit` (jsdom, the existing 97 files) and `browser` (Playwright/Chromium,
*.browser.test.ts). The two run side by side — the jsdom suite is untouched.

Supporting pieces:

- vitest.browser.setup.ts + tailwind.browser.config.js + vitest.browser.css —
  story fixtures are styled with Tailwind and nothing ever compiled it for
  tests. Under jsdom every rect is 0x0 so this was invisible; in Chromium the
  component collapsed and Playwright refuses to click a zero-size element.
- shims/vitest-axe/ — vitest-axe calls createRequire() at import time, which
  Vite externalises, so it throws before any test runs. The shims talk to
  axe-core directly and are aliased in the `browser` project only, so ported
  files keep their original imports.
- pnpm-workspace.yaml packageExtensions — @testing-library/jest-dom imports
  'vitest' without declaring the peer; adding @vitest/browser-playwright
  changed hoisting and broke all 97 jsdom files.
- scripts/port/ — port:inventory, port:parity (describe/it names must match
  the jsdom original, @finding tags must resolve) and port:coverage.

Docs: AGENTS.md (CLAUDE.md is now a symlink to it) for agents in this repo,
PORTING.md for the migration sequence, MIGRATING-TO-BROWSER-MODE.md as the
shareable field guide, FINDINGS.tsv + PORT-INVENTORY.tsv as the ledgers.

Ported: smoke, css-shim, and 2 of 39 Slider tests. The Slider axe test is
quarantined with it.fails — the browser port found a real missing aria-label
in the story fixture that the jsdom original never audited, because it ran
axe before Vue flushed and the thumb was still display:none.

Claude-Session: https://claude.ai/code/session_013LZka3E8Eszash2Q8ECiAR

f050ec36 2026-08-16T11:45:50+02:00 test(Slider): complete the browser-mode port, 39/39 tests
Finish porting Slider.test.ts to Vitest Browser Mode. All five jsdom stubs
(ResizeObserver, scrollIntoView, has/set/releasePointerCapture) are gone and
the pointer-capture claim is mutation-verified: deleting setPointerCapture
from SliderImpl.vue fails the browser test and leaves the jsdom one green.

Tooling:
- port:checklist — prints the original's describe/it tree in source order,
  each node marked present or missing; the only oracle that compares
  describe blocks directly.
- port:coverage now accepts per-line exemptions from PORT-COVERAGE-ALLOW.tsv,
  each of which must name a row in FINDINGS.tsv.
- mouseDown/mouseMove/mouseUp custom commands, so a drag can be split across
  nested beforeEach hooks that dropTo's atomicity cannot serve.

Five findings recorded, one test quarantined under it.fails (the fixture's
single thumb has no accessible name) and one coverage line allowed (jsdom
only ever covered linearScale's degenerate branch because it measures 0x0).

Also fixes the new root test:browser script, which pointed at a
non-existent core script name.

Claude-Session: https://claude.ai/code/session_01FJVWuhuhwpMLZ6fjm954Fg

cb8fd28c 2026-08-16T12:11:13+02:00 test(node): move the 10 DOM-free files off jsdom into a node project
Ten of the 97 test files touch no DOM at all, so they never needed jsdom
and do not need a browser either. They now run in a third vitest project
with environment: 'node' and, deliberately, no setup file — vitest.setup.ts
exists entirely to paper over jsdom (canvas mock, jest-dom matchers, a
getComputedStyle patch) and none of it applies here.

571 tests, 28% of the suite, off jsdom for the cost of a config block.
Identified by scanning all 97 files for DOM signals and verified by
running them, not by grepping. The jsdom project has to exclude the list
explicitly or the files would run twice, once per environment.

Claude-Session: https://claude.ai/code/session_01HhoqfByuqzu6Dd8GcZgKkq

657fb236 2026-08-16T12:11:27+02:00 test(shared): port useForwardExpose to browser mode, 10/10
The T1 trial run from PORTING.md phase 1. A composable that mocks nothing
has nothing to delete, so the port is near character-identical to the
original: 10/10 tests, 18/18 assertions, port:parity --complete and
port:checklist --complete clean, coverage loses nothing.

That is the result, not a disappointment — it is the honest price of
removing jsdom where the port gains nothing. Steady state over 3 runs
each: 1.11s -> 1.72s total wall clock (1.5x), vitest Duration 539ms ->
1.17s (2.2x). A cold Chromium launch is ~0.6s, so browser mode is not the
multi-second tax the tiering assumed.

The one gained line (useForwardExpose.ts:68, the ref-detach path) is a
harness win, not a browser win — vitest-browser-vue unmounts after every
test and the jsdom original never unmounts at all. Recorded as such.

port:coverage could not address this file before: it only resolved
src/<name>/<name>.browser.test.ts, and the composables live directly in
src/shared/. It now searches src/ for the filename and derives the
component key from the file rather than its parent directory, since
shared/ holds many unrelated ports.

Claude-Session: https://claude.ai/code/session_01HhoqfByuqzu6Dd8GcZgKkq

40bd82ea 2026-08-16T12:11:39+02:00 docs(porting): make deleting jsdom the goal, re-verdict findings under it
The second goal of this fork used to read "port the testing strategy from
jsdom to browser mode", with browser mode as a second tier and stay-jsdom
a legitimate per-file verdict. It now reads "get rid of jsdom entirely":
all 97 files move, the 87 that touch the DOM to browser mode and the 10
that do not to the node project, and the migration is finished when the
unit project's include list matches nothing.

What that changes:

- stay-jsdom is retired as a verdict. "This port gains nothing" is an
  observation about value, not a reason to leave a file behind. The only
  exemption is needs-no-DOM-at-all, which is a property of the file rather
  than a judgement about it.
- The tiers now sequence the work instead of deciding whether it happens.
  T1 is reopened: 4 of its 12 files went to node, the other 8 are
  DOM-dependent and get ported like everything else.
- Rows written under the old premise are re-verdicted in place, with the
  original reasoning kept in notes. The measurements are unchanged and
  still worth reading; they just no longer decide anything.
- The deferred performance question is reframed. Not "is browser mode fast
  enough to be the default" — it is the default by decision — but "what
  does an all-browser suite cost, and does CI need sharding".

Also adds the gotchas the useForwardExpose port produced: ports cover
teardown and the jsdom suite never did, and a GAINED coverage line needs
the same per-line scrutiny section 2.2 demands of a lost one.

Claude-Session: https://claude.ai/code/session_01HhoqfByuqzu6Dd8GcZgKkq

979221be 2026-08-16T12:13:22+02:00 chore(port): teach the inventory about the node project
PORT-INVENTORY.tsv is the document the fan-out is sharded by, and it did
not know T0 existed: the 10 files already running in the `node` project
were still tiered T1/T2/T4 with ported=no, so 571 tests that have left
jsdom were counted as outstanding and the progress bar could never reach
zero.

Adds a T0-node tier, read out of NODE_TESTS in vite.config.ts rather than
re-derived — the config is the only thing that decides which environment a
file actually runs in, and a stale path there now warns instead of quietly
shrinking the tier. T0 outranks T4: shared/useNonce is tagged hostile for
its vi.mock and it does not matter, because module mocking works fine in a
node environment.

The summary column is now `off jsdom` rather than `ported`, since a T0
file got there without a port, and it prints what is left on jsdom — the
only number that measures the goal. Tiers now read 10/9/44/23/11 against
the old 0/13/49/23/12.

Claude-Session: https://claude.ai/code/session_01HhoqfByuqzu6Dd8GcZgKkq

9d66767d 2026-08-16T12:22:18+02:00 test(Label): port to browser mode, 7/7 — the T2 trial run
PORTING.md phase 1's last open box. Clean mechanical port: parity,
checklist --complete and coverage all pass on the first run, 1 line
gained, 0 lost, no stubs to delete because the original installs none.

Checkbox was the other candidate and was the wrong one — it is tiered T3
for its ResizeObserver stub, and the point was to rehearse the boring path
before committing 44 files to it.

"Mechanical" did not mean "uninformative". Three findings out of 79 lines:

- #click-fires-no-mousedown, the generalisable one. HTMLElement.click()
  and VTU trigger('click') dispatch a click and nothing else — no
  pointerdown, mousedown, focus or mouseup — so every mousedown handler in
  the library is unreachable from a jsdom test that clicks, no matter how
  many are written. The oracle proves it: jsdom ran the identical gesture
  on the identical element and left Label.vue:24 uncovered. It carries its
  own counter-lesson too — that line's if-branch is [0,2], never taken,
  because nothing double-clicks. A covered line is not a tested behaviour.
- #empty-label-unclickable. An empty <label> is 0x18 in Chromium — zero
  width — and Playwright will not click it, so the original's gesture
  cannot occur at all in a browser. The port gives both labels a text slot;
  the deviation is recorded rather than buried, and the assertions are
  unchanged and verified discriminating.
- #no-positive-case. Label's one job is `for` association and neither suite
  ever asserts the positive case. Not fixed: an invented it() fails
  port:parity and rule 7 forbids it.

Two translation-table gaps, both now documented: there is no .html() on a
vitest-browser-vue result (the original is a @testing-library/vue file and
four of its seven tests assert exact HTML), and the
document.body.innerHTML teardown is simply deleted.

Suite: 102 files / 2072 passing + 1 expected fail. Still on jsdom: 84
files.

Claude-Session: https://claude.ai/code/session_01HhoqfByuqzu6Dd8GcZgKkq

4a160c99 2026-08-16T13:17:12+02:00 chore(port): retry a coverage run that wrote no report
Concurrent agents each spawn their own vitest, and a browser-project run
that loses the race for Chromium dies without writing a report — which is
indistinguishable, from the script's side, from a port that does not
compile. Measured during T2 batch 1: one run in four exited 2 while three
re-runs of the identical command were clean.

A false failure here is expensive, because the agent reading it goes and
"fixes" a file that was never broken. If both attempts fail the script
still exits 2 with the output.

Claude-Session: https://claude.ai/code/session_01VmPnVyvyHEkFzk7CKNPVhm

3c7cdec1 2026-08-16T13:17:26+02:00 test(port): port the first 8 T2 files to browser mode
Separator, Progress, Toolbar, Label's batch-mates and then AlertDialog,
FocusGuards, Switch, Viewport, VisuallyHidden. All oracles clean; the
inventory now marks eight more files ported.

The mechanical part of T2 is mechanical. The findings are not — 43 rows
from 8 small files, and the most valuable ones are about the test suite
rather than about the components:

- axe audits a detached copy under jsdom and the live element in browser
  mode, so rule counts legitimately differ across all 62 axe files.
- Vue writes DOM properties, not attributes, whenever `key in el`, and
  jsdom's `nonce` IDL setter reflects into the content attribute where
  Chromium's does not — so Viewport's nonce assertion was an assertion
  about jsdom.
- `getByText` defaults to a substring match in vitest locators, and a
  locator is lazy, so two of Switch's tests would have passed against a
  switch that never toggles.
- jsdom's zero layout fakes a 1024px scrollbar, so every modal open sets
  padding-right and no test ever noticed.

Adds the new `found-gap` verdict's first rows: green ports that proved
something real is untested. Five coverage lines are allowed, each argued
individually in PORT-COVERAGE-ALLOW.tsv.

Claude-Session: https://claude.ai/code/session_01VmPnVyvyHEkFzk7CKNPVhm

675792e3 2026-08-16T13:17:39+02:00 docs(porting): write down the prompts, add the found-gap verdict
PORT-PROMPTS.md holds the implementer and reviewer prompts the fan-out
runs on. They are a file rather than something typed per batch for one
reason: the most transferable lesson from the Bun playbook is fix the
prompt, not the code, and you cannot fix a prompt that was improvised
into an agent call and then discarded. It carries a changelog so the next
reader learns what went wrong rather than just inheriting the fix.

`found-gap` is a new verdict for the case the first T2 batch exposed: the
port is green, and getting it green proved something real is untested,
but rule 7 forbids the patch and an added `it` would be INVENTED, so
there is nothing to quarantine. Four rows previously filed as `ported` —
a verdict meaning "fine" — have been re-verdicted.

Also: mutation-test T2 files after all. That advice used to say don't,
and it was wrong — it cost a minute on Viewport and produced the file's
best row.

AGENTS.md gains the gotchas the batch taught: the detached-mount axe
context, the prop-vs-attribute divergence, the two silent vacuities from
@testing-library originals, portalled content being invisible to
`screen`, the phantom jsdom scrollbar, tab order being unportable from an
environment that has no sequential focus navigation, and `render`
rejecting `attachTo` outright.

Claude-Session: https://claude.ai/code/session_01VmPnVyvyHEkFzk7CKNPVhm

8829a1bb 2026-08-16T13:53:54+02:00 test(port): port RovingFocus, Teleport and Toggle to browser mode
Three more T2 files, plus the corrections they turned up:

- `screen.getBy*` is document-scoped, not container-scoped — its helpers
  bind to `baseElement`, which defaults to `document.body`. Re-measured on
  the open `_AlertDialog` fixture; the stale comment there claiming the
  opposite is fixed, and the true rule is in `AGENTS.md`.
- `userEvent.tab()` from `@testing-library/user-event` ships its own
  tab-order model, so `RovingFocus` ports one-for-one — a tab test is
  unportable only when the original had no way to move focus at all.
- The `attributes('x')` sweep landed: all 421 assertions across the 97
  originals counted, `nonce` is the only test-visible jsdom/Chromium
  divergence, so it does not generalise into a review flag.

18 new rows in `FINDINGS.tsv`.

Claude-Session: https://claude.ai/code/session_018DMnShyNiCvtgyhb5XwESv

ed51a804 2026-08-16T15:02:15+02:00 test(port): port Collapsible, Presence and Primitive to browser mode

79cad58a 2026-08-16T16:11:44+02:00 test(port): port DateRangeField, Tabs and RadioGroup to browser mode
T2 batch 6 — 32 it call-sites / 36 runtime tests, all green, nothing
quarantined; checklist, parity and coverage clean first try on all three
(+5/-0, +16/-0, +26/-0). Suite: 119 files / 2199 passing + 6 expected fail.

The batch answered two questions rather than retiring three files.

DateRangeField is the template for the 12 date/picker files holding 389 of
the 664 remaining T2 tests. The blocker would have been misread by all of
them: userEvent.keyboard('{19}') is not a keystroke — a braced key that is
not a real Playwright key name falls back to insertText and fires no key
events, so a literal port passed 7 of 8 with the segment silently never
filling. Grepped to 8 sites in 4 files. TZ inheritance reaches Chromium and
getByText has zero hits family-wide, so two known hazards are absent there.

Tabs settles SSR: @vue/server-renderer has no browser export condition, so
renderToString, hydration and the console spies all run unmodified —
Accordion is unblocked. The cost is the self-made container, which cleanup()
never removes, leaving a live hydrated app answering document-scoped queries
for the rest of the file. Its sharpest finding is that clicking a tab does
not change tabs under jsdom (mousedown activation, hit count 0) and neither
suite has a click test.

RadioGroup shows a synthetic keypress has no duration: {ArrowDown} releases
before the component's setTimeout(0), selecting nothing 14 times in 15, while
the held form selects 15 in 15. fireEvent.keyDown never fires keyup at all,
so the jsdom original left that flag stuck true for the whole file.

Both agents filed the counterweights: all 16 of Tabs' gained lines are
teardown, and RadioGroup's 26 attribute as Chromium 2 / harness 10 /
incidental 1, with no mutation the browser catches and jsdom does not.

Docs carry the generalisable half: 6 new AGENTS.md gotchas, a correction to
the console-forwarding entry, 5 translation-table rows, and four new sections
in MIGRATING-TO-BROWSER-MODE.md.

Claude-Session: https://claude.ai/code/session_01T1AaQgq3WcHjGoDcMMtF3S

1a02ac8c 2026-08-16T19:49:12+02:00 test(port): port the four pattern-frontier files to browser mode
Select (29/29), NavigationMenu (13/13), Combobox (45/45) and ScrollArea
(9/9) — fake timers, vi.mock, stub-derived geometry and DOM snapshots
each now have a worked precedent, so the remaining files are mechanical.

Select: all three stubs deleted, the double-pointerup selection ritual
evaporated, and Chromium enforcing the modal's `pointer-events: none`
exposed the outside-press dismiss path as zombie-covered under jsdom.
NavigationMenu: vi.mock works unchanged; real hovers earned +100 lines
and axe found an aria-hidden-focus violation jsdom filed as incomplete.
Combobox: six stubs deleted, one kept on purpose — the rule is construct
vs compensate. ScrollArea: `el.scrollTop = 40` is a real scroll, and the
10px scrollbar jsdom's offsetWidth stub was silently authoring is now CSS.

Claude-Session: https://claude.ai/code/session_01HD1R9GMeLYM4fjENFb9YDY

2eba5bdd 2026-08-16T22:54:58+02:00 test(core): advance browser mode migration

12d75a3b 2026-08-18T21:02:37+02:00 test(core): complete the jsdom-to-browser-mode migration
All 97 test files now have a non-jsdom destination: 87 in the Vitest Browser
Mode project, 10 in the plain node project. `port:inventory` reports 0 files
and 0 tests still on jsdom.

This lands the final T3/T4 ports — Autocomplete, both colour controls, Drawer
snap/swipe, DropdownMenu and its filter, FocusScope, HoverCard, Listbox, Menu,
Menubar, NumberField, PinInput, Popper, TagsInput, Tooltip, Tree, plus the
AspectRatio/Avatar/ConfigProvider files and the useBodyScrollLock, useGraceArea
and useTypeahead composables — along with `src/test/browser.ts`, the VTU-
compatible adapter the five largest ports mount through.

`parity-coverage.mjs` now excludes that adapter from the coverage oracle: it is
test harness, not product code, and counting it inflated every adapter-using
port simply because the jsdom original never imports it (Autocomplete +49 -> +25,
TagsInput +29 -> +1).

DateRangeField releases a held Shift. `useTestKbd().SHIFT_TAB` expands to
`{Shift>}{Tab}` with no release token, and Chromium carried the modifier out of
the file into six later ToggleGroup arrow-focus tests.

Also lands three write-ups drawn from the migration:
VITEST-BROWSER-MODE-COOKBOOK.md (the shareable field guide),
IMPROVING-PORTED-TESTS.md and IMPROVING-PORTED-TESTS-VITEST-5.md (the
post-migration backlog against Vitest 4.1 and 5.0.0-rc.1). Both cite
NumberField.improved.browser.test.ts, which is part of a separate follow-up
batch and is not in this commit.

Verified: 186 files / 3441 passing + 20 expected fails across all three
projects, 25.22s.

Claude-Session: https://claude.ai/code/session_01NY25AvS6cezmmNc2kwrp6z

```

# 675792e3 — PORT-PROMPTS.md diff

```diff
diff --git a/PORT-PROMPTS.md b/PORT-PROMPTS.md
new file mode 100644
index 00000000..05c97734
--- /dev/null
+++ b/PORT-PROMPTS.md
@@ -0,0 +1,238 @@
+# PORT-PROMPTS.md — the two prompts the fan-out runs on
+
+`PORTING.md` §6 specifies the per-file loop: one implementer, one reviewer, separate context
+windows, then the machine decides. This file holds the actual prompts, because the most
+transferable lesson from the Bun playbook is **fix the prompt, not the code** — and you cannot
+fix a prompt that was improvised into an agent call and then thrown away.
+
+When a batch produces a bad port, the change goes here, and the batch re-runs. Every edit to
+this file should say what went wrong in the changelog at the bottom.
+
+`{COMPONENT}` is the component key (`Separator`, `shared/useForwardProps`, …).
+`{FILE}` is the jsdom file, repo-relative from `packages/core/src/`.
+
+---
+
+## Implementer prompt
+
+> You are porting one jsdom test file in the reka-ui fork at
+> `/Users/alexanderopalic/Projects/reka-ui-bench-mark` to Vitest Browser Mode.
+>
+> **Your file: `packages/core/src/{FILE}`. Port it to `packages/core/src/{COMPONENT}.browser.test.ts`.**
+>
+> **Read `AGENTS.md` first, in full.** It has the translation table and the gotchas list, and
+> the gotchas are all things that already cost someone an hour. Then read
+> `PORTING.md` §2 (the three oracles), §5 (the verdict column — note `found-gap`, for when the
+> port is green and that is precisely the problem) and §6 (the rules for agents). Do not skip these on the
+> grounds that your file looks small — the smallest file ported so far, a 79-line `Label` test,
+> produced three findings.
+>
+> ### What you produce
+>
+> 1. `packages/core/src/{COMPONENT}.browser.test.ts`
+> 2. One or more rows appended to `FINDINGS.tsv` at the repo root.
+>
+> **The findings row is not paperwork, it is the deliverable.** A batch that produces green
+> files and no findings has failed. If the port genuinely taught you nothing, say that in the
+> row and say what you checked to conclude it — "ported cleanly" on its own is a non-answer.
+>
+> ### Hard rules — these are machine-enforced, you will not get away with breaking them
+>
+> - **Verbatim `describe` and `it` names.** `port:parity` diffs the name tree and fails on any
+>   name in your port that is not in the original. Do not rename, do not "clarify", do not fix
+>   a typo.
+> - **Never weaken an assertion to get a green tick.** Softening `toHaveAttribute` into
+>   `toBeInTheDocument`, disabling an axe rule, deleting the assertion that fails — these are
+>   the same move, and this entire apparatus exists to catch it. `port:parity` counts `expect`
+>   calls per test and fails on any test that now runs fewer than the original.
+> - **If the port fails because it found something real, quarantine it — do not fix it.**
+>   ```ts
+>   // @finding {FILE}#some-key
+>   it.fails('exact original name', async () => {
+>     // body unchanged — do NOT weaken the assertion that fails
+>   })
+>   ```
+>   `.fails`, not `.skip`, so the body still runs and still contributes coverage, and so the
+>   test turns red the day someone fixes the bug. The `@finding` key must exist in the first
+>   column of `FINDINGS.tsv` or `port:parity` fails the file. Quarantine always costs you a
+>   written finding; that is the point.
+> - **Change nothing but test files.** Not component source, not story fixtures, not config.
+>   A port that surfaces a real bug is a success, and its deliverable is a finding plus a
+>   quarantined test, never a patch.
+> - **Never `git stash`, `git reset`, `git checkout`, or any git command that does not commit a
+>   named file.** Other agents are working in this tree concurrently and you will destroy their
+>   work.
+> - **Never leave the `unit` (jsdom) project broken.** It runs alongside the browser project on
+>   purpose. You are adding a file, not replacing one — **keep the original `.test.ts`.**
+> - Run vitest scoped to your file only. Never run the full suite.
+>
+> ### Two things that will bite you immediately
+>
+> - **`render` throws on `attachTo`.** Drop the option; do not translate it to
+>   `container: document.body`. If every test in your original mounts with
+>   `attachTo: document.body`, a literal port crashes on the first one.
+> - **`getByText` matches a SUBSTRING here.** `@testing-library`'s matches the whole string. Pass
+>   `{ exact: true }`. `getByText('checked')` otherwise returns the element reading `unchecked`,
+>   and your toggle test passes against a component that never toggles.
+> - **A locator is lazy — `getBy*` does not throw.** In a `@testing-library` original the throw *is*
+>   the assertion. Translate a bare `getByTestId(…)` to
+>   `await expect.element(…).toBeInTheDocument()`, or the test has no assertion left.
+> - **Portalled content (Dialog, Popover, Select, Tooltip, Toast, menus) needs `page.getBy*`**, not
+>   `screen.getBy*`, which is scoped to the render container and will match nothing.
+> - **A `attributes('x')` assertion may be testing jsdom, not the platform.** Vue writes a DOM
+>   *property* rather than an attribute whenever `key in el`, and jsdom's IDL setters reflect into
+>   the content attribute where Chromium's often do not. If an attribute assertion fails in the
+>   browser, check `el.x` before concluding the port is broken — and quarantine rather than
+>   switching the assertion to the property.
+>
+> ### The part that is actually hard
+>
+> A ported test that goes green proves nothing — it may be green because it asserts nothing.
+> Assume that of your own work and go looking. Two specific things to check before you claim
+> the file is done:
+>
+> - **Was the original test vacuous?** `Slider`'s axe test called `axe()` synchronously after
+>   `mount()`, before Vue flushed, so the only interactive element still had `display: none`,
+>   axe skipped it, and the rule came back `inapplicable`. A green test asserting nothing. If
+>   your file has an axe test, **probe `results.passes` / `results.inapplicable` /
+>   `results.incomplete` in BOTH environments** and say in the finding which rules actually ran.
+>   Three notes, all learned by measurement:
+>   - **Read `incomplete` too.** Under jsdom `color-contrast` lands in `incomplete` with *zero
+>     nodes*, not in `inapplicable`. A census reading only the other two buckets reports "the rule
+>     ran" when nothing was examined.
+>   - **Expect the answer to be "not vacuous."** `Slider` was vacuous for a specific reason — an
+>     element hidden at mount time. `Progress` and `Toolbar` both turned out fine. A negative
+>     result here is the normal one and is worth stating plainly.
+>   - **`color-contrast` is usually the only rule browser mode adds**, and it is not a formality:
+>     `Progress` measured 4.85:1 against a 4.5:1 threshold.
+> - **Could the test fail at all?** Separate from vacuity, and more damning. Mutate the component
+>   — delete the attribute or handler the test is about — and check the test goes red. `Separator`'s
+>   only test survives **deleting `role="separator"` entirely**: zero violations *and* zero passes,
+>   green either way. If your test cannot fail, that is a `found-gap` row.
+> - **Is your ported test vacuous?** If a test asserts a negative ("does not focus", "does not
+>   emit"), check that it can distinguish — construct the positive case in a throwaway probe,
+>   confirm it behaves differently, then delete the probe. `Label`'s two negative click tests
+>   would both have passed against a component that did nothing at all.
+> - **Did a retrying matcher widen a timing assertion?** This is the likeliest way a mechanically
+>   correct T2 port gets quietly weaker, and **the oracle cannot catch it** — the assertion count
+>   goes up, not down. `Progress` has `describe('after 200ms')` with a synchronous
+>   `expect(wrapper.html()).toContain(…)`; translated to `await expect.element(…)` it passes
+>   anywhere inside the sleep *plus* the retry budget, and would stay green if the fixture flipped
+>   at 900ms. When a `describe` name mentions a duration, assert **twice** — retrying matcher to
+>   settle the flush, then the original's exact synchronous read.
+>
+> **A green oracle is not the finish line.** All three files in the first batch came back
+> `0 lost, 0 gained`, and every real result came from probing past the oracles — mutating the
+> component to see whether the test could fail, reading the istanbul map for code no test reaches
+> (`Toolbar` found an entire `RovingFocusGroup` implementation neither suite ever exercises). If
+> your report is three green ticks and nothing else, you stopped too early.
+>
+> ### Verify, in this order
+>
+> ```bash
+> pnpm --filter reka-ui exec vitest run --project=browser <your file>
+> pnpm --filter reka-ui port:checklist {COMPONENT} --complete
+> pnpm --filter reka-ui port:parity {COMPONENT} --complete
+> pnpm --filter reka-ui port:coverage {COMPONENT}
+> pnpm --filter reka-ui exec vitest run --project=unit <the original file>   # still green
+> ```
+>
+> All must exit 0. If `port:coverage` reports a LOST line, **do not paper over it** — either
+> the port is weaker (fix it) or the line was only reachable by jsdom being jsdom, in which
+> case argue it per line in `PORT-COVERAGE-ALLOW.tsv` with a `FINDINGS.tsv` key. Never exempt
+> a whole file.
+>
+> If `port:coverage` reports GAINED lines, **ask which one earned it before you write it into a
+> finding.** `vitest-browser-vue` auto-unmounts and the jsdom suite almost never does, so
+> teardown lines come free from the harness, not from Chromium. If `mount()` + `unmount()`
+> under jsdom would reach the same line, it is a gap in the original suite — still worth
+> recording, but not as a point for browser mode. And read the istanbul **branch** map, not
+> just the line count: `Label` gained a line whose `if` was taken zero times, so the behaviour
+> behind it is still tested by nobody.
+>
+> ### Report back
+>
+> The test counts, the three oracle results, every `FINDINGS.tsv` key you added, anything that
+> belongs in `AGENTS.md`'s translation table or gotchas list (say so — do not edit `AGENTS.md`
+> yourself, it is shared and concurrent agents will conflict), and anything you are unsure of.
+> Being wrong is recoverable; being confidently wrong in a findings row is not.
+
+---
+
+## Reviewer prompt
+
+> You are reviewing one jsdom → browser-mode test port in the reka-ui fork at
+> `/Users/alexanderopalic/Projects/reka-ui-bench-mark`.
+>
+> **Read exactly these two files and nothing the implementer wrote about them:**
+> - `packages/core/src/{FILE}` — the jsdom original
+> - `packages/core/src/{COMPONENT}.browser.test.ts` — the port
+>
+> You may also read `AGENTS.md` for the translation table, and the component source to check a
+> claim. **Do not read the implementer's reasoning or its `FINDINGS.tsv` rows before forming
+> your own view** — you are the independent check, and the whole value of this role is that
+> your context is clean.
+>
+> Your brief is not "does this behave like the original". It is:
+>
+> > **Does this test still test anything?** Assume the port is worse than the original and find
+> > how.
+>
+> Specifically hunt for:
+>
+> - An assertion that got weaker — a narrow matcher swapped for a broad one, an exact-HTML
+>   comparison replaced by a single-attribute check, a `toBe` become a `toBeTruthy`.
+> - A test that now passes vacuously — it would pass against a component that did nothing.
+>   Would this test fail if the feature were deleted? If you cannot say yes, say so.
+> - A deleted jsdom mock replaced by a browser workaround that is *more* artificial than the
+>   mock was.
+> - A `.element()` synchronous read racing Vue's flush where an awaited `expect.element` was
+>   needed. `expect.element` retries; `.element()` does not.
+> - A `waitFor` / `setTimeout` / arbitrary sleep papering over a race.
+> - A quarantined `it.fails` that is hiding a genuine porting mistake rather than a real bug in
+>   the library. Read the linked finding and decide whether it is an explanation or an excuse.
+> - Setup moved into `beforeEach` in a way that changed what the test sees — spies that no
+>   longer accumulate, state that no longer persists across tests.
+>
+> **You do not implement.** Report what you found, ranked by how much it matters, and say
+> explicitly for each item whether you verified it by running something or only by reading. If
+> the port is sound, say so plainly and name the two or three things you checked hardest — a
+> review that finds nothing is a useful result, but only if it says what it looked for.
+
+---
+
+## Changelog
+
+Every entry here should be a batch that went wrong and the prompt change that fixes it.
+
+- **Initial version** — extracted from the Phase 1 trial runs (`useForwardExpose`, `Label`,
+  `Slider`), which were driven by hand. The implementer prompt's "the part that is actually
+  hard" section is written directly from the two ways those three files nearly went wrong: the
+  vacuous-original case (`Slider`'s axe test) and the vacuous-port case (`Label`'s two negative
+  click tests).
+
+- **After T2 batch 1** (`Separator`, `Progress`, `Toolbar`) — validated, and it held: three
+  agents, three clean ports on the first try, all oracles green, no weakened assertions, and 8
+  findings. No prompt change was needed to prevent a bad port. Four additions, all of which the
+  batch had to discover the hard way:
+
+  1. **The axe vacuity check needs to read `incomplete` too.** Under jsdom `color-contrast` lands
+     in `incomplete` with *zero nodes*, not in `inapplicable`, so a census reading only `passes`
+     and `inapplicable` reports "the rule ran" when nothing was examined.
+  2. **Say that the vacuity check cuts both ways.** The prompt led with `Slider`, and two of three
+     agents had to establish for themselves that their original was *not* vacuous. Worth stating
+     that a negative result is the expected one.
+  3. **Warn about the retrying matcher.** `Progress` nearly shipped a mechanically-correct
+     translation that silently widened a 200ms timing assertion by the retry budget. The oracle
+     cannot catch this — assertion count goes *up*. This is now a gotcha in `AGENTS.md`, and it is
+     the single most likely way a T2 port gets quietly weaker.
+  5. **Both silent vacuities now have prompt lines** (substring `getByText`, lazy `getBy*`), added
+     after `Switch` found them. These are the two failure modes that pass `port:parity` while the
+     test stops testing, so they matter more than anything else in this file.
+  6. **Portalled content needs `page.getBy*`.** `AlertDialog` — `screen` is container-scoped, so an
+     overlay port querying through `screen` matches nothing and fails in a way that looks like a
+     component bug.
+  4. **Tell them a green oracle is not the finish line.** All three files came back `0 lost,
+     0 gained` and every real result came from probing beyond the oracles — mutating the component
+     to see if the test could fail, reading the istanbul map for code no test reaches. Batch 1's
+     three most valuable findings are about the *test suite*, not the components.
```

# 8829a1bb — PORT-PROMPTS.md diff

```diff
diff --git a/PORT-PROMPTS.md b/PORT-PROMPTS.md
index 05c97734..bf96778e 100644
--- a/PORT-PROMPTS.md
+++ b/PORT-PROMPTS.md
@@ -77,8 +77,11 @@ this file should say what went wrong in the changelog at the bottom.
 > - **A locator is lazy — `getBy*` does not throw.** In a `@testing-library` original the throw *is*
 >   the assertion. Translate a bare `getByTestId(…)` to
 >   `await expect.element(…).toBeInTheDocument()`, or the test has no assertion left.
-> - **Portalled content (Dialog, Popover, Select, Tooltip, Toast, menus) needs `page.getBy*`**, not
->   `screen.getBy*`, which is scoped to the render container and will match nothing.
+> - **Portalled content (Dialog, Popover, Select, Tooltip, Toast, menus) is reachable from BOTH
+>   `screen.getBy*` and `page.getBy*`** — they return the same node. `render`'s helpers bind to
+>   `baseElement`, which defaults to `document.body`. Only `screen.container` and `screen.locator`
+>   are container-scoped. The trap runs the other way: because the helpers are document-scoped,
+>   `screen.getBy*` also matches **other renders** in the same test.
 > - **A `attributes('x')` assertion may be testing jsdom, not the platform.** Vue writes a DOM
 >   *property* rather than an attribute whenever `key in el`, and jsdom's IDL setters reflect into
 >   the content attribute where Chromium's often do not. If an attribute assertion fails in the
@@ -231,8 +234,37 @@ Every entry here should be a batch that went wrong and the prompt change that fi
      test stops testing, so they matter more than anything else in this file.
   6. **Portalled content needs `page.getBy*`.** `AlertDialog` — `screen` is container-scoped, so an
      overlay port querying through `screen` matches nothing and fails in a way that looks like a
-     component bug.
+     component bug. **← WRONG, and corrected after batch 4. See below.**
   4. **Tell them a green oracle is not the finish line.** All three files came back `0 lost,
      0 gained` and every real result came from probing beyond the oracles — mutating the component
      to see if the test could fail, reading the istanbul map for code no test reaches. Batch 1's
      three most valuable findings are about the *test suite*, not the components.
+
+- **After T2 batch 4** (`RovingFocus`, `Teleport`, `Toggle`) — three clean ports, all oracles green
+  first try, 16 findings. No prompt change was needed to prevent a bad port. The change that *was*
+  needed is of a new kind, and it is the reason this changelog exists:
+
+  1. **A prompt line was factually wrong, and the batch caught it.** Entry 6 above told agents that
+     `screen.getBy*` is container-scoped and cannot see portalled content. `Teleport` measured the
+     opposite; the claim was then settled against `AlertDialog`'s own fixture — content's parent is
+     `BODY`, `container.contains(content)` is `false`, and `screen.getByRole('alertdialog')` still
+     returns **the same node** `page` does — and corroborated from `vitest-browser-vue` source
+     (`baseElement` defaults to `document.body`; the helpers bind to it). The prompt line is now
+     replaced, `AGENTS.md` is corrected, and the misleading comment in the `AlertDialog` port is
+     rewritten. **The failure mode to notice: a wrong rule that errs toward extra work is nearly
+     invisible.** Agents obeyed it, their ports stayed green, and the oracles had nothing to say —
+     because using `page` where `screen` would do costs nothing but a wrong belief. It would have
+     been inherited by all eight T3 overlays.
+  2. **Therefore: findings are evidence, not verdicts.** Two rows from earlier batches were
+     re-verdicted by this one — the portal claim, and `Toolbar#roving-focus-untested`, which
+     overstated its gap (`RovingFocus` re-measured across all 12 consumer suites in one istanbul run
+     and found the functions *are* reached; what is actually dead is narrower and better specified).
+     Nothing in the apparatus checks a finding's *reasoning*, only a port's structure — so a
+     plausible wrong cause survives a batch and ships to the next one. When a finding is the kind
+     that generalises to many files, measure it twice.
+  3. **Two `AGENTS.md` gotchas needed qualifiers rather than rewrites**, both from originals doing
+     something the rule did not anticipate: `userEvent.tab()` polyfills tab order in JS
+     (`getTabDestination.js`), so "tab-order tests are unportable from jsdom" holds only for raw
+     keydowns; and `color-contrast` — "the one rule browser mode adds" — is `inapplicable` in
+     Chromium too when the fixture has no text, which is the normal shape of a headless-library
+     fixture. Both were stated too absolutely because each came from a single file.
```

# 40bd82ea — AGENTS.md diff

```diff
diff --git a/AGENTS.md b/AGENTS.md
index d81fafd4..e13546fe 100644
--- a/AGENTS.md
+++ b/AGENTS.md
@@ -5,8 +5,17 @@ ship a feature. It exists for two reasons, in order:
 
 1. **Learn Vitest Browser Mode properly** — by using it on a real, non-trivial component
    library rather than a toy app.
-2. **Port the testing strategy from jsdom to Vitest Browser Mode** — eventually all 97 test
-   files, starting with `Slider`.
+2. **Get rid of jsdom entirely.** All 97 test files move: the 87 that touch the DOM go to
+   Vitest Browser Mode, and the 10 that touch none go to a plain `node` project. Nothing
+   stays on jsdom. Started with `Slider`.
+
+> **The second goal changed mid-effort.** It used to read "port the testing strategy from
+> jsdom to browser mode", with browser mode as a second tier and `stay-jsdom` a legitimate
+> per-file verdict. It is not one any more: "this port gains nothing" is now an observation
+> about value, not a reason to leave a file on jsdom. The only exemption is *needs no DOM at
+> all*, which is a property of the file rather than a judgement. Findings written under the
+> old premise have been re-verdicted; their measurements are unchanged and still worth
+> reading.
 
 `CLAUDE.md` is a symlink to this file — one document, two names, so every agent reads the same
 thing. Repo mechanics are at the bottom under [Repo reference](#repo-reference); everything
@@ -85,11 +94,16 @@ Most useful paths:
 
 ## Current state
 
-Config lives in `packages/core/vite.config.ts`, split into two projects over the same source
+Config lives in `packages/core/vite.config.ts`, split into three projects over the same source
 tree:
 
-- **`unit`** — jsdom, `./**/*.test.{ts,js}`, explicitly excluding `**/*.browser.test.ts`,
-  setup file `vitest.setup.ts`.
+- **`node`** — `environment: 'node'`, **no setup file**, an explicit list of the 10 files that
+  touch no DOM (`NODE_TESTS` in the config). These never needed jsdom; they are the first
+  files to leave it. 571 tests, 28% of the suite. `vitest.setup.ts` is deliberately not
+  loaded — it exists entirely to paper over jsdom.
+- **`unit`** — jsdom, `./**/*.test.{ts,js}`, excluding `**/*.browser.test.ts` *and* the
+  `NODE_TESTS` list, setup file `vitest.setup.ts`. **This is the project being deleted.** It
+  only ever shrinks; the migration is done when its include list matches nothing.
 - **`browser`** — Playwright/Chromium headless, `./**/*.browser.test.ts`, setup file
   `vitest.browser.setup.ts`. That is a *separate* file, not the jsdom one: it loads the CSS shim
   and the axe matchers and nothing else. The project also carries its own `resolve.alias` (the
@@ -118,13 +132,18 @@ Ported so far:
   `port:parity Slider --complete` and `port:coverage Slider` both exit 0; 1 test is quarantined
   under `it.fails` (the axe finding), 1 coverage line is allowed (the `linearScale` finding),
   and the pointer-capture claim is mutation-verified. Five findings in `FINDINGS.tsv`.
+- `packages/core/src/shared/useForwardExpose.browser.test.ts` — **complete, 10 of 10.** A
+  composable with no stubs to delete and no fixture, so the port is near character-identical to
+  the original and gains no coverage, at ~1.5× the wall clock. Worth knowing as the honest
+  price of a boring port; not a reason to skip one. Numbers in `FINDINGS.tsv`.
 
 ### Commands
 
 ```bash
-pnpm --filter reka-ui exec vitest run                    # both projects
-pnpm --filter reka-ui exec vitest run --project=browser  # browser only
-pnpm --filter reka-ui exec vitest run --project=unit     # jsdom only
+pnpm --filter reka-ui exec vitest run                    # all three projects
+pnpm --filter reka-ui exec vitest run --project=browser  # the destination
+pnpm --filter reka-ui exec vitest run --project=unit     # jsdom — shrinking
+pnpm --filter reka-ui exec vitest run --project=node     # no DOM at all
 
 pnpm --filter reka-ui port:checklist Slider              # every describe/it, ✓ or ✗
 pnpm --filter reka-ui port:parity Slider --complete      # nothing renamed or weakened
@@ -135,7 +154,7 @@ pnpm --filter reka-ui port:coverage Slider               # still reaches the sam
 source order with each node marked present or missing (`--missing-only` for just the gaps), and
 it is the only check that compares `describe` blocks directly. Full rules in `PORTING.md` §2.
 
-Baseline as of the last run: **100 files / 2055 passing + 1 expected fail.** Never leave the
+Baseline as of the last run: **101 files / 2065 passing + 1 expected fail.** Never leave the
 `unit` project broken to make progress on `browser`; the two run side by side on purpose.
 
 ---
@@ -226,6 +245,18 @@ the first with nothing on screen. Move it into `beforeEach`. Module-level `vi.fn
 *not* cleared by that, so originals that depend on a call count accumulating across tests
 (`toHaveBeenCalledTimes(1)`, then `(2)`) still port unchanged.
 
+**…which means ports cover teardown, and the jsdom suite never did.** `cleanup()` calls
+`wrapper.unmount()` (`vitest-browser-vue/dist/index.js` registers it in a `beforeEach`), so
+every ported test tears its component down — released refs, disconnected observers, removed
+listeners. VTU's `mount()` only unmounts if you ask, and essentially no jsdom file here does.
+Measured: `useForwardExpose.ts:68` (`if (!ref) return`, the ref-detach path) is covered by the
+port and by no jsdom test in the file.
+
+**Do not book that as a browser-mode win.** It is the mirror image of the allowed-loss rule in
+`PORTING.md` §2.2: a `GAINED` line needs arguing too. Adding one `wrapper.unmount()` to a jsdom
+test covers that exact line (verified — probe written, istanbul hit count 1, probe deleted), so
+the harness earned it, not Chromium. Ask which one it was before writing it into a finding.
+
 **Inline `template:` components still compile.** Worth stating because the opposite is plausible
 — under Vite the `vue` package's browser condition resolves to the runtime-only build. Measured:
 `render({ template: '<form>…</form>', components: { Slider } })` compiles and renders in the
@@ -345,9 +376,11 @@ jsdom nor the browser port would have caught that, because the original test fir
 ## Open questions
 
 - **Performance — deliberately deferred until the migration is done.** Measuring one ported file
-  tells you about browser startup, not about the suite. Revisit with the whole thing ported:
-  is browser mode fast enough to be the default, or does it stay a second tier for the components
-  that actually need layout and real input?
+  tells you about browser startup, not about the suite. The question is no longer *whether*
+  browser mode is fast enough to be the default — it is the default by decision — but **what an
+  all-browser suite costs**, and whether CI needs sharding to absorb it. Per-file evidence so far
+  says it is affordable: ~1.5× wall clock on the worst case (a composable that gains nothing) and
+  ~0.6s for a cold Chromium. Measure the whole suite before trusting that.
 - Worth adding `toMatchScreenshot` visual regression once a CSS shim exists? Probably **not yet**,
   and possibly never in this fork. `docs/guide/browser/visual-regression-testing.md:31-49` is blunt
   that screenshots are unstable across environments — font rendering, GPU drivers, headless vs
```

# Post-migration reference-quality change — file status

```text
commit 864db1986ef55dde4063eff926cd4164348842f5
Author:     Alexander Opalic <opalic@gmx.net>
AuthorDate: Sat Aug 22 12:42:02 2026 +0200
Commit:     Alexander Opalic <opalic@gmx.net>
CommitDate: Sat Aug 22 12:42:02 2026 +0200

    test(core): make browser mode suite reference quality

M	A11Y-FINDINGS.md
M	AGENTS.md
M	FINDINGS.tsv
M	IMPROVING-PORTED-TESTS.md
M	MIGRATING-TO-BROWSER-MODE.md
M	PERFORMANCE.md
M	PORT-COVERAGE-ALLOW.tsv
M	PORTING.md
M	packages/core/cross-browser.expectations.ts
M	packages/core/env.d.ts
M	packages/core/package.json
M	packages/core/scripts/port/parity-coverage.mjs
M	packages/core/src/Autocomplete/Autocomplete.browser.test.ts
M	packages/core/src/Autocomplete/AutocompleteInput.vue
M	packages/core/src/Autocomplete/AutocompleteRoot.vue
A	packages/core/src/Calendar/CalendarFamily.aria.browser.test.ts
A	packages/core/src/Checkbox/Checkbox.aria.browser.test.ts
M	packages/core/src/ColorArea/ColorArea.browser.test.ts
M	packages/core/src/ColorSlider/ColorSlider.browser.test.ts
M	packages/core/src/Combobox/ComboboxInput.vue
M	packages/core/src/Combobox/ComboboxRoot.vue
M	packages/core/src/DateField/DateField.browser.test.ts
M	packages/core/src/DateRangeField/DateRangeFieldRoot.vue
A	packages/core/src/Drawer/Drawer.interactions.browser.test.ts
M	packages/core/src/Drawer/Drawer.snap.browser.test.ts
M	packages/core/src/Drawer/composables/useSwipeDismiss.browser.test.ts
M	packages/core/src/DropdownMenu/DropdownMenu.browser.test.ts
M	packages/core/src/DropdownMenu/DropdownMenuFilter.browser.test.ts
M	packages/core/src/HoverCard/HoverCard.browser.test.ts
M	packages/core/src/Listbox/Listbox.browser.test.ts
M	packages/core/src/Listbox/ListboxContent.vue
M	packages/core/src/Listbox/ListboxRoot.vue
M	packages/core/src/Menu/MenuItemImpl.vue
M	packages/core/src/NumberField/NumberField.browser.test.ts
M	packages/core/src/PinInput/PinInput.browser.test.ts
M	packages/core/src/Rating/Rating.browser.test.ts
M	packages/core/src/ScrollArea/ScrollArea.browser.test.ts
A	packages/core/src/ScrollArea/ScrollArea.interactions.browser.test.ts
A	packages/core/src/Select/SelectScrollButton.interactions.browser.test.ts
M	packages/core/src/Slider/Slider.browser.test.ts
A	packages/core/src/Splitter/Splitter.interactions.browser.test.ts
M	packages/core/src/Splitter/SplitterResizeHandle.vue
M	packages/core/src/Splitter/utils/composables/useWindowSplitterPanelGroupBehavior.ts
A	packages/core/src/Tabs/Tabs.aria.browser.test.ts
A	packages/core/src/Tabs/TabsIndicator.interactions.browser.test.ts
M	packages/core/src/TagsInput/TagsInput.browser.test.ts
M	packages/core/src/TimeRangeField/TimeRangeFieldRoot.vue
A	packages/core/src/Toggle/Toggle.aria.browser.test.ts
M	packages/core/src/Toggle/Toggle.vue
A	packages/core/src/ToggleGroup/ToggleGroup.aria.browser.test.ts
A	packages/core/src/Tooltip/Tooltip.aria.browser.test.ts
A	packages/core/src/Tree/TreeVirtualizer.interactions.browser.test.ts
A	packages/core/src/aria-activedescendant.browser.test.ts
A	packages/core/src/native-form-validation.browser.test.ts
M	packages/core/src/shared/useIsUsingKeyboard.browser.test.ts
D	packages/core/src/test/browser.ts
A	packages/core/vite.config.browser-coverage.ts
M	packages/core/vite.config.cross-browser.ts
M	packages/core/vite.config.ts
M	packages/core/vitest.browser.commands.ts
```
