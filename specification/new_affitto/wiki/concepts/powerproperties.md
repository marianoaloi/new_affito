---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "powerproperties field"
  - "powerproperties property"
  - "powerproperties"
---


# powerproperties

## Definition
`powerproperties` is a field within documents of the `affito` collection that contains detailed property information, including nested location data such as province. In the [[concepts/analisi|Analisi feature]] aggregation pipeline, `powerproperties` serves a dual role: it acts as a filter criterion (ensuring documents have valid location data) and as a data transformation source, where it is remapped to `realEstate.properties` in the projection stage. This renaming represents a data normalization step between the internal database schema and the external API response format.

## Key Characteristics
- **Nested structure**: Contains hierarchical data including `location.province` sub-fields, indicating a deeply nested document structure for property information
- **Filter criterion**: Used with MongoDB's `$exists` operator to ensure only documents with valid province location data are included in query results
- **Schema remapping**: Renamed from `powerproperties` (database field name) to `realEstate.properties` (API output field name) during the projection stage of the aggregation pipeline
- **Data normalization role**: The field bridging between the raw scraped/stored data schema and the clean API response format, suggesting `powerproperties` originates from an external data source (likely a [[concepts/web-scraping-pipeline|web scraping pipeline]])
- **Collection-level field**: Exists at the document level within the `affito` collection, grouping all property-related details under a single namespace

## Applications
- **Aggregation filtering**: Ensures data quality in the [[concepts/analisi|Analisi feature]] by filtering out documents that lack province information (`powerproperties.location.province` must exist)
- **API response construction**: Projected as `realEstate.properties` in the output, providing a standardized property data structure for frontend consumption
- **Location-based analysis**: The nested `location.province` data enables geographic filtering and aggregation of rental listings
- **Data pipeline transformation**: Serves as the canonical internal representation of property data that gets normalized before being exposed through the API layer

## Related Concepts
- [[concepts/analisi|Analisi feature]] — the aggregation pipeline that filters and transforms `powerproperties`
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — likely origin of the `powerproperties` data structure
- [[concepts/function|Firebase Cloud Functions]] — the runtime environment where the aggregation pipeline executes
- [[concepts/$in-operator|$in query operator]] — MongoDB operator used alongside `powerproperties` filters
- [[concepts/prende-affitti|Get Rentals]] — related feature that retrieves rental data from the same collection
- [[concepts/data-normalization|data-normalization]] — the broader pattern of remapping database fields to API output fields

## Related Entities
- [[entities/affito|affito]] — the MongoDB collection containing documents with the `powerproperties` field

## Mentions in Source
- `"powerproperties.location.province": { $exists: true }` — [[sources/function_64f05b]]
- `"realEstate": { "properties": "$powerproperties", "title": 1, "price": 1 }` — [[sources/function_64f05b]]