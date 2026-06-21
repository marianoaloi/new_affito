---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [term]
aliases:
  - "Firebase Analytics Proposal"
  - "FA observability"
---


# Firebase Analytics

## Definition

Firebase Analytics is the analytics and event-tracking service within the Firebase platform, proposed for basic observability in the Affitti Frontend v1. In the context of the Affitti project, it is recommended for tracking fundamental user-interaction events — specifically page-view events and login success/failure events. The proposal leverages the fact that the application already operates under the Firebase project **affitiudine**, placing Firebase Analytics within immediate configuration reach without requiring additional infrastructure setup.

## Key Characteristics

- **Already within configuration reach**: Because the Affitti Frontend uses the [[entities/firebase|Firebase]] project [[entities/affitiudine|affitiudine]], enabling Firebase Analytics requires minimal additional setup — the SDK and project binding are already in place.
- **Proposed, not mandated**: The PRD lists Firebase Analytics integration as a proposal rather than a firm requirement, leaving room for the team to evaluate its adoption during development.
- **Scoped to basic events**: The initial scope is deliberately narrow, targeting only page-view tracking and login success/failure events rather than comprehensive behavioral analytics.
- **Console-free production builds**: Aligned with broader [[concepts/non-functional-requirements|Non-Functional Requirements]], production builds must be console-free; error reporting and logging (including analytics-related diagnostics) are restricted to development mode only.
- **Observability-oriented**: The primary goal is operational observability — understanding user navigation patterns and authentication reliability — rather than marketing or conversion analytics.

## Applications

- **Page-view tracking**: Recording navigation events across the Affitti Frontend to understand which views users visit most frequently and to detect navigation anomalies.
- **Login event monitoring**: Capturing success and failure events from the [[concepts/google-sign-in-flow|Google Sign-In]] authentication flow to monitor authentication reliability and detect potential issues (e.g., elevated failure rates).
- **Development-mode diagnostics**: During development, Firebase Analytics events can be logged to the console for debugging, while production builds remain console-free per the NFR specifications.
- **Lightweight operational dashboard**: Providing a baseline observability layer through the Firebase console without requiring a dedicated monitoring stack.

## Related Concepts

- [[concepts/non-functional-requirements|Non-Functional Requirements]] — Firebase Analytics is listed under the NFR/observability proposals in the PRD
- [[concepts/google-sign-in-flow|Google Sign-In]] — Login success/failure events tracked by Firebase Analytics originate from the Google authentication flow
- [[concepts/login|Login]] — The authentication process whose outcomes are proposed for event tracking
- [[concepts/hosting|Firebase Hosting]] — Part of the broader Firebase ecosystem used by the Affitti Frontend

## Related Entities

- [[entities/firebase|Firebase]] — The platform providing the Analytics service
- [[entities/affitiudine|affitiudine]] — The Firebase project under which Analytics would be configured

## Mentions in Source

- "Basic page-view and login-success/failure events (Firebase Analytics is already in the config's reach)." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "Console-free production build; errors reported to console/logging only in dev." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]