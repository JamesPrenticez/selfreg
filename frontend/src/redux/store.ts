
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import initialState from '@redux/redux-persist-initial-state';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import {
  userSlice,
  todosSlice,
  weekSlice
} from "./slices"

const reducers = combineReducers({
    user: userSlice.reducer,        
    todos: todosSlice.reducer,        
    week: weekSlice.reducer,         
 });
 
 const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, reducers);
 
// Load the persisted state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('persisted-state-key'); // your local storage key
    if (serializedState === null) {
      return initialState; // Use the initial state if no data is found
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState; // Handle any potential errors by using the initial state
  }
};

export const store = configureStore({
    reducer: persistedReducer,
    preloadedState: loadState(), // Initialize the store with hydrated state
    devTools:  process.env.NODE_ENV !== "development" ? false : true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist <--- this
// https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration