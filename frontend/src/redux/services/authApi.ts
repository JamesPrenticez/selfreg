import { baseApi } from './baseApi';
import { ISuccessResult, ILoginDeatils, IUser, IRegisterDeatils } from '@models';
import { logoutUser } from '@redux/slices';

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
    logout: builder.mutation<ISuccessResult<null>, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // After logout succeeds, reset the user state to null
          dispatch(logoutUser());
        } catch(error: any) {
          console.log("Error during logout", error)
        }
      },
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
  useLogoutMutation,
  useRegisterMutation,
} = authApi;