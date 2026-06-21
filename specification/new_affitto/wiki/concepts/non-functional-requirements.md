---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [standard]
aliases:
  - "NFRs"
  - "Non-Functional Requirements Affitti Frontend"
---


# Non-Functional Requirements

## Definition

The Non-Functional Requirements (NFRs) for [[entities/affitti-frontend-v1|Affitti Frontend v1]] are a set of quality attributes and constraints that define how the system should behave beyond its functional capabilities. They span six areas: **Performance**, **Security**, **Resilience**, **Accessibility**, **Browser Support**, and **Responsive Design**. Together, these requirements establish the baseline for user experience, safety, and cross-platform compatibility of the frontend application.

## Key Characteristics

- **Performance**: First contentful paint of the landing page must be under 2 seconds on a 4G connection; table interactions must feel instantaneous with perceived latency below 200 ms, achieved through skeleton rows displayed while data is being fetched.
- **Security**: The ID token is stored only in memory or via SDK-managed persistence and must never appear in query strings. Routes are auth-guarded on the client side and enforced server-side following a defense-in-depth strategy.
- **Resilience**: All API errors are surfaced to the user with an option to retry the failed request. A 401 (Unauthorized) response automatically triggers a re-login flow.
- **Accessibility**: The data table and navigation menus must be fully keyboard-navigable. All UI elements must meet WCAG AA contrast ratio requirements.
- **Browser Support**: The application targets evergreen browsers — specifically the last two versions of Chrome, Firefox, Safari, and Edge.
- **Responsive Design**: The interface must be usable from a minimum viewport width of 360 px. Tables degrade gracefully via horizontal scrolling on narrow screens.

## Applications

- **Sprint planning and acceptance criteria**: Each NFR translates directly into testable acceptance criteria for user stories and technical tasks.
- **Performance budgets**: The 2-second FCP and 200 ms interaction targets inform build-time budgets (bundle size limits, lazy-loading strategies) and monitoring thresholds.
- **Security audits**: The token-handling and defense-in-depth rules serve as a checklist during code review and penetration testing.
- **QA test matrices**: Browser support and responsive breakpoints define the device and browser matrix for end-to-end and visual-regression testing.
- **Accessibility compliance**: WCAG AA contrast and keyboard-navigation requirements guide component library selection and custom component design.

## Related Concepts

- [[concepts/route-guard|Route Guard]] — implements the auth-guarded routes requirement from the Security NFR
- [[concepts/google-sign-in-flow|Google Sign-In Flow]] — the authentication mechanism whose tokens are subject to the Security NFR
- [[concepts/table|Table]] — the primary UI component affected by Performance, Accessibility, and Responsive Design NFRs
- [[concepts/login|Login]] — re-login flow triggered by the Resilience NFR on 401 responses
- [[concepts/eventual-consistency-frontend-handling|Eventual Consistency (Frontend)]] — related resilience pattern for handling read-after-write gaps
- [[concepts/session-overlay|Session Overlay]] — UI pattern that may interact with resilience and re-login requirements

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the product these NFRs apply to

## Mentions in Source

- **Performance** | "First contentful paint of landing < 2 s on 4G; table interactions < 200 ms perceived (skeleton rows while fetching)" — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]
- **Security** | "ID token only in memory/SDK persistence; never in query strings. Auth-guarded routes verified client-side *and* enforced server-side (defense in depth)." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]