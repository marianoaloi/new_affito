---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "last update timestamp"
  - "mLastUpdate field"
  - "mLastUpdate"
---

## Definition

mLastUpdate is a timestamp field in the [[entities/affitto_data|affitto_data]] collection schema that records the exact time a rental property document was last modified. The value is stored as a Unix epoch timestamp in seconds, computed via the JavaScript expression `new Date().getTime() / 1000`. It is represented as a `Double` type in the MongoDB schema to preserve the decimal precision inherent in the division operation. The field is automatically set during any write operation and functions as a core component of the system's [[concepts/audit-trail|audit trail]] mechanism, working in tandem with the [[concepts/userupdate|userUpdate]] field to capture both *when* and *by whom* a change was made.

## Key Characteristics

- **Unix epoch in seconds**: Derived by dividing `new Date().getTime()` (milliseconds) by 1000, yielding a seconds-based timestamp
- **Double type in MongoDB**: Stored as a `Double` rather than an integer or `Date` type, accommodating the fractional seconds produced by the division. The schema references a custom `$defs/Double` type definition that handles special numeric values (Infinity, -Infinity, NaN)
- **Automatically set on writes**: The field is populated server-side during every mutation — individual field updates, [[concepts/statemaloi|stateMaloi]] transitions, [[concepts/description-update|description updates]], and [[concepts/bulkstatemaloi|BulkStateMaloi]] bulk operations
- **Paired with userUpdate**: Always written alongside [[concepts/userupdate|userUpdate]] (the authenticated user's email), forming a two-field audit pair that satisfies the [[concepts/audit-trail|BR-2 Audit trail]] business rule
- **Immutable from client perspective**: The value is computed on the server and injected into the `$set` operation; it is not accepted from client input, aligning with the [[concepts/write-whitelist|write whitelist]] pattern

## Applications

- **Change auditing**: Enables administrators and downstream processes to determine the recency of any document modification, supporting compliance and debugging workflows
- **Conflict detection**: Can be compared against expected timestamps to detect concurrent or out-of-order modifications in an [[concepts/eventual-consistency|eventual consistency]] environment
- **Data freshness assessment**: The [[concepts/external-aggregation-process|external aggregation process]] or analytics consumers can use mLastUpdate to identify stale records that have not been refreshed
- **Bulk operation tracking**: During [[concepts/bulk-state-update|FR-5 bulk state updates]], each affected document receives an individual mLastUpdate value, preserving per-document modification history even when changes are applied in batch
- **Evaluation tracking**: Enables tracking when each property was last evaluated or annotated by an [[concepts/evaluator|evaluator]]

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — the rental property state field frequently updated alongside mLastUpdate
- [[concepts/bulkstatemaloi|BulkStateMaloi]] — bulk operation that sets mLastUpdate on multiple documents simultaneously
- [[concepts/audit-trail|BR-2 Audit trail]] — the business rule that mandates tracking modification metadata
- [[concepts/write-whitelist|Write whitelist rule]] — governs which fields may be written; mLastUpdate is server-controlled
- [[concepts/eventual-consistency|Eventual consistency]] — the consistency model under which mLastUpdate timestamps are evaluated
- [[concepts/bulk-state-update|FR-5 bulk state update]] — the feature-level operation that triggers mLastUpdate writes in batch
- [[concepts/userupdate|userUpdate]] — the companion audit field recording the authenticated user's email
- [[concepts/description-update|description update]] — a write operation that triggers mLastUpdate alongside description changes

## Related Entities

- [[entities/affitto_data|affitto_data]] — the MongoDB collection whose documents contain the mLastUpdate field
- [[entities/udine|udine]] — the MongoDB database hosting the affitto_data collection
- [[entities/affitti-backend|Affitti Backend API]] — the API layer responsible for setting mLastUpdate during write operations
- [[entities/mongodb-atlas|MongoDB Atlas]] — the cloud database platform where the Double-typed field is persisted

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `{ $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } }`
> - `{ $set: { "description": description.trim(), "mLastUpdate": new Date().getTime() / 1000, "userUpdate": user.email } }`
> - `"mLastUpdate": { "$ref": "#/$defs/Double" }`