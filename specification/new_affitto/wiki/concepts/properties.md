---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "properties object"
  - "properties field"
  - "listing properties"
---


# Properties

## Definition

The `properties` object is a required top-level field within the **affitto_data** collection schema that encapsulates the detailed attributes of a rental listing. It serves as the richest and most complex part of the data model, aggregating all descriptive, spatial, financial, multimedia, and energy-related information about a property into a single structured object. The `properties` field is validated as a JSON object type with its own internal required fields (`location` and `multimedia`).

## Key Characteristics

- **Required top-level field**: Part of the five mandatory root fields in the affitto_data document schema (alongside `_id`, `feature`, `realEstatePage`, and `type`)
- **Object type**: Defined as `"type": "object"` in the [[concepts/json-schema|JSON Schema]] specification
- **Internal required sub-objects**: Must contain at least `location` and `multimedia` sub-objects
- **Deeply nested structure**: Contains numerous sub-objects each responsible for a specific domain of property data:
  - **Location**: Address, city, province, geographic coordinates — see [[concepts/location|location]]
  - **Multimedia**: Photos, videos, virtual tours, floorplans, documents — see [[concepts/multimedia|multimedia]]
  - **Energy**: Energy class, EPI, heating type, air conditioning — see [[concepts/energy|energy]]
  - **Floor**: Floor-level information — see [[concepts/floor|floor]]
  - **Costs**: Condominium expenses, heating expenses, agency commission — see [[concepts/costs|costs]]
  - **Rent**: Student availability, deposit, redemption rent — see [[concepts/rent|rent]]
  - **Surface constitution**: Breakdown of surface areas — see [[concepts/surfaceconstitution|surfaceConstitution]]
- **General scalar fields**: Includes [[concepts/availability|availability]], `buildingYear`, [[concepts/elevator|elevator]], [[concepts/garage|garage]], and description fields
- **Central to the data model**: Acts as the primary container for all listing-specific information, separating descriptive property data from metadata and classification concerns

## Applications

- **Rental listing data storage**: Serves as the canonical structure for persisting all property attributes in the MongoDB-backed affitto_data collection
- **Schema validation**: Enforced via [[concepts/json-schema|JSON Schema]] validation to ensure data integrity — requiring at minimum `location` and `multimedia` sub-objects
- **API serialization**: Used as the basis for constructing API responses and [[concepts/slim-dto|DTO]] representations of property listings
- **Data aggregation and filtering**: Sub-fields such as location (province, city) and costs feed into [[concepts/data-aggregation|aggregation pipelines]] and filtering operations like [[concepts/province-filter|province filter]]
- **Web scraping ingestion**: [[concepts/web-scraping|Web scraping]] processes populate the properties object with normalized data via [[concepts/data-normalization|data normalization]] rules
- **Feature analysis**: Property attributes within `properties` are consumed by [[concepts/feature-analysis|feature analysis views]] for evaluation and comparison

## Related Concepts

- [[concepts/featurelist|featureList]] — sibling top-level field that classifies listing features
- [[concepts/location|location]] — required sub-object for geographic data
- [[concepts/multimedia|multimedia]] — required sub-object for media assets
- [[concepts/energy|energy]] — sub-object for energy certification data
- [[concepts/floor|floor]] — sub-object for floor information
- [[concepts/costs|costs]] — sub-object for expense details
- [[concepts/rent|rent]] — sub-object for rental terms
- [[concepts/surfaceconstitution|surfaceConstitution]] — sub-object for surface breakdown
- [[concepts/availability|availability]] — general field for listing availability
- [[concepts/elevator|elevator]] — general field for elevator presence
- [[concepts/garage|garage]] — general field for parking/garage data
- [[concepts/json-schema|JSON Schema]] — validation standard used to define the properties structure
- [[concepts/realestatepage|realEstatePage]] — sibling top-level field in the document schema
- [[concepts/price|price]] — related pricing data structure

## Related Entities

- [[entities/affitto_data|affitto_data]] — the MongoDB collection whose documents contain the properties object

## Mentions in Source

- "\"properties\": { \"type\": \"object\", \"required\": [ \"location\", \"multimedia\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"required\": [ \"_id\", \"feature\", \"properties\", \"realEstatePage\", \"type\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]