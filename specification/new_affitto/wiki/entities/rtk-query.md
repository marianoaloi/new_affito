---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [product]
aliases:
  - "RTK Query"
  - "Redux Toolkit Query"
---


# RTK Query

## Basic Information
- Type: product
- Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|Affitti Frontend PRD v0.2]]

## Description
RTK Query is a data-fetching and caching tool built into [[entities/redux-toolkit|Redux Toolkit]], designed to simplify API interactions in [[concepts/react|React]] applications. In the context of the [[entities/affitti-frontend-v1|Affitti Frontend v1]] web application, RTK Query is proposed as the preferred approach for handling API calls, though it is explicitly marked as an assumption in the PRD, indicating the choice is not yet confirmed. RTK Query would be responsible for managing the listings cache, pagination state, and API request lifecycle for both the authenticated [[concepts/table|table]] endpoint and the public [[concepts/count-without-autentication|unauthenticated count]] endpoint. It integrates tightly with the [[concepts/redux-state|Redux store]] state management layer specified for the application, automatically generating cache entries and request status tracking within [[concepts/redux-state|Redux client state]].

## Related Entities
- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the web application where RTK Query is proposed for use
- [[entities/redux-toolkit|Redux Toolkit]] — the parent library that includes RTK Query

## Related Concepts
- [[concepts/redux-state|Redux State]] — the client-side state management layer that RTK Query integrates with
- [[concepts/redux|Redux]] — the underlying state management framework
- [[concepts/react|React]] — the UI library used in the frontend application
- [[concepts/typescript|TypeScript]] — the language specified for the frontend codebase
- [[concepts/table|Table]] — the main data table view whose data RTK Query would fetch and cache
- [[concepts/count-without-autentication|Count Without Authentication]] — a public endpoint whose data RTK Query would manage

## Mentions in Source
- "Redux (Redux Toolkit + RTK Query for API calls — *assumption*)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "`listings` | query params (page, filters incl. stateMaloi, sort), cached results, request status (RTK Query cache)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]