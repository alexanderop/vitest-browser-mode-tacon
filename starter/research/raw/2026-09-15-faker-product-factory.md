---
kind: note
title: Faker product factory API verification
url: https://fakerjs.dev/api/commerce
author: Codex
publisher: local workspace
published: 2026-09-15
collected: 2026-09-15
status: complete
---

# Faker product factory API verification

Inspected official documentation at https://fakerjs.dev/api/commerce, https://fakerjs.dev/api/string and https://fakerjs.dev/guide/usage on 2026-09-15.

The named faker export comes from @faker-js/faker. string.uuid() generates a UUID. commerce.productName() generates a product name. commerce.price() returns a string; the slide converts it using Number().

The user requested a much simpler standalone product factory using Faker.js. The teaching example has only id, name and price, plus aProduct() at its call site. It is not an excerpt from the executable Claw & Chew cart factory.
