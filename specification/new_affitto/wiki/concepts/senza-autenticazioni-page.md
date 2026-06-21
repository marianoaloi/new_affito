---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "term"
aliases:
  - "Unauthenticated Page"
  - "No Auth Page"
  - "Senza Autenticazioni Page"
  - "Senza Autenticazione Page"
---

## Description

The Senza Autenticazioni Page is the landing page displayed to unauthenticated users in the Affitti Frontend application, served at the root URL (`/`). When no user is authenticated, this page presents an initial summary of the current database contents, providing aggregate statistics rather than detailed records. In Affitti Frontend v1, the data is sourced from the public endpoint `GET /public/stats/summary` (referred to in earlier documentation as the [[concepts/count-without-autentication|Count Without Authentication]] call), which requires no authentication and returns aggregate numbers per `{province, type}` combination — including total, accept, deny, wait, and emptyChoise counts. These aggregates are rendered as summary cards or a compact table; no individual listing data is ever shown pre-login. The page includes a prominent call-to-action encouraging visitors to log in, and if the visitor is already authenticated, it may display the summary plus quick navigation to `/tabella`. By showing only limited summary data, the page encourages users to authenticate and access the full feature set including the [[concepts/tabella-page|Tabella Page]], [[concepts/analisi-page|Analysis Page]], and [[concepts/mappa-page|Map Page]].

## Key Characteristics

- **No authentication required**: The page is accessible without any user login or Firebase authentication, unlike most other pages in the application
- **Root URL entry point**: Served at `/`, functioning as the default landing page when no authenticated session is detected and the first page visitors encounter
- **Summary/overview content**: Displays only a condensed summary of the database rather than detailed records, limiting the information exposed to anonymous users
- **Aggregate data per province and type**: Shows aggregate numbers per `{province, type}` including total, accept, deny, wait, and emptyChoise counts, rendered as summary cards or a compact table
- **Public stats endpoint data source**: Relies on `GET /public/stats/summary` (the dedicated [[concepts/count-without-autentication|Count Without Authentication]] API endpoint) that operates without authentication, returning aggregate statistics rather than individual records
- **Prominent login CTA**: Includes a clear call-to-action encouraging visitors to log in or create an account
- **Authenticated visitor handling**: If the visitor is already authenticated, the page may show the summary plus quick navigation to `/tabella`
- **Incentive to authenticate**: By showing only limited summary data, the page encourages users to log in to access the full feature set including the [[concepts/tabella-page|Tabella Page]], [[concepts/analisi-page|Analysis Page]], and [[concepts/mappa-page|Map Page]]

## Applications

- **Public data preview**: Allows potential users or stakeholders to see a snapshot of the database size and contents without needing credentials
- **User onboarding funnel**: Serves as the first step in the user journey, guiding unauthenticated visitors toward creating an account or logging in
- **System health indicator**: The count summary can act as a quick indicator that the backend and database are operational, even for users who have not yet authenticated
- **Access control boundary**: Establishes a clear separation between public (unauthenticated) and private (authenticated) areas of the frontend application

## Related Concepts

- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — The authentication requirement that governs access to all other pages; the Senza Autenticazioni Page is the counterpart shown when this requirement is not met
- [[concepts/tabella-page|Tabella Page]] — The main data table page available only to authenticated users, representing the full-access experience beyond the summary page
- [[concepts/count-without-autentication|Count Without Authentication]] — The specific API endpoint used by this page to retrieve aggregate database statistics without requiring user login (referenced as `GET /public/stats/summary` in v0.2)
- [[concepts/analisi-page|Analysis Page]] — An authenticated-only page providing data analysis features
- [[concepts/mappa-page|Map Page]] — An authenticated-only page providing map-based data visualization
- [[concepts/province|Province]] — One of the dimensions used for aggregating summary data on this page
- [[concepts/type|Type]] — One of the dimensions used for aggregating summary data on this page
- [[concepts/login|Login]] — The authentication action prompted by the page's call-to-action

## Related Entities

- [[entities/affitiudine|Affitti Udine]] — The application project that includes this page as its public-facing entry point

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]**
> - "Quando non c\`e una persona autenticata una pagina iniciale con apenas un resumo del atuale database deve essere presentada."
> - "Questo dado è della chiamata all count without autentication"

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|Affitti Frontend PRD v0.2]]**
> - "**G3** — **Landing / Senza Autenticazione Page**: public summary of the current database state (from the public aggregate endpoint)."
> - "**FR-11** — Shown at `/` for unauthenticated visitors: a **summary of the current database state**, fed by `GET /public/stats/summary` (no auth — Q1 resolved)."