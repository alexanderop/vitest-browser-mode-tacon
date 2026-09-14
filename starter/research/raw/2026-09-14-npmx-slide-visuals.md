---
kind: note
title: User-supplied npmx screenshot and test pyramid
url: unknown
author: user
publisher: user
published: 2026-09-14
collected: 2026-09-14
status: complete
---

# Accepted visual revision

The user supplied a screenshot of the Vitest package page on npmx.dev and requested a two-column slide: test pyramid on the left, the screenshot on the right. The screenshot is copied unchanged to `starter/public/shop/npmx-vitest-overview.png`. Its displayed package statistics are a supplied capture, not independently verified current metrics.

The generated illustration at `starter/public/diagrams/npmx-test-pyramid.png` schematically shows Node logic, Browser Mode components with axe, and Playwright E2E. Its tier areas do not encode test counts or a recommended distribution. The technical mapping derives from the pinned inspection in [npmx testing strategy](2026-09-14-npmx-testing-strategy.md). The screenshot introduces the product, not test execution evidence.
