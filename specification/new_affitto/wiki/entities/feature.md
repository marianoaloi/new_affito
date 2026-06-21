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
  - "feature collection"
---

## Related Entities

- [[entities/mongodb-atlas|MongoDB Atlas]] — database hosting platform
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that reads from this collection
- [[entities/affitiudine|affitiudine]] — the Firebase project context
- [[entities/udine|udine]] — the MongoDB database containing this collection
- [[entities/affitto_data|affitto_data]] — source collection from which feature data is projected/denormalized
- [[entities/affito|affito]] — related collection in the udine database
- [[entities/count|count]] — sibling read-only collection also materialized by an external process
- [[entities/firebase-cloud-functions|Cloud Functions]] — serverless compute environment for the API

## Related Concepts

- [[concepts/eventual-consistency|Eventual consistency]] — the data consistency model governing this collection
- [[concepts/statemaloi|stateMaloi]] — one of the key fields stored in the feature collection
- [[concepts/data-normalization|Data normalization]] — the collection stores per-listing normalized features
- [[concepts/read-after-write-consistency|Read-after-write consistency]] — relevant gap due to external materialization cadence
- [[concepts/feature-analysis|Feature analysis]] — the analytical capability powered by this collection
- [[concepts/external-aggregation-process|External aggregation process]] — the process that materializes this collection
- [[concepts/split-collection-architecture|Split-collection pattern]] — architectural pattern separating read-only analytical collections from writable ones
- [[concepts/featurelist|featureList]] — structured object containing core property attributes (balcony, basement, bathrooms, elevator, floor, furniture, rooms, saleDate, surface, terrace)
- [[concepts/primaryfeatures|primaryFeatures]] — comprehensive set of boolean/integer flags for property amenities (pool, fireplace, alarm system, etc.)

## Mentions in Source

> **Source: PRD Affitti Backend v0.3**
> - `feature` | Per-listing normalized features | `featureList`, `primaryFeatures`, `province`, `type`, `stateMaloi`
> - **Decision (Q2, resolved):** `count` and `feature` are materialized by an **external process** outside this backend. The API treats them as strictly **read-only** and does not own their refresh cadence.
> - **FR-7** `GET /analysis/features` — returns `feature` documents filtered by `province`, `type`, `stateMaloi`; supports listing comparison in the frontend.

> **Source: PRD New Affitto (backend)**
> - "| collection | feature |"
> - "| des prendi il principale informazione e e e e e |"