import { Router, Response } from 'express';
import { Filter, Document } from 'mongodb';
import { getDb } from '../db/mongo';
import { AuthRequest } from '../middleware/auth';
import { ListingDTO, ListingDetailDTO, ListingPhoto, ListingsResponse, StateMaloi } from '../types/index';

const router = Router();

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
  'feature.featureList.elevator': 1,
  'feature.primaryFeatures.Accesso_per_disabili': 1,
  'properties.surfaceValue': 1,
  'properties.energy.class.name': 1,
  'properties.elevator': 1,
  'properties.floor': 1,
  'properties.photo': 1,
  'realEstatePage.title': 1,
  'realEstatePage.contractValue': 1,
  'realEstatePage.price.value': 1,
  'realEstatePage.price.formattedValue': 1,
};

function mapType(raw: string): string {
  if (raw === 'a') return 'Affito';
  if (raw === 'c') return 'Compra';
  return raw;
}

function toDTO(doc: Document): ListingDTO {
  return {
    id: doc._id,
    title: doc.realEstatePage?.title ?? '',
    price: doc.realEstatePage?.price?.value ?? 0,
    priceFormatted: doc.realEstatePage?.price?.formattedValue ?? '',
    energyClass: doc.properties?.energy?.class?.name,
    surfaceValue: doc.properties?.surfaceValue,
    contractValue: doc.realEstatePage?.contractValue ?? '',
    province: doc.feature?.province ?? '',
    type: mapType(doc.feature?.type ?? doc.type ?? ''),
    stateMaloi: doc.stateMaloi,
    description: doc.description,
    mLastUpdate: doc.mLastUpdate,
    floor: doc.properties?.floor
      ? { abbreviation: doc.properties.floor.abbreviation ?? null, value: doc.properties.floor.value }
      : undefined,
    elevator: doc.properties?.elevator,
    featureElevator: doc.feature?.featureList?.elevator,
    accessibility: doc.feature?.primaryFeatures?.Accesso_per_disabili ?? null,
    photo: doc.properties?.photo,
  };
}

function isValidState(v: unknown): v is StateMaloi {
  return v === 0 || v === 1 || v === 2;
}

