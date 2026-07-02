export type StateMaloi = 0 | 1 | 2;

export interface ListingPhoto {
  id: number;
  caption?: string;
  urls: { thumb: string; small: string; medium: string; large: string };
}

export interface ListingDetailDTO extends ListingDTO {
  photos: ListingPhoto[];
  // Location
  address?: string | null;
  city?: string;
  macrozone?: string | null;
  microzone?: string | null;
  // Specs
  availability?: string;
  caption?: string;
  propertyDescription?: string;
  rooms?: string;
  bathrooms?: string;
  furniture?: string;
  buildingYear?: number;
  garage?: string;
  // Costs
  condominiumExpenses?: string;
  heatingExpenses?: string;
  deposit?: string | null;
  availableToStudents?: boolean;
  // Energy
  heatingType?: string;
  airConditioning?: string;
  epi?: string | number;
  epiUm?: string;
  pricePerSquareMeter?: string;
  // Feature flags (primaryFeatures)
  hasBalcony?: boolean;
  hasTerrace?: boolean;
  hasCellar?: boolean;
  hasGarden?: boolean;
  hasPool?: boolean;
  hasAlarm?: boolean;
  hasVideoIntercom?: boolean;
  hasSecureDoor?: boolean;
  hasFiber?: boolean;
  // Dates
  createdAt?: number;
  updatedAt?: number;
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

export interface StatisticGroup {
  province: string;
  type: string; // 'A' = Affitto | 'C' = Compra
  total: number;
  // Accesso_per_disabili: 1=si, 0=no, undefined=senza
  disable_si: number;
  disable_no: number;
  disable_senza: number;
  // stateMaloi: 1=si, 0=no, 2=cosi, undefined=senza
  state_si: number;
  state_no: number;
  state_cosi: number;
  state_senza: number;
  // elevator: true=si, false=no, undefined=senza
  elevator_si: number;
  elevator_no: number;
  elevator_senza: number;
}

export interface StatisticResponse {
  groups: StatisticGroup[];
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
  stateMaloi?: 0 | 1 | 2;
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
  floor?: { abbreviation?: string | null; value?: string };
  surfaceValue?: string;
  elevator?: boolean;
  featureElevator?: string;
  accessibility?: number | null;
  elevation?: number | null;
  photos: MapListingPhoto[];
}
