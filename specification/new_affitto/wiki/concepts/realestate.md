---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "realEstate object"
  - "realEstate projection"
  - "realEstate DTO"
---


# realEstate

## Definition
The `realEstate` object is a projected data structure defined within the `$project` stage of a MongoDB aggregation pipeline operating on the [[concepts/analisi|Analisi feature]]'s query against the affitto collection. It reshapes and nests raw database fields into a clean, DTO-like (Data Transfer Object) namespace for frontend consumption via the API. The object groups three sub-fields — `properties`, `title`, and `price` — under a single `realEstate` key, creating a structured representation of a real estate listing's core details.

## Key Characteristics
- **Aggregation projection output**: Defined within a MongoDB `$project` stage, it selectively reshapes fields from the source collection rather than returning raw document structure
- **Field remapping**: The `properties` sub-field is explicitly mapped from the `$powerproperties` source field (referenced via the `$` prefix), while `title` and `price` are included directly (with `1` indicating inclusion)
- **Namespace grouping**: Groups related listing attributes (`properties`, `title`, `price`) under a single `realEstate` key, providing a clean hierarchical structure for the API response
- **DTO-like shape**: Acts as a data transfer object pattern, decoupling the internal database schema from the external API contract consumed by the frontend
- **Three sub-fields**:
  - `properties` — mapped from [[concepts/powerproperties|powerproperties]] (`$powerproperties`)
  - `title` — the listing [[concepts/title|title]] (included as-is)
  - `price` — the listing price (included as-is)

## Applications
- **API response structuring**: Used to format data returned by the backend API so that the frontend receives a predictable, well-organized JSON structure with real estate details nested under a single key
- **Frontend data consumption**: The [[concepts/analisi-page|Analysis Page]] and [[concepts/table|data table]] components can directly consume the `realEstate` object without needing to flatten or remap fields client-side
- **Data layer abstraction**: Separates the raw MongoDB document shape (which includes fields like `$powerproperties`) from the clean API contract, allowing backend schema changes without breaking frontend expectations
- **Aggregation pipeline design**: Demonstrates the pattern of using `$project` stages in MongoDB to create nested output structures tailored to specific feature requirements

## Related Concepts
- [[concepts/powerproperties|powerproperties]] — source field mapped to `realEstate.properties`
- [[concepts/title|title]] — sub-field included in the `realEstate` object
- [[concepts/analisi|analisi]] — the feature whose aggregation pipeline defines this object
- [[concepts/tabella-colonne|tabella-colonne]] — table column schema that consumes this data structure
- [[concepts/formati-dati|formati-dati]] — data format conventions relevant to this projection
- [[concepts/table|table]] — frontend table component that renders data shaped by this projection
- [[concepts/$set-operator|$set-operator]] — related MongoDB aggregation operator
- [[concepts/business-rules|business-rules]] — business logic layer that governs data shaping

## Related Entities
- [[entities/affito]] — the MongoDB collection queried by the aggregation pipeline containing this projection

## Mentions in Source
- `"realEstate": { "properties": "$powerproperties", "title": 1, "price": 1 }` — [[sources/function_64f05b|function_64f05b]]
- "Deve prendere il dati e passare per API al frontend query e collection "affito"" *(Must take the data and pass it via API to the frontend — query and collection "affito")* — [[sources/function_64f05b|function_64f05b]]