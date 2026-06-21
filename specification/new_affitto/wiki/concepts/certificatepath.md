---
type: concept
created: 2026-06-21
updated: 2026-06-21
sources: ["[[sources/new-affitto_840b29]]"]
tags: [term]
aliases:
  - "X509 certificate path"
  - "certificatePath parameter"
  - "certificate path"
---


# certificatePath

## Definition

`certificatePath` is a configuration parameter in the MongoDB connection setup that specifies the file system path to the X.509 certificate file used for client authentication. In the Affitti system, it resolves to the file `X509-cert-2864290664025085959.pem` relative to the current working directory using Node.js `path.resolve()`. This certificate enables secure, passwordless authentication to MongoDB Atlas via the `MONGODB-X509` authentication mechanism with an external authentication source (`$external`).

## Key Characteristics

- **File system path resolution**: Uses `path.resolve(__dirname + "/X509-cert-2864290664025085959.pem")` to construct an absolute path to the certificate file based on the script's directory location
- **PEM format**: The certificate file uses the `.pem` (Privacy Enhanced Mail) format, a standard encoding for X.509 certificates
- **Passwordless authentication**: Eliminates the need for username/password credentials by relying on the X.509 certificate identity instead
- **External auth source**: Works in conjunction with the `authSource=$external` parameter, indicating that authentication is handled outside of MongoDB's internal user database
- **MONGODB-X509 mechanism**: Paired with the `authMechanism=MONGODB-X509` connection string parameter to specify the authentication protocol
- **Unique certificate identifier**: The certificate filename contains a unique numeric identifier (`2864290664025085959`), tying it to a specific MongoDB Atlas cluster or user

## Applications

- **Secure MongoDB Atlas connectivity**: Used in the backend of the Affitti rental management system to establish authenticated, encrypted connections to the [[concepts/function|Cloud Functions]] backend's MongoDB Atlas database
- **Server-to-database authentication**: Enables backend services to authenticate against [[entities/mongodb-atlas|MongoDB Atlas]] clusters (specifically [[entities/cluster0-7qska-mongodb-net|cluster0.7qska.mongodb.net]]) without embedding passwords in configuration files or environment variables
- **Production security**: Provides a more secure authentication method than password-based authentication for production deployments, as the certificate can be managed and rotated independently

## Related Concepts

- [[concepts/x509-certificate-authentication|X.509 Certificate Authentication]]
- [[concepts/firebaseconfig|Firebase Configuration]]
- [[concepts/autenticazione-necessaria|Autenticazione Necessaria]]
- [[concepts/function|Cloud Functions]]

## Related Entities

- [[entities/cluster0-7qska-mongodb-net|cluster0.7qska.mongodb.net]]
- [[entities/mongodb-atlas|MongoDB Atlas]]

## Mentions in Source

- `certificatePath: path.resolve(__dirname + "/X509-cert-2864290664025085959.pem")` — [[sources/new-affitto_840b29|New Affitto]]
- `"authSource=%24external&authMechanism=MONGODB-X509&"+` — [[sources/new-affitto_840b29|New Affitto]]