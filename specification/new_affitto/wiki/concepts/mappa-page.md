---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "term"
aliases:
  - "Map Page"
  - "Mappa"
---

## Description

The Mappa Page is a planned but not yet implemented page in the Affitti Udine frontend application, intended to provide a map-based geospatial visualization of rental property data. Listed as one of the four main navigation pages in the application's [[concepts/prd|PRD]], it is designed to complement the tabular data view offered by the [[concepts/tabella-page|Tabella Page]] by allowing users to explore available properties on an interactive map. The page is currently marked as TODO in the PRD, with implementation details and specific requirements yet to be defined. It sits alongside the [[concepts/analisi-page|Analisi Page]], [[concepts/senza-scelta-page|Senza Scelta Page]], and [[concepts/tabella-page|Tabella Page]] as one of the primary navigation sections of the application. The Mappa Page will likely leverage [[concepts/marker|marker]] data and property location information to position listings on an interactive map interface.

## Key Characteristics

- **Planned feature**: Currently exists only as a placeholder with a TODO status in the PRD; no implementation details have been specified
- **Map-based visualization**: Expected to render rental property listings on a geographic map interface, enabling spatial exploration of available properties
- **Navigation page**: One of the four primary pages in the Affitti Udine frontend application's navigation structure
- **Complementary to tabular view**: Provides an alternative way to browse and discover properties compared to the list/table format of the [[concepts/tabella-page|Tabella Page]]
- **Geospatial focus**: Leverages [[concepts/location|location]] data associated with property listings to position them on a map

## Applications

- **Spatial property search**: Users can visually identify rental properties in specific neighborhoods, streets, or areas of interest without relying on text-based filters
- **Geographic context**: Provides contextual information about property surroundings, proximity to landmarks, transportation, and other points of interest
- **Comparative exploration**: Allows users to compare property locations side-by-side on a map, aiding in decision-making based on geographic preferences
- **Integration with filters**: Expected to work alongside existing filtering mechanisms such as [[concepts/province-filter|province filter]] and [[concepts/availability|availability]] to narrow down map results

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — the tabular view counterpart for displaying property data
- [[concepts/analisi-page|Analisi Page]] — another main navigation page providing analytical views
- [[concepts/senza-scelta-page|Senza Scelta Page]] — another main navigation page in the application
- [[concepts/react-and-redux-frontend|React and Redux Frontend]] — the frontend technology stack in which the Mappa Page will be implemented
- [[concepts/location|Location]] — the property location data that the map visualization will rely on
- [[concepts/marker|Marker]] — map marker data used to position properties on the map
- [[concepts/prd|PRD]] — the Product Requirements Document where this page is specified

## Related Entities

- [[entities/affitiudine|affitiudine]] — the application project to which the Mappa Page belongs

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD New Affito FrontEnd Table]]**
> - "# Mappa Page\n\nTODO"