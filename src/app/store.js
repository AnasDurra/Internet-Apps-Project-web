import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './apiSlice';
import middleware from './store middlewares/auth-middleware';
import authMiddleware from './store middlewares/auth-middleware';
import apiError from './store middlewares/api-error';

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(authMiddleware).concat(apiError),
});
