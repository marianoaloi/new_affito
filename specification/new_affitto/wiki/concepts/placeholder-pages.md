---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [term]
aliases:
  - "Coming Soon Pages"
  - "Stub Pages"
  - "In Arrivo Pages"
---


# Placeholder Pages

## Definition
Placeholder Pages are minimal "in arrivo" (coming soon) stub pages created for the three routes reserved in v1 of the Affitti Frontend but not yet implemented: `/mappa`, `/analisi`, and `/senza-scelta`. These pages are placed behind the [[concepts/route-guard|Auth Guard]] so that the application's navigation structure ships complete in v1 without dead links. The approach explicitly manages stakeholder expectations (Risk R4) by making it clear that v1 delivers only the Landing page and the Tabella (data table), while demonstrating that the architecture is designed to accommodate future pages. Placeholder Pages are delivered in milestone M5 as part of the final polish phase.

## Key Characteristics
- **Minimal content**: Each placeholder renders only a brief "in arrivo" (coming soon) message, requiring no backend integration or complex UI
- **Auth-guarded**: All three placeholder routes sit behind the [[concepts/route-guard|Auth Guard]], ensuring unauthenticated users cannot access them
- **Navigation completeness**: By including these stubs, the v1 application shell ships with a fully wired navigation structure — no broken or dead links exist in the UI
- **Stakeholder expectation management**: Addresses Risk R4 by clearly signaling which features are planned but not yet available, preventing confusion about v1 scope
- **Architecture demonstration**: Proves that the routing and layout infrastructure can host additional pages (Mappa, Analisi, Senza Scelta) without structural changes
- **Milestone M5 deliverable**: Shipped as part of the final polish phase, after core functionality (Tabella, filters, auth) is stable

## Applications
- **Incremental product delivery**: Allows the team to ship a complete-feeling v1 while deferring complex feature development (map visualization, analytics, decision support) to later releases
- **Risk mitigation**: Reduces the risk of stakeholder dissatisfaction by transparently communicating the v1 feature boundary within the product itself
- **Frontend architecture validation**: Serves as a lightweight proof that the application shell — routing, layout, and header — is extensible for future pages without refactoring
- **QA and navigation testing**: Enables end-to-end testing of the full navigation flow, including auth guard behavior on all routes, even before feature pages are built

## Related Concepts
- [[concepts/route-guard|Auth Guard]] — the authentication guard that protects placeholder routes
- [[concepts/analisi|Analisi]] — one of the three future pages represented by a placeholder
- [[concepts/table|Tabella]] — the primary data table page that ships as functional in v1
- [[concepts/login|Login]] — the authentication flow that gates access to placeholder pages
- [[concepts/react|React]] — the UI library used to render placeholder components
- [[concepts/hosting|Hosting]] — the Firebase Hosting service where placeholder pages are deployed

## Related Entities
- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the product release in which placeholder pages are delivered

## Mentions in Source
- "FR-16 — `/mappa`, `/analisi`, `/senza-scelta` render a minimal "in arrivo" placeholder behind the auth guard, so navigation structure ships in v1 without dead links." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "Application shell (routing, layout, header) prepared to host future pages: *Mappa*, *Analisi*, *Senza Scelta*." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]