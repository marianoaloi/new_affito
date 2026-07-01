import { Router, Request, Response } from 'express';
import { Document } from 'mongodb';
import { getDb } from '../db/mongo';
import { SummaryGroup, SummaryResponse, StatisticGroup, StatisticResponse } from '../types/index';

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

// GET /stats/statistic — distribution of Accesso_per_disabili, stateMaloi, elevator from `statistic`
router.get('/stats/statistic', async (_req: Request, res: Response): Promise<void> => {
  try {
    const db = await getDb();
    const docs = await db.collection('statistic').aggregate([
      {
        $group: {
          _id: { province: '$province', type: '$type' },
          total: { $sum: 1 },
          // Accesso_per_disabili: 1=si, 0=no, null/missing=senza
          disable_si:    { $sum: { $cond: [{ $eq: ['$Accesso_per_disabili', 1] }, 1, 0] } },
          disable_no:    { $sum: { $cond: [{ $eq: ['$Accesso_per_disabili', 0] }, 1, 0] } },
          disable_senza: { $sum: { $cond: [{ $eq: ['$Accesso_per_disabili', null] }, 1, 0] } },
          // stateMaloi: 1=si, 0=no, 2=cosi, null/missing=senza
          state_si:      { $sum: { $cond: [{ $eq: ['$stateMaloi', 1] }, 1, 0] } },
          state_no:      { $sum: { $cond: [{ $eq: ['$stateMaloi', 0] }, 1, 0] } },
          state_cosi:    { $sum: { $cond: [{ $eq: ['$stateMaloi', 2] }, 1, 0] } },
          state_senza:   { $sum: { $cond: [{ $eq: ['$stateMaloi', null] }, 1, 0] } },
          // elevator: true=si, false=no, null/missing=senza
          elevator_si:   { $sum: { $cond: [{ $eq: ['$elevator', true] }, 1, 0] } },
          elevator_no:   { $sum: { $cond: [{ $eq: ['$elevator', false] }, 1, 0] } },
          elevator_senza:{ $sum: { $cond: [{ $eq: ['$elevator', null] }, 1, 0] } },
        },
      },
      { $sort: { '_id.province': 1, '_id.type': 1 } },
    ]).toArray();

    const groups: StatisticGroup[] = docs.map((doc) => ({
      province:      doc._id?.province ?? '',
      type:          doc._id?.type ?? '',
      total:         num(doc.total),
      disable_si:    num(doc.disable_si),
      disable_no:    num(doc.disable_no),
      disable_senza: num(doc.disable_senza),
      state_si:      num(doc.state_si),
      state_no:      num(doc.state_no),
      state_cosi:    num(doc.state_cosi),
      state_senza:   num(doc.state_senza),
      elevator_si:   num(doc.elevator_si),
      elevator_no:   num(doc.elevator_no),
      elevator_senza:num(doc.elevator_senza),
    }));

    const response: StatisticResponse = { groups };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistic' });
  }
});

export default router;
