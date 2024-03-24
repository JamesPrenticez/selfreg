import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '@models';
import { authApi, userApi } from '@redux/services';

export interface UserState {
  data: IUser;
}

const initialState: UserState = {
  data: {
    id: "",
    email: "",
    dateCreated: "",
    lastModified: ""
  },
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
    updateUser: (state, action: PayloadAction<Partial<IUser> | null>) => {
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
    logoutUser(state) {
      state.data = {} as IUser;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return (
          userApi.endpoints.getUser.matchFulfilled(action) ||
          authApi.endpoints.login.matchFulfilled(action) ||
          authApi.endpoints.register.matchFulfilled(action)
        );
      },
      (state, action) => {
        state.data = action.payload.data;
      }
    );
  },
});

export const { 
  logoutUser,
  setLocale,
  updateUser,
  updateUserField
} = userSlice.actions;

export default userSlice;