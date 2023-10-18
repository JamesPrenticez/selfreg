import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@models';
import { getUser } from '../thunk/userThunk';

interface UserState {
  status: 'idle' | 'pending' | 'success' | 'failed';
  payload: IUser;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: UserState = {
  status: 'idle',
  payload: {
    _id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    location: undefined,
    profilePicture: undefined,
  },
  isLoading: false,
  isSaving: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<Partial<IUser>>) => {
      state.payload = { ...state.payload, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        // console.log("Fulfilled action:", action);
        state.status = "success";
        state.payload = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = 'An error occurred';
      });
  }
});

export const accountActions = userSlice.actions;

export default userSlice;