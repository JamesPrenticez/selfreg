import { createSlice } from '@reduxjs/toolkit'
import type { IHabit } from '@models';
import { generateFakeObjectId } from '@utils';
import { habitsApi } from '@redux/services';

interface HabitsState {
  data: IHabit[] | null;
}

const initialState: HabitsState = {
  data: null,
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      habitsApi.endpoints.getHabits.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data;
      }
    );
  }
});

export const { 
} = habitsSlice.actions;

export default habitsSlice;