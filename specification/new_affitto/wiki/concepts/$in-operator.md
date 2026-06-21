---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [method]
aliases:
  - "MongoDB $in"
  - "$in query operator"
  - "$in"
---


# $in operator

## Definition

The `$in` operator is a MongoDB query operator that selects documents where the value of a specified field matches any value contained in a given array. In the Affitti internal rental system, it serves as the core filtering mechanism for the bulk state update feature ([[concepts/bulkstatemaloi|BulkStateMaloi]]), enabling the selection of multiple rental property documents by their `_id` fields in a single query. The filter pattern `{ _id: { $in: realEstateIds } }` allows the system to target an arbitrary set of documents for batch processing without requiring individual queries for each document.

## Key Characteristics

- **Array-based matching**: Accepts an array of values and matches any document whose specified field equals any element in that array
- **Used with `_id` field**: In the Affitti system, it is specifically applied to the `_id` field to select multiple rental property documents by their unique identifiers
- **Enables batch operations**: When combined with [[concepts/updatemany|updateMany]], it powers bulk update workflows that modify multiple documents in a single database operation
- **Filter construction pattern**: The standard usage pattern is `{ field: { $in: arrayOfValues } }`, which produces a concise and declarative filter expression
- **MongoDB-native operator**: Part of MongoDB's built-in query language, requiring no custom logic or additional dependencies
- **Efficient document selection**: Allows targeting a specific, non-contiguous subset of documents without scanning unrelated records

## Applications

- **Bulk state classification**: Used in the [[concepts/bulkstatemaloi|BulkStateMaloi]] feature to select multiple rental properties (affitti) by their IDs so that a shared `stateMaloi` decision state can be applied to all of them at once
- **Batch update pipelines**: Combined with [[concepts/updatemany|updateMany]] to execute a single write operation that modifies all matched documents, reducing the number of round-trips to the database
- **Multi-document filtering**: General-purpose selection of documents whose identifying field appears in a known list, applicable to any scenario where a user or system process needs to act on a predefined set of records

## Related Concepts

- [[concepts/bulkstatemaloi|BulkStateMaloi]] — the feature that relies on the `$in` operator to select multiple rental properties for batch state updates
- [[concepts/updatemany|updateMany]] — the MongoDB write operation that executes the actual update on all documents matched by the `$in` filter
- [[concepts/updateone|updateOne]] — the single-document counterpart; the `$in` operator is used specifically when multiple documents need to be targeted instead
- [[concepts/data-aggregation|Data aggregation pipeline]] — broader MongoDB data processing context in which query operators like `$in` participate
- [[concepts/id-typing-validation|Id typing rule]] — validation rule (BR-6) that governs the typing of `_id` fields used within the `$in` array

## Related Entities

- [[entities/affitto|Affitto]] — the rental property entity whose documents are selected using the `$in` operator for bulk operations

## Mentions in Source

- "const filter = { _id: { $in: realEstateIds } };" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "BulkStateMaloi: Salvare molti affiti con il stesso stateMaloi. riceve un array di ids dei affitti e uno stato." *(BulkStateMaloi: Save many rentals with the same stateMaloi. Receives an array of rental IDs and a state.)* — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]