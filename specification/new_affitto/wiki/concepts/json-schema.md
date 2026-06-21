---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [standard]
aliases:
  - "JSON Schema 2020-12"
  - "JSON Schema draft 2020-12"
---


# JSON Schema

## Definition

JSON Schema (draft 2020-12) is a specification standard for formally defining the structure, constraints, and validation rules of JSON documents. In the Affitti system, it serves as the authoritative contract that describes the shape of all MongoDB collections, bridging the gap between scraped data ingestion and the TypeScript API business rules. Each collection schema references the 2020-12 draft via the `$schema` keyword and employs features such as required fields, nested object structures, type constraints (including union types), and reusable definitions (`$defs`).

## Key Characteristics

- **Draft 2020-12 compliance**: All collection schemas declare `"$schema": "https://json-schema.org/draft/2020-12/schema"` to pin themselves to the latest stable draft at time of design
- **Union types**: Supports nullable and polymorphic fields through JSON array type syntax (e.g., `["null", "integer"]`), allowing fields to accept multiple data types
- **Reusable definitions via `$defs`**: Common complex types such as `Double` are defined once under `$defs` and referenced throughout the schema, reducing duplication and ensuring consistency
- **Special numeric value handling**: The `Double` definition uses `oneOf` to accommodate both standard `number` values and MongoDB extended JSON representations for `Infinity`, `-Infinity`, and `NaN`
- **Required field enforcement**: Schemas explicitly enumerate required properties, ensuring data completeness at the document level
- **Nested object structures**: Supports deeply nested property definitions that mirror the hierarchical nature of the MongoDB documents (e.g., price, location, energy sub-objects)
- **Contract-driven development**: Acts as a single source of truth between the data layer (scraped and aggregated data) and the application layer (TypeScript API, shared types, DTOs)

## Applications

- **Collection schema documentation**: Formally defines the structure of the [[entities/affitto_data|affitto_data]], [[entities/count|count]], and [[entities/feature|feature]] MongoDB collections within the Affitti backend system
- **Data validation**: Provides a machine-readable specification that can be used to validate incoming scraped data before it is persisted, ensuring conformance with expected field types and required properties
- **TypeScript type generation**: Serves as the basis for deriving TypeScript interfaces in the [[concepts/shared-types-package|Shared types package]], ensuring compile-time alignment between database schemas and API code
- **API contract enforcement**: Acts as the formal contract between the [[concepts/web-scraping|web scraping]] pipeline that produces data and the backend API business rules that consume it
- **BSON compatibility**: The `$defs` mechanism for `Double` specifically addresses MongoDB BSON extended JSON edge cases, ensuring lossless representation of special floating-point values

## Related Concepts

- [[concepts/shared-types-package|Shared types package]]
- [[concepts/data-normalization|Data normalization]]
- [[concepts/id-typing-validation|Id typing rule]]
- [[concepts/web-scraping|Web scraping]]
- [[concepts/split-collection-architecture|Split-collection pattern]]
- [[concepts/write-whitelist|Field write whitelist]]

## Related Entities

- [[entities/affitto_data|affitto_data]]
- [[entities/count|count]]
- [[entities/feature|feature]]
- [[entities/udine|udine]]

## Mentions in Source

- `"$schema": "https://json-schema.org/draft/2020-12/schema",` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- `"$defs": { "Double": { "oneOf": [ { "type": "number" }, { "type": "object", "properties": { "$numberDouble": { "enum": [ "Infinity", "-Infinity", "NaN" ] } } } ] } }` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]