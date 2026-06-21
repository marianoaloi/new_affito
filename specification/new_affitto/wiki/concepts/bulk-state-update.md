---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "method"
aliases:
  - "bulk-state"
  - "FR-5"
---

## Description

Bulk state update is a write operation (**FR-5**) exposed by the [[entities/affitti-backend|Affitti Backend]] as `POST /listings/bulk-state`. It accepts a JSON body containing an array of integer IDs and a [[concepts/statemaloi|stateMaloi]] value (`0`, `1`, or `2`), applying the specified state to all matching documents in the [[entities/affito|affito]] collection within the [[entities/udine|udine]] database. The endpoint returns matched and modified counts, enabling an [[concepts/evaluator|evaluator]] to efficiently process large batches of listings without issuing individual update calls. The maximum batch size is **500** IDs per request. The operation is designed to be idempotent — sending the same payload multiple times produces the same end state without side effects. The endpoint requires [[concepts/firebase-authentication|Firebase Authentication]], ensuring that only authenticated users can perform bulk state transitions.

## Key Characteristics

- **Batch endpoint**: Accepts up to **500** listing IDs per request (assumed maximum batch size)
- **Payload structure**: `{ ids: number[], stateMaloi: 0 | 1 | 2 }` — a compact body containing the target IDs and the desired state value
- **Response format**: Returns `matched` and `modified` counts, allowing the caller to verify how many documents were affected
- **Idempotency**: Sending the same payload multiple times produces the same end state — repeated calls do not cause side effects or data corruption
- **Structured error responses**: Errors are returned in a standardised `{ code, message }` format
- **Authentication required**: The endpoint requires [[concepts/firebase-id-token-verification|Firebase ID token verification]], ensuring only authenticated users can invoke bulk updates
- **Audit trail compliance**: All writes include audit trail fields as required by BR-2, recording who changed what and when
- **Write whitelist compliance**: Fields modified are governed by the [[concepts/write-whitelist|write whitelist]] (BR-5)
- **Target collection**: All updates are performed against the [[entities/affito|affito]] collection within the [[entities/udine|udine]] database

## Applications

- **Batch evaluation workflows**: An [[concepts/evaluator|evaluator]] reviewing listings can approve, reject, or reset the state of hundreds of listings in a single action, dramatically reducing the number of API calls required
- **Pipeline automation**: Automated scripts or scheduled jobs can bulk-transition listings through decision states as part of a data processing pipeline
- **Administrative corrections**: When a set of listings needs to be re-evaluated or rolled back to a previous state, the bulk endpoint allows mass correction in one atomic-style request

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — the decision-state enum (`0`, `1`, `2`) that this operation sets
- [[concepts/audit-trail|Audit trail]] — BR-2 requirement mandating that all writes record change metadata
- [[concepts/read-after-write-consistency|read-after-write-consistency]] — consistency guarantee relevant when reading data immediately after a bulk update
- [[concepts/soft-delete|soft-delete]] — another write-pattern defined in the same PRD for logical deletion
- [[concepts/slim-dto|slim-dto]] — the DTO shape used when returning listing data after updates
- [[concepts/write-whitelist|write whitelist]] — BR-5 rule governing which fields are permitted in write operations
- [[concepts/firebase-id-token-verification|Firebase ID token verification]] — authentication middleware required to access the endpoint
- [[concepts/firebase-authentication|Firebase Authentication]] — the authentication layer protecting this endpoint
- [[concepts/evaluator|evaluator]] — the primary user persona performing bulk state transitions

## Related Entities

- [[entities/affito|affito]] — the MongoDB collection targeted by bulk state updates
- [[entities/affitti-backend|Affitti Backend]] — the API service that exposes the `POST /listings/bulk-state` endpoint
- [[entities/udine|udine]] — the MongoDB database containing the affito collection
- [[entities/mongodb-atlas|MongoDB Atlas]] — the cloud database platform hosting the data layer

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]**
> - **FR-5** `POST /listings/bulk-state` — body `{ ids: number[], stateMaloi: 0 | 1 | 2 }`. Max batch size 500 *(assumption)*; returns matched/modified counts.
> - Bulk updates are idempotent (same payload → same end state). Structured error responses `{ code, message }`.