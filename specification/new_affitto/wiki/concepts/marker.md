---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "map marker"
  - "marker field"
  - "marker string"
---


# Marker

## Definition

Marker is a required string field within the `location` object of the `affitto_data` schema. It represents the map marker or pin designation used to locate a rental property on a geographic map display. The marker field works in conjunction with latitude and longitude coordinates to support geolocation and mapping features for visualizing rental property locations, primarily within the Udine province area.

## Key Characteristics

- **Data type:** String — defined as `{ "type": "string" }` in the JSON Schema
- **Required field:** Always mandatory within the `location` object, alongside other geographic fields such as `address`, `city`, `latitude`, `longitude`, and `zoom`
- **Map rendering support:** Contains a formatted string value intended for map pin or marker rendering on a geographic map interface
- **Part of the location object:** Grouped with a comprehensive set of 16 required location-related fields including address components, geographic coordinates, and zone identifiers
- **Geolocation context:** Works together with `latitude`, `longitude`, and `zoom` fields to fully define how and where a property appears on a map

## Applications

- **Property map visualization:** Used by the [[concepts/mappa-page|Map Page]] to render map pins at the correct locations for rental property listings
- **Geographic property search:** Supports users in visually identifying and locating rental properties on an interactive map within the application
- **Map marker customization:** The string format allows for different marker types or labels to be assigned to different properties, potentially distinguishing property categories or states on the map
- **Frontend map rendering:** Provides the necessary marker designation data for the frontend to display property pins using mapping libraries or APIs

## Related Concepts

- [[concepts/json-schema|JSON Schema]]
- [[concepts/mappa-page|Map Page]]
- [[concepts/properties|properties]]
- [[concepts/province-filter|province filter]]

## Related Entities

- [[entities/affitto_data|affitto_data]]
- [[entities/udine|udine]]

## Mentions in Source

- `"marker": { "type": "string" }` — [[sources/prd-new-affitto-backend_86705a|PRD Affitto Internal Rental System]]
- `"location": { "type": "object", "required": [ "address", "city", "cityId", "latitude", "locality", "longitude", "macrozone", "macrozoneId", "marker", "microzone", "nation", "province", "provinceId", "region", "streetNumber", "zoom" ]` — [[sources/prd-new-affitto-backend_86705a|PRD Affitto Internal Rental System]]