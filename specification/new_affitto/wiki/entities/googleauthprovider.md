---
type: entity
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "product"
aliases:
  - "Google Auth Provider"
  - "Google Authentication Provider"
  - "GoogleAuthProvider"
---

## Description
GoogleAuthProvider is the Firebase/Google authentication provider class used in the [[entities/affitiudine|Affitiudine]] frontend project to enable Google-based login functionality. It is instantiated in the frontend code via `const googleProvider = new GoogleAuthProvider()` as the primary and sole authentication mechanism described in the project's PRD. The provider integrates with the Firebase Authentication SDK, configured through the [[concepts/firebaseconfig|firebaseConfig]] settings. Once authenticated, users' Google profile photos are displayed in the top-right corner button of the application interface, serving as both a visual confirmation of login status and an access point for account-related actions. GoogleAuthProvider is part of the broader [[concepts/react-and-redux-frontend|React/Redux frontend]] architecture of the Affitiudine project and is central to the [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] requirement that governs access to authenticated pages.

## Related Entities
- [[entities/affitiudine|Affitiudine]] — the parent project that uses GoogleAuthProvider for user authentication

## Related Concepts
- [[concepts/firebaseconfig|firebaseConfig]] — the Firebase configuration object that enables GoogleAuthProvider to connect to the correct Firebase project
- [[concepts/react-and-redux-frontend|React/Redux frontend]] — the frontend architecture in which GoogleAuthProvider is integrated
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] — the authentication requirement that relies on GoogleAuthProvider as the login mechanism

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD New Affito FrontEnd Table]]**
> - "informacione del projeto frondend per acessare il firebase autentication. `const googleProvider = new GoogleAuthProvider();`" *(Information about the frontend project for accessing Firebase authentication)*
> - "Nel canto superiore destro deve avere la possibilità di fare login. Dopo logado deve presentare la foto dela persona nel botano." *(In the top-right corner there must be the ability to log in. After logging in, it must display the person's photo in the button.)*
> - "const googleProvider = new GoogleAuthProvider();"