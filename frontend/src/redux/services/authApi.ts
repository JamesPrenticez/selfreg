import { baseApi } from './baseApi';
import { ISuccessResult, ILoginDeatils, IUser, IRegisterDeatils } from '@models';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ISuccessResult<IUser>, ILoginDeatils>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        queryKey: 'getUser',
        providesTags: ['User']
      }),
    }),
    register: builder.mutation<ISuccessResult<IUser>, IRegisterDeatils>({
      query: ({ email, password }) => ({
        url: '/register',
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        queryKey: 'getUser',
        providesTags: ['User']
      }),
    }),
  }),
});

export const { 
  useLoginMutation,
  useRegisterMutation,
} = authApi;