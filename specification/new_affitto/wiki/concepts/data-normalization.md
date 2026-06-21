---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "method"
aliases:
  - "BR-4 normalization"
  - "BSON data normalization"
  - "Data normalization"
  - "Data normalization (BR-4)"
---

## Definition

Data normalization (BR-4) is a business rule in the [[entities/affitti-backend|Affitti Backend]] TypeScript service layer that cleans raw BSON data artifacts before sending responses to the frontend. The raw MongoDB schema permits `Double` extended values such as `NaN` and `Infinity`, as well as mixed-type unions like `number | integer | null` for fields such as `elevation` and `mLastImmobiliareUpdate`. The API layer normalizes all such values to `number | null`, ensuring the frontend never has to handle BSON-specific artifacts. This normalization is enforced in the service layer as part of goal G5, which mandates that all business rules be implemented in typed TypeScript rather than in the frontend or raw database queries.

## Key Characteristics

- **BSON artifact removal**: Strips MongoDB/BSON-specific extended numeric values (`NaN`, `Infinity`) that are valid in the raw database schema but problematic for frontend consumption
- **Type union simplification**: Collapses mixed-type unions (`number | integer | null`) into a consistent `number | null` representation
- **Service-layer enforcement**: Applied within the TypeScript service layer, not at the database query level or in the frontend, following the G5 architectural goal
- **Transparent to frontend**: The frontend receives clean, predictable data types without needing awareness of the underlying BSON storage format
- **Part of the Slim DTO pipeline**: Works in conjunction with [[concepts/slim-dto|Slim DTO]] to ensure API responses are both minimal and type-safe
- **Full detail endpoint integration**: Specifically applied during DTO transformation for the `GET /listings/:id` endpoint (FR-2), ensuring the full detail response is free of raw `Double`/`NaN` artifacts

## Applications

- **API response sanitization**: Every response from the [[entities/affitti-backend|Affitti Backend]] that includes numeric fields from the [[entities/affitto_data|affitto_data]] collection passes through this normalization step
- **Elevation field handling**: The `elevation` field in [[entities/affitto_data|affitto_data]] may contain BSON `Double` artifacts that are normalized to plain `number | null`
- **Timestamp normalization**: Fields like `mLastImmobiliareUpdate` with `number | integer | null` unions are collapsed to `number | null`
- **Frontend reliability**: Prevents runtime errors or unexpected behavior in the frontend caused by JavaScript's handling of `NaN` and `Infinity` values received from the API
- **Single-listing detail endpoint**: The `GET /listings/:id` endpoint (FR-2) returns a normalized DTO where raw `Double`/`NaN` artifacts are cleaned per BR-4 as part of the DTO transformation process

## Related Concepts

- [[concepts/slim-dto|Slim DTO]]

## Related Entities

- [[entities/affitto_data|affitto_data]]
- [[entities/affitti-backend|Affitti Backend]]
- [[entities/mongodb-atlas|MongoDB Atlas]]

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]**
> - "**BR-4 — Data normalization.** The raw schema allows `Double` extended values (`NaN`, `Infinity`) and `number | integer | null` unions (e.g., `elevation`, `mLastImmobiliareUpdate`). The API layer normalizes these to `number | null` so the frontend never handles BSON artifacts."
> - "`GET /listings/:id` — full detail of one listing (normalized DTO; raw `Double`/`NaN` artifacts cleaned per BR-4)."