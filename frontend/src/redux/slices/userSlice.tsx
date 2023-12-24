import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@models';
import { userApi } from '@redux/services';

export interface UserState {
  data: IUser | null;
  isAuthenticated: boolean, 
  token: string | null,
  isDemoAccount: boolean,
}

const initialState: UserState = {
  data: null,
  isAuthenticated: false, 
  token: null,
  isDemoAccount: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLocale: (state, action) => {
      if(state.data){
        state.data.locale = action.payload;
      }
    },
    updateUser: (state, action: PayloadAction<Partial<IUser>>) => {
      if(state.data){
        state.data = { ...state.data, ...action.payload };
      }
    },
    updateUserField: (state, action: PayloadAction<{ key: keyof IUser, value: any }>) => {
      if(state.data){
        const { key, value } = action.payload;
        if (key in state.data) {
          state.data[key] = value;
        }
      }
    },
    setDemoUser(state, action) {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.token = 'YOUR_FAKE_JWT_TOKEN'; // Replace with your generated JWT token
      state.isDemoAccount = action.payload.isDemo || false;
    },
    logoutUser(state) {
      state.data = {} as IUser;
      state.isAuthenticated = false;
      state.token = null;
      state.isDemoAccount = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getUserDetails.matchFulfilled,
        (state, { payload }) => {
          state.data = payload;
        }
      );
  }
});

export const { 
  setDemoUser,
  logoutUser,
  setLocale,
  updateUser,
  updateUserField
} = userSlice.actions;

export default userSlice;