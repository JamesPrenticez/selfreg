import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '@api';
import type { ITodo, IGetTodosParams, IDay, IGetDaysParams } from "@models";
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

export const getDaysForTodos = createAsyncThunk<IDay[], IGetDaysParams, { state: RootState }>('todos/days', async (params, { getState }) => {
    const state = getState();

    if (!state.todos.payload || !state.user.payload) {
      console.log("Error: state undefined in todos thunk");
      return [];
    }

    const requestParams = {
      user_id: state.user.payload._id,
      todo_ids: state.todos.payload.flatMap((todo) => todo._id),
      start_date: "2023-09-11",
      end_date: "2023-09-17"
    };

    const response = await api.get<IDay[]>('/todos', requestParams);
    return response.data;
  }
);
