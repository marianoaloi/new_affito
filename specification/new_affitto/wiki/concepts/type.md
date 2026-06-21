---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "type field"
  - "property type field"
  - "type classification attribute"
---


# type

## Definition
The `type` field is a key classification attribute used across multiple MongoDB collections and views within the Affitto rental system. It serves as a categorical discriminator that distinguishes between different kinds of real estate listings — for example, apartments (`"a"`) versus commercial properties (`"c"`). The field appears as part of compound identifiers in the [[concepts/count-collection-view|count collection view]] and is enforced as a required field in aggregation pipelines querying the affitto collection.

## Key Characteristics
- **Categorical classifier**: Uses short string codes (e.g., `"a"`, `"c"`) to represent distinct property listing categories
- **Compound key component**: Forms part of the `_id` alongside [[concepts/province|province]] in the [[concepts/count-collection-view|count collection view]], enabling counts to be grouped by both geographic region and property type
- **Existence-checked in queries**: The aggregation pipeline for the affitto collection includes a `$match` stage with `{ $exists: true }` to ensure only records with a defined `type` are processed
- **Projected at top level**: In the `$project` stage of aggregation pipelines, `type` is included as a top-level output field (`"type": 1`), making it directly accessible in query results
- **Compact encoding**: Values are single-character codes rather than full descriptive strings, optimizing storage and query performance

## Applications
- **Data aggregation and counting**: Used in the [[concepts/contattore|Contattore feature]] to produce per-province, per-type listing counts, enabling analytical breakdowns of rental inventory
- **Query filtering**: Ensures data integrity in aggregation pipelines by requiring the `type` field to exist before processing records
- **Property categorization**: Allows the frontend [[concepts/table|data table]] and [[concepts/analisi|analysis features]] to filter and display listings by property category
- **Business analytics**: Supports the [[concepts/analisi-page|Analysis Page]] in generating reports segmented by property type across different provinces

## Related Concepts
- [[concepts/count-collection-view|count collection view]]
- [[concepts/province|province]]
- [[concepts/statemaloi|statemaloi]]
- [[concepts/contattore|Contattore feature]]
- [[concepts/tabella-colonne|Table Columns]]
- [[concepts/$in-operator|$in query operator]]

## Related Entities
- [[entities/affito|affito]]
- [[entities/count|count]]

## Mentions in Source
- "_id": { "province": "Udine", "type": "a" } — [[sources/function_64f05b|function_64f05b]]
- "_id": { "province": "Udine", "type": "c" } — [[sources/function_64f05b|function_64f05b]]
- "type": { $exists: true } — [[sources/function_64f05b|function_64f05b]]
- "type": 1 — [[sources/function_64f05b|function_64f05b]]