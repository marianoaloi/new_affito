---
type: source
created: 2026-06-21
updated: 2026-06-21
source_file: "[[old/function.md]]"
tags: [Contattore, count-collection-view, Analisi, Prende-Affitti, powerproperties, Formati-Dati, deleted, type, stateMaloi, realEstate, affito-collection-query, province]
aliases: ["Affitti Feature Specs", "function.md"]
---

# Features - Affitti Data Display and API Specifications - Summary

## Source
- Original file: [[old/function.md]]
- Ingested: 2026-06-21

## Core Content

This technical specification document describes the three main features of the Affitti (rental) application. The [[concepts/prende-affitti|Prende Affitti]] feature handles retrieval of rental listings. The [[concepts/contattore|Contattore]] feature presents aggregated totals from the [[concepts/count-collection-view|count collection view]], displaying statistics grouped by [[concepts/province|province]] and [[concepts/type|type]] — including totals, disability accessibility, elevator availability, and review statuses (deny/wait/accept). The [[concepts/analisi|Analisi]] feature uses the [[concepts/affito-collection-query|affito collection query]], a MongoDB aggregation pipeline, to retrieve data from the `affito` collection and pass it via API to the frontend. This pipeline filters out soft-deleted documents (using the [[concepts/deleted|deleted]] field), requires [[concepts/type|type]] and province fields to exist, and projects a restructured output containing [[concepts/statemaloi|stateMaloi]], type, and a [[concepts/realestate|realEstate]] object where [[concepts/powerproperties|powerproperties]] is remapped to `properties`. The document also references a [[concepts/formati-dati|Formati Dati]] section for data format definitions.

## Key Entities
- [[entities/trieste|Trieste]] — Italian province with 209 type 'a' listings and a high denial rate (131 denied, 29 accepted)
- [[entities/padova|Padova]] — Italian province with 367 type 'a' listings, none yet reviewed (all statuses at 0)

## Key Concepts
- [[concepts/contattore|Contattore]] — Dashboard feature displaying aggregated rental statistics
- [[concepts/count-collection-view|Count Collection View]] — MongoDB view storing pre-aggregated stats by province and type
- [[concepts/analisi|Analisi]] — Analysis feature using MongoDB aggregation pipeline for API data delivery
- [[concepts/affito-collection-query|Affito Collection Query]] — Two-stage aggregation pipeline ($match + $project)
- [[concepts/powerproperties|Powerproperties]] — Source field remapped to `realEstate.properties` for API normalization
- [[concepts/statemaloi|stateMaloi]] — Review state field tracking listing evaluation status
- [[concepts/province|Province]] — Key grouping dimension for geographic segmentation of rental data

## Main Points
- The application has **three main features**: [[concepts/prende-affitti|Prende Affitti]] (data retrieval), [[concepts/contattore|Contattore]] (aggregated counts), and [[concepts/analisi|Analisi]] (data analysis via API)
- The [[concepts/count-collection-view|count collection view]] aggregates rental data by province and type, tracking totals, disability accessibility, elevator availability, and review statuses (deny/wait/accept)
- The [[concepts/analisi|Analisi]] pipeline filters out soft-deleted documents using the [[concepts/deleted|deleted]] field and requires both [[concepts/type|type]] and `powerproperties.location.province` to exist
- **Data normalization** occurs in the $project stage: [[concepts/powerproperties|powerproperties]] is remapped to `realEstate.properties`, creating a clean API response structure
- Sample data covers provinces including [[entities/trieste|Trieste]] and [[entities/padova|Padova]] with types 'a' and 'c', showing varying review completion levels
- [[entities/padova|Padova]]'s data (367 listings, all with `emptyChoise` status, 0 reviews) suggests a batch of unprocessed listings