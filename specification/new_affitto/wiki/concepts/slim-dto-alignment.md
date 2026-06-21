---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [term]
aliases:
  - "DTO Alignment Task"
  - "Slim DTO Flattening"
  - "R2 DTO Alignment"
---


# Slim DTO Alignment

## Definition

Slim DTO Alignment refers to a coordination requirement (identified as risk **R2**) between frontend and backend teams in the Affitti system, stipulating that the backend must expose specific table columns—such as `energy_class`, `surfaceValue`, `rent`, and `contractValue`—as flattened, top-level fields in the slim DTO response. These fields originate from the nested raw [[concepts/powerproperties|powerproperties]] schema, and without proper flattening by the backend, the frontend would be forced to perform fragile deep access into nested objects, leading to brittle code and maintenance risks. An associated open question (Q3) seeks confirmation of the exact source fields for `rent` and `contractValue` within the schema.

## Key Characteristics

- **Risk Classification (R2):** Formally identified as a project risk requiring explicit cross-team coordination before frontend implementation can proceed safely.
- **Flattening Requirement:** Table-relevant fields (`energy_class`, `surfaceValue`, `rent`, `contractValue`) must be promoted from their nested position inside the [[concepts/powerproperties|powerproperties]] object to top-level properties in the slim DTO.
- **Fragile Deep Access Prevention:** Without alignment, the frontend must navigate multiple levels of nested objects (e.g., `item.powerproperties.realEstate.surfaceValue`), which is error-prone and tightly coupled to backend schema internals.
- **Cross-Team Coordination Task:** Requires explicit backend development work and agreement on field names, types, and nullability before the frontend can consume the DTO reliably.
- **Open Question (Q3):** The exact source fields for `rent` and `contractValue` within the [[concepts/powerproperties|powerproperties]] schema have not yet been confirmed, adding uncertainty to the alignment task.
- **Complementary to Null-safe Rendering:** Even after flattening, the frontend must apply [[concepts/null-safe-rendering|null-safe-rendering]] patterns since any field may still be absent or null.

## Applications

- **Backend DTO Design:** Backend developers use this requirement to define and implement the slim DTO shape, ensuring the correct fields are extracted and flattened from the [[concepts/powerproperties|powerproperties]] schema before serving to the frontend.
- **Frontend Table Rendering:** Frontend developers depend on aligned, flat DTO fields to render [[concepts/table|table]] columns without writing fragile nested-access code, enabling straightforward column mapping.
- **Shared Contract Definition:** The alignment task feeds into the [[concepts/shared-types-package|Shared Types Package]] to establish a single source of truth for DTO interfaces consumed by both frontend and backend.
- **Sprint Planning and Risk Management:** Project managers track R2 as a blocking dependency; frontend table work cannot be safely started until the backend confirms the flattened DTO shape.

## Related Concepts

- [[concepts/powerproperties|powerproperties]]
- [[concepts/shared-types-package|Shared Types Package]]
- [[concepts/slim-dto|Slim DTO]]
- [[concepts/null-safe-rendering|null-safe-rendering]]
- [[concepts/tabella-colonne|Table Columns]]
- [[concepts/energy_class|energy_class]]
- [[concepts/realestate|realEstate]]
- [[concepts/table|table]]

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]]

## Mentions in Source

- "Table columns (`energy_class`, `surfaceValue`, `rent`, `contractValue`) are nested inside the raw `powerproperties` schema; the backend slim DTO must expose them flattened, or the frontend will need fragile deep access. Requires a DTO alignment task in the backend." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]