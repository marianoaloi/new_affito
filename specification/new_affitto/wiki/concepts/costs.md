---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "costs object"
  - "rental costs"
  - "costs sub-object"
---

## Description

The costs object is a sub-field within [[concepts/properties|properties]] that captures the financial details beyond the base rent price. It includes seven constituent fields: `agencyCommission`, `appliedVat`, `bankGuarantee`, `commissionSubject`, `condominiumExpenses`, `heatingExpenses`, and `notaryCommission`. Three of these fields — `agencyCommission`, `appliedVat`, and `commissionSubject` — are required when the object is present, though they are typed as `null`, suggesting they are typically not populated for rental listings. The `condominiumExpenses` and `heatingExpenses` fields are stored as strings, likely containing formatted currency values rather than raw numeric types. This data is critical for calculating total monthly costs of renting a property, supporting both prospective tenant decision-making and analytical capabilities such as [[concepts/feature-analysis|Feature analysis view]].

## Key Characteristics

- **Nested structure**: Lives as a sub-object within the [[concepts/properties|properties]] field of an [[entities/affitto_data|affitto_data]] document, alongside other sub-objects like [[concepts/location|location]] and [[concepts/realestatepage|realEstatePage]]
- **Required fields**: Three fields are required when the object is present — `agencyCommission`, `appliedVat`, and `commissionSubject`
- **Null-typed required fields**: The required fields (`agencyCommission`, `appliedVat`, `commissionSubject`) are typed as `null`, suggesting they are typically not populated for rental listings
- **Optional fields with null support**: Many fields accept `null` values, reflecting that not all rental listings have complete cost information available
- **String-typed expense fields**: `condominiumExpenses` and `heatingExpenses` are stored as strings, likely containing formatted currency values rather than numeric types
- **Comprehensive financial coverage**: Encompasses agency commissions, VAT, bank guarantees, condominium expenses, heating expenses, and notary commissions
- **Seven constituent fields**: `agencyCommission`, `appliedVat`, `bankGuarantee`, `commissionSubject`, `condominiumExpenses`, `heatingExpenses`, and `notaryCommission`

## Applications

- **Total cost estimation**: Allows prospective tenants to calculate the full financial obligation of a rental beyond the advertised rent price
- **Listing comparison**: Enables side-by-side comparison of rental properties by factoring in all associated costs (condominium fees, heating, commissions)
- **Data aggregation and analysis**: Supports analytical views such as [[concepts/feature-analysis|Feature analysis view]] by providing structured cost data across listings
- **Transparency in rental transactions**: Captures commission details (agency, notary) and tax information (VAT) to provide a clear breakdown of who pays what

## Related Concepts

- [[concepts/properties|properties]] — the parent object within which costs is a sub-field
- [[concepts/realestatepage|realEstatePage]] — sibling sub-object within the same `properties` structure
- [[concepts/location|location]] — sibling sub-object capturing geographic details of the listing
- [[concepts/energy|energy]] — sibling sub-object capturing energy certification data
- [[concepts/featurelist|featureList]] — sibling sub-object capturing property features
- [[concepts/primaryfeatures|primaryFeatures]] — sibling sub-object capturing primary property attributes
- [[concepts/data-normalization|Data normalization]] — normalization rules that may apply to cost field values

## Related Entities

- [[entities/affitto_data|affitto_data]] — the parent document collection containing the costs object
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that serves and processes cost data
- [[entities/udine|udine]] — the MongoDB database where affitto_data documents (including costs) are stored

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|prd-new-affitto-backend_86705a]]**
> - "\"costs\": { \"type\": \"object\", \"required\": [ \"agencyCommission\", \"appliedVat\", \"commissionSubject\" ]"
> - "\"condominiumExpenses\": { \"type\": \"string\" }, \"heatingExpenses\": { \"type\": \"string\" }"
> - "\"costs\": { \"type\": \"object\", \"required\": [ \"agencyCommission\", \"appliedVat\", \"commissionSubject\" ]"