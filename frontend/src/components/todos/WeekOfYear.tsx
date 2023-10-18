import React, { useEffect, useState } from 'react'
import { type IWeekDetails } from '../../models'
import dayjs, { type Dayjs } from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

const WeekOfYear = () => {
  const [weekDetails, setWeekDetails] = useState<IWeekDetails | null>(null)

  useEffect(() => {
    const today: Dayjs = dayjs();
    const week = today.week();
    const year = today.year();

    setWeekDetails({
      week: String(week),
      year: String(year)
    })

  }, [])

  return (
    <h1 className='font-bold'>Week: {weekDetails?.week}</h1>
  )
}

export default WeekOfYear