// GET / — paginated listings
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(req.query.limit ?? '20'), 10) || 20)
    );
    const { province, type, stateMaloi, sortField, sortOrder, accessibility, elevator, terra } = req.query;

    const andClauses: Filter<Document>[] = [];
    if (province && typeof province === 'string') andClauses.push({ 'feature.province': province });
    if (type && typeof type === 'string') andClauses.push({ 'feature.type': type });

    if (stateMaloi === '0' || stateMaloi === '1' || stateMaloi === '2') {
      andClauses.push({ stateMaloi: parseInt(stateMaloi, 10) });
    } else if (stateMaloi === 'empty') {
      andClauses.push({ $or: [{ stateMaloi: { $exists: false } }, { stateMaloi: null }] });
    }

    if (accessibility === 'accessible') {
      andClauses.push({ 'feature.primaryFeatures.Accesso_per_disabili': 1 });
    } else if (accessibility === 'not_accessible') {
      andClauses.push({ 'feature.primaryFeatures.Accesso_per_disabili': 0 });
    } else if (accessibility === 'no_info') {
      andClauses.push({ $or: [{ 'feature.primaryFeatures.Accesso_per_disabili': null }, { 'feature.primaryFeatures.Accesso_per_disabili': { $exists: false } }] });
    }

    if (elevator === 'has') {
      andClauses.push({ 'properties.elevator': true });
    } else if (elevator === 'no') {
      andClauses.push({ 'properties.elevator': false });
    } else if (elevator === 'no_info') {
      andClauses.push({ $or: [{ 'properties.elevator': null }, { 'properties.elevator': { $exists: false } }] });
    }

    if (terra === 'true') {
      andClauses.push({ 'properties.floor.abbreviation': /t/i });
    }

    const filter: Filter<Document> = andClauses.length > 0 ? { $and: andClauses } : {};

    const sort: Record<string, 1 | -1> = {};
    const order: 1 | -1 = sortOrder === 'asc' ? 1 : -1;
    if (sortField === 'price') {
      sort['realEstatePage.price.value'] = order;
    } else if (sortField === 'surfaceValue') {
      sort['properties.surfaceValue'] = order;
    }

    const db = await getDb();
    const collection = db.collection(READ_COLLECTION);

    const total = await collection.countDocuments(filter);
    const cursor = collection
      .find(filter)
      .project(PROJECTION)
      .skip((page - 1) * limit)
      .limit(limit);
    if (Object.keys(sort).length > 0) cursor.sort(sort);

    const docs = await cursor.toArray();
    const data = docs.map(toDTO);

    const response: ListingsResponse = {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// GET /:id — full listing detail with all photos
router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = parseInt(String(req.params.id), 10);
    if (Number.isNaN(id)) {
      res.status(400).json({ error: 'Invalid id' });
      return;
    }

    const db = await getDb();
    const doc = await db.collection(READ_COLLECTION).findOne(
      { _id: id as unknown as Document['_id'] },
      {
        projection: {
          _id: 1, type: 1, description: 1, stateMaloi: 1, mLastUpdate: 1,
          // feature
          'feature.province': 1, 'feature.type': 1,
          'feature.featureList': 1,
          'feature.primaryFeatures': 1,
          // properties – specs
          'properties.surfaceValue': 1,
          'properties.buildingYear': 1,
          'properties.garage': 1,
          'properties.availability': 1,
          'properties.caption': 1,
          'properties.description': 1,
          // properties – floor + elevator
          'properties.elevator': 1,
          'properties.floor': 1,
          // properties – energy
          'properties.energy': 1,
          // properties – costs
          'properties.costs.condominiumExpenses': 1,
          'properties.costs.heatingExpenses': 1,
          // properties – rent
          'properties.rent.deposit': 1,
          'properties.rent.availableToStudents': 1,
          // properties – location
          'properties.location.address': 1,
          'properties.location.city': 1,
          'properties.location.macrozone': 1,
          'properties.location.microzone': 1,
          // properties – media
          'properties.photo': 1,
          'properties.multimedia.photos': 1,
          // realEstatePage
          'realEstatePage.title': 1,
          'realEstatePage.contractValue': 1,
          'realEstatePage.price': 1,
          'realEstatePage.createdAt': 1,
          'realEstatePage.updatedAt': 1,
        },
      }
    );

    if (!doc) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    const rawPhotos: Document[] = doc.properties?.multimedia?.photos ?? [];
    const photos: ListingPhoto[] = rawPhotos
      .filter((p: Document) => p?.urls?.small)
      .map((p: Document) => ({
        id: p.id ?? 0,
        caption: p.caption,
        urls: {
          thumb: p.urls.thumb ?? '',
          small: p.urls.small ?? '',
          medium: p.urls.medium ?? p.urls.small ?? '',
          large: p.urls.large ?? p.urls.small ?? '',
        },
      }));

    const pf = doc.feature?.primaryFeatures ?? {};
    const fl = doc.feature?.featureList ?? {};
    const boolPF = (key: string): boolean | undefined => {
      const v = pf[key];
      return v != null ? v === 1 : undefined;
    };

    const detail: ListingDetailDTO = {
      ...toDTO(doc),
      photos,
      // Location
      address: doc.properties?.location?.address ?? null,
      city: doc.properties?.location?.city,
      macrozone: doc.properties?.location?.macrozone ?? null,
      microzone: doc.properties?.location?.microzone ?? null,
      // Specs
      availability: doc.properties?.availability,
      caption: doc.properties?.caption,
      propertyDescription: doc.properties?.description,
      rooms: fl.rooms,
      bathrooms: fl.bathrooms,
      furniture: fl.furniture,
      buildingYear: doc.properties?.buildingYear,
      garage: doc.properties?.garage,
      // Costs
      condominiumExpenses: doc.properties?.costs?.condominiumExpenses,
      heatingExpenses: doc.properties?.costs?.heatingExpenses,
      deposit: doc.properties?.rent?.deposit ?? null,
      availableToStudents: doc.properties?.rent?.availableToStudents,
      // Energy
      heatingType: doc.properties?.energy?.heatingType,
      airConditioning: doc.properties?.energy?.airConditioning,
      epi: doc.properties?.energy?.epi,
      epiUm: doc.properties?.energy?.epiUm,
      pricePerSquareMeter: doc.realEstatePage?.price?.pricePerSquareMeter,
      // Feature flags
      hasBalcony: boolPF('balcone'),
      hasTerrace: boolPF('terrazza'),
      hasCellar: boolPF('cantina'),
      hasGarden: boolPF('Giardino_privato') ?? boolPF('Giardino_comune'),
      hasPool: boolPF('piscina'),
      hasAlarm: boolPF('Impianto_di_allarme'),
      hasVideoIntercom: boolPF('videoCitofono'),
      hasSecureDoor: boolPF('Porta_blindata'),
      hasFiber: boolPF('Fibra_ottica'),
      // Dates
      createdAt: doc.realEstatePage?.createdAt,
      updatedAt: doc.realEstatePage?.updatedAt,
    };

    res.json(detail);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
});

// PATCH /:id/state — update stateMaloi
router.patch('/:id/state', async (req: AuthRequest, res: Response): Promise<void> => {
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

    const db = await getDb();
    await db.collection(WRITE_COLLECTION).updateOne(
      { _id: id as unknown as Document['_id'] },
      {
        $set: {
          stateMaloi,
          mLastUpdate: Date.now() / 1000,
          userUpdate: req.user?.email,
        },
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update state' });
  }
});

// PATCH /:id/description — update description
router.patch('/:id/description', async (req: AuthRequest, res: Response): Promise<void> => {
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

    const db = await getDb();
    await db.collection(WRITE_COLLECTION).updateOne(
      { _id: id as unknown as Document['_id'] },
      {
        $set: {
          description: description.trim(),
          mLastUpdate: Date.now() / 1000,
          userUpdate: req.user?.email,
        },
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update description' });
  }
});

// POST /bulk-state — bulk update stateMaloi
router.post('/bulk-state', async (req: AuthRequest, res: Response): Promise<void> => {
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

    const db = await getDb();
    const result = await db.collection(WRITE_COLLECTION).updateMany(
      { _id: { $in: numericIds as unknown as Document['_id'][] } },
      {
        $set: {
          stateMaloi,
          mLastUpdate: Date.now() / 1000,
          userUpdate: req.user?.email,
        },
      }
    );
    res.json({ success: true, updated: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to bulk update state' });
  }
});

export default router;
