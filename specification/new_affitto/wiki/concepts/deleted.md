---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/function_64f05b]]"]
tags: [term]
aliases:
  - "soft delete flag"
  - "deleted field"
  - "deleted marker"
---


# Deleted

## Definition
The `deleted` field is a document-level marker used in MongoDB collections — specifically the "affito" collection — to implement **soft delete** logic. When present on a document, it signals that the record has been logically removed without being physically deleted from the database. In the aggregation pipeline, a `$match` stage with `"deleted": { "$exists": false }` filters out all documents bearing this field, ensuring only active (non-deleted) records are returned to the frontend.

## Key Characteristics
- **Soft delete pattern**: Documents are never physically removed from the database; instead, the presence of the `deleted` field marks them as logically deleted
- **Boolean or timestamp marker**: The field can act as a simple boolean flag (`true`) or store a timestamp indicating when the deletion occurred — its mere existence is what triggers exclusion
- **`$exists` filtering**: The MongoDB `$exists: false` operator is used in the `$match` stage to exclude any document where the `deleted` field is present, regardless of its value
- **Non-destructive**: Preserves data integrity and allows potential recovery or auditing of previously deleted records
- **Collection-specific usage**: Applied within the "affito" collection's aggregation pipeline to ensure the API serves only active rental listings to the frontend

## Applications
- **Rental listing management**: In the affito system, soft-deleted rental records are hidden from API responses and the frontend table without losing historical data
- **Data recovery and auditing**: Since records remain in the database, administrators can restore soft-deleted documents or audit deletion history
- **Aggregation pipeline filtering**: Used as the first `$match` stage in MongoDB aggregation pipelines to establish a baseline of active documents before further processing
- **API data integrity**: Ensures that the [[concepts/function|Firebase Cloud Functions]] serving the frontend only return valid, non-deleted documents from the affito collection

## Related Concepts
- [[concepts/$in-operator|MongoDB $in]]
- [[concepts/$set-operator|MongoDB $set]]
- [[concepts/updatemany|MongoDB updateMany]]
- [[concepts/updateone|MongoDB updateOne]]
- [[concepts/business-rules|business rules layer]]
- [[concepts/prende-affitti|Get Rentals]]
- [[concepts/table|rental table]]
- [[concepts/tabella-colonne|Table Columns]]

## Related Entities
- [[entities/affito|affito]]

## Mentions in Source
- `"$match": { "deleted": { "$exists": false } }` — [[sources/function_64f05b]]
- "Deve prendere il dati e passare per API al frontend query e collection 'affito'" *(Must take the data and pass it via API to the frontend — query and collection "affito")* — [[sources/function_64f05b]]