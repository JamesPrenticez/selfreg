import type { IWeek } from '@models';
import dayjs, { type Dayjs } from 'dayjs';

import dayOfYear from 'dayjs/plugin/dayOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(dayOfYear)
dayjs.extend(weekOfYear)

export const getWeekData = (): IWeek => {
  const today: Dayjs = dayjs();

  return {
    day_number: today.dayOfYear(),
    week_number: today.week(),
    start_date: today.startOf('week').format('YYYY-MM-DD'),
    end_date: today.endOf('week').format('YYYY-MM-DD'),
    current_date: today.format('YYYY-MM-DD')
  };
}
