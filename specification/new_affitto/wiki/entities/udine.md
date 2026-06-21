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
  - "DB udine"
  - "udine database"
  - "MongoDB udine"
---

## Description

Udine is the primary MongoDB database within the [[entities/mongodb-atlas|MongoDB Atlas]] cluster (`cluster0.7qska.mongodb.net`) used by the [[entities/affitiudine|affitiudine]] rental system. The database name likely refers to the Italian city of Udine, suggesting the system tracks rental properties in that geographic area and indicates geographic scoping of the rental data. It contains collections for scraped listings, write-target data, aggregated summaries, and normalized feature analysis. The system presents rental data stored in this MongoDB database that has been returned by the [[concepts/web-scraping-pipeline|web scraping pipeline]]. The [[entities/affitti-backend|Affitti Backend API]] serves as the API layer that reads from and writes to this database, while [[entities/firebase-cloud-functions|Cloud Functions]] provide the serverless compute layer for connectivity.

## Collections

| Collection | Purpose |
|---|---|
| [[entities/affitto_data|affitto_data]] | Read-only scraped listings, filterable by `type`, `province`; large nested schema |
| [[entities/affito|affito]] | Write-target collection storing scraped rental data |
| [[entities/count|count]] | Aggregated summary data |
| [[entities/feature|feature]] | Normalized feature analysis data |

## Related Entities

- [[entities/mongodb-atlas|MongoDB Atlas]] — hosting platform (cluster `cluster0.7qska.mongodb.net`)
- [[entities/affitiudine|affitiudine]] — parent Firebase project
- [[entities/affitti-backend|Affitti Backend API]] — API layer that reads from and writes to this database
- [[entities/affitto_data|affitto_data]] — read-only scraped listings collection within this database
- [[entities/affito|affito]] — write-target collection within this database, stores scraped rental data
- [[entities/count|count]] — aggregated summary data collection within this database
- [[entities/feature|feature]] — normalized feature analysis data collection within this database
- [[entities/firebase-cloud-functions|Cloud Functions]] — serverless compute layer connecting to this database

## Related Concepts

- [[concepts/x-509-certificate-authentication|X.509 certificate authentication]] — authentication method used to connect to this database
- [[concepts/data-normalization|Data normalization]] — applied to feature data stored in this database
- [[concepts/split-collection-architecture|Split-collection architecture]] — architectural pattern separating read-only and write-target collections within this database
- [[concepts/web-scraping-pipeline|Web scraping pipeline]] — data ingestion process that populates this database with rental listings

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "Database | MongoDB Atlas — cluster `cluster0.7qska.mongodb.net`, DB **`udine`**"
> - "DB Auth | X.509 certificate (`certPath` PEM file) — must be stored as a secret, never in repo"
> - "`affitto_data` | **Read** — listings already adapted from scraping | Filterable by `type`, `province`; large nested schema (`powerproperties`, `auction`, features, location, price, etc.)"

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto Backend]]**
> - "| DataBase | udine |"
> - "| URL | mongodb+srv://cluster0.7qska.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0 |"

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - database: "udine"
> - url: "mongodb+srv://cluster0.7qska.mongodb.net/?"+"authSource=%24external&authMechanism=MONGODB-X509&"+"retryWrites=true&w=majority&appName=Cluster0"
> - The database contains at least the [[entities/affito|affito]] collection and connects to the [[entities/mongodb-atlas|MongoDB Atlas]] cluster
> - "database: "udine","
> - "Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato." (System that presents the rental data stored in the MongoDB database that scraping has returned.)