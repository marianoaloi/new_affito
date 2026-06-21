---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "spese condominiali"
  - "condominium fees"
  - "condominiumExpenses field"
---

## Description

`condominiumExpenses` is a string-typed field nested within the [[concepts/costs|costs]] object of the [[entities/affitto_data|affitto_data]] collection, capturing condominium or shared building expenses associated with rental property listings. As part of the financial data scraped from real estate listings via [[concepts/web-scraping|web scraping]] and stored in the MongoDB database, it provides prospective tenants with information about additional recurring costs beyond the base rent. The field is typed as a `string` rather than a numeric value, suggesting it may contain formatted currency values (e.g., "€150/mese") or descriptive text preserved from the original scraped source. Together with `heatingExpenses`, it forms a key component of the costs breakdown, enabling a comprehensive view of a property's total financial obligations. In the Italian rental market, condominium expenses (spese condominiali) are a standard and significant cost factor that influences tenant decision-making. Notably, `condominiumExpenses` is not listed in the `required` array of the costs object — unlike `agencyCommission`, `appliedVat`, and `commissionSubject` — meaning it may be absent from some listings.

## Key Characteristics

- **Nested within the costs object**: `condominiumExpenses` is a sub-field of the [[concepts/costs|costs]] object, which itself is part of the broader rental listing data structure
- **String-typed value**: Despite representing a monetary amount, the field is typed as `string` in the [[concepts/json-schema|JSON Schema]], suggesting it stores pre-formatted currency values or descriptive text from the original scraped source rather than raw numeric data
- **Part of the costs breakdown**: Works alongside `heatingExpenses` and other cost fields to provide a comprehensive breakdown of rental expenses beyond the advertised rent price
- **Optional field**: Unlike `agencyCommission`, `appliedVat`, and `commissionSubject`, `condominiumExpenses` is not listed in the `required` array of the costs object, meaning it may not be present for all listings
- **Italian rental market relevance**: Condominium expenses (spese condominiali) are a standard and significant cost component in the Italian real estate rental market
- **Scraped financial data**: The field is part of the financial data scraped from real estate listings and persisted in the MongoDB database

## Applications

- **Total cost evaluation**: Enables prospective tenants to calculate the true total monthly cost of a rental property by adding condominium fees to the base rent
- **Listing comparison**: Allows users to compare rental properties on a like-for-like basis by factoring in building management costs
- **Cost transparency**: Provides transparency in rental listings by explicitly separating condominium management fees from the base rental price
- **Data aggregation and analysis**: Supports analytical views such as [[concepts/feature-analysis|feature analysis]] by contributing to the cost profile of rental listings

## Related Concepts

- [[concepts/costs|costs]] — Parent object containing condominiumExpenses
- [[concepts/price|price]] — The overall property price object
- [[concepts/rent|rent]] — Rental terms sub-object that works alongside costs
- [[concepts/json-schema|JSON Schema]] — The schema standard used to define the field structure
- [[concepts/properties|properties]] — The broader properties object containing listing data
- [[concepts/web-scraping|web scraping]] — The mechanism used to acquire the financial data stored in this field
- [[concepts/feature-analysis|feature analysis]] — Analytical view that leverages cost profile data

## Related Entities

- [[entities/affitto_data|affitto_data]] — The collection schema where this field resides

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - `"condominiumExpenses": { "type": "string" }, "heatingExpenses": { "type": "string" }`
> - `"costs": { "type": "object", "required": [ "agencyCommission", "appliedVat", "commissionSubject" ]`
> - `"condominiumExpenses": { "type": "string" }`
> - `"costs": { "type": "object", "required": [ "agencyCommission", "appliedVat", "commissionSubject" ], "properties": { "agencyCommission": { "type": "null" }, "appliedVat": { "type": "null" }, "bankGuarantee": { "type": "null" }, "commissionSubject": { "type": "null" }, "condominiumExpenses": { "type": "string" }, "heatingExpenses": { "type": "string" }`