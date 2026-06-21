---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_frontend_v0-2_aa5d28]]"
tags:
  - "method"
aliases:
  - "Route Guard"
  - "auth route guard"
  - "navigation guard"
  - "Auth Guard"
---

## Description

Route Guard is the client-side route protection mechanism specified for the [[entities/affitti-frontend-v1|Affitti Frontend v1]] application. It intercepts navigation attempts to any route marked as `[auth required]` — specifically `/tabella`, `/mappa`, `/analisi`, and `/senza-scelta` — and redirects unauthenticated users to the landing page (`/`) with the login prompt visually highlighted to guide them toward authentication. Upon successful authentication, the user is automatically redirected to `/tabella`. The mechanism operates as part of a defense-in-depth strategy, where client-side route guards are complemented by server-side enforcement via the backend API, ensuring security even if the client-side guard is bypassed. This pattern is fundamental to the dual-access model of the application, where unauthenticated visitors see only aggregate data while authenticated evaluators access full listing details.

## Key Characteristics

- **Client-side interception**: Navigation to any route marked as `[auth required]` is intercepted before the page renders, preventing unauthenticated users from viewing protected content
- **Redirect to root with login highlight**: Unauthenticated users are sent to `/` and the login prompt is visually highlighted to guide them toward authentication
- **Post-login redirect**: After successful login, users are automatically navigated to `/tabella` (the main data table page)
- **Defense in depth**: Auth-guarded routes are verified both client-side via route guards AND enforced server-side by the backend API, ensuring security even if the client-side guard is bypassed
- **Covers placeholder pages**: The three placeholder pages ([[concepts/mappa-page|Mappa]], [[concepts/analisi-page|Analisi]], [[concepts/senza-scelta-page|Senza Scelta]]) are protected by the route guard despite being simple "coming soon" placeholders, maintaining consistent access control across the application
- **Protected routes**: `/tabella`, `/mappa`, `/analisi`, `/senza-scelta`
- **Dual-access model enforcement**: Supports the application's architecture where visitors see only aggregate/public data while authenticated evaluators gain access to full listing details

## Applications

- **Authenticated SPA navigation**: Ensures that single-page application routes requiring user identity are only accessible after login, providing a seamless yet secure user experience
- **Progressive feature rollout**: Placeholder pages behind the auth guard allow future features to be deployed behind authentication from the start, without requiring additional security configuration when they become functional
- **Layered security architecture**: Works in tandem with server-side API authentication to create a robust, multi-layer access control system where neither client nor server alone is solely responsible for authorization

## Related Concepts

- [[concepts/tabella-page|Tabella Page]] — primary redirect target after successful login
- [[concepts/senza-autenticazioni-page|Senza Autenticazione Page]] — the unauthenticated landing page where users are redirected when blocked by the route guard
- [[concepts/mappa-page|Mappa]] — placeholder page protected by the route guard
- [[concepts/analisi-page|Analisi]] — placeholder page protected by the route guard
- [[concepts/senza-scelta-page|Senza Scelta]] — placeholder page protected by the route guard
- [[concepts/login|Login]] — the authentication action users must complete to pass the route guard
- [[concepts/react|React]] — the frontend framework in which the route guard is implemented
- [[concepts/firebaseconfig|Firebase Configuration]] — related Firebase Authentication infrastructure underlying the auth guard

## Related Entities

- [[entities/affitti-frontend-v1|Affitti Frontend v1]] — the application in which the route guard mechanism is implemented

## Mentions in Source

> **Source: [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD Affitti Frontend v0.2]]**
> - "Route guard: navigating to any `[auth required]` route while signed out redirects to `/` with the login prompt highlighted."
> - "After successful login, redirect to `/tabella` *(assumption)*."
> - "Auth-guarded routes verified client-side *and* enforced server-side (defense in depth)."