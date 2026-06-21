---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_backend_v0-3_1d90fc]]"]
tags: [method]
aliases:
  - "FR-7 feature analysis view"
  - "Feature analysis view"
  - "FR-7"
---


# Feature Analysis

## Definition

Feature analysis is a functional capability of the [[entities/affitti-backend|Affitti Backend]] (requirement FR-7, goal G4) that provides a normalized view of listing features — specifically `featureList` and `primaryFeatures` — to support side-by-side comparison between rental listings. It is exposed through the `GET /analysis/features` endpoint and draws its data from the read-only [[entities/feature|feature]] collection, which is materialized by an external process.

## Key Characteristics

- **Read-only data source**: The underlying [[entities/feature|feature]] collection is populated by an external materialization process, not by the API itself. This aligns with the [[concepts/split-collection-architecture|split-collection architecture]] pattern used across the system.
- **Normalized feature representation**: Exposes `featureList` and `primaryFeatures` fields in a normalized form, enabling consistent comparison across heterogeneous listing data.
- **Filterable query parameters**: The `GET /analysis/features` endpoint supports filtering by `province`, `type`, and [[concepts/statemaloi|stateMaloi]], allowing the frontend to narrow results to relevant subsets.
- **Eventual consistency**: Because the [[entities/feature|feature]] collection is materialized externally, the data follows an [[concepts/eventual-consistency|eventual consistency]] model — there may be a delay between source data changes and their reflection in the feature analysis view.
- **Comparison-oriented design**: The endpoint is specifically designed to support the [[concepts/evaluator|evaluator]] persona in performing side-by-side feature comparisons of rental listings for evaluation purposes.

## Applications

- **Listing comparison in frontend**: The primary application is enabling the frontend to present side-by-side feature comparisons so that evaluators can assess and compare rental listings efficiently.
- **Filtered market analysis**: By filtering on `province`, `type`, and [[concepts/statemaloi|stateMaloi]], users can perform targeted analysis of listing features within specific geographic areas or listing categories.
- **Decision support**: The normalized feature view supports informed decision-making by surfacing primary features in a consistent, comparable format across diverse listing sources.

## Related Concepts

- [[concepts/eventual-consistency|Eventual Consistency]] — The [[entities/feature|feature]] collection follows this model since it is materialized by an external process.
- [[concepts/split-collection-architecture|Split-collection Architecture]] — Feature analysis relies on a read-only collection, consistent with the read-write collection split pattern.
- [[concepts/statemaloi|stateMaloi]] — One of the filter parameters supported by the feature analysis endpoint.
- [[concepts/data-normalization|Data Normalization]] — The normalized `featureList` / `primaryFeatures` structure relates to broader data normalization practices in the system.
- [[concepts/evaluator|Evaluator]] — The primary user persona who benefits from the feature comparison capability.
- [[concepts/slim-dto|Slim DTO]] — The endpoint likely returns data shaped as DTOs for frontend consumption.

## Related Entities

- [[entities/affitti-backend|Affitti Backend]] — The API layer that exposes the `GET /analysis/features` endpoint.
- [[entities/feature|feature]] — The read-only MongoDB collection that stores materialized feature data consumed by this endpoint.
- [[entities/udine|udine]] — The MongoDB database hosting the feature collection.
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — The runtime environment where the feature analysis endpoint is deployed.

## Mentions in Source

- **G4** — Provide a feature-analysis view (normalized `featureList` / `primaryFeatures`) to support comparison between listings. — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]
- **FR-7** `GET /analysis/features` — returns `feature` documents filtered by `province`, `type`, `stateMaloi`; supports listing comparison in the frontend. — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]