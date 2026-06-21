---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [method]
aliases:
  - "Pagination"
  - "table pagination"
  - "FR-7 Pagination"
---


# Pagination

## Definition

Pagination is the table data pagination mechanism used in the [[concepts/tabella-page|Tabella Page]] of the [[entities/affitti-frontend-v1|Affitti Frontend v1]] application. It provides page-based navigation through listing data, consistent with the backend API's `page`/`limit` query parameters. The default page size is assumed to be 20 listings. Pagination state is managed within the [[concepts/redux-state-slices|Redux state slices]] (specifically the `listings` slice), alongside filter and sort parameters.

## Key Characteristics

- **API-consistent parameters**: Uses `page` and `limit` query parameters that mirror the backend API's pagination contract
- **Default page size**: Assumed default of 20 listings per page (noted as an assumption requiring validation)
- **Redux-managed state**: Pagination state (current page, page size) is stored in the [[concepts/redux|Redux]] `listings` slice alongside filter and sort state
- **Coupled with filtering and sorting**: Pagination resets or adjusts when filters or sort parameters change, ensuring consistent data views
- **Open question on bulk selection scope (Q2)**: Whether bulk selection applies to the current page only or to all results matching the active filter is an unresolved design decision that directly impacts how pagination interacts with the [[concepts/bulk-state-update-frontend|Bulk State Update]] feature

## Applications

- **Listing table navigation**: Enables users to browse through large datasets of rental listings in the [[concepts/tabella-page|Tabella Page]] without loading all records at once
- **Performance optimization**: Limits the number of records fetched and rendered per request, reducing API payload size and improving frontend rendering performance
- **Bulk operations integration**: Pagination scope determines the behavior of bulk selection — selecting items on the current page versus selecting all items matching the current filter criteria (the latter requiring backend support for filter-based bulk operations)
- **State synchronization**: Maintains consistent state between frontend pagination controls and backend API queries via [[concepts/redux-state|Redux client state]]

## Related Concepts

- [[concepts/tabella-page|Tabella Page]]
- [[concepts/bulk-state-update-frontend|Bulk State Update]]
- [[concepts/redux-state-slices|Redux state slices]]
- [[concepts/redux-state|Redux client state]]
- [[concepts/redux|Redux]]
- [[concepts/tabella-colonne|Table Columns]]
- [[concepts/table|Data Table]]

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]]

## Mentions in Source

- "FR-7 — Pagination consistent with the API (`page`/`limit`, default 20) *(assumption)*." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "Bulk selection scope: current page only, or "select all results matching filter" (requires backend support for filter-based bulk)?" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]