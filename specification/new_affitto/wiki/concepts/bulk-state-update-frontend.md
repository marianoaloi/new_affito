---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [method]
aliases:
  - "Bulk State Update"
  - "bulk-state action"
  - "FR-18 Bulk State"
---


# Bulk State Update (Frontend)

## Definition

Bulk State Update is a decision action feature on the [[concepts/tabella-page|Tabella Page]] that enables users to select multiple listing rows via checkboxes and a "select page" control, then apply one of three stateMaloi states to all selected listings simultaneously. When triggered, an action bar appears presenting the three available state options. A confirmation step displays the number of affected rows before execution. The feature calls `POST /listings/bulk-state` on the backend, respecting the backend's maximum batch size of 500 items per request. This feature was scoped for v1 as resolved in Decision Q2, with an open question (Q2) regarding whether the selection scope should be limited to the current page or extended to all results matching the current filter.

## Key Characteristics

- **Multi-row selection**: Users select rows using individual checkboxes or a "select page" control that toggles all visible rows on the current page
- **Action bar UI**: Upon selection, a contextual action bar appears presenting exactly three stateMaloi state options
- **Confirmation step**: Before executing the bulk update, a confirmation dialog displays the total number of affected rows to prevent accidental changes
- **Backend API integration**: Calls `POST /listings/bulk-state` endpoint on the backend
- **Batch size limit**: Respects the backend's maximum batch size of 500 listings per request
- **v1 scope**: Feature was confirmed for inclusion in v1 per Decision Q2
- **Open question (Q2)**: Whether selection scope should be limited to the current page only or extended to all results matching the active filter criteria remains unresolved

## Applications

- **Operational efficiency**: Allows property managers to update the state of many rental listings at once rather than modifying each listing individually
- **Workflow acceleration**: Particularly useful when a batch of listings needs to transition to the same stateMaloi state (e.g., marking multiple listings as inactive after lease signing)
- **Tabella Page workflow**: Integrated directly into the data table interface, enabling bulk operations without navigating away from the listing overview
- **State consistency**: Ensures that when the [[concepts/session-overlay|Session Overlay]] pattern is in use, the bulk update results are immediately reflected in the UI via read-after-write consistency

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — the page where bulk state update is surfaced
- [[concepts/session-overlay|Session Overlay]] — read-after-write overlay pattern ensuring updated states reflect immediately after bulk action
- [[concepts/tabella-colonne|Tabella Colonne]] — table column definitions that include the stateMaloi badge column
- [[concepts/redux-state|Redux State]] — client-side state management that tracks selection and action bar visibility
- [[concepts/business-rules|Business Rules]] — backend validation rules governing allowed state transitions

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the product release in which this feature is scoped

## Mentions in Source

- **FR-18** — **Bulk state:** row checkboxes + "select page" control; action bar appears with the three state options, calling `POST /listings/bulk-state` (respect backend max batch 500). Confirmation step shows the number of affected rows. — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]