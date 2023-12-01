import Cookies from 'js-cookie';
import { apiSlice } from '../apiSlice';
import { jwtDecode } from 'jwt-decode';

export const auth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (responseData) => {
        Cookies.set('accessToken', responseData?.accessToken, {
          expires: 12,
        });
        Cookies.set('refreshToken', responseData?.accessToken, {
          expires: 12,
        });
        return responseData;
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (responseData) => {
        Cookies.set('accessToken', responseData?.accessToken, {
          expires: 12,
        });
        Cookies.set('refreshToken', responseData?.accessToken, {
          expires: 12,
        });
        return responseData;
      },
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

export const getLoggedInUser = () => {
  const token = Cookies.get('accessToken');
  const decodedToken = jwtDecode(token);

  return {
    username: decodedToken.username,
    full_name: decodedToken.full_name
  };
};

export const { useLoginMutation, useLogoutMutation, useSignupMutation } = auth;
