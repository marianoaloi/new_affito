---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "loweredPrice object"
  - "price reduction tracking"
  - "prezzo ribassato"
---

## Description

LoweredPrice is an optional nested object within the [[concepts/realestatepage|realEstatePage]].[[concepts/price|price]] structure that tracks price reductions on rental listings. It contains seven required fields when present: `currentPrice`, `date`, `discountPercentage`, `originalPrice`, `passedDays`, `priceDecreasedBy`, and `typologiesCount`. This data originates from the scraped real estate website via [[concepts/web-scraping|web scraping]] and enables analysis of price trends and identification of listings where landlords have reduced their asking price. The structure provides both absolute and relative reduction metrics, allowing multiple perspectives on the magnitude of any price change. By storing temporal information such as the date of reduction and elapsed days, it supports time-sensitive analysis and freshness assessment. This information can inform decision-making about which properties represent better value for [[concepts/evaluator|evaluators]] reviewing rental opportunities.

## Key Characteristics

- **Optional sub-object**: Exists only when a price reduction has occurred on a listing; not present on all records within the [[concepts/price|price]] object
- **Structured schema with required fields**: When present, it must contain all seven required fields: `currentPrice`, `date`, `discountPercentage`, `originalPrice`, `passedDays`, `priceDecreasedBy`, and `typologiesCount`
- **Mixed data types**: Most fields (`currentPrice`, `date`, `discountPercentage`, `originalPrice`) are stored as strings, while `passedDays` is an integer, indicating some fields carry formatted display values rather than raw numeric data
- **Temporal tracking**: The `date` field records the exact date of the price change, and `passedDays` tracks the elapsed time since the reduction, allowing time-sensitive analysis
- **Absolute and relative reduction metrics**: Captures both the absolute price decrease (`priceDecreasedBy`) and the relative reduction (`discountPercentage`), providing multiple perspectives on the magnitude of the price change
- **Typology awareness**: The `typologiesCount` field suggests the reduction may be associated with or affect multiple property typologies within a single listing
- **Scraped origin**: The data originates from the scraped real estate website, meaning its values reflect the source platform's representation of price changes

## Applications

- **Deal identification**: Enables users (evaluators) to quickly identify rental listings that have undergone price reductions, helping them find favorable deals in the Udine rental market
- **Market trend analysis**: Aggregated loweredPrice data across multiple listings can reveal broader pricing trends, such as seasonal price drops or market softening in specific areas
- **Price drop notifications**: Provides the data foundation for alerting users when listings they are tracking experience price reductions
- **Listing freshness assessment**: The `passedDays` field allows the system to distinguish between recent price drops (potentially indicating urgency or active negotiation) and older reductions
- **Comparative analysis**: By storing both `originalPrice` and `currentPrice`, the system supports side-by-side comparison of original versus reduced pricing across listings via the [[concepts/feature-analysis|Feature analysis view]]
- **Value-based decision-making**: Informs evaluators about which properties represent better value by surfacing landlord price adjustments over time

## Related Concepts

- [[concepts/price|price]] — Parent object that contains loweredPrice as an optional sub-object
- [[concepts/realestatepage|realEstatePage]] — The top-level document structure housing the price and loweredPrice data
- [[concepts/costs|costs]] — Sibling sub-object within the listing structure tracking other cost-related information
- [[concepts/data-normalization|data-normalization]] — Normalization rules that may apply to loweredPrice field values during ingestion
- [[concepts/data-aggregation|data-aggregation]] — Aggregation pipelines that may leverage loweredPrice data for market analytics
- [[concepts/slim-dto|slim-DTO]] — Data transfer objects that may include or exclude loweredPrice depending on the API response scope
- [[concepts/web-scraping|web scraping]] — The mechanism through which loweredPrice data is originally obtained from the source real estate website
- [[concepts/evaluator|evaluator]] — Primary user persona who leverages loweredPrice data to assess rental value
- [[concepts/feature-analysis|Feature analysis view]] — View that supports comparative analysis using loweredPrice data

## Related Entities

- [[entities/affitto_data|affitto_data]] — The MongoDB collection where rental listing documents containing loweredPrice data are stored
- [[entities/udine|udine]] — The MongoDB database hosting the rental data for the Udine market
- [[entities/affitti-backend|Affitti Backend API]] — The API layer that serves loweredPrice data to the frontend

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "\"loweredPrice\": { \"type\": \"object\", \"required\": [ \"currentPrice\", \"date\", \"discountPercentage\", \"originalPrice\", \"passedDays\", \"priceDecreasedBy\", \"typologiesCount\" ],"
> - "\"currentPrice\": { \"type\": \"string\" }, \"date\": { \"type\": \"string\" }, \"discountPercentage\": { \"type\": \"string\" }, \"originalPrice\": { \"type\": \"string\" }, \"passedDays\": { \"type\": \"integer\" }"