import { Router, Response } from 'express';
import { Filter, Document } from 'mongodb';
import { getDb } from '../db/mongo';
import { AuthRequest } from '../middleware/auth';
import { MapListingDTO, MapListingPhoto } from '../types/index';

const router = Router();

const READ_COLLECTION = 'affitto_data';

const MAP_PROJECTION = {
  _id: 1,
  type: 1,
  description: 1,
  stateMaloi: 1,
  mLastUpdate: 1,
  elevation: 1,
  'feature.province': 1,
  'feature.type': 1,
  'feature.featureList.elevator': 1,
  'feature.primaryFeatures.Accesso_per_disabili': 1,
  'properties.surfaceValue': 1,
  'properties.elevator': 1,
  'properties.floor': 1,
  'properties.location.latitude': 1,
  'properties.location.longitude': 1,
  'properties.location.address': 1,
  'properties.location.province': 1,
  'properties.multimedia.photos': 1,
  'realEstatePage.title': 1,
  'realEstatePage.contractValue': 1,
  'realEstatePage.price.value': 1,
  'realEstatePage.price.formattedValue': 1,
  'realEstatePage.createdAt': 1,
  'realEstatePage.updatedAt': 1,
};

function mapType(raw: string): string {
  if (raw === 'a') return 'Affito';
  if (raw === 'c') return 'Compra';
  return raw;
}

function toMapDTO(doc: Document): MapListingDTO {
  const rawPhotos: Document[] = doc.properties?.multimedia?.photos ?? [];
  const photos: MapListingPhoto[] = rawPhotos
    .filter((p) => p?.urls?.small)
    .map((p) => ({ small: p.urls.small as string, large: p.urls.large as string }));

  return {
    id: doc._id,
    title: doc.realEstatePage?.title ?? '',
    price: doc.realEstatePage?.price?.value ?? 0,
    priceFormatted: doc.realEstatePage?.price?.formattedValue ?? '',
    contractValue: doc.realEstatePage?.contractValue ?? '',
    province: doc.feature?.province ?? doc.properties?.location?.province ?? '',
    type: mapType(doc.feature?.type ?? doc.type ?? ''),
    stateMaloi: doc.stateMaloi,
    description: doc.description,
    mLastUpdate: doc.mLastUpdate,
    createdAt: doc.realEstatePage?.createdAt ?? 0,
    updatedAt: doc.realEstatePage?.updatedAt ?? 0,
    location: {
      latitude: doc.properties?.location?.latitude ?? null,
      longitude: doc.properties?.location?.longitude ?? null,
      address: doc.properties?.location?.address,
      province: doc.properties?.location?.province ?? doc.feature?.province ?? '',
    },
    floor: doc.properties?.floor
      ? {
          abbreviation: doc.properties.floor.abbreviation ?? null,
          value: doc.properties.floor.value,
        }
      : undefined,
    surfaceValue: doc.properties?.surfaceValue,
    elevator: doc.properties?.elevator,
    featureElevator: doc.feature?.featureList?.elevator,
    accessibility: doc.feature?.primaryFeatures?.Accesso_per_disabili ?? null,
    elevation: doc.elevation ?? null,
    photos,
  };
}

// GET / — all listings for province+type (no pagination, for map display)
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { province, type } = req.query;

    if (!province || typeof province !== 'string') {
      res.status(400).json({ error: 'province is required' });
      return;
    }

    const filter: Filter<Document> = {
      'feature.province': province,
    };
    if (type && typeof type === 'string') {
      filter['feature.type'] = type;
    }

    const db = await getDb();
    const docs = await db
      .collection(READ_COLLECTION)
      .find(filter)
      .project(MAP_PROJECTION)
      .toArray();

    const data: MapListingDTO[] = docs
      .filter((d) => d.properties?.location?.latitude && d.properties?.location?.longitude)
      .map(toMapDTO);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch map listings' });
  }
});

export default router;
