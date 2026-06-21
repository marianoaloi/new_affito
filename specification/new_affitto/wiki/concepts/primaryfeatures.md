---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "Primary Features"
  - "primaryFeatures object"
---

## Definition

`primaryFeatures` is a comprehensive nested object within rental property documents that catalogs detailed property amenities and characteristics. Structured as a JSON schema object with no required fields, it contains over 50 boolean/integer/null fields that encode the presence, count, or applicability of specific property features. Integer values typically indicate presence or count of a feature, while `null` values indicate that a particular feature category does not apply to the property. This structure appears in both the [[entities/affitto_data|affitto_data]] and [[entities/feature|feature]] collections. This detailed feature set enables fine-grained property comparison and filtering across the rental listings platform.

## Key Characteristics

- **Nested object structure**: Defined as `"type": "object"` with an empty `"required": []` array, meaning all fields are optional and vary by property
- **Tri-state encoding**: Fields use `integer` type (presence/count), `boolean` type (yes/no), or `null` type (not applicable), allowing nuanced representation of feature data
- **50+ feature fields**: Covers a broad taxonomy of property attributes organized across multiple domains
- **Accessibility features**: Includes fields such as `Accesso_per_disabili` (wheelchair access) and `Bagno_per_disabili` (accessible bathroom)
- **Outdoor spaces**: Tracks amenities like `balcone` (balcony), `terrazza` (terrace), `Giardino_privato` (private garden), `Giardino_comune` (shared garden), and `piscina` (pool)
- **Furnishing status**: Mutually informative fields including `Arredato` (furnished), `Non_Arredato` (unfurnished), and `Parzialmente_Arredato` (partially furnished)
- **Security features**: Covers `Impianto_di_allarme` (alarm system), `Porta_blindata` (armored door), `Vigilanza_CCTV` (CCTV surveillance), and `cancello_elettrico` (electric gate)
- **Building features**: Includes structural and indoor amenities such as `Caminetto` (fireplace), `cantina` (cellar), and `Mansarda` (attic/mansard)
- **Infrastructure**: Includes connectivity indicators such as `Fibra_ottica` (fiber optic) and `Cablato` (wired connection)
- **Window types**: Multiple `Infissi_esterni` variants describing external window/fixture types
- **Italian-language field names**: All property field identifiers use Italian naming conventions with underscores, consistent with the source data domain

## Applications

- **Property filtering and search**: Enables users to filter rental listings by specific amenities (e.g., wheelchair-accessible properties, furnished apartments, properties with a pool)
- **Feature comparison**: Supports side-by-side comparison of properties based on their amenity profiles
- **Feature analysis workflows**: Feeds into analytical views that aggregate and visualize feature distributions across property sets (related to [[concepts/feature-analysis|Feature analysis view]])
- **Data normalization pipelines**: The structured schema supports consistent ingestion and normalization of property feature data from external sources (related to [[concepts/data-normalization|Data normalization]])
- **DTO serialization**: Feature data is serialized into transfer objects for API responses via [[concepts/slim-dto|DTO]] patterns

## Related Concepts

- [[concepts/feature-analysis|Feature analysis view]] — analytical view that leverages primaryFeatures data
- [[concepts/data-normalization|Data normalization]] — normalization rules applied to feature fields during ingestion
- [[concepts/statemaloi|stateMaloi]] — related state classification within property documents
- [[concepts/featurelist|featureList]] — complementary feature listing structure
- [[concepts/shared-types-package|Shared types]] — TypeScript type definitions that include primaryFeatures schema
- [[concepts/split-collection-architecture|Split-collection pattern]] — architectural pattern governing how feature data is stored and read

## Related Entities

- [[entities/affitto_data|affitto_data]] — the document collection containing primaryFeatures as a nested object
- [[entities/feature|feature collection]] — dedicated feature collection related to property characteristics
- [[entities/affitti-backend|Affitti Backend API]] — the backend API layer that serves and processes primaryFeatures data
- [[entities/mongodb-atlas|MongoDB Atlas Cloud]] — cloud database platform where property documents with primaryFeatures are stored

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - `"primaryFeatures": { "type": "object", "required": [], "properties": { "Accesso_per_disabili": { "type": "integer" }, "Armadio_a_muro": { "type": "integer" }` (Definition of the primaryFeatures schema with accessibility and built-in wardrobe fields)
> - `"Porta_blindata": { "type": "integer" }, "portiere": { "type": "null" }` (Security door as integer-typed field; doorman/porter as null-typed indicating non-applicable category)
> - `"primaryFeatures": { "type": "object", "required": [], "properties": { "Accesso_per_disabili": { "type": "integer" }` (Schema definition of primaryFeatures as a nested object with integer-typed accessibility field)