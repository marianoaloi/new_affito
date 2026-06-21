---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "microzona"
  - "microzone field"
  - "microzone property"
---


# Microzone

## Definition

Microzone is a field within the `location` object of the affitto_data schema, typed as either `string` or `null`. It represents a fine-grained geographic subdivision within a city, more specific than [[concepts/macrozone|macrozone]]. Microzones are commonly used in Italian real estate to define neighborhood-level pricing and characteristic zones, enabling detailed geographic analysis and filtering of rental properties at the sub-city level.

## Key Characteristics

- **Data type**: Accepts either a `string` value or `null`, indicating the microzone may not always be available or applicable for every listing
- **Geographic granularity**: Represents the most fine-grained geographic subdivision in the location hierarchy, sitting below [[concepts/macrozone|macrozone]] and city-level classifications
- **Part of the location object**: Nested within the `location` object alongside fields such as `address`, `city`, `macrozone`, `province`, `region`, and geographic coordinates (`latitude`, `longitude`)
- **Not a required unique identifier**: Unlike `macrozoneId`, there is no corresponding `microzoneId` field in the schema, suggesting microzones are stored as descriptive labels rather than as indexed references
- **Italian real estate convention**: Aligns with how Italian property markets and valuation bodies (such as the Osservatorio del Mercato Immobiliare) partition cities into pricing and characteristic zones

## Applications

- **Neighborhood-level rental analysis**: Enables aggregation and comparison of rental prices and property characteristics at a granular sub-city level, supporting the system's [[concepts/data-aggregation|data aggregation]] pipeline
- **Geographic filtering**: Allows users to filter rental listings by specific neighborhoods or micro-areas within a city, complementing broader filters like [[concepts/province-filter|province filter]] and macrozone
- **Market segmentation**: Supports decision-making features such as [[concepts/acceptdenywait|accept/deny/wait]] classification by providing location context that reflects real neighborhood-level market dynamics
- **Map-based visualization**: Works in conjunction with [[concepts/marker|marker]] and coordinate data to support geographic display on the [[concepts/mappa-page|Map Page]]

## Related Concepts

- [[concepts/macrozone|macrozone]] — the coarser geographic subdivision that microzone refines
- [[concepts/marker|marker]] — map marker string used alongside microzone for geographic visualization
- [[concepts/province-filter|province filter]] — broader geographic filtering mechanism
- [[concepts/data-aggregation|data aggregation]] — aggregation pipeline that can leverage microzone for sub-city grouping
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define the microzone field
- [[concepts/properties|properties]] — the properties object containing listing details associated with each location

## Related Entities

- [[entities/affitto_data|affitto_data]] — the parent data schema containing the location object where microzone is defined

## Mentions in Source

- `"microzone": { "type": [ "string", "null" ] }` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- `"location": { "type": "object", "required": [ "address", "city", "cityId", "latitude", "locality", "longitude", "macrozone", "macrozoneId", "marker", "microzone", "nation", "province", "provinceId", "region", "streetNumber", "zoom" ]` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]