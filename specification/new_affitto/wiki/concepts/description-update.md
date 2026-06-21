---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "method"
aliases:
  - "description write operation"
  - "description update operation"
---

## Description

Description update is one of the three write operations available on the [[entities/affito|affito]] collection, allowing authenticated users to modify the `description` field of a rental listing. The operation uses MongoDB's `updateOne` method with a filter by `_id` (parsed as integer) and atomically sets the trimmed description text, the [[concepts/mlastupdate|mLastUpdate]] timestamp (epoch seconds), and the [[concepts/userupdate|userUpdate]] field (user email). This operation exemplifies the system's [[concepts/write-whitelist|write whitelist]] approach, which restricts mutations to a small, explicitly enumerated set of fields. Beyond correcting incomplete or malformed scraped data, the operation enables users to annotate rental listings with personal notes or evaluations, enriching the listing with context that cannot be captured through automated [[concepts/web-scraping|web scraping]] or [[concepts/external-aggregation-process|external aggregation]].

## Key Characteristics

- **Targeted field mutation**: Only the `description` field is modified by the user; the operation does not allow changes to any other listing data
- **Input sanitization**: The description value is trimmed (`.trim()`) before persistence, enforcing [[concepts/data-normalization|data normalization]] at the write boundary
- **Audit metadata**: Each update atomically writes two audit fields — [[concepts/mlastupdate|mLastUpdate]] (Unix epoch in seconds via `new Date().getTime() / 1000`) and [[concepts/userupdate|userUpdate]] (the authenticated user's email) — satisfying the [[concepts/audit-trail|audit trail]] business rule
- **Integer ID filter**: The `_id` is parsed as an integer (`parseInt(id)`), consistent with the [[concepts/id-typing-validation|id typing validation]] rule (BR-6)
- **Write-whitelist member**: One of only three write operations permitted by the system, alongside single [[concepts/statemaloi|stateMaloi]] update and [[concepts/bulk-state-update|bulk state update]] ([[concepts/bulkstatemaloi|BulkStateMaloi]])
- **Authentication required**: The operation relies on [[concepts/firebase-authentication|Firebase Authentication]] to identify the calling user and populate the `userUpdate` field
- **Atomic update**: Uses MongoDB `updateOne` with `$set`, ensuring the description change and audit fields are applied in a single atomic operation

## Applications

- **Listing enrichment**: Evaluators (see [[concepts/evaluator|evaluator]]) use this operation to add or refine textual descriptions on rental listings after reviewing scraped data
- **Personal annotation**: Users can annotate listings with personal notes or evaluations, adding subjective context beyond the automatically collected data
- **Data quality improvement**: Since listings originate from [[concepts/web-scraping|web scraping]] and [[concepts/external-aggregation-process|external aggregation]], descriptions may be incomplete or malformed; this operation enables manual correction
- **Audit-compliant editing**: Every description change is traceable to a specific user and timestamp, supporting compliance and review workflows
- **Frontend integration**: The [[concepts/react-and-redux-frontend|React/Redux frontend]] invokes this endpoint and may apply [[concepts/optimistic-update|optimistic updates]] to reflect the change immediately while the backend persists it

## Related Concepts

- [[concepts/write-whitelist|Field Write Whitelist]] — the architectural constraint that limits mutations to this and two other operations
- [[concepts/statemaloi|stateMaloi]] — the other single-field write operation in the system
- [[concepts/bulk-state-update|Bulk State Update]] — the third permitted write operation
- [[concepts/bulkstatemaloi|BulkStateMaloi]] — the bulk variant of stateMaloi update
- [[concepts/audit-trail|Audit Trail]] — business rule (BR-2) enforced by writing `mLastUpdate` and `userUpdate`
- [[concepts/mlastupdate|mLastUpdate]] — timestamp field set during the update
- [[concepts/userupdate|userUpdate]] — user email field set during the update
- [[concepts/id-typing-validation|Id Typing Validation]] — BR-6 rule governing the `parseInt(id)` pattern
- [[concepts/data-normalization|Data Normalization]] — the `.trim()` call aligns with BR-4 normalization
- [[concepts/firebase-authentication|Firebase Authentication]] — provides the `user.email` used in the operation
- [[concepts/split-collection-architecture|Split-Collection Pattern]] — architectural context within which this write occurs
- [[concepts/optimistic-update|Optimistic Update]] — UI pattern potentially applied when invoking this operation

## Related Entities

- [[entities/affito|affito]] — the MongoDB collection on which this write operation is performed
- [[entities/udine|udine]] — the MongoDB database hosting the affito collection
- [[entities/mongodb-atlas|MongoDB Atlas]] — the cloud database platform
- [[entities/affitti-backend|Affitti Backend API]] — the API layer exposing this operation
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — the serverless runtime executing the update logic

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "description: testo con la descricione che ho dato"
> - "const filter = { _id: parseInt(id) as any }; await collection.updateOne( filter, { $set: { \"description\": description.trim(), \"mLastUpdate\": new Date().getTime() / 1000, \"userUpdate\": user.email } } );"