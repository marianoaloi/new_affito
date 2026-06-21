---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [term]
aliases:
  - "stateMaloi badge"
  - "stateMaloi column"
  - "state badge rendering"
---


# stateMaloi Badge Rendering

## Definition

The stateMaloi Badge Rendering is the visual representation system used to display the `stateMaloi` decision field within the [[concepts/tabella-page|Tabella Page]] of the Affitti Frontend application. As established in Decision Q3, the system renders four distinct badge states using colored emoji indicators to communicate listing evaluation status: 🔴 for not good, 🟢 for good, 🟡 for so-so, and ⚪ for no decision yet. Beyond serving as a read-only visual indicator, the badge also functions as an inline interactive control that allows users to set or change the state on a listing row via a 3-state toggle or menu interface.

## Key Characteristics

- **Four distinct visual states**: 🔴 0 (non buono / not good), 🟢 1 (buono / good), 🟡 2 (così così / so-so), and ⚪ empty (no decision yet)
- **Dual-purpose UI element**: Functions both as a visible status column in the data table and as an inline control for setting state on a row
- **Inline editing via toggle or menu**: Users can change state directly through a 3-state toggle or dropdown menu without navigating away from the table
- **Optimistic UI update pattern**: State changes are reflected immediately in the UI before server confirmation; on failure, the UI rolls back and displays a toast notification
- **API-backed persistence**: State changes call `PATCH /listings/:id/state` to persist the decision to the backend
- **Filterable dimension**: The `stateMaloi` field is available as a filter option in the filter bar, including a dedicated 'senza scelta' (no choice) option for listings that have no decision assigned
- **Integration with Session Overlay**: State decisions made during a session are managed through the [[concepts/session-overlay|Session Overlay]] pattern to ensure read-after-write consistency

## Applications

- **Listing triage workflow**: Users rapidly evaluate rental listings in the [[concepts/tabella-page|Tabella Page]] by toggling the stateMaloi badge to categorize each listing as good, not good, or so-so
- **Filtered views**: Users filter the table to show only listings with a specific state (e.g., all "buono" listings) or listings without any decision via the [[concepts/senza-scelta-page|Senza Scelta]] filter option
- **Decision tracking**: Provides a persistent visual record of evaluation decisions made across browsing sessions
- **Collaborative review**: The badge state is stored server-side, enabling shared decision visibility across sessions and users

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — The parent page where the stateMaloi badge column is rendered
- [[concepts/tabella-colonne|Tabella Colonne]] — The column schema that includes stateMaloi as a defined column
- [[concepts/session-overlay|Session Overlay]] — The read-after-write overlay pattern that manages optimistic state updates
- [[concepts/senza-scelta-page|Senza Scelta]] — The filter view for listings with no decision assigned
- [[concepts/redux-state|Redux State]] — The client-side state store where optimistic updates and rollbacks are managed

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — The application product in which the stateMaloi badge rendering is implemented

## Mentions in Source

- "**stateMaloi** | `stateMaloi` | **Decision (Q3):** visible state column — badge: 🔴 0 non buono / 🟢 1 buono / 🟡 2 così così / ⚪ empty = no decision yet" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "**FR-17** — **Set state on a row:** inline control (3-state toggle or menu) calling `PATCH /listings/:id/state`. Optimistic UI update; rollback + toast on failure." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]