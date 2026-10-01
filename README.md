# CareFlow — clickable prototype

A UI mock-up of CareFlow, built to show how the product should look and behave. Everything runs in the
browser on hard-coded sample data — there's no backend.

## Pages

- **index.html** — landing page with links to every screen
- **Login**, **Setup** (onboarding wizard), **Desktop app** (dashboard / staff / messages),
  **Rostering**, **Clients**, **Finance**, **Mobile** (care worker app)

## Running it

Requires Node 20+.

```
npm install
npm run dev      # opens a local server with live reload
npm run build    # production build into dist/
npm run check    # build, then open every page in a headless browser and fail on any error
```

Code for each page lives in `src/<page>/`, one file per screen, with its mock data in `mock-data.jsx`.
See `CLAUDE.md` for the full map.

## Publishing

Pushing to `main` deploys to GitHub Pages via GitHub Actions
(one-off: repo **Settings → Pages → Source → GitHub Actions**).
