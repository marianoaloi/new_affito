---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "method"
aliases:
  - "Shared TS types"
  - "Shared types"
  - "TS types package"
---

## Description

The Shared Types Package is a foundational [[concepts/typescript|TypeScript]] artifact that centralizes all DTOs and enums into a single importable module, consumed by both the [[entities/affitti-backend|Affitti Backend API]] and the [[entities/affitti-frontend-v1|Affitti Frontend v1]] React/Redux application. By housing lightweight data-shape interfaces (e.g., [[concepts/slim-dto|Slim DTOs]]) and constrained value types (e.g., the [[concepts/statemaloi|stateMaloi]] enum), it eliminates duplicate or divergent type definitions across codebases. The frontend imports business rules, enums, and DTOs from this package rather than re-declaring them, ensuring that [[concepts/statemaloi|stateMaloi]] semantics and listing DTOs are defined once and shared. Listed as a milestone M1 deliverable, the package must be in place before other features that depend on typed contracts can proceed. It directly supports goal G5 of both the backend and frontend PRDs — enforcing all business rules in a typed TypeScript service layer and ensuring [[concepts/redux-state|Redux state management]] is typed end-to-end with the shared DTOs. Risk R2 from the frontend PRD highlights that table columns like [[concepts/energy_class|energy_class]], surfaceValue, rent, and contractValue may need to be flattened in the backend [[concepts/slim-dto|Slim DTO]] to avoid fragile deep property access in the frontend. The package is designed for distribution as an importable package (e.g., via npm workspace or private registry), enabling independent versioning and clean dependency management.

## Key Characteristics

- **Single source of truth**: All DTOs and enums are defined once and imported by both backend and frontend codebases, eliminating duplicate or divergent type definitions.
- **Full-stack type safety**: [[concepts/typescript|TypeScript]]'s structural type system catches contract violations at compile time rather than at runtime, reducing integration bugs.
- **Contains DTOs and enums**: Houses lightweight data-shape interfaces (e.g., [[concepts/slim-dto|Slim DTOs]]) and constrained value types (e.g., the [[concepts/statemaloi|stateMaloi]] enum with values `0 = non buono`, `1 = buono`, `2 = così così`).
- **Foundation deliverable (M1)**: Listed as a milestone M1 deliverable, indicating it must be in place before other features that depend on typed contracts can proceed.
- **Supports G5 — typed service layer enforcement**: Directly enables goal G5 by providing the shared type contracts that allow business rules to be enforced in a typed TypeScript service layer, not in the frontend or raw queries.
- **End-to-end Redux typing**: The frontend's [[concepts/redux-state-slices|Redux state slices]] are typed using the shared DTOs, ensuring the entire data flow from API response to UI component is compile-time verified.
- **Frontend never re-declares types**: Business rules, enums, and DTOs are imported exclusively from the shared package — the frontend never re-declares [[concepts/statemaloi|stateMaloi]] semantics or DTO shapes.
- **Non-functional requirement**: Referenced in the PRD's non-functional requirements section under type safety, underscoring its architectural importance beyond feature logic.
- **Consumable as a package**: Designed to be distributed as an importable package (e.g., via npm workspace or private registry), enabling independent versioning and clean dependency management.

## Applications

- **API response typing**: The backend uses DTOs from the shared package to type Express/Cloud Function response payloads, ensuring serialized data conforms to the agreed contract.
- **Frontend state management**: The [[entities/affitti-frontend-v1|Affitti Frontend v1]] imports the same DTOs to type [[concepts/redux-state-slices|Redux store slices]], API call return types, and component props — guaranteeing end-to-end alignment.
- **Input validation**: Enums like [[concepts/statemaloi|stateMaloi]] are used server-side to validate incoming request bodies; any value outside the enum triggers a `400 Bad Request`, and the same enum is available client-side for form validation and UI rendering.
- **Typed service layer**: The shared types underpin the typed TypeScript service layer where all business rules are enforced, ensuring rule logic operates on well-defined, compile-time-checked data structures.
- **Code generation and documentation**: Shared types can serve as input for auto-generated API documentation (e.g., OpenAPI schemas) or client SDKs.
- **Table column rendering**: The [[concepts/tabella-page|Tabella Page]] consumes shared DTOs to render table columns, with risk R2 noting that fields like [[concepts/energy_class|energy_class]], surfaceValue, rent, and contractValue may need flattening in the [[concepts/slim-dto|Slim DTO]] to avoid fragile deep property access.

## Related Concepts

- [[concepts/statemaloi|stateMaloi]]
- [[concepts/slim-dto|Slim DTO]]
- [[concepts/firebase-authentication|Firebase Authentication]]
- [[concepts/write-whitelist|Write whitelist rule]]
- [[concepts/data-normalization|Data normalization]]
- [[concepts/redux-state-slices|Redux state slices]]
- [[concepts/redux|Redux]]
- [[concepts/typescript|TypeScript]]
- [[concepts/tabella-page|Tabella Page]]
- [[concepts/business-rules|business rules]]
- [[concepts/energy_class|energy_class]]

## Related Entities

- [[entities/affitti-backend|Affitti Backend API]]
- [[entities/firebase-cloud-functions|Cloud Functions]]
- [[entities/affitti-frontend-v1|Affitti Frontend v1]]

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "**Type safety** | Shared TS types package (DTOs + enums) consumable by both API and the future frontend."
> - "**BR-1 — State enum.** `stateMaloi`: `0 = non buono`, `1 = buono`, `2 = così così`. Any other value → `400 Bad Request`. Modeled as a TS enum/union shared with the frontend."
> - "**G5** — Enforce all business rules in a typed TypeScript service layer (not in the frontend, not in raw queries)."

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]**
> - "Language | TypeScript, sharing DTO/enum types with the backend package"
> - "**G5** — State management with Redux, typed end-to-end with the shared TypeScript DTOs from the backend."
> - "Business rules (enums, DTOs) are imported from the shared types package — the frontend never re-declares `stateMaloi` semantics."