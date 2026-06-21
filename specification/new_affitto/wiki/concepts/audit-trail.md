---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "method"
aliases:
  - "BR-2"
  - "Audit trail rule"
  - "BR-2 Audit trail"
---

## Definition

A business rule (BR-2) in the [[entities/affitti-backend|Affitti Backend API]] that mandates every write operation to the [[entities/affito|affito collection]] must automatically set two audit fields: `mLastUpdate` (assigned `Date.now() / 1000` in Unix seconds, consistent with existing data) and `userUpdate` (assigned the authenticated user's email extracted from the verified Firebase token). The `userUpdate` field is never sourced from the request body, preventing spoofing and ensuring reliable traceability of all data modifications. This rule is enforced in the TypeScript service layer as part of the broader business rules architecture.

## Description

The audit trail is a business rule (BR-2) in the [[entities/affitti-backend|Affitti Backend API]] that ensures every write operation records metadata about when and by whom the change was made. On every write, the system sets `mLastUpdate` to the current time as Unix seconds (`Date.now() / 1000`, consistent with existing data format) and `userUpdate` to the authenticated user's email extracted from the verified [[concepts/firebase-authentication|Firebase Authentication]] token. Critically, the user identity is never taken from the request body but always from the verified authentication token, preventing spoofing. This mechanism supports accountability and traceability for all evaluation decisions and description updates. The audit trail is complemented by structured logging at the infrastructure level — including request id, user email on writes, and matched/modified counts — forwarded to Cloud Logging via Firebase, providing an additional layer of observability beyond the document-level audit fields.

## Key Characteristics

- **Automatic timestamping**: `mLastUpdate` is set to `Date.now() / 1000`, producing a Unix timestamp in seconds rather than milliseconds, maintaining consistency with the existing data format in the collection.
- **Authenticated user attribution**: `userUpdate` is populated exclusively from the verified [[concepts/firebase-authentication|Firebase Authentication]] token via [[concepts/firebase-id-token-verification|Firebase ID token verification]], guaranteeing that the identity recorded is the actual authenticated user.
- **Spoofing prevention**: The `userUpdate` value is never accepted from the request body, eliminating the possibility of clients injecting a false identity into audit records.
- **Service-layer enforcement**: The rule is implemented in a typed TypeScript service layer, not in the frontend or in raw database queries, following the architectural guideline G5.
- **Universal write coverage**: Every write operation (create, update, soft-delete, bulk operations) must comply with this rule — no write path is exempt.
- **Structured logging complement**: Beyond document-level fields, structured logging captures request id, user email on writes, and matched/modified counts, forwarded to Cloud Logging via Firebase for infrastructure-level observability.

## Applications

- **Change traceability**: Enables administrators and developers to determine who made a specific change to any document in the [[entities/affito|affito collection]] and when it occurred, supporting accountability for all evaluation decisions and description updates.
- **Security auditing**: Provides a tamper-resistant record of modifications since the user identity is derived from a cryptographically verified token rather than user-supplied input.
- **Debugging and incident response**: When data issues arise, the `mLastUpdate` and `userUpdate` fields allow rapid identification of the responsible change and the user who initiated it. Structured logging with request ids and matched/modified counts provides additional diagnostic context.
- **Compliance**: Supports data governance requirements by maintaining a reliable log of all write operations at the document level.

## Related Concepts

- [[concepts/statemaloi|stateMaloi enum]] — Another business rule field managed alongside the audit trail during write operations
- [[concepts/soft-delete|Soft deletion]] — Soft-delete operations must also comply with BR-2, setting audit fields rather than physically removing documents
- [[concepts/data-normalization|Data normalization]] — BR-4 normalization is applied in the same service layer where the audit trail rule is enforced
- [[concepts/firebase-authentication|Firebase Authentication]] — Provides the verified token from which the `userUpdate` email is extracted
- [[concepts/firebase-id-token-verification|Firebase ID token verification]] — The middleware that verifies the Firebase token before the audit trail fields are populated
- [[concepts/slim-dto|Data Transfer Object]] — DTOs define the shape of request/response data, but audit fields are excluded from client input
- [[concepts/write-whitelist|Write whitelist]] — BR-5 controls which fields clients may submit; audit fields are enforced server-side outside this whitelist

## Related Entities

- [[entities/affito|affito collection]] — The primary collection whose documents are subject to this audit trail rule
- [[entities/affitti-backend|Affitti Backend API]] — The backend system where BR-2 is implemented and enforced
- [[entities/affitiudine|affitiudine project]] — The Firebase project providing authentication infrastructure
- [[entities/firebase-cloud-functions|Cloud Functions]] — The runtime environment where the TypeScript service layer executes

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "**BR-2 — Audit trail.** Every write sets `mLastUpdate = Date.now() / 1000` (Unix seconds, consistent with existing data) and `userUpdate = <authenticated user email>` taken from the verified Firebase token — never from the request body."
> - "**G5** — Enforce all business rules in a typed TypeScript service layer (not in the frontend, not in raw queries)."
> - "Structured logging (request id, user email on writes, matched/modified counts). Cloud Logging via Firebase."