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
  - "prezzo"
  - "property price"
  - "price object"
---

## Key Characteristics

- **Structured object format**: Price is not a simple scalar value but a JSON object containing multiple fields that together represent the full pricing context of a rental listing.
- **Required fields**: The object mandates four required properties: `formattedValue` (a display-ready string representation), `value` (the numeric integer price), `priceRange` (categorization of the price bracket), and `visible` (a boolean flag controlling whether the price is publicly displayed).
- **Optional pricePerSquareMeter**: An additional field typed as a string that normalizes the rental cost against the property's surface area, enabling fair comparisons across listings of different sizes.
- **loweredPrice sub-object**: A nested object that tracks price reductions over time, containing required fields for `originalPrice`, `currentPrice`, `discountPercentage`, `date` of reduction, `passedDays` since the change, `priceDecreasedBy` amount, and `typologiesCount`.
- **Dual representation**: Supports both human-readable (`formattedValue`) and machine-processable (`value`) representations of the same price, facilitating both UI rendering and computational operations.
- **Visibility control**: The `visible` flag allows listings to exist in the system without publicly exposing their pricing, supporting various business scenarios such as price-on-request listings.
- **Frontend tabular column**: Price is displayed as the second column in the [[concepts/tabella-page|Tabella Page]] data table, positioned directly after Title, making it one of the most prominent data points in the frontend presentation layer. It is part of the core tabular data presentation defined by the [[concepts/tabella-colonne|Tabella Colonne]] schema.

## Applications

- **Rental listing display**: The `formattedValue` field provides a ready-to-render price string for frontend presentation in the [[concepts/react-and-redux-frontend|React/Redux UI]], while the `value` field supports sorting and filtering operations.
- **Tabular data presentation**: Price is rendered as a dedicated column in the [[concepts/tabella-page|Tabella Page]], presented alongside Title, [[concepts/energy-class|energy_class]], [[concepts/surfacevalue|surfaceValue]], [[concepts/rent|rent]], and [[concepts/contractvalue|contractValue]] as part of the [[concepts/tabella-colonne|Tabella Colonne]] schema. The data displayed in the Price column is retrieved from the backend database and presented in tabular format to the user.
- **Price trend analysis**: The [[concepts/loweredprice|loweredPrice]] sub-object enables tracking of price reductions over time, supporting the [[concepts/feature-analysis|Feature analysis view]] and market analytics dashboards.
- **Market comparison**: The `pricePerSquareMeter` field allows normalized comparisons of rental costs across properties of varying sizes, useful for evaluators and market research.
- **Data aggregation**: Price data feeds into [[concepts/data-aggregation|aggregation pipelines]] to compute market statistics, average rental costs by area, and pricing distributions.
- **Data normalization**: Price values are subject to [[concepts/data-normalization|data normalization]] rules to ensure consistency across listings sourced via [[concepts/web-scraping|web scraping]] and other ingestion methods.
- **Rental market decision-making**: The price object serves as a core data point for [[concepts/evaluator|evaluators]] performing rental market analysis within the Affitti system.

## Related Concepts

- [[concepts/realestatepage|realEstatePage]] — Parent object that contains the price structure
- [[concepts/loweredprice|loweredPrice]] — Nested sub-object tracking price reductions over time
- [[concepts/rent|rent]] — Related rental terms and conditions associated with listings
- [[concepts/costs|costs]] — Related cost information for rental listings beyond the base price
- [[concepts/contractvalue|contractValue]] — Contract type value field sitting alongside price in the realEstatePage object
- [[concepts/primaryfeatures|primaryFeatures]] — Property features that influence pricing
- [[concepts/energy-class|energy_class]] — Energy classification column displayed alongside Price in the tabular layout
- [[concepts/data-normalization|Data normalization]] — Normalization rules applied to price values
- [[concepts/data-aggregation|Data aggregation]] — Aggregation pipelines that process price data for analytics
- [[concepts/feature-analysis|Feature analysis view]] — Analysis features that leverage price trend data
- [[concepts/slim-dto|Slim DTO]] — Data transfer objects that may include price summaries
- [[concepts/json-schema|JSON Schema]] — Schema standard used to define the price object structure
- [[concepts/surfacevalue|surfaceValue]] — Surface area field related to pricePerSquareMeter calculations and a sibling tabular column
- [[concepts/tabella-page|Tabella Page]] — Frontend page where Price is displayed as a tabular column
- [[concepts/tabella-colonne|Tabella Colonne]] — Table column schema that includes Price as the second column

## Related Entities

- [[entities/affitto_data|affitto_data]] — The collection containing rental listing documents with price objects
- [[entities/affitti-backend|Affitti Backend API]] — The API layer that serves and processes price data
- [[entities/udine|MongoDB udine]] — The database hosting the rental data collections
- [[entities/affitiudine|affitiudine]] — Frontend application that retrieves and displays price data in tabular format

## Mentions in Source

> **Source: PRD New Affitto (backend)**
> - `"price": { "type": "object", "required": [ "formattedValue", "priceRange", "value", "visible" ],`
> - `"loweredPrice": { "type": "object", "required": [ "currentPrice", "date", "discountPercentage", "originalPrice", "passedDays", "priceDecreasedBy", "typologiesCount" ],`
> - `"price": { "type": "object", "required": [ "formattedValue", "priceRange", "value", "visible" ]`
> - `"pricePerSquareMeter": { "type": "string" }`
> - `"contractValue": { "type": "string" }, "createdAt": { "type": "integer" }, "price": { "type": "object" }`

> **Source: PRD Affito Frontend Table**
> - "Con il dato recuperato deve presentare il dato tabulato con le colune :"
> - "| Title | Price | energy_class | surfaceValue | rent | contractValue |"