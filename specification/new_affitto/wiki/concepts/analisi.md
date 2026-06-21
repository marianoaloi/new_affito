---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [method]
aliases:
  - "Analysis feature"
  - "Analisi feature"
---


# Analisi

## Definition

Analisi is a data retrieval and transformation feature within the Affitti application that queries the `affito` MongoDB collection using an aggregation pipeline and exposes the results via API to the frontend. It serves as the backend data layer powering the [[concepts/analisi-page|Analysis Page]], filtering out soft-deleted documents and restructuring property data into a normalized format suitable for frontend consumption.

## Key Characteristics

- **MongoDB Aggregation Pipeline**: Uses a multi-stage aggregation pipeline rather than simple queries, enabling filtering and field transformation in a single database operation
- **Soft-Delete Filtering**: The `$match` stage excludes documents where the `deleted` field exists, implementing the [[concepts/soft-delete|soft-delete]] pattern to ensure only active records are returned
- **Field Existence Validation**: Requires both the `type` field and `powerproperties.location.province` field to exist, ensuring data quality before projection
- **Data Restructuring via `$project`**: Projects specific fields including `_id`, [[concepts/statemaloi|stateMaloi]], `type`, and constructs a `realEstate` object that remaps `powerproperties` to `properties` along with `title` and `price`
- **API-Driven Architecture**: Results are passed to the frontend through an API layer, decoupling the data retrieval logic from the presentation layer
- **Collection Target**: Operates exclusively on the `affito` collection, which stores rental property listings

## Applications

- **Rental Market Analysis**: Provides filtered and structured property data to the [[concepts/analisi-page|Analysis Page]] for analytical visualization and decision-making
- **Data Normalization**: Transforms raw MongoDB document structure (using `powerproperties`) into a cleaner `realEstate.properties` format expected by the frontend
- **Quality Assurance**: Ensures only complete, non-deleted records with valid location and type information are surfaced to end users
- **Backend-Frontend Integration**: Acts as the data contract between the MongoDB backend and the React/TypeScript frontend, part of the broader [[concepts/function|Cloud Functions]] architecture

## Related Concepts

- [[concepts/analisi-page|Analysis Page]] — the frontend page that consumes data from this feature
- [[concepts/soft-delete|soft-delete]] — the deletion pattern used to filter records
- [[concepts/statemaloi|stateMaloi]] — one of the projected fields in the aggregation output
- [[concepts/tabella-colonne|Table Columns]] — related data schema for displaying property information
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — upstream data ingestion that populates the `affito` collection
- [[concepts/function|Cloud Functions]] — the serverless platform hosting this feature
- [[concepts/business-rules|business rules]] — the broader business logic layer this feature belongs to
- [[concepts/table|data table]] — related frontend component for data display

## Related Entities

- [[entities/affito|affito]] — the MongoDB collection queried by this feature

## Mentions in Source

- "## Analisi" — [[sources/function_64f05b|function_64f05b]]
- "Deve prendere il dati e passare per API al frontend query e collection \"affito\"" *(Must retrieve the data and pass it via API to the frontend, querying the "affito" collection)* — [[sources/function_64f05b|function_64f05b]]
- "$match": { "deleted": { "$exists": false }, "type": { $exists: true }, "powerproperties.location.province": { $exists: true } }" — [[sources/function_64f05b|function_64f05b]]