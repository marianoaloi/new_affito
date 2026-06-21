---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [method]
aliases:
  - "TypeScript API rules"
  - "regole business TypeScript"
  - "TS business rules"
---


# TypeScript Business Rules

## Definition

TypeScript business rules refer to the server-side logic layer described in the Affitti rental system PRD for implementing data processing, validation, and transformation within the API. This approach uses TypeScript to define business rules that govern data aggregation, filtering, and write operations on MongoDB collections. The business rules layer sits between the API endpoints and the MongoDB database, handling the transformation and validation of scraped real estate data before it is served or persisted.

## Key Characteristics

- **Server-side validation logic**: Enforces data integrity rules such as parsing IDs to integers (`parseInt(id)`), trimming description text, and recording update metadata
- **Typed rule definitions**: Leverages TypeScript's type system to ensure business rules operate on well-defined data structures, reducing runtime errors
- **Metadata recording**: Automatically captures audit information including timestamps ([[concepts/mlastupdate|mLastUpdate]]) and user email ([[concepts/userupdate|userUpdate]]) on write operations
- **Integration with MongoDB aggregation**: Business rules work in conjunction with [[concepts/data-aggregation|Data aggregation pipeline]] to prepare and present raw scraped data via the API
- **Write operation governance**: Controls which fields can be modified and how, enforcing rules like the [[concepts/write-whitelist|Field write whitelist]] and [[concepts/audit-trail|Audit trail rule]]
- **ID typing enforcement**: Includes specific validation such as [[concepts/id-typing-validation|Id typing rule]] to ensure `_id` fields are parsed as integers rather than strings

## Applications

- **Rental data API processing**: Applied in the Affitti backend system to validate and transform real estate listing data before serving it through API endpoints
- **Description updates**: Governs the [[concepts/description-update|description update operation]] by trimming text and attaching metadata (timestamp and modifier email)
- **Bulk state operations**: Enforces validation logic during [[concepts/bulk-state-update|bulk state updates]] across multiple listings
- **Data filtering**: Implements server-side filtering logic such as [[concepts/province-filter|province filtering]] to narrow query results based on geographic criteria
- **Scraped data normalization**: Transforms raw [[concepts/web-scraping|web-scraped]] real estate data into validated, consistently typed records for consumption by the [[concepts/react-and-redux-frontend|React Redux frontend]]

## Related Concepts

- [[concepts/data-aggregation|Data aggregation pipeline]]
- [[concepts/id-typing-validation|Id typing rule]]
- [[concepts/write-whitelist|Field write whitelist]]
- [[concepts/audit-trail|Audit trail rule]]
- [[concepts/description-update|description update operation]]
- [[concepts/shared-types-package|Shared TS types]]
- [[concepts/web-scraping|Web scraping]]
- [[concepts/mlastupdate|mLastUpdate]]
- [[concepts/userupdate|userUpdate]]
- [[concepts/province-filter|province filtering]]
- [[concepts/json-schema|JSON Schema 2020-12]]
- [[concepts/split-collection-architecture|Split-collection pattern]]

## Related Entities

- [[entities/affitto_data|affitto_data]]
- [[entities/affitiudine|affitiudine]]

## Mentions in Source

- "voglio un sistema per preparare e presentare il dado crudo con aggregation e typescript business rules per la API" _(I want a system to prepare and present the raw data with aggregation and TypeScript business rules for the API)_ — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "const filter = { _id: parseInt(id) as any };" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]