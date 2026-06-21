---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affitto-backend_86705a]]"]
tags: [term]
aliases:
  - "bankGuarantee field"
  - "garanzia bancaria"
  - "bank guarantee property"
---


# bankGuarantee

## Definition
`bankGuarantee` is a field within the [[concepts/costs|costs]] object of the affitto_data properties schema. It represents bank guarantee information associated with a rental listing. The field is typed as `null` in the JSON Schema, indicating that bank guarantee data is typically not available or not applicable for the scraped rental listings. In Italian rental markets, a bank guarantee (*garanzia bancaria*) is a financial instrument that can sometimes replace or supplement a traditional security deposit, providing landlords with an additional layer of financial assurance.

## Key Characteristics
- **Null-typed field**: Defined with `"type": "null"` in the JSON Schema, meaning the field is expected to carry no meaningful value in the vast majority of cases
- **Part of the costs object**: Nested within the [[concepts/costs|costs]] sub-object alongside other cost-related fields such as `agencyCommission`, `appliedVat`, and `commissionSubject`
- **Rarely populated**: Although the schema accommodates the field, the scraped data from source real estate platforms seldom includes bank guarantee information
- **Italian rental market concept**: Reflects the practice of *garanzia bancaria* in the Italian rental ecosystem, where banks can issue guarantees on behalf of tenants
- **Schema-preserving design**: Its inclusion in the schema indicates a deliberate decision to track this data point even when the source platform rarely provides it, ensuring forward compatibility if the data becomes more widely available

## Applications
- **Rental cost analysis**: When populated, the field can be used to assess the total financial obligations a tenant faces beyond standard rent and deposit
- **Market comparison**: Enables comparison between listings that require bank guarantees versus those that rely solely on traditional security deposits
- **Data completeness tracking**: The predominantly null values can serve as a metric for data quality and completeness in the [[concepts/web-scraping-pipeline|web scraping pipeline]]
- **Schema documentation**: Serves as a reference point for developers integrating with the affitto_data API, signaling that bank guarantee information may become available in future data enrichments

## Related Concepts
- [[concepts/costs|costs]] — Parent object that contains the bankGuarantee field
- [[concepts/price|price]] — Related financial data object for rental listings
- [[concepts/rent|rent]] — Rental terms object that complements cost information
- [[concepts/properties|properties]] — Top-level properties object within which costs is nested
- [[concepts/json-schema|JSON Schema]] — The schema standard used to define the bankGuarantee field type
- [[concepts/web-scraping|Web scraping]] — The data collection method through which rental listings are obtained

## Related Entities
- [[entities/affitto-data|affitto_data]] — The overarching data schema that includes the bankGuarantee field within its costs structure

## Mentions in Source
- "\"bankGuarantee\": { \"type\": \"null\" }" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]
- "\"costs\": { \"type\": \"object\", \"required\": [ \"agencyCommission\", \"appliedVat\", \"commissionSubject\" ]" — [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]