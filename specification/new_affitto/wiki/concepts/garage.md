---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "parking"
  - "parcheggio"
  - "garage field"
---

## Basic Information
- **Type**: concept
- **Subtype**: term
- **Sources**: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- **Definition**: The `garage` field is a string property within the `properties` object of the `affitto_data` schema, representing parking or garage information associated with a rental property listing.

## Description
The `garage` field is a string property within the [[concepts/properties|properties]] object of the `affitto_data` collection schema. It represents parking or garage information associated with a rental property listing, indicating the type of parking facilities available. The field is typed as a string rather than a boolean, suggesting it can contain descriptive values about the type of parking available (e.g., single garage, double garage, no garage) rather than a simple yes/no indicator. As an optional field — not listed among the required properties (`location` and `multimedia` are required) — it captures descriptive information about parking availability that is relevant for evaluating rental properties. This information is part of the property details scraped from the original real estate listing via the [[concepts/web-scraping|web scraping]] pipeline and is relevant for decision-making when evaluating rental properties, particularly in urban contexts where parking can significantly influence property desirability and pricing.

## Key Characteristics
- **Data type**: Stored as a `string` value, allowing flexible textual descriptions of parking arrangements (e.g., single garage, double garage, no garage)
- **Optional field**: Not required for a valid property listing; only `location` and `multimedia` are required within the `properties` object
- **Schema location**: Nested within the [[concepts/properties|properties]] object of the `affitto_data` document structure, alongside other property characteristic fields such as [[concepts/availability|availability]] and `buildingYear`
- **Descriptive nature**: Captures qualitative parking information rather than a simple boolean flag, enabling richer data representation
- **Part of feature data**: Belongs to the broader set of property characteristic fields that inform rental evaluation decisions
- **Scraped data**: Originates from the original real estate listing data collected through the [[concepts/web-scraping-pipeline|web scraping pipeline]]

## Applications
- **Rental property evaluation**: Enables evaluators to assess parking availability when reviewing and comparing rental listings in the Udine province area
- **Property filtering and search**: Can be used as a criterion for filtering rental listings based on parking availability, helping users narrow down results to properties that meet their transportation needs
- **Pricing analysis**: Supports analysis of how parking facilities correlate with rental pricing, as garage availability is a known factor in property valuation, especially in dense urban areas
- **Feature completeness tracking**: Contributes to the overall completeness assessment of a property listing's feature data within the [[concepts/feature-analysis|Feature analysis]] view

## Related Concepts
- [[concepts/properties|properties]] — the parent object containing the garage field alongside other property characteristics
- [[concepts/featurelist|featureList]] — the broader feature list object that contextualizes property characteristics alongside the garage field
- [[concepts/primaryfeatures|primaryFeatures]] — primary property features that may include or complement parking information
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define the garage field's type and constraints
- [[concepts/location|location]] — property location data, relevant as urban vs. rural context affects the importance of garage availability
- [[concepts/price|price]] — property pricing, which can be influenced by parking availability
- [[concepts/availability|availability]] — another string field within the properties object, sibling to garage
- [[concepts/web-scraping|web scraping]] — the data collection method used to scrape property details including garage information from real estate listings

## Related Entities
- [[entities/affitto_data|affitto_data]] — the parent data schema containing the `properties` object where the garage field resides
- [[entities/udine|udine]] — the MongoDB database covering the Udine province, the geographic scope of rental listings that include garage data

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"garage": { "type": "string" }`
> - `"properties": { "type": "object", "required": [ "location", "multimedia" ], "properties": { "availability": { "type": "string" }, "buildingYear": { "type": "integer" }`