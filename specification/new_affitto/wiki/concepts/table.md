---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/new-affitto_840b29]]"]
tags: [term]
aliases:
  - "main column table"
  - "data table"
  - "rental table"
---


# Table

## Definition
The table is the primary UI component in the frontend of the Affitto application that displays rental (affitto) data to users. It serves as the central data visualization element, rendering data stored in the [[concepts/redux-state|Redux state]] into a structured, columnar format. The table acts as the key interface through which users interact with scraped rental data retrieved from MongoDB via the [[concepts/web-scraping-pipeline|web scraping pipeline]].

## Key Characteristics
- **Primary UI component**: Serves as the main data display element in the frontend application
- **Redux-driven**: Renders data directly from the [[concepts/redux-state|Redux state]] for the affitto domain
- **Main column structure**: Organized around a "main column" layout, indicating a hierarchical or prioritized column arrangement as defined by [[concepts/tabella-colonne|Table Columns]]
- **Data source**: Presents rental data that has been scraped and stored in MongoDB
- **Central visualization**: Acts as the core interface for user interaction with rental listings data
- **Hosted on [[concepts/tabella-page|Tabella Page]]**: The table is rendered within the dedicated table page of the application

## Applications
- Displaying scraped rental property listings to end users in a structured tabular format
- Enabling users to browse, sort, and review rental data collected through the [[concepts/web-scraping-pipeline|web scraping pipeline]]
- Presenting property attributes such as [[concepts/availability|availability]], [[concepts/surfacevalue|surfaceValue]], [[concepts/condominiumexpenses|condominium expenses]], and other fields in organized columns
- Serving as the primary entry point for data analysis before users navigate to other views such as the [[concepts/mappa-page|Map Page]] or [[concepts/analisi-page|Analysis Page]]

## Related Concepts
- [[concepts/redux-state|Redux State]] — provides the data store from which the table renders its content
- [[concepts/tabella-colonne|Table Columns]] — defines the column schema and structure of the table
- [[concepts/tabella-page|Tabella Page]] — the page view that hosts the table component
- [[concepts/web-scraping-pipeline|Web Scraping Pipeline]] — the upstream process that supplies data displayed in the table
- [[concepts/properties|Properties]] — the property data objects rendered as table rows

## Related Entities
- [[entities/affito|Affito]] — the rental application system that the table serves as primary UI for

## Mentions in Source
- "The data in REDUX state for affitto will be present in a table with the tible is a main column" — [[sources/new-affitto_840b29|New Affitto]]
- "Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato." *(System that presents the rental data it has in the MongoDB database that the scraping has returned.)* — [[sources/new-affitto_840b29|New Affitto]]