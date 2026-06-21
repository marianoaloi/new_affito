---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "airConditioning field"
  - "aria condizionata"
  - "air conditioning property"
---


# airConditioning

## Definition
`airConditioning` is a string field within the [[concepts/energy|energy]] object of the `affitto_data` collection schema. It describes the type or configuration of the air conditioning system available in a rental property. As a component of the energy information block, this field captures air conditioning as an energy infrastructure attribute rather than a general amenity, reflecting its relevance to both occupant comfort and energy consumption profiling.

## Key Characteristics
- **Data type:** String — allows free-text or enumerated descriptions of the air conditioning system
- **Schema location:** Nested inside the `energy` object, alongside other energy-related attributes such as heating type, energy class, EPI values, and [[concepts/buildingperformance|building performance]] ratings
- **Non-required field:** Unlike `emission`, `thermalInsulation`, and `zeroEnergyBuilding`, `airConditioning` is not listed among the required properties of the energy object
- **Energy infrastructure classification:** Its placement within the [[concepts/energy|energy]] object rather than the [[concepts/featurelist|featureList]] object indicates it is treated as an energy infrastructure attribute, not a general property feature
- **Schema standard:** Defined as part of a [[concepts/json-schema|JSON Schema]] specification for the rental data collection

## Applications
- **Property energy profiling:** Enables categorization of rental listings based on their cooling infrastructure, contributing to a comprehensive energy profile alongside heating, insulation, and emissions data
- **Rental search filtering:** Can be used as a filter criterion for prospective tenants seeking properties with specific air conditioning configurations
- **Energy efficiency assessment:** Supports evaluation of a property's overall energy characteristics when combined with other fields in the [[concepts/energy|energy]] object
- **Data aggregation and reporting:** Facilitates [[concepts/data-aggregation|data aggregation]] across rental listings to analyze air conditioning prevalence and types across geographic areas or property categories

## Related Concepts
- [[concepts/energy|energy]] — Parent object containing the airConditioning field
- [[concepts/buildingperformance|buildingPerformance]] — Sibling field within the energy object describing building performance ratings
- [[concepts/featurelist|featureList]] — Separate object for general property features, distinct from energy infrastructure attributes
- [[concepts/properties|properties]] — Top-level properties object of the rental listing schema
- [[concepts/json-schema|JSON Schema]] — Schema standard used to define the field's type and structure
- [[concepts/primaryfeatures|primaryFeatures]] — Related property features object

## Related Entities
- [[entities/affitto_data|affitto_data]] — The MongoDB collection whose schema includes this field

## Mentions in Source
- "\"airConditioning\": { \"type\": \"string\" }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"energy\": { \"type\": \"object\", \"required\": [ \"emission\", \"thermalInsulation\", \"zeroEnergyBuilding\" ], \"properties\": { \"airConditioning\": { \"type\": \"string\" }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]