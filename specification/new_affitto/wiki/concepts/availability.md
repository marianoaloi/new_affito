---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "property availability"
  - "disponibilità"
  - "availability field"
---

## Description

The `availability` field is a string property nested within the [[concepts/properties|properties]] object of the `affitto_data` collection schema. It captures when a rental property is available for occupancy, storing either specific dates or descriptive statuses scraped from original real estate listings. Unlike required fields such as [[concepts/location|location]] and [[concepts/multimedia|multimedia]], availability is optional in the schema, reflecting that not all rental listing sources provide this information consistently. This field plays a role in the decision-making process that the system supports, helping users filter and evaluate rental options based on when they can move in. Populated via [[concepts/web-scraping|web scraping]] from external sources, its presence or absence also serves as a quality indicator for scraped listing data.

## Key Characteristics

- **Data type:** Stored as a string value, allowing flexible representation of availability status (e.g., dates, descriptive statuses)
- **Optional field:** Not marked as required in the schema, reflecting that not all rental listing sources provide this information consistently
- **Part of the properties object:** Sits alongside other property detail fields such as [[concepts/location|location]], [[concepts/multimedia|multimedia]], [[concepts/energy|energy]], [[concepts/costs|costs]], and other attributes within the [[concepts/properties|properties]] object
- **Scraped data:** Populated via [[concepts/web-scraping|web scraping]] from external rental listing sources
- **Decision-support role:** Availability timing is a practical factor for evaluators assessing rental properties, influencing whether a listing is actionable

## Applications

- **Rental property filtering:** Enables users to filter or sort listings based on when properties become available, helping prioritize actionable opportunities
- **Market analysis:** Availability patterns across listings can reveal market dynamics such as seasonal trends or supply fluctuations
- **Data completeness assessment:** Since the field is optional, its presence or absence can be used as a quality indicator for scraped listing data
- **Evaluation workflows:** Users can use availability information to determine whether a property merits further review based on timing constraints

## Related Concepts

- [[concepts/rent|rent]]
- [[concepts/costs|costs]]
- [[concepts/location|location]]
- [[concepts/multimedia|multimedia]]
- [[concepts/energy|energy]]
- [[concepts/price|price]]
- [[concepts/primaryfeatures|primaryFeatures]]
- [[concepts/featurelist|featureList]]
- [[concepts/web-scraping|Web Scraping]]
- [[concepts/json-schema|JSON Schema]]
- [[concepts/data-normalization|Data Normalization]]
- [[concepts/properties|properties]]

## Related Entities

- [[entities/affitto_data|affitto_data]]

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "\"availability\": { \"type\": \"string\" }"
> - "\"properties\": { \"type\": \"object\", \"required\": [ \"location\", \"multimedia\" ], \"properties\": { \"availability\": { \"type\": \"string\" }"