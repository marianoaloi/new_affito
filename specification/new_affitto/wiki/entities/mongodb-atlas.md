---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/new-affitto_840b29]]"
tags:
  - "product"
aliases:
  - "Atlas"
  - "MongoDB Atlas Cloud"
---

## Description

MongoDB Atlas is the cloud database platform used by the [[entities/affitti-backend|Affitti Backend]] system to store and manage rental listing data. The specific deployment runs on the cluster `cluster0.7qska.mongodb.net` with a database named [[entities/udine|udine]], serving the [[entities/affitiudine|affitiudine]] application. The full connection string is `mongodb+srv://cluster0.7qska.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0`, which specifies [[concepts/x-509-certificate-authentication|X.509 certificate authentication]] (MONGODB-X509) with an external auth source (`$external`). The PEM certificate file (`X509-cert-2864290664025085959.pem`) is stored as a secret and never committed to the repository. Write operations are configured with `retryWrites=true` and write concern `w=majority` for durability. The database originated from a [[concepts/web-scraping|web scraping]] process that extracted raw data from a real estate portal and stored it as unprocessed documents in the NoSQL database. The system is designed to present rental data that the scraping process has returned and stored in MongoDB.

The database hosts four core collections: [[entities/affitto_data|affitto_data]] for read-only scraped rental listings ingested from a real estate portal, [[entities/affito|affito]] for writable user decisions on listings, [[entities/count|count]] for aggregated summary data, and [[entities/feature|feature]] for normalized feature data. The scraped listing documents follow a large nested schema including properties, auction data, features, location, and price information. Performance optimization of the database requires indexes on key fields including `type`, `province`, `stateMaloi`, `deleted`, and `mLastUpdate`. The platform supports patterns such as [[concepts/read-after-write-consistency|Read-after-write consistency]] and [[concepts/soft-delete|Soft delete]] as part of the application's data management strategy. The backend connects to MongoDB Atlas through [[entities/firebase-cloud-functions|Firebase Cloud Functions]], which serve as the runtime environment for the API layer.

## Related Entities

- [[entities/affitti-backend|Affitti Backend]] — the API backend system that connects to this database
- [[entities/affitiudine|affitiudine]] — the application project that this database serves
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — the runtime environment through which the backend connects to Atlas
- [[entities/udine|udine]] — the specific database hosted on this Atlas cluster
- [[entities/affitto_data|affitto_data]] — read-only collection for scraped rental listings
- [[entities/affito|affito]] — writable collection for user decisions
- [[entities/count|count]] — collection for aggregated summary data
- [[entities/feature|feature]] — collection for normalized feature data

## Related Concepts

- [[concepts/x-509-certificate-authentication|X.509 certificate authentication]] — authentication mechanism used for database connectivity (MONGODB-X509 with external auth source)
- [[concepts/read-after-write-consistency|Read-after-write consistency]] — consistency model applied when writing and reading user decisions
- [[concepts/soft-delete|Soft delete]] — deletion strategy used within the database collections, leveraging the `deleted` field
- [[concepts/firebase-authentication|Firebase Authentication]] — authentication layer used in conjunction with X.509 certificate auth for database access
- [[concepts/data-normalization|Data normalization]] — normalization process applied to feature data stored in the database
- [[concepts/web-scraping|Web scraping]] — the data ingestion method used to populate the database with raw rental listings from a real estate portal
- [[concepts/web-scraping-pipeline|Web Scraping Pipeline]] — the pipeline that populates the database with scraped data

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|Affitti Backend PRD v0.3]]**
> - "Database | MongoDB Atlas — cluster `cluster0.7qska.mongodb.net`, DB **`udine`**"
> - "DB Auth | X.509 certificate (`certPath` PEM file) — must be stored as a secret, never in repo"
> - "Rental listing data has been scraped from a real estate portal and stored as raw documents in MongoDB Atlas."

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD Affitto Backend Data Infrastructure]]**
> - "URL | mongodb+srv://cluster0.7qska.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0"
> - "DataBase | udine"
> - "certPath | X509-cert-2864290664025085959.pem"
> - "mongodb+srv://cluster0.7qska.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0"
> - "Il problema è che ho fatto un scrapping di uno sito e messo in una base nosql, ho il dati crudo" (The problem is that I scraped a website and put it in a NoSQL database, I have the raw data)

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato." (System that presents the rental data that it has in the MongoDB database that the scraping returned the data.)
> - "url: \"mongodb+srv://cluster0.7qska.mongodb.net/?\"+ \"authSource=%24external&authMechanism=MONGODB-X509&\"+ \"retryWrites=true&w=majority&appName=Cluster0\""