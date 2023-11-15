import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import store from '../store.js';
import { apiSlice } from '../apiSlice';

export const auth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.query({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),

    refresh: builder.query({
      query: (refresh_token) => ({
        url: 'auth/refresh',
        method: 'POST',
        body: refresh_token,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useProtectedMutation,
  useLogoutMutation,
  useSignupQuery,
} = auth;
