# PRD — Affitti Frontend v1 (Web App)

| | |
|---|---|
| **Version** | 0.2 (Q1–Q3 resolved with stakeholder) |
| **Date** | 2026-06-11 |
| **Status** | Draft — pending Open Questions (§13) |
| **Scope** | Frontend web application only. Backend API contract is defined in *PRD — Affitti Backend v0.3*. |
| **Related** | PRD_Affitti_Backend_v0.3.md |

---

## 1. Problem Statement

The backend exposes scraped rental listings (MongoDB → TypeScript API on Firebase Functions) with read, decision-write, and aggregation endpoints. Users currently have no interface to browse listings, record decisions (`stateMaloi`), or monitor evaluation progress.

V1 of the frontend delivers a web application that lets an authenticated user view listings in a tabular format and gives unauthenticated visitors a read-only database summary.

## 2. Goals (v1)

- **G1** — Google sign-in/sign-out flow with visible session state (user photo in the header).
- **G2** — **Tabella Page**: authenticated tabular view of listings with the defined columns, **plus decision actions** (set `stateMaloi`, edit `description`) and filters by `province`/`type`/`stateMaloi`.
- **G3** — **Landing / Senza Autenticazione Page**: public summary of the current database state (from the public aggregate endpoint).
- **G4** — Application shell (routing, layout, header) prepared to host future pages: *Mappa*, *Analisi*, *Senza Scelta*.
- **G5** — State management with Redux, typed end-to-end with the shared TypeScript DTOs from the backend.

## 3. Non-Goals (v1)

- **Mappa Page** — declared TODO in source; not in v1 scope (route reserved).
- **Analisi Page** — declared TODO; not in v1 scope (route reserved).
- **Senza Scelta Page** — declared TODO; not in v1 scope (route reserved).
- Mobile-native apps; v1 is responsive web only *(assumption)*.
- Localization framework; UI copy in Italian only *(assumption)*.

## 4. Users

| Persona | Access | v1 Capability |
|---|---|---|
| **Evaluator** | Google-authenticated | Full Tabella Page |
| **Visitor** | Unauthenticated | Landing page with database summary only |

> **Decision (Q1, resolved):** the auth conflict with Backend PRD v0.2 is settled by **amending the backend**: a single public, rate-limited, **aggregate-only** endpoint (`GET /public/stats/summary`) serves the landing page. It exposes counters only — never individual listing data. All other endpoints remain authenticated. The backend PRD has been updated to v0.3 accordingly.

## 5. Platform & Stack

| Component | Detail |
|---|---|
| Framework | React (SPA) |
| State | Redux (Redux Toolkit + RTK Query for API calls — *assumption*) |
| Language | TypeScript, sharing DTO/enum types with the backend package |
| Auth | Firebase Authentication — `GoogleAuthProvider` (config provided for project `affitiudine`) |
| Hosting | Firebase Hosting (same project) |
| API | Backend endpoints per Backend PRD §9; ID token attached as `Authorization: Bearer <token>` on authenticated calls |

> Note: the Firebase web config (apiKey, appId, …) is client-side configuration and not a secret, but it should live in environment config files, not hard-coded in components.

## 6. Information Architecture & Navigation

```
/                  → Landing (public summary)        [public]
/tabella           → Tabella Page                    [auth required]
/mappa             → placeholder "coming soon"       [auth required, reserved]
/analisi           → placeholder "coming soon"       [auth required, reserved]
/senza-scelta      → placeholder "coming soon"       [auth required, reserved]
```

- Route guard: navigating to any `[auth required]` route while signed out redirects to `/` with the login prompt highlighted.
- After successful login, redirect to `/tabella` *(assumption)*.

## 7. Functional Requirements

### 7.1 Header / Authentication (all pages)

- **FR-1** — Persistent header with app title and, in the **top-right corner**, the authentication control.
- **FR-2** — Signed out: a **Login** button triggering the Google popup/redirect flow (`GoogleAuthProvider`).
- **FR-3** — Signed in: the button is replaced by the **user's Google profile photo** (fallback: initials avatar if no photo).
- **FR-4** — Clicking the photo opens a menu with the user's name/email and a **Logout** action *(assumption — source only specifies the photo)*.
- **FR-5** — Session persists across reloads (Firebase persistence); token silently refreshed and attached to every API call.

### 7.2 Tabella Page (authenticated)

#### Display

- **FR-6** — Fetch listings from `GET /listings` and render a table with these v1 columns:

| Column | Source field | Notes |
|---|---|---|
| Title | `title` | — |
| Price | `price` | Formatted as EUR (it-IT locale) |
| energy_class | `energy_class` | Render badge (A–G) when present, "—" when absent |
| surfaceValue | `surfaceValue` | m² |
| rent | `rent` | Formatted as EUR |
| contractValue | `contractValue` | — |
| **stateMaloi** | `stateMaloi` | **Decision (Q3):** visible state column — badge: 🔴 0 non buono / 🟢 1 buono / 🟡 2 così così / ⚪ empty = no decision yet |

- **FR-7** — Pagination consistent with the API (`page`/`limit`, default 20) *(assumption)*.
- **FR-8** — **Decision (Q3):** filter bar with `province`, `type`, and `stateMaloi` (including "senza scelta" = no decision); column sorting on Price, surfaceValue, rent.
- **FR-9** — Loading, empty, and error states ("riprova" action on error).
- **FR-10** — Null-safe rendering: scraped data is irregular; every cell must tolerate missing/null values without breaking the row.

#### Decision actions — **Decision (Q2): in scope for v1**

