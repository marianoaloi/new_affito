import { baseApi } from '../../app/api';
import type { ListingsQuery, ListingsResponse, StateMaloi } from '../../types';

interface MutationResult {
  success: boolean;
}

interface BulkResult {
  success: boolean;
  updated: number;
}

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query<ListingsResponse, ListingsQuery>({
      query: (params) => ({ url: 'listings', params }),
      providesTags: ['Listings'],
    }),
    updateState: builder.mutation<MutationResult, { id: number; stateMaloi: StateMaloi }>({
      query: ({ id, stateMaloi }) => ({
        url: `listings/${id}/state`,
        method: 'PATCH',
        body: { stateMaloi },
      }),
      invalidatesTags: ['Listings'],
    }),
    updateDescription: builder.mutation<MutationResult, { id: number; description: string }>({
      query: ({ id, description }) => ({
        url: `listings/${id}/description`,
        method: 'PATCH',
        body: { description },
      }),
      invalidatesTags: ['Listings'],
    }),
    bulkUpdateState: builder.mutation<BulkResult, { ids: number[]; stateMaloi: StateMaloi }>({
      query: ({ ids, stateMaloi }) => ({
        url: 'listings/bulk-state',
        method: 'POST',
        body: { ids, stateMaloi },
      }),
      invalidatesTags: ['Listings'],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useUpdateStateMutation,
  useUpdateDescriptionMutation,
  useBulkUpdateStateMutation,
} = listingsApi;
