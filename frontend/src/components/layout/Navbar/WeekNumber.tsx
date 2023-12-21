import React from 'react'
import { useAppSelector } from "@redux/hooks"

function WeekNumber(){
  const week = useAppSelector((state) => state.week)

  return (
    <div>
      <h1 className="text-3xl md:text-5xl text-muted select-none">
        WEEK {week.data?.week_number}
      </h1>
    </div>
  )
}

export default WeekNumber;