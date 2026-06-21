---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/new-affitto_840b29]]"
tags:
  - "product"
aliases:
  - "Firebase platform"
  - "Firebase Hosting & Functions"
---

## Description
Firebase is the core platform used in the affitti rental system, providing two key services: [[concepts/hosting|hosting]] and [[concepts/function|Cloud Functions]]. Firebase Hosting serves the frontend application, which is built with [[concepts/typescript|TypeScript]], [[concepts/react|React]], and [[concepts/redux-state|Redux]]. Firebase Cloud Functions handle the processing of [[concepts/business-rules|business rules]] and read rental data from [[entities/mongodb-atlas|MongoDB Atlas]], where that data was previously collected via a [[concepts/web-scraping-pipeline|web scraping pipeline]]. In this architecture, Firebase acts as the middleware layer positioned between the MongoDB data store and the user-facing frontend. The platform's configuration is defined through the [[concepts/firebaseconfig|Firebase Configuration]] object, and access to certain features requires [[concepts/autenticazione-necessaria|authentication]].

## Related Entities
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database layer from which Firebase Cloud Functions read scraped rental data
- [[entities/affito|affito]] — the rental management system that Firebase powers as its hosting and compute platform

## Related Concepts
- [[concepts/firebaseconfig|Firebase Configuration]] — the configuration object used to initialize Firebase services
- [[concepts/hosting|Firebase Hosting]] — the hosting service used to serve the frontend application
- [[concepts/function|Cloud Functions]] — serverless functions that process business rules and read data from MongoDB
- [[concepts/business-rules|Business Rules]] — business logic processed by Firebase Cloud Functions
- [[concepts/typescript|TypeScript]] — language used for the frontend application served by Firebase Hosting
- [[concepts/react|React]] — UI library used in the frontend served by Firebase Hosting
- [[concepts/redux-state|Redux]] — client state management used in the frontend application
- [[concepts/web-scraping-pipeline|Web Scraping Pipeline]] — the data collection process whose results are read by Firebase Functions from MongoDB
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — authentication mechanism implemented through Firebase

## Mentions in Source

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "é usata il: **hosting** per presentare il frontend in typescript , react e redux" *(It is used for: **hosting** to serve the frontend in TypeScript, React, and Redux)*
> - "**[[function]]** per processare il business rules e legere il dati che il mongoDB has by scrapping at other process." *(Cloud **functions** to process the business rules and read the data that MongoDB has from scraping in another process.)*