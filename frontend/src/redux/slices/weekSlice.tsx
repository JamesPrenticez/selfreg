import { createSlice } from '@reduxjs/toolkit'
import type { IWeek } from '@models';
import dayjs, { type Dayjs } from 'dayjs';

import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

import { setLocale } from './userSlice'; 

// This works without any asynchronous operations (no thunk)

interface WeekState {
  data: IWeek | undefined;
}

const getWeekData = (): IWeek => {
  const today: Dayjs = dayjs();
  return {
    week_number: today.week(),
    start_date: today.startOf('week').format('YYYY-MM-DD'),
    end_date: today.endOf('week').format('YYYY-MM-DD'),
    current_date: today.format('YYYY-MM-DD')
  };
}

const initialState: WeekState = {
  data: getWeekData(),
};

export const weekSlice = createSlice({
  name: 'week',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLocale, (state) => {
      // When the locale is updated, re-compute the week data
      state.data = getWeekData();
    });
  }
});

export default weekSlice.reducer;