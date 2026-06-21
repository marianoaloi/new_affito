---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "macrozona"
  - "macrozone field"
  - "macrozoneId"
---


# Macrozone

## Definition
Macrozone is a field within the location object of the affitto_data schema, typed as either `string` or `null`. It represents a larger geographic subdivision within a city or region, used for categorizing property locations at a broader level than [[concepts/microzone|microzone]]. The accompanying `macrozoneId` field (typed as `integer` or `null`) provides a unique numeric identifier for database-level references and lookups.

## Key Characteristics
- **Nullable string type**: The macrozone field accepts either a string value (the name of the geographic area) or `null` when the information is unavailable
- **Paired with numeric identifier**: The `macrozoneId` field provides an integer identifier corresponding to the macrozone name, enabling efficient database joins and filtering
- **Hierarchical geographic level**: Sits between city/province-level geography and the finer-grained [[concepts/microzone|microzone]], enabling multi-level geographic drill-down
- **Part of location object**: Embedded within the location sub-object of the affitto_data schema alongside other geographic fields such as province, city, and microzone
- **Supports aggregation**: Enables grouping and statistical analysis of rental listings by broader geographic areas within a city

## Applications
- **Geographic filtering**: Users can filter rental listings by macrozone to narrow results to a broad area of interest within a city, before optionally refining further by [[concepts/microzone|microzone]]
- **Data aggregation and analytics**: Rental market statistics (average prices, availability counts) can be aggregated at the macrozone level to provide area-level market insights
- **Hierarchical navigation**: Combined with [[concepts/province-filter|province filtering]] and microzone data, macrozone enables a multi-tier geographic navigation structure (province → city → macrozone → microzone)
- **Database referencing**: The `macrozoneId` integer field allows efficient lookups, joins, and indexing in [[concepts/data-aggregation|data aggregation pipelines]]

## Related Concepts
- [[concepts/microzone|microzone]] — finer-grained geographic subdivision that complements macrozone in the location hierarchy
- [[concepts/province-filter|province-filter]] — higher-level geographic filtering by province
- [[concepts/json-schema|json-schema]] — the schema standard used to define the macrozone field's type constraints
- [[concepts/properties|properties]] — the broader properties object within which location (and thus macrozone) is defined
- [[concepts/data-aggregation|data-aggregation]] — aggregation pipelines that can leverage macrozone for geographic grouping

## Related Entities
- [[entities/affitto_data|affitto_data]] — the rental data schema that contains the macrozone field within its location object

## Mentions in Source
- "\"macrozone\": { \"type\": [ \"string\", \"null\" ] }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"macrozoneId\": { \"type\": [ \"integer\", \"null\" ] }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]