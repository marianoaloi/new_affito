---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "method"
aliases:
  - "Firebase Auth"
  - "Firebase Authentication with Google Provider"
  - "Firebase Authentication"
  - "Firebase authentication with Google provider"
  - "firebase autentication"
---

## Definition

Firebase Authentication with Google provider is the security mechanism used to protect the [[entities/affitti-backend|Affitti Backend API]] and to manage user identity across the [[entities/affitiudine|affitiudine project]] platform, including the frontend. It enforces token-based authentication on all API endpoints by requiring a verified Firebase ID token, which the backend validates using the Firebase Admin SDK. User identity extracted from the verified token is used for audit trails, with the authenticated user's email recorded on every write operation. A single public endpoint — `GET /public/stats/summary` — is exempt from authentication, as introduced in the v0.3 amendment of the PRD. The Q3 decision has been resolved: all endpoints — reads and writes — require a verified Firebase ID token, with no anonymous or viewer access permitted.

## Description

Firebase Authentication with Google provider serves as the core identity management layer for both the backend API and the frontend application within the [[entities/affitiudine|affitiudine project]]. On the backend, it enforces token verification on every request using the Firebase Admin SDK, gating both read and write operations behind a valid Firebase ID token. On the frontend, the application accesses Firebase Authentication through a specific [[concepts/firebaseconfig|firebaseConfig]] configuration object and the GoogleAuthProvider for Google-based sign-in, with the `authDomain` set to `affitiudine.firebaseapp.com`. The frontend presents a [[concepts/login|login]] button in the upper-right corner, which after successful authentication displays the user's profile photo, determining whether users can access protected pages (such as [[concepts/tabella-page|Tabella Page]], [[concepts/analisi-page|Analysis Page]], and [[concepts/mappa-page|Map Page]]) or are limited to the [[concepts/senza-autenticazioni-page|unauthenticated summary view]]. On write operations, the authenticated user's email — extracted from the verified token, never from the request body — is recorded in the [[concepts/userupdate|userUpdate]] field for audit trail purposes. A two-tier security model is employed: Firebase Authentication secures the client-to-API layer, while [[concepts/x-509-certificate-authentication|X.509 certificate authentication]] secures the backend-to-database connection.

## Key Characteristics

- **Google provider-based**: Authentication is handled through Google accounts via the Firebase Authentication service, with the entire [[entities/affitiudine|affitiudine project]] platform — including hosting, functions, and security — relying on Firebase with Google as the identity provider
- **Token verification on every request**: The backend verifies Firebase ID tokens on all endpoints (both reads and writes) using the Firebase Admin SDK, with the sole exception of the public stats summary endpoint
- **Frontend login integration**: The frontend accesses Firebase Authentication via a [[concepts/firebaseconfig|firebaseConfig]] object and GoogleAuthProvider, presenting a [[concepts/login|login]] button in the upper-right corner; after authentication, the user's profile photo is displayed in the button
- **Frontend access gating**: Authentication state determines whether users can access protected pages or are limited to the [[concepts/senza-autenticazioni-page|unauthenticated summary view]], making it the [[concepts/autenticazione-necessaria|core authentication requirement]] for the frontend
- **Write operation gating**: Only authenticated requests containing a valid access token can modify [[concepts/statemaloi|stateMaloi]] and description fields, enforcing that data mutations are restricted to verified users
- **Audit trail integration**: The authenticated user's email, extracted from the verified token, is recorded in the [[concepts/userupdate|userUpdate]] field on every write operation to maintain a complete audit trail (BR-2); the email is never taken from the request body
- **Single public exception**: The `GET /public/stats/summary` endpoint is the only route that does not require authentication, added in the v0.3 PRD amendment
- **Q3 resolved — no anonymous access**: The previously open question (Q3) on whether an email allowlist should be layered on top of token verification has been resolved: all endpoints require a verified Firebase ID token, and there is no anonymous/viewer access
- **Two-tier security model**: Firebase Authentication secures the client-to-API layer, while [[concepts/x-509-certificate-authentication|X.509 certificate authentication]] secures the backend-to-database connection, creating complementary security tiers
- **Hosted under Firebase project**: Authentication is configured within the [[entities/affitiudine|affitiudine project]] Firebase project, with `authDomain` set to `affitiudine.firebaseapp.com`

## Applications

- **API endpoint protection**: Ensures that only authenticated users with valid Firebase ID tokens can access the Affitti Backend API's protected endpoints
- **Frontend access control**: Determines whether users can navigate to protected pages (table, analysis, map) or are restricted to the [[concepts/senza-autenticazioni-page|unauthenticated summary view]], acting as the [[concepts/autenticazione-necessaria|required authentication]] gate
- **Write operation auditing**: Provides a reliable identity source for recording who performed each data modification via the [[concepts/userupdate|userUpdate]] field, supporting accountability and traceability
- **Serverless security integration**: Works in conjunction with [[entities/firebase-cloud-functions|Cloud Functions]] to secure the serverless backend without requiring a custom authentication infrastructure
- **Frontend user experience**: Enables personalized UI elements such as displaying the authenticated user's profile photo in the login button after sign-in
- **Complementary to certificate-based auth**: Can be understood alongside [[concepts/x-509-certificate-authentication|X.509 certificate authentication]], which secures the connection between the backend and database layer, whereas Firebase Authentication secures the client-to-API layer

## Related Concepts

- [[concepts/statemaloi|stateMaloi]]
- [[concepts/x-509-certificate-authentication|X.509 certificate authentication]]
- [[concepts/audit-trail|Audit trail rule]]
- [[concepts/firebase-id-token-verification|Firebase token verification]]
- [[concepts/write-whitelist|Write whitelist rule]]
- [[concepts/userupdate|userUpdate]]
- [[concepts/firebaseconfig|firebaseConfig]]
- [[concepts/login|login]]
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]]
- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]]
- [[concepts/count-without-autentication|Count Without Authentication]]

## Related Entities

- [[entities/affitiudine|affitiudine project]] — The Firebase project under which authentication, hosting, functions, and security are configured (authDomain: affitiudine.firebaseapp.com)
- [[entities/firebase-cloud-functions|Cloud Functions]] — The serverless compute layer that enforces token verification on incoming requests
- [[entities/affitti-backend|Affitti Backend API]] — The API layer protected by Firebase Authentication

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|prd_affitti_backend_v0-3_1d90fc]]**
> - "Auth | Firebase Authentication, Google provider; backend verifies Firebase ID tokens"
> - "Verify Firebase ID token on **every** endpoint (Admin SDK), reads included."
> - "**Decision (Q3, resolved):** *all* endpoints — reads and writes — require a verified Firebase ID token. There is no anonymous/viewer access."

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - "Il sistema sta usando la piattaforma di firebase google per ospedare il hosting e function , anche la sicuranza è dello firebase con autenticazione provide per il google."
> - "con questo so puoi fare alterazione nel dati di statoMaloi e description se la richiesta tenere un token di accesso."

> **Source: [[sources/prd-new-affito-frontend-table_a86812|prd-new-affito-frontend-table_a86812]]**
> - "informacione del projeto frondend per acessare il firebase autentication."
> - "Nel canto superiore destro deve avere la possibilità di fare login. Dopo logado deve presentare la foto dela persona nel botano."