---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "other"
aliases:
  - "affitto_data collection"
  - "affitto_data"
---

## Document Schema

Each document in `affitto_data` contains a rich nested structure including:

- **Property features:** [[concepts/featurelist|featureList]] and [[concepts/primaryfeatures|primaryFeatures]] nested objects
- **Location data:** [[concepts/location|location]] sub-object storing city, province, region, and coordinate data
- **Multimedia assets:** photos, videos, virtual tours, floorplans
- **Pricing information:** price fields and related data
- **Energy classification:** energy-related property data
- **Real estate page metadata:** [[concepts/realestatepage|realEstatePage]] nested object
- **Power properties & auction data:** `powerproperties`, `auction` fields
- **User decision tracking:** [[concepts/statemaloi|stateMaloi]] enum field
- **Audit fields:** `mLastUpdate` and `userUpdate` for [[concepts/audit-trail|audit trail]] support

## Filtering

The collection supports filtering by:
- `type` — property type
- `provinzia` — province

## Related Entities
- [[entities/affito|affito]] — the separate write-only collection where the API persists new or modified listings
- [[entities/mongodb-atlas|MongoDB Atlas]] — the cloud database platform hosting this collection
- [[entities/udine|udine]] — the MongoDB database in which this collection resides
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that reads from this collection
- [[entities/affitiudine|affitiudine]] — the Firebase project associated with the system infrastructure
- [[entities/count|count]] — companion collection refreshed alongside `affitto_data` by the external process
- [[entities/feature|feature]] — companion collection providing feature data, refreshed by the external process

## Related Concepts
- [[concepts/split-collection-architecture|Split-collection architecture]] — the architectural pattern separating read and write collections
- [[concepts/read-after-write-consistency|Read-after-write consistency]] — the consistency challenge arising from the split between `affitto_data` (read) and `affito` (write)
- [[concepts/eventual-consistency|Eventual consistency]] — the consistency model relevant to the separation between read and write collections, where `affitto_data` is refreshed by an external process
- [[concepts/slim-dto|Slim DTO]] — a projection pattern used to efficiently query subsets of the large nested schema
- [[concepts/soft-delete|Soft delete]] — a deletion strategy relevant to data lifecycle management within the collection
- [[concepts/data-normalization|Data normalization]] — BR-4 normalization rules applied to data within the collection
- [[concepts/statemaloi|stateMaloi]] — the enum field within each document used for user decision tracking
- [[concepts/bulk-state-update|Bulk state update]] — FR-5 bulk operation for updating stateMaloi across multiple documents (also referred to as BulkStateMaloi)
- [[concepts/audit-trail|Audit trail]] — supported by `mLastUpdate` and `userUpdate` fields in each document
- [[concepts/featurelist|featureList]] — nested object within each document containing feature list data
- [[concepts/primaryfeatures|primaryFeatures]] — nested object within each document containing primary property features
- [[concepts/location|location]] — nested sub-object storing city, province, region, and coordinate data
- [[concepts/realestatepage|realEstatePage]] — nested object containing real estate page metadata

## Mentions in Source
> **Source: PRD Affitti Backend v0.3**
> - "`affitto_data` | **Read** — listings already adapted from scraping | Filterable by `type`, `province`; large nested schema (`powerproperties`, `auction`, features, location, price, etc.)"
> - "**Confirmed (Q1): a separate collection from `affitto_data`.** The API writes here only; it never writes to `affitto_data`."
> - "Writes land in `affito` while the UI reads `affitto_data`/`count`/`feature`, all refreshed by an external process."

> **Source: PRD New Affitto (backend)**
> - "| Collection | affitto_data |"
> - "| Description | Affitti dati gìa addatati |"
> - "| Can filter | type o provinzia |"