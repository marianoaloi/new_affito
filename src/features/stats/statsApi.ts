import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SummaryResponse, StatisticResponse } from '../../types';

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
  }),
});

export const { useGetSummaryQuery, useGetStatisticGroupsQuery } = statsApi;
