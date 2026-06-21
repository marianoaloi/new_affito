---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "photo tag"
  - "tag field"
  - "tag object"
---


# Tag

## Definition

Tag is a field within each photo object in the `multimedia.photos` array of the affitto_data schema. It is a nullable structure that can either be an object containing `category`, `key`, and `label` fields, or `null`. Photo tags provide semantic metadata that categorizes property images by their content type (e.g., kitchen, bathroom, exterior), enabling structured navigation and filtering of property photos within the frontend application.

## Key Characteristics

- **Nullable type**: The tag field uses a JSON Schema `anyOf` pattern, allowing it to be either a structured object or `null`, accommodating photos that may lack categorization
- **Three-part structure**: When present, the tag object is composed of three required fields: `category`, `key`, and `label`, providing a hierarchical classification system
- **Semantic photo categorization**: Tags classify images by what they depict (e.g., room type, exterior view), adding meaning beyond simple captions
- **Sourced from scraped data**: The tag values originate from the [[concepts/web-scraping-pipeline|web scraping pipeline]] and reflect the categorization system of the original property listing source
- **Required field within photo objects**: Despite being nullable, `tag` is a required field in every photo object alongside `caption`, `id`, and `urls`

## Applications

- **Photo gallery filtering**: In the frontend React application, tags enable users to filter or navigate property photos by content type (e.g., showing only kitchen photos or bathroom photos)
- **Structured multimedia display**: Tags allow the UI to group and organize property images into logical sections rather than presenting them as an undifferentiated gallery
- **Data quality assessment**: The nullable nature of the tag field allows the system to distinguish between categorized and uncategorized photos, which can inform data completeness metrics
- **Search and discovery**: Tag metadata can power search features that let users find properties based on the types of photos available

## Related Concepts

- [[concepts/photo|photo]] — The parent object that contains the tag field as one of its required properties
- [[concepts/photos|photos]] — The array of photo objects within the multimedia section where tags are used
- [[concepts/caption|caption]] — Another required field in the photo object, providing textual description alongside the tag's structured categorization
- [[concepts/json-schema|JSON Schema]] — The schema standard used to define the tag's `anyOf` nullable pattern
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — The data ingestion process from which tag values originate

## Related Entities

- [[entities/affitto_data|affitto_data]] — The root data schema containing the multimedia.photos array where tags are defined

## Mentions in Source

- "\"tag\": { \"anyOf\": [ { \"type\": \"object\", \"required\": [ \"category\", \"key\", \"label\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"photos\": { \"type\": \"array\", \"items\": { \"type\": \"object\", \"required\": [ \"caption\", \"id\", \"tag\", \"urls\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]