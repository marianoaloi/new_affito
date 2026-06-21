---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "method"
aliases:
  - "BR-5"
  - "Write whitelist rule"
  - "Field write whitelist"
---

## Definition

Write whitelist (BR-5) is a business rule enforced by the [[entities/affitti-backend|Affitti Backend API]] that strictly limits which fields can be modified through API write operations. Only the `description` and [[concepts/statemaloi|stateMaloi]] fields — along with the automatically set audit fields `mLastUpdate` and `userUpdate` — are permitted in write payloads. Any request that attempts to modify fields outside this whitelist is rejected by the API. This measure ensures that scraped listing data stored in [[entities/affitto_data|affitto_data]] cannot be accidentally or maliciously altered, as all writes are directed exclusively to the separate [[entities/affito|affito]] collection.

## Description

The write whitelist is a security-oriented business rule that provides strict field-level access control over the Affitti Backend API's write operations. It permits modification of only two user-facing fields — `description` and [[concepts/statemaloi|stateMaloi]] — while the system automatically manages the [[concepts/audit-trail|audit trail]] fields `mLastUpdate` and `userUpdate`. Any write payload containing fields outside this whitelist is rejected entirely, rather than silently stripping unauthorized fields, ensuring explicit enforcement. This rule works in conjunction with the [[concepts/split-collection-architecture|split-collection architecture]], where writes target only the [[entities/affito|affito]] collection and never the [[entities/affitto_data|affitto_data]] collection, providing defense in depth against data corruption. By isolating user-editable fields from scraped data, the whitelist preserves the immutability of source-of-truth listing information ingested from external scrapers. Combined with [[concepts/firebase-authentication|Firebase Authentication]]-based user identification, every permitted write is fully traceable, supporting audit compliance.

## Key Characteristics

- **Strict field-level access control**: Only `description` and [[concepts/statemaloi|stateMaloi]] are user-writable; all other fields are read-only through the API
- **Automatic audit fields**: `mLastUpdate` and `userUpdate` are set automatically by the system and do not need to be (nor can be) supplied by the client
- **Payload rejection**: Any write payload containing fields outside the whitelist is rejected entirely, rather than silently ignoring the extra fields
- **Collection separation**: Writes target the [[entities/affito|affito]] collection exclusively, never the [[entities/affitto_data|affitto_data]] collection, which holds the original scraped data
- **Data integrity preservation**: Scraped listing data remains immutable through the API, preventing corruption of source-of-truth data
- **Security measure**: Acts as a defense-in-depth mechanism against both accidental misconfiguration and malicious tampering

## Applications

- **Rental listing management**: Allows operators to annotate listings with custom descriptions and workflow states ([[concepts/statemaloi|stateMaloi]]) without risking modification of scraped property data (price, location, source URL, etc.)
- **API hardening**: Serves as a server-side validation layer that complements client-side controls, ensuring that even direct API calls cannot bypass field restrictions
- **Audit compliance**: Combined with the automatic audit fields, every permitted write is traceable to a specific user and timestamp, supporting [[concepts/firebase-authentication|Firebase Authentication]]-based accountability
- **Multi-source data pipelines**: Preserves the integrity of data ingested from external scrapers by isolating user-editable fields into a separate collection ([[entities/affito|affito]])

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — one of the two user-writable fields permitted by the whitelist
- [[concepts/soft-delete|Soft deletion]] — related data integrity pattern that avoids destructive operations
- [[concepts/data-normalization|Data normalization]] — BR-4, a companion business rule applied to data before storage
- [[concepts/slim-dto|Slim DTO]] — the data transfer object pattern used by the API, which aligns with whitelist constraints
- [[concepts/firebase-authentication|Firebase Authentication]] — authentication layer that identifies the user recorded in the `userUpdate` audit field
- [[concepts/audit-trail|Audit trail]] — BR-2, the complementary business rule ensuring every write is traceable via `mLastUpdate` and `userUpdate`
- [[concepts/split-collection-architecture|Split-collection architecture]] — the architectural pattern that separates read-only scraped data from user-writable data, reinforcing the whitelist's guarantees

## Related Entities

- [[entities/affitti-backend|Affitti Backend API]] — the API layer that enforces the write whitelist
- [[entities/affito|affito]] — the collection that receives all permitted writes
- [[entities/affitto_data|affitto_data]] — the read-only collection containing scraped listing data, protected by this rule
- [[entities/udine|udine]] — the MongoDB database housing both collections

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "**BR-5 — Write whitelist.** Only `description` and `stateMaloi` (plus audit fields) are writable. Any other field in a write payload is rejected."
> - "Editing of any scraped field other than `description` and `stateMaloi`."