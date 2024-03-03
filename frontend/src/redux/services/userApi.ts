import { createApi } from '@reduxjs/toolkit/query/react'
import { IHabit, IUser } from '@models';
import { updateUserField, userSlice } from '@redux/slices';
import { RootState } from '@redux/store';
import { axiosBaseQuery } from './axiosBaseQuery';

// TODO typesafe url params with an interface

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUserDetails: builder.query<IUser, { user_id: string }>({
      query: ({ user_id }) => ({ 
        url: `users/${user_id}`,
        method: 'GET'
      })
    }), 
    getUserHabits: builder.query<IHabit[], { user_id: string }>({
      query: ({ user_id }) => ({ 
        url: `users/${user_id}/habits`,
        method: 'GET'
      })
    }), 
    updateUserDetails: builder.mutation<IUser, Partial<IUser> | { key: keyof IUser, value: any }>({
      query: (update) => ({
        url: 'user',
        method: 'PUT',
        data: ('key' in update) && {
          [update.key]: update.value,
        }
      }),
      async onQueryStarted(update, { dispatch, queryFulfilled, getState }) {
        // Optimistic Updating
        // Save the current user state before the update
        const previousUser = (getState() as RootState).user.data;

        // Check if the update contains a single field or multiple fields
        if ('key' in update) {
          // Single Field at a time
          dispatch(updateUserField(update));
        } else {
          // All fields at once
          dispatch(userSlice.actions.updateUser(update));
        }
        
        try {
          // Wait for the query to be fulfilled
          await queryFulfilled;
        } catch {
          // If the query fails, roll back to the previous state
          dispatch(userSlice.actions.updateUser(previousUser));
        }
      },
    }),

  }),
});

export const { 
  useGetUserDetailsQuery,
  useGetUserHabitsQuery,
  useUpdateUserDetailsMutation
} = userApi;
