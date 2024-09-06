import React from 'react'
import Stopwatch from '@components/timer/Stopwatch';
import SelectHabit from '@components/timer/SelectHabit';

const Timer = () => {

  return (
    <div className='relative flex grow'>
      <SelectHabit />
      <Stopwatch/>
    </div>
  )
}

export default Timer