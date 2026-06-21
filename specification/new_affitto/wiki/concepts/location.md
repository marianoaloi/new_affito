---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "location object"
  - "property location"
  - "location sub-object"
---

## Basic Information

- **Type:** concept
- **Concept subtype:** term
- **Sources:** [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]], [[sources/prd_affitti_backend_v0-3_1d90fc|prd_affitti_backend_v0-3_1d90fc]]

## Definition

The **location** object is a required sub-object within the [[concepts/properties|properties]] field of each [[entities/affitto_data|affitto_data]] document. It encapsulates comprehensive geographic information about a rental listing, serving as the primary spatial data structure that enables geographic filtering and map-based visualization of rental properties. The object contains fields for human-readable address components (address, city, province, region), machine-readable identifiers (cityId, provinceId, macrozoneId), geospatial coordinates (latitude, longitude), zone classification (macrozone, microzone), a locality field, and map rendering hints (marker, zoom). The `nation` field is itself a nested object containing `id`, `keyurl`, and `name` sub-fields. All sixteen fields within the location object are marked as required by the [[concepts/json-schema|JSON Schema]] definition: address, city, cityId, latitude, locality, longitude, macrozone, macrozoneId, marker, microzone, nation, province, provinceId, region, streetNumber, and zoom.

## Key Characteristics

- **Required field**: Location is one of two required sub-objects (alongside [[concepts/multimedia|multimedia]]) within the [[concepts/properties|properties]] object of every [[entities/affitto_data|affitto_data]] document
- **Sixteen required sub-fields**: The JSON Schema declares all sub-fields as required: address, city, cityId, latitude, locality, longitude, macrozone, macrozoneId, marker, microzone, nation, province, provinceId, region, streetNumber, and zoom
- **Rich geographic hierarchy**: Contains a full address hierarchy from street-level (`address`, `streetNumber`) through administrative divisions (`city`, `province`, `region`) up to country (`nation`)
- **Dual identification**: Geographic entities are represented with both human-readable names (e.g., `city`, `province`) and corresponding machine IDs (e.g., `cityId`, `provinceId`, `macrozoneId`) for reliable programmatic lookups
- **Nullable fields**: Several fields permit `null` values — specifically `latitude`, `longitude`, `macrozone`, `address`, and `streetNumber` — reflecting the reality of incomplete data gathered during the [[concepts/web-scraping|web scraping]] process
- **Nested nation object**: The `nation` field is not a simple scalar but a nested object with its own structure (`id`, `keyurl`, `name`), enabling internationalization and URL-friendly routing
- **Zone classification**: Includes both `macrozone` and `microzone` fields for sub-city geographic segmentation, useful for real estate market analysis
- **Locality field**: Contains a `locality` field providing additional geographic granularity beyond standard address components
- **Map support fields**: Contains `marker`, `zoom`, `latitude`, and `longitude` fields that directly support map-based UI rendering
- **Filter dimension**: Province is one of only two supported filter dimensions (alongside `type`) for querying [[entities/affitto_data|affitto_data]] documents, as described in [[concepts/province-filter|province filter]]

## Applications

- **Geographic filtering**: The `province` field serves as a primary query filter for the API, allowing users to narrow rental listings by province — one of the two supported filter dimensions in the system (see [[concepts/province-filter|province filter]])
- **Map-based visualization**: The `latitude`, `longitude`, `marker`, and `zoom` fields enable the [[concepts/react-and-redux-frontend|React/Redux UI]] to render rental listings on an interactive map
- **Address display**: Human-readable fields (`address`, `streetNumber`, `city`, `province`, `region`) are composed together for displaying formatted listing addresses in the frontend
- **Market segmentation**: The `macrozone` and `microzone` fields support sub-city geographic analysis, useful in the [[concepts/feature-analysis|Feature analysis view]] for understanding rental market patterns across neighborhoods
- **Data normalization**: Location fields undergo [[concepts/data-normalization|Data normalization]] as part of the ingestion pipeline to ensure consistency across scraped listings from different sources

## Related Concepts

- [[concepts/properties|properties]] — the parent object within affitto_data documents that contains the location sub-object as a required field
- [[concepts/multimedia|multimedia]] — the other required sub-object within the properties structure alongside location
- [[concepts/featurelist|featureList]] — another sub-object within the properties structure of affitto_data documents
- [[concepts/primaryfeatures|primaryFeatures]] — primary features object also nested within affitto_data properties
- [[concepts/data-normalization|Data normalization]] — normalization rules applied to location data during ingestion
- [[concepts/feature-analysis|Feature analysis view]] — analysis view that may leverage location data for geographic market insights
- [[concepts/slim-dto|DTO]] — data transfer objects that may include location fields in API responses
- [[concepts/realestatepage|realEstatePage]] — related concept representing the source real estate page from which location data is extracted
- [[concepts/province-filter|province filter]] — the province-based filtering mechanism that operates on location data
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define the location object's structure and required fields
- [[concepts/web-scraping|web scraping]] — the data acquisition method that populates location fields

## Related Entities

- [[entities/affitto_data|affitto_data]] — the parent collection whose documents contain the location object as a required sub-object
- [[entities/udine|udine]] — the MongoDB database that stores the affitto_data collection containing location data
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that exposes province-based filtering on location data
- [[entities/mongodb-atlas|MongoDB Atlas Cloud]] — the cloud database platform hosting the location data

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - `"properties": { "type": "object", "required": [ "location", "multimedia" ]`
> - `Can filter  | type o provinzia`

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|prd_affitti_backend_v0-3_1d90fc]]**
> - `"location": { "type": "object", "required": [ "address", "city", "cityId", "latitude", "locality", "longitude", "macrozone", "macrozoneId", "marker", "microzone", "nation", "province", "provinceId", "region", "streetNumber", "zoom" ]`
> - `Can filter | type o provinzia`