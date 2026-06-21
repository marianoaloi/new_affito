---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/function_64f05b]]"
tags:
  - "term"
aliases:
  - "stateMaloi enum"
  - "state maloi"
---

## Description

`stateMaloi` is the core state enumeration used in the [[entities/affitti-backend|Affitti Backend API]] to record a user's evaluation decision on a rental listing. It is a strictly validated field with three permitted integer values representing the user's verdict: `0` ("non buono" / not good), `1` ("buono" / good), and `2` ("così così" / so-so). The field is modeled as a TypeScript enum or union type that is shared between the API layer and the frontend via the [[concepts/shared-types-package|shared types package]], ensuring type-safe consistency across the stack. Any value submitted outside this three-value enum results in a `400 Bad Request` response. When a `stateMaloi` update is performed, the system simultaneously records the timestamp ([[concepts/mlastupdate|mLastUpdate]]) and the user's email ([[concepts/userupdate|userUpdate]]) as part of the [[concepts/audit-trail|audit trail]] mechanism. The field can be updated individually for a single property or in bulk for multiple properties simultaneously via the [[concepts/bulkstatemaloi|BulkStateMaloi]] operation, and it appears across multiple collections ([[entities/affitto_data|affitto_data]], [[entities/affito|affito]], [[entities/feature|feature]], [[entities/count|count]]) as the central classification mechanism within the [[entities/affitiudine|affitiudine]] system. In the [[concepts/analisi|analysis feature]] aggregation pipeline, `stateMaloi` is projected as a top-level attribute from the [[entities/affito|affito]] collection alongside `_id`, `type`, and the `realEstate` object (which includes [[concepts/powerproperties|powerproperties]], `title`, and `price`), making it directly available to the frontend for filtering and display purposes.

## Key Characteristics

- **Three-value enum**: `0 = non buono` (not good), `1 = buono` (good), `2 = così così` (so-so)
- **Strict validation**: Any value not in `{0, 1, 2}` triggers a `400 Bad Request` HTTP error
- **TypeScript enum/union**: Modeled as a shared TS type between the backend API and the frontend client via the [[concepts/shared-types-package|shared types package]], ensuring compile-time safety
- **User-writable field**: One of only two fields (alongside `description`) that a user can directly modify on a listing, governed by the [[concepts/write-whitelist|write whitelist]] rule — updates require a valid access token
- **Dedicated endpoint**: Individual updates are performed via `PATCH /listings/:id/state` with body `{ stateMaloi: 0 | 1 | 2 }`
- **Supports bulk operations**: Can be updated individually per listing or in bulk (via [[concepts/bulk-state-update|bulk state update]] / [[concepts/bulkstatemaloi|BulkStateMaloi]], max 500 items per request) for rapid triage
- **Atomic audit fields**: Each update atomically sets `stateMaloi`, [[concepts/mlastupdate|mLastUpdate]] (epoch seconds), and [[concepts/userupdate|userUpdate]] (user email) in a single `$set` operation
- **Cross-collection presence**: Appears as a field in the [[entities/affito|affito]], [[entities/affitto_data|affitto_data]], [[entities/count|count]], and [[entities/feature|feature]] collections, making it the central classification mechanism across the [[entities/affitiudine|affitiudine]] system
- **Aggregation pipeline projection**: Projected as a top-level field in the [[entities/affito|affito]] collection's `$project` stage, alongside `_id`, `type`, and the `realEstate` object containing [[concepts/powerproperties|powerproperties]], [[concepts/title|title]], and price
- **Unresolved mapping question (Q4)**: There is an open design question regarding how `stateMaloi` values (`0`, `1`, `2`) map to counter names in the [[entities/count|count]] collection (`accept`, `deny`, `wait`). The exact correspondence has not yet been finalized in the PRD

## Applications

