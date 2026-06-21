---
type: source
created: 2026-06-21
updated: 2026-06-21
source_file: "[[old/PRD_Affitti_Frontend_v0.2.md]]"
tags: [Tabella Page, Senza Autenticazione Page, Session Overlay, Route Guard, Redux State Slices, stateMaloi Badge Rendering, Public Stats Summary Endpoint, Bulk State Update (Frontend), Description Editor, Optimistic Update, Shared Types Package, Null-safe Rendering, Auth Guard, Pagination, Column Sorting, Filter Bar, Slim DTO Alignment, Eventual Consistency (Frontend Handling), Placeholder Pages, Google Sign-In Flow, Milestones, Non-Functional Requirements, Evaluator (Frontend Persona), Firebase Analytics]
aliases: ["Affitti Frontend PRD v0.2", "PRD Affitti Frontend v1"]
---

# PRD — Affitti Frontend v1 (Web App) - Summary

## Source
- Original file: [[old/PRD_Affitti_Frontend_v0.2.md]]
- Ingested: 2026-06-21

## Core Content

This Product Requirements Document defines [[entities/affitti-frontend-v1|Affitti Frontend v1]], a React SPA for the [[entities/affitiudine|affitiudine]] rental listings platform. The app uses Redux Toolkit with [[entities/rtk-query|RTK Query]] for state management and API calls, TypeScript with the [[concepts/shared-types-package|Shared Types Package]], and is deployed on [[entities/firebase-hosting|Firebase Hosting]]. Authentication uses the [[concepts/google-sign-in-flow|Google Sign-In Flow]] via Firebase Authentication.

V1 delivers two functional pages: the [[concepts/senza-autenticazione-page|Senza Autenticazione Page]] (public landing showing aggregate stats from the [[concepts/public-stats-summary-endpoint|Public Stats Summary Endpoint]]) and the [[concepts/tabella-page|Tabella Page]] (authenticated table of rental listings with decision actions). Three [[concepts/placeholder-pages|Placeholder Pages]] (Mappa, Analisi, Senza Scelta) are reserved behind the [[concepts/auth-guard|Auth Guard]]. The PRD resolves the backend auth conflict by introducing a single public, rate-limited, aggregate-only endpoint, and addresses the [[concepts/eventual-consistency-frontend-handling|read-after-write consistency gap]] through a [[concepts/session-overlay|Session Overlay]] pattern in Redux.

## Key Entities

- **[[entities/affitti-frontend-v1|Affitti Frontend v1]]** — The React SPA delivering tabular listing views and decision-making for authenticated [[concepts/evaluator-frontend-persona|Evaluators]] and aggregate summaries for visitors.
- **[[entities/affitiudine|affitiudine]]** — The Firebase project hosting backend and frontend, providing authentication and hosting infrastructure.
- **[[entities/firebase-hosting|Firebase Hosting]]** — Deployment target for the SPA, integrated with the Firebase ecosystem.
- **[[entities/rtk-query|RTK Query]]** — Data-fetching and caching layer (assumed) for API communication and Redux cache management.

## Key Concepts

- **[[concepts/tabella-page|Tabella Page]]** — Primary authenticated view with 7 columns, [[concepts/pagination|Pagination]], [[concepts/filter-bar|Filter Bar]], [[concepts/column-sorting|Column Sorting]], and decision actions.
- **[[concepts/senza-autenticazione-page|Senza Autenticazione Page]]** — Public landing page displaying aggregate database statistics.
- **[[concepts/session-overlay|Session Overlay]]** — Frontend technique layering confirmed writes over fetched data to handle [[concepts/eventual-consistency-frontend-handling|eventual consistency]].
- **[[concepts/redux-state-slices|Redux State Slices]]** — Five slices (auth, listings, decisions, stats, ui) organizing application state.
- **[[concepts/optimistic-update|Optimistic Update]]** — UI pattern for immediate feedback on decision actions with rollback on failure.
- **[[concepts/statemaloi-badge-rendering|stateMaloi Badge Rendering]]** — Visual badge system (🔴/🟢/🟡/⚪) for decision states.
- **[[concepts/bulk-state-update-frontend|Bulk State Update]]** — Multi-row decision action with checkbox selection and batch API call.
- **[[concepts/description-editor|Description Editor]]** — Modal/side panel for editing listing descriptions with unsaved-changes guard.
- **[[concepts/null-safe-rendering|Null-safe Rendering]]** — Resilience pattern for irregular scraped data in table cells.
- **[[concepts/slim-dto-alignment|Slim DTO Alignment]]** — Backend coordination task to flatten nested powerproperties fields.
- **[[concepts/non-functional-requirements|Non-Functional Requirements]]** — Performance, security, resilience, accessibility, browser support, and responsive design standards.
- **[[concepts/milestones|Milestones]]** — Five-phase delivery plan from Shell & Auth (M1) through Polish (M5).
- **[[concepts/firebase-analytics|Firebase Analytics]]** — Proposed basic observability for page views and login events.

## Main Points

- **Two functional pages in v1**: the public [[concepts/senza-autenticazione-page|Landing Page]] with aggregate stats and the authenticated [[concepts/tabella-page|Tabella Page]] with 7 columns (title, price, energy_class, surfaceValue, rent, contractValue, stateMaloi).
- **Auth conflict resolved**: a single public, rate-limited [[concepts/public-stats-summary-endpoint|aggregate endpoint]] exposes counters only — never individual listing data.
- **Decision actions are in v1 scope**: [[concepts/statemaloi-badge-rendering|stateMaloi setting]] (per-row and [[concepts/bulk-state-update-frontend|bulk]]), [[concepts/description-editor|description editing]], all with [[concepts/optimistic-update|optimistic updates]] and rollback on failure.
- **[[concepts/session-overlay|Session Overlay]]** in Redux handles the [[concepts/eventual-consistency-frontend-handling|read-after-write gap]] between affito (writes) and affitto_data (reads), though it does not survive full page reloads (Risk R5).
- **[[concepts/route-guard|Route guards]]** redirect unauthenticated users to the landing page; defense in depth requires both client-side and server-side auth enforcement.
- **[[concepts/null-safe-rendering|Null-safe rendering]]** is mandatory for all table cells due to irregular scraped data with missing/null values and NaN artifacts.
- **[[concepts/redux-state-slices|Five Redux slices]]** (auth, listings, decisions, stats, ui) with business rules imported from the [[concepts/shared-types-package|Shared Types Package]].
- **Key risks**: dependency on the new public stats endpoint (R1), [[concepts/slim-dto-alignment|DTO alignment]] for nested fields (R2), scraped data irregularity (R3), stakeholder scope expectations (R4), and session overlay persistence (R5).
- **Five [[concepts/milestones|milestones]]** proposed: Shell & Auth → Landing → Tabella read → Tabella decisions → Polish & deploy to [[entities/firebase-hosting|Firebase Hosting]].
- **Open questions remain**: session overlay survival on reload (Q1), [[concepts/bulk-state-update-frontend|bulk selection]] scope (Q2), and exact source fields for rent/contractValue in the backend schema (Q3).