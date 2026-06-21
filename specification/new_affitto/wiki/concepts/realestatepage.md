---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affitto-backend_86705a]]"
tags:
  - "term"
aliases:
  - "realEstatePage object"
  - "real estate page"
  - "realEstatePage"
---

## Definition

The `realEstatePage` is a required top-level object within each [[entities/affitto_data|affitto_data]] document that captures the core listing metadata scraped from a real estate website. It encapsulates the contract type, listing title, creation and update timestamps, and a nested price structure that preserves the full pricing history — including any price reductions — for a given property listing.

## Key Characteristics

- **Required top-level field**: One of the mandatory root-level keys in the [[entities/affitto_data|affitto_data]] document schema, alongside `_id`, `feature`, `properties`, and `type`
- **Required sub-fields**: Must contain `contractValue`, `createdAt`, `price`, `title`, and `updatedAt`
- **Contract metadata**: The `contractValue` field (string type) stores the type of contract (e.g., rental, sale) associated with the listing
- **Timestamp tracking**: `createdAt` and `updatedAt` are stored as integer values (likely Unix timestamps or epoch milliseconds), recording when the listing was first created and last modified on the source website
- **Nested price object**: The [[concepts/price|price]] sub-object contains `formattedValue` (human-readable price string), `priceRange`, a numeric `value` (integer), and a `visible` (boolean) flag indicating whether the price is publicly displayed
- **Price reduction tracking**: An optional [[concepts/loweredprice|loweredPrice]] sub-object within `price` captures the original price (`originalPrice`), current price, discount percentage (`discountPercentage`), date of reduction, and the number of days elapsed since the reduction (`passedDays`) — enabling full pricing history analysis
- **Source fidelity**: The structure is designed to preserve the original listing's pricing and contract details as closely as possible to the scraped source data

## Applications

- **Listing ingestion pipeline**: Serves as the canonical representation of listing-level metadata when scraping and storing real estate data into [[entities/affitto_data|affitto_data]]
- **Price trend analysis**: The [[concepts/loweredprice|loweredPrice]] sub-object enables tracking and analyzing price reductions over time, supporting market intelligence features like [[concepts/feature-analysis|Feature analysis view]]
- **Data normalization**: The structured price object (with both formatted and numeric values) supports [[concepts/data-normalization|Data normalization]] workflows, ensuring consistent representation across heterogeneous listing sources
- **Frontend display**: Fields like `title`, `formattedValue`, and `contractValue` feed directly into the [[concepts/react-and-redux-frontend|React/Redux UI]] for listing presentation
- **Filtering and querying**: The numeric `price.value` and `contractValue` fields enable efficient filtering and aggregation queries within [[entities/mongodb-atlas|MongoDB Atlas]]

## Related Concepts

- [[concepts/featurelist|featureList]] — sibling top-level structure within the same document schema, capturing listing features
- [[concepts/primaryfeatures|primaryFeatures]] — related feature extraction concept that works alongside realEstatePage data
- [[concepts/data-normalization|Data normalization]] — the realEstatePage structure supports normalization of scraped listing data
- [[concepts/mlastupdate|mLastUpdate]] — related timestamp tracking concept at the document level
- [[concepts/slim-dto|Slim DTO]] — the realEstatePage fields may be selectively projected when constructing data transfer objects
- [[concepts/price|price]] — the nested price sub-object contained within realEstatePage
- [[concepts/loweredprice|loweredPrice]] — optional price reduction tracking sub-object within the price structure
- [[concepts/contractvalue|contractValue]] — the contract type field stored within realEstatePage
- [[concepts/statemaloi|stateMaloi]] — related enumeration concept used alongside listing metadata

## Related Entities

- [[entities/affitto_data|affitto_data]] — the parent collection/document that contains realEstatePage as a required top-level object
- [[entities/mongodb-atlas|MongoDB Atlas]] — the database platform where affitto_data documents (and their realEstatePage objects) are stored
- [[entities/affitti-backend|Affitti Backend API]] — the API layer that reads and processes realEstatePage data

## Mentions in Source

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "\"realEstatePage\": { \"type\": \"object\", \"required\": [ \"contractValue\", \"createdAt\", \"price\", \"title\", \"updatedAt\" ]"
> - "\"required\": [ \"_id\", \"feature\", \"properties\", \"realEstatePage\", \"type\" ]"