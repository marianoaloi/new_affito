---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "term"
aliases:
  - "contractValue field"
  - "contract type value"
  - "contractValue"
---

## Description

The `contractValue` field is a core piece of metadata stored within the [[concepts/realestatepage|realEstatePage]] object of the [[entities/affitto_data|affitto_data]] MongoDB collection. It is defined as a string and represents the type or nature of the rental contract for a property listing. Every document in the collection must contain this value, as it is one of the five required fields in the `realEstatePage` schema — alongside `createdAt`, [[concepts/price|price]], `title`, and `updatedAt`. The field captures the original contract classification from the scraped source during the [[concepts/web-scraping-pipeline|web-scraping pipeline]], ensuring that each listing explicitly declares its contract type. Beyond backend storage, `contractValue` is also surfaced on the frontend as the sixth and final column in the [[concepts/tabella-page|Tabella Page]] data table, following `Title`, `Price`, [[concepts/energy_class|energy_class]], [[concepts/surfacevalue|surfaceValue]], and [[concepts/rent|rent]]. Its field name follows the camelCase convention consistent with the application's JavaScript/[[concepts/typescript|TypeScript]] data model, and its presence enables downstream categorization, filtering, and business logic branching based on whether a listing is a rental, sale, or other contract type.

## Key Characteristics

- **Data type:** Stored as a `string` value
- **Required field:** Mandatory in the [[concepts/realestatepage|realEstatePage]] schema; a valid real estate page object cannot omit it
- **Contract classification:** Encodes the nature of the property listing contract (e.g., rental vs. sale)
- **Filtering role:** Used to categorize and filter property data within the Affitti rental management platform
- **Schema co-requirements:** Defined alongside other required fields: `createdAt`, [[concepts/price|price]], `title`, and `updatedAt`
- **Scraped origin:** Captures original real estate page information from the scraped source
- **Tabular display:** Appears as the sixth and final column in the [[concepts/tabella-page|Tabella Page]] table layout, as part of the [[concepts/tabella-colonne|Tabella Colonne]] schema
- **Naming convention:** Uses camelCase consistent with the application's JavaScript/[[concepts/typescript|TypeScript]] data model

## Applications

- **Property categorization:** Enables the platform to distinguish between different listing types (rental, sale, etc.) so that users can view only relevant results.
- **Search and filtering:** Acts as a filter criterion when querying the [[entities/affitto_data|affitto_data]] collection, allowing API consumers to retrieve listings by contract type.
- **Data validation:** As a required field, it enforces data integrity at the schema level — ensuring every property record explicitly declares its contract type.
- **Business logic branching:** Downstream features such as pricing display, cost breakdowns ([[concepts/costs|costs]]), and [[concepts/rent|rent]] terms may behave differently depending on the `contractValue`.
- **Frontend tabular display:** Rendered as a column in the [[concepts/tabella-page|Tabella Page]], providing users with a visible contract classification alongside other key listing attributes such as [[concepts/price|price]], [[concepts/energy_class|energy_class]], [[concepts/surfacevalue|surfaceValue]], and [[concepts/rent|rent]].

## Related Concepts

- [[concepts/realestatepage|realEstatePage]] — the parent object schema that requires this field
- [[concepts/price|price]] — another required field in the same schema and a co-column in the Tabella Page
- [[concepts/rent|rent]] — rental terms object, contextually related when `contractValue` indicates a rental listing; also a co-column in the table
- [[concepts/costs|costs]] — costs sub-object whose relevance may vary by contract type
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define `contractValue` and its constraints
- [[concepts/web-scraping-pipeline|web-scraping-pipeline]] — the pipeline through which scraped listing data, including `contractValue`, is ingested
- [[concepts/tabella-page|Tabella Page]] — the frontend page where `contractValue` is displayed as a table column
- [[concepts/tabella-colonne|Tabella Colonne]] — the table column schema that includes `contractValue` as the sixth column
- [[concepts/energy_class|energy_class]] — a co-column in the Tabella Page table layout
- [[concepts/surfacevalue|surfaceValue]] — a co-column in the Tabella Page table layout
- [[concepts/typescript|TypeScript]] — the language whose camelCase convention the field name follows

## Related Entities

- [[entities/affitto_data|affitto_data]] — the MongoDB collection where real estate page documents (including `contractValue`) are stored
- [[entities/affitiudine|affitiudine]] — the frontend application that displays `contractValue` in the Tabella Page

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - "\"realEstatePage\": { \"type\": \"object\", \"required\": [ \"contractValue\", \"createdAt\", \"price\", \"title\", \"updatedAt\" ]"
> - "\"contractValue\": { \"type\": \"string\" }"

> **Source: [[sources/prd-new-affito-frontend-table_a86812|prd-new-affito-frontend-table_a86812]]**
> - "Con il dato recuperato deve presentare il dato tabulato con le colune :"
> - "| Title | Price | energy_class | surfaceValue | rent | contractValue |"