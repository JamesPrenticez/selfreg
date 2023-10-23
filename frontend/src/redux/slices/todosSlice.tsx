import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { IDay, ITodo } from '@models';
import { getDaysForTodos, getTodos } from '../thunk/todosThunk';

interface TodosState {
  todosStatus: 'idle' | 'pending' | 'success' | 'failed';
  daysStatus: 'idle' | 'pending' | 'success' | 'failed';
  data: ITodo[] | undefined;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todosStatus: 'idle',
  daysStatus: 'idle',
  data: undefined,
  isLoading: false,
  isSaving: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    updateDayStatusByTodoId: (
      state,
      action: PayloadAction<{ todo_id: string; day_id: string; new_status: boolean | null }>
    ) => {
      const { todo_id, day_id, new_status } = action.payload;

      if(state.data){
        const todo = state.data.find((todo) => todo._id === todo_id);
        if (todo && todo.days) {
          const day = todo.days.find((day) => day._id === day_id);
          if (day) {
            day.status = new_status;
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.todosStatus = "pending";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        const newTodosMap = action.payload.reduce((acc, todo) => {
          acc[todo._id] = todo;
          return acc;
        }, {} as Record<string, ITodo>);
      
        state.todosStatus = "success";
        state.data = state.data ? state.data.map(todo => ({
          ...todo, 
          ...newTodosMap[todo._id]
      })) : action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.todosStatus = "failed";
        state.isLoading = false;
        state.error = 'An error occurred';
      })
      .addCase(getDaysForTodos.pending, (state, action) => {
        state.daysStatus = "pending";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDaysForTodos.fulfilled, (state, action: PayloadAction<IDay[]>) => {
        const days = action.payload;
  
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
        if (state.data) {
          state.data = state.data.map((todo) => {
              const newTodoDays = todoDaysMap[todo._id] || [];
              const existingDayIds = new Set(todo.days?.map(day => day._id));
              
              const mergedDays = [
                  ...(todo.days || []),
                  ...newTodoDays.filter(day => !existingDayIds.has(day._id))
              ];
              
              return {
                  ...todo,
                  days: mergedDays
              };
          });

        state.daysStatus = "success";
      }
      })
      .addCase(getDaysForTodos.rejected, (state, action) => {
        state.daysStatus = "failed";
        state.isLoading = false;
        state.error = 'An error occurred';
      })
  }
});

export const { updateDayStatusByTodoId } = todosSlice.actions;

export default todosSlice;