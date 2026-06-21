import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  const uri = process.env.MONGODB_URI;
  const certPath = process.env.MONGODB_CERT_PATH;
  if (!uri || !certPath) throw new Error('Missing MONGODB_URI or MONGODB_CERT_PATH');
  client = new MongoClient(uri, { tlsCertificateKeyFile: certPath });
  await client.connect();
  db = client.db('udine');
  return db;
}
