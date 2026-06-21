---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "phenomenon"
aliases:
  - "Eventual consistency model"
  - "EC"
---

## Basic Information

- **Type:** concept
- **Concept subtype:** phenomenon
- **Sources:** [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]

## Definition

Eventual consistency is a data synchronization model employed in the [[entities/affitti-backend|Affitti Backend]] architecture, where the readable collections ([[entities/count|count]] and [[entities/feature|feature]]) are materialized by an external aggregation process outside the backend's control. As a result, data served from these read-only collections may not immediately reflect recent writes made to the [[entities/affito|affito]] collection. A decision saved via the write endpoints may take until the next external refresh cycle to appear in statistics and feature analysis responses. The backend API treats these collections as strictly read-only and does not own their refresh cadence.

## Key Characteristics

- **Read-only materialized views**: The [[entities/count|count]] and [[entities/feature|feature]] collections are populated by an external process; the backend never writes to them directly.
- **Temporal lag**: There is a non-deterministic delay between a write to [[entities/affito|affito]] (or [[entities/affitto_data|affitto_data]]) and the moment that change becomes visible in `/stats/summary` and `/analysis/features` endpoints.
- **No backend-controlled refresh cadence**: The [[entities/affitti-backend|Affitti Backend]] has no authority over when the external aggregation runs, making the lag unpredictable from the API's perspective.
- **Silent staleness risk (R5)**: If the external aggregation process stalls or fails, the statistics and features served by the API go stale silently. The suggested mitigation is to expose a `lastRefreshed` timestamp so consumers can detect stale data.
- **Read-after-write gap (R1)**: Writes land in [[entities/affito|affito]] while the UI reads [[entities/affitto_data|affitto_data]]/[[entities/count|count]]/[[entities/feature|feature]], all refreshed by an external process. Until the next refresh, the user may not see the decision they just saved, leading to a confusing UX. Mitigations include frontend [[concepts/optimistic-update|optimistic updates]], having the API expose write results directly in responses, and a longer-term `$lookup` merge strategy (open question Q1).
- **Contrast with write-path guarantees**: Writes to the [[entities/affito|affito]] collection follow [[concepts/read-after-write-consistency|read-after-write consistency]] — a client can read back what it just wrote. Eventual consistency applies only to the derived/aggregated collections.
- **Architectural root cause**: The eventual consistency behavior is a direct consequence of the [[concepts/split-collection-architecture|split-collection architecture]], which separates writable and readable collections and relies on an external aggregation process to bridge them.
- **API documentation obligation**: The API must clearly document this behavior so that frontend consumers do not expect immediate consistency for statistics and feature analysis endpoints.

## Applications

- **Frontend design**: The frontend consuming the Affitti API should implement tolerant UI patterns (e.g., informational banners, `lastRefreshed` indicators) for statistics and feature analysis views, acknowledging that data may lag behind recent user actions. [[concepts/optimistic-update|Optimistic updates]] are a recommended mitigation to give the user immediate visual feedback while the external refresh cycle catches up.
- **Write-result exposure**: The API can return the written data directly in write-endpoint responses, allowing the frontend to reflect the user's action immediately without waiting for the read collections to refresh.
- **Monitoring and alerting**: Operators can monitor the `lastRefreshed` timestamp exposed by the API to detect when the external aggregation process has stalled, triggering alerts before data becomes unacceptably stale.
- **API contract communication**: Eventual consistency must be explicitly stated in API documentation and OpenAPI specifications so that third-party integrators understand the data freshness guarantees (or lack thereof) for read-only endpoints.
- **Testing strategy**: Integration and end-to-end tests must account for the refresh delay and avoid asserting immediate visibility of written data in statistics or feature endpoints.

## Related Concepts

- [[concepts/read-after-write-consistency|Read-after-write consistency]] — the contrasting consistency model used for the writable [[entities/affito|affito]] collection path; the gap between these two models is formally identified as risk R1
- [[concepts/split-collection-architecture|Split-collection architecture]] — the architectural pattern that causes eventual consistency by separating writable and readable collections
- [[concepts/optimistic-update|Optimistic update]] — a frontend mitigation strategy for the read-after-write gap introduced by eventual consistency
- [[concepts/statemaloi|stateMaloi]] — the enumerated state field on listings whose transitions trigger eventual updates to aggregated collections
- [[concepts/slim-dto|slim-dto]] — the data transfer objects used to shape responses from the eventually consistent read endpoints

## Related Entities

- [[entities/affito|affito]] — the writable collection whose changes propagate eventually to read-only views
- [[entities/affitto_data|affitto_data]] — the detailed data collection related to affito records, also refreshed by the external process
- [[entities/count|count]] — read-only materialized collection for statistics, subject to eventual consistency
- [[entities/feature|feature]] — read-only materialized collection for feature analysis, subject to eventual consistency
- [[entities/affitti-backend|Affitti Backend]] — the API layer that serves both the write and read paths under this consistency model
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database platform hosting all collections involved

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]**
> - "The API treats them as strictly **read-only** and does not own their refresh cadence. Consequence: data served from them is **eventually consistent** — a decision saved via FR-4/FR-5 may take until the next external refresh to appear in `/stats/summary` and `/analysis/features`."
> - "**R1 — Read-after-write gap.** Writes land in `affito` while the UI reads `affitto_data`/`count`/`feature`, all refreshed by an external process. Until refresh, the user may not see the decision they just saved → confusing UX. Mitigation: frontend optimistic updates + API exposes write results; long-term per Q1 below."