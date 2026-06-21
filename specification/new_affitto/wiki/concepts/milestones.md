---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [term]
aliases:
  - "Development Phases"
  - "Delivery Milestones"
  - "M1–M5"
---


# Milestones

## Definition

Milestones define the proposed phased delivery plan for [[entities/affitti-frontend-v1|Affitti Frontend v1]], consisting of five sequential phases (M1 through M5). Each milestone groups a coherent set of functional requirements and deliverables, establishing a progressive build-up from application scaffolding and authentication through to full feature completion, polish, and deployment. Dependencies between milestones and backend deliverables are explicitly tracked to coordinate cross-team delivery.

## Key Characteristics

- **Five-phase structure**: The plan is divided into M1 (Shell & Auth), M2 (Landing), M3 (Tabella read), M4 (Tabella decisions), and M5 (Polish), each with a well-defined scope
- **Incremental delivery**: Each milestone builds upon the outputs of the previous one, enabling iterative validation and progressive integration
- **Functional requirement mapping**: Each milestone is tied to specific functional requirement ranges (e.g., FR-1…FR-5 for M1, FR-11…FR-15 for M2, FR-6…FR-10 for M3)
- **Cross-team dependency tracking**: M2 explicitly depends on the backend delivering the [[concepts/public-stats-summary-endpoint|Public Stats Summary Endpoint]] (`GET /public/stats/summary`), highlighting the need for coordinated scheduling
- **End-to-end coverage**: The milestones collectively cover authentication, public-facing pages, authenticated data views, decision-making workflows, and production deployment

## Applications

- **Project planning and scheduling**: Milestones serve as the primary planning instrument for the Affitti Frontend v1 project, enabling work breakdown and sprint allocation
- **Stakeholder communication**: Each milestone represents a demonstrable increment of value, facilitating progress reviews and stakeholder sign-offs
- **Dependency management**: By explicitly noting backend dependencies (e.g., M2's reliance on the stats summary endpoint), the milestones enable proactive coordination between frontend and backend teams
- **Risk mitigation**: The phased approach allows early identification of integration issues (e.g., auth flow in M1) before investing in downstream feature work
- **Quality gating**: M5 (Polish) acts as a dedicated quality milestone covering responsive design, accessibility, and deployment readiness

## Related Concepts

- [[concepts/route-guard|Route Guard]] — M1 includes routing guards for authenticated navigation
- [[concepts/login|Login]] — M1 delivers the header with login/photo functionality
- [[concepts/google-sign-in-flow|Google Sign-In Flow]] — Authentication flow implemented in M1
- [[concepts/public-stats-summary-endpoint|Public Stats Summary Endpoint]] — Backend dependency for M2's public summary page
- [[concepts/tabella-colonne|Table Columns]] — M3 implements the table with 7 columns
- [[concepts/pagination|Pagination]] — M3 delivers table pagination (FR-7)
- [[concepts/filter-bar|Filter Bar]] — M3 includes filter functionality
- [[concepts/column-sorting|Column Sorting]] — M3 implements column sorting (FR-8)
- [[concepts/null-safe-rendering|Null-safe Rendering]] — M3 covers null-safe cell rendering (FR-10)
- [[concepts/statemaloi-badge-rendering|stateMaloi Badge Rendering]] — M4 adds row state rendering
- [[concepts/bulk-state-update-frontend|Bulk State Update]] — M4 delivers bulk state operations (FR-18)
- [[concepts/description-editor|Description Editor]] — M4 includes the edit description modal (FR-19)
- [[concepts/session-overlay|Session Overlay]] — M4 implements optimistic overlay for read-after-write handling
- [[concepts/placeholder-pages|Placeholder Pages]] — M5 completes placeholder/coming-soon pages
- [[concepts/hosting|Firebase Hosting]] — M5 concludes with Firebase Hosting deployment
- [[concepts/table|Table]] — The core data table built across M3 and M4
- [[concepts/senza-autenticazione-page|Senza Autenticazione Page]] — Public landing page delivered in M2
- [[concepts/tabella-page|Tabella Page]] — Authenticated table page built across M3 and M4

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — The project whose delivery is structured by these milestones

## Mentions in Source

- **M1 — Shell & Auth** | App scaffold, routing + guards, header with login/photo (FR-1…FR-5) — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- **M2 — Landing** | Public summary page (FR-11…FR-15) over `GET /public/stats/summary` — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- **M3 — Tabella (read)** | Table with 7 columns, pagination, filters, sorting, states (FR-6…FR-10) — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]