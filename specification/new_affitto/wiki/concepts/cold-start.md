---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_backend_v0-3_1d90fc]]"]
tags: [phenomenon]
aliases:
  - "Cold start problem"
  - "Function cold start"
  - "Cold boot"
---


# Cold Start

## Definition

A cold start is a performance phenomenon that occurs in serverless computing environments (such as [[entities/firebase-cloud-functions|Cloud Functions]]) when a function instance must be initialized from scratch to handle an incoming request. This initialization process — which includes provisioning a container, loading the runtime, and executing module-level code — adds significant latency to the first request served by that instance. Subsequent requests handled by the same warm instance do not incur this overhead.

In the context of the [[entities/affitti-backend|Affitti Backend API]], cold start is identified as risk **R4** in the PRD. The project's performance targets (P95 < 800ms for listing endpoints) explicitly exclude cold start latency, acknowledging that initial requests may exceed acceptable thresholds.

## Key Characteristics

- **First-request latency spike**: Only the initial invocation on a new or idle function instance is affected; subsequent requests to a warm instance respond at normal speed
- **Caused by instance provisioning**: The serverless platform must allocate compute resources, load the runtime environment, and execute initialization code (e.g., establishing database connections)
- **Unpredictable occurrence**: Cold starts can happen after periods of inactivity, during traffic spikes that require scaling out, or after deployments
- **Mitigatable but not fully eliminable**: Strategies such as configuring minimum instances (pre-warmed containers) and reusing clients (e.g., MongoDB connection pooling) reduce frequency and severity
- **Runtime and dependency dependent**: Heavier runtimes and larger dependency trees generally result in longer cold start durations

## Applications

- **Minimum instances configuration**: Pre-warming a set number of function instances so that at least some requests always hit a warm container, avoiding cold start latency for typical traffic levels
- **Client reuse across invocations**: Initializing expensive resources like the MongoDB client at the module level so they persist across multiple invocations within the same instance, reducing both cold start duration and per-request overhead
- **Performance benchmarking exclusions**: When defining SLA or performance targets for serverless APIs, cold start latency is often excluded from percentile measurements (e.g., P95 targets) to provide a realistic view of steady-state performance
- **Architecture risk assessment**: Cold starts are formally catalogued as a risk item in system design documents to ensure awareness and contingency planning

## Related Concepts

- [[concepts/eventual-consistency|Eventual Consistency]] — another latency-related phenomenon relevant to the same backend architecture
- [[concepts/rate-limiting|Rate Limiting]] — a complementary performance and reliability mechanism in the same system

## Related Entities

- [[entities/firebase-cloud-functions|Cloud Functions]] — the serverless platform where cold starts manifest
- [[entities/affitti-backend|Affitti Backend API]] — the project in which cold start is identified as risk R4
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database service whose client reuse strategy helps mitigate cold start impact

## Mentions in Source

- "**R4** — Cold starts on Cloud Functions may hurt perceived performance for the first request; consider min instances if it becomes an issue." — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]
- "P95 < 800 ms for FR-1/FR-2 (cold starts excluded). Indexes on `type`, `province`, `stateMaloi`, `deleted`, `mLastUpdate`. Reuse MongoDB client across function invocations." — [[sources/prd_affitti_backend_v0-3_1d90fc|PRD_Affitti_Backend_v0.3]]