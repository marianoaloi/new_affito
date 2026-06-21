---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "elevator metrics"
  - "disability access tracking"
  - "accessibility tracking fields"
---


# Elevator Accessibility Tracking

## Definition

Elevator accessibility tracking is a dedicated metric system within the count collection of the Affitto rental platform that aggregates information about property accessibility features. It encompasses six specific counter fields—three for elevator presence and three for disability access—providing specialized accessibility analytics separate from the general [[concepts/acceptdenywait|accept/deny/wait classification]]. The system tracks not only whether properties have these features but also whether the information is available, enabling comprehensive data completeness reporting.

## Key Characteristics

- **Six dedicated counter fields**: The system maintains three elevator-related fields (`elevator`, `noElevator`, `emptyElevator`) and three disability-related fields (`disable`, `nodisable`, `emptydisable`), each stored as integers in the count collection
- **Ternary tracking pattern**: Each accessibility dimension follows a three-state model: feature present, feature absent, and information not available (empty), enabling data completeness analysis alongside feature analytics
- **Separation from decision state tracking**: Accessibility counters operate independently from the [[concepts/acceptdenywait|accept/deny/wait counters]], forming a parallel aggregation dimension within the same count document
- **Cross-collection presence**: The [[concepts/elevator|elevator]] field appears in multiple contexts—as an integer counter in the count collection, as a boolean in the [[concepts/properties|properties]] object of affitto_data, and as a string in the [[concepts/featurelist|featureList]]—reflecting its importance as a key property attribute
- **Integer-based aggregation**: All six fields use integer types in the count collection, supporting incremental aggregation through the [[concepts/data-aggregation|data aggregation pipeline]]

## Applications

- **Accessibility analytics dashboard**: Aggregated counts enable reporting on the proportion of listed properties that offer elevator access or disability accommodations, supporting the [[concepts/feature-analysis|feature analysis view]]
- **Data quality monitoring**: The "empty" variants (`emptyElevator`, `emptydisable`) allow tracking how many property listings lack accessibility information, highlighting data completeness gaps
- **Filtering and search optimization**: Since [[concepts/elevator|elevator]] appears as a boolean in property data and as a string in [[concepts/featurelist|featureList]], it serves as a filterable criterion for property searches
- **Regulatory and compliance reporting**: Accessibility metrics can be used to demonstrate platform awareness of disability access requirements across the property portfolio
- **Market analysis**: Understanding the distribution of accessible properties across regions (in combination with [[concepts/province-filter|province filtering]]) provides market intelligence

## Related Concepts

- [[concepts/elevator|elevator]]
- [[concepts/disable|disability access]]
- [[concepts/acceptdenywait|accept/deny/wait classification]]
- [[concepts/emptychoise|emptyChoise]]
- [[concepts/featurelist|featureList]]
- [[concepts/properties|properties]]
- [[concepts/data-aggregation|Data aggregation pipeline]]
- [[concepts/feature-analysis|Feature analysis view]]
- [[concepts/primaryfeatures|Primary Features]]

## Related Entities

- [[entities/count|count]]
- [[entities/affitto_data|affitto_data]]

## Mentions in Source

- "\"elevator\": { \"type\": \"integer\" }, \"emptyChoise\": { \"type\": \"integer\" }, \"emptydisable\": { \"type\": \"integer\" }, \"emptyElevator\": { \"type\": \"integer\" }, \"nodisable\": { \"type\": \"integer\" }, \"noElevator\": { \"type\": \"integer\" }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"elevator\": { \"type\": \"boolean\" }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"elevator\": { \"type\": \"string\" }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]