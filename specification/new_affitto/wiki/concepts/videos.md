---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "videos array"
  - "video listings"
  - "videos field"
---


# Videos

## Definition
Videos is an array field within the [[concepts/multimedia|multimedia]] object of the affitto_data collection schema. Each element in the array is a simple object containing an integer `id` and a string `url`. Videos provide visual walkthrough content for rental property listings, supplementing static photo galleries and virtual tours. They are part of the multimedia content scraped from the real estate source website and stored in the NoSQL database.

## Key Characteristics
- **Array structure**: Defined as a JSON Schema array, where each item is an object with two required fields: `id` (integer) and `url` (string)
- **Part of the multimedia object**: Videos is one of the required fields within the [[concepts/multimedia|multimedia]] sub-object, alongside [[concepts/photos|photos]], [[concepts/floorplans|floorplans]], [[concepts/virtualtours|virtualTours]], [[concepts/documents|documents]], and [[concepts/photoplan|photoPlan]]
- **Simple schema**: Unlike the more complex [[concepts/photo|photo]] objects (which include fields like [[concepts/caption|caption]]), video entries are minimal — consisting only of an identifier and a URL reference
- **Scraped content**: Video data is collected as part of the [[concepts/web-scraping-pipeline|web scraping pipeline]] from the source real estate website
- **Complementary media type**: Videos complement static imagery ([[concepts/photos|photos]], [[concepts/floorplans|floorplans]]) and interactive media ([[concepts/virtualtours|virtualTours]]) to provide a richer property presentation

## Applications
- **Property walkthroughs**: Providing prospective tenants with video tours of rental properties, offering a more immersive view than static photos alone
- **Listing enrichment**: Enhancing rental listing pages (e.g., on the [[concepts/tabella-page|Table Page]] or detail views) with embedded video content sourced from the original real estate platform
- **Data completeness tracking**: Used alongside the `hasMultimedia` and `hasOnlyPhotos` flags in the [[concepts/multimedia|multimedia]] object to determine the richness of a listing's media content
- **Multimedia analysis**: Aggregating video availability across listings as part of [[concepts/data-aggregation|data aggregation]] workflows to assess data quality

## Related Concepts
- [[concepts/multimedia|multimedia]]
- [[concepts/photos|photos]]
- [[concepts/photo|photo]]
- [[concepts/virtualtours|virtualTours]]
- [[concepts/floorplans|floorplans]]
- [[concepts/documents|documents]]
- [[concepts/photoplan|photoPlan]]
- [[concepts/caption|caption]]
- [[concepts/web-scraping-pipeline|web scraping pipeline]]
- [[concepts/json-schema|JSON Schema]]

## Related Entities
- [[entities/affitto-data|affitto_data]]

## Mentions in Source
- "\"videos\": { \"type\": \"array\", \"items\": { \"type\": \"object\", \"required\": [ \"id\", \"url\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"multimedia\": { \"type\": \"object\", \"required\": [ \"documents\", \"floorplans\", \"hasMultimedia\", \"hasOnlyPhotos\", \"photoPlan\", \"photos\", \"videos\", \"virtualTours\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]