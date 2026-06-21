---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "project"
aliases:
  - "Firebase project affitiudine"
  - "affitiudine project"
---

## Related Entities

- [[entities/firebase-cloud-functions|Cloud Functions]] — compute layer deployed within this Firebase project
- [[entities/affitti-backend|Affitti Backend API]] — the API layer hosted on this project's Cloud Functions
- [[entities/mongodb-atlas|MongoDB Atlas]] — external database service used by the backend
- [[entities/udine|Udine]] — MongoDB database used by the system for rental data storage; also the target geographic area in Italy
- [[entities/affitto_data|affitto_data]] — collection storing scraped rental property data
- [[entities/count|count]] — collection used within the system
- [[entities/feature|feature]] — collection for feature analysis data
- [[entities/google-auth-provider|GoogleAuthProvider]] — Google authentication provider used for user login
- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — frontend web application hosted on this Firebase project

## Related Concepts

- [[concepts/firebase-authentication|Firebase Authentication]] — authentication service provided by this project using Google provider for user verification
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — authentication requirement controlling access to protected pages within the application
- [[concepts/tabella-page|Tabella Page]] — authenticated page within the frontend application hosted on this project
- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] — unauthenticated page accessible without login within the frontend application
- [[concepts/statemaloi|stateMaloi]] — state enum used for rental listing evaluation workflow
- [[concepts/bulk-state-update|bulk-state]] — bulk state update functionality within the system
- [[concepts/x-509-certificate-authentication|X.509 certificate auth]] — certificate-based authentication used for secure service connections
- [[concepts/bulkstatemaloi|Bulk State Update]] — bulk state update operation within the system
- [[concepts/react-and-redux-frontend|React/Redux UI]] — frontend application hosted on this Firebase project
- [[concepts/firebaseconfig|firebaseConfig]] — Firebase configuration object containing project credentials and domain settings
- [[concepts/mappa-page|Mappa Page]] — map page displaying property data geographically
- [[concepts/hosting|Firebase Hosting]] — hosting service serving the frontend web application under this project

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|Affitti Backend PRD v0.3]]**
> - "Compute | Firebase Cloud Functions (project **`affitiudine`**)"
> - "Hosting | Firebase Hosting (frontend; out of scope here)"
> - "Auth | Firebase Authentication, Google provider; backend verifies Firebase ID tokens"

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "**projectID nel firebase** : affitiudine"
> - "Il sistema sta usando la piattaforma di firebase google per ospedare il hosting e function , anche la sicuranza è dello firebase con autenticazione provide per il google." *(The system uses Google's Firebase platform to host the hosting and functions; security is also handled by Firebase with Google provider authentication.)*
> - "Voglio creare uno PRD per un nuovo sistema interno di affitto." *(I want to create a PRD for a new internal rental system.)*

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD New Affito FrontEnd Table]]**
> - "informacione del projeto frondend per acessare il firebase autentication." *(Frontend project information for accessing Firebase authentication.)*
> - "projectId: \"affitiudine\","
> - "authDomain: \"affitiudine.firebaseapp.com\","
> - "storageBucket: \"affitiudine.firebasestorage.app\","

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|Affitti Frontend PRD v0.2]]**
> - "Auth | Firebase Authentication — `GoogleAuthProvider` (config provided for project `affitiudine`)"
> - "Hosting | Firebase Hosting (same project)"
> - "Note: the Firebase web config (apiKey, appId, …) is client-side configuration and not a secret, but it should live in environment config files, not hard-coded in components."