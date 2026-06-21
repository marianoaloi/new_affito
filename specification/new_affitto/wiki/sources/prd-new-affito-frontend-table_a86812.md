---
type: source
created: 2026-06-21
updated: 2026-06-21
source_file: "[[old/PRD New Affito FrontEnd Table.md]]"
tags: [Autenticazione Necessaria, Tabella Page, Mappa Page, Analisi Page, Senza Scelta Page, Senza Autenticazioni Page, firebaseConfig, count without autentication, Tabella Colonne]
aliases: ["PRD Affito Frontend Table", "Affito Frontend PRD"]
---

# PRD New Affito Frontend Table - Summary

## Source
- Original file: [[old/PRD New Affito FrontEnd Table.md]]
- Ingested: 2026-06-21

## Core Content

This Product Requirements Document defines the frontend specifications for the [[entities/affitiudine|Affitiudine]] real estate application. The PRD establishes two core user states: authenticated and unauthenticated. [[concepts/autenticazione-necessaria|Authentication]] is implemented via [[entities/googleauthprovider|GoogleAuthProvider]] through [[concepts/firebase-autentication|Firebase Authentication]], with a specific [[concepts/firebaseconfig|Firebase configuration]] linking to the `affitiudine` project. Authenticated users access property data through the [[concepts/tabella-page|Tabella Page]], which displays real estate listings in a structured table with six [[concepts/tabella-colonne|columns]]: [[concepts/title|Title]], [[concepts/price|Price]], [[concepts/energy_class|energy_class]], [[concepts/surfacevalue|surfaceValue]], [[concepts/rent|rent]], and [[concepts/contractvalue|contractValue]]. Unauthenticated users are directed to the [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]], which shows a database summary via the [[concepts/count-without-autentication|count without authentication]] endpoint. Three additional pages — [[concepts/mappa-page|Mappa Page]], [[concepts/analisi-page|Analisi Page]], and [[concepts/senza-scelta-page|Senza Scelta Page]] — are planned but remain undefined (TODO).

## Key Entities
- [[entities/affitiudine|Affitiudine]] — Firebase-hosted real estate project serving as the backend infrastructure
- [[entities/googleauthprovider|GoogleAuthProvider]] — Firebase authentication provider enabling Google-based login

## Key Concepts
- [[concepts/autenticazione-necessaria|Required Authentication]] — Login requirement with profile photo display in the upper-right corner
- [[concepts/firebaseconfig|Firebase Configuration]] — SDK initialization object with project credentials
- [[concepts/tabella-page|Tabella Page]] — Main data table displaying real estate listings
- [[concepts/tabella-colonne|Table Columns]] — Six-column structure for property data display
- [[concepts/senza-autenticazioni-page|Unauthenticated Page]] — Public landing page with database summary
- [[concepts/count-without-autentication|Count Without Authentication]] — Public API endpoint for aggregate statistics
- [[concepts/login|Login]] — User authentication action via Google provider
- [[concepts/mappa-page|Mappa Page]], [[concepts/analisi-page|Analisi Page]], [[concepts/senza-scelta-page|Senza Scelta Page]] — Planned pages (TODO)

## Main Points
- **Authentication flow**: Users log in via Google through Firebase Authentication; the profile photo is displayed in the upper-right button after login
- **Firebase project**: The frontend connects to the `affitiudine` Firebase project with specific configuration credentials (API key, authDomain, projectId, storageBucket)
- **Tabella Page**: The primary data view presents real estate listings in six columns — Title, Price, energy_class, surfaceValue, rent, and contractValue
- **Unauthenticated access**: Non-logged-in users see a summary page powered by a public count endpoint that requires no authentication
- **Incomplete specification**: Three pages (Mappa, Analisi, Senza Scelta) are listed but not yet defined, indicating the PRD is a work in progress
- **Dual access model**: The application enforces different data access levels based on authentication state — full property data for authenticated users vs. aggregate counts for visitors