---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [method]
aliases:
  - "affito aggregation pipeline"
  - "affito query"
  - "affito collection aggregation"
---


# Affito Collection Query

## Definition

The affito collection query is a MongoDB aggregation pipeline used by the [[concepts/analisi|Analisi feature]] to retrieve and reshape real estate listing data from the **affito** collection for delivery to the frontend API. The pipeline consists of two sequential stages — a `$match` stage for filtering and a `$project` stage for output reshaping — ensuring that only complete, non-deleted records are returned in a clean, structured format suitable for frontend consumption.

## Key Characteristics

- **Two-stage aggregation pipeline**: Combines a `$match` filter stage with a `$project` reshaping stage in a single database query
- **Soft-delete exclusion**: The `$match` stage filters out documents where the [[concepts/deleted|deleted]] field exists, implementing the [[concepts/deleted|soft delete]] pattern to exclude logically removed records
- **Data completeness enforcement**: Requires both the [[concepts/type|type]] field and `powerproperties.location.province` (nested within [[concepts/powerproperties|powerproperties]]) to exist (`$exists: true`), ensuring only records with valid type classification and geographic location data are returned
- **Output restructuring via `$project`**: Reshapes the document into a clean DTO containing `_id`, `stateMaloi`, [[concepts/type|type]], and a nested [[concepts/realestate|realEstate]] object
- **Field aliasing**: The `$project` stage maps the raw `powerproperties` field to `realEstate.properties`, creating a more semantically meaningful API response structure
- **Nested realEstate object**: The projected [[concepts/realestate|realEstate]] object aggregates `properties` (from [[concepts/powerproperties|powerproperties]]), [[concepts/title|title]], and `price` into a single coherent sub-document

## Applications

- **Analisi feature data retrieval**: Serves as the primary data access query for the [[concepts/analisi|Analisi feature]], powering the [[concepts/analisi-page|Analysis Page]] with filtered and formatted rental listing data
- **Frontend API layer**: Provides a clean, well-structured JSON response through the API layer described in [[sources/prd_affitti_backend_v0-3_1d90fc|Affitti Backend PRD v0.3]], reducing the need for client-side data transformation
- **Data quality gateway**: Acts as a data quality filter by ensuring incomplete records (missing type or location) and soft-deleted records never reach the frontend, supporting the [[concepts/business-rules|business rules]] of the system
- **Table and analysis views**: Supplies data to the [[concepts/tabella-page|Table Page]] and [[concepts/analisi-page|Analysis Page]] components, which render rental listings in structured [[concepts/table|table]] formats

## Related Concepts

- [[concepts/realestate|realEstate]] — the projected output object structure
- [[concepts/type|type]] — required field used in the `$match` filter
- [[concepts/powerproperties|powerproperties]] — source field mapped to `realEstate.properties`
- [[concepts/deleted|deleted]] — soft-delete flag used for exclusion filtering
- [[concepts/analisi|Analisi feature]] — the feature that consumes this query's output
- [[concepts/title|title]] — included in the realEstate projection
- [[concepts/formati-dati|Data Formats]] — related data formatting conventions
- [[concepts/tabella-colonne|Table Columns]] — downstream column definitions consuming this data
- [[concepts/count-collection-view|count collection view]] — companion query/view for count aggregations
- [[concepts/$in-operator|$in query operator]] — related MongoDB query operator used elsewhere in the system

## Related Entities

- [[entities/affito|affito]] — the MongoDB collection this query operates on
- [[entities/count|count]] — related collection/view used alongside affito for analytics

## Mentions in Source

- "Deve prendere il dati e passare per API al frontend query e collection 'affito'" *(Must take the data and pass it via API to the frontend — query and collection "affito")* — [[sources/function_64f05b|function_64f05b]]
- `"$match": { "deleted": { "$exists": false }, "type": { $exists: true }, "powerproperties.location.province": { $exists: true } }` — [[sources/function_64f05b|function_64f05b]]
- `"$project": { "_id": 1, "stateMaloi": 1, "type": 1, "realEstate": { "properties": "$powerproperties", "title": 1, "price": 1 } }` — [[sources/function_64f05b|function_64f05b]]