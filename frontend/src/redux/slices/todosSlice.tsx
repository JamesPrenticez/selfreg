import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ITodo } from '@models';
import { getTodos } from '../thunk/todosThunk';

interface TodosState {
  status: 'idle' | 'pending' | 'success' | 'failed';
  payload: ITodo[] | undefined;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: TodosState = {
  status: 'idle',
  payload: undefined,
  isLoading: false,
  isSaving: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateTodosPayload: (state, action: PayloadAction<ITodo[]>) => {
      if (state.payload) {
        state.payload = { ...state.payload, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        state.status = "success";
        state.payload = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = 'An error occurred';
      });
  }
});

// export const accountActions = todosSlice.actions;
export const { updateTodosPayload } = todosSlice.actions;

export default todosSlice;