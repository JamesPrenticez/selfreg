import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { addDay, getDaysForTodos, getTodos } from '../thunk/todosThunk';
import type { IDay, ITodo, IStatus } from '@models';
import { PURGE } from 'redux-persist';

interface TodosState {
  todosStatus: IStatus;
  daysStatus: IStatus;
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
    // TODO this should be a thunk
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
      // Optamistic Updating 
      // we add the item to state while in the pending status from redux thunk
      // Always make sure that the temporary IDs you generate are distinctly different from the format of actual backend IDs, so there's no risk of collision.
      .addCase(addDay.pending, (state, action) => {
        if (state.data) {
          const { todo_id, new_day } = action.meta.arg;
          const todoIndex = state.data?.findIndex((todo) => todo._id === todo_id);

          if (todoIndex !== -1) {
            const tempId = `temp-${Date.now()}`; // Generating a temporary ID
            const updatedDay = {
              ...new_day,
              _id: tempId,
              todo_id,
            };
      
            const updatedTodo = {
              ...state.data[todoIndex],
              days: [...(state.data[todoIndex].days || []), updatedDay],
            };
            state.data[todoIndex] = updatedTodo;
          }
        }
      })
      .addCase(addDay.fulfilled, (state, action) => {
        // This reducer case will run when the API call succeeds,
        // but the optimistic update will already be in place
        // from the pending case.
      })
      .addCase(addDay.rejected, (state, action) => {
        // Handle the error if the API call fails.
        // You can revert the optimistic update here if needed.
      });

      // .addCase(addDay.fulfilled, (state, action) => {
      //   // Update the state with the newly added day
      //   if (state.data) {
      //     const { todo_id, ...new_day } = action.payload;
      //     const todoIndex = state.data.findIndex((todo) => todo._id === todo_id);
      
      //     if (todoIndex !== -1) {
      //       const updatedTodo = {
      //         ...state.data[todoIndex],
      //         days: [...(state.data[todoIndex].days || []), { ...new_day, todo_id }],
      //       };
      //       state.data[todoIndex] = updatedTodo;
      //     }
      //   }
      // });
  }
});

export const { updateDayStatusByTodoId } = todosSlice.actions;

export default todosSlice;