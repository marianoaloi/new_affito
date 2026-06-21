---
type: source
created: 2026-06-21
updated: 2026-06-21
source_file: "[[old/PRD_Affitti_Backend_v0.3.md]]"
tags: [stateMaloi, Read-after-write consistency, Firebase Authentication, Slim DTO, Soft delete, Data normalization, X.509 certificate authentication, Eventual consistency, Bulk state update, Audit trail, Write whitelist, Rate limiting, CORS, Optimistic update, Firebase ID token verification, Shared types package, Evaluator, Cold start]
aliases: ["Affitti Backend PRD v0.3", "PRD Affitti API Layer"]
---

# PRD — Affitti Backend (API Layer) - Summary

## Source
- Original file: [[old/PRD_Affitti_Backend_v0.3.md]]
- Ingested: 2026-06-21

## Core Content

This Product Requirements Document (v0.3, draft) specifies the [[entities/affitti-backend|Affitti Backend]], a TypeScript API layer hosted on [[entities/firebase-cloud-functions|Firebase Cloud Functions]] that exposes scraped rental listing data from [[entities/mongodb-atlas|MongoDB Atlas]] for user evaluation. The system uses a [[concepts/split-collection-architecture|split-collection architecture]]: reads target [[entities/affitto_data|affitto_data]], [[entities/count|count]], and [[entities/feature|feature]] collections, while writes go exclusively to [[entities/affito|affito]]. The core workflow revolves around the [[concepts/evaluator|Evaluator]] persona — an authenticated user who browses listings, assigns a [[concepts/statemaloi|stateMaloi]] verdict (0 = non buono, 1 = buono, 2 = così così), and writes personal notes. All endpoints require [[entities/firebase-authentication|Firebase Authentication]] except a public stats summary. Business rules enforce a [[concepts/write-whitelist|write whitelist]], [[concepts/audit-trail|audit trails]], [[concepts/soft-delete|soft delete]], [[concepts/data-normalization-br-4|BSON data normalization]], and [[concepts/id-typing-validation|id typing validation]]. The PRD identifies [[concepts/read-after-write-gap|read-after-write consistency gaps]] as a primary risk stemming from dependency on an [[concepts/external-aggregation-process|external aggregation process]], and proposes [[concepts/optimistic-updates|optimistic updates]] as mitigation.

## Key Entities

- **[[entities/affitti-backend|Affitti Backend]]** — The core TypeScript API project hosted on Firebase Cloud Functions under the [[entities/affitiudine|affitiudine]] Firebase project
- **[[entities/mongodb-atlas|MongoDB Atlas]]** — Cloud database hosting the [[entities/udine|udine]] database with four collections
- **[[entities/firebase-cloud-functions|Firebase Cloud Functions]]** — Serverless compute platform running the API
- **[[entities/firebase-authentication|Firebase Authentication]]** — Google provider-based auth securing all endpoints
- **[[entities/affitto_data|affitto_data]]** — Read-only collection of scraped rental listings
- **[[entities/affito|affito]]** — Write-target collection for user decisions and descriptions
- **[[entities/count|count]]** — Aggregated summary counters per province/type
- **[[entities/feature|feature]]** — Normalized per-listing feature data for comparison

## Key Concepts

- **[[concepts/split-collection-architecture|Split-collection architecture]]** — Reads and writes target different collections, creating [[concepts/eventual-consistency|eventual consistency]]
- **[[concepts/statemaloi|stateMaloi]]** — Core decision enum (0/1/2) for evaluating listings
- **[[concepts/slim-dto|Slim DTO]]** — Lightweight normalized payloads for list views
- **[[concepts/audit-trail|Audit trail]]** — Every write records timestamp and authenticated user email
- **[[concepts/write-whitelist|Write whitelist]]** — Only `description` and `stateMaloi` are writable
- **[[concepts/data-normalization-br-4|Data normalization (BR-4)]]** — Cleans BSON artifacts (NaN, Infinity) to `number | null`
- **[[concepts/x-509-certificate-authentication|X.509 certificate authentication]]** — Machine-to-machine auth for MongoDB connection
- **[[concepts/firebase-id-token-verification|Firebase ID token verification]]** — Token validation on every request via Admin SDK
- **[[concepts/bulk-state-update|Bulk state update]]** — Batch decision updates for up to 500 listings
- **[[concepts/feature-analysis|Feature analysis]]** — Normalized feature comparison view
- **[[concepts/rate-limiting|Rate limiting]]** — Per-IP protection on the public endpoint
- **[[concepts/cors-policy|CORS policy]]** — Restricted to the Firebase Hosting domain
- **[[concepts/shared-types-package|Shared types package]]** — TS types shared between API and frontend
- **[[concepts/read-after-write-gap|Read-after-write gap]]** — Primary risk from the split-collection design
- **[[concepts/external-aggregation-process|External aggregation process]]** — Unspecified process that materializes count/feature data

## Main Points

- **Split architecture creates consistency trade-offs**: The separation of read and write collections means user decisions are [[concepts/eventual-consistency|eventually consistent]], with the [[concepts/read-after-write-gap|read-after-write gap]] identified as the top risk (R1). Whether to implement a `$lookup` merge strategy remains the key open question (Q1).
- **Strict security model**: All endpoints require [[concepts/firebase-id-token-verification|Firebase ID token verification]] except the public stats summary. Database access uses [[concepts/x-509-certificate-authentication|X.509 certificates]] stored as secrets. [[concepts/cors-policy|CORS]] is restricted to the hosting domain.
- **Defensive data handling**: The [[concepts/write-whitelist|write whitelist]] limits mutations to two fields. [[concepts/slim-dto|Slim DTOs]] protect against the large, irregular scraped schema. [[concepts/data-normalization-br-4|BSON normalization]] shields the frontend from raw MongoDB artifacts.
- **Five implementation milestones**: M1 (Foundation — scaffold, Mongo connection, token middleware, shared types), M2 (Read API — listing endpoints with DTOs), M3 (Write API — state/description mutations with validation), M4 (Aggregations — stats and feature endpoints), M5 (Hardening — [[concepts/rate-limiting|rate limiting]], [[concepts/cors-policy|CORS]], logging, error handling).
- **Cold start risk (R4)**: [[entities/firebase-cloud-functions|Cloud Functions]] cold starts may degrade first-request performance; minimum instances suggested as mitigation. Target is P95 under 800ms excluding cold starts.
- **Unresolved open questions**: The [[entities/affito|affito]] collection document shape (Q2), multi-user access and email allowlist needs (Q3 partially resolved), and the mapping between [[concepts/statemaloi|stateMaloi]] values and [[entities/count|count]] collection labels (Q4) remain pending.
- **[[concepts/soft-delete|Soft delete]]** pattern: Documents are never physically removed; `deleted: true` flag excludes them from reads by default.
- **Dependency risk (R5)**: If the [[concepts/external-aggregation-process|external aggregation process]] stalls, stats and features endpoints serve stale data silently with no current detection mechanism.