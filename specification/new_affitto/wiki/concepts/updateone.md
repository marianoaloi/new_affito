---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [method]
aliases:
  - "MongoDB updateOne"
  - "single document update"
---


# updateOne

## Definition

`updateOne` is a MongoDB collection method used within the Affitti rental management system to update a single document in the `affitto` collection. It targets exactly one document matched by its `_id` filter and applies a `$set` operation to modify the description text, the last-update timestamp ([[concepts/mlastupdate|mLastUpdate]]), and the modifier's email ([[concepts/userupdate|userUpdate]]). Unlike bulk update operations such as [[concepts/bulkstatemaloi|BulkStateMaloi]] which use `updateMany` for state transitions across multiple documents, `updateOne` is scoped to a precise, single-document write initiated by an authenticated user.

## Key Characteristics

- **Single-document targeting**: Matches exactly one document using the `_id` field as the filter, ensuring no unintended documents are modified
- **`$set` operator usage**: Employs the MongoDB `$set` operator to update only the specified fields without replacing the entire document
- **Description trimming**: The description value is trimmed (`.trim()`) before persistence to remove leading and trailing whitespace
- **Audit metadata**: Automatically sets the [[concepts/mlastupdate|mLastUpdate]] field to the current epoch time in seconds (`new Date().getTime() / 1000`) and records the authenticated user's email in the [[concepts/userupdate|userUpdate]] field, fulfilling the [[concepts/audit-trail|audit trail]] requirement
- **Asynchronous execution**: Called with `await`, indicating it returns a Promise and is used within an async function in the Node.js/TypeScript backend
- **Write-path operation**: Part of the write path in the [[concepts/split-collection-architecture|split-collection architecture]], operating on the affitto collection for user-initiated modifications
- **Field-restricted**: Only modifies fields permitted by the [[concepts/write-whitelist|write whitelist]] rule (description, mLastUpdate, userUpdate)

## Applications

- **Rental listing annotation**: Allows authenticated evaluators ([[concepts/evaluator|evaluators]]) to add or modify descriptive notes on individual rental property listings
- **Description write operation**: Serves as the core database call behind the [[concepts/description-update|description update operation]] endpoint, which is the dedicated API route for updating a property's description
- **User-scoped edits**: Ensures that each description modification is traceable to the specific user who performed it, supporting accountability within the system
- **Granular document updates**: Provides a targeted update mechanism when only a single property's metadata needs to change, avoiding the overhead and risk of bulk operations

## Related Concepts

- [[concepts/description-update|description update operation]] — the higher-level operation that invokes `updateOne`
- [[concepts/mlastupdate|mLastUpdate]] — timestamp field set during the update
- [[concepts/userupdate|userUpdate]] — user email field set during the update
- [[concepts/audit-trail|audit trail]] — business rule requiring tracking of who modified what and when
- [[concepts/write-whitelist|write whitelist]] — rule restricting which fields can be written
- [[concepts/bulkstatemaloi|BulkStateMaloi]] — contrasting bulk update operation that uses `updateMany`
- [[concepts/split-collection-architecture|split-collection architecture]] — architectural pattern governing read/write collection separation
- [[concepts/evaluator|evaluator]] — the authenticated user persona who triggers description updates
- [[concepts/firebase-id-token-verification|Firebase ID token auth]] — authentication mechanism that provides the `user.email` value used in the update

## Related Entities

- [[entities/affitto|affitto]] — the MongoDB collection on which `updateOne` operates

## Mentions in Source

- "await collection.updateOne(
        filter,
        {
          $set: {
            \"description\": description.trim(),
            \"mLastUpdate\": new Date().getTime() / 1000,
            \"userUpdate\": user.email
          }
        }
      );" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "Query per cambiare scrivere la descrizione" _(Query to change/write the description)_ — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]