import { apiSlice } from '../apiSlice';

export const users = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: 'users',
        method: 'get',
      }),
    }),
  }),
});

export const { useGetUsersQuery, } = users;
