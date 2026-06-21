---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [method]
aliases:
  - "Column Sort"
  - "FR-8 Column Sorting"
  - "table column sorting"
---


# Column Sorting

## Definition

Column sorting is a user interaction feature on the Tabella Page that allows evaluators to sort table rows by specific columns. As defined in FR-8 of the Affitti Frontend PRD, sorting is enabled on the **Price**, **surfaceValue**, and **rent** columns. The sort state is managed within the Redux listings slice alongside pagination and filter parameters, enabling coordinated data retrieval through query parameters sent to the backend API.

## Key Characteristics

- **Restricted column set**: Sorting is only available on three numeric columns — Price, surfaceValue, and rent — rather than all table columns
- **Server-side sort**: The sort parameter is transmitted as a query parameter alongside pagination and filter values, indicating that sorting is resolved on the backend rather than purely client-side
- **Redux state integration**: Sort state is stored in the `listings` Redux slice (managed via RTK Query cache) together with page number, filters (including `province`, `type`, `stateMaloi`), cached results, and request status
- **Complementary to filtering**: Column sorting works in conjunction with the filter bar (province, type, stateMaloi including "senza scelta" / no decision) to help evaluators navigate and prioritize rental listings
- **Stateless UI toggle**: The sort direction (ascending/descending) is toggled via column header interaction, following standard data table UX conventions

## Applications

- **Evaluator prioritization**: Allows rental evaluators to quickly surface the highest or lowest priced listings, largest or smallest properties by surface area, or highest/lowest rent values
- **Combined filter + sort workflow**: An evaluator can first filter listings by province and property type, then sort by rent to identify outliers or prioritize review order
- **Paginated data navigation**: When combined with [[concepts/pagination|Pagination]], sorting ensures that the evaluator sees consistently ordered results across pages

## Related Concepts

- [[concepts/table|Data Table]] — the main table component where column sorting is applied
- [[concepts/tabella-colonne|Tabella Colonne]] — defines the column schema for the rental table
- [[concepts/pagination|Pagination]] — works alongside sorting for paginated data retrieval
- [[concepts/redux-state-slices|Redux State Slices]] — the listings slice stores sort state
- [[concepts/redux-state|Redux State]] — broader client state architecture
- [[concepts/redux|Redux]] — state management framework used to maintain sort parameters
- [[concepts/province|Province]] — filter dimension used alongside sorting
- [[concepts/type|Type]] — filter dimension used alongside sorting
- [[concepts/statemaloi-badge-rendering|stateMaloi Badge Rendering]] — stateMaloi filter that complements sorting
- [[concepts/senza-scelta-page|Senza Scelta]] — the "no decision" filter option used in conjunction with sort
- [[concepts/null-safe-rendering|Null-safe Rendering]] — ensures sortable columns with missing values render safely

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the frontend application where column sorting is implemented

## Mentions in Source

- "filter bar with `province`, `type`, and `stateMaloi` (including "senza scelta" = no decision); column sorting on Price, surfaceValue, rent." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "`listings` | query params (page, filters incl. stateMaloi, sort), cached results, request status (RTK Query cache)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]