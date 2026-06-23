# PRD — Affitti Backend (API Layer)

| | |
|---|---|
| **Version** | 0.3 (Amendment: public summary endpoint per Frontend PRD Q1) |
| **Date** | 2026-06-11 |
| **Status** | Draft — pending Open Questions (§12) |
| **Scope** | Backend / API only. Frontend (React + Redux) will be covered in a separate PRD. |

---

## 1. Problem Statement

Rental listing data has been scraped from a real estate portal and stored as raw documents in MongoDB Atlas. The data is rich (full listing schema: features, location, price, auction data, multimedia) but unusable as-is for decision-making.

We need a backend that:

1. **Prepares** the raw data — aggregations, normalization, and TypeScript business rules.
2. **Exposes** it through a clean, typed API consumable by a React/Redux frontend.
3. **Persists decisions** — the user evaluates listings and records a verdict (`stateMaloi`) and personal notes (`description`).

## 2. Goals

- **G1** — Provide a read API over the listings collection with filtering by `type` and `province`, plus pagination and sorting.
- **G2** — Provide write operations: update description, update state (single), update state (bulk).
- **G3** — Provide aggregated summary data (counts per province/type and per decision state) for dashboards.
- **G4** — Provide a feature-analysis view (normalized `featureList` / `primaryFeatures`) to support comparison between listings.
- **G5** — Enforce all business rules in a typed TypeScript service layer (not in the frontend, not in raw queries).
- **G6** — Secure all write operations behind Firebase Authentication (Google provider).

## 3. Non-Goals (Out of Scope for v1)

- The scraping/ingestion pipeline (data is assumed to already exist in MongoDB).
- The React/Redux frontend (separate PRD; this document defines its API contract only).
- Multi-tenant support, roles/permissions beyond authenticated vs. anonymous.
- Editing of any scraped field other than `description` and `stateMaloi`.
- Hard deletion of listings (the `deleted` boolean flag is respected as soft delete).

## 4. Users

| Persona | Description | Needs |
|---|---|---|
| **Evaluator** (primary) | Authenticated user (Google sign-in) reviewing rental listings | Browse/filter listings, mark decisions, write notes, see progress stats |

> **Decision (Q3, resolved):** *all* endpoints — reads and writes — require a verified Firebase ID token. There is no anonymous/viewer access.

## 5. System Context & Infrastructure

| Component | Detail |
|---|---|
| Database | MongoDB Atlas — cluster `cluster0.7qska.mongodb.net`, DB **`udine`** |
| DB Auth | X.509 certificate (`certPath` PEM file) — must be stored as a secret, never in repo |
| Compute | Firebase Cloud Functions (project **`affitiudine`**) |
| Hosting | Firebase Hosting (frontend; out of scope here) |
| Auth | Firebase Authentication, Google provider; backend verifies Firebase ID tokens |
| Language | TypeScript (Node.js runtime on Cloud Functions) |

### Collections

| Collection | Role | Notes |
|---|---|---|
| `affitto_data` | **Read** — listings already adapted from scraping | Filterable by `type`, `province`; large nested schema (`powerproperties`, `auction`, features, location, price, etc.) |
| `affito` | **Write** — `description`, `stateMaloi` | **Confirmed (Q1): a separate collection from `affitto_data`.** The API writes here only; it never writes to `affitto_data`. |
| `count` | Aggregated summary per `{province, type}` | Counters: `total`, `accept`, `deny`, `wait`, `emptyChoise`, `elevator`, `noElevator`, `emptyElevator`, `disable`, `nodisable`, `emptydisable` |
| `feature` | Per-listing normalized features | `featureList`, `primaryFeatures`, `province`, `type`, `stateMaloi` |

