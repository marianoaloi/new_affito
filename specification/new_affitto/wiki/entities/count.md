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
  - "count collection"
  - "count"
---

## Summary

The `count` collection is a MongoDB collection that provides aggregated summary statistics about the current state of the rental property database. Each document is keyed by a composite `_id` containing `province` and `type`, and includes counts for various categories: total properties (`total`), accepted (`accept`), denied (`deny`), waiting (`wait`), empty choices (`emptyChoise`), as well as accessibility-related counts (`disable`, `nodisable`, `emptydisable`) and elevator availability (`elevator`, `noElevator`, `emptyElevator`). This collection serves as a pre-computed dashboard summary for quick overview of the data state.

## State Mapping Note

The counters in the `count` collection reference `accept`, `deny`, and `wait` values, while writes to source data use the [[concepts/statemaloi|stateMaloi]] encoding (`0`, `1`, `2`). There is an open question regarding the exact mapping between these representations (e.g., whether `accept=1`, `deny=0`, `wait=2`) and what the `emptyChoise` counter represents in relation to the state machine. This mapping needs to be confirmed to ensure consistency between the write-side state values and the read-side aggregated counters.

## Document Structure

Each document in the `count` collection contains:

| Field | Description |
|-------|-------------|
| `_id` | Composite key: `{province, type}` |
| `total` | Total number of properties |
| `accept` | Count of accepted properties |
| `deny` | Count of denied properties |
| `wait` | Count of waiting/pending properties |
| `emptyChoise` | Count of properties with no choice made |
| `elevator` | Count of properties with elevator |
| `noElevator` | Count of properties without elevator |
| `emptyElevator` | Count of properties with no elevator data |
| `disable` | Count of properties with disability access |
| `nodisable` | Count of properties without disability access |
| `emptydisable` | Count of properties with no disability access data |

## Related Entities

- [[entities/mongodb-atlas|MongoDB Atlas]] — the cloud database platform hosting the `udine` database where this collection resides
- [[entities/udine|udine]] — the MongoDB database containing this collection
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that reads from this collection (read-only) to serve summary endpoints
- [[entities/affitiudine|affitiudine]] — the Firebase project context within which the backend operates
- [[entities/affitto_data|affitto_data]] — a sibling collection in the same database storing individual rental records
- [[entities/affito|affito]] — another sibling collection in the `udine` database
- [[entities/feature|feature]] — a sibling collection also materialized by the same external process and treated as read-only by the API

## Related Concepts

- [[concepts/eventual-consistency|Eventual consistency]] — the consistency model under which the `count` collection operates; writes to source data are not immediately reflected
- [[concepts/statemaloi|stateMaloi]] — the state machine / decision states whose aggregated values (accept, deny, wait) are summarized in this collection; the exact mapping between stateMaloi numeric codes and the counter names needs confirmation
- [[concepts/read-after-write-consistency|Read-after-write consistency]] — related consistency concern; a decision saved may take until the next external refresh to appear in aggregated counts
- [[concepts/external-aggregation-process|External aggregation process]] — the external process responsible for materializing this collection from source data
- [[concepts/split-collection-architecture|Split-collection pattern]] — the architectural pattern separating read-only aggregated collections from writable source collections

## Mentions in Source

> **Source: PRD Affitti Backend v0.3**
> - "`count` | Aggregated summary per `{province, type}` | Counters: `total`, `accept`, `deny`, `wait`, `emptyChoise`, `elevator`, `noElevator`, `emptyElevator`, `disable`, `nodisable`, `emptydisable`"
> - "`count` and `feature` are materialized by an **external process** outside this backend. The API treats them as strictly **read-only** and does not own their refresh cadence."
> - "Counters in `count` reference `accept/deny/wait` while writes use `stateMaloi 0/1/2` — confirm the mapping (e.g., `accept=1`, `deny=0`, `wait=2`? and what is `emptyChoise`?)."

> **Source: PRD New Affitto (backend)**
> - "| collection | count |"
> - "| descrizione | Prende il attuale stato del banco in un riesumo totale |" *(Takes the current state of the database in a total summary)*