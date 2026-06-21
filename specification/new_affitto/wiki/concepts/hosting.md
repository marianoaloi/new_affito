---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/new-affitto_840b29]]"
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "term"
aliases:
  - "Firebase Hosting"
  - "hosting service"
---

## Description

Firebase Hosting is one of the two main Firebase services employed in the Affitti system architecture, alongside [[concepts/function|Cloud Functions]], and is responsible for delivering the user-facing interface that displays rental data sourced from a MongoDB database via a web scraping pipeline. It acts as the delivery mechanism for the user interface, providing the web hosting infrastructure that makes the frontend accessible to users without requiring the management of separate web servers. The hosted frontend presents rental (affitti) data retrieved from the backend database through various views including table, map, and analysis pages. Firebase Hosting handles deployment and delivery of compiled frontend assets, leveraging Firebase's global CDN for performant page loads. It is part of the same Firebase project ('affitiudine') used for authentication and cloud functions, integrating naturally with the rest of the Firebase ecosystem used throughout the Affitti project stack. The React SPA is deployed to Firebase Hosting as the final milestone (M5) of the frontend development process, which includes polishing, responsive design passes, and accessibility checks prior to deployment.

## Key Characteristics

- **Static file serving**: Provides hosting infrastructure for serving compiled frontend assets (HTML, CSS, JavaScript bundles)
- **Firebase integration**: Operates as part of the broader Firebase ecosystem within the same project ('affitiudine'), complementing Cloud Functions and Firebase Authentication
- **Frontend technology stack**: Serves an application built with [[concepts/typescript|TypeScript]], [[concepts/react|React]], and [[concepts/redux-state|Redux]]
- **Deployment infrastructure**: Handles deployment and delivery of the web application to end users
- **Data presentation layer**: Acts as the presentation tier that displays rental (affitti) data retrieved from the backend database
- **Serverless hosting**: Eliminates the need for managing separate web servers
- **Milestone-driven deployment**: Deployment to Firebase Hosting is the final step (M5) in the frontend development lifecycle, following polish, responsive, and accessibility passes

## Applications

- Serving the Affitti rental data web application to end users
- Providing a deployment target for the React/Redux frontend during the CI/CD process
- Delivering static assets with Firebase's global CDN for performant page loads
- Hosting the various frontend pages including the table view ([[concepts/tabella-page|Tabella Page]]), map view ([[concepts/mappa-page|Map Page]]), and analysis view ([[concepts/analisi-page|Analysis Page]])
- Production deployment target for the Affitti Frontend v1 SPA as part of the M5 milestone

## Related Concepts

- [[concepts/typescript|TypeScript]] — language used to build the hosted frontend application
- [[concepts/react|React]] — UI library used in the hosted frontend application
- [[concepts/redux-state|Redux]] — state management used in the hosted frontend application
- [[concepts/function|Cloud Functions]] — the other Firebase service used alongside Hosting in the system architecture
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the data ingestion pipeline that feeds rental data to the system displayed by the hosted frontend
- [[concepts/firebaseconfig|Firebase Configuration]] — configuration object used to initialize Firebase services including Hosting
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — authentication requirements for accessing the hosted application
- [[concepts/login|Firebase Authentication]] — authentication service within the same Firebase project used alongside Hosting
- [[concepts/tabella-page|Tabella Page]] — one of the frontend pages served via hosting
- [[concepts/mappa-page|Map Page]] — map view page served via hosting
- [[concepts/analisi-page|Analysis Page]] — analysis page served via hosting
- [[concepts/business-rules|Business Rules]] — business logic that interacts with the hosted frontend

## Related Entities

- [[entities/firebase|Firebase]] — the platform providing the Hosting service
- [[entities/affitiudine|affitiudine]] — the specific Firebase project that includes Hosting alongside authentication and cloud functions

## Mentions in Source

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "é usata il: **hosting** per presentare il frontend in typescript , react e redux"
> - "Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato."
> - "## Firebase"

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|Affitti Frontend PRD v0.2]]**
> - "Firebase Hosting (same project)"
> - "M5 — Polish | Placeholders (FR-16), responsive pass, a11y pass, deploy to Firebase Hosting"