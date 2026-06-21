"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongo_1 = require("../db/mongo");
const router = (0, express_1.Router)();
// Split-collection CQRS: reads from affitto_data, writes to affito (single-t)
const READ_COLLECTION = 'affitto_data';
const WRITE_COLLECTION = 'affito';
const PROJECTION = {
    _id: 1,
    type: 1,
    description: 1,
    stateMaloi: 1,
    mLastUpdate: 1,
    'feature.province': 1,
    'feature.type': 1,
    'properties.surfaceValue': 1,
    'properties.energy.class.name': 1,
    'realEstatePage.title': 1,
    'realEstatePage.contractValue': 1,
    'realEstatePage.price.value': 1,
    'realEstatePage.price.formattedValue': 1,
};
function toDTO(doc) {
    return {
        id: doc._id,
        title: doc.realEstatePage?.title ?? '',
        price: doc.realEstatePage?.price?.value ?? 0,
        priceFormatted: doc.realEstatePage?.price?.formattedValue ?? '',
        energyClass: doc.properties?.energy?.class?.name,
        surfaceValue: doc.properties?.surfaceValue,
        contractValue: doc.realEstatePage?.contractValue ?? '',
        province: doc.feature?.province ?? '',
        type: doc.feature?.type ?? doc.type ?? '',
        stateMaloi: doc.stateMaloi,
        description: doc.description,
        mLastUpdate: doc.mLastUpdate,
    };
}
function isValidState(v) {
    return v === 0 || v === 1 || v === 2;
}
// GET / — paginated listings
router.get('/', async (req, res) => {
    try {
        const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit ?? '20'), 10) || 20));
        const { province, type, stateMaloi, sortField, sortOrder } = req.query;
        const filter = {};
        if (province && typeof province === 'string')
            filter['feature.province'] = province;
        if (type && typeof type === 'string')
            filter['feature.type'] = type;
        if (stateMaloi === '0' || stateMaloi === '1' || stateMaloi === '2') {
            filter.stateMaloi = parseInt(stateMaloi, 10);
        }
        else if (stateMaloi === 'empty') {
            filter.$or = [{ stateMaloi: { $exists: false } }, { stateMaloi: null }];
        }
        const sort = {};
        const order = sortOrder === 'asc' ? 1 : -1;
        if (sortField === 'price') {
            sort['realEstatePage.price.value'] = order;
        }
        else if (sortField === 'surfaceValue') {
            sort['properties.surfaceValue'] = order;
        }
        const db = await (0, mongo_1.getDb)();
        const collection = db.collection(READ_COLLECTION);
        const total = await collection.countDocuments(filter);
        const cursor = collection
            .find(filter)
            .project(PROJECTION)
            .skip((page - 1) * limit)
            .limit(limit);
        if (Object.keys(sort).length > 0)
            cursor.sort(sort);
        const docs = await cursor.toArray();
        const data = docs.map(toDTO);
        const response = {
            data,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
        res.json(response);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
});
// PATCH /:id/state — update stateMaloi
router.patch('/:id/state', async (req, res) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }
        const { stateMaloi } = req.body ?? {};
        if (!isValidState(stateMaloi)) {
            res.status(400).json({ error: 'stateMaloi must be 0, 1, or 2' });
            return;
        }
        const db = await (0, mongo_1.getDb)();
        await db.collection(WRITE_COLLECTION).updateOne({ _id: id }, {
            $set: {
                stateMaloi,
                mLastUpdate: Date.now() / 1000,
                userUpdate: req.user?.email,
            },
        });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update state' });
    }
});
// PATCH /:id/description — update description
router.patch('/:id/description', async (req, res) => {
    try {
        const id = parseInt(String(req.params.id), 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: 'Invalid id' });
            return;
        }
        const description = req.body?.description;
        if (typeof description !== 'string' || description.trim().length === 0) {
            res.status(400).json({ error: 'description must be a non-empty string' });
            return;
        }
        const db = await (0, mongo_1.getDb)();
        await db.collection(WRITE_COLLECTION).updateOne({ _id: id }, {
            $set: {
                description: description.trim(),
                mLastUpdate: Date.now() / 1000,
                userUpdate: req.user?.email,
            },
        });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update description' });
    }
});
// POST /bulk-state — bulk update stateMaloi
router.post('/bulk-state', async (req, res) => {
    try {
        const { ids, stateMaloi } = req.body ?? {};
        if (!Array.isArray(ids) || ids.length < 1 || ids.length > 500) {
            res.status(400).json({ error: 'ids must be an array of length 1-500' });
            return;
        }
        if (!isValidState(stateMaloi)) {
            res.status(400).json({ error: 'stateMaloi must be 0, 1, or 2' });
            return;
        }
        const numericIds = ids.map((i) => Number(i)).filter((i) => !Number.isNaN(i));
        if (numericIds.length === 0) {
            res.status(400).json({ error: 'ids must contain valid numbers' });
            return;
        }
        const db = await (0, mongo_1.getDb)();
        const result = await db.collection(WRITE_COLLECTION).updateMany({ _id: { $in: numericIds } }, {
            $set: {
                stateMaloi,
                mLastUpdate: Date.now() / 1000,
                userUpdate: req.user?.email,
            },
        });
        res.json({ success: true, updated: result.modifiedCount });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to bulk update state' });
    }
});
exports.default = router;
//# sourceMappingURL=listings.js.map