import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    credentials: 'same-origin',
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken');
      console.log('token', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Folder'],
});
