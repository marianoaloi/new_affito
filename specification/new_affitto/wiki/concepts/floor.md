---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "piano"
  - "property floor data"
  - "floor object"
---

## Description

The floor data appears in three distinct structural contexts within the [[entities/affitto_data|affitto_data]] schema. As a top-level property under [[concepts/properties|properties]], it is a structured object containing four required fields (`abbreviation`, `floorOnlyValue`, `ga4FloorValue`, and `value`) that fully describe which floor a property is on. Within [[concepts/surfaceconstitution|surfaceConstitution]] elements, it appears as a simplified nested object with only `value` as a required field, plus an optional `abbreviation`, used to indicate which floor each individual surface component belongs to. Additionally, within the [[concepts/featurelist|featureList]], floor is stored as a simple string value enabling lightweight feature-based filtering. The floor information is critical for rental decision-making, particularly in relation to [[concepts/elevator|elevator]] availability tracked in the count collection's elevator/noElevator/emptyElevator fields, as the presence or absence of an elevator significantly impacts the desirability of upper-floor properties.

## Key Characteristics

- **Triple representation**: Exists in three structural forms depending on context: a full structured object (top-level properties), a simplified object (within surfaceConstitutionElements), and a simple string value (within featureList)
- **Top-level structured object fields**: When represented as the main floor property, it contains four required fields:
  - `abbreviation` — a short-form label for the floor (e.g., "PT", "1°")
  - `floorOnlyValue` — the numeric or descriptive floor value in isolation
  - `ga4FloorValue` — a floor value formatted specifically for Google Analytics 4 tracking
  - `value` — the canonical floor value used for display and logic
- **Surface-level simplified object**: Within [[concepts/surfaceconstitution|surfaceConstitution]] elements, floor is an object with only `value` as required and an optional `abbreviation` field
- **Feature list inclusion**: Also stored as a simple string within the [[concepts/featurelist|featureList]], enabling lightweight feature-based filtering
- **Analytics-ready**: The dedicated `ga4FloorValue` field demonstrates that floor data is designed to feed into analytics pipelines
- **Elevator correlation**: Floor data is particularly meaningful in conjunction with [[concepts/elevator|elevator]] availability data, as this combination is critical for rental decision-making

## Applications

- **Property filtering**: Users can filter rental listings by floor level, a common criterion in rental property searches (e.g., ground floor vs. upper floors)
- **Analytics and reporting**: The `ga4FloorValue` field enables tracking of floor-related metrics in Google Analytics 4, supporting behavioral analysis of user preferences
- **Surface composition analysis**: Within [[concepts/surfaceconstitution|surfaceConstitution]], the floor field helps break down multi-floor properties by associating each surface element with its respective floor
- **Feature-based decision-making**: As part of the [[concepts/featurelist|featureList]], floor data contributes to the [[concepts/feature-analysis|Feature analysis view]] where evaluators can review and compare property attributes
- **Elevator-floor evaluation**: Combined with elevator availability data, floor information supports critical rental desirability assessments

## Related Concepts

- [[concepts/surfaceconstitution|surfaceConstitution]] — floor data appears within surface constitution elements as a simplified object to track which floor each surface component belongs to
- [[concepts/featurelist|featureList]] — floor is included as a string value within the feature list for lightweight filtering
- [[concepts/primaryfeatures|primaryFeatures]] — related property feature grouping within the schema
- [[concepts/location|location]] — complementary spatial information about the property
- [[concepts/feature-analysis|Feature analysis view]] — the analysis view where floor data is reviewed alongside other property features
- [[concepts/elevator|elevator]] — elevator availability data that is critically related to floor information for rental decision-making
- [[concepts/properties|properties]] — the top-level properties object where the full floor object is defined

## Related Entities

- [[entities/affitto_data|affitto_data]] — the parent collection/schema where the floor object is defined
- [[entities/feature|feature]] — the feature collection where floor-related data may be stored for analysis

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "\"floor\": { \"type\": \"object\", \"required\": [ \"abbreviation\", \"floorOnlyValue\", \"ga4FloorValue\", \"value\" ]"
> - "\"floor\": { \"type\": \"string\" }"
> - "\"floor\": { \"type\": \"object\", \"required\": [ \"value\" ], \"properties\": { \"abbreviation\": { \"type\": \"string\" }, \"value\": { \"type\": \"string\" } } }"