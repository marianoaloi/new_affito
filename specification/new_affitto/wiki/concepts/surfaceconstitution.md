---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "surfaceConstitution object"
  - "surface constitution elements"
  - "composizione superfici"
---

## Description

surfaceConstitution is a sub-object defined within the [[concepts/properties|properties]] field of the [[entities/affitto_data|affitto_data]] document schema. It is declared as a `type: "object"` with a required `surfaceConstitutionElements` array, ensuring every instance contains at least the element breakdown. Each element in the array specifies commercialSurface, constitution type, constitutionKey, percentage, raw surface, surfaceType, and optionally floor information. The object also provides `totalCommercialSurface` and `totalMainSurface` as precomputed aggregate values for quick access without iterating through individual elements. This detailed surface breakdown helps in evaluating the actual usable space versus total listed area of rental properties, supporting both granular property analysis and efficient querying across listings.

## Key Characteristics

- **Nested object structure**: Defined as a `type: "object"` within the broader [[concepts/properties|properties]] field of the [[entities/affitto_data|affitto_data]] document schema
- **Required field**: The `surfaceConstitutionElements` array is marked as required within the object, ensuring every surfaceConstitution instance contains at least the element breakdown
- **surfaceConstitutionElements array**: Each element in the array specifies:
  - **Constitution type** — the category of the surface (e.g., main area, balcony, terrace)
  - **constitutionKey** — a key identifier for the constitution type
  - **Surface area** — the raw measured area of that element
  - **Commercial surface** — the weighted or commercially recognized area
  - **Percentage** — the proportional weight of that element relative to the total
  - **Floor** — the floor level on which the surface element is located (optional)
  - **Surface type** — additional classification of the surface
- **Aggregate fields**: Includes `totalCommercialSurface` and `totalMainSurface` as precomputed summary values for quick access without iterating through individual elements
- **Supports granular property analysis**: Enables detailed comparison and evaluation of how different functional areas contribute to the overall property size, including assessment of actual usable space versus total listed area

## Applications

- **Rental property valuation**: Evaluators can use the commercial surface breakdown to assess the effective usable area and its impact on rental pricing
- **Feature analysis views**: Powers the [[concepts/feature-analysis|Feature analysis view]] by providing structured surface data that can be compared across listings
- **Data normalization**: Surface constitution data feeds into [[concepts/data-normalization|Data normalization]] processes to standardize area representations across different source formats
- **Listing comparison**: Enables side-by-side comparison of properties based on their surface distribution (e.g., percentage of main living space vs. ancillary areas)
- **Aggregate reporting**: The precomputed `totalCommercialSurface` and `totalMainSurface` fields support efficient querying and reporting without requiring runtime aggregation

## Related Concepts

- [[concepts/properties|properties]] — parent field within which surfaceConstitution is defined as a sub-object
- [[concepts/featurelist|featureList]] — sibling nested object within the same schema describing property features
- [[concepts/primaryfeatures|primaryFeatures object]] — another structured property descriptor within the listing schema
- [[concepts/energy|energy object]] — nested object for energy classification, following a similar sub-object pattern
- [[concepts/location|location object]] — nested object for property geolocation data
- [[concepts/data-normalization|Data normalization]] — normalization rules applied to surface data during ingestion
- [[concepts/feature-analysis|Feature analysis view]] — UI view that leverages surface constitution data for analysis
- [[concepts/slim-dto|DTO]] — surface constitution fields may be included or excluded depending on the DTO projection
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define the surfaceConstitution object structure

## Related Entities

- [[entities/affitto_data|affitto_data]] — the parent collection containing surfaceConstitution as a nested object
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that serves and processes surfaceConstitution data
- [[entities/mongodb-atlas|MongoDB Atlas Cloud]] — the database platform where the affitto_data collection is hosted
- [[entities/udine|udine database]] — the MongoDB database instance containing the collection

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"surfaceConstitution": { "type": "object", "required": [ "surfaceConstitutionElements" ], "properties": { "surfaceConstitutionElements": { "type": "array",`
> - `"surfaceConstitution": { "type": "object", "required": [ "surfaceConstitutionElements" ]`