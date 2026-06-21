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
  - "surfaceValue field"
  - "surface value"
  - "surfaceValue"
---

## Description

`surfaceValue` is a string-typed field defined within the [[concepts/properties|properties]] object of the [[entities/affitto-data|affitto_data]] collection schema. It represents the overall surface area value of a rental property, likely containing both the numeric value and the unit of measurement expressed together as a single string. This design choice allows flexible formatting but requires parsing for numerical operations such as filtering or sorting. The field complements the more detailed [[concepts/surfaceconstitution|surfaceConstitution]] object, which breaks down the surface into constituent elements with percentages and types. A related `surface` field also exists as a string type within the same schema, suggesting the system may maintain both a raw surface string and a formatted `surfaceValue` for different display or processing purposes. Beyond its role in the backend schema, `surfaceValue` is also a key column displayed on the [[concepts/tabella-page|Tabella Page]], appearing as the fourth column in the tabular layout alongside Title, Price, [[concepts/energy_class|energy_class]], rent, and contractValue — enabling users to compare property sizes directly within the frontend interface. Together, these backend and frontend usages make `surfaceValue` a central property size metric used across both data storage and user-facing listings.

## Key Characteristics

- **String data type**: The surface area value is stored as a `string`, not a numeric type, which allows for flexible formatting (e.g., inclusion of units or textual qualifiers) but requires parsing for numerical operations
- **Part of the properties object**: Resides within the top-level [[concepts/properties|properties]] object of the `affitto_data` collection, alongside other listing attributes
- **Complementary to surfaceConstitution**: Provides a summary total surface value, while [[concepts/surfaceconstitution|surfaceConstitution]] offers a detailed breakdown of surface components (types and percentages)
- **Related `surface` field**: A separate `surface` field also exists as a string type within the schema, indicating the system may track surface information in multiple representations
- **Non-required field**: Unlike `location` and `multimedia`, `surfaceValue` is not listed among the required fields of the [[concepts/properties|properties]] object
- **Schema-validated**: Defined within a [[concepts/json-schema|JSON Schema]] specification governing the `affitto_data` collection structure
- **Frontend table column**: Displayed as the fourth column in the [[concepts/tabella-page|Tabella Page]] table layout, following Title, Price, and [[concepts/energy_class|energy_class]], and preceding rent and contractValue
- **camelCase naming convention**: The field name follows a camelCase convention consistent with the application's data model

## Applications

- **Property listing display**: Used to show the total surface area of a rental property on listing pages, giving users an immediate sense of property size
- **Tabular data presentation**: Displayed as a column in the [[concepts/tabella-page|Tabella Page]], allowing users to compare surface values across multiple properties in a structured table format
- **Search and filtering**: Can be used as a filter criterion when users search for properties within a specific surface area range (though string-to-numeric conversion may be necessary)
- **Data aggregation and reporting**: Contributes to [[concepts/data-aggregation|data aggregation]] pipelines for generating statistics on property sizes across the Affitti platform
- **Quick comparison**: Enables rapid side-by-side comparison of property sizes without needing to sum individual surface constitution elements

## Related Concepts

- [[concepts/properties|properties]] — parent object containing surfaceValue
- [[concepts/surfaceconstitution|surfaceConstitution]] — detailed surface breakdown by type and percentage
- [[concepts/json-schema|JSON Schema]] — schema standard used to define the field
- [[concepts/primaryfeatures|primaryFeatures]] — related property feature data
- [[concepts/location|location]] — sibling required field in the properties object
- [[concepts/multimedia|multimedia]] — sibling required field in the properties object
- [[concepts/data-aggregation|data aggregation]] — aggregation pipelines that may consume surface data
- [[concepts/tabella-colonne|Tabella Colonne]] — table column definitions that include surfaceValue
- [[concepts/tabella-page|Tabella Page]] — frontend page where surfaceValue is displayed as a table column
- [[concepts/energy_class|energy_class]] — sibling column in the tabular data layout

## Related Entities

- [[entities/affitto-data|affitto_data]] — the MongoDB collection whose schema defines this field
- [[entities/affitiudine|affitiudine]] — the application platform that displays surfaceValue in its frontend

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - "\"surfaceValue\": { \"type\": \"string\" }"
> - "\"properties\": { \"type\": \"object\", \"required\": [ \"location\", \"multimedia\" ], \"properties\": {"
> - "\"surface\": { \"type\": \"string\" }"

> **Source: [[sources/prd-new-affito-frontend-table_a86812|prd-new-affito-frontend-table_a86812]]**
> - "Con il dato recuperato deve presentare il dato tabulato con le colune :"
> - "| Title | Price | energy_class | surfaceValue | rent | contractValue |"