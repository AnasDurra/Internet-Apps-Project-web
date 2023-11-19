import { apiSlice } from '../apiSlice';

export const folders = apiSlice.injectEndpoints({
  tagTypes: ['Folder'],

  endpoints: (builder) => ({
    create: builder.query({
      query: (data) => ({
        url: 'folders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Folder'],
    }),

    get: builder.query({
      query: () => ({
        url: 'folders',
        method: 'get',
      }),
      providesTags: ['Folder'],
    }),

    update: builder.mutation({
      query: (data) => ({
        url: `folders/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Folder'],
    }),

    delete: builder.mutation({
      query: (id) => ({
        url: `folders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Folder'],
    }),
  }),
});

export const {
  useCreateQuery,
  useDeleteMutation,
  useGetQuery,
  useLazyCreateQuery,
  useLazyGetQuery,
  useUpdateMutation,
} = folders;
