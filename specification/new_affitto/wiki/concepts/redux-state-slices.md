---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [method]
aliases:
  - "Redux slices"
  - "Redux state slices"
  - "state slices"
---


# Redux State Slices

## Definition

Redux State Slices is the architectural method used by [[entities/affitti-frontend-v1|Affitti Frontend v1]] to organize its [[concepts/redux-state|Redux store]] into five distinct, purpose-specific partitions: **auth**, **listings**, **decisions**, **stats**, and **ui**. Each slice encapsulates a coherent domain of client-side state, with clearly defined responsibilities and data shapes. Business rules such as enums and DTOs are imported from the [[concepts/shared-types-package|Shared Types Package]] rather than being re-declared in the frontend, ensuring a single source of truth for domain semantics like `stateMaloi`. This slicing architecture directly supports the [[concepts/session-overlay|Session Overlay]] pattern and optimistic update workflows for handling read-after-write consistency.

## Key Characteristics

- **auth slice**: Stores the authenticated user profile (`uid`, `email`, `displayName`, `photoURL`), authentication status, and token handling, all managed via the Firebase SDK.
- **listings slice**: Contains query parameters (page number, filters including `stateMaloi`, sort order), cached API results, and request status leveraging RTK Query's built-in cache management.
- **decisions slice**: Maintains a session overlay of confirmed writes, mapping each listing `id` to its updated `stateMaloi`/description, plus a selection set used for bulk actions. This is the core mechanism behind the [[concepts/session-overlay|Session Overlay]] pattern.
- **stats slice**: Holds public summary/aggregate data consumed by the unauthenticated landing page (see [[concepts/senza-autenticazioni-page|Unauthenticated Page]]).
- **ui slice**: Manages global transient UI state including toast notifications, error banners, and modal visibility flags.
- **No re-declaration of business semantics**: Enums, DTOs, and [[concepts/business-rules|business rules]] are imported from the [[concepts/shared-types-package|Shared Types Package]], preventing drift between frontend and backend domain models.
- **Supports optimistic updates**: The separation of the `decisions` overlay from the `listings` cache allows the UI to reflect user intent immediately while the server round-trip completes.

## Applications

- **Optimistic UI updates**: When a user changes the `stateMaloi` of a listing, the `decisions` slice records the write immediately, allowing the table view to reflect the new state without waiting for a server response or cache invalidation.
- **Bulk actions**: The selection set within the `decisions` slice tracks which listings the user has checked, enabling batch status changes or other bulk operations.
- **Consistent filtering and pagination**: The `listings` slice centralizes query parameters so that filter changes, sorting, and page navigation are all coordinated through a single state partition managed by RTK Query.
- **Authentication flow**: The `auth` slice provides a single point of truth for the current user's session, enabling route guards and conditional rendering throughout the application (see [[concepts/autenticazione-necessaria|Required Authentication]]).
- **Landing page performance**: The `stats` slice isolates publicly accessible aggregate data, allowing the unauthenticated landing page to render without requiring a full authentication flow.

## Related Concepts

- [[concepts/redux|Redux]]
- [[concepts/redux-state|Redux client state]]
- [[concepts/session-overlay|Session Overlay]]
- [[concepts/shared-types-package|Shared Types Package]]
- [[concepts/business-rules|business rules]]
- [[concepts/autenticazione-necessaria|Required Authentication]]
- [[concepts/senza-autenticazioni-page|Unauthenticated Page]]
- [[concepts/tabella-page|Table Page]]

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]]

## Mentions in Source

- "`auth` | user (uid, email, displayName, photoURL), status, token handling via Firebase SDK" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "`listings` | query params (page, filters incl. stateMaloi, sort), cached results, request status (RTK Query cache)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]