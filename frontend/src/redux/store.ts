
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist'

import {
  userSlice,
  todosSlice,
  weekSlice
} from "./slices"

import { 
  userApi,
} from "./services"

const reducers = combineReducers({
  user: userSlice.reducer,        
  todos: todosSlice.reducer,        
  week: weekSlice.reducer,         
  [userApi.reducerPath]: userApi.reducer,
 });
 
 const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, reducers);
 
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'development' ? false : true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware), // Add the middleware for Redux Toolkit Query
});
  
// Not required for persistance but gives us utility to purge the store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist <--- this
// https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration