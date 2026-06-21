---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [term]
aliases:
  - "Description Editor"
  - "FR-19 Edit Description"
  - "Edit Description Modal"
---


# Description Editor

## Definition

The Description Editor is a per-row action feature on the [[concepts/tabella-page|Tabella Page]] that allows authenticated users to edit the description field of a rental listing. It opens a modal or side panel pre-filled with the current description value. When the user saves, it calls `PATCH /listings/:id/description` with the trimmed, non-empty text. The editor includes an unsaved-changes guard that warns users when they attempt to close the modal without saving their modifications. This feature is defined under functional requirement **FR-19** and is part of the v1 decision actions scope.

## Key Characteristics

- **Per-row action**: Triggered from an individual listing row within the [[concepts/tabella-page|Tabella Page]], not as a bulk operation
- **Modal/side panel UI**: Opens a dedicated editing interface overlaying or adjacent to the main table view
- **Pre-filled textarea**: The editor loads with the current `description` value already populated, enabling inline editing rather than creation from scratch
- **Input validation**: The description text is trimmed and must be non-empty before the save action is permitted
- **PATCH endpoint**: Persists changes via `PATCH /listings/:id/description`, updating only the description field of the listing resource
- **Unsaved-changes guard**: If the user attempts to close the modal without saving, a warning prompt is displayed to prevent accidental data loss
- **Authenticated access**: Only logged-in users can access and use this editing feature (see [[concepts/login|Login]])
- **Session Overlay integration**: Confirmed writes are stored in the decisions [[concepts/redux-state-slices|Redux slice]], contributing to the [[concepts/session-overlay|Session Overlay]] that provides a read-after-write consistency layer on the client side

## Applications

- **Listing management**: Property managers or operators can quickly update listing descriptions directly from the data table without navigating to a separate detail page
- **Content correction**: Enables rapid correction of typos, outdated information, or incomplete descriptions in rental listings
- **Workflow efficiency**: The inline modal pattern reduces context switching, allowing users to review and edit descriptions while scanning tabular data
- **Data integrity**: The unsaved-changes guard and non-empty validation ensure that descriptions are not accidentally cleared or lost during editing sessions

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — the parent page where the Description Editor is accessed as a per-row action
- [[concepts/session-overlay|Session Overlay]] — the read-after-write overlay that stores confirmed description edits in the client session
- [[concepts/redux-state-slices|Redux State Slices]] — the state management structure that includes the decisions slice for tracking confirmed writes
- [[concepts/redux-state|Redux State]] — the overall client-side state store
- [[concepts/bulk-state-update-frontend|Bulk State Update]] — a related v1 decision action (FR-18) that operates on multiple rows
- [[concepts/login|Login]] — authentication gate required before accessing editing features
- [[concepts/route-guard|Route Guard]] — navigation guard mechanism related to authenticated access control
- [[concepts/tabella-colonne|Table Columns]] — the column definitions for the data table, including the description field
- [[concepts/table|Data Table]] — the underlying table component rendering listing data

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the frontend application version in which this feature is scoped and delivered

## Mentions in Source

- "**FR-19** — **Edit description:** per-row action opening a modal/side panel with a textarea pre-filled with the current `description`; save calls `PATCH /listings/:id/description` (trimmed, non-empty). Unsaved-changes guard on close." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]