---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "userUpdate field"
  - "userUpdate"
  - "last modifier email"
---

## Description

The `userUpdate` field is a string property stored in [[entities/affitto_data|affitto_data]] documents that records the email address of the authenticated user who last modified the record. The value is derived from `user.email`, which is extracted from the Firebase authentication token during [[concepts/firebase-id-token-verification|Firebase token verification]]. It is not part of the original scraped data but is injected by the application's write logic during every mutation operation, serving as a key component of the system's [[concepts/audit-trail|audit trail]]. It is set during all write operations including single [[concepts/statemaloi|stateMaloi]] updates, [[concepts/bulk-state-update|bulk state updates]], and [[concepts/description-update|description changes]]. Together with [[concepts/mlastupdate|mLastUpdate]], it provides a "who + when" audit pair that answers "who changed this record and when?" for every document in the rental data collection.

## Key Characteristics

- **Type**: String — stores an email address (e.g., `user.email` from the decoded Firebase ID token)
- **Write-time injection**: Set automatically during all three write operations: single [[concepts/statemaloi|stateMaloi]] update, [[concepts/bulk-state-update|bulk stateMaloi update]], and [[concepts/description-update|description update]]
- **Authentication-derived**: The value originates from [[concepts/firebase-authentication|Firebase Authentication with Google Provider]], ensuring only verified user identities are recorded
- **Not scraped data**: The field is absent from the original external data; it is added exclusively by backend write logic
- **Paired with timestamp**: Always set alongside [[concepts/mlastupdate|mLastUpdate]] in the same `$set` operation, together forming a "who + when" audit pair
- **Whitelisted field**: Included in the [[concepts/write-whitelist|write whitelist]] as a permitted field for write operations on [[entities/affitto_data|affitto_data]] documents
- **Schema-defined**: Declared in the document schema with `"type": "string"`

## Applications

- **Audit trail**: Combined with [[concepts/mlastupdate|mLastUpdate]], the `userUpdate` field provides a basic [[concepts/audit-trail|audit trail]] that answers "who changed this record and when?" for every [[entities/affitto_data|affitto_data]] document
- **Accountability**: Enables administrators to trace modifications back to specific [[concepts/evaluator|authenticated reviewers]], supporting accountability in multi-user environments
- **Debugging and support**: When data discrepancies arise, the stored email allows quick identification of the user responsible for the last change
- **Compliance**: Provides a lightweight record-keeping mechanism for tracking data modifications across the [[entities/affitiudine|affitiudine]] project

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — one of the fields updated alongside `userUpdate` during write operations
- [[concepts/mlastupdate|mLastUpdate]] — the companion timestamp field, always set together with `userUpdate`
- [[concepts/firebase-authentication|Firebase Authentication with Google Provider]] — the authentication system that supplies the `user.email` value
- [[concepts/audit-trail|Audit trail rule]] — the business rule (BR-2) that `userUpdate` helps satisfy
- [[concepts/write-whitelist|Write whitelist rule]] — the field allowlist that includes `userUpdate`
- [[concepts/bulk-state-update|Bulk state update]] — one of the operations that sets `userUpdate`
- [[concepts/bulkstatemaloi|BulkStateMaloi operation]] — the bulk operation variant that writes `userUpdate`
- [[concepts/firebase-id-token-verification|Firebase token verification]] — the middleware that extracts `user.email` from the authentication token
- [[concepts/evaluator|Evaluator]] — the authenticated user persona whose email is captured
- [[concepts/description-update|Description update operation]] — the description write operation that also sets `userUpdate`

## Related Entities

- [[entities/affitto_data|affitto_data]] — the MongoDB collection where `userUpdate` is stored
- [[entities/affitiudine|affitiudine]] — the Firebase project hosting the application
- [[entities/affitti-backend|Affitti Backend API]] — the backend service that implements the write logic setting `userUpdate`
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — the runtime environment executing the write operations

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - "$set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email }"
> - "$set: { \"description\": description.trim(), \"mLastUpdate\": new Date().getTime() / 1000, \"userUpdate\": user.email }"
> - "\"userUpdate\": { \"type\": \"string\" }"

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|prd_affitti_backend_v0-3_1d90fc]]**
> - "{ $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } }"
> - "{ $set: { \"description\": description.trim(), \"mLastUpdate\": new Date().getTime() / 1000, \"userUpdate\": user.email } }"