> **Decision (Q2, resolved):** `count` and `feature` are materialized by an **external process** outside this backend. The API treats them as strictly **read-only** and does not own their refresh cadence. Consequence: data served from them is **eventually consistent** — a decision saved via FR-4/FR-5 may take until the next external refresh to appear in `/stats/summary` and `/analysis/features`. The API must document this and the frontend should not expect immediate consistency there.
>
> **Read-after-write consistency:** because reads (`affitto_data`) and writes (`affito`) are split, the propagation path of `stateMaloi`/`description` back into the read collection is owned by the external process. See Open Question **Q1** (§12) for the strategy the API should adopt in the meantime.

## 6. Functional Requirements

### 6.1 Listings — Read

- **FR-1** `GET /listings` — paginated list.
  - Filters: `type`, `province` (both optional, combinable), `stateMaloi` *(assumption — needed for "show only undecided")*, `deleted=false` by default.
  - Pagination: `page`/`limit` (default limit 20, max 100). Sorting: `mLastUpdate` desc by default.
  - Returns a **slim DTO** (id, title, price, surface, rooms, province, type, stateMaloi, thumbnail, geo) — never the full raw document, to keep payloads small.
- **FR-2** `GET /listings/:id` — full detail of one listing (normalized DTO; raw `Double`/`NaN` artifacts cleaned per BR-4).

### 6.2 Listings — Write (authenticated)

- **FR-3** `PATCH /listings/:id/description` — body `{ description: string }`. Trims input; rejects empty after trim *(assumption)*.
- **FR-4** `PATCH /listings/:id/state` — body `{ stateMaloi: 0 | 1 | 2 }`.
- **FR-5** `POST /listings/bulk-state` — body `{ ids: number[], stateMaloi: 0 | 1 | 2 }`. Max batch size 500 *(assumption)*; returns matched/modified counts.

### 6.3 Aggregations / Analysis

- **FR-6** `GET /stats/summary` — returns the `count` summary, optionally filtered by `province` and/or `type`. Powers the dashboard "where am I in the evaluation process" view.
- **FR-7** `GET /analysis/features` — returns `feature` documents filtered by `province`, `type`, `stateMaloi`; supports listing comparison in the frontend.

## 7. Business Rules (TypeScript service layer)

- **BR-1 — State enum.** `stateMaloi`: `0 = non buono`, `1 = buono`, `2 = così così`. Any other value → `400 Bad Request`. Modeled as a TS enum/union shared with the frontend.
- **BR-2 — Audit trail.** Every write sets `mLastUpdate = Date.now() / 1000` (Unix seconds, consistent with existing data) and `userUpdate = <authenticated user email>` taken from the verified Firebase token — never from the request body.
- **BR-3 — Soft delete.** Documents with `deleted: true` are excluded from all read endpoints unless `includeDeleted=true` is explicitly passed *(assumption)*.
- **BR-4 — Data normalization.** The raw schema allows `Double` extended values (`NaN`, `Infinity`) and `number | integer | null` unions (e.g., `elevation`, `mLastImmobiliareUpdate`). The API layer normalizes these to `number | null` so the frontend never handles BSON artifacts.
- **BR-5 — Write whitelist.** Only `description` and `stateMaloi` (plus audit fields) are writable. Any other field in a write payload is rejected.
- **BR-6 — Id typing.** `_id` is an integer; route params are parsed with strict validation (`parseInt` + `isNaN` guard) before hitting the database.

## 8. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Security** | Verify Firebase ID token on **every** endpoint (Admin SDK), reads included. X.509 cert and connection string in Firebase Functions secrets/Secret Manager. CORS restricted to the hosting domain. |
| **Performance** | P95 < 800 ms for FR-1/FR-2 (cold starts excluded). Indexes on `type`, `province`, `stateMaloi`, `deleted`, `mLastUpdate`. Reuse MongoDB client across function invocations. |
| **Reliability** | Bulk updates are idempotent (same payload → same end state). Structured error responses `{ code, message }`. |
| **Observability** | Structured logging (request id, user email on writes, matched/modified counts). Cloud Logging via Firebase. |
| **Type safety** | Shared TS types package (DTOs + enums) consumable by both API and the future frontend. |

