---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/new-affitto_840b29]]"]
tags: [term]
aliases:
  - "Redux"
  - "Redux state"
  - "Redux state management"
---


# Redux

## Definition
Redux is a predictable state management library used in the frontend application of the Affitti system. It serves as the centralized data store for rental (affitto) data, managing the application's data flow and state within a frontend stack that includes [[concepts/react|React]] and [[concepts/typescript|TypeScript]]. The rental data stored in the Redux state is presented to users in a [[concepts/table|table]] format with a main column structure.

## Key Characteristics
- **Centralized State Management**: Acts as the single source of truth for application state, holding rental (affitto) data that is consumed by UI components
- **Integration with React and TypeScript**: Works as part of a modern frontend stack alongside [[concepts/react|React]] for UI rendering and [[concepts/typescript|TypeScript]] for type safety
- **Data Flow Architecture**: Manages unidirectional data flow, ensuring predictable state updates across the application
- **Table Data Source**: The [[concepts/redux-state|Redux state]] feeds rental data directly into the table presentation layer, where it is displayed using a main column structure
- **Frontend Deployment via Hosting**: The Redux-powered frontend is deployed through [[concepts/hosting|Firebase Hosting]]

## Applications
- **Rental Data Management**: Stores and manages affitto (rental) records fetched from backend services, making them available to frontend components
- **Table Presentation**: Provides the data layer for the [[concepts/table|rental data table]], enabling structured display of rental listings with defined column schemas as specified in [[concepts/tabella-colonne|Table Columns]]
- **State Synchronization**: Ensures consistent data state across different pages and views in the application, including the [[concepts/tabella-page|Table Page]]

## Related Concepts
- [[concepts/react|React]]
- [[concepts/typescript|TypeScript]]
- [[concepts/redux-state|Redux state]]
- [[concepts/hosting|Firebase Hosting]]
- [[concepts/table|Table]]
- [[concepts/tabella-colonne|Table Columns]]
- [[concepts/tabella-page|Table Page]]

## Related Entities
- [[entities/Firebase|Firebase]]

## Mentions in Source
- "é usata il: **hosting** per presentare il frontend in typescript , react e redux" *(Hosting is used to present the frontend in TypeScript, React, and Redux)* — [[sources/new-affitto_840b29|New Affitto]]
- "The data in REDUX state for affitto will be present in a table with the tible is a main column" — [[sources/new-affitto_840b29|New Affitto]]