---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd_affitti_frontend_v0-2_aa5d28]]"]
tags: [method]
aliases:
  - "Google popup/redirect flow"
  - "Google authentication flow"
  - "Google Sign-In"
---


# Google Sign-In Flow

## Definition

Google Sign-In Flow is the primary authentication method used in the Affitti Frontend v1 application, implemented via [[concepts/function|Firebase Cloud Functions]] Authentication with [[entities/google-auth-provider|GoogleAuthProvider]]. It provides a complete sign-in/sign-out experience where unauthenticated users see a Login button that triggers Google's popup or redirect authentication flow. Upon successful authentication, the user's Google profile photo replaces the login button in the header's top-right corner, providing visible session state. The session persists across page reloads through Firebase persistence, and the user's ID token is silently refreshed and attached to every authenticated API call as an Authorization Bearer token. This flow is defined as Goal G1 — the primary authentication experience for the application.

## Key Characteristics

- **Google Identity Provider**: Uses [[entities/google-auth-provider|GoogleAuthProvider]] as the sole identity provider, leveraging Google's OAuth 2.0 infrastructure
- **Popup/Redirect Flow**: Supports both popup and redirect authentication strategies for flexibility across browsers and devices
- **Visual Session State**: Displays the user's Google profile photo in the header when authenticated, replacing the Login button when signed out
- **Firebase Persistence**: Session state persists across browser reloads using [[entities/firebase|Firebase]] built-in persistence mechanisms, eliminating the need for manual token storage
- **Silent Token Refresh**: ID tokens are automatically and silently refreshed in the background without user intervention
- **Bearer Token Injection**: The current valid ID token is automatically attached to every authenticated API call as an `Authorization: Bearer` header
- **Goal G1 Priority**: Designated as the primary authentication experience (Goal G1) in the product requirements

## Applications

- **User Authentication**: Serves as the single sign-on mechanism for the Affitti Frontend application, gating access to protected features such as the rental data [[concepts/table|table]] and management tools
- **API Authorization**: Provides the Bearer token required for all authenticated backend API calls, ensuring secure communication between the frontend and the [[sources/prd_affitti_backend_v0-3_1d90fc|Affitti Backend]]
- **Route Protection**: Works in conjunction with the [[concepts/route-guard|Route Guard]] to prevent unauthenticated users from accessing protected routes
- **State Management**: Integrates with [[concepts/redux-state|Redux store]] to propagate authentication state across the application, enabling conditional rendering and feature gating

## Related Concepts

- [[concepts/login|Login]] — the login action and authentication entry point
- [[concepts/route-guard|Route Guard]] — protects routes based on authentication state provided by the sign-in flow
- [[concepts/redux-state|Redux store]] — manages client-side authentication state
- [[concepts/redux-state-slices|Redux state slices]] — auth slice stores user session data from the sign-in flow
- [[concepts/function|Firebase Cloud Functions]] — Firebase platform providing the authentication infrastructure
- [[concepts/hosting|Firebase Hosting]] — hosts the frontend application where the sign-in flow operates

## Related Entities

- [[entities/google-auth-provider|GoogleAuthProvider]] — the Firebase authentication provider class for Google identity
- [[entities/firebase|Firebase]] — the platform providing authentication, persistence, and token management services

## Mentions in Source

- "Google sign-in/sign-out flow with visible session state (user photo in the header)." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "Signed out: a **Login** button triggering the Google popup/redirect flow (`GoogleAuthProvider`)." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]
- "Session persists across reloads (Firebase persistence); token silently refreshed and attached to every API call." — [[sources/prd_affitti_frontend_v0-2_aa5d28|PRD_Affitti_Frontend_v0.2]]