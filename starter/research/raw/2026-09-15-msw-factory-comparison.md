---
kind: note
title: MSW product factory comparison
url: https://github.com/mswjs/http-middleware
author: Codex
publisher: local workspace
published: 2026-09-15
collected: 2026-09-15
status: complete
---

# MSW product factory comparison

Inspected the official mswjs/http-middleware README API examples on 2026-09-15. They import http and HttpResponse from msw, register a GET handler with http.get(), and return a JSON body through HttpResponse.json().

User requested a comparison directly after the Faker factory slide. The illustrative GET /api/products handler returns two manually defined products on the left and two aProduct() results on the right. This preserves the response shape and count, not exact values. Handler setup and imports are omitted from the slide. No execution claim is made.
