# template-frontend-vue

Frontend template for [DynamiaTools](https://dynamia.tools) using Vite, Vue 3 and
[`@dynamia-tools/tailadmin-vue`](https://github.com/dynamiatools/tailadmin-vue-template). This repository is
consumed by the [DynamiaTools CLI](https://github.com/dynamiatools/framework/tree/main/platform/packages/cli)
(`dynamia new`) to scaffold new Vue frontends — it is not meant to be used standalone, though it builds and
type-checks as-is (the project name defaults to `{{PROJECT_NAME}}` as a literal; the CLI replaces it with your
project's name during generation).

## Stack

- Vite + Vue 3 + TypeScript
- [`@dynamia-tools/tailadmin-vue`](https://github.com/dynamiatools/tailadmin-vue-template) — free, MIT-licensed
  Tailwind CSS 4 admin dashboard components (layout shell, 60+ base components, 57 `ext/*` building blocks)
- `@dynamia-tools/sdk` — typed REST client for a DynamiaTools backend
- `@dynamia-tools/vue` — Vue adapter (viewer/form/table/crud renderers, `useNavigation`/`useCrud`/`useCrudPage`
  composables)
- Vue Router 5

## Requirements

| Tool | Version |
|---|---|
| Node.js | 24+ |
| pnpm | recommended (npm/yarn also work) |

## Running locally

```bash
pnpm install
cp .env.example .env   # point VITE_API_BASE_URL at your backend if it's not on localhost:8080
pnpm dev
```

The starter Dashboard page calls the backend's navigation endpoint on load and shows a connection status card —
useful to confirm the frontend can reach your DynamiaTools backend before building real pages.

## What's wired up

- `src/main.ts` — installs `DynamiaVue` with a shared `DynamiaClient` instance (`src/lib/dynamia.ts`).
- `src/App.vue` — the TailAdmin shell (`ThemeProvider` + `SidebarProvider` + `RouterView`), per
  [its layout guide](https://github.com/dynamiatools/tailadmin-vue-template/blob/main/docs/USER_GUIDE.md).
- `src/views/Dashboard.vue` — a single page wrapped in `AdminLayout`, using `useNavigation()` from
  `@dynamia-tools/vue`. Replace this with your own routes.
- The sidebar/header use TailAdmin's stock demo menu and mock user data — see the
  [layout guide §4–6](https://github.com/dynamiatools/tailadmin-vue-template/blob/main/docs/USER_GUIDE.md) for
  wiring your own menu (ideally driven by `useNavigation()`'s `nodes`) and real user/notification data via props.

## Template author conventions

This template is consumed by the DynamiaTools CLI's token-replacement pipeline
(`platform/packages/cli/src/utils/replace.ts` in the `framework` repo). Only one token is used for frontend
templates: `{{PROJECT_NAME}}`, replaced in `package.json`'s `name`, `index.html`'s `<title>`, and the router's
`document.title`. It's a plain text substitution across the whole file (`.ts`, `.vue`, `.html`, `.json`, …), with
no awareness of Vue/JS syntax, so:

- **Never write `{{PROJECT_NAME}}` directly inside a `.vue` file's `<template>` block** — Vue's template tokenizer
  scans for the next `}}` to close an interpolation without being JS-aware, so even a quoted string like
  `{{ '{{PROJECT_NAME}}' }}` breaks (`Unterminated string constant`): the tokenizer treats the `}}` inside the
  quotes as the interpolation's own closing delimiter, not part of the string.
- Instead, assign it to a constant in `<script setup>` (a plain string, not template-compiled) and reference that
  constant from the template — see `projectName` in `Dashboard.vue`.
- Inside a `.ts` file (not a Vue template), the literal text is safe as-is, e.g. the router's `document.title`.

## CI

`.github/workflows/build.yml` runs `pnpm install && pnpm run build` (type-check + build) on every push/PR to
catch template breakage before a user hits it via `dynamia new`.

## License

Apache-2.0 — © Dynamia Soluciones IT SAS
