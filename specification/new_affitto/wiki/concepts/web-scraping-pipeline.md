---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [method]
aliases:
  - "scrapping"
  - "data scraping"
  - "web scraping pipeline"
---


# Web Scraping Pipeline

## Definition

The web scraping pipeline is the data acquisition method used to populate the Affitti system's [[entities/mongodb-atlas|MongoDB Atlas]] database. It involves programmatically extracting real estate listing data from a website and storing the raw, unprocessed results in a NoSQL database. The scraped data follows a detailed JSON schema containing fields for location, multimedia, pricing, energy performance, and property features. The pipeline serves as the initial stage of a broader data processing workflow where raw scraped data is subsequently refined through aggregation pipelines and [[concepts/typescript-business-rules|TypeScript business rules]] before being presented via a [[concepts/react-and-redux-frontend|React/Redux frontend]] for decision-making.

## Key Characteristics

- **Batch-oriented process**: The scraping appears to have been a one-time or periodic batch operation rather than a continuous real-time stream
- **Raw data output**: Produces unprocessed ("crudo") data that requires downstream transformation and enrichment before it is useful for end users
- **NoSQL storage target**: Data is stored directly in MongoDB as JSON-like documents, leveraging the flexible schema capabilities of a document database
- **Rich schema structure**: The scraped data includes comprehensive real estate listing fields organized into nested objects such as [[concepts/location|location]], [[concepts/multimedia|multimedia]], [[concepts/price|price]], [[concepts/energy|energy]], [[concepts/featurelist|featureList]], and [[concepts/properties|properties]]
- **Single-source extraction**: Data was scraped from a single real estate website, resulting in a homogeneous dataset
- **Foundation for downstream processing**: The scraped data feeds into [[concepts/data-aggregation|aggregation pipelines]] and business logic layers that clean, classify, and present the information

## Applications

- **Real estate market analysis**: Acquiring bulk property listing data from public websites to enable comparative analysis and informed rental decisions
- **Database population**: Seeding a MongoDB database with structured real estate data that can then be queried, filtered (e.g., via [[concepts/province-filter|province filtering]]), and aggregated
- **Decision support systems**: Providing the raw data foundation for systems like Affitti that help users evaluate rental properties through classification states such as [[concepts/acceptdenywait|accept/deny/wait]]
- **Data pipeline architecture**: Serving as the ingestion layer in a multi-stage pipeline that moves from raw acquisition → transformation → API presentation → frontend visualization

## Related Concepts

- [[concepts/web-scraping|Web scraping]]
- [[concepts/data-aggregation|Data aggregation]]
- [[concepts/json-schema|JSON Schema]]
- [[concepts/typescript-business-rules|TypeScript business rules]]
- [[concepts/react-and-redux-frontend|React/Redux frontend]]
- [[concepts/location|location]]
- [[concepts/multimedia|multimedia]]
- [[concepts/price|price]]
- [[concepts/energy|energy]]
- [[concepts/properties|properties]]
- [[concepts/featurelist|featureList]]
- [[concepts/realestatepage|realEstatePage]]

## Related Entities

- [[entities/affitto-data|affitto_data]]
- [[entities/udine|Udine]]
- [[entities/mongodb-atlas|MongoDB Atlas]]

## Mentions in Source

- "Il problema è che ho fatto un scrapping di uno sito e messo in una base nosql, ho il dati crudo" *(The problem is that I scraped a website and put it in a NoSQL database, I have the raw data)* — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "voglio un sistema per preparare e presentare il dado crudo con aggregation e typescript business rules per la API e creare un frontend react e redux per presentare il dati e tomare dedizione" *(I want a system to prepare and present the raw data with aggregation and TypeScript business rules for the API and create a React and Redux frontend to present the data and make decisions)* — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]