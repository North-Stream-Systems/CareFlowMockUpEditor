# CareFlow prototype

Clickable UI mock-up of CareFlow (domiciliary care management software). It exists to show a developer
how things should look and behave — it is **not** the product. All data is hard-coded mock data; there is
no backend. Favour clarity of intent over engineering rigour, but keep it working.

## Stack

- Vite multi-page app, React 18, plain CSS. No router, no state library, no TypeScript.
- Each root `*.html` file is one page and its own Vite entry (listed in `vite.config.js`).
  Filenames are the public URLs from the original GitHub Pages site — don't rename them.
- Pages link to each other with plain `<a href="CareFlow_X.html">` / `window.location`; there is no shared app shell.

## Layout

| Page (URL)                   | Code              | What it is |
|------------------------------|-------------------|------------|
| `index.html`                 | inline (static)   | Landing page linking to every screen |
| `CareFlow_Login.html`        | `src/login/`      | Login + routing to desktop / mobile / setup |
| `CareFlow_Setup.html`        | `src/setup/`      | 8-step organisation onboarding wizard (`step-N-*.jsx`) |
| `CareFlow_Prototype_v3.html` | `src/desktop/`    | Main desktop app: widget dashboard, staff, messages |
| `CareFlow_Rostering.html`    | `src/rostering/`  | Gantt rota, week view, rounds, rules, ECM |
| `CareFlow_Clients.html`      | `src/clients/`    | Client list, client profile modal + tabs, referrals, incidents, complaints |
| `CareFlow_Finance.html`      | `src/finance/`    | Invoices, credit notes, funders, payroll, rate sheets |
| `CareFlow_Mobile.html`       | `src/mobile/`     | Care worker phone app (schedule, EVV visit, messages) |

Inside each `src/<page>/`:
- `main.jsx` — entry; imports modules and renders `<App/>`. Rarely needs editing.
- `App.jsx` — top-level component: nav, sidebar selection, which screen renders.
- `styles.css` — the page's whole stylesheet (CSS variables in `:root` at the top). Class names are short
  (`.sb-item`, `.ph-sub`, `.kpi`); grep the CSS before inventing new classes.
- `mock-data.jsx` / `data.jsx` / `*-data.jsx` — hard-coded arrays. Edit these to change what's shown.
- One file per screen/feature, named after it. Find things with `grep -rn "ComponentName" src/<page>`.

Pages mostly do **not** share code: each has its own copy of nav, helpers (`avCol`, `inits`), colours, etc.
They have drifted slightly, so a change to e.g. the top nav must be made in each page that has it.
The one exception is `src/shared/client-overview/` (logic only, no UI/CSS), used by Clients and Setup.

## Client overview system (forms → widgets)

Spec for the developer: `docs/client-overview.md`. Code map:
- `src/shared/client-overview/` — `forms.js` (default forms, field types), `widgets.js` (widget types,
  built-ins, starter templates), `rules.js` (alert operators, value formatting), `store.js` (org config in
  localStorage `cf_client_overview_v1`, `useOverviewConfig()` hook).
- `src/clients/form-submissions.jsx` — seeded mock entries per client + staff-added ones (`cf_client_submissions_v1`).
- `src/clients/overview-widgets.jsx` — `OverviewGrid`, renders the layout (view mode on clients, edit mode in settings).
- `src/clients/client-form-tabs.jsx` — client profile Overview + Forms tabs.
- `src/clients/settings-overview.jsx` / `settings-forms.jsx` — Clients › Settings pages (`?page=settings-overview|settings-forms`).
- `src/setup/step-8-client-profiles.jsx` — starter template picker in the Setup wizard.
Stored config survives reloads; if a schema change breaks it, bump the localStorage key.

## Workflow — always verify

```
npm install
npm run dev            # local dev server with hot reload
npm run check          # build + open every page and click every nav/sidebar/tab item in Chromium;
                       # exits non-zero on any runtime error. Screenshots land in .snap/current/
```

Run `npm run check` after every change — a JSX/runtime error otherwise only shows up as a blank page.
Look at the relevant screenshots in `.snap/current/` (`<Page>.html__load.png`, `__clickNN.png`) to confirm
the change looks right.

For refactors that should **not** change the UI:
```
npm run snap:baseline  # before the change
npm run check && npm run snap:compare   # after; pixel-diffs, writes diff images to .snap/current/_diff
```
1–20px diffs on `__click00`/`__click07` are anti-aliasing noise, not real changes.

`tools/snap.mjs` notes: clock frozen to 2026-03-10 10:30, animations disabled. In the sandbox the proxy only
works from curl, so Google Fonts are fetched via curl and cached in `.snap/cache`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on push to `main`
(repo Settings → Pages → Source must be "GitHub Actions"). `base: './'` keeps asset paths relative.
