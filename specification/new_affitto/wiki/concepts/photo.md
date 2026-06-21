---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "property photo"
  - "foto proprietà"
  - "photo object"
---


# photo

## Definition
The `photo` field is a top-level object within the [[concepts/properties|properties]] section of the `affitto_data` collection schema. It stores a single representative photo for a rental property listing, containing fields for caption, id, and urls (with multiple size variants). This field is distinct from the `photos` array nested inside the [[concepts/multimedia|multimedia]] object, which holds the complete collection of property images. The `photo` field likely serves as the primary or thumbnail image used for listing previews and summary displays in the frontend.

## Key Characteristics
- **Object type**: Defined as a JSON object with required fields `caption`, `id`, and `urls`
- **Single image**: Represents one representative photo per listing, as opposed to the full gallery stored in [[concepts/multimedia|multimedia]].photos
- **Multi-resolution URLs**: The `urls` sub-object requires four size variants: `large`, `medium`, `small`, and `thumb`, supporting responsive image rendering across different UI contexts
- **Required fields**: All three top-level properties (`caption`, `id`, `urls`) are marked as required in the [[concepts/json-schema|JSON Schema]] definition
- **Caption support**: Includes a string `caption` field for accessibility and descriptive metadata
- **Integer identifier**: The `id` field is typed as integer, linking the photo to an external asset management system
- **Top-level placement**: Positioned directly within [[concepts/properties|properties]] rather than nested under [[concepts/multimedia|multimedia]], suggesting it has a distinct functional role (e.g., primary/hero image)

## Applications
- **Listing preview cards**: Serves as the primary thumbnail image shown in search results and listing grids on the [[concepts/react-and-redux-frontend|React Redux frontend]]
- **Responsive image delivery**: The four URL size variants (`large`, `medium`, `small`, `thumb`) enable optimized image loading based on device screen size and bandwidth
- **Quick listing identification**: Provides an at-a-glance visual identifier for a property without needing to load the full [[concepts/multimedia|multimedia]] photo gallery
- **Data transfer optimization**: When using the [[concepts/slim-dto|DTO]] pattern, only the single `photo` object needs to be included in list views, avoiding transfer of the entire multimedia photo array

## Related Concepts
- [[concepts/properties|properties]] — parent schema section containing the photo field
- [[concepts/multimedia|multimedia]] — contains the full `photos` array for the complete image gallery
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define the photo object structure
- [[concepts/slim-dto|DTO]] — data transfer pattern where photo may serve as the minimal image representation

## Related Entities
- [[entities/affitto_data]] — the MongoDB collection whose schema contains the photo field

## Mentions in Source
- "\"photo\": { \"type\": \"object\", \"required\": [ \"caption\", \"id\", \"urls\" ], \"properties\": { \"caption\": { \"type\": \"string\" }, \"id\": { \"type\": \"integer\" }, \"urls\": { \"type\": \"object\", \"required\": [ \"large\", \"medium\", \"small\", \"thumb\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]