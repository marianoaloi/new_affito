---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "ascensore"
  - "lift"
  - "elevator field"
---


# Elevator

## Definition

Elevator is a significant property attribute tracked across multiple parts of the Affitti rental property system. It represents the presence or absence of an elevator (lift) in a rental property and is modeled in several distinct ways throughout the data architecture: as a boolean field in the `affitto_data` properties object, as a string value in the feature list, and as a set of integer aggregation counters in the count collection. This multi-dimensional representation underscores elevator availability as a key decision criterion in rental property evaluation, particularly for accessibility considerations.

## Key Characteristics

- **Multi-type representation**: The elevator attribute appears with different data types depending on context — `boolean` in the core property data model, `string` in the feature list, and `integer` in aggregation counts
- **Ternary tracking in aggregations**: The [[entities/count|count]] collection tracks three elevator-related states: properties with an elevator, properties without an elevator (`noElevator`), and properties where elevator data is missing (`emptyElevator`), enabling comprehensive data completeness analysis
- **Accessibility indicator**: Serves as a primary accessibility criterion for property evaluation, especially relevant for multi-story buildings
- **Feature analysis dimension**: Elevator data feeds into the [[concepts/feature-analysis|Feature analysis view]] for comparative property assessment
- **Data completeness metric**: The `emptyElevator` counter allows the system to monitor and report on data quality gaps related to this attribute

## Applications

- **Property filtering and search**: Evaluators can filter rental listings based on elevator availability, which is critical for accessibility requirements
- **Data quality monitoring**: The three-state aggregation (present, absent, missing) enables administrators to identify listings with incomplete data and prioritize data enrichment efforts
- **Comparative property analysis**: Elevator presence contributes to the overall feature profile of a property, feeding into the [[concepts/feature-analysis|feature analysis view]] for side-by-side evaluation
- **Aggregated market insights**: The [[entities/count|count]] collection's elevator metrics provide portfolio-level statistics on elevator availability across tracked properties
- **Accessibility compliance**: Tracking elevator presence supports compliance with accessibility standards and helps evaluators identify suitable properties for tenants with mobility needs

## Related Concepts

- [[concepts/featurelist|featureList]] — Contains the elevator attribute as a string value within the property feature set
- [[concepts/primaryfeatures|primaryFeatures]] — Related primary features object that categorizes key property attributes
- [[concepts/data-aggregation|Data aggregation pipeline]] — The aggregation mechanism that computes elevator-related counts
- [[concepts/feature-analysis|Feature analysis view]] — The analysis view where elevator data contributes to property evaluation
- [[concepts/floor|floor]] — Complementary property attribute; elevator relevance increases with higher floor numbers
- [[concepts/data-normalization|Data normalization]] — Normalization rules that may apply to elevator field values across different representations

## Related Entities

- [[entities/count|count]] — Collection containing the three elevator aggregation fields (`elevator`, `noElevator`, `emptyElevator`)
- [[entities/feature|feature]] — Feature collection where elevator may appear as a tracked feature
- [[entities/udine|udine]] — The MongoDB database housing the collections that store elevator data

## Mentions in Source

- "\"elevator\": { \"type\": \"boolean\" }" — [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]
- "\"elevator\": { \"type\": \"string\" }" — [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]
- "\"elevator\": { \"type\": \"integer\" }, \"emptyChoise\": { \"type\": \"integer\" }, \"emptydisable\": { \"type\": \"integer\" }, \"emptyElevator\": { \"type\": \"integer\" }" — [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]