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









// This get replaces with dayJS library

// // Note: This function assumes that the week starts on Monday and ends on Sunday,
// export function getWeekDetails(dateString: string): IWeekDetails {
//   const inputDate = new Date(dateString);
//   const year = inputDate.getFullYear();
  
//   // Get the week number
//   const firstDayOfYear = new Date(year, 0, 1);
//   const pastDaysOfYear = (inputDate.valueOf() - firstDayOfYear.valueOf()) / 86400000;
//   const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  
//   // Initialize the array to hold the days
//   const days: { name: string; date: string }[] = [];
  
//   // Get the Monday of the week
//   const dayOfWeek = inputDate.getDay();
//   const monday = new Date(inputDate);
//   monday.setDate(monday.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
//   // Populate the days array
//   for (let i = 0; i < 7; i++) {
//     const currentDay = new Date(monday);
//     currentDay.setDate(monday.getDate() + i);
    
//     const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDay);
//     const dayDate = currentDay.toISOString().split('T')[0];
    
//     days.push({ name: dayName, date: dayDate });
//   }
  
//   return {
//     year: year.toString(),
//     week: weekNumber.toString(),
//   };
// }

