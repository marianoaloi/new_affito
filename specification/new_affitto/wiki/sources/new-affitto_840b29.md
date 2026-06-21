---
type: source
created: 2026-06-21
updated: 2026-06-21
source_file: "[[old/New Affitto.md]]"
tags: [hosting, business-rules, redux, x509, web-scraping, function, table, typescript, react, certificatepath]
aliases: ["New Affitto", "Affitti System Architecture"]
---

# Affitti System Overview — Firebase, MongoDB, and Frontend Architecture - Summary

## Source
- Original file: [[old/New Affitto.md]]
- Ingested: 2026-06-21

## Core Content

This source describes a rental data presentation system ([[concepts/affitti|affitti]]) that displays data collected via [[concepts/web-scraping|web scraping]] and stored in a [[entities/mongodb|MongoDB]] database. The system follows a three-tier architecture: a scraping pipeline populates the [[entities/affito|affito]] collection within the [[entities/udine|udine]] database on a [[entities/cluster0-7qska-mongodb-net|MongoDB Atlas cluster]]. [[entities/firebase|Firebase]] serves dual roles — [[concepts/hosting|hosting]] delivers the frontend built with [[concepts/typescript|TypeScript]], [[concepts/react|React]], and [[concepts/redux|Redux]], while [[concepts/function|Cloud Functions]] process [[concepts/business-rules|business rules]] and read data from MongoDB. Secure connectivity between Functions and the Atlas cluster is established through [[concepts/x-509-certificate-authentication|X.509 certificate authentication]], with the certificate path configured via [[concepts/certificatepath|certificatePath]]. The frontend renders rental data from Redux state into a [[concepts/table|table]] component with a main column layout. The [[concepts/infrastruture|infrastructure]] configuration specifies the full MongoDB connection string with parameters for external auth source, retry writes, and majority write concern.

## Key Entities
- [[entities/firebase|Firebase]] — Cloud platform providing hosting and serverless functions
- [[entities/mongodb|MongoDB]] — NoSQL database storing scraped rental data
- [[entities/cluster0-7qska-mongodb-net|MongoDB Atlas Cluster0]] — The Atlas cluster endpoint for database connectivity
- [[entities/udine|Udine]] — Database name, indicating geographic focus on Udine, Italy
- [[entities/affito|affito]] — MongoDB collection storing rental listings

## Key Concepts
- [[concepts/web-scraping|Web Scraping]] — Data acquisition method populating the database
- [[concepts/function|Firebase Cloud Functions]] — Backend processing layer for business logic
- [[concepts/hosting|Hosting]] — Firebase Hosting serving the frontend application
- [[concepts/redux|Redux]] — State management for rental data in the frontend
- [[concepts/x-509-certificate-authentication|X.509 Certificate Authentication]] — Security mechanism for MongoDB access
- [[concepts/react|React]] — Component-based UI framework for the frontend
- [[concepts/typescript|TypeScript]] — Typed language used for the frontend codebase

## Main Points
- The system presents rental data (affitti) stored in MongoDB, collected via an external web scraping process
- Firebase provides both frontend hosting (TypeScript/React/Redux) and backend Cloud Functions
- Firebase Cloud Functions process business rules and serve as the intermediary between MongoDB and the frontend
- MongoDB Atlas uses X.509 certificate authentication (PEM file) for secure, passwordless database access
- The database is named `udine` with a collection named `affito`, suggesting geographic scoping to Udine, Italy
- Frontend displays rental data in a table format, with data managed through Redux state
- The architecture follows a clear pipeline: **web scraping → MongoDB → Firebase Functions → React frontend**