---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/new-affitto_840b29]]"]
tags: [product]
aliases:
  - "mongoDB"
  - "Mongo"
  - "MongoDB Atlas"
---


# MongoDB

## Basic Information
- Type: product
- Source: [[sources/new-affitto_840b29|New Affitto]]

## Description
MongoDB is the NoSQL database system used in the Affitti project to store rental (affitti) data that has been collected via a [[concepts/web-scraping-pipeline|web scraping pipeline]]. The system connects to a MongoDB Atlas cluster hosted at [[entities/cluster0-7qska-mongodb-net|cluster0.7qska.mongodb.net]] using [[concepts/certificatepath|X.509 certificate authentication]]. The database named [[entities/udine|udine]] contains the `affito` collection, which is queried using the [[concepts/affito-collection-query|affito aggregation pipeline]]. [[concepts/function|Firebase Cloud Functions]] read data from MongoDB to process [[concepts/business-rules|business rules]] and serve the results to the frontend application. The data stored in MongoDB originates from external scraping processes and is presented to users through the [[concepts/table|data table]] and other views in the [[entities/firebase|Firebase]]-hosted frontend.

## Related Entities
- [[entities/cluster0-7qska-mongodb-net|cluster0.7qska.mongodb.net]] — the MongoDB Atlas cluster endpoint
- [[entities/udine|udine]] — the database containing the affito collection
- [[entities/firebase|Firebase]] — the platform hosting Cloud Functions that read from MongoDB

## Related Concepts
- [[concepts/certificatepath|certificatePath parameter]] — X.509 certificate path used for authentication
- [[concepts/web-scraping-pipeline|web scraping pipeline]] — the process that populates MongoDB with rental data
- [[concepts/affito-collection-query|affito collection aggregation]] — the query pipeline used to retrieve data from the affito collection
- [[concepts/function|Firebase Cloud Functions]] — serverless functions that read data from MongoDB
- [[concepts/business-rules|business rules]] — logic applied when processing data from MongoDB
- [[concepts/prende-affitti|Prende Affitti feature]] — the feature that retrieves rental data from the database

## Mentions in Source
- "Sistema che presenta il dati di affitti che ha nel database mongodb che il scrapping ho ritornato il dato." *(System that presents rental data stored in the MongoDB database, which the scraping process returned.)* — [[sources/new-affitto_840b29|New Affitto]]
- "**[[concepts/function|function]]** per processare il business rules e legere il dati che il mongoDB has by scrapping at other process." *(Functions to process business rules and read the data that MongoDB has from scraping in another process.)* — [[sources/new-affitto_840b29|New Affitto]]
- "Mongo  {
    url: \"mongodb+srv://cluster0.7qska.mongodb.net/?\"+" — [[sources/new-affitto_840b29|New Affitto]]