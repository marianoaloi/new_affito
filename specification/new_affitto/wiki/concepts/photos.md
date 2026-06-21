---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "photos array"
  - "photo gallery"
  - "photos field"
---


# Photos

## Definition

Photos is an array field within the [[concepts/multimedia|multimedia]] object of the affitto_data collection schema. Each element in the photos array is an object representing a single photograph associated with a property listing, containing an identifier, a caption, an optional categorization tag, and a set of URLs providing the image at multiple resolutions. The photos array is a required component of the multimedia object, making visual data a core and mandatory part of every property listing in the system.

A separate, singular [[concepts/photo|photo]] field exists at the [[concepts/properties|properties]] level, which represents the primary or thumbnail photo for the listing, distinct from the full photos array within multimedia.

## Key Characteristics

- **Array of objects**: Photos is typed as a JSON array where each item is a structured object
- **Required sub-fields per photo**: Each photo object must include four required fields: `id` (integer), `caption` (string), `tag` (object or null), and `urls` (object)
- **Multi-resolution URLs**: The `urls` object provides the same image at multiple sizes — `large`, `medium`, `small`, and `thumb` — supporting responsive display across different contexts
- **Tag-based categorization**: The `tag` sub-object (which can be null) contains `category`, `key`, and `label` fields, enabling classification of photos by room type, feature, or other property characteristics
- **Caption support**: Each photo includes a [[concepts/caption|caption]] string field for descriptive text
- **Required within multimedia**: The photos field is listed as a required property of the [[concepts/multimedia|multimedia]] object, ensuring that every listing includes a photos array (even if empty)
- **Validated via JSON Schema**: The structure conforms to [[concepts/json-schema|JSON Schema]] validation rules defined in the PRD

## Applications

- **Property listing display**: Rendering photo galleries on listing detail pages with multiple image sizes for responsive design
- **Thumbnail generation**: Using the `thumb` URL variant for search results and list views, while reserving `large` for full-screen viewing
- **Photo categorization**: Leveraging tag metadata to organize photos by room (e.g., kitchen, bedroom) or feature (e.g., balcony, garden) for filtered browsing experiences
- **Data completeness validation**: Ensuring listings meet minimum visual content requirements by checking the photos array during ingestion via the [[concepts/web-scraping-pipeline|web-scraping-pipeline]]
- **SEO and accessibility**: Using caption text for alt attributes and image descriptions

## Related Concepts

- [[concepts/multimedia|multimedia]] — parent object that contains the photos array
- [[concepts/photo|photo]] — singular photo object at the properties level representing the primary/thumbnail image
- [[concepts/caption|caption]] — string field within each photo element providing descriptive text
- [[concepts/floorplans|floorplans]] — sibling array within multimedia for floor plan images
- [[concepts/virtualtours|virtualtours]] — sibling array within multimedia for virtual tour data
- [[concepts/properties|properties]] — top-level object containing listing data including the singular photo field
- [[concepts/json-schema|JSON Schema]] — validation standard used to define the photos structure

## Related Entities

- [[entities/affitto_data]] — the MongoDB collection whose schema defines the photos array within multimedia

## Mentions in Source

- `"photos": { "type": "array", "items": { "type": "object", "required": [ "caption", "id", "tag", "urls" ]` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- `"multimedia": { "type": "object", "required": [ "documents", "floorplans", "hasMultimedia", "hasOnlyPhotos", "photoPlan", "photos", "videos", "virtualTours" ]` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]