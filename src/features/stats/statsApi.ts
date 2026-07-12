import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApi } from '../../app/api';
import type { SummaryResponse, StatisticResponse, FeaturedListingDTO, StatisticRawDoc } from '../../types';

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

// Raw statistic docs need the Firebase token, so they ride on baseApi (authenticated),
// not on the public statsApi above.
export const rawStatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatisticRaw: builder.query<StatisticRawDoc[], void>({
      query: () => 'stats/raw',
    }),
  }),
});

export const { useGetStatisticRawQuery } = rawStatsApi;
