---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "React/Redux UI"
  - "React Redux frontend"
  - "affitiudine frontend"
---


# React and Redux Frontend

## Definition

The React and Redux frontend is the planned client-side web application for the [[entities/affitiudine|affitiudine]] project. It serves as the user-facing layer that presents scraped and processed rental property data to users and enables decision-making through the [[concepts/statemaloi|stateMaloi]] classification workflow. React provides the UI component library for rendering views, while Redux manages application state — handling complex rental data, filters, and user interactions. The frontend is hosted on Firebase Hosting as part of the [[entities/affitiudine|affitiudine]] project infrastructure.

## Key Characteristics

- **React-based UI**: Uses React as the component library for building the user interface, enabling a modular and declarative approach to rendering rental property data views
- **Redux state management**: Employs Redux for centralized state management, critical for handling the complex data flows involved in rental listings, filtering, and classification operations
- **Firebase Hosting deployment**: Hosted on Firebase Hosting, leveraging the same Google Firebase platform used by the backend services ([[entities/firebase-cloud-functions|Cloud Functions]])
- **Decision-support interface**: Designed to support the [[concepts/evaluator|evaluator]] persona in making rental decisions by presenting processed and aggregated data
- **Integration with stateMaloi workflow**: Enables users to interact with the [[concepts/statemaloi|stateMaloi]] classification system, including [[concepts/bulk-state-update|bulk state updates]] for triaging rental listings
- **TypeScript alignment**: Part of a system that uses TypeScript business rules on the API side, suggesting type-safe integration between frontend and backend via [[concepts/shared-types-package|shared types]]

## Applications

- **Rental property browsing**: Presenting aggregated and normalized rental data sourced from scraped listings stored in collections such as [[entities/affitto_data|affitto_data]] and [[entities/affito|affito]]
- **Property evaluation workflow**: Supporting the [[concepts/evaluator|evaluator]] in reviewing listings through the [[concepts/statemaloi|stateMaloi]] classification states, enabling accept/reject/shortlist decisions
- **Feature analysis visualization**: Rendering [[concepts/feature-analysis|feature analysis views]] that allow users to inspect [[concepts/featurelist|featureList]] and [[concepts/primaryfeatures|primaryFeatures]] data for each listing
- **Bulk operations**: Providing UI controls for [[concepts/bulkstatemaloi|BulkStateMaloi]] operations to update multiple listing states at once
- **Optimistic user experience**: Leveraging [[concepts/optimistic-update|optimistic updates]] to provide responsive feedback while backend operations complete under the [[concepts/eventual-consistency|eventual consistency]] model

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — Core classification enum used in the decision workflow
- [[concepts/bulk-state-update|bulk-state-update]] — Bulk state transition operations surfaced in the UI
- [[concepts/bulkstatemaloi|BulkStateMaloi operation]] — Backend operation supporting bulk classification
- [[concepts/evaluator|Evaluator]] — Primary user persona interacting with the frontend
- [[concepts/feature-analysis|Feature analysis view]] — Data visualization feature rendered by the frontend
- [[concepts/featurelist|featureList]] — Property feature data displayed to users
- [[concepts/shared-types-package|Shared types package]] — TypeScript types shared between frontend and backend
- [[concepts/optimistic-update|Optimistic update pattern]] — UI responsiveness pattern used in the frontend
- [[concepts/slim-dto|DTO]] — Data transfer objects consumed by the frontend from the API
- [[concepts/firebase-authentication|Firebase Authentication]] — Authentication layer used to secure frontend access
- [[concepts/cors|CORS]] — Cross-origin policy relevant to frontend-backend communication

## Related Entities

- [[entities/affitiudine|affitiudine project]] — Parent Firebase project hosting the frontend
- [[entities/affitti-backend|Affitti Backend API]] — Backend API layer that the frontend consumes
- [[entities/firebase-cloud-functions|Cloud Functions]] — Serverless backend functions providing API endpoints
- [[entities/affitto_data|affitto_data]] — Read-optimized collection whose data is presented in the frontend
- [[entities/mongodb-atlas|MongoDB Atlas Cloud]] — Database layer accessed indirectly through the API

## Mentions in Source

- "voglio un sistema per preparare e presentare il dado crudo con aggregation e typescript business rules per la API e creare un frontend react e redux per presentare il dati e tomare dedizione ." *(I want a system to prepare and present raw data with aggregation and TypeScript business rules for the API and create a React and Redux frontend to present data and make decisions.)* — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "Il sistema sta usando la piattaforma di firebase google per ospedare il hosting e function" *(The system is using the Google Firebase platform to host the hosting and functions.)* — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]