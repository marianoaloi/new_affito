---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "caption field"
  - "caption string"
  - "caption property"
---

## Description

Caption is a string field that appears in multiple places within the `affitto_data` schema, serving dual purposes at both the listing level and the media level. At the `properties` level, it functions as a brief text summary or headline for the rental listing, giving prospective tenants a quick overview of the property. Within photo objects in the [[concepts/multimedia|multimedia]] section, each photo carries its own caption providing a label or description of what the image shows. This dual usage supports both listing-level and media-level textual annotations, ensuring that human-readable descriptive text accompanies both the property record and its visual assets. The caption field is defined as a JSON `string` type across all occurrences and is a required property within photo objects alongside `id` and `urls`. Its consistent naming across different schema contexts maintains coherence throughout the data structure.

## Key Characteristics

- **Type:** Defined as a JSON `string` type across all occurrences in the schema
- **Multi-context usage:** Appears at the property listing level, within individual photo objects, within photo arrays inside the multimedia sub-object, and within floorplan objects
- **Required field in photo objects:** The caption is listed as a required property alongside `id` and `urls` within the photo object definition, indicating that every photo must carry a descriptive label
- **Human-readable purpose:** Serves as a textual descriptor intended for end-user display, providing context for listings and their visual elements
- **Consistent naming:** Uses the same field name (`caption`) across different schema contexts, maintaining naming coherence throughout the data structure

## Applications

- **Property listing headlines:** At the `properties.caption` level, the field is used to store a short headline or summary description that represents the rental listing to prospective tenants
- **Photo annotation:** Within photo objects, caption provides a text description of the image content, supporting accessibility and user understanding of property visuals
- **Floorplan labeling:** Within floorplan objects, caption describes the floor plan (e.g., identifying which floor or room layout is depicted)
- **Search and display:** Caption values can be leveraged for search indexing, listing previews, and structured display across frontend interfaces

## Related Concepts

- [[concepts/photo|photo]] — Caption is a required field within the photo object
- [[concepts/photos|photos]] — Caption appears within entries of the photos array
- [[concepts/floorplans|floorplans]] — Caption appears within floorplan objects to label plans
- [[concepts/multimedia|multimedia]] — The multimedia sub-object contains photos arrays where caption fields are present
- [[concepts/properties|properties]] — Caption exists as a property-level field providing listing descriptions
- [[concepts/json-schema|JSON Schema]] — The caption field is defined using JSON Schema string type notation

## Related Entities

- [[entities/affitto-data|affitto_data]] — The overarching data schema in which caption appears across multiple contexts

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"caption": { "type": "string" }`
> - `"photo": { "type": "object", "required": [ "caption", "id", "urls" ]`