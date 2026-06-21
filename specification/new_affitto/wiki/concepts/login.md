---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources: ["[[sources/prd-new-affito-frontend-table_a86812]]"]
tags: [term]
aliases:
  - "autenticazione"
  - "authentication login"
  - "user login"
---


# Login

## Definition

Login refers to the user authentication action within the Affitto frontend application. It is the mechanism by which users identify and authenticate themselves via Google through Firebase Authentication. The login functionality is positioned in the upper-right corner of the interface and serves as the gateway to the full application feature set. Upon successful authentication, the user's Google profile photo replaces the login button, providing immediate visual confirmation of the authenticated state. Unauthenticated users are restricted to a limited summary page with reduced functionality.

## Key Characteristics

- **UI Placement**: The login button is located in the upper-right corner of the application interface, following standard web application conventions
- **Google Authentication**: Authentication is performed exclusively through Google via [[concepts/firebaseconfig|Firebase Configuration]], leveraging [[entities/GoogleAuthProvider|GoogleAuthProvider]] as the identity provider
- **Visual State Feedback**: After successful login, the user's profile photo is displayed on the button, replacing the default login state and giving clear visual indication of authentication
- **Access Control Gateway**: Login acts as the prerequisite for accessing full application features — without authentication, users are redirected to a restricted page
- **Binary State Model**: The application operates in two distinct modes based on login state: authenticated (full access) and unauthenticated (summary-only view)

## Applications

- **User Authentication Flow**: Users click the login button in the upper-right corner, authenticate via their Google account through Firebase, and gain access to the complete application including the [[concepts/tabella-page|Table Page]], [[concepts/analisi-page|Analysis Page]], and [[concepts/mappa-page|Map Page]]
- **Session State Management**: The login state is managed through [[concepts/redux-state|Redux State]], ensuring consistent authentication awareness across the application
- **Access Restriction Enforcement**: The login mechanism works in conjunction with [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] to enforce route-level access control, redirecting unauthenticated users to the [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]]
- **Frontend Identity Display**: Post-login, the user's profile information (specifically their photo) is used to personalize the interface and confirm the active session

## Related Concepts

- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — the authentication requirement rule that enforces login before granting access to protected features
- [[concepts/firebaseconfig|Firebase Configuration]] — the Firebase configuration object that enables Google authentication in the application
- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] — the limited page displayed to unauthenticated users who have not completed login
- [[concepts/redux-state|Redux State]] — manages the client-side authentication state after login
- [[concepts/count-without-autentication|Count Without Authentication]] — the limited data available to users before login

## Related Entities

- [[entities/GoogleAuthProvider|GoogleAuthProvider]] — the Firebase/Google authentication provider used to handle the login process
- [[entities/affitiudine|affitiudine]] — the application project in which the login functionality is implemented

## Mentions in Source

- "Nel canto superiore destro deve avere la possibilità di fare login." *(In the upper-right corner there must be the possibility to login.)* — [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]
- "Dopo logado deve presentare la foto dela persona nel botano." *(After logged in, the person's photo must be displayed on the button.)* — [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]
- "Quando non c`e una persona autenticata una pagina iniciale con apenas un resumo del atuale database deve essere presentada." *(When there is no authenticated person, an initial page with only a summary of the current database must be displayed.)* — [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]