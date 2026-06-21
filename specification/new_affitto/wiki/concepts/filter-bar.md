---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [term]
aliases:
  - "Filter Bar"
  - "filter bar component"
  - "listings filter bar"
---


# Filter Bar

## Definition

The Filter Bar is a UI component located on the Tabella Page of the Affitti Frontend application. It provides filtering controls for the listings data table, enabling evaluators to narrow down displayed rental listings across three filter dimensions: **province**, **type**, and **stateMaloi**. The stateMaloi dimension includes a special "senza scelta" option that surfaces listings with no decision recorded. The Filter Bar's design and scope were resolved as part of Decision Q3 in the PRD. Its state is managed within the Redux listings slice and directly drives the API query parameters sent to the backend, making it a critical part of the data exploration interface alongside column sorting.

## Key Characteristics

- **Three filter dimensions**: Supports filtering by [[concepts/province|province]], [[concepts/type|type]], and [[concepts/statemaloi-badge-rendering|stateMaloi]], providing targeted control over the listings displayed
- **"Senza scelta" option**: The stateMaloi filter includes a dedicated option for listings where no decision has been made, corresponding to the [[concepts/senza-scelta-page|Senza Scelta]] concept
- **Redux-driven state**: Filter selections are stored in the [[concepts/redux-state-slices|Redux state slices]] (specifically the `listings` slice), ensuring consistent state management across the application
- **API query parameter integration**: Filter state is translated into query parameters (including page, filters, and sort) that are sent to the backend via RTK Query, with results cached for performance
- **Complementary to column sorting**: Works in tandem with column sorting (on Price, surfaceValue, rent) to form the primary data exploration interface for evaluators
- **Decision Q3 resolution**: The filter bar's specification was formally decided as part of the PRD's Q3 decision process

## Applications

- **Evaluator workflow**: Evaluators use the Filter Bar to quickly locate rental listings by geographic area (province), property classification (type), or evaluation status (stateMaloi)
- **Undecided listing triage**: The "senza scelta" filter option allows evaluators to isolate listings that have not yet received a decision, supporting efficient prioritization of review work
- **Combined data exploration**: When used alongside column sorting and [[concepts/pagination|pagination]], the Filter Bar enables multi-dimensional exploration of large listing datasets
- **Backend query optimization**: By translating user-selected filters into precise API query parameters, the Filter Bar ensures that only relevant data is fetched from the backend, reducing payload size and improving performance

## Related Concepts

- [[concepts/table|Table]] — the data table that the Filter Bar controls
- [[concepts/tabella-colonne|Tabella Colonne]] — column definitions for the filtered table
- [[concepts/province|Province]] — one of the three filter dimensions
- [[concepts/type|Type]] — one of the three filter dimensions
- [[concepts/statemaloi-badge-rendering|stateMaloi Badge Rendering]] — rendering of the stateMaloi filter dimension values
- [[concepts/senza-scelta-page|Senza Scelta Page]] — related to the "senza scelta" (no decision) filter option
- [[concepts/redux-state-slices|Redux State Slices]] — where filter state is stored
- [[concepts/redux-state|Redux State]] — the broader Redux store architecture
- [[concepts/redux|Redux]] — the state management framework
- [[concepts/pagination|Pagination]] — complementary table navigation control
- [[concepts/business-rules|Business Rules]] — rules governing filter behavior and valid states

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the application containing the Filter Bar component

## Mentions in Source

- "**Decision (Q3):** filter bar with `province`, `type`, and `stateMaloi` (including "senza scelta" = no decision); column sorting on Price, surfaceValue, rent." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "`listings` | query params (page, filters incl. stateMaloi, sort), cached results, request status (RTK Query cache)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]