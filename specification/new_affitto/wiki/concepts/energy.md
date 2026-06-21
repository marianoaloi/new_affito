---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "energy object"
  - "energy class"
  - "energy certification"
---

## Basic Information

- **Type:** concept
- **Subtype:** term
- **Sources:** [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]

## Definition

The `energy` object is an optional sub-object within the [[concepts/properties|properties]] of an [[entities/affitto_data|affitto_data]] document that stores energy performance data for a rental property. It encapsulates all fields related to Italian energy certification requirements for real estate listings, including energy class designation, energy performance index (EPI), emission data, thermal insulation status, zero-energy building classification, heating and air conditioning details, renewable EPI values, and seasonal building performance ratings. The `energyStatus` field indicates the current certification status of the property.

## Key Characteristics

- **Structured as a nested JSON object** within the [[concepts/properties|properties]] field of an [[entities/affitto_data|affitto_data]] document
- **Required sub-fields** include `emission`, `thermalInsulation`, and `zeroEnergyBuilding` — these must be present when the energy object is provided
- **Energy class** is itself a sub-object with `color` and `name` fields (both required), enabling visual representation of the energy rating (e.g., class A4 in green, class G in red)
- **EPI (Energy Performance Index)** includes a numeric value and a unit of measurement, quantifying the property's energy consumption per unit area; the EPI value accepts number, string, or integer types for flexibility
- **Building performance** is a sub-object (see [[concepts/buildingperformance|buildingPerformance]]) with required `summer` and `winter` fields, reflecting seasonal energy efficiency ratings
- **Renewable EPI** captures the portion of energy performance attributable to renewable energy sources
- **Boolean flags** such as `zeroEnergyBuilding` and `thermalInsulation` provide quick assessments of specific energy features
- **Heating type and air conditioning** fields describe the HVAC configuration of the property
- **Reflects Italian regulatory standards** for energy certification (APE — Attestato di Prestazione Energetica), which are mandatory for real estate listings in Italy
- **Supports energy efficiency evaluation**: The data contained in the energy object is important for evaluating the energy efficiency and operating costs of potential rental properties

## Applications

- **Rental property listings**: Displaying standardized energy performance data to prospective tenants, enabling comparison across listings
- **Regulatory compliance**: Ensuring that real estate advertisements include mandatory energy certification information as required by Italian law
- **Energy efficiency filtering**: Allowing users to filter or sort rental properties based on energy class, EPI values, or seasonal building performance
- **Data aggregation and analytics**: Supporting analysis of energy efficiency trends across rental property portfolios
- **UI rendering**: The `class.color` field enables frontend applications (such as the [[concepts/react-and-redux-frontend|React Redux frontend]]) to render color-coded energy class badges
- **Operating cost assessment**: Enabling prospective tenants to evaluate anticipated energy costs based on EPI values and energy class ratings

## Related Concepts

- [[concepts/properties|properties]] — parent object within which the energy sub-object is nested
- [[concepts/buildingperformance|buildingPerformance]] — sub-object capturing seasonal (summer/winter) building energy performance ratings
- [[concepts/realestatepage|realEstatePage]] — parent page-level object that contextualizes property data including energy information
- [[concepts/featurelist|featureList]] — complementary object storing property features alongside energy data
- [[concepts/primaryfeatures|primaryFeatures]] — primary property features that may reference energy-related attributes
- [[concepts/data-normalization|Data normalization]] — normalization rules that may apply to energy field values during ingestion
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define the energy object's structure and validation rules

## Related Entities

- [[entities/affitto_data|affitto_data]] — the collection whose documents contain the energy sub-object within their properties
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that serves and validates energy data
- [[entities/udine|udine database]] — the MongoDB database where affitto_data documents (including energy data) are stored

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "\"energy\": { \"type\": \"object\", \"required\": [ \"emission\", \"thermalInsulation\", \"zeroEnergyBuilding\" ]"
> - "\"class\": { \"type\": \"object\", \"required\": [ \"color\", \"name\" ]"
> - "\"buildingPerformance\": { \"type\": \"object\", \"required\": [ \"summer\", \"winter\" ]"
> - "\"energy\": { \"type\": \"object\", \"required\": [ \"emission\", \"thermalInsulation\", \"zeroEnergyBuilding\" ]"