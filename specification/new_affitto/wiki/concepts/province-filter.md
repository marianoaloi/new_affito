---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "method"
aliases:
  - "provinzia filter"
  - "province filtering"
  - "geographic filter"
---

## Basic Information
- **Type:** concept
- **Subtype:** method
- **Sources:** [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]

## Definition
Province filter is one of the two primary filtering mechanisms available on the [[entities/affitto_data|affitto_data]] collection, alongside type filtering. It enables users to query rental data by province (geographic region), narrowing down listings to specific geographic areas. The province field is present in both the feature sub-document and the location sub-document of rental listings, and is also used as part of a composite key in the [[entities/count|count]] collection's `_id` field alongside `type`. In the [[entities/feature|feature]] collection, province exists as a top-level field. The [[entities/count|count]] collection aggregates statistics grouped by province and type combination, providing summary metrics like total, [[concepts/acceptdenywait|accept, deny, and wait]] counts per province-type pair.

## Key Characteristics
- **Primary filter axis**: Operates as one of two fundamental query parameters (province and type) for the rental data API's read operations
- **Geographic scoping**: Allows narrowing of rental listings to a specific Italian province (e.g., geographic administrative region)
- **Cross-document presence**: The province value appears in multiple sub-documents — both the [[concepts/featurelist|featureList]] and [[concepts/location|location]] objects within a listing document
- **Top-level field in feature collection**: In the [[entities/feature|feature]] collection, province is stored as a top-level field rather than nested within a sub-document
- **Composite key component**: Used alongside `type` as a required field in the [[entities/count|count]] collection's `_id` object, forming a compound identifier for aggregated counts
- **String-typed**: The province field is defined as a simple string type in the schema
- **Paired with type filter**: Always discussed in conjunction with the type filter, suggesting they are the two supported dimensions for querying the [[entities/affitto_data|affitto_data]] collection
- **Aggregation grouping dimension**: The count collection groups statistics (total, accept, deny, wait) by province-type combination, enabling summary metrics per geographic-type pair

## Applications
- **Rental search by region**: Users can retrieve all rental listings within a specific Italian province, enabling location-based property discovery
- **Aggregated count lookups**: The [[entities/count|count]] collection uses province as part of its composite `_id`, allowing retrieval of listing counts per province-type combination
- **Summary metrics retrieval**: Enables retrieval of aggregated statistics (total, [[concepts/acceptdenywait|accept/deny/wait]] counts) scoped to a specific province-type pair
- **Data segmentation**: Supports geographic segmentation of rental data for analysis, reporting, or UI filtering in the [[concepts/react-and-redux-frontend|React/Redux UI]]
- **API query parameter**: Serves as a query parameter in the [[entities/affitti-backend|Affitti Backend API]] read endpoints to scope results geographically

## Related Concepts
- [[concepts/split-collection-architecture|Split-collection pattern]] — the architectural pattern separating read and write collections that the filter operates within
- [[concepts/location|location]] — sub-document containing the province field for geographic data
- [[concepts/featurelist|featureList]] — sub-document that also contains province information
- [[concepts/data-aggregation|data-aggregation]] — aggregation pipeline that may use province as a grouping dimension
- [[concepts/slim-dto|slim-dto]] — data transfer object pattern that may include province as a filterable field
- [[concepts/feature-analysis|feature-analysis]] — analysis view that may leverage province-based filtering
- [[concepts/acceptdenywait|accept/deny/wait counters]] — decision state aggregation metrics grouped by province-type combination in the count collection
- [[concepts/json-schema|JSON Schema]] — schema definition format in which the province field's string type is specified

## Related Entities
- [[entities/affitto_data|affitto_data]] — the primary collection on which province filtering is applied
- [[entities/count|count]] — the aggregation collection that uses province as part of its composite `_id` key
- [[entities/feature|feature]] — the feature collection containing province as a top-level field
- [[entities/affitti-backend|Affitti Backend API]] — the API layer exposing province filtering capabilities
- [[entities/mongodb-atlas|MongoDB Atlas Cloud]] — the database platform hosting the filtered collections

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "Can filter  | type o provinzia"
> - `"_id": { "type": "object", "required": [ "province", "type" ], "properties": { "province": { "type": "string" }, "type": { "type": "string" } } }`
> - `"province": { "type": "string" }`
> - `| Can filter  | type o provinzia          |`