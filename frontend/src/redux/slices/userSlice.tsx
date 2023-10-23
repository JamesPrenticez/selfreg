import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@models';
import { getUser } from '../thunk/userThunk';

interface UserState {
  status: 'idle' | 'pending' | 'success' | 'failed';
  payload: IUser | undefined;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: UserState = {
  status: 'idle',
  // TODO - Set this back to undefinded once we have implemented a authentication flow
  payload: {
    _id: "123456",
    email: "james.prentice@gmail.com",
    firstName: "james",
    lastName: "prentice",
    location: "nz",
    phone: "123456789",
    profilePicture: undefined
  },
  isLoading: false,
  isSaving: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserPayload: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.payload) {
        state.payload = { ...state.payload, ...action.payload };
      }
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

// export const accountActions = userSlice.actions;
export const { updateUserPayload } = userSlice.actions;

export default userSlice;