# Talk brief

## Working title

Frontend-Testing neu gedacht: Black-Box-Strategie mit Vitest Browser Mode

The [original conference abstract](raw/tacon-2026-original-abstract.md) defines the advertised scope. The session lasts 45 minutes. Reserving five minutes for questions is a planning assumption.

## Audience

TACON attendees interested in frontend testing and test automation. Plan for mixed framework experience. Basic test familiarity is an assumption to confirm.

## Intended outcome

Attendees can structure a frontend test suite around user-visible behavior, introduce Vitest Browser Mode incrementally, and apply factories, page objects, screenshot comparisons, and accessibility checks.

## Current thesis

The advertised talk presents a black-box testing strategy from a production Vue PWA. Browser Mode supplies the real browser environment for integration tests that exercise user actions and visible results.

## Supporting ideas

- Demonstrate behavior assertions instead of internal refs or method calls.
- Explain the project's reported 70 percent integration, 20 percent unit, and 10 percent visual/accessibility distribution as a case study.
- Show data factories and page objects in a concrete test.
- Include screenshot comparison for a design-system component and explain the limits of role-based queries for accessibility.

## Open questions

- Claw & Chew is the user-selected example repository at `/Users/alexanderopalic/Projects/opensource/claw-and-chew`. Its README describes a prepared Nuxt demo shop with simulated checkout, not a production PWA. Explain this distinction from the original abstract on stage.
- The existing `app/components/Shop.browser.test.ts` purchase flow can anchor the talk. `ProductCard` supplies the blocked-button comparison. Checkout contrast, dialog focus, and product-size ARIA snapshots supply accessibility examples.
- Runnable factory, page-object, and screenshot examples now live under the shop's `talk/tacon/` directory with `talk/vitest.tacon.config.ts`. The three examples pass. The screenshot demo has baseline, deliberately changed, and diff images in the deck. The original app/tests suites remain separate.
- The German deck is in `../slides.md`, with timed speaker notes. `../presenter.md` contains the rehearsal guide. Slides 1–29 include 40 minutes of content and questions, followed by four backup slides.
- Can a controlled current benchmark substantiate the abstract's four-times speed claim? Existing wiki evidence does not establish a general multiplier.
- Does the organizer include questions in the 45-minute slot?

## Scope boundaries

- Keep installation and provider internals brief so the advertised testing patterns receive time.
- Retain end-to-end testing for complete application journeys.
- Role-based queries are useful accessibility feedback, but do not establish full accessibility coverage.
