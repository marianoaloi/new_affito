---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "buildingPerformance object"
  - "energy building performance"
  - "prestazioni edificio"
---

## Basic Information

- **Type:** concept
- **Subtype:** term
- **Sources:** [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]

## Definition

`buildingPerformance` is a sub-object within the [[concepts/energy|energy]] section of the [[entities/affitto_data|affitto_data]] schema that captures a property's **seasonal energy performance ratings**. It provides a structured breakdown of a building's energy efficiency across summer and winter seasons, complementing the overall energy class and EPI (Energy Performance Index) values stored in the parent energy object. The data is scraped from real estate listings and stored for analysis within the Affitti system.

## Description

`buildingPerformance` is a nested object within the [[concepts/energy|energy]] object of the [[entities/affitto_data|affitto_data]] collection schema. It contains two required fields — `summer` (which accepts a string or null) and `winter` (strictly a string) — providing seasonal granularity beyond the single overall energy class rating. This seasonal performance data, combined with the energy class (color and name), EPI values, and heating type information stored in the parent [[concepts/energy|energy]] object, provides a comprehensive energy profile of each rental property. Building performance data is particularly important for tenants evaluating energy costs and environmental impact of potential rentals in the Udine region. The values are extracted via [[concepts/web-scraping|web scraping]] from real estate listing platforms and stored as-is, though the nullable summer field indicates that summer performance data may not always be available from scraped listings.

## Key Characteristics

- **Nested structure**: Exists as a child object within the [[concepts/energy|energy]] object, which itself is part of the [[entities/affitto_data|affitto_data]] collection schema
- **Two required fields**: Contains exactly two properties — `summer` and `winter` — both of which are required
- **Nullable summer value**: The `summer` field accepts either a `string` or `null`, indicating that summer performance data may not always be available from scraped listings
- **Non-nullable winter value**: The `winter` field is strictly typed as `string` and must always contain a value
- **Seasonal granularity**: Provides season-level energy performance detail beyond the single overall energy class rating
- **Scraped origin**: Values are extracted via [[concepts/web-scraping|web scraping]] from real estate listing platforms and stored as-is
- **Part of comprehensive energy profile**: Works alongside energy class, EPI values, emission, thermal insulation, and heating type data to form a complete energy characterization of a property

## Applications

- **Energy efficiency analysis**: Enables comparison of seasonal energy performance across properties in the rental market, supporting the [[concepts/feature-analysis|feature analysis]] view
- **Data aggregation**: Seasonal performance data can feed into [[concepts/data-aggregation|data aggregation]] pipelines to compute averages or distributions by geography or property type
- **Listing enrichment**: Adds granularity to energy certification data displayed or processed within the Affitti system, complementing the energy class name, color, and EPI fields
- **Filtering and search**: Can be used as criteria for filtering properties by seasonal energy performance in conjunction with [[concepts/province-filter|province filtering]] or other geographic filters
- **Tenant decision support**: Helps tenants evaluate energy costs and environmental impact of potential rentals in the Udine region

## Related Concepts

- [[concepts/energy|energy]] — Parent object that contains `buildingPerformance` alongside energy class, EPI, emission, thermal insulation, and heating type data
- [[concepts/web-scraping|web scraping]] — The mechanism through which building performance data is extracted from listing sources
- [[concepts/data-aggregation|data aggregation]] — Pipeline processes that may consume seasonal performance data for analysis
- [[concepts/feature-analysis|feature analysis]] — Analysis views that may leverage seasonal energy performance metrics
- [[concepts/province-filter|province filter]] — Geographic filtering that can be combined with seasonal energy performance criteria
- [[concepts/json-schema|JSON Schema]] — The schema standard used to define the `buildingPerformance` object structure
- [[concepts/properties|properties]] — The broader properties object within which the energy section and buildingPerformance reside

## Related Entities

- [[entities/affitto_data|affitto_data]] — The collection whose schema defines the `buildingPerformance` sub-object within the energy section
- [[entities/affitti-backend|Affitti Backend API]] — The backend service that processes and exposes building performance data
- [[entities/mongodb-atlas|MongoDB Atlas]] — The database platform where the `buildingPerformance` data is persisted

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"buildingPerformance": { "type": "object", "required": [ "summer", "winter" ], "properties": { "summer": { "type": [ "string", "null" ] }, "winter": { "type": "string" } } }`
> - `"energy": { "type": "object", "required": [ "emission", "thermalInsulation", "zeroEnergyBuilding" ]`