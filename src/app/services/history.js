import { apiSlice } from '../apiSlice';

export const history = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFileHistory: builder.query({
      query: (status_id) => ({
        url: 'files/getFileHistory',
        method: 'POST',
        body: status_id,
      }),
      providesTags: ['FileCheck'],
      // invalidatesTags: [''],
      transformResponse: (response) => {
        return response.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
      },
    }),
    getUserFilesHistory: builder.query({
      query: (user_id) => ({
        url: `files/getUserCheckHistory/${user_id}`,
        method: 'GET',
      }),
      providesTags: ['FileCheck'],
      // invalidatesTags: [''],
      transformResponse: (response) => {
        return response.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
      },
    }),
  }),
});

export const { useLazyGetUserFilesHistoryQuery, useGetFileHistoryQuery,useLazyGetFileHistoryQuery } =
  history;
