---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "heatingExpenses field"
  - "spese riscaldamento"
  - "heating expenses"
---


# heatingExpenses

## Definition

`heatingExpenses` is a string field within the [[concepts/costs|costs]] object of the affitto_data collection schema. It represents the heating cost information associated with a rental property. Stored as a string rather than a numeric type, it may contain both the monetary amount and any qualifying descriptive text (e.g., "€80/mese incluse" or "escluse"). Together with [[concepts/condominiumexpenses|condominiumExpenses]], it forms the key ongoing cost information beyond base rent that tenants require for comprehensive financial evaluation of a rental listing.

## Key Characteristics

- **Data type**: Defined as a `string` in the JSON Schema, allowing flexible representation of both numeric values and descriptive qualifiers
- **Location in schema**: Nested within the [[concepts/costs|costs]] object, which itself is a sub-object of the main affitto_data document
- **Not required**: Unlike fields such as `agencyCommission`, `appliedVat`, and `commissionSubject`, `heatingExpenses` is not listed among the required fields of the [[concepts/costs|costs]] object
- **Complementary to condominiumExpenses**: Together with [[concepts/condominiumexpenses|condominiumExpenses]], it provides a complete picture of recurring costs beyond the base [[concepts/rent|rent]]
- **String-based flexibility**: The string type accommodates varied formats from different data sources, including cases where heating may be included in other costs, separately metered, or conditionally applicable

## Applications

- **Rental property evaluation**: Enables tenants to assess the full recurring financial commitment of a property beyond the advertised rent
- **Cost comparison**: Allows side-by-side comparison of total occupancy costs across different rental listings on pages such as [[concepts/tabella-page|Table Page]] and [[concepts/analisi-page|Analysis Page]]
- **Data ingestion from heterogeneous sources**: The string type supports the [[concepts/web-scraping-pipeline|web scraping pipeline]] by accepting varied formats from different property listing platforms without requiring normalization at ingestion time
- **Comprehensive listing display**: Contributes to the complete financial profile shown to users alongside [[concepts/price|price]], [[concepts/costs|costs]], and [[concepts/condominiumexpenses|condominiumExpenses]] data

## Related Concepts

- [[concepts/costs|costs]] — Parent object containing heatingExpenses
- [[concepts/condominiumexpenses|condominiumExpenses]] — Sibling field representing condominium fees, together forming key recurring cost data
- [[concepts/rent|rent]] — The base rental terms that heatingExpenses supplements
- [[concepts/price|price]] — Overall price object for the property listing
- [[concepts/json-schema|JSON Schema]] — The schema standard used to define the heatingExpenses field structure
- [[concepts/properties|properties]] — The broader properties object within which costs are structured

## Related Entities

- [[entities/affitto-data|affitto_data]] — The MongoDB collection whose schema contains the heatingExpenses field

## Mentions in Source

- `"heatingExpenses": { "type": "string" }` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- `"costs": { "type": "object", "required": [ "agencyCommission", "appliedVat", "commissionSubject" ]` — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]