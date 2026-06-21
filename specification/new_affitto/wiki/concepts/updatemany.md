---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [method]
aliases:
  - "MongoDB updateMany"
  - "bulk update query"
---


# updateMany

## Definition

`updateMany` is a MongoDB collection method used extensively in the Affitti internal rental system for modifying multiple documents that match a given filter in a single operation. It serves as the primary database write operation for both single-state updates and bulk-state updates of rental listings, enabling efficient batch processing of property evaluation decisions by authenticated users.

## Key Characteristics

- **Filter-based matching**: For single-document updates, the filter matches a parsed integer `_id`; for bulk operations, it uses the MongoDB `$in` operator with an array of `realEstateIds`
- **Atomic field updates via `$set`**: Each call atomically sets three fields — [[concepts/bulkstatemaloi|stateMaloi]] (the decision state), [[concepts/mlastupdate|mLastUpdate]] (epoch timestamp in seconds), and [[concepts/userupdate|userUpdate]] (authenticated user's email)
- **Timestamp as epoch seconds**: The `mLastUpdate` value is computed as `new Date().getTime() / 1000`, converting JavaScript milliseconds to Unix epoch seconds
- **Audit trail compliance**: By recording both the timestamp and the user email on every update, the method supports the [[concepts/audit-trail|BR-2 Audit trail]] business rule
- **Dual usage pattern**: The same `updateMany` call structure is reused for both the single-listing state endpoint and the [[concepts/bulkstatemaloi|BulkStateMaloi]] bulk endpoint, differing only in how the `filter` object is constructed
- **Write whitelist adherence**: The fields written by `updateMany` are constrained to the allowed set defined by the [[concepts/write-whitelist|Write whitelist rule]]

## Applications

- **Single rental listing evaluation**: When an evaluator makes a decision (accept, deny, or wait) on a single property, `updateMany` updates the corresponding document by its `_id`
- **Bulk rental listing evaluation**: When an evaluator needs to apply the same decision state across multiple listings simultaneously, `updateMany` processes all matching documents in one database round-trip using the `$in` operator
- **Audit logging**: Each invocation automatically stamps the modification time and modifier identity, creating a traceable change history for compliance and debugging
- **Efficient batch processing**: By leveraging MongoDB's native bulk update capability, the system avoids N+1 query patterns that would degrade performance when processing large sets of rental listings

## Related Concepts

- [[concepts/bulkstatemaloi|BulkStateMaloi operation]] — the bulk state update operation that relies on `updateMany` with the `$in` operator
- [[concepts/mlastupdate|mLastUpdate]] — the last-update timestamp field set by each `updateMany` call
- [[concepts/userupdate|userUpdate]] — the authenticated user email field set by each `updateMany` call
- [[concepts/audit-trail|BR-2 Audit trail]] — the business rule enforced through the timestamp and user tracking in `updateMany`
- [[concepts/write-whitelist|Write whitelist rule]] — constrains which fields `updateMany` is permitted to modify
- [[concepts/id-typing-validation|BR-6 Id typing]] — governs how the `_id` filter value is parsed as an integer before being passed to `updateMany`
- [[concepts/data-aggregation|Data aggregation pipeline]] — related MongoDB operation pattern used alongside `updateMany` for read operations
- [[concepts/split-collection-architecture|Split-collection pattern]] — the architectural pattern determining which collection `updateMany` targets
- [[concepts/description-update|description update operation]] — another write operation in the system, distinct from state updates

## Related Entities

- [[entities/affitto_data|affitto_data]] — the MongoDB collection on which `updateMany` is invoked for state changes
- [[entities/affitto|affitto]] — the broader Affitti rental management system that orchestrates these database operations

## Mentions in Source

- "await collection.updateMany(
        filter,
        { $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } }
      )" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]