# GARUDA — Intelligence Platform (Frontend)

Grid-based Analytics & Real-time Unified Data Architecture. A React.js + JavaScript
(no TypeScript) frontend for a unified investigative intelligence workspace, built
against mock data with an API layer designed to be swapped for a real backend
without touching any UI component.

## Stack

- React 19 + Vite, plain JavaScript/JSX (no `.ts`/`.tsx`, no TypeScript config)
- React Router for routing and protected routes
- CSS Modules + a shared token file (`src/styles/tokens.css`) for the dark
  command-center design system — no CSS-in-JS, no utility framework
- [Lucide React](https://lucide.dev) for icons
- [Recharts](https://recharts.org) for charts (FIR analytics, AI pipeline monitoring)
- [React Flow](https://reactflow.dev) for the investigative network graph
- [React Leaflet](https://react-leaflet.js.org) + OpenStreetMap tiles for Geo Intelligence
- Vitest + React Testing Library for unit tests

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run test      # run the unit test suite
npm run lint      # oxlint
```

Copy `.env.example` to `.env` and adjust `VITE_API_BASE_URL` / `VITE_WS_URL` once a
backend exists. Nothing needs to change in components — only the functions in
`src/services/*`.

### Signing in

There is no real authentication backend. The login screen lets you pick from six
synthetic demo accounts, one per role (Investigator, Senior Investigator,
Intelligence Analyst, Supervisor, Administrator, Auditor), so you can preview how
the UI adapts to each role's permissions (see `src/utils/permissions.js`).

## Architecture

```
src/
├── components/
│   ├── ui/          # generic, reusable design-system components
│   └── entities/     # domain cards (Person, Vehicle, Phone, Bank, Case, ...)
├── layouts/          # app shell: Header, Sidebar, Breadcrumbs, notifications
├── pages/            # one folder per module, each with its own subcomponents
├── routes/           # ProtectedRoute wrapper
├── context/          # Auth, Notification, and UI (sidebar/selection) state
├── hooks/            # usePermission, useKeyboardShortcuts, useDebounce, ...
├── services/         # one file per domain; all currently resolve mock data
├── data/             # mock datasets consumed only by services, never by UI
├── utils/            # formatters, permission map, shared constants
└── styles/           # design tokens + global reset
```

**Mock data → real API.** Every `src/services/*.js` file currently returns data
from `src/data/*.js` through a small `mockDelay()` helper (to exercise loading
states realistically). Swapping to a real backend means rewriting the body of
those functions to call `request()` from `src/services/api.js` — no page or
component needs to change.

**Permissions are UI-level only.** `PermissionGate` and `usePermission` hide
controls the current role shouldn't use, driven by `ROLE_PERMISSIONS` in
`src/utils/permissions.js`. This is a UX convenience, not a security boundary —
a real backend must independently enforce authorization.

**Real-time readiness.** `src/services/eventService.js` is a subscribe/emit
abstraction around a WebSocket that currently has nothing to connect to
(`VITE_WS_URL` unset). Alerts, geo events, and pipeline status are all read via
one-shot service calls today; they can move to `eventService.subscribe(...)`
later without changing how components consume them.

## Modules implemented

Dashboard · Profile Search (quick / advanced / full federated-query
orchestration) · Unified Profile (identity, risk scoring, criminal / vehicle /
telecom / financial / civil intelligence, timeline, source provenance) ·
Network Analysis (interactive entity graph) · Geo Intelligence (live map,
layered visibility, geo-fence creation workflow) · Integrations (18 connected
systems) · AI Pipeline (processing stages, model monitoring, document queue) ·
Governance / Audit Trail · Alerts · Settings.

## Known environment note

Geo Intelligence renders OpenStreetMap tiles, which requires outbound internet
access from the browser. In network-restricted environments the markers,
geo-fences, and controls still render correctly — only the base map imagery
will be blank.
