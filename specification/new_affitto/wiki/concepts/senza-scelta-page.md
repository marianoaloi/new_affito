---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "term"
aliases:
  - "No Choice Page"
  - "Senza Scelta"
  - "pagina senza scelta"
---

## Definition

The Senza Scelta Page is a planned but not yet implemented page in the Affitti Udine frontend application. It is one of the four main pages outlined in the frontend PRD (Product Requirements Document). The name "Senza Scelta" translates to "Without Choice" in English, suggesting it may serve as a view for properties that lack a selection or classification — potentially displaying listings where the [[concepts/emptychoise|emptyChoise]] field indicates no decision or categorization has been made. Its specific requirements and implementation details remain undefined (marked as TODO).

## Key Characteristics

- **Planned / TODO status**: The page is referenced in the frontend PRD but has no defined requirements or implementation details yet
- **One of four main frontend pages**: It sits alongside the [[concepts/tabella-page|Tabella Page]], [[concepts/analisi-page|Analysis Page]], and [[concepts/mappa-page|Map Page]] as a core navigation destination in the application
- **Likely connected to empty choice classification**: The name "Senza Scelta" (without choice) strongly suggests a relationship with the [[concepts/emptychoise|emptyChoise]] field, potentially filtering or displaying properties that have not been classified or decided upon
- **Part of the Affitti Udine ecosystem**: Integrated within the broader rental property management platform
- **Purpose not yet defined**: The PRD lists the page but provides no description of its intended functionality, suggesting it may handle scenarios where no selection has been made or where a default view is needed

## Applications

- **Unclassified property management**: May serve as a dedicated view for property listings that have not yet received a decision (accept, deny, or wait), helping operators identify and prioritize items requiring attention
- **Workflow triage**: Could function as a queue or inbox for properties needing classification, complementing the [[concepts/acceptdenywait|accept/deny/wait classification]] system
- **Data quality monitoring**: By surfacing properties without choices, the page may help ensure completeness and accuracy of the property database

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — sister page in the frontend application
- [[concepts/analisi-page|Analysis Page]] — another main frontend page
- [[concepts/mappa-page|Map Page]] — another main frontend page
- [[concepts/emptychoise|emptyChoise]] — likely the underlying data field this page is built around
- [[concepts/acceptdenywait|accept/deny/wait classification]] — the decision classification system that "senza scelta" (without choice) may contrast with
- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] — related planned page in the frontend
- [[concepts/prd|PRD]] — the product requirements document format used to define this page

## Related Entities

- [[entities/affitiudine|Affitti Udine]] — the rental property platform this page belongs to

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]**
> - "# Senza Scelta Page\n\nTODO"