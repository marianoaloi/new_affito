"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongo_1 = require("../db/mongo");
const router = (0, express_1.Router)();
function num(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}
// GET /stats/summary — pre-aggregated stats from `count`
router.get('/stats/summary', async (_req, res) => {
    try {
        const db = await (0, mongo_1.getDb)();
        const docs = await db.collection('count').find({}).toArray();
        const groups = docs.map((doc) => ({
            province: doc._id?.province ?? '',
            type: doc._id?.type ?? '',
            total: num(doc.total),
            accept: num(doc.accept),
            deny: num(doc.deny),
            wait: num(doc.wait),
            emptyChoise: num(doc.emptyChoise),
            elevator: num(doc.elevator),
        }));
        const totals = groups.reduce((acc, g) => ({
            total: acc.total + g.total,
            accept: acc.accept + g.accept,
            deny: acc.deny + g.deny,
            wait: acc.wait + g.wait,
            emptyChoise: acc.emptyChoise + g.emptyChoise,
        }), { total: 0, accept: 0, deny: 0, wait: 0, emptyChoise: 0 });
        const response = { groups, totals };
        res.json(response);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch summary' });
    }
});
exports.default = router;
//# sourceMappingURL=public.js.map