---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "method"
aliases:
  - "Optimistic UI update"
  - "Optimistic update pattern"
  - "Optimistic updates"
---

## Description

Optimistic update is a client-side UI method used to mask the latency inherent in [[concepts/eventual-consistency|eventually consistent]] architectures. In the [[entities/affitti-backend|Affitti Backend]] system, the [[concepts/split-collection-architecture|split-collection architecture]] means that user writes target the [[entities/affito|affito]] collection while read endpoints serve data from [[entities/affitto_data|affitto_data]], [[entities/count|count]], and [[entities/feature|feature]] — all refreshed by an external process. Until that refresh completes, a user who just saved a decision would not see their change reflected in read responses, producing a confusing UX. By applying the expected outcome immediately in the UI and using the API's write-result payload to confirm or roll back, the frontend eliminates this perceived inconsistency. The PRD flags this as a short-term mitigation, with an open question (Q1) exploring whether a server-side approach — such as having `GET /listings` merge live [[concepts/statemaloi|stateMaloi]]/description values from [[entities/affito|affito]] on top of [[entities/affitto_data|affitto_data]] via a `$lookup` — could replace or complement the client-side strategy if eventual consistency alone proves insufficient.

In the [[entities/affitti-frontend-v1|Affitti Frontend v1]], the pattern is concretely implemented on the [[concepts/tabella-page|Tabella Page]] through **FR-17**: when a user sets a [[concepts/statemaloi|stateMaloi]] value on a row via an inline control (3-state toggle or menu), the UI calls `PATCH /listings/:id/state` and immediately reflects the new state. If the PATCH call fails, the frontend performs a rollback to the previous value and displays a toast notification to inform the user. This client-side optimistic state is further reinforced by the [[concepts/session-overlay|Session Overlay]] (**FR-20**), which keeps locally confirmed writes layered over fetched data in [[concepts/redux|Redux]] for the duration of the session, ensuring the user always sees their own latest decisions regardless of backend sync lag.

## Key Characteristics

- **Immediate UI feedback** — The interface updates the moment the user performs an action, eliminating perceived latency caused by the [[concepts/eventual-consistency|eventual consistency]] model.
- **Write-result confirmation** — The API returns the result of the write operation so the frontend can verify success and roll back the optimistic state if the write fails.
- **Client-side state divergence** — For a brief period the frontend state intentionally diverges from the data returned by read endpoints; the two converge once the external refresh process updates the read collections.
- **Error rollback with toast notification** — If the write fails (network error, validation rejection, etc.), the frontend must revert the optimistic change and inform the user via a toast notification, maintaining data integrity in the UI.
- **Session-scoped overlay** — In the Affitti Frontend, optimistic writes are persisted in [[concepts/redux|Redux]] state as a [[concepts/session-overlay|Session Overlay]] (FR-20), layering confirmed decisions over fetched data so the user's view stays consistent throughout the session.
- **Complementary to server-side fixes** — Described in the PRD as a short-term mitigation; a long-term, server-side solution (e.g., `$lookup` merge of live data) is flagged as an open question (Q1).

## Applications

- **Decision persistence in Affitti** — When a user saves a decision (e.g., via [[concepts/bulk-state-update|bulk state update]] or single-record write), the frontend immediately shows the updated state while the write is persisted to [[entities/affito|affito]] and the read views in [[entities/affitto_data|affitto_data]] / [[entities/count|count]] / [[entities/feature|feature]] catch up.
- **Single-row state setting (FR-17)** — On the [[concepts/tabella-page|Tabella Page]], an inline 3-state toggle or menu calls `PATCH /listings/:id/state` with optimistic UI update; rollback + toast on failure.
- **General eventually-consistent architectures** — Any system where the write store and read store are separate (CQRS, event-sourced systems, [[concepts/split-collection-architecture|split-collection designs]]) can use optimistic updates to mask propagation delay.
- **Mobile and low-bandwidth scenarios** — Optimistic updates reduce the impact of network round-trip times, improving perceived performance even outside of consistency-gap concerns.

## Related Concepts

- [[concepts/read-after-write-consistency|Read-after-write consistency]] — The consistency gap that optimistic updates mitigate.
- [[concepts/eventual-consistency|Eventual consistency]] — The broader consistency model underlying the split read/write architecture.
- [[concepts/split-collection-architecture|Split-collection architecture]] — The architectural pattern that creates the read/write divergence necessitating optimistic updates.
- [[concepts/bulk-state-update|Bulk State Update]] — A write operation whose results benefit from optimistic rendering.
- [[concepts/soft-delete|Soft Delete]] — Another write-side operation where the UI may need to optimistically hide records before the read store refreshes.
- [[concepts/statemaloi|stateMaloi]] — A field whose live value from the write collection may be merged server-side as an alternative to purely client-side optimistic updates.
- [[concepts/session-overlay|Session Overlay]] — The frontend mechanism (FR-20) that layers locally confirmed writes over fetched data to complement optimistic updates.
- [[concepts/tabella-page|Tabella Page]] — The page where optimistic updates are applied to row-level state changes.
- [[concepts/redux|Redux]] — The state management library used to hold the session-scoped optimistic state.
- [[concepts/bulk-state-update-frontend|Bulk State Update]] — The frontend bulk action that also leverages optimistic rendering.
- [[concepts/statemaloi-badge-rendering|stateMaloi badge rendering]] — The visual rendering of the state value that is optimistically updated in the UI.

## Related Entities

- [[entities/affito|affito]] — The write-side collection that receives user decisions.
- [[entities/affitto_data|affitto_data]] — The read-side collection served to the UI, refreshed asynchronously.
- [[entities/count|count]] — Aggregation collection also refreshed externally.
- [[entities/feature|feature]] — Feature collection refreshed externally.
- [[entities/affitti-backend|Affitti Backend API]] — The API layer that exposes write results enabling the optimistic update pattern.
- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — The frontend application that implements optimistic updates on the Tabella Page.

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "**R1 — Read-after-write gap.** Writes land in `affito` while the UI reads `affitto_data`/`count`/`feature`, all refreshed by an external process. Until refresh, the user may not see the decision they just saved → confusing UX. Mitigation: frontend optimistic updates + API exposes write results; long-term per Q1 below."
> - "Read-after-write strategy: should `GET /listings` merge live `stateMaloi`/`description` from `affito` on top of `affitto_data` (e.g., `$lookup`), or is the external refresh fast enough that eventual consistency is acceptable?"

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]**
> - "**FR-17** — **Set state on a row:** inline control (3-state toggle or menu) calling `PATCH /listings/:id/state`. Optimistic UI update; rollback + toast on failure."
> - "**FR-20** — **Read-after-write handling:** because writes land in `affito` while the table reads `affitto_data` (eventually consistent — Backend R1), the frontend keeps locally confirmed writes layered over fetched data for the session (Redux), so the user always sees their own latest decisions regardless of backend sync lag."