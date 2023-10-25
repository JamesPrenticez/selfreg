import { configureStore } from '@reduxjs/toolkit'

import {
  userSlice,
  todosSlice,
  weekSlice
} from "./slices"

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,        
        todos: todosSlice.reducer,        
        week: weekSlice.reducer,        
    },
    devTools:  process.env.NODE_ENV !== "development" ? false : true,
  })
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
