import { createSlice } from '@reduxjs/toolkit'
import type { IHabit } from '@models';
import { generateFakeObjectId } from '@utils';

interface HabitsState {
  data: IHabit[] | undefined;
}

const initialState: HabitsState = {
  data: undefined,
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
});

export const { 
  createNewHabit
} = habitsSlice.actions;

export default habitsSlice;