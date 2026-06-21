---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [method]
aliases:
  - "Null-safe Rendering"
  - "FR-10 Null-safe Rendering"
  - "null-safe cell rendering"
---


# Null-safe Rendering

## Definition

Null-safe Rendering is a frontend resilience pattern mandated by functional requirement FR-10 in the Affitti Frontend v1. Because the application's data originates from web scraping, it is inherently irregular — fields may be missing, values may be null, and NaN artifacts can appear. Null-safe Rendering ensures that every cell in the [[concepts/tabella-page|Tabella Page]] gracefully tolerates missing or null values without breaking the entire row or crashing the table component. The pattern is enforced both at the frontend level (FR-10) and complemented by backend business rule BR-4, which pre-sanitizes data before it reaches the client.

## Key Characteristics

- **Mandatory for all table cells**: Every column renderer in the [[concepts/tabella-page|Tabella Page]] must implement null-safe logic; no cell is exempt from this requirement.
- **Graceful fallback display**: When a value is absent, the cell renders a neutral placeholder (e.g., `'—'`) rather than leaving a blank, showing `undefined`, or throwing an error. For example, the [[concepts/energy_class|energy_class]] column renders an A–G badge when present and `'—'` when absent.
- **Defense against scraped data irregularity**: Specifically addresses the unpredictable nature of web-scraped datasets, where field availability varies across listings and data quality is not guaranteed.
- **Dual-layer mitigation**: Works in tandem with backend business rule BR-4, which normalizes or filters problematic data before the frontend receives it, creating a defense-in-depth approach.
- **Risk-driven design**: Directly mitigates Risk R3, which identifies scraped data irregularity (nulls, NaN artifacts) as a threat to table rendering stability.
- **Row-level isolation**: A null or missing value in one cell must not propagate failure to sibling cells or break the rendering of the entire row.

## Applications

- **Rental listing tables**: In the [[concepts/tabella-page|Tabella Page]], each column (price, area, [[concepts/energy_class|energy_class]], [[concepts/title|title]], etc.) independently handles missing data, ensuring the table remains functional even when scraped sources provide incomplete records.
- **Badge and formatted value rendering**: Columns that display enriched UI elements (such as energy class badges or [[concepts/statemaloi-badge-rendering|stateMaloi badges]]) must degrade gracefully to a text placeholder when the underlying value is null.
- **General frontend resilience**: The pattern serves as a model for any data-driven UI that consumes external or unreliable data sources, ensuring visual consistency and preventing runtime exceptions.

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — the primary UI surface where null-safe rendering is applied across all cells
- [[concepts/tabella-colonne|Tabella Colonne]] — the column schema definitions that must each implement null-safe logic
- [[concepts/energy_class|energy_class]] — a specific column example where null-safe rendering produces a badge or dash fallback
- [[concepts/statemaloi-badge-rendering|stateMaloi badge rendering]] — another badge-style column requiring null-safe handling
- [[concepts/business-rules|business rules]] — backend BR-4 complements FR-10 by sanitizing data before it reaches the frontend
- [[concepts/table|table]] — the general data table concept in the system
- [[concepts/formati-dati|Data Formats]] — data format definitions that interact with null-safe rendering logic

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the frontend application where FR-10 is mandated

## Mentions in Source

- **FR-10** — "Null-safe rendering: scraped data is irregular; every cell must tolerate missing/null values without breaking the row." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- **R3** — "Scraped data irregularity (nulls, NaN artifacts) can break table rendering — mitigated by FR-10 and backend BR-4." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]