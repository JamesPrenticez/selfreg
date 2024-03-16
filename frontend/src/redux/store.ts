
import { configureStore } from '@reduxjs/toolkit'

import {
  userSlice,
  habitsSlice,
} from "./slices"

import { 
  authApi,
  userApi,
} from "./services"

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,        
    habits: habitsSlice.reducer,        
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      // make sure to also add more apis here
    ), 
    devTools: process.env.NODE_ENV !== 'development' ? false : true,
});
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist <--- this
// https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration