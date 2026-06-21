---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]", "[[sources/prd_affitti_backend_v0-3_1d90fc]]"]
tags: [term]
aliases:
  - "GET /public/stats/summary"
  - "public stats summary endpoint"
  - "stats summary API"
---


# Public Stats Summary Endpoint

## Definition

The Public Stats Summary Endpoint (`GET /public/stats/summary`) is a backend API endpoint introduced in Backend PRD v0.3 to serve the [[concepts/senza-autenticazioni-page|Senza Autenticazione Page]] of the [[entities/affitti-frontend-v1|Affitti Frontend v1]] landing page. It is the single public, rate-limited, aggregate-only endpoint that requires no authentication, resolving the authentication conflict identified as Q1 in Backend PRD v0.2. The endpoint exposes only aggregate counters grouped by {[[concepts/province|province]], [[concepts/type|type]]} — including totals for accept, deny, wait, and emptyChoice statuses — and never individual listing data.

## Key Characteristics

- **Public access**: Requires no authentication, making it the only unauthenticated endpoint in the backend API surface. This directly supports the [[concepts/count-without-autentication|Count Without Authentication]] requirement.
- **Aggregate-only**: Returns only statistical counters (total, accept, deny, wait, emptyChoice) and never exposes individual listing or realEstate data, preserving data privacy.
- **Rate-limited**: Subject to [[concepts/rate-limiting|Rate Limiting]] to prevent abuse, as it is publicly accessible without any auth guard.
- **Grouped by {province, type}**: Counters are dimensioned along the [[concepts/province|province]] and [[concepts/type|type]] axes, aligning with the [[concepts/contattore|Contattore feature]] and [[concepts/count-collection-view|count collection view]] patterns.
- **Auth conflict resolution**: Its introduction formally resolves the Q1 decision from the PRD, settling the architectural tension between the frontend's need for a public landing page and the backend's default requirement for authenticated access.
- **Dependency risk (R1)**: Identified as a new backend deliverable and a critical dependency for the frontend's M2 milestone, requiring cross-team coordination between frontend and backend teams.

## Applications

- **Landing page data source**: Serves as the sole data provider for the [[concepts/senza-autenticazioni-page|Senza Autenticazione Page]], enabling visitors to view aggregate rental market statistics without logging in.
- **Cross-team API contract**: Acts as the formal interface contract between the [[entities/affitti-frontend-v1|Affitti Frontend v1]] and the backend API layer, requiring coordinated delivery to unblock the frontend M2 milestone.
- **Privacy-preserving analytics**: Enables public-facing analytics dashboards that show market trends by province and property type without risking exposure of individual listing details.
- **Rate-limited public API pattern**: Serves as a reference implementation for exposing public, aggregate-only endpoints in systems that otherwise require full authentication.

## Related Concepts

- [[concepts/senza-autenticazioni-page|Senza Autenticazione Page]]
- [[concepts/rate-limiting|Rate Limiting]]
- [[concepts/count-without-autentication|Count Without Authentication]]
- [[concepts/province|province]]
- [[concepts/type|type]]
- [[concepts/contattore|Contattore feature]]
- [[concepts/count-collection-view|count collection view]]
- [[concepts/login|login]]
- [[concepts/business-rules|business rules]]
- [[concepts/affito-collection-query|affito collection aggregation]]

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]]

## Mentions in Source

- "**Decision (Q1, resolved):** the auth conflict with Backend PRD v0.2 is settled by **amending the backend**: a single public, rate-limited, **aggregate-only** endpoint (`GET /public/stats/summary`) serves the landing page. It exposes counters only — never individual listing data." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]