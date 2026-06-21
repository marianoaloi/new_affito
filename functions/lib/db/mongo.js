"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = getDb;
const mongodb_1 = require("mongodb");
let client = null;
let db = null;
async function getDb() {
    if (db)
        return db;
    const uri = process.env.MONGODB_URI;
    const certPath = process.env.MONGODB_CERT_PATH;
    if (!uri || !certPath)
        throw new Error('Missing MONGODB_URI or MONGODB_CERT_PATH');
    client = new mongodb_1.MongoClient(uri, { tlsCertificateKeyFile: certPath });
    await client.connect();
    db = client.db('udine');
    return db;
}
//# sourceMappingURL=mongo.js.map