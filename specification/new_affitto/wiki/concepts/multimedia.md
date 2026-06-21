---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "multimedia object"
  - "multimedia sub-object"
  - "listing media assets"
---

## Definition

The multimedia object is a required sub-object within the [[concepts/properties|properties]] field of each [[entities/affitto_data|affitto_data]] document. It serves as the comprehensive container for all media assets associated with a rental listing, including photographs, floorplans, documents, videos, virtual tours, and photo plans. The structure was preserved from the original scraped real estate listing data and provides a rich, multi-format media representation for each property.

## Key Characteristics

- **Required field**: Multimedia is one of the two required sub-objects (alongside [[concepts/location|location]]) within the [[concepts/properties|properties]] field of an [[entities/affitto_data|affitto_data]] document
- **Eight required sub-fields**: The object must contain `documents`, `floorplans`, `hasMultimedia`, `hasOnlyPhotos`, `photoPlan`, `photos`, `videos`, and `virtualTours`
- **Boolean flags**: Includes `hasMultimedia` (indicates whether any media assets exist) and `hasOnlyPhotos` (indicates whether photos are the sole media type present)
- **Photo structure**: Each photo entry contains an `id`, `caption`, an optional `tag` object (with `category`, `key`, and `label` fields), and a `urls` object providing image variants at `large`, `medium`, `small`, and `thumb` resolutions
- **Floorplan features**: Floorplan entries include an `interactive` boolean flag, distinguishing static floorplan images from interactive/navigable ones, along with sized URL variants
- **Document metadata**: Each document entry includes `format`, `title`, `type`, and `url` fields, enabling categorization and retrieval of supplementary listing documents
- **Video and virtual tour structure**: Both `videos` and `virtualTours` entries contain an `id` and a `url`, providing simple referencing and linking to external or embedded media experiences
- **Multiple media arrays**: Supports parallel arrays for different media types (`photos`, `floorplans`, `documents`, `videos`, `virtualTours`, `photoPlan`), allowing flexible and extensible media attachment
- **Preserved from source data**: The structure mirrors the original scraped real estate listing data, maintaining fidelity to the upstream data source

## Applications

- **Rental listing display**: Powers the media gallery in the frontend application, providing appropriately sized image variants (large for detail views, thumbnails for grid layouts) via the multi-resolution URL scheme
- **Media filtering and categorization**: The `tag` system on photos (with `category`, `key`, `label`) enables filtering images by room type, feature, or other classification criteria
- **Interactive floorplan rendering**: The `interactive` flag on floorplans allows the UI to differentiate between static images and interactive floor plan viewers
- **Document management**: Supports attachment and retrieval of supplementary documents (e.g., PDFs, energy certificates) associated with a listing
- **Data completeness validation**: The `hasMultimedia` and `hasOnlyPhotos` boolean flags enable quick assessment of media richness without iterating through all arrays, useful for search result ranking or listing quality scoring
- **Virtual tour integration**: The `virtualTours` array supports linking to external or embedded 360° virtual tour experiences for properties

## Related Concepts

- [[concepts/properties|properties]] — The parent object within which multimedia is a required sub-object
- [[concepts/location|location]] — The other required sub-object alongside multimedia within the properties field
- [[concepts/realestatepage|realestatepage]] — The real estate page object that provides listing metadata closely associated with multimedia content
- [[concepts/featurelist|featureList]] — Another sub-object within properties that describes listing features
- [[concepts/data-normalization|Data normalization]] — Normalization rules that may apply to multimedia field values during ingestion
- [[concepts/json-schema|JSON Schema]] — The schema standard used to define the multimedia object structure

## Related Entities

- [[entities/affitto_data|affitto_data]] — The parent collection whose documents contain the multimedia object as a required sub-object
- [[entities/affitti-backend|Affitti Backend API]] — The backend service that exposes and manages multimedia data through its API layer
- [[entities/mongodb-atlas|MongoDB Atlas]] — The database platform where multimedia-containing documents are stored

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - "\"required\": [ \"location\", \"multimedia\" ]"
> - "\"multimedia\": { \"type\": \"object\", \"required\": [ \"documents\", \"floorplans\", \"hasMultimedia\", \"hasOnlyPhotos\", \"photoPlan\", \"photos\", \"videos\", \"virtualTours\" ]"

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|prd_affitti_backend_v0-3_1d90fc]]**
> - "\"multimedia\": { \"type\": \"object\", \"required\": [ \"documents\", \"floorplans\", \"hasMultimedia\", \"hasOnlyPhotos\", \"photoPlan\", \"photos\", \"videos\", \"virtualTours\" ]"