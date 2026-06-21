export type StateMaloi = 0 | 1 | 2;

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
}

export interface ListingsQuery {
  page?: number;
  limit?: number;
  province?: string;
  type?: string;
  stateMaloi?: string;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
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
