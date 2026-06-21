---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "standard"
aliases:
  - "Cross-Origin Resource Sharing"
  - "CORS policy"
  - "CORS restriction"
---

## Definition

Cross-Origin Resource Sharing (CORS) is a browser security mechanism that controls which external domains are permitted to make HTTP requests to a server. In the context of the [[entities/affitti-backend|Affitti Backend API]], CORS is configured to restrict cross-origin API access exclusively to the Firebase Hosting domain associated with the [[entities/affitiudine|affitiudine project]]. This ensures that only the authorized frontend application can interact with the backend API, preventing unauthorized third-party websites from making requests to the endpoints.

## Key Characteristics

- **Domain-restricted access**: CORS is limited to the Firebase Hosting domain, meaning only requests originating from the designated frontend are accepted by the API
- **Non-functional security requirement**: CORS restriction is classified as a non-functional security requirement applied uniformly across all endpoints, including the public stats summary endpoint (FR-8)
- **Hardening milestone task**: CORS configuration is categorized under milestone M5 hardening activities, alongside [[concepts/rate-limiting|rate limiting]], logging, and error model implementation
- **Browser-enforced security**: CORS operates at the browser level via preflight (`OPTIONS`) requests and response headers (e.g., `Access-Control-Allow-Origin`), forming a first line of defense against cross-site request forgery and unauthorized API consumption
- **Complementary to authentication**: While [[concepts/firebase-id-token-verification|Firebase ID token verification]] verifies user identity, CORS restricts the origin of requests, providing defense-in-depth security

## Applications

- **Frontend-backend isolation**: By restricting CORS to the hosting domain, the Affitti Backend ensures that only the official web client deployed on Firebase Hosting can call API endpoints, preventing API abuse from arbitrary origins
- **Public endpoint protection**: Even publicly accessible endpoints such as the stats summary (FR-8) benefit from CORS restrictions, which help absorb and control anonymous traffic when combined with [[concepts/rate-limiting|rate limiting]] and `Cache-Control` headers
- **Production hardening**: CORS configuration is a critical step in the M5 hardening phase, preparing the system for production deployment by closing off cross-origin attack vectors

## Related Concepts

- [[concepts/rate-limiting|Rate limiting]] — co-listed hardening task that complements CORS by throttling per-IP request volume
- [[concepts/firebase-authentication|Firebase Authentication]] — provides user-level authentication, working in tandem with CORS for layered security
- [[concepts/firebase-id-token-verification|Firebase ID token verification]] — verifies Firebase ID tokens at the middleware level, complementing origin-based CORS restrictions with identity-based access control
- [[concepts/x-509-certificate-authentication|X.509 certificate authentication]] — another security mechanism used for service-to-service authentication in the system

## Related Entities

- [[entities/affitti-backend|Affitti Backend API]] — the API layer where CORS policy is enforced
- [[entities/affitiudine|affitiudine project]] — the Firebase project whose hosting domain is the sole allowed CORS origin
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — the runtime environment where CORS middleware is configured

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "CORS restricted to the hosting domain."
> - "Hard requirements: rate limiting (e.g., per-IP), CORS limited to the hosting domain, response cacheable (`Cache-Control`, e.g., 5 min) to absorb anonymous traffic, and no field that identifies an individual listing."