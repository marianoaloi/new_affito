---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_backend_v0-3_1d90fc]]"]
tags: [method]
aliases:
  - "BR-6 Id typing"
  - "BR-6"
  - "Id typing rule"
---


# Id typing validation

## Definition

Id typing validation is a business rule (BR-6) defined in the [[entities/affitti-backend|Affitti Backend API]] that enforces strict type checking of listing identifiers before they reach the database layer. The rule mandates that the `_id` field is typed as an integer, and all route parameters representing identifiers must be parsed using `parseInt` combined with an `isNaN` guard. This validation step ensures that invalid, malformed, or potentially malicious id values are rejected at the service layer before any query is executed against MongoDB.

## Key Characteristics

- **Integer-typed `_id` field**: The listing identifier is explicitly typed as an integer rather than the default MongoDB ObjectId or string, establishing a strict contract for data access
- **Dual-guard parsing**: Route parameters undergo a two-step validation — `parseInt` conversion followed by an `isNaN` check — providing a reliable defense against non-numeric inputs
- **Pre-query enforcement**: Validation occurs in the TypeScript service layer, before any database operation is initiated, acting as an early-exit safeguard
- **Injection prevention**: By ensuring only valid integer values reach the [[entities/mongodb-atlas|MongoDB Atlas]] query layer, the rule mitigates risks of NoSQL injection or unexpected query behavior
- **Milestone M3 deliverable**: Delivered alongside other validation and business rules including [[concepts/write-whitelist|Write whitelist rule]] and [[concepts/audit-trail|Audit trail rule]]

## Applications

- **Route handler validation**: Applied in Express/Cloud Functions route handlers to sanitize path parameters (e.g., `/listings/:id`) before forwarding them to service-layer functions
- **API security hardening**: Prevents crafted requests with non-numeric or object-type id parameters from triggering unexpected MongoDB queries
- **Consistent data access**: Ensures that all reads, updates, and deletes across collections like [[entities/affitto_data|affitto_data]] and [[entities/affito|affito]] operate with correctly typed identifiers
- **TypeScript type safety**: Integrates with the [[concepts/shared-types-package|Shared TS types]] to enforce compile-time and runtime consistency for identifier fields

## Related Concepts

- [[concepts/write-whitelist|Write whitelist rule]] — companion validation rule (BR-5) that restricts which fields can be written
- [[concepts/statemaloi|stateMaloi enum]] — related domain enumeration used in listing state management
- [[concepts/audit-trail|Audit trail rule]] — BR-2 audit rule delivered in the same milestone
- [[concepts/data-normalization|Data normalization (BR-4)]] — another business rule governing data integrity
- [[concepts/firebase-id-token-verification|Firebase token verification]] — upstream authentication that precedes id validation in the request pipeline

## Related Entities

- [[entities/affitti-backend|Affitti Backend API]] — the backend service where this validation rule is implemented
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database layer protected by pre-query id validation
- [[entities/firebase-cloud-functions|Cloud Functions]] — the runtime environment hosting the route handlers that apply this rule

## Mentions in Source

- "**BR-6 — Id typing.** `_id` is an integer; route params are parsed with strict validation (`parseInt` + `isNaN` guard) before hitting the database." — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]
- "FR-3, FR-4, FR-5 + audit (BR-2) + validation (BR-1, BR-5, BR-6)" — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]