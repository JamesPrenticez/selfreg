import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IDay, ITodo } from '@models';
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
  name: 'todos',
  initialState: initialState,
  reducers: {
    updateTodosPayload: (state, action: PayloadAction<ITodo[]>) => {
      if (state.payload) {
        state.payload = { ...state.payload, ...action.payload };
      }
    },
    // updateTodoWithDays: (state, action: PayloadAction<{ todo_id: string; days: IDay[] }>) => {
    //   const { todo_id, days } = action.payload;
    //   const todoToUpdate = state.payload?.find((todo) => todo._id === todo_id);

    //   if (days === undefined || days === null) {
    //     return;
    //   }

    //   // Check if 'days' and initialize it to and empty arry before trying to preform concat on it..
    //   if (todoToUpdate) {
    //     if (!todoToUpdate.days) {
    //       todoToUpdate.days = [];
    //     }

    //     // Append the new data to the existing 'days' array 
    //     const newDaysArray = [...todoToUpdate.days, ...days];
    //     todoToUpdate.days = newDaysArray;
    //   }
    // },
    updateTodosWithDays: (state, action: PayloadAction<{ days: IDay[] }>) => {
      const { days } = action.payload;
    
      if (days === undefined || days === null) {
        return;
      }
    
      // Create a mapping of todo IDs to their respective days
      const todoDaysMap: Record<string, IDay[]> = {};
    
      days.forEach((day) => {
        if (day.todo_id) {
          if (!todoDaysMap[day.todo_id]) {
            todoDaysMap[day.todo_id] = [];
          }
          todoDaysMap[day.todo_id].push(day);
        }
      });
    
      // Update todos based on the mapping
      state.payload?.forEach((todo) => {
        const todo_id = todo._id;
        const daysToUpdate = todoDaysMap[todo_id];
        
        if (daysToUpdate && daysToUpdate.length > 0) {
          // Check if 'days' is defined and initialize it to an empty array before trying to perform concat on it.
          if (!todo.days) {
            todo.days = [];
          }
          
          // Append the new data to the existing 'days' array
          const newDaysArray = [...todo.days, ...daysToUpdate];
          todo.days = newDaysArray;
        }
      });
    }
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
export const { updateTodosPayload, updateTodosWithDays } = todosSlice.actions;

export default todosSlice;