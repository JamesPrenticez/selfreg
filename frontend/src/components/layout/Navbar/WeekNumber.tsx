import React from 'react'
import { getWeekData } from '@utils';

function WeekNumber(){
  const week = getWeekData()

  return (
    <div>
      <h1 className="text-3xl md:text-5xl text-muted select-none relative">
        DAY {week.day_number}
      </h1>
    </div>
  )
}

export default WeekNumber;