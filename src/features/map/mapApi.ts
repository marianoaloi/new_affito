import { baseApi } from '../../app/api';
import type { MapListingDTO } from '../../types';

export const mapApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMapListings: builder.query<MapListingDTO[], { province: string; type?: string }>({
      query: ({ province, type }) => {
        const params = new URLSearchParams({ province });
        if (type) params.set('type', type);
        return `listings/map?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMapListingsQuery, useLazyGetMapListingsQuery } = mapApi;
