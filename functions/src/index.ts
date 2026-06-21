import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import listingsRouter from './routes/listings';
import publicRouter from './routes/public';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/public', publicRouter);
app.use('/listings', authMiddleware, listingsRouter);

export const api = functions.https.onRequest(app);
