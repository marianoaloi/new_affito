---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affito-frontend-table_a86812]]"]
tags: [term]
aliases:
  - "titolo"
  - "Title column"
  - "listing title"
---


# Title

## Definition
Title is the first tabular data column displayed on the [[concepts/tabella-page|Tabella Page]], representing the title or name of each real estate listing. It serves as the primary identifier for properties in the table view, enabling users to quickly recognize and distinguish individual listings at a glance. The Title column is the leading element in the table schema, followed by Price, [[concepts/energy_class|energy_class]], [[concepts/surfacevalue|surfaceValue]], rent, and contractValue columns.

## Key Characteristics
- **Primary identifier**: Acts as the main human-readable label for each real estate listing in the tabular view
- **First column position**: Always displayed as the leftmost column in the [[concepts/tabella-page|Tabella Page]] table layout, establishing it as the most prominent data point
- **Part of the Tabella Colonne schema**: Defined as one of the six core columns within the [[concepts/tabella-colonne|Tabella Colonne]] specification
- **Scraped data origin**: The title value is retrieved through the [[concepts/web-scraping-pipeline|web scraping pipeline]] along with other listing data before being presented in tabular format
- **Quick identification**: Allows users to scan and identify properties without needing to open individual listing details

## Applications
- **Property listing display**: Used on the [[concepts/tabella-page|Tabella Page]] to present real estate listings in a structured, scannable table format
- **Listing identification**: Serves as the primary reference point when users browse, filter, or compare multiple rental properties
- **Data organization**: Anchors each row of the table, giving context to the accompanying columns (Price, [[concepts/energy_class|energy_class]], [[concepts/surfacevalue|surfaceValue]], rent, contractValue)

## Related Concepts
- [[concepts/tabella-colonne|Tabella Colonne]] — the column schema definition that includes Title as the first column
- [[concepts/tabella-page|Tabella Page]] — the page where the Title column is rendered within the data table
- [[concepts/price|price]] — the second column in the table, displayed immediately after Title
- [[concepts/energy_class|energy_class]] — the third column in the table schema
- [[concepts/surfacevalue|surfaceValue]] — the fourth column representing property surface area
- [[concepts/table|table]] — the data table component that renders all columns including Title

## Related Entities
- [[entities/affitiudine|affitiudine]] — the platform within which the Title column and Tabella Page are used

## Mentions in Source
- "Con il dato recuperato deve presentare il dato tabulato con le colune :" *(With the retrieved data, it must present the tabulated data with the columns:)* — [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]
- "| Title | Price | energy_class | surfaceValue | rent | contractValue |" — [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]