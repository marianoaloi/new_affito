---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_backend_v0-3_1d90fc]]"]
tags: [term]
aliases:
  - "External aggregation"
  - "External refresh process"
---


# External Aggregation Process

## Definition

An unspecified process external to the [[entities/affitti-backend|Affitti Backend]] that is responsible for materializing data into the [[entities/count|count]] and [[entities/feature|feature]] read-only collections. The API does not own or control this process's refresh cadence. It serves as the mechanism through which user decisions (e.g., [[concepts/statemaloi|stateMaloi]] and description fields) written to the [[entities/affito|affito]] write collection are propagated back into the read collections consumed by stats and feature-analysis endpoints. The nature, implementation, and scheduling of this process are not detailed in the PRD.

## Key Characteristics

- **External ownership**: The process runs outside the [[entities/affitti-backend|Affitti Backend]] boundary; the API has no ability to trigger, schedule, or monitor it directly.
- **Materialization role**: It aggregates or transforms data from the [[entities/affito|affito]] write collection (and potentially [[entities/affitto_data|affitto_data]]) into the [[entities/count|count]] and [[entities/feature|feature]] read collections.
- **Uncontrolled refresh cadence**: The frequency at which the process runs is not governed by the API layer, creating a dependency with no SLA guarantees from the backend's perspective.
- **Silent staleness risk**: If this process stalls or fails, the `/stats/summary` and `/analysis/features` endpoints will continue to serve stale data without any indication to the consumer.
- **Eventual consistency coupling**: The process is the primary source of the [[concepts/eventual-consistency|eventual consistency]] behavior described in the PRD — a decision saved via FR-4 ([[concepts/statemaloi|stateMaloi]] update) or FR-5 ([[concepts/bulk-state-update|bulk state update]]) may not appear in read collections until the next external refresh cycle.
- **Black-box implementation**: The PRD intentionally leaves the process's internals unspecified, treating it as an infrastructure concern outside the API contract.

## Applications

- **Stale-data mitigation**: A suggested mitigation is to expose a `lastRefreshed` timestamp (if available from the external process) so that API consumers can assess data freshness and make informed decisions.
- **Architecture documentation**: Understanding this process is essential for reasoning about the [[concepts/split-collection-architecture|split-collection architecture]] and its trade-offs, particularly around [[concepts/read-after-write-consistency|read-after-write consistency]].
- **Incident diagnosis**: When discrepancies arise between data written through the API (e.g., a state change on an [[entities/affito|affito]] document) and data read from stats/features endpoints, the external aggregation process is the first place to investigate.
- **SLA planning**: Any future SLA for data freshness on the read endpoints depends directly on the refresh cadence and reliability guarantees of this external process.

## Related Concepts

- [[concepts/eventual-consistency|Eventual consistency]] — the consistency model imposed by the external aggregation process's asynchronous nature
- [[concepts/read-after-write-consistency|Read-after-write gap]] — the observable delay between writing a decision and seeing it reflected in read collections
- [[concepts/split-collection-architecture|Split-collection architecture]] — the architectural pattern that necessitates this external aggregation step
- [[concepts/feature-analysis|Feature analysis view]] — one of the read endpoints whose freshness depends on this process
- [[concepts/optimistic-update|Optimistic update]] — a potential client-side mitigation for the delay introduced by this process
- [[concepts/bulk-state-update|Bulk state update]] — write operations whose results depend on this process for propagation to read collections

## Related Entities

- [[entities/affitti-backend|Affitti Backend]] — the API layer that depends on, but does not control, this process
- [[entities/count|count]] — read-only collection materialized by this process
- [[entities/feature|feature]] — read-only collection materialized by this process
- [[entities/affito|affito]] — write collection whose data is the source for aggregation
- [[entities/udine|udine]] — the MongoDB database hosting all relevant collections
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database platform where the collections reside

## Mentions in Source

- "`count` and `feature` are materialized by an **external process** outside this backend. The API treats them as strictly **read-only** and does not own their refresh cadence." — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]
- "Consequence: data served from them is **eventually consistent** — a decision saved via FR-4/FR-5 may take until the next external refresh to appear in `/stats/summary` and `/analysis/features`." — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]