- **Listing evaluation workflow**: Users evaluate rental listings scraped into the system and assign a `stateMaloi` value to categorize each listing according to their interest level
- **Bulk triage**: When processing large numbers of new listings, users can apply `stateMaloi` in bulk (up to 500 listings per request) to rapidly triage listings
- **Aggregation and counting**: The `stateMaloi` values feed into aggregate counters stored in the [[entities/count|count]] collection, enabling dashboard-level summaries of how many listings have been accepted, denied, or marked as tentative
- **Frontend filtering**: Since the enum is shared with the frontend, it enables type-safe filtering and display of listings by evaluation state
- **Analysis feature data projection**: In the [[concepts/analisi|analysis feature]], the aggregation pipeline projects `stateMaloi` as a top-level attribute from the [[entities/affito|affito]] collection, making it directly available for the frontend [[concepts/analisi-page|analysis page]] presentation
- **Audit trail**: Each `stateMaloi` update is subject to the [[concepts/audit-trail|audit trail]] rule, ensuring that state changes are traceable via [[concepts/mlastupdate|mLastUpdate]] and [[concepts/userupdate|userUpdate]] fields
- **Feature analysis**: The `stateMaloi` classification feeds into the [[entities/feature|feature]] collection, supporting the [[concepts/feature-analysis|feature analysis]] view for decision-making insights

## Related Concepts

- [[concepts/read-after-write-consistency|Read-after-write consistency]] — relevant to ensuring that after a `stateMaloi` update, the user immediately sees the updated state
- [[concepts/soft-delete|Soft delete]] — related data lifecycle pattern used in the same system
- [[concepts/bulk-state-update|Bulk state update]] — the bulk operation endpoint that applies `stateMaloi` to up to 500 listings at once
- [[concepts/bulkstatemaloi|BulkStateMaloi]] — the specific bulk operation for applying `stateMaloi` to multiple listings simultaneously
- [[concepts/audit-trail|Audit trail]] — traceability rule applied to state changes; [[concepts/mlastupdate|mLastUpdate]] and [[concepts/userupdate|userUpdate]] are set atomically with each `stateMaloi` update
- [[concepts/write-whitelist|Write whitelist]] — the business rule restricting user-writable fields to `stateMaloi` and `description`, enforced via access token validation
- [[concepts/firebase-id-token-verification|Firebase ID token verification]] — the authentication mechanism that validates the access token required for `stateMaloi` modifications
- [[concepts/feature-analysis|Feature analysis]] — the analysis view that consumes `stateMaloi` classifications from the feature collection
- [[concepts/split-collection-architecture|Split-collection architecture]] — the architectural pattern explaining why `stateMaloi` appears across multiple collections
- [[concepts/mlastupdate|mLastUpdate]] — the timestamp field atomically set alongside `stateMaloi` on each update
- [[concepts/userupdate|userUpdate]] — the user email field atomically set alongside `stateMaloi` on each update
- [[concepts/shared-types-package|Shared types package]] — the TS types package that shares the `stateMaloi` enum/union between backend and frontend
- [[concepts/powerproperties|powerproperties]] — the properties field projected alongside `stateMaloi` in the affito aggregation pipeline
- [[concepts/analisi|Analysis feature]] — the feature whose aggregation pipeline projects `stateMaloi` as a top-level attribute for frontend consumption
- [[concepts/title|title]] — the listing title field projected alongside `stateMaloi` in the aggregation output

## Related Entities

- [[entities/affito|affito]] — the collection containing rental listing documents where `stateMaloi` is stored as a field and projected in the aggregation pipeline
- [[entities/affitto_data|affitto_data]] — the related data collection where `stateMaloi` also appears as a field
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that validates and processes `stateMaloi` updates
- [[entities/count|count]] — the aggregation collection whose counter names (`accept`/`deny`/`wait`) have an unresolved mapping to `stateMaloi` values
- [[entities/feature|feature]] — the feature collection where `stateMaloi` is present for analysis purposes
- [[entities/affitiudine|affitiudine]] — the Firebase project encompassing the entire system where `stateMaloi` serves as the central classification mechanism

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "**BR-1 — State enum.** `stateMaloi`: `0 = non buono`, `1 = buono`, `2 = così così`. Any other value → `400 Bad Request`. Modeled as a TS enum/union shared with the frontend."
> - "the user evaluates listings and records a verdict (`stateMaloi`) and personal notes (`description`)."
> - "**FR-4** `PATCH /listings/:id/state` — body `{ stateMaloi: 0 | 1 | 2 }`."

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "stateMaloi: salva il stato que ho deciso 0 (non buono) 1 (buono) 2 (cosi cosi)"
> - "con questo so puoi fare alterazione nel dati di statoMaloi e description se la richiesta tenere un token di accesso."
> - "{ $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } }"

> **Source: [[sources/function_64f05b|function]]**
> - "$project": { "_id": 1, "stateMaloi": 1, "type": 1, "realEstate": { "properties": "$powerproperties", "title": 1, "price": 1 } }
> - "Deve prendere il dati e passare per API al frontend query e collection "affito""