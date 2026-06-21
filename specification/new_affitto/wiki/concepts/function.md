---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/new-affitto_840b29]]"
tags:
  - "term"
aliases:
  - "Firebase Cloud Functions"
  - "Cloud Functions"
---

## Basic Information

- **Type:** concept
- **Subtype:** term
- **Sources:** [[sources/new-affitto_840b29|New Affitto]]

In the context of the Affitti system architecture, **function** refers to Firebase Cloud Functions used as the serverless backend processing layer. These functions serve as the compute middleware between the frontend (hosted on [[concepts/hosting|Firebase Hosting]]) and the [[entities/mongodb-atlas|MongoDB Atlas]] database. They are responsible for processing [[concepts/business-rules|business rules]] and reading data from MongoDB that was previously obtained through the [[concepts/web-scraping-pipeline|web scraping pipeline]].

## Description

Firebase Cloud Functions serve as the backend processing layer in the [[entities/affito|affitti]] system. They are responsible for processing [[concepts/business-rules|business rules]] and reading data from [[entities/mongodb-atlas|MongoDB Atlas]] that was populated by a separate [[concepts/web-scraping-pipeline|web scraping]] process. The functions act as the bridge between the MongoDB data store and the frontend, handling data retrieval and business logic. This serverless approach means the backend logic runs in [[entities/firebase|Firebase]]'s infrastructure without needing dedicated servers. Deployed within the Firebase ecosystem, they complement the [[concepts/hosting|Firebase Hosting]] layer that serves the React/Redux/TypeScript frontend to end users.

## Related Concepts

- [[concepts/business-rules|business rules]] — the logic processed by these functions
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the process that populates MongoDB with data that functions read
- [[concepts/hosting|Firebase Hosting]] — the companion Firebase service that serves the frontend
- [[concepts/redux-state|Redux state]] — client-side state management that interacts with function responses
- [[concepts/typescript|TypeScript]] — the language used to implement business logic within functions
- [[concepts/react|React]] — the frontend framework that communicates with these functions

## Related Entities

- [[entities/firebase|Firebase]] — the platform on which Cloud Functions are deployed
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database from which functions read data
- [[entities/affito|affito]] — the rental system that uses these functions as its backend layer

## Mentions in Source

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "**function** per processare il business rules e legere il dati che il mongoDB has by scrapping at other process."
> - "é usata il: **hosting** per presentare il frontend in typescript , react e redux **function** per processare il business rules"
> - "## Firebase"