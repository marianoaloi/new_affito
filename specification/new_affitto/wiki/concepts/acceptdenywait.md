---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "decision states aggregation"
  - "accept/deny/wait counters"
  - "stati decisione aggregati"
  - "accept/deny/wait classification"
---

## Description

Accept, deny, and wait form the decision-making framework implemented through the [[concepts/statemaloi|stateMaloi]] field and reflected in the [[entities/count|count]] collection's aggregated statistics. Properties are classified as accept (stateMaloi=1, meaning good), deny (stateMaloi=0, meaning not good), or wait (stateMaloi=2, meaning so-so/undecided). The [[entities/count|count]] collection tracks these classifications with dedicated integer fields: accept, deny, wait, and [[concepts/emptychoise|emptyChoise]] (for unclassified items). This triage system enables the [[concepts/evaluator|evaluator]] to systematically evaluate scraped rental listings and make decisions about which properties to pursue. Together with the companion [[concepts/emptychoise|emptyChoise]] field (which tracks properties that have not yet been evaluated) and the `total` field (which provides the overall number of listings per province-type combination), these counters provide a complete summary view of the current evaluation state of the database, broken down by province and property type. The counters are maintained as part of the [[concepts/split-collection-architecture|split-collection pattern]], serving as a read-optimized view consistent with the system's architecture.

## Key Characteristics

- **Integer type fields**: All three counters (accept, deny, wait) plus [[concepts/emptychoise|emptyChoise]] and `total` are defined as `integer` in the count collection [[concepts/json-schema|JSON Schema]]
- **Direct mapping to stateMaloi values**: Each counter aggregates the count of properties matching a specific [[concepts/statemaloi|stateMaloi]] enum value (1, 0, and 2 respectively)
- **Province and type segmentation**: The counters are maintained per province and per property type within the count collection, enabling geographic and categorical breakdowns
- **Summary/dashboard purpose**: These fields exist to provide a quick assessment of evaluation progress without requiring a full scan of the main property collection
- **Complementary emptyChoise field**: The [[concepts/emptychoise|emptyChoise]] counter tracks unevaluated properties, ensuring that the sum of all four counters accounts for the total number of properties in a given segment
- **Total field**: The `total` field provides the overall number of listings per province-type combination, serving as the denominator for evaluation progress calculations
- **Part of the split-collection architecture**: The count collection with these aggregated counters is a read-optimized view, consistent with the system's [[concepts/split-collection-architecture|split-collection pattern]]

## Applications

- **Dashboard reporting**: Enables the [[concepts/react-and-redux-frontend|React/Redux frontend]] to display summary statistics of how many properties have been accepted, denied, or are waiting for further review, grouped by province
- **Evaluation progress tracking**: Allows the [[concepts/evaluator|evaluator]] to quickly assess how many properties in a given province or type remain unevaluated (via [[concepts/emptychoise|emptyChoise]]) versus already categorized
- **Data aggregation pipeline output**: These counters are the output of the [[concepts/data-aggregation|data aggregation pipeline]] or the [[concepts/external-aggregation-process|external aggregation process]] that refreshes the count collection
- **Bulk operation impact assessment**: After a [[concepts/bulkstatemaloi|BulkStateMaloi]] operation, these counters reflect the updated distribution of property evaluations
- **Province-level filtering**: Combined with [[concepts/province-filter|province filter]] functionality, these counters support scoped views of evaluation status across different geographic areas
- **Systematic listing triage**: Supports a workflow where scraped rental listings from [[concepts/web-scraping|web scraping]] are systematically triaged into accept, deny, or wait categories

## Related Concepts

- [[concepts/statemaloi|stateMaloi]] — the evaluation enum whose values (0, 1, 2) map directly to deny, accept, and wait
- [[concepts/emptychoise|emptyChoise]] — companion counter tracking unevaluated properties
- [[concepts/data-aggregation|data aggregation]] — the pipeline mechanism that computes these summary counters
- [[concepts/split-collection-architecture|split-collection pattern]] — the architectural pattern that separates the count collection from the main data collection
- [[concepts/external-aggregation-process|external aggregation process]] — the process that refreshes the count collection containing these counters
- [[concepts/bulkstatemaloi|BulkStateMaloi]] — operation that modifies stateMaloi values in bulk, directly affecting these counters
- [[concepts/province-filter|province filter]] — geographic filtering that segments these counters by province
- [[concepts/eventual-consistency|eventual consistency]] — the consistency model governing how these aggregated counters sync with the source data
- [[concepts/json-schema|JSON Schema]] — the schema standard used to define these counter fields
- [[concepts/web-scraping|web scraping]] — the data acquisition process that produces the listings these counters summarize

## Related Entities

- [[entities/count|count]] — the collection/schema where these aggregated counter fields are defined
- [[entities/affitto_data|affitto_data]] — the main data collection containing the individual property records that these counters aggregate

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - `"accept": { "type": "integer" }`
> - `"deny": { "type": "integer" }`
> - `"wait": { "type": "integer" }`
> - `"emptyChoise": { "type": "integer" }`

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|prd_affitti_backend_v0-3_1d90fc]]**
> - "stateMaloi: salva il stato que ho deciso 0 (non buono) 1 (buono) 2 (cosi cosi)"
> - `"accept": { "type": "integer" }, "deny": { "type": "integer" }`
> - `"emptyChoise": { "type": "integer" }`
> - `"total": { "type": "integer" }, "wait": { "type": "integer" }`