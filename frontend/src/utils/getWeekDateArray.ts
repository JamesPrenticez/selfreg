import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export function getWeekDateArray(weekNumber: number): Date[] {
  const weekDates: Date[] = [];

  // Get the first date of the year for the given week number
  const mondayOfGivenWeek = dayjs().isoWeek(weekNumber).startOf('isoWeek');

  // Populate the array with each day of the selected week
  for (let i = 0; i < 7; i++) {
    const date = mondayOfGivenWeek.add(i, 'day').toDate();
    weekDates.push(date);
  }

  return weekDates;
}
