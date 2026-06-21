---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [place]
aliases:
  - "Trieste province"
  - "Provincia di Trieste"
---


# Trieste

## Basic Information
- Type: place
- Source: [[sources/function_64f05b|function_64f05b]]

## Description
Trieste is an Italian province represented in the [[entities/affito|Affitto]] system's [[concepts/count-without-autentication|Count Without Authentication]] collection view data. In the sample dataset, Trieste contains 209 total type 'a' rental listings, with 108 listings having elevators and 86 without, reflecting the system's [[concepts/elevator-accessibility-tracking|elevator accessibility tracking]] metrics. The province shows a notably high denial rate among reviewed listings, with 131 denied, 0 waiting, and only 29 accepted. Trieste is one of multiple Italian provinces tracked within the rental data aggregation system, where data is organized through the [[entities/count|count]] collection structure. The 12 disabled listings in Trieste's data further contribute to the accessibility profiling maintained by the platform.

## Related Entities
- [[entities/affito|Affitto]] — the rental system that tracks Trieste's listing data
- [[entities/count|Count]] — the collection structure aggregating province-level rental statistics

## Related Concepts
- [[concepts/count-without-autentication|Count Without Authentication]] — the unauthenticated count view that includes Trieste's aggregated data
- [[concepts/elevator-accessibility-tracking|Elevator Accessibility Tracking]] — accessibility fields (elevator, noElevator, disable) tracked per province
- [[concepts/emptychoise|emptyChoise]] — related count field in the rental data aggregation
- [[concepts/business-rules|Business Rules]] — the rules governing listing approval and denial workflows

## Mentions in Source
- "\"province\": \"Trieste\", \"type\": \"a\"" — [[sources/function_64f05b|function_64f05b]]
- "\"total\": 209, \"disable\": 12, \"elevator\": 108, \"noElevator\": 86, \"deny\": 131, \"wait\": 0, \"accept\": 29" — [[sources/function_64f05b|function_64f05b]]