- **FR-17** — **Set state on a row:** inline control (3-state toggle or menu) calling `PATCH /listings/:id/state`. Optimistic UI update; rollback + toast on failure.
- **FR-18** — **Bulk state:** row checkboxes + "select page" control; action bar appears with the three state options, calling `POST /listings/bulk-state` (respect backend max batch 500). Confirmation step shows the number of affected rows.
- **FR-19** — **Edit description:** per-row action opening a modal/side panel with a textarea pre-filled with the current `description`; save calls `PATCH /listings/:id/description` (trimmed, non-empty). Unsaved-changes guard on close.
- **FR-20** — **Read-after-write handling:** because writes land in `affito` while the table reads `affitto_data` (eventually consistent — Backend R1), the frontend keeps locally confirmed writes layered over fetched data for the session (Redux), so the user always sees their own latest decisions regardless of backend sync lag.

### 7.3 Landing — Senza Autenticazione Page

- **FR-11** — Shown at `/` for unauthenticated visitors: a **summary of the current database state**, fed by `GET /public/stats/summary` (no auth — Q1 resolved).
- **FR-12** — Display aggregate numbers per `{province, type}`: `total`, `accept`, `deny`, `wait`, `emptyChoise` (and optionally elevator/disable counters) as summary cards or a compact table *(layout assumption)*.
- **FR-13** — No individual listing data is ever shown pre-login.
- **FR-14** — Prominent call-to-action to log in.
- **FR-15** — If the visitor is already authenticated, `/` may still show the summary plus quick navigation to `/tabella` *(assumption)*.

### 7.4 Placeholder pages

- **FR-16** — `/mappa`, `/analisi`, `/senza-scelta` render a minimal "in arrivo" placeholder behind the auth guard, so navigation structure ships in v1 without dead links.

## 8. State Management (Redux)

| Slice | Contents |
|---|---|
| `auth` | user (uid, email, displayName, photoURL), status, token handling via Firebase SDK |
| `listings` | query params (page, filters incl. stateMaloi, sort), cached results, request status (RTK Query cache) |
| `decisions` | session overlay of confirmed writes (id → {stateMaloi, description}) for FR-20; selection set for bulk actions |
| `stats` | public summary data for the landing page |
| `ui` | global toasts/errors, modals |

Business rules (enums, DTOs) are imported from the shared types package — the frontend never re-declares `stateMaloi` semantics.

## 9. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Performance** | First contentful paint of landing < 2 s on 4G; table interactions < 200 ms perceived (skeleton rows while fetching) |
| **Security** | ID token only in memory/SDK persistence; never in query strings. Auth-guarded routes verified client-side *and* enforced server-side (defense in depth). |
| **Resilience** | API errors surfaced with retry; 401 triggers re-login flow gracefully |
| **Accessibility** | Keyboard-navigable table and menus; WCAG AA contrast |
| **Browser support** | Evergreen browsers (Chrome, Firefox, Safari, Edge), last 2 versions |
| **Responsive** | Usable from 360 px width; table degrades to horizontal scroll on small screens *(assumption)* |

## 10. Analytics & Observability *(proposal)*

- Basic page-view and login-success/failure events (Firebase Analytics is already in the config's reach).
- Console-free production build; errors reported to console/logging only in dev.

## 11. Milestones (proposal)

| Phase | Deliverable |
|---|---|
| **M1 — Shell & Auth** | App scaffold, routing + guards, header with login/photo (FR-1…FR-5) |
| **M2 — Landing** | Public summary page (FR-11…FR-15) over `GET /public/stats/summary` |
| **M3 — Tabella (read)** | Table with 7 columns, pagination, filters, sorting, states (FR-6…FR-10) |
| **M4 — Tabella (decisions)** | Row state, bulk state, description editor, optimistic overlay (FR-17…FR-20) |
| **M5 — Polish** | Placeholders (FR-16), responsive pass, a11y pass, deploy to Firebase Hosting |

## 12. Risks

- **R1** — `GET /public/stats/summary` is a new backend deliverable (Backend PRD v0.3); M2 depends on its availability — coordinate sequencing across teams.
- **R2** — Table columns (`energy_class`, `surfaceValue`, `rent`, `contractValue`) are nested inside the raw `powerproperties` schema; the backend slim DTO must expose them flattened, or the frontend will need fragile deep access. Requires a DTO alignment task in the backend.
- **R3** — Scraped data irregularity (nulls, NaN artifacts) can break table rendering — mitigated by FR-10 and backend BR-4.
- **R4** — Three of five pages are TODO; stakeholder expectations must be set that v1 ships Landing + Tabella only.
- **R5** — Read-after-write gap (writes in `affito`, reads from `affitto_data`): without FR-20's session overlay, users would see their decisions "disappear" on refresh until the external sync runs. Residual risk: the overlay does not survive a full page reload — acceptable for v1? (Q1 below.)

## 13. Open Questions

| # | Question | Impacts |
|---|---|---|
| **Q1** | Is it acceptable in v1 that a freshly saved decision may revert visually after a hard page reload until the external sync refreshes `affitto_data`? If not, the backend must implement the `$lookup` merge (Backend PRD Q1) before M4. | FR-20, R5, backend sequencing |
| **Q2** | Bulk selection scope: current page only, or "select all results matching filter" (requires backend support for filter-based bulk)? | FR-18 |
| **Q3** | Confirm exact source fields for `rent` and `contractValue` in the schema (e.g., under `price`/`income` in `powerproperties`) so the backend DTO can be aligned. | R2, API contract |
| **Q4** | Do we need a row detail view (click title → full listing data) in v1, or is the table sufficient? | Scope, M3 |
| **Q5** | UI language: Italian only, or IT/EN switch? | §3, copy effort |
