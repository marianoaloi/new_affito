---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/new-affitto_840b29]]"
tags:
  - "term"
aliases:
  - "business logic"
  - "regole business"
  - "business rules layer"
---

## Basic Information
- **Type:** concept
- **Concept subtype:** term
- **Sources:** [[sources/new-affitto_840b29|New Affitto]]

## Definition
Business rules refer to the logic processed by Firebase Cloud Functions within the Affitti rental system. These rules govern how rental data stored in MongoDB is processed, transformed, and served to the frontend application. The business rules layer acts as an intermediary between the raw scraped data persisted in MongoDB and the presentation layer, ensuring that data is properly validated, transformed, and formatted before being sent to the client application.

## Key Characteristics
- **Server-side processing**: Business rules are executed within Firebase Cloud Functions, keeping logic on the server rather than in the client application
- **Data transformation layer**: Sits between the raw data in MongoDB (populated via web scraping) and the frontend, acting as a middleware that processes and reshapes data
- **Decoupled architecture**: Separates data acquisition (scraping), data processing (business rules), and data presentation (frontend) into distinct layers
- **Read-oriented logic**: Primarily concerned with reading and processing data that MongoDB has acquired through separate scraping processes
- **Firebase-hosted execution**: Leverages the Firebase Cloud Functions infrastructure for serverless execution of the business logic
- **Core backend pipeline component**: Forms a central part of the backend processing pipeline, ensuring data meets specific criteria or formatting requirements before reaching the user-facing presentation

## Applications
- Processing and filtering raw rental listing data before serving it to the frontend table and map views
- Applying transformation rules to scraped property data (e.g., normalizing fields, computing derived values)
- Enforcing data validation and consistency checks on rental records retrieved from MongoDB Atlas
- Serving processed data to authenticated and unauthenticated frontend pages with appropriate access controls
- Aggregating rental data for analytical views and summary statistics

## Related Concepts
- [[concepts/hosting|hosting]] — Firebase Hosting serves the frontend that consumes data processed by business rules
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — The upstream process that populates MongoDB with raw data that business rules then process
- [[concepts/function|Cloud Functions]] — The Firebase Cloud Functions that execute the business rules logic
- [[concepts/prd|PRD]] — Product requirements documents that define the expected behavior of the business rules layer

## Related Entities
- [[entities/Firebase|Firebase]] — Provides the Cloud Functions platform where business rules are executed
- [[entities/MongoDB-Atlas|MongoDB Atlas]] — The database from which business rules read and process scraped rental data

## Mentions in Source

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "**function** per processare il business rules e legere il dati che il mongoDB has by scrapping at other process." *(Function to process the business rules and read the data that MongoDB has [acquired] by scraping in another process.)*