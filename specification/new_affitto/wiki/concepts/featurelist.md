---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "featureList object"
  - "feature list"
  - "featureList"
---

## Definition

featureList is a nested object within the feature schema of the affitiudine rental property system. It serves as a quick-reference summary structure containing standardized property characteristics — all stored as simple string values. Unlike the more complex typed values found in [[concepts/primaryfeatures|primaryFeatures]], featureList flattens key property attributes into a uniform string-based representation, optimizing for fast lookups and simplified querying. The object appears both embedded within the feature sub-document of the [[entities/affitto_data|affitto_data]] collection and as part of the standalone [[entities/feature|feature]] collection.

## Description

featureList is a schema-level object that groups the most commonly referenced rental property characteristics into a single, uniformly typed structure. All ten fields — `balcony`, `basement`, `bathrooms`, `elevator`, `floor`, `furniture`, `rooms`, `saleDate`, `surface`, and `terrace` — are typed as strings, meaning they contain human-readable values rather than structured numeric data. This design choice simplifies display rendering and text-based filtering, since no type conversion or formatting logic is needed at the presentation layer. The structure is intentionally denormalized: it mirrors a subset of the information available through [[concepts/primaryfeatures|primaryFeatures]] but trades richness for uniformity. featureList appears in two locations following the [[concepts/split-collection-architecture|Split-collection pattern]] — nested under the `feature` object in [[entities/affitto_data|affitto_data]] and in the standalone [[entities/feature|feature]] collection. None of the ten fields are required, allowing documents to contain any subset depending on data availability for a given listing.

## Key Characteristics

- **Flat string-only schema**: All ten properties (`balcony`, `basement`, `bathrooms`, `elevator`, `floor`, `furniture`, `rooms`, `saleDate`, `surface`, `terrace`) are typed as `string`, regardless of whether the underlying data is logically numeric or boolean
- **No required fields**: The schema declares an empty `required` array, meaning every property is optional — documents may contain any subset of the ten fields
- **Nested object type**: featureList is itself typed as `"object"` and lives one level below the parent `feature` document
- **Dual location**: Appears both inside the [[entities/affitto_data|affitto_data]] collection (nested under the `feature` object) and in the standalone [[entities/feature|feature]] collection, following the [[concepts/split-collection-architecture|Split-collection pattern]]
- **Simplified complement to primaryFeatures**: While [[concepts/primaryfeatures|primaryFeatures]] stores richer, typed representations of property attributes, featureList provides a denormalized, string-uniform alternative optimized for display and filtering
- **Ten standardized attributes**: Covers the most commonly queried rental property characteristics — structural (floor, surface, rooms, bathrooms), amenity (balcony, terrace, elevator, furniture, basement), and temporal (saleDate)

## Applications

- **Quick-reference property cards**: featureList provides a ready-made set of display-friendly string values for rendering property summary cards in the UI without requiring type conversion or formatting logic
- **Simplified search and filtering**: Because all values are strings, frontend filters and text-based search can operate uniformly across all featureList fields
- **Data normalization pipeline**: During the [[concepts/data-normalization|data normalization]] process (BR-4), raw property data is standardized into the featureList structure alongside the more detailed [[concepts/primaryfeatures|primaryFeatures]]
- **Feature analysis view**: The [[concepts/feature-analysis|feature analysis view]] (FR-7) can leverage featureList for quick aggregation and statistical summaries of property characteristics
- **DTO construction**: When building [[concepts/slim-dto|slim DTOs]] for API responses, featureList fields can be directly mapped without additional transformation

## Related Concepts

- [[concepts/primaryfeatures|primaryFeatures]] — the more complex, typed counterpart within the same feature schema
- [[concepts/statemaloi|stateMaloi]] — enum field also present in the feature/affitto_data documents
- [[concepts/split-collection-architecture|Split-collection pattern]] — architectural pattern explaining why featureList appears in multiple collections
- [[concepts/data-normalization|Data normalization]] — the process that populates and standardizes featureList values
- [[concepts/slim-dto|slim DTO]] — data transfer pattern that may draw from featureList fields
- [[concepts/feature-analysis|Feature analysis view]] — analysis functionality that consumes featureList data
- [[concepts/floor|floor]] — related property attribute that overlaps with the featureList `floor` string field

## Related Entities

- [[entities/affitto_data|affitto_data]] — primary collection where featureList is embedded under the feature object
- [[entities/feature|feature]] — standalone collection that also contains the featureList structure
- [[entities/affitiudine|affitiudine]] — the Firebase project housing the system
- [[entities/udine|udine]] — the MongoDB database containing the relevant collections
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that reads and writes featureList data

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"featureList": { "type": "object", "required": [], "properties": { "balcony": { "type": "string" }, "basement": { "type": "string" }, "bathrooms": { "type": "string" }, "elevator": { "type": "string" }, "floor": { "type": "string" }, "furniture": { "type": "string" }, "rooms": { "type": "string" }, "saleDate": { "type": "string" }, "surface": { "type": "string" }, "terrace": { "type": "string" } } }`
> - `"featureList": { "type": "object", "required": [], "properties": { "balcony": { "type": "string" }, "basement": { "type": "string" }, "bathrooms": { "type": "string" }`