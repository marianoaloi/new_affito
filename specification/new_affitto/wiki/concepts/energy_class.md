---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affito-frontend-table_a86812]]"]
tags: [term]
aliases:
  - "classe energetica"
  - "energy class"
  - "energy_class field"
---


# Energy Class

## Definition
Energy class (`energy_class`) is a data field representing the energy classification or energy efficiency rating of real estate properties. It appears as one of the tabular data columns displayed on the [[concepts/tabella-page|Tabella Page]] within the Affitti application. Positioned as the third column in the property data table (following Title and Price), it provides standardized information about the energy performance of buildings — a particularly important attribute in Italian real estate listings where energy performance certificates (APE — Attestato di Prestazione Energetica) are legally required.

## Key Characteristics
- **Tabular data column**: Displayed as the third column in the main property data table on the [[concepts/tabella-page|Tabella Page]]
- **Column ordering**: Appears after Title and Price columns, and before [[concepts/surfacevalue|surfaceValue]], rent, and contractValue
- **Energy efficiency indicator**: Represents the standardized energy performance classification of a building or property unit
- **Part of the table schema**: Defined as one of the columns in the [[concepts/tabella-colonne|Tabella Colonne]] specification
- **Italian real estate standard**: Aligns with Italian regulatory requirements for energy performance disclosure in property listings
- **Structured data field**: Stored and rendered as a discrete column value within the application's data table

## Applications
- **Property comparison**: Allows users to compare energy efficiency ratings across multiple rental listings in a tabular view
- **Regulatory compliance**: Supports Italian legal requirements to disclose energy performance information in real estate advertisements
- **Filtering and analysis**: Can be used as a criterion for filtering or analyzing properties on the [[concepts/tabella-page|Tabella Page]] and potentially the [[concepts/analisi-page|Analysis Page]]
- **Informed decision-making**: Helps tenants and investors assess the expected energy costs associated with a property

## Related Concepts
- [[concepts/tabella-colonne|Tabella Colonne]] — the column schema that defines energy_class as a table field
- [[concepts/tabella-page|Tabella Page]] — the page where the energy_class column is displayed
- [[concepts/surfacevalue|surfaceValue]] — another column in the same data table
- [[concepts/properties|properties]] — the property data object that contains the energy class attribute

## Related Entities
- [[entities/affitiudine]] — the application in which the energy class field is used

## Mentions in Source
- "Con il dato recuperato deve presentare il dato tabulato con le colune :" *(With the retrieved data, it must present the tabulated data with the columns:)* — [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]
- "| Title | Price | energy_class | surfaceValue | rent | contractValue |" — [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]