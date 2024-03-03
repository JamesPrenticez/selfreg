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

    if (!state.todos.data || !state.user.data) {
      console.log("Error: state undefined in todos thunk");
      return [];
    }

    const requestParams = {
      user_id: state.user.data._id,
      todo_ids: state.todos.data.flatMap((todo) => todo._id),
      start_date: params.start_date, // "2023-09-11",
      end_date: params.end_date // "2023-09-17"
    };

    const response = await api.get<IDay[]>('/todos', requestParams);
    return response.data;
  }
);

export const addDay = createAsyncThunk<Omit<IDay, '_id'>, { todo_id: string, new_day: Omit<IDay, '_id'> }, { state: RootState }>('todos/add_day', async ({ todo_id, new_day }, { getState }) => {
    try {
      const state = getState();

      if (!state.user.data) {
        console.log("Error: User data is missing.");
        throw new Error("User data is missing.");
      }

      const dayData = {
        ...new_day,
        user_id: state.user.data._id,
        todo_id,
      };

      const response = await api.post<Omit<IDay, '_id'>>('/todos/days', dayData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
