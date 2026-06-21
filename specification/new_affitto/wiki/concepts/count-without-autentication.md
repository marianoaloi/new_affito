---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "term"
aliases:
  - "Count Without Authentication"
  - "Unauthenticated Count"
  - "count without autentication"
---

## Basic Information

- **Type:** concept
- **Concept subtype:** term
- **Sources:** [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]

## Definition

Count without authentication refers to a specific API endpoint or data call in the Affitiudine system that provides a summary of the current rental database state without requiring user authentication. It serves as the data source for the unauthenticated landing page, delivering a basic overview of the database to visitors who have not logged in. This public-facing data access point is distinct from the authenticated endpoints that provide full tabulated data and detailed property listings.

## Key Characteristics

- **No authentication required**: The endpoint can be accessed by any visitor without login credentials or Firebase authentication tokens
- **Summary-level data only**: Returns an aggregated count or overview of the database rather than detailed, individual property records
- **Public-facing access point**: Designed specifically to populate the unauthenticated landing page with a snapshot of the rental database
- **Distinct from authenticated data calls**: Contrasts with authenticated endpoints (such as those powering the [[concepts/tabella-page|Table Page]]) that return full, detailed tabulated data
- **Data source for the landing page**: Directly feeds the [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] with its display content
- **Only data access for unauthenticated users**: Represents the sole data access point available to users who have not logged in, making it the exclusive gateway for public data preview

## Applications

- **Unauthenticated landing page rendering**: Provides the data needed to render a basic summary view for visitors who have not yet logged in, giving them an overview of the rental database state
- **Public database status indicator**: Allows potential users to see a high-level snapshot of available rental data before deciding to authenticate
- **Access control boundary**: Acts as the boundary between publicly accessible data and data that requires [[concepts/autenticazione-necessaria|Autenticazione Necessaria]], ensuring sensitive or detailed information remains behind authentication

## Related Concepts

- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] — the frontend page that consumes and displays the data returned by this unauthenticated count endpoint
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — the authentication requirement that distinguishes full data access from the limited public count
- [[concepts/tabella-page|Table Page]] — the authenticated page that displays full tabulated data, in contrast to the summary provided by this endpoint
- [[concepts/acceptdenywait|Accept/Deny/Wait Counters]] — related aggregation concept for summarized database statistics

## Related Entities

- [[entities/affitiudine|Affitiudine]] — the system in which this unauthenticated count endpoint exists
- [[entities/count|count]] — the entity representing this unauthenticated data retrieval mechanism

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]**
> - "Quando non c\`e una persona autenticata una pagina iniciale con apenas un resumo del atuale database deve essere presentada. Questo dado è della chiamata all count without autentication"
> - "Senza Autenticazioni Page — Quando non c\`e una persona autenticata una pagina iniciale con apenas un resumo del atuale database deve essere presentada."
> - "Questo dado è della chiamata all count without autentication"