import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ITodo } from '@models';
import { getUser } from '../thunk/userThunk';

interface TodosState {
  status: 'idle' | 'pending' | 'success' | 'failed';
  payload: ITodo[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: TodosState = {
  status: 'idle',
  payload: [
    {
      _id: undefined,
      user_id: undefined,
      task_name: undefined,
      slug: undefined,
      color: undefined,
      bgcolor: undefined,
      icon: undefined,
      successIcon: undefined,
      errorIcon: undefined,
      description: undefined,
      created_at: undefined,
      days: undefined,
    }
  ],
  isLoading: false,
  isSaving: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUserDetails: (state, action: PayloadAction<Partial<ITodo>>) => {
      state.payload = { ...state.payload, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        // console.log("Fulfilled action:", action);
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

export const accountActions = userSlice.actions;

export default userSlice;