---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "term"
aliases:
  - "Primary user persona"
  - "Authenticated reviewer"
  - "Evaluator (Frontend Persona)"
---

## Definition

The Evaluator is the primary user persona defined across both the Affitti Backend PRD and the Affitti Frontend PRD. An Evaluator is an authenticated user who signs in via Google through [[concepts/firebase-authentication|Firebase Authentication]] and reviews rental listings. The Evaluator represents the sole active role in the system — all API endpoints (with the exception of the public stats summary) require authentication via [[concepts/firebase-id-token-verification|Firebase ID token verification]], meaning only verified Evaluators can access the platform. On the frontend, the Evaluator persona is contrasted with the **Visitor** persona: while Visitors are unauthenticated and can only view aggregate database summaries on the landing page, Evaluators have full access to the Tabella Page, where they browse listings, set decisions, perform bulk updates, and edit descriptions. The system is designed around this single authenticated persona, though an open question (Q3) remains about whether other Google accounts could sign in and whether an email allowlist is needed on top of token verification.

## Key Characteristics

- **Authenticated via Google**: Evaluators must sign in through Google using [[concepts/firebase-authentication|Firebase Authentication]]; no other sign-in methods are supported.
- **Sole authenticated user role**: The system defines a single authenticated user persona — the Evaluator — with no distinction between admin or other access levels. The only other persona is the unauthenticated Visitor, who has read-only access to the landing page summary.
- **Token-verified access**: Every request (reads and writes) requires a verified Firebase ID token, enforced by [[concepts/firebase-id-token-verification|Firebase ID token verification]] middleware.
- **Full Tabella Page access**: On the frontend, Evaluators have complete access to the [[concepts/table|Tabella Page]], where they can browse, filter, sort, and interact with rental listings in a tabular format.
- **Decision-making authority**: Evaluators classify rental listings using the [[concepts/statemaloi|stateMaloi]] system, selecting from the enum values: *buono*, *non buono*, or *così così*.
- **Personal annotation**: Evaluators can write personal notes in the description field attached to each listing via the [[concepts/description-editor|description editor]].
- **Bulk operations**: Evaluators can leverage [[concepts/bulk-state-update-frontend|bulk state updates]] to efficiently process multiple listings at once.
- **Progress tracking**: Evaluators can view their evaluation progress and statistics through dashboard aggregation endpoints.
- **Route-guarded access**: On the frontend, Evaluator-only pages are protected by an [[concepts/route-guard|Auth Guard]] that redirects unauthenticated users.
- **Open access scope question**: It is unresolved (Q3) whether the system is single-user or whether other Google accounts could sign in, which affects whether an email allowlist is needed beyond token verification.

## Applications

- **Rental listing triage**: Evaluators browse and filter listings stored in the [[entities/affitto_data|affitto_data]] collection to identify promising rentals in a structured workflow.
- **Decision recording**: Using the [[concepts/statemaloi|stateMaloi]] enum, Evaluators systematically mark each listing with a qualitative judgment, enabling later filtering and review.
- **Bulk operations**: Evaluators can leverage [[concepts/bulk-state-update-frontend|bulk state updates]] to efficiently process multiple listings at once.
- **Personal note-taking**: The description field serves as a free-text annotation layer, allowing Evaluators to record observations, reminders, or contextual details about specific listings via the [[concepts/description-editor|description editor]].
- **Dashboard review**: Evaluators monitor their progress via statistics endpoints, gaining visibility into how many listings have been reviewed and what decisions have been made.
- **Frontend tabular workflow**: On the [[entities/affitti-frontend-v1|Affitti Frontend v1]], Evaluators interact with listings through the Tabella Page, which presents data in a sortable, filterable table with inline actions for state changes and description edits.

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — The decision classification system used by Evaluators to mark listings
- [[concepts/firebase-id-token-verification|Firebase ID token verification]] — The authentication mechanism that gates all Evaluator access
- [[concepts/firebase-authentication|Firebase Authentication]] — The identity provider (Google sign-in) used to authenticate Evaluators
- [[concepts/audit-trail|Audit trail]] — Tracks Evaluator actions for accountability (BR-2)
- [[concepts/write-whitelist|Write whitelist]] — Controls which fields an Evaluator can modify (BR-5)
- [[concepts/bulk-state-update-frontend|Bulk State Update]] — Enables Evaluators to update multiple listings simultaneously
- [[concepts/slim-dto|DTO]] — The data transfer format used to present listing data to Evaluators
- [[concepts/table|Tabella Page]] — The primary frontend page where Evaluators interact with rental listings
- [[concepts/route-guard|Auth Guard]] — Route guard that protects Evaluator-only pages from unauthenticated access
- [[concepts/description-editor|Description Editor]] — The modal used by Evaluators to edit listing descriptions
- [[concepts/google-sign-in-flow|Google Sign-In]] — The specific authentication flow used by Evaluators to sign in

## Related Entities

- [[entities/affitti-backend|Affitti Backend API]] — The API layer that serves Evaluator requests
- [[entities/affitiudine|affitiudine project]] — The Firebase project hosting Evaluator authentication
- [[entities/affitto_data|affitto_data]] — The primary collection of rental listings that Evaluators review
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — The compute layer executing Evaluator-initiated operations
- [[entities/mongodb-atlas|MongoDB Atlas]] — The database backend storing listings and Evaluator decisions
- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — The web application providing the Evaluator's primary UI for listing review

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]**
> - "**Evaluator** (primary) | Authenticated user (Google sign-in) reviewing rental listings | Browse/filter listings, mark decisions, write notes, see progress stats"
> - "**Decision (Q3, resolved):** *all* endpoints — reads and writes — require a verified Firebase ID token. There is no anonymous/viewer access."
> - "Is this single-user (only you) or could other Google accounts sign in? Affects whether an email allowlist is needed on top of token verification."

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]**
> - "**Evaluator** | Google-authenticated | Full Tabella Page"
> - "**Visitor** | Unauthenticated | Landing page with database summary only"
> - "V1 of the frontend delivers a web application that lets an authenticated user view listings in a tabular format and gives unauthenticated visitors a read-only database summary."