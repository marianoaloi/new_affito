---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "disability access"
  - "accessibilità disabili"
  - "disable field"
---


# Disable

## Definition

"Disable" is a term used within the Affitti rental system to denote disability accessibility tracking across property listings. It functions as both a data field in individual property records and as an aggregation metric in the count collection. The term encompasses a trio of aggregation counters — `disable`, `nodisable`, and `emptydisable` — that quantify how many properties offer disability access, lack it, or have missing data respectively. At the individual property level, disability accessibility is captured through fields such as `Accesso_per_disabili` (disability access) and `Bagno_per_disabili` (disability bathroom) within the [[concepts/primaryfeatures|primaryFeatures]] object.

## Key Characteristics

- **Tri-state aggregation model**: Disability accessibility is tracked using three integer counters — `disable` (properties with accessibility), `nodisable` (properties without accessibility), and `emptydisable` (properties where the data is missing or not provided) — ensuring complete coverage of all possible data states.
- **Integer-typed fields**: All disability-related fields are stored as integers, consistent with the [[concepts/json-schema|JSON Schema]] typing conventions used throughout the system.
- **Property-level granularity**: Individual properties record specific accessibility features (e.g., `Accesso_per_disabili` for general disability access and `Bagno_per_disabili` for disability-accessible bathrooms) as part of the [[concepts/primaryfeatures|primaryFeatures]] object.
- **Aggregation-level summary**: The count collection aggregates disability accessibility data across all properties, enabling system-wide analysis and reporting via the [[concepts/data-aggregation|data aggregation]] pipeline.
- **Handles missing data explicitly**: The `emptydisable` counter specifically tracks properties where disability accessibility information has not been provided, supporting data quality monitoring.

## Applications

- **Property filtering and search**: Evaluators and users can filter rental listings based on disability accessibility criteria, enabling targeted searches for accessible properties.
- **Data completeness monitoring**: The `emptydisable` aggregation field allows system administrators to identify gaps in disability accessibility data and prioritize data collection efforts.
- **Feature analysis and reporting**: Disability accessibility metrics feed into the [[concepts/feature-analysis|feature analysis view]], providing statistical insights into the proportion of accessible properties in the system.
- **Compliance and decision-making**: Systematic tracking of disability accessibility supports property evaluation workflows and may assist with regulatory compliance for accessible housing requirements.

## Related Concepts

- [[concepts/primaryfeatures|primaryFeatures]] — parent object containing the property-level disability accessibility fields
- [[concepts/data-aggregation|Data aggregation pipeline]] — mechanism used to compute the `disable`, `nodisable`, and `emptydisable` counts
- [[concepts/feature-analysis|Feature analysis view]] — reporting view that consumes aggregated disability accessibility metrics
- [[concepts/json-schema|JSON Schema]] — schema standard used to define the integer typing of disability fields
- [[concepts/split-collection-architecture|Split-collection pattern]] — architectural pattern separating the count and property data collections

## Related Entities

- [[entities/count|count]] — the aggregation collection containing the `disable`, `nodisable`, and `emptydisable` summary fields
- [[entities/affitto-data|affitto_data]] — the property data collection where individual disability accessibility fields are stored within [[concepts/primaryfeatures|primaryFeatures]]

## Mentions in Source

- "disable": { "type": "integer" } — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "nodisable": { "type": "integer" } — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "emptydisable": { "type": "integer" } — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "Accesso_per_disabili": { "type": "integer" } — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]