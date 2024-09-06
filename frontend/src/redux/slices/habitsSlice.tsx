import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { IHabit, ILabelAndValue } from '@models';
import { habitsApi } from '@redux/services';

interface HabitsState {
  data: IHabit[];
  activeHabit: ILabelAndValue | null;
}

const initialState: HabitsState = {
  data: [],
  activeHabit: null
};

export const habitsSlice = createSlice({
  name: 'habits',
  initialState: initialState,
  reducers: {
    setActiveHabit: (state, action: PayloadAction<ILabelAndValue | null>) => {
      if(state.data){
        state.activeHabit =  action.payload;
      }
    },
  },
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
  setActiveHabit
} = habitsSlice.actions;

export default habitsSlice;
