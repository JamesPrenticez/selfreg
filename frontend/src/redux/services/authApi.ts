import { baseApi } from './baseApi';
import { ISuccessResult, ILoginDeatils, IUser } from '@models';

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
  }),
});

export const { 
  useLoginMutation
} = authApi;