## 9. API Contract Summary

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/listings` | **required** | Paginated, filtered list (slim DTO) — reads `affitto_data` |
| GET | `/listings/:id` | **required** | Full normalized detail — reads `affitto_data` |
| PATCH | `/listings/:id/description` | **required** | Update personal description — writes `affito` |
| PATCH | `/listings/:id/state` | **required** | Update decision state — writes `affito` |
| POST | `/listings/bulk-state` | **required** | Bulk decision state — writes `affito` |
| GET | `/stats/summary` | **required** | Counts per province/type/state — reads `count` (eventually consistent) |
| GET | `/public/stats/summary` | **none** | **Amendment v0.3:** aggregate-only summary for the public landing page — reads `count`; exposes counters only, never listing data; rate-limited per IP |
| GET | `/analysis/features` | **required** | Normalized feature view — reads `feature` (eventually consistent) |

All endpoints verify the Firebase ID token, with the **single exception** of `GET /public/stats/summary` (Frontend PRD Q1 decision). Unauthenticated requests to any other endpoint receive `401`.

> **FR-8 (new)** — `GET /public/stats/summary`: returns the same aggregate shape as FR-6 (optionally a reduced subset), without authentication. Hard requirements: rate limiting (e.g., per-IP), CORS limited to the hosting domain, response cacheable (`Cache-Control`, e.g., 5 min) to absorb anonymous traffic, and no field that identifies an individual listing.

## 10. Milestones (proposal)

| Phase | Deliverable |
|---|---|
| **M1 — Foundation** | Functions project scaffold, Mongo connection (X.509 via secrets), token verification middleware, shared types package |
| **M2 — Read API** | FR-1, FR-2 + indexes + normalization (BR-4) |
| **M3 — Write API** | FR-3, FR-4, FR-5 + audit (BR-2) + validation (BR-1, BR-5, BR-6) |
| **M4 — Aggregations** | FR-6, FR-7, FR-8 (public summary with rate limiting + caching); document eventual consistency in API docs |
| **M5 — Hardening** | CORS, rate limiting, logging, error model, API docs (OpenAPI) |

## 11. Risks

- **R1 — Read-after-write gap.** Writes land in `affito` while the UI reads `affitto_data`/`count`/`feature`, all refreshed by an external process. Until refresh, the user may not see the decision they just saved → confusing UX. Mitigation: frontend optimistic updates + API exposes write results; long-term per Q1 below.
- **R2** — Raw scraped schema is very large and irregular; without slim DTOs, payloads will be heavy and brittle.
- **R3** — Scraped data from a third-party portal: confirm intended use stays internal/personal to avoid ToS exposure (the API must not republish listings publicly).
- **R4** — Cold starts on Cloud Functions may hurt perceived performance for the first request; consider min instances if it becomes an issue.
- **R5** — Dependency on the external aggregation process: if it stalls, `stats`/`features` go stale silently. Mitigation: expose a `lastRefreshed` timestamp if available.

## 12. Open Questions

| # | Question | Impacts |
|---|---|---|
| **Q1** | Read-after-write strategy: should `GET /listings` merge live `stateMaloi`/`description` from `affito` on top of `affitto_data` (e.g., `$lookup`), or is the external refresh fast enough that eventual consistency is acceptable? What is the refresh cadence? | FR-1/FR-2, R1 |
| **Q2** | What is the document shape of `affito`? (Does it mirror `_id` from `affitto_data` and hold only `description`, `stateMaloi`, audit fields, or full copies?) Needed before M3. | FR-3/4/5 |
| **Q3** | Is this single-user (only you) or could other Google accounts sign in? Affects whether an email allowlist is needed on top of token verification. | Security |
| **Q4** | Counters in `count` reference `accept/deny/wait` while writes use `stateMaloi 0/1/2` — confirm the mapping (e.g., `accept=1`, `deny=0`, `wait=2`? and what is `emptyChoise`?). | FR-6 semantics |
| **Q5** | Do you need geo features in v1 (the data has `idGeoHash`, coordinates, `elevation`) — e.g., map filtering/radius search? | FR-1 scope |
