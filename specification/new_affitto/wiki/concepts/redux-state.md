---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/new-affitto_840b29]]"]
tags: [term]
aliases:
  - "REDUX state"
  - "Redux store"
  - "Redux client state"
---


# Redux State

## Definition
Redux state is the client-side state management layer used in the Affitti system's frontend application. It serves as a centralized store that holds rental (affitto) data retrieved from the backend (MongoDB via Firebase Cloud Functions) and presents it to users through table-based UI components. Redux operates as part of the frontend technology stack alongside React and TypeScript, all served through Firebase Hosting.

## Key Characteristics
- **Centralized client-side store**: Acts as a single source of truth for rental data on the frontend, following the Redux pattern of unidirectional data flow
- **Table-oriented data presentation**: The data held in Redux state is structured to populate a table layout with a main column configuration
- **Part of the React/TypeScript stack**: Integrated within a frontend built with React and TypeScript, providing type-safe state management
- **Backend-driven population**: The state is populated with data fetched from MongoDB through Firebase Cloud Functions, acting as the client-side cache of server data
- **Served via Firebase Hosting**: The entire frontend application, including the Redux state layer, is deployed and served through Firebase Hosting

## Applications
- Storing and managing affitto (rental) listing data on the client side for responsive UI rendering
- Feeding rental data into table components with structured column layouts for user browsing and analysis
- Enabling consistent data access across React components without prop drilling
- Caching backend responses to reduce redundant API calls to Firebase Cloud Functions

## Related Concepts
- [[concepts/hosting|Hosting]] — Firebase Hosting serves the frontend application that includes Redux state management
- [[concepts/tabella-colonne|Table Columns]] — Defines the column structure used to display data from Redux state
- [[concepts/tabella-page|Tabella Page]] — The table page where Redux state data is rendered

## Related Entities
- [[entities/firebase|Firebase]] — Provides the Cloud Functions backend and Hosting for the frontend application
- [[entities/affitto|Affitto]] — The rental data domain whose records are stored in Redux state

## Mentions in Source
- "The data in REDUX state for affitto will be present in a table with the tible is a main column" — [[sources/new-affitto_840b29|New Affitto]]
- "é usata il: **hosting** per presentare il frontend in typescript , react e redux" *(Hosting is used to present the frontend in TypeScript, React, and Redux)* — [[sources/new-affitto_840b29|New Affitto]]