---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [product]
aliases:
  - "Affitti Frontend Web App"
  - "Affitti Frontend"
  - "Affitti Frontend v1"
---


# Affitti Frontend v1

## Basic Information
- Type: product
- Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|Affitti Frontend PRD v0.2]]

## Description
Affitti Frontend v1 is the first version of the web application for the Affitti rental listings platform. It is built as a [[concepts/react|React]] Single Page Application (SPA) written in [[concepts/typescript|TypeScript]], using [[concepts/redux|Redux]] Toolkit with RTK Query for [[concepts/redux-state|state management]] and API calls. Shared DTO and enum types are imported from the backend to ensure type consistency across the stack. The application is hosted on [[concepts/hosting|Firebase Hosting]] under the [[entities/affitiudine|affitiudine]] Firebase project and uses [[concepts/autenticazione-necessaria|Firebase Authentication]] with GoogleAuthProvider for user sign-in. V1 delivers two fully functional pages — a Landing page and the [[concepts/tabella-page|Tabella Page]] — plus three placeholder pages ([[concepts/analisi-page|Analisi Page]], [[concepts/mappa-page|Mappa Page]], and [[concepts/senza-scelta-page|Senza Scelta Page]]), providing authenticated users with tabular listing views and decision-making capabilities while offering unauthenticated visitors a public database summary via the [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]].

## Related Entities
- [[entities/affitiudine|affitiudine]] — Firebase project under which the frontend is hosted

## Related Concepts
- [[concepts/tabella-page|Tabella Page]] — Primary functional page for authenticated tabular listing views
- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] — Public-facing page showing a read-only database summary
- [[concepts/session-overlay|Session Overlay]] — Overlay mechanism for session management
- [[concepts/route-guard|Route Guard]] — Authentication-based route protection mechanism
- [[concepts/react|React]] — SPA framework used for the frontend
- [[concepts/redux|Redux]] — State management library (via Redux Toolkit + RTK Query)
- [[concepts/redux-state|Redux State]] — Client-side state store
- [[concepts/typescript|TypeScript]] — Language used for the application codebase
- [[concepts/hosting|Firebase Hosting]] — Hosting service for the deployed application
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — Firebase Authentication login flow
- [[concepts/login|Login]] — User authentication entry point
- [[concepts/analisi-page|Analisi Page]] — Placeholder page for future analysis features
- [[concepts/mappa-page|Mappa Page]] — Placeholder page for future map features
- [[concepts/senza-scelta-page|Senza Scelta Page]] — Placeholder page for undecided state
- [[concepts/tabella-colonne|Tabella Colonne]] — Column schema for the data table
- [[concepts/firebaseconfig|Firebase Config Object]] — Firebase project configuration

## Mentions in Source
- "V1 of the frontend delivers a web application that lets an authenticated user view listings in a tabular format and gives unauthenticated visitors a read-only database summary." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "Framework | React (SPA)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "State | Redux (Redux Toolkit + RTK Query for API calls — *assumption*)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]