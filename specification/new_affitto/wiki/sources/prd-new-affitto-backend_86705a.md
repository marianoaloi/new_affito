---
type: source
created: 2026-06-21
updated: 2026-06-21
source_file: "[[old/PRD New Affitto (backend).md]]"
tags: [stateMaloi, BulkStateMaloi, X.509 certificate authentication, featureList, primaryFeatures, Firebase authentication with Google provider, mLastUpdate, React and Redux frontend, realEstatePage, userUpdate, location, multimedia, energy, web scraping, data aggregation, costs, surfaceConstitution, rent, province filter, price, description update, loweredPrice, buildingPerformance, JSON Schema, floor, contractValue, availability, garage, elevator, disable, accept/deny/wait, PRD, surfaceValue, photo, floorplans, virtualTours, emptyChoise, TypeScript business rules, caption, updateMany, updateOne, $in operator, $set operator, condominiumExpenses]
aliases: ["Affitti PRD Backend", "PRD Affitto Internal Rental System"]
---

# PRD for Affitti Internal Rental System - Initial Requirements Document - Summary

## Source
- Original file: [[old/PRD New Affitto (backend).md]]
- Ingested: 2026-06-21

## Core Content

This document is an initial Product Requirements Document (PRD) for [[entities/affitiudine|affitiudine]], an internal rental property management system. The system was built to process raw real estate data obtained via a [[concepts/web-scraping-pipeline|web scraping pipeline]] from an Italian rental website, stored in [[entities/mongodb-atlas|MongoDB Atlas]] using [[concepts/x-509-certificate-authentication|X.509 certificate authentication]]. The [[entities/udine|udine]] database contains four collections: [[entities/affitto_data|affitto_data]] (read-only adapted rental data), [[entities/affito|affito]] (writable user decisions), [[entities/count|count]] (pre-aggregated statistics), and [[entities/feature|feature]] (extracted property characteristics). The backend is hosted on [[entities/firebase-cloud-functions|Firebase Cloud Functions]] with TypeScript business rules, while [[concepts/firebase-authentication|Firebase Authentication]] with Google provider secures write operations. The planned frontend uses React and Redux for data presentation and decision-making. The central evaluation mechanism is [[concepts/statemaloi|stateMaloi]], enabling an [[concepts/acceptdenywait-classification|accept/deny/wait classification]] of properties.

## Key Entities

- **[[entities/affitiudine|affitiudine]]** — Firebase project serving as the central system identifier
- **[[entities/affitto_data|affitto_data]]** — Primary read collection with comprehensive property schemas including [[concepts/location|location]], [[concepts/multimedia|multimedia]], [[concepts/energy|energy]], [[concepts/price|price]], and [[concepts/properties|properties]]
- **[[entities/affito|affito]]** — Writable collection for user decisions (stateMaloi, descriptions)
- **[[entities/count|count]]** — Pre-aggregated summary statistics grouped by province and type
- **[[entities/feature|feature]]** — Extracted property features via [[concepts/featurelist|featureList]] and [[concepts/primaryfeatures|primaryFeatures]]
- **[[entities/udine|udine]]** — MongoDB database name and target geographic area
- **[[entities/mongodb-atlas|MongoDB Atlas]]** — Cloud-hosted NoSQL database (Cluster0)
- **[[entities/firebase-cloud-functions|Firebase Cloud Functions]]** — Serverless backend hosting

## Key Concepts

- **[[concepts/statemaloi|stateMaloi]]** — Core evaluation field: 0 (not good), 1 (good), 2 (so-so)
- **[[concepts/bulkstatemaloi|BulkStateMaloi]]** — Batch update operation for multiple property evaluations
- **[[concepts/acceptdenywait-classification|Accept/Deny/Wait Classification]]** — Decision framework reflected in count collection
- **[[concepts/firebase-authentication|Firebase Authentication]]** / **[[concepts/firebase-id-token-verification|Firebase ID Token Verification]]** — User-facing security layer
- **[[concepts/x-509-certificate-authentication|X.509 Certificate Authentication]]** — Database-level security
- **[[concepts/mongodb-aggregation|MongoDB Aggregation]]** — Data processing for summaries and feature extraction
- **[[concepts/web-scraping-pipeline|Web Scraping Pipeline]]** — Data acquisition method
- **[[concepts/realestatepage|realEstatePage]]** — Core listing metadata including [[concepts/price|price]], [[concepts/contractvalue|contractValue]], and [[concepts/loweredprice|loweredPrice]]
- **[[concepts/properties|properties]]** — Detailed listing attributes: [[concepts/location|location]], [[concepts/multimedia|multimedia]], [[concepts/energy|energy]], [[concepts/costs|costs]], [[concepts/rent|rent]], [[concepts/surfaceconstitution|surfaceConstitution]], [[concepts/floor|floor]]
- **[[concepts/userupdate|userUpdate]]** / **[[concepts/mlastupdate|mLastUpdate]]** — Audit trail fields
- **[[concepts/province-filter|Province Filter]]** — Primary data filtering mechanism
- **[[concepts/elevator-accessibility-tracking|Elevator Accessibility Tracking]]** — Specialized accessibility metrics in count collection
- **[[concepts/description-update|Description Update]]** — User annotation write operation

## Main Points

- **Data Pipeline**: Raw real estate data is scraped from an Italian property website and stored in MongoDB Atlas, then processed through [[concepts/mongodb-aggregation|aggregation pipelines]] and TypeScript business rules
- **Two-Tier Security**: [[concepts/x-509-certificate-authentication|X.509 certificates]] secure the database connection while [[concepts/firebase-id-token-verification|Firebase tokens]] secure API write access
- **Four-Collection Architecture**: Read data ([[entities/affitto_data|affitto_data]]), write decisions ([[entities/affito|affito]]), aggregated stats ([[entities/count|count]]), and feature analysis ([[entities/feature|feature]]) are separated into distinct collections
- **Evaluation System**: [[concepts/statemaloi|stateMaloi]] provides a simple three-state triage (good/not good/so-so) with [[concepts/bulkstatemaloi|bulk update]] capability for efficient property classification
- **Comprehensive Property Schema**: [[entities/affitto_data|affitto_data]] documents include [[concepts/location|location]] data (with [[concepts/macrozone|macrozone]]/[[concepts/microzone|microzone]]), [[concepts/multimedia|multimedia]] assets ([[concepts/photos|photos]], [[concepts/floorplans|floorplans]], [[concepts/virtualtours|virtual tours]], [[concepts/videos|videos]]), [[concepts/energy|energy classification]] (including [[concepts/buildingperformance|building performance]] and [[concepts/airconditioning|air conditioning]]), and financial data ([[concepts/price|price]], [[concepts/costs|costs]], [[concepts/rent|rent]])
- **Audit Trail**: Every write operation records the user's email ([[concepts/userupdate|userUpdate]]) and timestamp ([[concepts/mlastupdate|mLastUpdate]])
- **Accessibility Metrics**: The [[entities/count|count]] collection tracks [[concepts/elevator-accessibility-tracking|elevator and disability access]] statistics separately from the main classification
- **Italian Property Features**: [[concepts/primaryfeatures|primaryFeatures]] contains 50+ fields using Italian naming conventions covering amenities from pool to fiber optics
- **Planned Frontend**: React and Redux for data visualization and decision-making, hosted on Firebase