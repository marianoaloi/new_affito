---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [method]
aliases:
  - "MongoDB $set"
  - "$set update operator"
---


# $set Operator

## Definition

The `$set` operator is a MongoDB update operator that replaces the value of specified fields in matched documents without affecting other fields in the document. In the Affitti internal rental system, `$set` is the sole update operator used across all write operations defined in the PRD, consistently bundling primary field changes with audit trail metadata (timestamp and user identity) in a single atomic update.

## Key Characteristics

- **Selective field replacement**: Only modifies the fields explicitly listed in the `$set` expression; all other document fields remain untouched
- **Atomic update guarantee**: When used within [[concepts/updateone|updateOne]] or [[concepts/updatemany|updateMany]], the entire `$set` payload is applied as a single atomic operation
- **Audit trail bundling**: Every `$set` usage in the Affitti system simultaneously writes the primary data change alongside [[concepts/mlastupdate|mLastUpdate]] (Unix epoch timestamp) and [[concepts/userupdate|userUpdate]] (authenticated user's email), ensuring consistent change tracking
- **Timestamp generation pattern**: The `mLastUpdate` value is computed inline as `new Date().getTime() / 1000`, producing a Unix epoch in seconds rather than milliseconds
- **Used in both single and bulk contexts**: The same `$set` structure is reused whether targeting one document ([[concepts/updateone|updateOne]]) or many documents ([[concepts/updatemany|updateMany]])

## Applications

- **Single property state update**: Used with [[concepts/updateone|updateOne]] to change the `stateMaloi` field of a single property document, simultaneously recording who made the change and when
- **Bulk property state update**: Used with [[concepts/updatemany|updateMany]] in the [[concepts/bulkstatemaloi|BulkStateMaloi operation]] to update `stateMaloi` across multiple property documents in one call, applying the same audit metadata to all matched documents
- **Description update**: Used with [[concepts/updateone|updateOne]] in the [[concepts/description-update|description update operation]] to replace the trimmed `description` text of a single property, again bundling audit fields

## Related Concepts

- [[concepts/updateone|updateOne]] — MongoDB method that applies `$set` to a single matched document
- [[concepts/updatemany|updateMany]] — MongoDB method that applies `$set` to all matched documents
- [[concepts/mlastupdate|mLastUpdate]] — Audit timestamp field always included in `$set` payloads
- [[concepts/userupdate|userUpdate]] — Audit user email field always included in `$set` payloads
- [[concepts/bulkstatemaloi|BulkStateMaloi operation]] — Bulk write operation that uses `$set` with `updateMany`
- [[concepts/description-update|description update operation]] — Single-document write operation that uses `$set` with `updateOne`

## Related Entities

- [[entities/affitto|Affitto]] — The internal rental property system whose backend exclusively uses `$set` for all document mutations

## Mentions in Source

- `{ $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } }` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- ```
  {
          $set: {
            "description": description.trim(),
            "mLastUpdate": new Date().getTime() / 1000,
            "userUpdate": user.email
          }
        }
  ``` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]