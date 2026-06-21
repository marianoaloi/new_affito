---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "phenomenon"
aliases:
  - "Read-after-write gap"
  - "RAW consistency"
---

## Basic Information

- **Type:** concept
- **Concept subtype:** phenomenon
- **Sources:** [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]
- **Definition:** A data consistency challenge arising from the [[concepts/split-collection-architecture|split-collection architecture]] in the [[entities/affitti-backend|Affitti Backend]], where writes target the [[entities/affito|affito]] collection but reads are served from separately refreshed collections ([[entities/affitto_data|affitto_data]], [[entities/count|count]], [[entities/feature|feature]]), creating a temporal window during which recently written data is invisible to the user.

## Description

Read-after-write consistency is the primary architectural risk (R1) identified in the [[entities/affitti-backend|Affitti Backend]] system. It arises because the system employs a [[concepts/split-collection-architecture|split-collection architecture]]: writes (such as [[concepts/statemaloi|stateMaloi]] and `description` fields) are persisted to the [[entities/affito|affito]] collection, while reads are served from the [[entities/affitto_data|affitto_data]], [[entities/count|count]], and [[entities/feature|feature]] collections. These read collections are refreshed by an external process outside the backend's control, meaning the propagation path of written data back into the read collections is entirely owned by that external process. As a result, a user's action (e.g., saving a decision) may not be reflected in subsequent reads until the external refresh cycle completes, leading to a confusing user experience where recently written data appears to be missing. This risk constitutes the primary open question (Q1) in the PRD — whether the API should close the gap server-side via a `$lookup` merge or accept [[concepts/eventual-consistency|eventual consistency]] with frontend mitigations such as [[concepts/optimistic-update|optimistic updates]].

## Key Characteristics

- **Write-read collection separation**: Data is written to one collection ([[entities/affito|affito]]) but read from different collections ([[entities/affitto_data|affitto_data]], [[entities/count|count]], [[entities/feature|feature]]), creating an inherent consistency gap rooted in the [[concepts/split-collection-architecture|split-collection architecture]].
- **External refresh dependency**: The synchronization between write and read collections is managed by an external process not controlled by the [[entities/affitti-backend|Affitti Backend]], meaning the backend cannot force immediate consistency.
- **Temporal inconsistency window**: Between the moment a write is committed and the next external refresh, the system is in an inconsistent state from the user's perspective.
- **UX impact**: Users who save a decision (e.g., updating [[concepts/statemaloi|stateMaloi]]) and immediately view the listing may not see their change reflected, leading to confusion and potential duplicate actions.
- **Open architectural question (Q1)**: Whether the API should perform a `$lookup` merge from [[entities/affito|affito]] onto [[entities/affitto_data|affitto_data]] reads to provide immediate consistency, or whether the system should rely on [[concepts/eventual-consistency|eventual consistency]] with frontend mitigations.

## Applications

- **Frontend optimistic updates**: The primary mitigation strategy involves the frontend immediately reflecting the user's action in the UI without waiting for server-side read confirmation, using the [[concepts/optimistic-update|optimistic update]] pattern.
- **API write-result forwarding**: The API returns the result of write operations immediately to the client, allowing the frontend to update its local state with the confirmed write data.
- **$lookup merge strategy**: A potential server-side mitigation where read endpoints perform a MongoDB `$lookup` aggregation to merge fresh data from [[entities/affito|affito]] onto [[entities/affitto_data|affitto_data]] results, closing the consistency gap at the cost of query complexity and performance.
- **Eventual consistency acceptance**: An alternative approach where the architecture explicitly accepts the read-after-write gap and relies solely on [[concepts/optimistic-update|optimistic updates]], keeping the read path simple and performant per the [[concepts/eventual-consistency|eventual consistency]] model.

## Related Concepts

- [[concepts/statemaloi|stateMaloi]]
- [[concepts/split-collection-architecture|split-collection architecture]]
- [[concepts/eventual-consistency|eventual consistency]]
- [[concepts/optimistic-update|optimistic updates]]

## Related Entities

- [[entities/affitto_data|affitto_data]]
- [[entities/affito|affito]]
- [[entities/affitti-backend|Affitti Backend]]
- [[entities/count|count]]
- [[entities/feature|feature]]
- [[entities/udine|udine]]
- [[entities/mongodb-atlas|MongoDB Atlas Cloud]]

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "**R1 — Read-after-write gap.** Writes land in `affito` while the UI reads `affitto_data`/`count`/`feature`, all refreshed by an external process. Until refresh, the user may not see the decision they just saved → confusing UX."
> - "**Read-after-write consistency:** because reads (`affitto_data`) and writes (`affito`) are split, the propagation path of `stateMaloi`/`description` back into the read collection is owned by the external process."