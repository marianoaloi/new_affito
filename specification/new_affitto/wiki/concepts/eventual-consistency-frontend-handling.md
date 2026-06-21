---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [phenomenon]
aliases:
  - "Read-after-write gap"
  - "Eventual Consistency (Frontend)"
  - "Frontend Read-after-Write Lag"
---


# Eventual Consistency (Frontend Handling)

## Definition

Eventual Consistency in the frontend context refers to the architectural phenomenon where write operations land in the `affito` collection while table read operations are served from the `affitto_data` view/collection, creating a visible lag between when a user submits data and when that data appears in the table. This is catalogued as **Backend Risk R1** in the PRD and represents a core architectural challenge for the frontend. The PRD addresses this through the [[concepts/session-overlay|Session Overlay]] mechanism (FR-20), where locally confirmed writes are layered over fetched data in [[concepts/redux|Redux]]. Risk R5 notes that the overlay does not survive a full page reload, and Open Question Q1 asks whether this is acceptable for v1 or if the backend must implement a `$lookup` merge before milestone M4.

## Key Characteristics

- **Dual-collection architecture:** Writes target the `affito` collection, while reads for the main table are sourced from `affitto_data`, which is an eventually consistent derived view.
- **Visible lag:** Users may not immediately see their own writes reflected in the table after submission, causing a confusing user experience if unmitigated.
- **Frontend mitigation via Session Overlay:** The PRD prescribes FR-20 ([[concepts/session-overlay|Session Overlay]]), which keeps locally confirmed writes layered over server-fetched data within the current browser session using [[concepts/redux-state-slices|Redux state slices]].
- **Session-scoped durability only:** The overlay is stored in [[concepts/redux-state|Redux client state]] and does **not** survive a full page reload (Risk R5), meaning stale data may briefly reappear after refresh until `affitto_data` catches up.
- **Open architectural question (Q1):** Whether the session-only overlay is acceptable for v1, or whether the backend must implement a `$lookup` merge to guarantee read-after-write consistency before milestone M4.
- **Backend dependency:** The root cause lies in the backend aggregation pipeline ([[concepts/affito-collection-query|affito collection aggregation]]), making this a cross-cutting concern spanning both frontend and backend.

## Applications

- **Optimistic UI patterns:** The phenomenon directly motivates the use of optimistic update strategies in the frontend, where the UI assumes success and patches local state immediately after a write, reverting only on error.
- **State management design:** Drives the design of [[concepts/redux-state-slices|Redux state slices]] to include an overlay layer that can merge local writes with server-fetched table data.
- **Bulk operations:** Particularly relevant for [[concepts/bulk-state-update-frontend|Bulk State Update]] (FR-18), where multiple records are modified at once and the consistency gap is amplified.
- **Edit flows:** Affects workflows such as the [[concepts/description-editor|Description Editor]] (FR-19), where a user edits a field and expects to see the update reflected immediately in the table.
- **Architecture decision-making:** Informs the v1 vs. v2 scope boundary — whether to accept the session-overlay trade-off or invest in backend-level consistency guarantees.

## Related Concepts

- [[concepts/session-overlay|Session Overlay]] — the primary frontend mitigation mechanism (FR-20)
- [[concepts/redux-state-slices|Redux State Slices]] — where the overlay data is stored
- [[concepts/redux-state|Redux State]] — the client-side state container that holds the overlay
- [[concepts/redux|Redux]] — the state management framework used
- [[concepts/affito-collection-query|affito collection aggregation]] — the backend pipeline that creates the consistency gap
- [[concepts/bulk-state-update-frontend|Bulk State Update]] — a feature particularly affected by eventual consistency
- [[concepts/description-editor|Description Editor]] — an edit flow impacted by read-after-write lag
- [[concepts/table|Data Table]] — the primary UI component that displays `affitto_data` reads

## Related Entities

- [[entities/affitto-data|affitto_data]] — the derived collection/view used for table reads
- [[entities/affito|affito]] — the primary collection where writes land

## Mentions in Source

- "**Read-after-write handling:** because writes land in `affito` while the table reads `affitto_data` (eventually consistent — Backend R1), the frontend keeps locally confirmed writes layered over fetched data for the session (Redux)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]