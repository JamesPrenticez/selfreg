import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './userAPI';
import { type IUser } from '../modals/IUser'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    payload: null as IUser | null,
    status: "",
    isLoading: false,
  },
  reducers: {
    setPayload: (state, action) =>{
      state.payload = action.payload
    },
  }, 
  extraReducers: {
    [fetchUser.pending.type]: (state, action) => {
      state.status = "pending"
      state.isLoading = true
    },
    [fetchUser.fulfilled.type]: (state, { payload }) => {
      state.status = "success"
      // state.todos = payload //  dont do this or you replace your data ='(
      state.isLoading = false
    },
    [fetchUser.rejected.type]: (state, action) => {
      state.status = "failed"
      state.isLoading = false
    }
  },
});

export const {
  setPayload,
} = userSlice.actions;

export default userSlice.reducer;

// https://www.youtube.com/watch?v=hBrE-QXIr4c