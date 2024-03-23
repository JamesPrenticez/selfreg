import { baseApi } from './baseApi';
import { ISuccessResult, ILoginDeatils, IUser } from '@models';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<ISuccessResult<IUser>, ILoginDeatils>({
      query: ({ email, password }) => ({
        url: '/signIn',
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
  useSignInMutation
} = authApi;