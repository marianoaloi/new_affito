---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "method"
aliases:
  - "Token verification middleware"
  - "Firebase token verification"
  - "Firebase ID token auth"
---

## Description

Firebase ID token verification is the authentication mechanism used by the [[entities/affitti-backend|Affitti Backend API]] to secure API endpoints. It relies on the Firebase Admin SDK to verify ID tokens issued by [[concepts/firebase-authentication|Firebase Authentication]] after a user authenticates via the Google provider. The verified token extracts the user's email address, which is then used to populate the [[concepts/userupdate|userUpdate]] field for the [[concepts/audit-trail|audit trail]] (BR-2). All endpoints require a valid Firebase ID token except for the public stats summary endpoint (`GET /public/stats/summary`). Unauthenticated requests to any protected endpoint receive a `401` HTTP response. The decision to enforce token verification on all endpoints — both reads and writes — was explicitly resolved as Q3, confirming that no anonymous or viewer access is permitted apart from the single public summary endpoint introduced in v0.3. The token verification mechanism also specifically authorizes write operations on data fields such as `stateMaloi` and `description`, ensuring that only requests bearing a valid Firebase access token can modify these fields. The security infrastructure is hosted entirely on the Firebase Google platform, which provides both hosting and Cloud Functions alongside the authentication layer configured for the Google sign-in provider under the [[entities/affitiudine|affitiudine project]].

## Key Characteristics

- **Universal enforcement**: Token verification is applied to every endpoint, with the single exception of `GET /public/stats/summary`
- **No anonymous/viewer access (Q3 resolved)**: A deliberate architectural decision was made that all endpoints — reads and writes alike — require a verified Firebase ID token, with no anonymous or viewer-level access permitted
- **Firebase Admin SDK**: Verification is performed server-side using the Firebase Admin SDK, ensuring tokens are validated against Firebase's infrastructure rather than being decoded locally without verification
- **Google provider flow**: Tokens are issued after the user authenticates through the Google provider configured in [[concepts/firebase-authentication|Firebase Authentication]]
- **User identity extraction**: The verified token provides the authenticated user's email, which serves as the identity for audit trail purposes via the [[concepts/userupdate|userUpdate]] field
- **401 response for unauthenticated requests**: Any request to a protected endpoint that lacks a valid token or presents an expired/invalid token receives an HTTP `401 Unauthorized` response
- **Foundation deliverable**: Token verification middleware is classified as a milestone M1 (foundation) deliverable, indicating it is a prerequisite for all subsequent feature work
- **Write operation authorization**: The token specifically gates write operations on fields such as `stateMaloi` and `description`, preventing unauthorized data modification

## Applications

- **API endpoint protection**: Ensures that only authenticated users can access read and write operations on the [[entities/affitti-backend|Affitti Backend API]]
- **Audit trail population**: Provides the verified user email used to populate the [[concepts/userupdate|userUpdate]] field required by the [[concepts/audit-trail|audit trail]] business rule (BR-2)
- **Middleware architecture**: Implemented as reusable middleware that runs before endpoint handlers, centralizing authentication logic and reducing code duplication across all route definitions
- **Integration with Firebase ecosystem**: Works within the [[entities/affitiudine|affitiudine project]] Firebase infrastructure, leveraging [[entities/firebase-cloud-functions|Cloud Functions]] as the runtime environment
- **Write protection for data fields**: Secures write operations on specific data fields (e.g., [[concepts/bulkstatemaloi|stateMaloi]], [[concepts/description-update|description]]) by requiring a valid access token before any modification is permitted

## Related Concepts

- [[concepts/firebase-authentication|Firebase Authentication]] — the authentication service that issues the ID tokens verified by this mechanism
- [[concepts/audit-trail|audit trail]] — uses the email extracted from the verified token for the `userUpdate` field
- [[concepts/rate-limiting|Rate limiting]] — complementary security mechanism applied at the API layer
- [[concepts/x-509-certificate-authentication|X.509 certificate authentication]] — alternative authentication method used for service-to-service communication
- [[concepts/userupdate|userUpdate]] — the field populated with the authenticated user's email extracted from the verified token
- [[concepts/bulkstatemaloi|BulkStateMaloi]] — one of the write operations protected by token verification
- [[concepts/description-update|description update]] — write operation on the description field gated by token verification

## Related Entities

- [[entities/affitti-backend|Affitti Backend API]] — the API layer where token verification middleware is deployed
- [[entities/firebase-cloud-functions|Cloud Functions]] — the runtime environment executing the verification logic
- [[entities/affitiudine|affitiudine project]] — the Firebase project under which authentication is configured

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "Verify Firebase ID token on **every** endpoint (Admin SDK), reads included."
> - "All endpoints verify the Firebase ID token, with the **single exception** of `GET /public/stats/summary` (Frontend PRD Q1 decision). Unauthenticated requests to any other endpoint receive `401`."
> - "**Decision (Q3, resolved):** *all* endpoints — reads and writes — require a verified Firebase ID token. There is no anonymous/viewer access."

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "con questo so puoi fare alterazione nel dati di statoMaloi e description se la richiesta tenere un token di accesso."
> - "Il sistema sta usando la piattaforma di firebase google per ospedare il hosting e function , anche la sicuranza è dello firebase con autenticazione provide per il google."