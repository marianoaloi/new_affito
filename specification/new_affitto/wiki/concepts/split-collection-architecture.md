---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_backend_v0-3_1d90fc]]"]
tags: [method]
aliases:
  - "Read-write collection split"
  - "Split-collection pattern"
---


# Split-collection architecture

## Definition

Split-collection architecture is the data access pattern employed by the [[entities/affitti-backend|Affitti Backend]] in which read and write operations target different MongoDB collections within the [[entities/mongodb-atlas|MongoDB Atlas]] cluster. Read operations query the [[entities/affitto_data|affitto_data]] collection (containing scraped rental listings) along with the [[entities/count|count]] and [[entities/feature|feature]] materialized aggregation collections, while write operations exclusively target the [[entities/affito|affito]] collection for persisting user decisions ([[concepts/statemaloi|stateMaloi]]) and descriptions. An external process outside the API boundary is responsible for propagating changes from [[entities/affito|affito]] back into the read-side collections, creating an [[concepts/eventual-consistency|eventual consistency]] model.

## Key Characteristics

- **Segregated read and write paths**: The API never writes to [[entities/affitto_data|affitto_data]]; all mutations flow through [[entities/affito|affito]] exclusively, enforcing a strict separation of concerns.
- **Eventual consistency (risk R1)**: Because reads and writes hit different collections, a user's decision (e.g., a [[concepts/statemaloi|stateMaloi]] transition) may not be immediately visible in subsequent read queries. This gap is formally identified as risk R1 in the PRD. See [[concepts/read-after-write-consistency|read-after-write consistency]] for further details.
- **External propagation dependency**: The mechanism that synchronizes data from [[entities/affito|affito]] back into [[entities/affitto_data|affitto_data]] lives outside the API layer (e.g., in [[entities/firebase-cloud-functions|Cloud Functions]] or a scheduled job), meaning the API itself has no control over propagation latency.
- **Multiple read collections**: Read-side data is spread across three collections — [[entities/affitto_data|affitto_data]] for raw listing data, [[entities/count|count]] for aggregated counts, and [[entities/feature|feature]] for pre-computed features — each serving a specific query purpose.
- **Optimistic update requirement**: To mitigate the UX impact of the eventual consistency gap, the frontend must apply optimistic updates — immediately reflecting user actions in the UI before the read-side collections are updated.

## Applications

- **Rental listing platforms**: Separating high-volume scraped data ingestion from lower-volume user interactions prevents write contention and allows independent scaling of each data path.
- **CQRS-lite patterns**: The split-collection approach resembles a lightweight Command Query Responsibility Segregation (CQRS) pattern where the write model ([[entities/affito|affito]]) and the read model ([[entities/affitto_data|affitto_data]]) are distinct, without requiring a full event-sourcing infrastructure.
- **Systems with external data pipelines**: When an external ETL or synchronization process already manages the primary data store, the API can limit its write surface to a dedicated collection, simplifying access control via the [[concepts/write-whitelist|write whitelist]] rule and reducing the risk of data corruption.
- **Frontend resilience strategies**: The architecture motivates frontend patterns such as optimistic updates and local state caching to bridge the consistency gap, improving perceived responsiveness.

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — the primary user-mutable field written through this architecture
- [[concepts/eventual-consistency|eventual consistency]] — the consistency model that results from the read/write split
- [[concepts/read-after-write-consistency|read-after-write consistency]] — the specific consistency gap identified as risk R1
- [[concepts/write-whitelist|write whitelist]] — constrains which fields may be written to the [[entities/affito|affito]] collection
- [[concepts/slim-dto|Slim DTO]] — the data transfer objects shaped by the read-side collection schema
- [[concepts/audit-trail|audit-trail]] — logging mechanism applied to write operations on the [[entities/affito|affito]] collection
- [[concepts/soft-delete|soft-delete]] — deletion strategy relevant to the write-side collection

## Related Entities

- [[entities/affitti-backend|Affitti Backend]] — the API layer implementing this architecture
- [[entities/affitto_data|affitto_data]] — the primary read-side collection containing scraped listings
- [[entities/affito|affito]] — the exclusive write-side collection for user mutations
- [[entities/count|count]] — materialized aggregation collection on the read side
- [[entities/feature|feature]] — pre-computed feature collection on the read side
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database platform hosting all collections
- [[entities/udine|udine]] — the MongoDB database containing these collections
- [[entities/firebase-cloud-functions|Cloud Functions]] — potential host for the external propagation process

## Mentions in Source

- **Confirmed (Q1): a separate collection from `affitto_data`.** The API writes here only; it never writes to `affitto_data`. — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]
- **Read-after-write consistency:** because reads (`affitto_data`) and writes (`affito`) are split, the propagation path of `stateMaloi`/`description` back into the read collection is owned by the external process. — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]