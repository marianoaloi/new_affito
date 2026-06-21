---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/new-affitto_840b29]]"
tags:
  - "other"
aliases:
  - "affito collection"
  - "affitto"
---

## Description

`affito` is the MongoDB collection within the [[entities/udine|udine]] database on [[entities/mongodb-atlas|MongoDB Atlas]] (cluster `cluster0.7qska.mongodb.net`) that serves as the primary data store for rental (affitti) records. The collection name appears to be a misspelling of "affitto" (Italian for "rent"). The collection was initially populated by an external [[concepts/web-scraping-pipeline|web scraping]] process and is the exclusive write target for the [[entities/affitti-backend|Affitti Backend API]] running on [[entities/firebase-cloud-functions|Cloud Functions]]. It is architecturally separated from [[entities/affitto_data|affitto_data]], which serves as the read-only collection for the frontend. Data from `affito` is read by Firebase Cloud Functions and ultimately presented in the frontend via [[concepts/redux-state|Redux state]] in a table format. Only whitelisted fields — `description`, `stateMaloi`, and audit fields (`mLastUpdate`, `userUpdate`) — may be written to this collection, and all write operations require a valid Firebase access token.

The collection is referenced directly in the backend code as `collection: "affito"`, confirming its role as the canonical write target. The frontend table view renders the data from this collection, where the table is organized with a main column structure as part of the [[concepts/tabella-page|Tabella Page]]. The system as a whole presents the rental data that the scraping process returned and stored in the MongoDB database.

## Related Entities

- [[entities/affitto_data|affitto_data]] — the read-only MongoDB collection that `affito` is separated from
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database platform hosting this collection
- [[entities/udine|udine]] — the MongoDB database containing this collection
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that writes exclusively to this collection
- [[entities/firebase-cloud-functions|Cloud Functions]] — the compute environment executing writes to `affito`
- [[entities/affitiudine|affitiudine]] — the Firebase project encompassing this backend system
- [[entities/count|count]] — a read-only collection refreshed alongside `affitto_data` by an external process
- [[entities/feature|feature]] — a read-only collection refreshed alongside `affitto_data` by an external process

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — one of the key fields stored in the `affito` collection, with enumerated values 0, 1, 2
- [[concepts/bulkstatemaloi|BulkStateMaloi operation]] — the operation for updating stateMaloi across multiple records using an array of IDs
- [[concepts/bulk-state-update|bulk-state-update]] — the functional requirement for bulk stateMaloi updates
- [[concepts/audit-trail|Audit trail]] — the pattern of tracking changes via `mLastUpdate` and `userUpdate` fields in the collection
- [[concepts/mlastupdate|mLastUpdate]] — the timestamp field recorded on every write operation
- [[concepts/userupdate|userUpdate]] — the user email field recorded on every write operation
- [[concepts/split-collection-architecture|Split-collection architecture]] — the architectural pattern where reads and writes go to different collections
- [[concepts/read-after-write-consistency|Read-after-write consistency]] — a consistency concern relevant to the separation between `affito` (write) and `affitto_data` (read)
- [[concepts/eventual-consistency|Eventual consistency]] — the consistency model implied by the split-collection architecture where an external process refreshes read collections
- [[concepts/id-typing-validation|Id typing validation]] — relevant to the `parseInt(id)` pattern used in update filters
- [[concepts/firebase-id-token-verification|Firebase ID token auth]] — all write operations to `affito` require a valid Firebase access token
- [[concepts/write-whitelist|Write whitelist]] — only whitelisted fields (`description`, `stateMaloi`, audit fields) are written to this collection
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the external process that originally populated the collection with rental data
- [[concepts/tabella-page|Tabella Page]] — the frontend table view where `affito` data is presented via Redux state
- [[concepts/redux-state|Redux state]] — the frontend state management layer through which `affito` data is presented in the table UI
- [[concepts/business-rules|business rules]] — the business logic governing how data in the collection is managed and presented
- [[concepts/certificatepath|X.509 certificate path]] — the X.509 certificate authentication used for database connectivity

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|Affitti Backend PRD v0.3]]**
> - "`affito` | **Write** — `description`, `stateMaloi` | **Confirmed (Q1): a separate collection from `affitto_data`.** The API writes here only; it never writes to `affitto_data`."
> - "**Q2** | What is the document shape of `affito`? (Does it mirror `_id` from `affitto_data` and hold only `description`, `stateMaloi`, audit fields, or full copies?) Needed before M3."
> - "Writes land in `affito` while the UI reads `affitto_data`/`count`/`feature`, all refreshed by an external process."

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD Affitto Internal Rental System]]**
> - "Puoi salvare | description: testo con la descricione che ho dato stateMaloi: salva il stato que ho deciso 0 (non buono) 1 (buono) 2 (cosi cosi) BulkStateMaloi: Salvare molti affiti con il stesso stateMaloi. riceve un array di ids  dei affitti e uno stato."
> - "Query per update the stato const filter = { _id: parseInt(id) as any }; await collection.updateMany( filter, { $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } } )"
> - "| Collection   | affito                                                                                                                                                                                                                                                  |"

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "| Collection   | affito                                                                                                                                                                                                                                                  |"
> - "| Puoi salvare | description: testo con la descricione che ho dato stateMaloi: salva il stato que ho deciso 0 (non buono) 1 (buono) 2 (cosi cosi) BulkStateMaloi: Salvare molti affiti con il stesso stateMaloi. riceve un array di ids  dei affitti e uno stato.  |"
> - "await collection.updateMany( filter, { $set: { stateMaloi: stateMaloi, mLastUpdate: new Date().getTime() / 1000, userUpdate: user.email } } )"
> - "collection: \"affito\""
> - "The data in REDUX state for affitto will be present in a table with the tible is a main column"
> - "Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato."