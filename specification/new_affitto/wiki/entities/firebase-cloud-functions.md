---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "product"
aliases:
  - "Cloud Functions"
  - "Firebase Functions"
  - "GCF"
---

## Description
Firebase Cloud Functions is a serverless compute platform provided by Google as part of the Firebase ecosystem. In the context of the Affitti Backend API, it serves as the primary compute layer, hosting the backend functions within the Firebase project **`affitiudine`**. The platform is used alongside Firebase Hosting, which serves the static frontend, forming a unified deployment architecture for both the [[concepts/react-and-redux-frontend|React/Redux frontend]] and the backend API. The functions run on a Node.js runtime with TypeScript, executing business rules that handle API read and write operations, connect to [[entities/mongodb-atlas|MongoDB Atlas]] (including [[concepts/data-aggregation|data aggregation]] pipelines), and verify [[concepts/firebase-authentication|Firebase Authentication]] tokens. A notable operational concern is [[concepts/cold-start|cold start]] latency, catalogued as risk **R4** in the PRD, which may degrade perceived performance on the first request after a period of inactivity. The target performance is P95 under 800ms for listing endpoints, excluding cold starts. The PRD recommends reusing the [[entities/mongodb-atlas|MongoDB Atlas]] client connection across function invocations to mitigate performance overhead, and suggests configuring minimum instances if cold starts become a persistent issue.

## Related Entities
- [[entities/affitiudine|affitiudine]] — The Firebase project under which the Cloud Functions are deployed
- [[entities/mongodb-atlas|MongoDB Atlas]] — The database service whose client is reused across function invocations for performance
- [[entities/affitti-backend|Affitti Backend]] — The API layer hosted on Firebase Cloud Functions

## Related Concepts
- [[concepts/firebase-authentication|Firebase Authentication]] — Authentication mechanism used alongside Cloud Functions in the Affitti backend architecture
- [[concepts/statemaloi|stateMaloi]] — Enumeration concept related to the data model handled by the Cloud Functions
- [[concepts/data-aggregation|Data Aggregation]] — Aggregation pipelines used within Cloud Functions to prepare and present raw data
- [[concepts/cold-start|Cold Start]] — Operational latency concern for serverless function invocations after periods of inactivity
- [[concepts/react-and-redux-frontend|React/Redux Frontend]] — The static frontend hosted alongside Cloud Functions on the Firebase platform

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|Affitti Backend PRD v0.3]]**
> - "Compute | Firebase Cloud Functions (project **`affitiudine`**)"
> - "**R4** — Cold starts on Cloud Functions may hurt perceived performance for the first request; consider min instances if it becomes an issue."

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "Il sistema sta usando la piattaforma di firebase google per ospedare il hosting e function" *(The system is using Google's Firebase platform to host the hosting and functions)*
> - "voglio un sistema per preparare e presentare il dado crudo con aggregation e typescript business rules per la API" *(I want a system to prepare and present the raw data with aggregation and TypeScript business rules for the API)*