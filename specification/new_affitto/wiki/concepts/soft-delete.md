---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "method"
aliases:
  - "Soft deletion"
  - "Logical delete"
---

## Basic Information

- **Type:** concept
- **Subtype:** method
- **Sources:** [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]

## Definition

Soft delete is a data deletion strategy employed in the [[entities/affitti-backend|Affitti Backend]] where documents are never physically removed from the database. Instead of permanent deletion, documents are marked with a `deleted: true` boolean flag. All read endpoints exclude soft-deleted documents by default unless the query parameter `includeDeleted=true` is explicitly passed. Hard deletion of listings is explicitly listed as a non-goal for version 1 of the system, making soft delete the sole deletion mechanism. This approach preserves data integrity and audit history while allowing listings to be effectively hidden from the user interface.

## Key Characteristics

- **No physical removal**: Documents remain in the database indefinitely; only their `deleted` boolean flag changes to `true`
- **Default exclusion**: All read endpoints automatically filter out documents where `deleted: true`, ensuring soft-deleted records are invisible to standard queries
- **Opt-in visibility**: Soft-deleted documents can be retrieved by explicitly passing the `includeDeleted=true` query parameter
- **Data integrity preservation**: Because records are never physically removed, referential integrity across collections is maintained
- **Recoverability**: Previously deleted listings can be restored since the underlying data is never destroyed
- **Hard delete is a non-goal**: For version 1 of the Affitti Backend, permanent deletion of listings is explicitly out of scope

## Applications

- **Listing management in the [[entities/affitto_data|affitto_data]] collection**: When a rental listing is deleted by a user, the document in the collection is flagged as `deleted: true` rather than removed, allowing potential future recovery
- **Audit and compliance**: Retaining all historical records supports auditing workflows and data governance requirements, working in conjunction with the [[concepts/audit-trail|Audit trail]] rule
- **Administrative review**: Administrators or internal tools can query with `includeDeleted=true` to inspect previously removed listings for debugging or moderation purposes
- **Data recovery**: If a listing is deleted accidentally, it can be restored by simply toggling the `deleted` flag back to `false`

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — The state enumeration used for listing lifecycle management, which operates alongside the soft delete flag to control document visibility and status
- [[concepts/write-whitelist|Write whitelist]] — The field write whitelist rule (BR-5) that governs which fields can be modified, complementing the soft delete mechanism's control over the `deleted` flag
- [[concepts/audit-trail|Audit trail]] — The audit trail rule (BR-2) that works alongside soft delete to preserve full data history

## Related Entities

- [[entities/affitti-backend|Affitti Backend]] — The API layer that implements the soft delete strategy across all its endpoints
- [[entities/affitto_data|affitto_data]] — The primary collection where the `deleted` boolean flag is applied to listing documents

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - **BR-3 — Soft delete.** Documents with `deleted: true` are excluded from all read endpoints unless `includeDeleted=true` is explicitly passed *(assumption)*.
> - Hard deletion of listings (the `deleted` boolean flag is respected as soft delete).