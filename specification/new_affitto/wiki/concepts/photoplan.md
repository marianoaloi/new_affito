---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "photo plan"
  - "photoPlan field"
  - "photoPlan array"
---


# photoPlan

## Definition

photoPlan is an array field within the [[concepts/multimedia|multimedia]] object of the affitto_data collection schema. It represents a hybrid media type between [[concepts/photos|photos]] and [[concepts/floorplans|floorplans]] — specifically, a photographic representation of a property's layout or floor plan. Each entry in the photoPlan array is an object containing a `url` string and a `urls` object that provides size variants (large, medium, small, and thumb), though only the large-format variant is typically populated, with medium, small, and thumb typed as `null`.

## Key Characteristics

- **Array of objects**: Each element in the photoPlan array is a structured object, not a simple string or URL
- **Required fields per entry**: Every photoPlan object must contain both a `url` (string) and a `urls` (object with size variants)
- **Size variants with limited availability**: The `urls` object exposes `large`, `medium`, `small`, and `thumb` keys, but medium, small, and thumb are typed as `null`, indicating that only large-format images are typically available for photo plans
- **Hybrid media type**: Sits conceptually between standard property [[concepts/photos|photos]] and technical [[concepts/floorplans|floorplans]], combining photographic quality with layout information
- **Part of the multimedia object**: photoPlan is listed as a required field within the [[concepts/multimedia|multimedia]] object, alongside documents, floorplans, photos, videos, and [[concepts/virtualtours|virtualTours]]
- **Schema-validated**: Defined within a [[concepts/json-schema|JSON Schema]] structure as part of the affitto_data collection

## Applications

- **Property listing presentation**: Displaying photographic floor plans to prospective tenants, offering a more visually intuitive understanding of property layout compared to traditional schematic [[concepts/floorplans|floorplans]]
- **Multimedia completeness tracking**: As a required field in the [[concepts/multimedia|multimedia]] object, its presence (even as an empty array) is necessary for schema validation of listing data
- **Image asset management**: The URL structure with size variants supports potential future expansion to multi-resolution serving, even though currently only large-format images are populated
- **Web scraping data ingestion**: Photo plan data is captured during the [[concepts/web-scraping|web scraping]] process and stored as part of the standardized listing schema

## Related Concepts

- [[concepts/multimedia|multimedia]]
- [[concepts/photos|photos]]
- [[concepts/photo|photo]]
- [[concepts/floorplans|floorplans]]
- [[concepts/virtualtours|virtualTours]]
- [[concepts/caption|caption]]
- [[concepts/json-schema|JSON Schema]]
- [[concepts/web-scraping|web scraping]]

## Related Entities

- [[entities/affitto-data|affitto_data]]

## Mentions in Source

- "\"photoPlan\": { \"type\": \"array\", \"items\": { \"type\": \"object\", \"required\": [ \"url\", \"urls\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"multimedia\": { \"type\": \"object\", \"required\": [ \"documents\", \"floorplans\", \"hasMultimedia\", \"hasOnlyPhotos\", \"photoPlan\", \"photos\", \"videos\", \"virtualTours\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]