---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [method]
aliases:
  - "Decisions Overlay"
  - "Read-after-write overlay"
  - "Session Overlay"
---


# Session Overlay

## Definition

The Session Overlay is a frontend technique employed in the Affitti Frontend v1 to bridge the read-after-write consistency gap introduced by the system's split collection architecture. In this architecture, user writes (such as stateMaloi decisions and description edits) are persisted to the `affito` collection, while the data table reads from the eventually consistent `affitto_data` collection. To prevent users from seeing stale data after making changes, the frontend maintains a layer of locally confirmed writes in a Redux `decisions` slice, which is superimposed over the fetched server data for the duration of the browser session. This ensures users always see their own most recent decisions regardless of backend synchronization lag. The overlay is essentially an optimistic update pattern scoped to the session context and does not survive a full page reload — a limitation identified as residual risk R5.

## Key Characteristics

- **Client-side write cache**: Locally confirmed writes are stored in a [[concepts/redux-state|Redux store]] `decisions` slice, acting as a transient cache layered on top of server-fetched data
- **Optimistic update pattern**: The user interface reflects the user's own changes immediately without waiting for the backend sync pipeline to propagate writes from `affito` to `affitto_data`
- **Session-scoped persistence**: The overlay exists only within the current browser session; it does not persist across full page reloads
- **Residual risk (R5)**: The loss of overlay state on page reload is an acknowledged risk — if a user refreshes before the backend has synchronized, they may temporarily see stale data
- **Transparent to the user**: The technique is invisible to end users; they perceive their changes as having been saved and reflected instantly
- **Addresses eventual consistency**: Specifically designed to compensate for the delay inherent in the split collection architecture where the read collection (`affitto_data`) lags behind the write collection (`affito`)

## Applications

- **Decision persistence in rental workflows**: When a user records a stateMaloi decision (e.g., approve, reject, or defer a rental listing), the decision is immediately visible in the data table without waiting for backend propagation
- **Description edit feedback**: Edits to listing descriptions are reflected in the UI instantly, preventing confusion where a user might think their edit was lost
- **General read-after-write consistency**: Any scenario in the Affitti Frontend where the user writes data that is subsequently displayed in a view sourced from an eventually consistent collection benefits from this overlay approach
- **Mitigating backend sync delays**: Acts as a safety net during periods of high backend latency or temporary sync pipeline delays, maintaining a consistent user experience

## Related Concepts

- [[concepts/redux-state|Redux store]] — the client-side state management layer where the overlay decisions slice is maintained
- [[concepts/redux|Redux]] — the state management library underpinning the overlay mechanism
- [[concepts/affito-collection-query|affito collection aggregation]] — the write-target collection whose data the overlay caches client-side
- [[concepts/table|Data Table]] — the primary UI component that reads from `affitto_data` and over which the session overlay is applied
- [[concepts/business-rules|Business Rules]] — the decision logic (stateMaloi) whose outputs are cached in the overlay
- [[concepts/eventual-consistency|Eventual Consistency]] — the consistency model of the `affitto_data` collection that necessitates the overlay
- [[concepts/optimistic-update|Optimistic Update]] — the general UI pattern that the Session Overlay implements

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the application in which the Session Overlay is implemented

## Mentions in Source

- **FR-20** — **Read-after-write handling:** "because writes land in `affito` while the table reads `affitto_data` (eventually consistent — Backend R1), the frontend keeps locally confirmed writes layered over fetched data for the session (Redux), so the user always sees their own latest decisions regardless of backend sync lag." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]