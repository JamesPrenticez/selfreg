import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IStatus, IUser } from '@models';
import { getUser } from '../thunk/userThunk';

interface UserState {
  status: IStatus;
  data: IUser | undefined;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: UserState = {
  status: 'idle',
  // TODO - Set this back to undefinded once we have implemented a authentication flow
  // need to handle a get locale also
  data: {
    _id: "123456",
    email: "james.prentice@gmail.com",
    firstName: "james",
    lastName: "prentice",
    phone: "123456789",
    profilePicture: undefined,
    locale: 'en-gb',
    country: "New Zealand",
  },
  isLoading: false,
  isSaving: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // updateUserPayload: (state, action: PayloadAction<Partial<IUser>>) => {
    //   if (state.data) {
    //     state.data = { ...state.data, ...action.payload };
    //   }
    // },
    setLocale: (state, action) => {
      if(state.data){
        state.data.locale = action.payload;
      }
    }
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
        state.data = action.payload;
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
export const { 
  setLocale,
  // updateUserPayload
} = userSlice.actions;

export default userSlice;