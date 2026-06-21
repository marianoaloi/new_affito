---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "nation object"
  - "nazione"
  - "nation sub-object"
---


# Nation

## Definition

Nation is a required sub-object within the `location` object of the [[concepts/json-schema|JSON Schema]] used in the affitto_data schema. It represents the country where a rental property is located, structured as a JSON object containing three required string fields: `id` (a unique identifier), `keyurl` (a URL-friendly key used for routing and navigation), and `name` (the human-readable country name). In the context of the Udine-focused rental system, the nation value would consistently correspond to Italy, though the schema is designed to support multi-country scenarios inherited from the original [[concepts/web-scraping-pipeline|web scraping pipeline]] source.

## Key Characteristics

- **Required object**: Nation is mandatory within the `location` object — it cannot be omitted from any valid property listing record
- **Three required string fields**: The object must always contain `id`, `keyurl`, and `name`, all of type string
- **URL-friendly key**: The `keyurl` field provides a slugified version of the country name, suitable for URL routing and deep linking
- **Unique identifier**: The `id` field allows programmatic referencing of the country independent of display name or URL key
- **Inherited from scraping source**: The structure mirrors the data format from the original external property listing platform that was scraped
- **Part of a nested geographic hierarchy**: Nation sits at the top level of a geographic hierarchy within the `location` object, which also includes region, province, city, locality, [[concepts/macrozone|macrozone]], and [[concepts/microzone|microzone]]

## Applications

- **Geographic classification**: Categorizing rental properties by country within the data storage layer
- **URL routing**: Using the `keyurl` field to construct SEO-friendly and human-readable URLs for property pages filtered by country
- **Data validation**: Ensuring that every property record includes complete country information during ingestion from the scraping pipeline
- **Multi-country extensibility**: Although the current system focuses on [[entities/udine|Udine]], the nation object allows the schema to accommodate properties from multiple countries without structural changes
- **Filtering and querying**: Enabling [[concepts/province-filter|geographic filtering]] at the country level in [[concepts/data-aggregation|aggregation pipelines]]

## Related Concepts

- [[concepts/macrozone|macrozone]] — sibling geographic subdivision within the location object
- [[concepts/microzone|microzone]] — finer-grained geographic subdivision within the location object
- [[concepts/json-schema|JSON Schema]] — the validation standard used to define the affitto_data structure
- [[concepts/marker|marker]] — map marker field within the same location object
- [[concepts/province-filter|province-filter]] — geographic filtering mechanism at the province level
- [[concepts/properties|properties]] — the broader properties object that contains location data
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the data ingestion process that populates nation values

## Related Entities

- [[entities/affitto_data|affitto_data]] — the parent data schema containing the location object where nation is defined
- [[entities/udine|Udine]] — the primary geographic focus of the system, located within the Italy nation

## Mentions in Source

- `"nation": { "type": "object", "required": [ "id", "keyurl", "name" ]` — [[sources/prd-new-affitto-backend_86705a|PRD Affitto Internal Rental System]]
- `"location": { "type": "object", "required": [ "address", "city", "cityId", "latitude", "locality", "longitude", "macrozone", "macrozoneId", "marker", "microzone", "nation", "province", "provinceId", "region", "streetNumber", "zoom" ]` — [[sources/prd-new-affitto-backend_86705a|PRD Affitto Internal Rental System]]