---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "Data Formats"
  - "Formati dei Dati"
---


# Formati Dati

## Definition
Formati Dati (Data Formats) is a section header found in the Affitti application's feature specification document. It designates a planned documentation area intended to describe the data structures, schemas, and format specifications used across the application's various collections and API responses. Although the section heading exists in the source document, its content appears to be empty or truncated, suggesting it was either a placeholder for future documentation or was left incomplete during the drafting process.

## Key Characteristics
- **Section header only**: Present as a top-level heading (`# Formati Dati`) in the source document, with no substantive content beneath it
- **Documentation intent**: Designed to serve as a reference for the data format specifications governing the application's data layer
- **Complementary role**: Intended to complement and formalize the sample data structures demonstrated in related sections such as [[concepts/contattore|Contattore]] and [[concepts/analisi|Analisi]]
- **Incomplete or truncated**: The absence of content suggests the section was either planned for future expansion or lost during document editing
- **Italian-language convention**: Follows the Italian naming convention used throughout the Affitti project documentation

## Applications
- **API response documentation**: Would serve as a central reference for the structure and format of data returned by the application's backend API endpoints
- **Collection schema reference**: Intended to document the MongoDB collection schemas, including fields, types, and constraints used across collections like [[entities/count|count]]
- **Developer onboarding**: A completed version would help new developers understand the data contracts between frontend and backend components of the [[entities/affito|Affitto]] system
- **Data validation**: Could be used as a specification baseline for implementing input validation and data integrity checks

## Related Concepts
- [[concepts/contattore|Contattore]] — related feature section containing sample data structures that Formati Dati was likely intended to formalize
- [[concepts/analisi|Analisi]] — analysis feature section with data examples that complement the planned data format documentation
- [[concepts/count-collection-view|count collection view]] — a view/collection whose data format would be documented under this section
- [[concepts/tabella-colonne|Tabella Colonne]] — table column definitions representing another aspect of the application's data structure
- [[concepts/table|Table]] — the main data table whose format specifications relate to this documentation section

## Related Entities
- [[entities/affito|affito]] — the Affitti application system whose data formats this section was intended to document
- [[entities/count|count]] — a data collection whose structure and format would fall under this documentation scope

## Mentions in Source
- "# Formati Dati" *(Data Formats — section header)* — [[sources/function_64f05b|function_64f05b]]