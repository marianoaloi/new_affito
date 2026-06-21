---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "method"
aliases:
  - "Bulk State Update"
  - "BulkStateMaloi operation"
---

## Description

BulkStateMaloi is a batch API operation within the [[entities/affitti-backend|Affitti Backend API]] that enables setting the same [[concepts/statemaloi|stateMaloi]] evaluation value for multiple rental properties in a single request. It constructs a MongoDB filter using `{ _id: { $in: realEstateIds } }` to match all specified documents and applies `updateMany` to write the target state across all matches in one database round-trip. This batch approach significantly improves efficiency when an [[concepts/evaluator|evaluator]] needs to classify multiple properties with the same decision, eliminating the need for repeated individual API calls. Consistent with the [[concepts/audit-trail|Audit trail]] pattern, every affected document receives updated `mLastUpdate` (Unix epoch timestamp in seconds) and `userUpdate` (authenticated user's email) fields. The operation targets documents in the [[entities/affitto_data|affitto_data]] collection hosted on [[entities/mongodb-atlas|MongoDB Atlas]].

## Key Characteristics

- **Batch processing**: Accepts an array of rental listing IDs and a single target state, enabling classification of many properties in one request
- **MongoDB `$in` filter**: Constructs a filter using `{ _id: { $in: realEstateIds } }` to match all specified documents efficiently
- **Atomic bulk write**: Leverages MongoDB's `updateMany` to apply the same `stateMaloi` value across all matched documents in a single database round-trip
- **Audit trail compliance**: Automatically sets `mLastUpdate` (Unix epoch timestamp in seconds) and `userUpdate` (authenticated user's email) on every affected document, consistent with the [[concepts/audit-trail|Audit trail]] pattern
- **Consistent with individual update pattern**: Mirrors the field-setting behavior of single-document stateMaloi updates but operates at scale

## Applications

- **Workflow efficiency**: When an [[concepts/evaluator|evaluator]] needs to classify many rental properties with the same status (e.g., marking a batch as reviewed or rejected), BulkStateMaloi eliminates the need for repeated individual API calls
- **Bulk classification operations**: Supports use cases where rental listings from a specific area, source, or criteria all need the same [[concepts/statemaloi|stateMaloi]] classification applied at once
- **Administrative batch processing**: Enables backend or administrative tools to efficiently manage large sets of rental listings stored in the [[entities/affitto_data|affitto_data]] collection

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — the classification field that this operation updates in bulk
- [[concepts/bulk-state-update|bulk-state-update]] — the broader feature requirement (FR-5) that encompasses this operation
- [[concepts/audit-trail|Audit trail]] — the pattern requiring `mLastUpdate` and `userUpdate` to be set on every write
- [[concepts/mlastupdate|mLastUpdate]] — the Unix epoch timestamp field set on every affected document
- [[concepts/userupdate|userUpdate]] — the authenticated user's email field recorded on every write
- [[concepts/optimistic-update|Optimistic update]] — related UI update pattern that may be used on the frontend when invoking this bulk operation
- [[concepts/write-whitelist|Write whitelist]] — field-level write control that governs which fields can be modified

## Related Entities

- [[entities/affitto_data|affitto_data]] — the MongoDB collection containing rental listing documents targeted by this operation
- [[entities/affito|affito]] — the source collection related to rental listing data
- [[entities/affitiudine|affitiudine]] — the Firebase project hosting the backend system
- [[entities/affitti-backend|Affitti Backend API]] — the API layer exposing this bulk operation as an endpoint
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database platform where `updateMany` is executed

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "BulkStateMaloi: Salvare molti affiti con il stesso stateMaloi. riceve un array di ids dei affitti e uno stato."
> - "const filter = { _id: { $in: realEstateIds } };"
> - "await collection.updateMany( filter, { $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } } )"