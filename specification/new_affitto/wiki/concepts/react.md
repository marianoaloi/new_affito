---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/new-affitto_840b29]]"
tags:
  - "term"
aliases:
  - "React"
  - "React.js"
  - "React library"
---

## Basic Information
- **Type:** concept
- **Concept Type:** term
- **Sources:** [[sources/new-affitto_840b29|New Affitto]]
- **Definition:** React is the frontend JavaScript library used to build the user interface of the affitti system. Developed by Meta (Facebook), React provides a component-based architecture for constructing interactive UIs. In the affitti system, React works together with [[concepts/typescript|TypeScript]] for type safety and [[concepts/redux-state|Redux]] for state management. The React application is hosted on [[concepts/hosting|Firebase Hosting]] and serves as the presentation layer for rental data retrieved from MongoDB Atlas via [[concepts/function|Firebase Cloud Functions]].

## Description
React is one of the three core frontend technologies used to build the affitti system's user interface, alongside [[concepts/typescript|TypeScript]] and [[concepts/redux-state|Redux]]. It provides the component-based architecture that structures the entire client-side application, enabling developers to build reusable, self-contained UI components that manage their own rendering logic. React uses a declarative rendering approach with a virtual DOM to efficiently update the browser's actual DOM. The built React application is deployed and served through [[concepts/hosting|Firebase Hosting]], where it presents rental data retrieved from MongoDB via [[concepts/function|Firebase Cloud Functions]]. React serves as the presentation layer responsible for rendering the table-based data display and all other interactive views of the system.

## Key Characteristics
- **Component-based architecture**: UI is built from reusable, self-contained components that manage their own rendering logic
- **Declarative rendering**: Describes what the UI should look like for a given state, and React handles DOM updates efficiently via a virtual DOM
- **TypeScript integration**: Used with [[concepts/typescript|TypeScript]] in the affitti system to provide static type checking and improved developer experience
- **Redux state management**: Paired with [[concepts/redux-state|Redux]] to manage global application state, ensuring predictable data flow across components
- **Firebase Hosting deployment**: The built React application is deployed and served through [[concepts/hosting|Firebase Hosting]]
- **Frontend presentation layer**: Acts as the client-side interface that displays rental data fetched from the backend API layer

## Applications
- Renders the main [[concepts/table|data table]] displaying rental property listings with sortable and filterable columns
- Powers the various application pages including [[concepts/tabella-page|Table Page]], [[concepts/analisi-page|Analysis Page]], [[concepts/mappa-page|Map Page]], and [[concepts/senza-autenticazioni-page|Unauthenticated Page]]
- Handles user authentication flows such as [[concepts/autenticazione-necessaria|Firebase Login]]
- Displays property details including [[concepts/photos|photos]], [[concepts/documents|documents]], [[concepts/videos|videos]], and [[concepts/photoplan|photo plans]]
- Communicates with [[concepts/function|Firebase Cloud Functions]] to retrieve and manipulate rental data stored in MongoDB Atlas

## Related Concepts
- [[concepts/typescript|TypeScript]] — used alongside React for type-safe frontend development
- [[concepts/redux-state|Redux]] — state management library integrated with React
- [[concepts/table|Table]] — primary UI component for displaying rental data
- [[concepts/hosting|Firebase Hosting]] — hosting service where the React application is deployed
- [[concepts/tabella-colonne|Table Columns]] — defines the column schema rendered by React components
- [[concepts/firebaseconfig|Firebase Configuration]] — configuration object used to initialize Firebase services in the React app

## Related Entities
- [[entities/firebase|Firebase]] — platform providing hosting, authentication, and cloud functions for the React application

## Mentions in Source

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "**hosting** per presentare il frontend in typescript , react e redux"
> - "é usata il: **hosting** per presentare il frontend in typescript , react e redux"