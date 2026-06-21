---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/new-affitto_840b29]]"
tags:
  - "other"
aliases:
  - "Cluster0"
  - "MongoDB Atlas Cluster0"
---

## Description
cluster0.7qska.mongodb.net is the specific MongoDB Atlas cluster endpoint used by the affitti system. It is identified by the connection string `mongodb+srv://cluster0.7qska.mongodb.net/` and is referenced with the application name "Cluster0". The cluster hosts the [[entities/udine|udine]] database, which contains the [[entities/affito|affito]] collection storing rental property listings. The connection is configured with [[concepts/x509-certificate-authentication|X.509 certificate authentication]] using an external authentication source (`authSource=%24external&authMechanism=MONGODB-X509`), retry writes enabled, and write concern set to majority. The [[concepts/certificatepath|certificatePath]] parameter is used to specify the path to the X.509 certificate for authenticating against this cluster. This infrastructure underpins the backend data layer described in the system's architecture documentation.

## Related Entities
- [[entities/udine|udine]] — the database hosted on this cluster
- [[entities/affito|affito]] — the collection within the udine database

## Related Concepts
- [[concepts/x509-certificate-authentication|X.509 certificate authentication]] — the authentication mechanism configured for cluster access
- [[concepts/json-schema|JSON Schema]] — used to validate documents stored in the cluster's collections
- [[concepts/certificatepath|certificatePath]] — the parameter specifying the X.509 certificate file path for authentication

## Mentions in Source

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - `url: "mongodb+srv://cluster0.7qska.mongodb.net/?"+`
> - `"authSource=%24external&authMechanism=MONGODB-X509&"+`
> - `"retryWrites=true&w=majority&appName=Cluster0",`