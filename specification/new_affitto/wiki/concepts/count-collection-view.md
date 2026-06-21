---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "count view"
  - "count collection view"
  - "vista count"
---


# Count Collection View

## Definition
The count collection view is a MongoDB collection view used in the Affitti rental system to store pre-aggregated statistics about rental listings. It serves as a materialized aggregation layer that groups rental data by province and property type, providing summary counts and accessibility metrics. This view is consumed primarily by the [[concepts/contattore|Contattore]] feature to display summary statistics to users.

## Key Characteristics
- **Compound `_id` field**: Uses a composite identifier containing `province` (e.g., "Udine") and `type` (e.g., `"a"` for apartments, `"c"` for other property types) to group aggregated data
- **Pre-aggregated statistics**: Stores pre-computed counts rather than calculating them on the fly, improving query performance for dashboard and summary views
- **MongoDB collection view**: Implemented as a MongoDB view, meaning it is a read-only, queryable representation of aggregated data from the underlying rental listings collection
- **Comprehensive metric fields**: Includes the following statistical fields:
  - `total` — total number of listings in the group
  - `disable` — count of listings with disability accessibility information
  - `nodisable` — count of listings without disability accessibility data
  - `elevator` — count of listings with elevator access
  - `noElevator` — count of listings without elevator access
  - `deny` — count of denied listings
  - `wait` — count of listings in waiting status
  - `accept` — count of accepted listings
  - `emptydisable` — count of listings with empty disability field
  - [[concepts/emptychoise|emptyChoise]] — count of listings with empty choice field
  - `emptyElevator` — count of listings with empty elevator field
- **Property type codes**: Uses single-character codes for property classification (`"a"` for apartments, `"c"` for other property categories)

## Applications
- **Contattore dashboard**: The primary consumer of this view is the [[concepts/contattore|Contattore]] feature, which displays aggregated summary statistics about rental listings by province and type
- **Accessibility tracking**: Enables the [[concepts/elevator-accessibility-tracking|elevator and accessibility tracking]] system by pre-aggregating disability access and elevator metrics across provinces
- **Administrative reporting**: Provides quick access to listing status distribution (accepted, denied, waiting) without requiring real-time aggregation queries
- **Unauthenticated statistics**: May feed into the [[concepts/count-without-autentication|Count Without Authentication]] feature, allowing certain aggregated counts to be displayed without user login

## Related Concepts
- [[concepts/contattore|Contattore]] — the feature that consumes data from this view to display summary statistics
- [[concepts/elevator-accessibility-tracking|Elevator Accessibility Tracking]] — related tracking fields for elevator and disability access metrics
- [[concepts/emptychoise|emptyChoise]] — one of the statistical fields tracked in this view
- [[concepts/tabella-page|Tabella Page]] — table page that may display data related to these aggregated statistics
- [[concepts/analisi-page|Analysis Page]] — analysis page that may leverage aggregated count data
- [[concepts/business-rules|Business Rules]] — business logic that governs how listings are categorized and counted
- [[concepts/data-aggregation|Data Aggregation]] — the general concept of pre-computing summary data

## Related Entities
- [[entities/count|count]] — the underlying collection/entity associated with this view

## Mentions in Source
- "Deve presentare il totale che ha nel database per la collection view 'count' giù il dati ritornati" _(It must display the total from the database for the collection view "count" along with the returned data)_ — [[sources/function_64f05b|function_64f05b]]
- `"_id": { "province": "Udine", "type": "a" }` — [[sources/function_64f05b|function_64f05b]]