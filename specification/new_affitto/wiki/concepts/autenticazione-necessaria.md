---
type: concept
created: 2025-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "method"
aliases:
  - "Required Authentication"
  - "Firebase Login"
  - "Autenticazione Necessaria"
---

## Basic Information

- **Type:** concept
- **Concept subtype:** method
- **Sources:** [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]

## Description

Autenticazione Necessaria (Required Authentication) is the authentication method defined for the Affitti Udine frontend application. It specifies the requirement and mechanism by which users authenticate via a login button positioned in the upper right corner of the interface. The implementation relies on Firebase Authentication with GoogleAuthProvider, using the Firebase project configuration for 'affitiudine' as defined in the [[concepts/firebaseconfig|Firebase Configuration]]. This method establishes the boundary between authenticated and unauthenticated user experiences within the application, determining which pages and features are accessible to each user state. After successful authentication, the user's profile photo replaces the login button, providing continuous visual feedback of the user's login state throughout the application.

## Key Characteristics

- **UI-driven login trigger**: Authentication is initiated through a button located in the upper right corner of the application interface
- **Visual feedback on authentication state**: After successful login, the user's profile photo replaces the login button, providing a clear visual indicator of the authenticated state
- **Google-based identity provider**: Uses Firebase Authentication with `GoogleAuthProvider` as the sole authentication mechanism
- **Firebase project binding**: Tied to the specific Firebase project configuration for 'affitiudine', with specific Firebase configuration parameters provided via [[concepts/firebaseconfig|firebaseConfig]]
- **Binary access model**: Defines a clear separation between authenticated and unauthenticated user experiences — unauthenticated users see the [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]], while authenticated users gain access to the [[concepts/tabella-page|Tabella Page]]
- **Frontend-only authentication flow**: The authentication logic is implemented entirely within the frontend application

## Applications

- **User session management**: Controls user login/logout lifecycle within the Affitti Udine frontend application
- **Access control**: Gates access to authenticated-only views such as the property listings table, ensuring only logged-in users can interact with rental data
- **User identity display**: Provides personalized UI elements (profile photo) that confirm the user's identity post-authentication
- **Integration with Firebase ecosystem**: Leverages Google's Firebase infrastructure for secure, scalable authentication without custom backend authentication logic

## Related Concepts

- [[concepts/senza-autenticazioni-page|Senza Autenticazioni Page]] — the page displayed to users who have not yet authenticated
- [[concepts/tabella-page|Tabella Page]] — the primary authenticated view accessible after login
- [[concepts/firebaseconfig|Firebase Configuration]] — the Firebase configuration object providing project parameters for authentication

## Related Entities

- [[entities/affitiudine|affitiudine]] — the Firebase project providing the authentication configuration

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD Affito Frontend Table]]**
> - "Nel canto superiore destro deve avere la possibilità di fare login. Dopo logado deve presentare la foto dela persona nel botano."
> - "informacione del projeto frondend per acessare il firebase autentication."
> - "const googleProvider = new GoogleAuthProvider();"