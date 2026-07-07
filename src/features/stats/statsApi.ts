import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SummaryResponse, StatisticResponse, FeaturedListingDTO } from '../../types';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getSummary: builder.query<SummaryResponse, void>({
      query: () => 'public/stats/summary',
    }),
    getStatisticGroups: builder.query<StatisticResponse, void>({
      query: () => 'public/stats/statistic',
    }),
    getFeatured: builder.query<FeaturedListingDTO[], void>({
      query: () => 'public/featured',
    }),
  }),
});

export const { useGetSummaryQuery, useGetStatisticGroupsQuery, useGetFeaturedQuery } = statsApi;
