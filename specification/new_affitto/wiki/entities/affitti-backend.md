---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
tags:
  - "project"
aliases:
  - "Affitti API Layer"
  - "Affitti Backend API"
---

## Description
Affitti Backend is a TypeScript-based API layer project designed to process and expose scraped rental listing data for evaluation purposes. It runs on [[entities/firebase-cloud-functions|Firebase Cloud Functions]] and connects to [[entities/mongodb-atlas|MongoDB Atlas]] for data storage. The project's primary purpose is threefold: preparing raw scraped data through aggregations and normalization with TypeScript business rules, exposing it through clean typed API endpoints consumable by a React/Redux frontend, and persisting user evaluation decisions including verdicts ([[concepts/statemaloi|stateMaloi]]) and personal notes. The project scope is explicitly limited to the backend/API layer, with a separate PRD planned for the React/Redux frontend. The architecture follows a [[concepts/split-collection-architecture|split-collection architecture]] where reads come from the [[entities/affitto_data|affitto_data]] collection and writes go to the [[entities/affito|affito]] collection, with aggregated data stored in [[entities/count|count]] and [[entities/feature|feature]] collections. The PRD defines five development milestones from foundation scaffolding through hardening, with the current document at version 0.3 in draft status. The backend serves as the intermediary layer between the [[entities/affitiudine|affitiudine]] scraping system and the frontend application, leveraging [[concepts/slim-dto|Slim DTO]] patterns and [[concepts/read-after-write-consistency|read-after-write consistency]] to ensure data integrity. Authentication is handled via [[concepts/firebase-authentication|Firebase Authentication]].

## Related Entities
- [[entities/mongodb-atlas|MongoDB Atlas]] — database layer for persistent storage
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — serverless runtime environment
- [[entities/affitiudine|affitiudine]] — related scraping system providing raw rental listing data
- [[entities/affitto_data|affitto_data]] — source collection for read operations
- [[entities/affito|affito]] — target collection for write operations (user evaluations)
- [[entities/count|count]] — aggregated count data collection
- [[entities/feature|feature]] — aggregated feature data collection

## Related Concepts
- [[concepts/statemaloi|stateMaloi]] — user verdict classification applied to evaluated listings
- [[concepts/read-after-write-consistency|Read-after-write consistency]] — consistency pattern used in the API design
- [[concepts/slim-dto|Slim DTO]] — data transfer object pattern for typed API responses
- [[concepts/firebase-authentication|Firebase Authentication]] — authentication mechanism for API access

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|Affitti Backend PRD v0.3]]**
> - "We need a backend that: 1. **Prepares** the raw data — aggregations, normalization, and TypeScript business rules. 2. **Exposes** it through a clean, typed API consumable by a React/Redux frontend. 3. **Persists decisions** — the user evaluates listings and records a verdict (`stateMaloi`) and personal notes (`description`)."
> - "**Scope** | Backend / API only. Frontend (React + Redux) will be covered in a separate PRD."