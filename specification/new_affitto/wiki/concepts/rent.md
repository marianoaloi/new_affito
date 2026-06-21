---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "term"
aliases:
  - "rent object"
  - "rental terms"
  - "rent sub-object"
---

## Aliases

- affitto

## Key Characteristics

- **Structured as a JSON object** with four required fields: `availableToStudents`, `deposit`, `priceReferenceIndex`, and `redemptionRent`
- **`availableToStudents`** is a boolean field indicating whether the rental property is eligible for student tenants
- **`deposit`** is a nullable string field representing the deposit amount or terms required for the rental agreement
- **`priceReferenceIndex`** is a nullable field intended to reference a price index standard for rent valuation (currently typed as `null`)
- **`redemptionRent`** is a nullable boolean field indicating whether a rent-to-own (riscatto) option exists for the property
- **Tenant-facing focus**: unlike the [[concepts/costs|costs]] object which tracks financial overhead (commissions, expenses), rent captures parameters directly relevant to the prospective tenant's decision-making
- **Part of the properties hierarchy** within the broader [[entities/affitto_data|affitto_data]] collection schema
- **Tabular display column**: Appears as the fifth column in the [[concepts/tabella-page|Tabella Page]] table, between [[concepts/surfacevalue|surfaceValue]] and contractValue, as part of the [[concepts/tabella-colonne|Tabella Colonne]] structure
- **Critical rental data point**: Represents the rental price or monthly rent associated with real estate listings, serving as a key metric for comparing properties in the [[entities/affitiudine|Affito]] application

## Applications

- **Rental listing evaluation**: Provides structured data for prospective tenants to assess key rental terms such as deposit requirements and student eligibility
- **Search and filtering**: The `availableToStudents` boolean enables filtered searches targeting student housing
- **Rent-to-own identification**: The `redemptionRent` field allows platforms to flag listings that offer a path to ownership
- **Data normalization**: As part of the [[entities/affitto_data|affitto_data]] schema, the rent object ensures consistent representation of rental terms across listings aggregated from multiple sources via [[concepts/web-scraping|web scraping]]
- **Frontend display**: The [[concepts/react-and-redux-frontend|React/Redux frontend]] can consume the rent object to render tenant-relevant contract details in listing views
- **Tabular data presentation**: On the [[concepts/tabella-page|Tabella Page]], rent is displayed as a dedicated column alongside [[concepts/price|price]], [[concepts/energy_class|energy_class]], [[concepts/surfacevalue|surfaceValue]], and contractValue, enabling quick comparison of rental prices across listings
- **Rental price comparison**: As a column in the tabulated data view, rent enables users to quickly scan and compare monthly rental costs across multiple property listings retrieved from the backend

## Related Concepts

- [[concepts/costs|costs]] — Sibling sub-object within the properties section covering commissions and expenses
- [[concepts/energy|energy]] — Another sub-object in the properties section capturing energy certification data
- [[concepts/location|location]] — Sub-object capturing property location details
- [[concepts/featurelist|featureList]] — Sub-object listing property features
- [[concepts/primaryfeatures|primaryFeatures]] — Sub-object for primary property characteristics
- [[concepts/multimedia|multimedia]] — Sub-object for listing media assets
- [[concepts/data-normalization|data-normalization]] — Normalization rules applied to schema fields including rent data
- [[concepts/properties|properties]] — Parent properties object containing the rent sub-object
- [[concepts/price|price]] — Related sub-object capturing property price information; also an adjacent table column in the Tabella Page
- [[concepts/json-schema|JSON Schema]] — Schema standard used to define the rent object structure
- [[concepts/tabella-colonne|Tabella Colonne]] — Table column definitions including rent as a displayed column
- [[concepts/tabella-page|Tabella Page]] — Frontend page where rent is displayed as a tabular column
- [[concepts/surfacevalue|surfaceValue]] — Adjacent table column preceding rent in the Tabella Page layout
- [[concepts/energy_class|energy_class]] — Table column displayed alongside rent in the Tabella Page
- contractValue — Adjacent table column following rent in the Tabella Page layout

## Related Entities

- [[entities/affitto_data|affitto_data]] — Parent collection containing the rent object within its properties schema
- [[entities/affitti-backend|Affitti Backend API]] — Backend service that exposes and processes rent data
- [[entities/udine|udine]] — MongoDB database hosting the affitto_data collection
- [[entities/affitiudine|affitiudine]] — Application context for rental data in the Udine area

## Mentions in Source

> **Source: PRD New Affitto (backend)**
> - `"rent": { "type": "object", "required": [ "availableToStudents", "deposit", "priceReferenceIndex", "redemptionRent" ],`
> - `"availableToStudents": { "type": "boolean" }, "deposit": { "type": [ "null", "string" ] }, "priceReferenceIndex": { "type": "null" }, "redemptionRent": { "type": [ "null", "boolean" ] }`

> **Source: PRD Affito Frontend Table**
> - "Con il dato recuperato deve presentare il dato tabulato con le colune :"
> - "| Title | Price | energy_class | surfaceValue | rent | contractValue |"