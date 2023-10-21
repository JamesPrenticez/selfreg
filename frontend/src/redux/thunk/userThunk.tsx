import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '@api';
import type { IUser, IGetUserParams } from "@models";

export const getUser = createAsyncThunk<IUser, IGetUserParams, {}>('user', async (params) => {
  try {
    const response = await api.get<IUser>('/user', params);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
});


