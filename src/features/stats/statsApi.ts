import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SummaryResponse } from '../../types';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getSummary: builder.query<SummaryResponse, void>({
      query: () => 'public/stats/summary',
    }),
  }),
});

export const { useGetSummaryQuery } = statsApi;
