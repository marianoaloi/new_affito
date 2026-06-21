import { Router, Request, Response } from 'express';
import { Document } from 'mongodb';
import { getDb } from '../db/mongo';
import { SummaryGroup, SummaryResponse } from '../types/index';

const router = Router();

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// GET /stats/summary — pre-aggregated stats from `count`
router.get('/stats/summary', async (_req: Request, res: Response): Promise<void> => {
  try {
    const db = await getDb();
    const docs = await db.collection('count').find({}).toArray();

    const groups: SummaryGroup[] = docs.map((doc: Document) => ({
      province: doc._id?.province ?? '',
      type: doc._id?.type ?? '',
      total: num(doc.total),
      accept: num(doc.accept),
      deny: num(doc.deny),
      wait: num(doc.wait),
      emptyChoise: num(doc.emptyChoise),
      elevator: num(doc.elevator),
    }));

    const totals = groups.reduce(
      (acc, g) => ({
        total: acc.total + g.total,
        accept: acc.accept + g.accept,
        deny: acc.deny + g.deny,
        wait: acc.wait + g.wait,
        emptyChoise: acc.emptyChoise + g.emptyChoise,
      }),
      { total: 0, accept: 0, deny: 0, wait: 0, emptyChoise: 0 }
    );

    const response: SummaryResponse = { groups, totals };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

export default router;
