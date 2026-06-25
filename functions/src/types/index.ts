export type StateMaloi = 0 | 1 | 2;

export interface ListingPhoto {
  id: number;
  caption?: string;
  urls: { thumb: string; small: string; medium: string; large: string };
}

export interface ListingDTO {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
  energyClass?: string;
  surfaceValue?: string;
  contractValue: string;
  province: string;
  type: string;
  stateMaloi?: StateMaloi;
  description?: string;
  mLastUpdate?: number;
  floor?: { abbreviation?: string | null; value?: string };
  elevator?: boolean;
  featureElevator?: string;
  accessibility?: number | null;
  photo?: ListingPhoto;
}

export interface MapListingPhoto {
  small: string;
  large: string;
}

export interface MapListingDTO {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
  contractValue: string;
  province: string;
  type: string;
  stateMaloi?: StateMaloi;
  description?: string;
  mLastUpdate?: number;
  createdAt: number;
  updatedAt: number;
  location: {
    latitude: number | null;
    longitude: number | null;
    address?: string | null;
    province: string;
  };
  floor?: {
    abbreviation?: string | null;
    value?: string;
  };
  surfaceValue?: string;
  elevator?: boolean;
  featureElevator?: string;
  accessibility?: number | null;
  elevation?: number | null;
  photos: MapListingPhoto[];
}

export interface ListingsQuery {
  page?: number;
  limit?: number;
  province?: string;
  type?: string;
  stateMaloi?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  accessibility?: string;
  elevator?: string;
  terra?: string;
}

export interface ListingsResponse {
  data: ListingDTO[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface SummaryGroup {
  province: string;
  type: string;
  total: number;
  accept: number;
  deny: number;
  wait: number;
  emptyChoise: number;
  elevator: number;
}

export interface SummaryResponse {
  groups: SummaryGroup[];
  totals: {
    total: number;
    accept: number;
    deny: number;
    wait: number;
    emptyChoise: number;
  };
}
