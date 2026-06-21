---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "planimetrie"
  - "floorplans array"
  - "floor plans"
---

## Description

Floorplans is an array field within the [[concepts/multimedia|multimedia]] object of the `affitto_data` collection schema, designed to store floor plan assets for rental property listings. Each floorplan item contains an `id` (integer), `caption` (string), `interactive` flag (boolean), a `url` field (typed as null), and a `urls` object with size variants (`large`, `medium`, `small`, `thumb`). The `interactive` boolean flag suggests some floorplans may support interactive viewing features such as zoomable, clickable, or navigable layouts. Floorplans are listed as a required sub-field of the [[concepts/multimedia|multimedia]] object, indicating the system tracks their presence even when the array is empty. They provide spatial layout information critical for evaluating rental properties alongside [[concepts/photo|photos]] and [[concepts/virtualtours|virtual tours]]. The structure conforms to [[concepts/json-schema|JSON Schema]] validation rules defined in the backend [[concepts/prd|PRD]].

## Key Characteristics

- **Array of objects**: Each element in the `floorplans` array is a self-contained object representing a single floor plan asset
- **Required fields per entry**: Every floorplan object must include `id`, `caption`, `interactive`, `url`, and `urls` — all five fields are mandatory per the schema
- **Field types**: `id` is an integer, `caption` is a string, `interactive` is a boolean, `url` is typed as null, and `urls` is an object with resolution-specific keys
- **Interactive flag**: A boolean field (`interactive`) indicates whether a given floor plan supports interactive viewing features (e.g., zoomable, clickable, or navigable layouts)
- **Multi-resolution URLs**: The `urls` object provides image variants at multiple resolutions — `large`, `medium`, `small`, and `thumb` — enabling responsive rendering across different device sizes and contexts
- **Nullable `url` field**: The top-level `url` field within each floorplan entry is typed as `null`, suggesting that the canonical URL is not stored at the root level but rather within the `urls` resolution-specific object
- **Required sub-field of multimedia**: Floorplans is listed as a required field within the [[concepts/multimedia|multimedia]] object, meaning the system tracks its presence even when the array is empty
- **Part of multimedia assets**: Floorplans sit alongside other media types (photos, videos, virtual tours, documents) within the [[concepts/multimedia|multimedia]] sub-object, forming a comprehensive media profile for each listing
- **Schema-validated**: The structure conforms to [[concepts/json-schema|JSON Schema]] validation rules defined in the backend PRD

## Applications

- **Property listing display**: Rendering floor plan images at appropriate resolutions on listing detail pages across web and mobile platforms
- **Interactive property exploration**: Enabling enhanced viewing experiences for floor plans marked with `interactive: true`, potentially allowing users to click on rooms, zoom into areas, or navigate between floors
- **Responsive image delivery**: Serving resolution-appropriate floor plan images (thumb for list views, large for full-screen views) to optimize bandwidth and user experience
- **Data migration and normalization**: Structuring floor plan data consistently across listings ingested from multiple sources, supporting [[concepts/data-normalization|data normalization]] processes
- **Property evaluation**: Providing spatial layout information critical for users evaluating rental properties alongside photos and virtual tours

## Related Concepts

- [[concepts/multimedia|multimedia]] — parent object containing floorplans alongside other media types; floorplans is a required sub-field
- [[concepts/json-schema|JSON Schema]] — validation standard governing the floorplans array structure
- [[concepts/properties|properties]] — the broader property data object that contains multimedia assets
- [[concepts/data-normalization|Data normalization]] — normalization rules applied to listing data including media fields
- [[concepts/caption|caption]] — string field within each floorplan entry providing descriptive text
- [[concepts/photo|photo]] — sibling media type within the multimedia object
- [[concepts/virtualtours|virtualTours]] — sibling media type providing virtual tour assets alongside floorplans
- [[concepts/prd|PRD]] — Product Requirements Document defining the floorplans schema

## Related Entities

- [[entities/affitto-data|affitto_data]] — the MongoDB collection whose schema defines the floorplans field

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"floorplans": { "type": "array", "items": { "type": "object", "required": [ "caption", "id", "interactive", "url", "urls" ]`
> - `"interactive": { "type": "boolean" }`
> - `"multimedia": { "type": "object", "required": [ "documents", "floorplans", "hasMultimedia", "hasOnlyPhotos", "photoPlan", "photos", "videos", "virtualTours" ]`