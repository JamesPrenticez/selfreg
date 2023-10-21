import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '@api';
import type { ITodo, IGetTodosParams } from "@models";

export const getTodos = createAsyncThunk<ITodo[], IGetTodosParams, {}>('todos', async (params) => {
  try {
    const response = await api.get<ITodo[]>('/todos', params);
    const todosData = response.data;
    return todosData;
  } catch (error) {
    throw error;
  }
});


