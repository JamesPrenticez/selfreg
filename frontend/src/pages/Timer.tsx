import React, { useEffect, useState } from 'react'
import Stopwatch from '@components/timer/Stopwatch';
import SelectHabit from '@components/timer/SelectHabit';
import { useGetDaysQuery, useGetHabitsQuery } from '@redux/services';
import { useAppSelector } from '@redux/hooks';
import { Unit } from '@models';
import dayjs from 'dayjs';

const Timer = () => {
  useGetHabitsQuery();
  const { data: habitsData, activeHabit } = useAppSelector((state) => state.habits);
  const { data, error, isLoading } = useGetDaysQuery({ start_date: "2024-01-01", end_date: "2024-12-31", habit_id: "29f8424c32b86011633c0a6e" }); // TODO dates

  const getAccumulatedTimeRecord = () => {
    // Check if there is an active habit
    if (!activeHabit || !habitsData[activeHabit.value]) return 0;
    
    const habit = habitsData[activeHabit.value];
  
    // Check if the habit has `days` (which is now a Record)
    if (!habit.days) return 0;
    
    // Format today's date as a string to match the key in the Record
    const today = dayjs().startOf('day').toDate();
  
    // Retrieve today's day entry from the Record
    const todayDayData = habit.days[`${today}`];
  
    // Check if the day has a measurement already
    if (!todayDayData || !todayDayData.measurement) return 0;
    
    // Destructure the measurement
    const { measurement } = todayDayData;
    
    // Check if the measurement's unit is of type "time"
    if (measurement.unit === Unit.TIME) {
      console.log("here")
      return measurement.quantity;
    }
    
    return 0; // Default to 0 if the unit isn't "time"
  };
  
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(getAccumulatedTimeRecord());
  }, [data, activeHabit, habitsData]); // Added habitsData to dependencies

  console.log(time)

  const test = () => {
    if (!activeHabit || !habitsData[activeHabit.value]) return {};

    const habit = habitsData[activeHabit.value];
    return habit
  }

  return (
    <div className='relative flex grow'>
      <SelectHabit />
      <Stopwatch accumulatedTime={time}/>
    </div>
  )
}

export default Timer