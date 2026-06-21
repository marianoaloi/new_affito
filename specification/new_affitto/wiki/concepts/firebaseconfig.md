---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd-new-affito-frontend-table_a86812]]"
tags:
  - "other"
aliases:
  - "Firebase Configuration"
  - "Firebase Config Object"
  - "firebaseConfig object"
---

## Description

The `firebaseConfig` is a JavaScript configuration object used to initialize the Firebase SDK within the Affitiudine frontend application. It contains the set of critical connection parameters — including API key, authentication domain, project ID, storage bucket, messaging sender ID, and application ID — that uniquely identify and bind the client-side application to the corresponding Firebase project. This object is essential for establishing the connection between the frontend and Firebase services such as authentication, storage, and messaging. The configuration links the frontend to the Affitiudine Firebase project (projectId: `affitiudine`, authDomain: `affitiudine.firebaseapp.com`), enabling authentication flows and other Firebase services. It is declared as a `const` in the frontend codebase, ensuring immutability at runtime, and is passed to `initializeApp()` to bootstrap all Firebase services in the client application.

## Key Characteristics

- **Project-specific binding**: The configuration ties the frontend application to the specific Firebase project named "affitiudine" via its `projectId` and `authDomain` (`affitiudine.firebaseapp.com`)
- **Contains sensitive credentials**: Includes the `apiKey` (`AIzaSyAokzUuGqYXFc4YfJj66vC3aVPsQ7P2ixE`) used for API access authorization, though Firebase API keys are designed to be client-facing and are restricted via Firebase security rules
- **Enables Firebase Authentication**: Works in conjunction with [[entities/GoogleAuthProvider|GoogleAuthProvider]] to enable Google-based sign-in for the application
- **Messaging support**: Includes `messagingSenderId` (`211362755894`) for Firebase Cloud Messaging integration
- **Storage configuration**: Specifies `storageBucket` (`affitiudine.firebasestorage.app`) for Firebase Storage access
- **Unique app identification**: The `appId` (`1:211362755894:web:d077df940d9cdfbbb5af97`) uniquely identifies the web application instance within the Firebase project
- **Constant object**: Declared as a `const` in the frontend codebase, ensuring immutability at runtime

## Applications

- **Firebase SDK initialization**: The `firebaseConfig` object is passed to `initializeApp()` to bootstrap all Firebase services in the client application
- **User authentication**: Enables the [[concepts/autenticazione-necessaria|Autenticazione Necessaria]] flow by connecting the frontend to Firebase Authentication, allowing users to sign in via Google OAuth through [[entities/GoogleAuthProvider|GoogleAuthProvider]]
- **Real estate platform connectivity**: Serves as the foundational configuration that connects the [[entities/affitiudine|affitiudine]] frontend to its backend Firebase infrastructure, supporting the full rental property management platform
- **Multi-service enablement**: A single configuration object that enables access to multiple Firebase services (Auth, Storage, Messaging) without requiring separate connection setups

## Related Concepts

- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]]
- [[concepts/hosting|hosting]]

## Related Entities

- [[entities/affitiudine|affitiudine]]
- [[entities/GoogleAuthProvider|GoogleAuthProvider]]

## Mentions in Source

> **Source: [[sources/prd-new-affito-frontend-table_a86812|PRD New Affito FrontEnd Table]]**
> - "informacione del projeto frondend per acessare il firebase autentication."
> ```
> const googleProvider = new GoogleAuthProvider();
> const firebaseConfig = {
>   apiKey: "AIzaSyAokzUuGqYXFc4YfJj66vC3aVPsQ7P2ixE",
>   authDomain: "affitiudine.firebaseapp.com",
>   projectId: "affitiudine",
>   storageBucket: "affitiudine.firebasestorage.app",
>   messagingSenderId: "211362755894",
>   appId: "1:211362755894:web:d077df940d9cdfbbb5af97"
> };
>