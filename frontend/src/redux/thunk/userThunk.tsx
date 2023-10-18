import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '@api';
import { IUser } from "@models";

export const getUser = createAsyncThunk<IUser, void, {}>('user/getUser', async () => {
  try {
    const response = await api.get<IUser>('user');
    const userData = response.data; // Access the 'user' property
    return userData ;
  } catch (error) {
    throw error;
  }
});


