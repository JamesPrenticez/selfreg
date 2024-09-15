import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKey, type IUser } from '@models';
import { authApi, userApi } from '@redux/services';
import { getFromLocalStorage, saveToLocalStorage } from '@utils';

export interface UserState {
  data: IUser;
  spaToken: string | null;
}

const initialState: UserState = {
  data: getFromLocalStorage(LocalStorageKey.USER_DATA) || {
    id: "",
    email: "",
    dateCreated: null,
    lastModified: null,
    type: null
  },
  spaToken: localStorage.getItem(LocalStorageKey.SPA_TOKEN) || null, 
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLocale: (state, action) => {
      if (state.data) {
        state.data.locale = action.payload;
        saveToLocalStorage(LocalStorageKey.USER_DATA, state.data);
      }
    },
    updateUser: (state, action: PayloadAction<Partial<IUser> | null>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
        saveToLocalStorage(LocalStorageKey.USER_DATA, state.data);
      }
    },
    updateUserField: (state, action: PayloadAction<{ key: keyof IUser, value: any }>) => {
      const { key, value } = action.payload;
      if (key in state.data) {
        (state.data as any)[key] = value; // Use type assertion to narrow down the type
        saveToLocalStorage(LocalStorageKey.USER_DATA, state.data);
      }
    },
    setSpaToken: (state, action: PayloadAction<string | null>) => {
      state.spaToken = action.payload;
      if (action.payload) {
        localStorage.setItem(LocalStorageKey.SPA_TOKEN, action.payload); 
      } else {
        localStorage.removeItem(LocalStorageKey.SPA_TOKEN);
      }
    },
    logoutUser(state) {
      state.data = {} as IUser;
      state.spaToken = null;
      saveToLocalStorage(LocalStorageKey.USER_DATA, {} as IUser);
      localStorage.removeItem(LocalStorageKey.SPA_TOKEN);
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
        saveToLocalStorage(LocalStorageKey.USER_DATA, state.data); // Persist to local storage
      }
    );
  },
});

export const { 
  logoutUser,
  setLocale,
  updateUser,
  updateUserField,
  setSpaToken
} = userSlice.actions;

export default userSlice;
