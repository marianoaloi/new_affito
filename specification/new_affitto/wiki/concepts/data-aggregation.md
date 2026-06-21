---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "method"
aliases:
  - "MongoDB aggregation"
  - "Data aggregation pipeline"
  - "Aggregation"
---

## Basic Information

- **Type:** concept (method)
- **Sources:** [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- **Definition:** Data aggregation is the core data processing method used in the Affitti backend system to transform raw scraped rental data into meaningful summaries and analysis views. The system leverages MongoDB aggregation pipelines to consolidate records from the [[entities/affitto_data|affitto_data]] source collection into derived read-optimized collections — specifically the [[entities/count|count]] collection and the [[entities/feature|feature]] collection — enabling dashboard-level insights and analytical views for evaluators.

## Description

Data aggregation in the Affitti system is built on MongoDB's native aggregation framework, which performs multi-stage data transformations directly within the database layer. The [[entities/count|count]] collection is the output of an aggregation pipeline that groups properties by province and type, computing totals and category breakdowns by [[concepts/statemaloi|stateMaloi]] values (`accept`, `deny`, `wait`, `emptyChoise`), elevator availability, and disability access. Similarly, the [[entities/feature|feature]] collection is an aggregation/projection output that extracts key property characteristics ([[concepts/featurelist|featureList]] and [[concepts/primaryfeatures|primaryFeatures]]) grouped alongside province, type, and [[concepts/statemaloi|stateMaloi]]. The PRD explicitly calls for "aggregation and TypeScript business rules" to prepare and present the raw scraped data for decision-making. Aggregation results are stored in dedicated collections following the [[concepts/split-collection-architecture|split-collection architecture]], separating raw data from processed summaries to optimize read performance. Due to the [[concepts/external-aggregation-process|external aggregation process]] execution model, aggregated collections follow an [[concepts/eventual-consistency|eventual consistency]] pattern where there may be a brief lag between raw data updates and summary recalculation.

## Key Characteristics

- **MongoDB aggregation pipelines**: The system relies on MongoDB's native aggregation framework to perform multi-stage data transformations directly within the database layer
- **Grouped summary statistics**: The [[entities/count|count]] collection aggregates data by province and type, producing totals and breakdowns by [[concepts/statemaloi|stateMaloi]] values (`accept`, `deny`, `wait`, `emptyChoise`), elevator availability, and disability access
- **Feature extraction**: The [[entities/feature|feature]] collection extracts principal property features ([[concepts/featurelist|featureList]] and [[concepts/primaryfeatures|primaryFeatures]]) grouped alongside province, type, and [[concepts/statemaloi|stateMaloi]]
- **Read-optimized output**: Aggregation results are stored in dedicated collections following the [[concepts/split-collection-architecture|split-collection architecture]], separating raw data from processed summaries to optimize read performance
- **External trigger model**: Aggregation is executed as an [[concepts/external-aggregation-process|external aggregation process]], running outside the main API request cycle to avoid latency on user-facing endpoints
- **Eventual consistency**: Due to the external refresh model, aggregated collections follow an [[concepts/eventual-consistency|eventual consistency]] pattern — there may be a brief lag between raw data updates and summary recalculation

## Applications

- **Dashboard summary views**: The [[entities/count|count]] collection powers the main dashboard, giving evaluators an at-a-glance overview of rental listing totals segmented by province, property type, and review status
- **Feature analysis views**: The [[entities/feature|feature]] collection supports the [[concepts/feature-analysis|FR-7 feature analysis view]], allowing users to explore principal characteristics of listings filtered by geographic and classification criteria
- **Decision support**: By pre-computing aggregated statistics, the system enables the [[concepts/evaluator|evaluator]] persona to make informed decisions about rental listings without manually querying raw data
- **Performance optimization**: Pre-aggregated collections served through the [[entities/affitti-backend|Affitti Backend API]] reduce computational load on the [[entities/mongodb-atlas|MongoDB Atlas]] cluster by avoiding repeated on-the-fly aggregation queries from the [[concepts/react-and-redux-frontend|React/Redux UI]]

## Related Concepts

- [[concepts/web-scraping|web-scraping]] — upstream data collection method that populates the raw data subject to aggregation
- [[concepts/split-collection-architecture|split-collection architecture]] — architectural pattern that separates raw and aggregated collections
- [[concepts/external-aggregation-process|external-aggregation-process]] — the execution model for triggering aggregation outside the API lifecycle
- [[concepts/eventual-consistency|eventual-consistency]] — consistency model resulting from the decoupled aggregation refresh cycle
- [[concepts/feature-analysis|feature-analysis]] — the frontend analysis view powered by aggregated feature data
- [[concepts/statemaloi|statemaloi]] — the review status enum used as a grouping dimension in aggregation
- [[concepts/featurelist|featureList]] — property feature data extracted during aggregation
- [[concepts/primaryfeatures|primaryFeatures]] — principal features extracted during aggregation
- [[concepts/slim-dto|slim-dto]] — data transfer objects that may carry aggregated results to the frontend

## Related Entities

- [[entities/count|count]] — derived collection storing summary statistics produced by aggregation
- [[entities/feature|feature]] — derived collection storing extracted principal features from aggregation
- [[entities/affitto_data|affitto_data]] — source collection containing raw scraped rental data
- [[entities/mongodb-atlas|MongoDB Atlas]] — cloud database platform where aggregation pipelines execute
- [[entities/affitti-backend|Affitti Backend API]] — API layer that serves aggregated data to the frontend
- [[entities/udine|udine]] — MongoDB database hosting the collections involved in aggregation

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "ho il dati crudo, voglio un sistema per preparare e presentare il dado crudo con aggregation e typescript business rules per la API"
> - "Prende il attuale stato del banco in un riesumo totale"
> - "des prendi il principale informazione"