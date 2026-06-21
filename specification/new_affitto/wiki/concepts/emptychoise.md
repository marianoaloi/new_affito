---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "empty choice count"
  - "emptyChoise field"
  - "emptyChoise"
---


# emptyChoise

## Definition

`emptyChoise` is an integer field within the **count** collection schema that tracks the number of rental property listings that have not yet received any `stateMaloi` decision. Specifically, it represents listings where no classification action has been taken — neither accepted, denied, nor marked as "wait." The field name uses the spelling "choise" (rather than the standard English "choice"), which appears to be a deliberate convention maintained throughout the codebase.

## Key Characteristics

- **Data type:** Integer (`"type": "integer"` in the JSON Schema definition)
- **Required field:** Listed among the mandatory fields in the count aggregation document, alongside `accept`, `deny`, `wait`, `disable`, `elevator`, `emptydisable`, `emptyElevator`, `nodisable`, `noElevator`, and `total`
- **Aggregation metric:** Serves as a counter within the data aggregation pipeline, summarizing the review status of listings at a glance
- **Non-standard spelling:** The field is spelled `emptyChoise` (with "choise" instead of "choice"), a deliberate naming convention preserved consistently in the schema and codebase
- **Complementary to decision counters:** While `accept`, `deny`, and `wait` count listings that have received a specific decision, `emptyChoise` counts those with no decision at all, ensuring all listings are accounted for in the total

## Applications

- **Review queue prioritization:** Enables evaluators to quickly identify how many listings remain unreviewed and require attention, facilitating workload management
- **Dashboard metrics:** Provides a key indicator on aggregation dashboards showing the proportion of listings still pending initial classification
- **Completeness tracking:** When compared against the `total` field, `emptyChoise` reveals how much of the listing pipeline has been processed versus what remains untouched
- **Bulk operations planning:** Helps determine the scope of pending work before executing [[concepts/bulk-state-update|bulk-state]] operations via [[concepts/bulkstatemaloi|BulkStateMaloi]]

## Related Concepts

- [[concepts/acceptdenywait|accept/deny/wait counters]] — The complementary decision state counters that track listings which have received a classification
- [[concepts/data-aggregation|Data aggregation pipeline]] — The aggregation mechanism that computes the count document including `emptyChoise`
- [[concepts/json-schema|JSON Schema 2020-12]] — The schema standard used to define the count collection structure
- [[concepts/split-collection-architecture|Split-collection pattern]] — The architectural pattern separating read and write collections, within which count documents reside
- [[concepts/evaluator|Authenticated reviewer]] — The primary user persona who reviews listings and transitions them from the "empty choice" state

## Related Entities

- [[entities/count|count]] — The collection/document where `emptyChoise` is stored as a required field

## Mentions in Source

- "\"required\": [ \"_id\", \"accept\", \"deny\", \"disable\", \"elevator\", \"emptyChoise\", \"emptydisable\", \"emptyElevator\", \"nodisable\", \"noElevator\", \"total\", \"wait\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"emptyChoise\": { \"type\": \"integer\" }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]