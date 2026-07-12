import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware/auth';
import listingsRouter from './routes/listings';
import mapRouter from './routes/map';
import publicRouter from './routes/public';
import statsRouter from './routes/stats';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/public', publicRouter);
app.use('/listings/map', authMiddleware, mapRouter);
app.use('/listings', authMiddleware, listingsRouter);
app.use('/stats', authMiddleware, statsRouter);

export const api = functions.https.onRequest(app);
