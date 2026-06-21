---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "province field"
  - "provincia"
  - "province dimension"
---


# Province

## Definition
The `province` field is a geographic classification attribute used as a key grouping and filtering dimension across the rental property data system. It represents the Italian administrative subdivision (provincia) in which a property listing is located. In the data model, it appears both as a top-level grouping key within the [[concepts/count-collection-view|count collection view]] compound `_id` and as a nested field within the `powerproperties.location` object hierarchy. It is fundamental to the geographic segmentation of rental property data throughout the system.

## Key Characteristics
- **Compound key component**: In the [[concepts/count-collection-view|count collection view]], `province` forms part of the compound `_id` alongside [[concepts/type|type]], enabling aggregated counts by geographic area and property classification
- **Nested location field**: Within the [[concepts/powerproperties|powerproperties]] object, it is accessed via the path `powerproperties.location.province`, placing it within a structured geographic hierarchy
- **Existence-based filtering**: The aggregation pipeline uses a `$match` stage with `$exists: true` on the province field to ensure only geolocated listings with valid province data are processed
- **Italian administrative geography**: Values correspond to Italian provinces such as "Udine", "Trieste", and "Padova"
- **Segmentation dimension**: Serves as a primary axis for geographic segmentation, analysis, and filtering of rental property listings

## Applications
- **Aggregated counting**: Grouping property listings by province and [[concepts/type|type]] to produce summary counts in the [[concepts/count-collection-view|count collection view]]
- **Data quality filtering**: Ensuring that only listings with a populated province field are included in analytical pipelines, thereby excluding records without geographic metadata
- **Geographic analysis**: Enabling province-level analysis within the [[concepts/analisi|Analysis feature]] for understanding rental market distribution across Italian provinces
- **Map-based visualization**: Supporting geographic display of listings on the [[concepts/mappa-page|Map Page]] by providing province-level location data
- **Rental data segmentation**: Allowing users to filter and browse rental listings by province within the [[concepts/tabella-page|Table Page]] and related views

## Related Concepts
- [[concepts/type|type]] — co-occurs with province as the other component of the compound `_id` in the count collection view
- [[concepts/count-collection-view|count-collection-view]] — the aggregation view where province serves as a grouping key
- [[concepts/powerproperties|powerproperties]] — the parent object containing the nested `location.province` path
- [[concepts/nation|nation]] — related geographic classification at the country level
- [[concepts/microzone|microzone]] — finer-grained geographic segmentation within the location hierarchy
- [[concepts/macrozone|macrozone]] — broader geographic segmentation within the location hierarchy
- [[concepts/analisi|analisi]] — analysis feature that leverages province-based segmentation
- [[concepts/province-filter]] — filtering mechanism based on the province field

## Related Entities
- [[entities/udine|Udine]] — an Italian province appearing as a sample value in the data

## Mentions in Source
- "_id": { "province": "Udine", "type": "a" } — [[sources/function_64f05b|function_64f05b]]
- "_id": { "province": "Trieste", "type": "a" } — [[sources/function_64f05b|function_64f05b]]
- "_id": { "province": "Padova", "type": "a" } — [[sources/function_64f05b|function_64f05b]]
- "powerproperties.location.province": { $exists: true } — [[sources/function_64f05b|function_64f05b]]