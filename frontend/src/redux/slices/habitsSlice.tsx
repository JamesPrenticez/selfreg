import { createSlice } from '@reduxjs/toolkit'
import type { IHabit } from '@models';
import { generateFakeObjectId } from '@utils';
import { userApi } from '@redux/services';

interface HabitsState {
  data: IHabit[] | null;
}

const initialState: HabitsState = {
  data: null,
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState: initialState,
  reducers: {
    createNewHabit: (state, action) => {
      const newHabit: IHabit = {
        ...action.payload,
        _id: generateFakeObjectId(),
        user_id: "123456",
        date_created: new Date().toISOString(),
      };

      if (state.data) {
        state.data = [...state.data, newHabit];
      } else {
        state.data = [newHabit];
      }

    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getUserHabits.matchFulfilled,
        (state, { payload }) => {
          console.log("asdf")
          state.data = payload;
        }
      );
  }
});

export const { 
  createNewHabit
} = habitsSlice.actions;

export default habitsSlice;