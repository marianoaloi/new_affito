---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "Counter"
  - "Count View"
  - "Contattore feature"
---


# Contattore

## Definition
Contattore is a feature in the Affitti application that presents aggregated totals from the `count` collection view in the database. It functions as a dashboard-like summary component, displaying compiled statistics about rental listings below the main content area. The data is organized by province and type, providing users with a comprehensive overview of rental listing metrics across different geographic regions.

## Key Characteristics
- **Aggregated Data Display**: Pulls and presents totals from the `count` collection view stored in the database
- **Positioned Below Main Content**: The aggregated data is rendered below the primary content returned by the application
- **Organized by Province and Type**: Statistics are grouped geographically by province and categorized by listing type
- **Multi-metric Dashboard**: Displays a wide range of aggregated metrics including:
  - **Total listings**: Overall count of rental listings
  - **Disability accessibility**: Tracks `disable`, `nodisable`, and `emptydisable` counts
  - **Elevator availability**: Tracks `elevator`, `noElevator`, and `emptyElevator` counts
  - **Review status**: Tracks `deny`, `wait`, and `accept` states
  - **Empty choice counts**: Tracks listings with no selection made
- **Read-only Summary View**: Serves as a reporting/analytics component rather than an interactive editing interface

## Applications
- Providing administrators and users with a quick statistical overview of rental listings across provinces
- Monitoring the distribution of accessibility features (disability access, elevator availability) across the rental portfolio
- Tracking the review pipeline status (denied, waiting, accepted) of rental listings
- Identifying data quality gaps through empty choice and empty field metrics
- Supporting operational decision-making by surfacing aggregated trends in the Affitti system

## Related Concepts
- [[concepts/analisi-page|Analysis Page]] — related analytics/analysis feature in the Affitti application
- [[concepts/elevator-accessibility-tracking|Elevator Accessibility Tracking]] — tracks elevator and disability access metrics that feed into Contattore aggregations
- [[concepts/emptychoise|emptyChoise]] — the empty choice count metric displayed within Contattore
- [[concepts/count-without-autentication|Count Without Authentication]] — related count functionality accessible without authentication
- [[concepts/tabella-page|Table Page]] — the main table page whose data Contattore summarizes
- [[concepts/senza-scelta-page|Senza Scelta]] — page handling listings without a choice, related to empty choice tracking

## Related Entities
- [[entities/count|count]] — the database collection view that provides the aggregated data for Contattore
- [[entities/affito|affito]] — the Affitti application entity that hosts the Contattore feature

## Mentions in Source
- "## Contattore" — [[sources/function_64f05b|function_64f05b]]
- "Deve presentare il totale che ha nel database per la collection view 'count' giù il dati ritornati" *(Must present the total from the database for the collection view 'count' below the returned data)* — [[sources/function_64f05b|function_64f05b]]