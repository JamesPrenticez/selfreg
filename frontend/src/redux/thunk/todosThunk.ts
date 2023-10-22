import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '@api';
import type { ITodo, IGetTodosParams, IDay, IGetDaysParams } from "@models";
import { updateTodosWithDays } from "@redux/slices";
import { RootState } from "@redux/store";

export const getTodos = createAsyncThunk<ITodo[], IGetTodosParams, {}>('todos', async (params) => {
  try {
    const response = await api.get<ITodo[]>('/todos', params);
    const todosData = response.data;
    return todosData;
  } catch (error) {
    throw error;
  }
});

export const getDaysForTodos = createAsyncThunk<void, IGetDaysParams, { state: RootState }>('todos/days', async (params, { dispatch, getState }) => {
  try {
    const state = getState()

    if (!state.todos.payload || !state.user.payload) return console.log("Error: state undefined in todos thunk")

    const params = {
      user_id: state.user.payload._id,
      todo_ids: state.todos.payload.flatMap((todo) =>  todo._id),
      start_date: "2023-09-11",
      end_date: "2023-09-17"
    }

    const response = await api.get<IDay[]>('/todos/days', params);
    dispatch(updateTodosWithDays({ days: response.data }));
    
  } catch (error) {
    console.error('Error fetching days data:', error);
  }
});

// // this is wrong is only working for one todo not all of them...
// export const getDaysForTodo = createAsyncThunk<void, IGetDaysParams, {}>('todos/days', async (params, { dispatch }) => {
//     try {
//       const response = await api.get<IDay[]>('/todos/days', );
//       dispatch(updateTodosWithDays({ todo_id: params.todo_id, days: response.data }));
//     } catch (error) {
//       console.error('Error fetching days data:', error);
//     }
//   }
// );
