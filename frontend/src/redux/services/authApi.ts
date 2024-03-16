import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';
import { ILoginDeatils } from '@models/auth';
import { IErrorResult, ISuccessResult } from '@models';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string }, ILoginDeatils>({
      query: ({ email, password }) => ({
        url: '/signIn',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
      }),
    }),
  }),
});

export const { 
  useSignInMutation
} = authApi;