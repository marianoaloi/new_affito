import { Router, Response } from 'express';
import { getDb } from '../db/mongo';
import { AuthRequest } from '../middleware/auth';

const router = Router();

// GET /raw — the `statistic` collection as-is: no projection, no mapping.
// Business transformation happens client-side.
router.get('/raw', async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const db = await getDb();
    const docs = await db.collection('statistic').find({}).toArray();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch raw statistic' });
  }
});

export default router;
