---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "documents array"
  - "multimedia documents"
  - "documents field"
---


# Documents

## Definition
Documents is a sub-array within the [[concepts/multimedia|multimedia]] object of the affitto_data collection schema. It represents a collection of downloadable or viewable files associated with a real estate listing, such as PDFs or other attachment types. Each document entry is a structured object containing metadata about the file, including its format, identifier, title, type, and URL, with an optional length field. Documents serve as supplementary material for rental property evaluation, complementing other multimedia assets like photos, floorplans, videos, and virtual tours.

## Key Characteristics
- **Array of objects**: Documents is typed as a JSON array where each item is a structured object
- **Required fields per entry**: Each document object must include `format`, `id`, `title`, `type`, and `url` — all five are mandatory
- **Optional length field**: An additional `length` field may be present but is not required
- **Part of multimedia structure**: Documents sits alongside [[concepts/photos|photos]], [[concepts/floorplans|floorplans]], [[concepts/virtualtours|virtualTours]], and videos within the [[concepts/multimedia|multimedia]] parent object
- **Schema-validated**: Defined within a [[concepts/json-schema|JSON Schema]] specification, ensuring consistent data structure across all listings
- **File-oriented**: Unlike photos or videos, documents typically represent static file attachments (e.g., PDFs, contracts, regulatory documentation)

## Applications
- **Rental property evaluation**: Providing prospective tenants with supplementary documentation such as energy certificates, floor plan PDFs, or legal disclosures
- **Data ingestion and validation**: During the [[concepts/web-scraping-pipeline|web scraping pipeline]], document metadata is captured and validated against the schema before storage
- **Frontend rendering**: The frontend application can use document metadata (title, url, format) to render download links or embedded viewers for each attached file
- **Listing completeness tracking**: The presence or absence of documents contributes to determining the overall multimedia completeness of a listing (via the `hasMultimedia` field in the [[concepts/multimedia|multimedia]] object)

## Related Concepts
- [[concepts/multimedia|multimedia]] — parent object containing the documents array
- [[concepts/photos|photos]] — sibling array for property photo assets
- [[concepts/floorplans|floorplans]] — sibling array for floor plan images
- [[concepts/virtualtours|virtualTours]] — sibling array for virtual tour links
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define the documents structure
- [[concepts/properties|properties]] — the broader listing properties object
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the data pipeline that populates document entries

## Related Entities
- [[entities/affitto_data|affitto_data]] — the MongoDB collection whose schema includes the documents sub-array

## Mentions in Source
- `"documents": { "type": "array", "items": { "type": "object", "required": [ "format", "id", "title", "type", "url" ]` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- `"multimedia": { "type": "object", "required": [ "documents", "floorplans", "hasMultimedia", "hasOnlyPhotos", "photoPlan", "photos", "videos", "virtualTours" ]` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]