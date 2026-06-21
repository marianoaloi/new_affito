---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "term"
aliases:
  - "Table Columns"
  - "Data Table Schema"
  - "Tabella Colonne"
---

## Basic Information

- **Type:** concept
- **Subtype:** term
- **Sources:** [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]
- **Definition:** Tabella Colonne refers to the specific column structure defined for the main data table page in the Affito frontend application, specifying the six columns that must be displayed when presenting rental property data in tabulated form.

## Description

Tabella Colonne refers to the specific column structure defined for the main data table page in the Affitiudine frontend application. It specifies the six columns that must be displayed when presenting rental property data in tabulated form: **Title**, **Price**, **energy_class**, **surfaceValue**, **rent**, and **contractValue**. Each column maps directly to a property attribute retrieved from the backend API, and together they provide users with the essential information needed for comparing rental listings in the Udine area. The column selection aligns with the backend data model's property attributes, ensuring consistency between the data layer and the presentation layer. Title identifies the property listing, Price and rent cover financial terms, contractValue captures the contract type, surfaceValue represents the physical characteristics, and energy_class indicates energy performance.

## Key Characteristics

- **Fixed column set**: The table schema is explicitly defined in the PRD with exactly six columns — Title, Price, energy_class, surfaceValue, rent, and contractValue
- **Backend-driven data**: Each column value is populated from data retrieved via the backend API; the frontend does not generate these values
- **User-facing presentation layer**: The columns represent the primary data surface that users interact with when browsing tabulated property listings
- **Directly tied to Tabella Page**: The column structure is specifically designed for the [[concepts/tabella-page|Tabella Page]], which is the dedicated table view in the application
- **Property-centric fields**: Each column corresponds to a core attribute of a rental listing — covering identification (Title), financial terms (Price, rent, contractValue), physical characteristics (surfaceValue), and energy performance (energy_class)

## Applications

- **Rental listing comparison**: Users can quickly scan and compare multiple rental properties across standardized data points in a tabular format
- **Frontend table rendering**: Developers use this column specification as the blueprint for implementing the data table component in the Affitiudine frontend
- **Data contract between frontend and backend**: The column definitions serve as an implicit contract ensuring the backend API supplies all required fields for the frontend table display
- **PRD compliance validation**: QA and development teams reference the Tabella Colonne specification to verify that the implemented table matches the product requirements

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — the page where the Tabella Colonne structure is rendered
- [[concepts/price|Price]] — the price data field displayed as a column
- [[concepts/surfacevalue|surfaceValue]] — the surface area value displayed as a column
- [[concepts/rent|Rent]] — the rental terms data displayed as a column
- [[concepts/contractvalue|contractValue]] — the contract type value displayed as a column
- [[concepts/properties|Properties]] — the property data object from which column values are extracted
- [[concepts/buildingperformance|Building Performance]] — related to the energy_class column data

## Related Entities

- [[entities/affitiudine|Affitiudine]] — the frontend application in which the table columns are defined and displayed

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]**
> - "Con il dato recuperato deve presentare il dato tabulato con le colune :
>
> | Title | Price | energy_class | surfaceValue | rent | contractValue |"
>
> *(With the retrieved data, it must present the tabulated data with the columns: Title | Price | energy_class | surfaceValue | rent | contractValue)*

> - "Tabella Page
> Con il dato recuperato deve presentare il dato tabulato con le colune :"
>
> *(Table Page — With the retrieved data, it must present the tabulated data with the columns:)*

> - "| Title | Price | energy_class | surfaceValue | rent | contractValue |"