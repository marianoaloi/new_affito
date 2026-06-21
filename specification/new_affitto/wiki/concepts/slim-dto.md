---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "method"
aliases:
  - "Data Transfer Object"
  - "DTO"
---

## Description

Slim DTO (Data Transfer Object) is a design pattern employed in the [[entities/affitti-backend|Affitti Backend]] to control API response payloads by returning only a curated subset of fields rather than the full raw scraped document. For the paginated listing endpoint (FR-1), the API returns a lightweight DTO containing only essential fields — `id`, `title`, `price`, `surface`, `rooms`, `province`, `type`, [[concepts/statemaloi|stateMaloi]], `thumbnail`, and `geo` — keeping payloads small and stable. This directly mitigates risk R2, which identifies the raw scraped schema as too large and irregular for direct consumption. A complementary normalized DTO is used for the full detail endpoint (FR-2), where data cleaning is applied per business rule BR-4 to remove raw Double/NaN artifacts via [[concepts/data-normalization|data normalization]]. A shared TypeScript types package is planned to make DTOs and enums consumable by both the API layer and the frontend, ensuring type consistency across the stack.

## Key Characteristics

- **Selective field projection**: Only essential, consumer-relevant fields are included in the response, omitting the large nested structures present in the raw scraped documents stored in [[entities/affitto_data|affitto_data]]
- **Payload minimization**: Reduces network transfer size and parsing overhead for API consumers, particularly important for mobile and frontend clients
- **Schema stability**: Decouples the API contract from the underlying raw scraped schema, which is described as "very large and irregular," preventing brittle integrations
- **Two-tier DTO strategy**: A slim DTO serves the paginated listing endpoint (FR-1) for browsing, while a normalized DTO with data cleaning (removing Double/NaN artifacts per BR-4) serves the detail endpoint (FR-2) for in-depth views
- **Shared TypeScript types**: A shared types package is planned to make DTOs and enums consumable by both the API layer and the frontend, ensuring type consistency across the stack
- **Fields included**: `id`, `title`, `price`, `surface`, `rooms`, `province`, `type`, `stateMaloi`, `thumbnail`, `geo`

## Applications

- **Listing API responses**: The primary application is the FR-1 paginated listing endpoint in [[entities/affitti-backend|Affitti Backend]], where clients need to display a browsable list of rental properties without loading full document details
- **Risk mitigation**: Addresses risk R2 by ensuring payloads remain lightweight and structurally predictable, even as the underlying scraped data schema evolves or contains irregular fields
- **Frontend integration**: Enables efficient rendering of property cards or list items by providing exactly the fields needed for summary display (title, price, thumbnail, location, etc.)
- **API contract stabilization**: Acts as a contract layer between the raw data in [[entities/affitto_data|affitto_data]] and external consumers, allowing the scraping schema to change without breaking downstream clients

## Related Concepts

- [[concepts/data-normalization|Data Normalization]]
- [[concepts/statemaloi|stateMaloi]]
- [[concepts/split-collection-architecture|Split-collection Architecture]]

## Related Entities

- [[entities/affitto_data|affitto_data]]
- [[entities/affitti-backend|Affitti Backend]]
- [[entities/firebase-cloud-functions|Cloud Functions]]

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "Returns a **slim DTO** (id, title, price, surface, rooms, province, type, stateMaloi, thumbnail, geo) — never the full raw document, to keep payloads small."
> - "**R2** — Raw scraped schema is very large and irregular; without slim DTOs, payloads will be heavy and brittle."