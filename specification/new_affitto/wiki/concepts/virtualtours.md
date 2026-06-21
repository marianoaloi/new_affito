---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "tour virtuali"
  - "virtual tours array"
  - "virtualTours field"
---

## Description

`virtualTours` is a required field within the [[concepts/multimedia|multimedia]] object of the `affitto_data` collection schema, sitting alongside other required media fields such as [[concepts/photo|photos]], [[concepts/floorplans|floorplans]], videos, and documents. Each virtual tour item is an object containing an `id` (typed as `null`, suggesting the original scraping source may not always provide an identifier) and a `url` (string) pointing to the virtual tour resource. As a required member of the multimedia object, `virtualTours` must always be present in a valid document even if the array is empty. Virtual tours complement the static photo gallery and floorplan views available in the system, offering an immersive way for users to explore rental properties remotely. The field definition follows the [[concepts/json-schema|JSON Schema]] specification used throughout the affitto_data data model, and the null typing of the `id` field is consistent with the [[concepts/id-typing-validation|id typing validation]] rule (BR-6) observed across the schema.

## Key Characteristics

- **Array type**: `virtualTours` is defined as a JSON array, allowing multiple virtual tour entries per property listing
- **Required field**: `virtualTours` is a required field within the [[concepts/multimedia|multimedia]] object, meaning it must be present in every valid document
- **Object structure**: Each item in the array is an object with two required fields: `id` and `url`
- **Null-typed id**: The `id` field is typed as `null`, consistent with the [[concepts/id-typing-validation|id typing validation]] rule (BR-6) observed across the `affitto_data` schema — this suggests the original scraping source may not always provide an identifier for virtual tours
- **String-typed url**: The `url` field is a string that contains the link to the external or hosted virtual tour resource
- **Part of multimedia**: `virtualTours` sits alongside other media arrays such as [[concepts/photo|photos]], [[concepts/floorplans|floorplans]], videos, and documents within the [[concepts/multimedia|multimedia]] sub-object
- **Schema-compliant**: The field definition follows the [[concepts/json-schema|JSON Schema]] specification used throughout the affitto_data data model

## Applications

- **Remote property viewing**: Enables prospective renters to explore rental properties interactively without physical visits, reducing the need for in-person showings
- **Listing enrichment**: Enhances property listings with immersive media content, complementing static photos and floorplans
- **Data ingestion and validation**: During [[concepts/web-scraping|web scraping]] or data import processes, the `virtualTours` array structure is used to validate and store virtual tour URLs associated with scraped or aggregated listing data
- **Frontend rendering**: The [[concepts/react-and-redux-frontend|React/Redux frontend]] can consume the `virtualTours` array to embed or link virtual tour experiences within property detail pages

## Related Concepts

- [[concepts/multimedia|multimedia]] — parent object containing virtualTours as a required field
- [[concepts/photo|photo]] — sibling media type for static property images
- [[concepts/floorplans|floorplans]] — sibling media type for floor plan drawings
- [[concepts/json-schema|JSON Schema]] — schema standard used to define the virtualTours structure
- [[concepts/id-typing-validation|id typing validation]] — rule governing the null typing of the id field
- [[concepts/properties|properties]] — the broader properties object that contains multimedia data
- [[concepts/web-scraping|web scraping]] — data scraping process that populates virtualTours data

## Related Entities

- [[entities/affitto_data|affitto_data]] — the root data schema containing the multimedia object where virtualTours is defined

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"virtualTours": { "type": "array", "items": { "type": "object", "required": [ "id", "url" ], "properties": { "id": { "type": "null" }, "url": { "type": "string" } } } }`
> - `"multimedia": { "type": "object", "required": [ "documents", "floorplans", "hasMultimedia", "hasOnlyPhotos", "photoPlan", "photos", "videos", "virtualTours" ]`