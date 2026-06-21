---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/new-affitto_840b29]]"
tags:
  - "term"
aliases:
  - "TypeScript"
  - "TS"
  - "typescript language"
---

## Definition
TypeScript is a statically-typed superset of JavaScript used as the primary programming language for the frontend application of the Affitti rental system. It provides compile-time type safety and enhanced developer tooling, enabling the construction of a robust user interface that presents rental data scraped from external sources and stored in MongoDB. In the Affitti architecture, TypeScript is used alongside [[concepts/redux-state|Redux]] and [[concepts/react|React]] to build the single-page application hosted on [[concepts/hosting|Firebase Hosting]].

## Key Characteristics
- **Static type safety**: Adds compile-time type checking on top of JavaScript, catching errors before runtime
- **Frontend language**: Serves as the core language for the Affitti system's client-side application
- **Framework integration**: Used in conjunction with [[concepts/react|React]] for UI components and [[concepts/redux-state|Redux]] for state management
- **Hosted deployment**: The TypeScript-built frontend is deployed and served via [[concepts/hosting|Firebase Hosting]]
- **Data presentation layer**: The compiled TypeScript application is responsible for rendering rental listing data (scraped and stored in MongoDB) to end users through components such as the [[concepts/table|data table]], [[concepts/mappa-page|map page]], and [[concepts/analisi-page|analysis page]]
- **Code reliability focus**: The use of TypeScript indicates a deliberate emphasis on code reliability and maintainability in the frontend codebase

## Applications
- Building the Affitti rental system's frontend single-page application
- Implementing type-safe UI components that display rental property data including [[concepts/properties|properties]], [[concepts/photos|photos]], [[concepts/virtualtours|virtual tours]], and [[concepts/floorplans|floor plans]]
- Defining typed interfaces for data structures exchanged between the frontend and backend API layer
- Enforcing [[concepts/typescript-business-rules|TypeScript business rules]] within the frontend codebase
- Supporting authenticated and unauthenticated page views such as [[concepts/tabella-page|Table Page]], [[concepts/senza-autenticazioni-page|Unauthenticated Page]], and [[concepts/senza-scelta-page|No Choice Page]]

## Related Concepts
- [[concepts/react|React]]
- [[concepts/redux-state|Redux State]]
- [[concepts/hosting|Firebase Hosting]]
- [[concepts/typescript-business-rules|TypeScript Business Rules]]
- [[concepts/table|Data Table]]
- [[concepts/tabella-page|Table Page]]
- [[concepts/web-scraping-pipeline|Web Scraping Pipeline]]
- [[concepts/firebaseconfig|Firebase Configuration]]
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]]
- [[concepts/mappa-page|Map Page]]
- [[concepts/analisi-page|Analysis Page]]

## Related Entities
- [[entities/firebase|Firebase]]

## Mentions in Source

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "**hosting** per presentare il frontend in typescript , react e redux"
> - "é usata il: **hosting** per presentare il frontend in typescript , react e redux"