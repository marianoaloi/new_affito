---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources:
  - "[[sources/prd_affitti_backend_v0-3_1d90fc]]"
  - "[[sources/prd-new-affitto-backend_86705a]]"
  - "[[sources/new-affitto_840b29]]"
tags:
  - "method"
aliases:
  - "X.509 auth"
  - "X.509 certificate auth"
  - "mutual TLS authentication"
---

## Key Characteristics

- **Certificate-based identity**: Uses a PEM-formatted X.509 certificate (`certPath`) instead of traditional username/password credentials to authenticate the application to the database
- **Mutual TLS (mTLS)**: Both the client (Affitti Backend) and the server (MongoDB Atlas) verify each other's identity, establishing a two-way trust relationship
- **Secret management**: The certificate file must never be stored in the repository; it is managed as a secret via Firebase Functions secrets or Google Cloud Secret Manager
- **Passwordless authentication**: Eliminates the need for database passwords, reducing the attack surface associated with credential leakage
- **PEM file format**: The certificate is stored in Privacy-Enhanced Mail (PEM) format, a base64-encoded container for cryptographic keys and certificates
- **Environment-specific configuration**: The `certPath` is resolved differently depending on the deployment environment (local development vs. Cloud Functions)
- **Machine-to-machine security**: Provides secure communication between Cloud Functions and the database, distinct from user-facing authentication
- **Explicit auth mechanism in connection string**: The MongoDB connection URL includes `authMechanism=MONGODB-X509` and `authSource=%24external`, delegating identity verification entirely to the presented certificate
- **Named certificate file**: The specific certificate file used is `X509-cert-2864290664025085959.pem`, uniquely identifying the client credential for the cluster
- **Runtime path resolution**: The certificate path is resolved at runtime using `path.resolve(__dirname + "/X509-cert-2864290664025085959.pem")`, ensuring correct file location relative to the deployed function code

## Description

X.509 certificate authentication is the mechanism by which the [[entities/affitti-backend|Affitti Backend]] establishes a trusted, encrypted connection to [[entities/mongodb-atlas|MongoDB Atlas]] without relying on traditional username/password credentials. Instead, a PEM-formatted digital certificate is presented during the TLS handshake, enabling mutual authentication where both client and server verify each other's identity. This approach is separate from the user-facing [[concepts/firebase-authentication|Firebase Authentication]] and provides machine-to-machine security between the [[entities/firebase-cloud-functions|Cloud Functions]] and the database. The certificate must be kept as a secret and is provisioned at runtime via Firebase Functions secrets or Google Cloud Secret Manager under the [[entities/affitiudine|affitiudine]] project. The specific certificate file (`X509-cert-2864290664025085959.pem`) authenticates against the MongoDB Atlas cluster hosting the [[entities/udine|udine]] database, with the connection string explicitly setting `authMechanism=MONGODB-X509` and routing authentication through the `$external` auth source. In the existing system architecture, the certificate path is resolved programmatically using `path.resolve(__dirname + "/X509-cert-2864290664025085959.pem")`, ensuring the certificate is correctly located relative to the deployed code at runtime. X.509 authentication is one of the first components to be configured during Milestone M1 (Foundation) of the implementation plan, alongside the Functions project scaffold, Mongo connection handling, [[concepts/firebase-id-token-verification|token verification middleware]], and the [[concepts/shared-types-package|shared types package]]. This foundational placement underscores its critical role in the project's security architecture.

## Applications

- **Secure database connectivity**: Used to establish authenticated and encrypted connections between the Affitti Backend API layer and MongoDB Atlas without password-based credentials
- **Cloud-native secret management**: Integrated with Firebase Functions secrets and Google Cloud Secret Manager to securely provision the certificate at runtime in serverless environments
- **Project scaffolding**: Part of the foundational infrastructure setup (M1 — Foundation) when bootstrapping the Functions project, alongside Mongo connection handling and token verification middleware
- **Compliance and security hardening**: Supports security best practices by enforcing mutual authentication and preventing credential exposure in version control systems
- **Connection string configuration**: Encodes the authentication mechanism directly in the MongoDB SRV connection URL, ensuring all client connections consistently use certificate-based auth

## Related Concepts

- [[concepts/firebase-authentication|Firebase Authentication]] — the user-facing authentication mechanism (Google Provider), complementary to X.509 which handles backend-to-database authentication
- [[concepts/firebase-id-token-verification|Firebase ID Token Verification]] — token verification middleware set up alongside X.509 in the M1 Foundation milestone
- [[concepts/shared-types-package|Shared Types Package]] — shared types package configured in the same foundational milestone as X.509 certificate setup

## Related Entities

- [[entities/mongodb-atlas|MongoDB Atlas]] — the cloud database service that accepts X.509 certificate authentication for client connections
- [[entities/firebase-cloud-functions|Firebase Cloud Functions]] — the serverless compute environment where the certificate is deployed and managed via secrets
- [[entities/affitiudine|affitiudine]] — the Firebase project under which the secrets and Cloud Functions are configured
- [[entities/affitti-backend|Affitti Backend]] — the API layer that uses X.509 certificates to connect to the database
- [[entities/udine|udine]] — the MongoDB database hosted on the Atlas cluster that the X.509 certificate authenticates against

## Mentions in Source

> **Source: [[sources/prd_affitti_backend_v0-3_1d90fc|PRD Affitti Backend v0.3]]**
> - "DB Auth | X.509 certificate (`certPath` PEM file) — must be stored as a secret, never in repo"
> - "X.509 cert and connection string in Firebase Functions secrets/Secret Manager."
> - "Functions project scaffold, Mongo connection (X.509 via secrets), token verification middleware, shared types package"

> **Source: [[sources/prd-new-affitto-backend_86705a|PRD New Affitto (backend)]]**
> - "| certPath | X509-cert-2864290664025085959.pem |"
> - "| URL | mongodb+srv://cluster0.7qska.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0 |"

> **Source: [[sources/new-affitto_840b29|New Affitto]]**
> - "authSource=%24external&authMechanism=MONGODB-X509"
> - "certificatePath: path.resolve(__dirname + \"/X509-cert-2864290664025085959.pem\")"