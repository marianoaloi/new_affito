---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/new-affitto_840b29]]"
tags:
  - "method"
aliases:
  - "Web scraping"
  - "scrapping"
  - "data scraping"
---

## Description
Web scraping is an automated data acquisition method used to extract structured information from websites. In the context of the Affitti system, web scraping is employed as an external process, separate from the main system, to collect rental listing data from a real estate website. The scraped data is stored as raw documents in the 'affito' collection of the 'udine' MongoDB database hosted on [[entities/mongodb-atlas|MongoDB Atlas Cloud]], preserving the original structure of the real estate listings including detailed property features, location data, multimedia assets, pricing information, and energy certifications. The scraping pipeline is a prerequisite for the system's data availability — [[concepts/function|Firebase Cloud Functions]] then read this scraped data to apply [[concepts/business-rules|business rules]] and serve it to the frontend. The entire Affitti backend and frontend architecture was conceived to process, aggregate, and present this scraped raw data.

## Key Characteristics
- **Automated extraction**: Data is collected programmatically from a target real estate website without manual intervention
- **External process**: The scraping pipeline operates separately from the main Affitti system and is a prerequisite for data availability
- **Raw data preservation**: Scraped data retains the original structure and fields from the source website, stored as-is in a NoSQL document format
- **Rich data capture**: The scraping process captures a comprehensive set of property attributes including features ([[concepts/featurelist|featureList]], [[concepts/primaryfeatures|primaryFeatures]]), location information ([[concepts/location|location]]), multimedia assets, pricing, and energy certifications
- **Upstream data source**: Web scraping sits at the beginning of the data pipeline — all downstream processing (aggregation, normalization, presentation) depends on the quality and structure of the scraped data
- **NoSQL storage affinity**: The variable and nested structure of scraped web data maps naturally to document-oriented databases like MongoDB, avoiding the rigidity of relational schemas

## Applications
- **Real estate data collection**: Populating the [[entities/affitto_data|affitto_data]] collection with rental listings scraped from an external real estate portal
- **Market analysis**: Enabling property evaluation and comparison through the [[concepts/feature-analysis|Feature analysis view]] built on top of scraped data
- **Data pipeline initialization**: Providing the raw input that is subsequently processed via [[concepts/data-normalization|data normalization]], [[concepts/external-aggregation-process|external aggregation]], and [[concepts/typescript-business-rules|TypeScript business rules]] before being served through the [[entities/affitti-backend|Affitti Backend API]]
- **Decision support**: Supplying the data foundation that the [[concepts/react-and-redux-frontend|React/Redux UI]] uses to help the [[concepts/evaluator|evaluator]] persona make informed rental decisions

## Related Concepts
- [[concepts/data-normalization|Data normalization]] — downstream processing applied to raw scraped data
- [[concepts/external-aggregation-process|External aggregation]] — aggregation pipeline that transforms scraped data
- [[concepts/realestatepage|realEstatePage]] — the document object representing a scraped real estate listing
- [[concepts/featurelist|featureList]] — property features captured during scraping
- [[concepts/location|location]] — location sub-object preserved from scraped listings
- [[concepts/feature-analysis|Feature analysis view]] — analytical view built on scraped data
- [[concepts/slim-dto|DTO]] — data transfer objects derived from raw scraped documents
- [[concepts/business-rules|business rules]] — business logic applied to scraped data by Cloud Functions
- [[concepts/typescript-business-rules|TypeScript business rules]] — TypeScript API rules processing scraped data
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the broader scraping pipeline concept
- [[concepts/function|Firebase Cloud Functions]] — the serverless functions that read and process scraped data from MongoDB

## Related Entities
- [[entities/affitto_data|affitto_data]] — the MongoDB collection that stores the raw scraped data
- [[entities/udine|udine]] — the MongoDB database housing all scraped and processed collections
- [[entities/mongodb-atlas|MongoDB Atlas Cloud]] — the cloud database platform where scraped data is persisted
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that processes and serves scraped data

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "Il problema è che ho fatto un scrapping di uno sito e messo in una base nosql, ho il dati crudo" *(The problem is that I did a scraping of a website and put it in a NoSQL database, I have the raw data)*
> - "voglio un sistema per preparare e presentare il dado crudo con aggregation e typescript business rules per la API e creare un frontend react e redux per presentare il dati e tomare dedizione" *(I want a system to prepare and present the raw data with aggregation and TypeScript business rules for the API and create a React and Redux frontend to present the data and make decisions)*

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato."
> - "**[[function]]** per processare il business rules e legere il dati che il mongoDB has by scrapping at other process."