---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "term"
aliases:
  - "Table Page"
  - "Tabella Page"
  - "pagina tabella"
---

## Description

The Tabella Page is the primary authenticated view in the Affitti Frontend application, accessible at the `/tabella` route, that displays scraped rental property listings in a structured table layout. It fetches data from `GET /listings` and renders it in a columnar format with seven defined columns — title, price, energy_class, surfaceValue, rent, contractValue, and stateMaloi — as defined by the [[concepts/tabella-colonne|Tabella Colonne]] schema. Beyond pure data visualization, the Tabella Page supports decision actions including setting [[concepts/senza-scelta-page|stateMaloi]] on individual rows via a 3-state toggle/menu, bulk state operations using checkboxes, and description editing through a modal or side panel. The page includes pagination (page/limit parameters, defaulting to 20 results), filtering by [[concepts/province|province]], [[concepts/type|type]], and stateMaloi (including a "senza scelta" option for listings with no decision), and column sorting on Price, surfaceValue, and rent. Loading, empty, and error states are specified, with null-safe rendering required to handle irregular scraped data. The Tabella Page is one of the main data visualization pages alongside the [[concepts/mappa-page|Mappa Page]] and the [[concepts/analisi-page|Analisi Page]], forming the trio of authenticated content views within the application.

## Key Characteristics

- **Authentication required**: Access to the Tabella Page is gated behind the [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] mechanism via a [[concepts/login|Route Guard]]; unauthenticated users are redirected to the [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]]
- **Tabular data presentation**: Property data is displayed in a structured table with predefined columns
- **Seven standardized columns (v1)**: The table presents seven columns — title, price, energy_class, [[concepts/tabella-colonne|surfaceValue]], [[concepts/tabella-colonne|rent]], [[concepts/tabella-colonne|contractValue]], and stateMaloi — as defined by the [[concepts/tabella-colonne|Tabella Colonne]] specification
- **Backend-driven data**: The tabulated content is dynamically fetched from `GET /listings` rather than being statically defined
- **Pagination support**: Results are paginated with page/limit query parameters, defaulting to 20 items per page
- **Filtering capabilities**: Users can filter listings by [[concepts/province|province]], [[concepts/type|type]], and stateMaloi (including "senza scelta" for undecided listings)
- **Column sorting**: Sortable columns include Price, surfaceValue, and rent
- **Decision actions**: Supports setting stateMaloi on individual rows (3-state toggle/menu), bulk state operations via checkboxes, and description editing through a modal/side panel
- **Null-safe rendering**: Required to handle irregular or incomplete scraped data gracefully
- **State handling**: Loading, empty, and error states are explicitly specified
- **Comparison-oriented layout**: The columnar format is designed to allow users to quickly compare attributes across multiple rental property listings
- **Part of the React/Redux frontend**: Implemented within the [[concepts/react-and-redux-frontend|React Redux frontend]] application stack
- **Sibling data views**: Works alongside the [[concepts/mappa-page|Mappa Page]] and [[concepts/analisi-page|Analisi Page]] as the three main authenticated content pages

## Applications

- **Rental property comparison**: Authenticated users can compare multiple property listings side-by-side across key attributes such as price, energy class, surface area, rent terms, contract type, and decision state
- **Data review and triage**: Users can quickly scan and evaluate large numbers of property listings in a compact tabular view, with pagination to manage large datasets
- **Decision management**: Users can classify listings by setting stateMaloi states individually or in bulk, and enrich listing data by editing descriptions via a modal/side panel
- **Filtered data exploration**: Users can narrow down listings by province, property type, or decision state to focus on relevant subsets of data
- **Authenticated data access**: Serves as the landing interface for logged-in users who need to review scraped and aggregated rental data from the [[concepts/web-scraping-pipeline|web scraping pipeline]]

## Related Concepts

- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — authentication gate required to access this page
- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] — the counterpart page shown to unauthenticated users
- [[concepts/tabella-colonne|Tabella Colonne]] — the column schema defining the table columns displayed on this page
- [[concepts/title|title]] — one of the displayed table columns
- [[concepts/price|price]] — one of the displayed table columns (Price), sortable
- [[concepts/energy_class|energy_class]] — one of the displayed table columns
- [[concepts/surfacevalue|surfaceValue]] — one of the displayed table columns, sortable
- [[concepts/rent|rent]] — one of the displayed table columns, sortable
- [[concepts/contractvalue|contractValue]] — one of the displayed table columns
- [[concepts/senza-scelta-page|Senza Scelta]] — related to the stateMaloi column and "senza scelta" filter option
- [[concepts/province|province]] — filter dimension for narrowing listings by province
- [[concepts/type|type]] — filter dimension for narrowing listings by property type
- [[concepts/react-and-redux-frontend|React Redux frontend]] — the frontend framework in which this page is implemented
- [[concepts/redux-state|Redux store]] — client-side state management for page data
- [[concepts/login|Route Guard]] — authentication check protecting this route
- [[concepts/mappa-page|Mappa Page]] — sibling authenticated data visualization page displaying property data on a map
- [[concepts/analisi-page|Analisi Page]] — sibling authenticated data visualization page presenting analytical views of the data
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the data acquisition pipeline that feeds property data to this page
- [[concepts/table|data table]] — the underlying table rendering concept

## Related Entities

- [[entities/affitiudine|affitiudine]] — the parent application to which this page belongs

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]**
> - "Con il dato recuperato deve presentare il dato tabulato con le colune :"
> - "| Title | Price | energy_class | surfaceValue | rent | contractValue |"

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|Affitti Frontend PRD v0.2]]**
> - "**G2** — **Tabella Page**: authenticated tabular view of listings with the defined columns, **plus decision actions** (set `stateMaloi`, edit `description`) and filters by `province`/`type`/`stateMaloi`."
> - "**FR-6** — Fetch listings from `GET /listings` and render a table with these v1 columns:"