---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "method"
aliases:
  - "Rate limit"
  - "IP-based rate limiting"
  - "Per-IP rate limiting"
---

## Basic Information

- **Type:** concept
- **Subtype:** method
- **Sources:** [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]

## Definition

Rate limiting is a security mechanism that restricts the number of requests a client can make to an API endpoint within a given time window. In the context of the [[entities/affitti-backend|Affitti Backend]], rate limiting is applied on a per-IP-address basis to the public stats summary endpoint (`GET /public/stats/summary`), which is the only unauthenticated endpoint in the system. It serves as a primary defense against abuse from anonymous traffic, working in conjunction with [[concepts/cors|CORS]] restrictions and `Cache-Control` headers to form a layered protection strategy for the single publicly accessible API route.

## Key Characteristics

- **Per-IP enforcement**: Requests are tracked and throttled based on the client's IP address, ensuring that no single anonymous source can overwhelm the endpoint
- **Targets unauthenticated traffic**: Applied specifically because `GET /public/stats/summary` does not require [[concepts/firebase-authentication|Firebase Authentication]], making it the only endpoint exposed to anonymous users
- **Part of a layered defense**: Works alongside CORS restriction (limited to the hosting domain) and response caching (`Cache-Control` with e.g., 5-minute TTL) to absorb and mitigate anonymous traffic
- **Abuse prevention**: Prevents denial-of-service patterns, scraping, and excessive resource consumption on the public endpoint
- **General hardening measure**: Also referenced as a broader hardening task in milestone M5 of the project roadmap
- **Aggregate-only exposure**: The rate-limited endpoint exposes counters only (reading from the [[entities/count|count]] collection), never individual listing data, further reducing the attack surface value

## Applications

- **Public API endpoint protection**: Shields the `GET /public/stats/summary` endpoint from excessive anonymous requests, ensuring availability for legitimate users
- **Resource conservation**: Prevents unnecessary database queries and compute cycles by rejecting requests that exceed the allowed threshold
- **DDoS mitigation**: Acts as a first line of defense against volumetric attacks targeting the only unauthenticated surface of the [[entities/affitti-backend|Affitti Backend]]
- **Fair usage enforcement**: Ensures equitable access to public aggregate statistics by preventing any single IP from monopolizing endpoint capacity

## Related Concepts

- [[concepts/cors|CORS]] — complementary restriction limiting which origins may call the public endpoint
- [[concepts/firebase-authentication|Firebase Authentication]] — the authentication mechanism used on all other (non-public) endpoints, making rate limiting necessary for the one endpoint that bypasses it
- [[concepts/split-collection-architecture|Split Collection Architecture]] — the read-write collection split that underpins the data the public endpoint aggregates

## Related Entities

- [[entities/affitti-backend|Affitti Backend]] — the API layer where rate limiting is implemented
- [[entities/firebase-cloud-functions|Cloud Functions]] — the runtime environment hosting the endpoint where rate limiting is enforced
- [[entities/count|count]] — the collection whose aggregate counters are served by the rate-limited public endpoint

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "**FR-8 (new)** — `GET /public/stats/summary`: returns the same aggregate shape as FR-6 (optionally a reduced subset), without authentication. Hard requirements: rate limiting (e.g., per-IP), CORS limited to the hosting domain, response cacheable (`Cache-Control`, e.g., 5 min) to absorb anonymous traffic, and no field that identifies an individual listing."
> - "GET | `/public/stats/summary` | **none** | **Amendment v0.3:** aggregate-only summary for the public landing page — reads `count`; exposes counters only, never listing data; rate-limited per IP"