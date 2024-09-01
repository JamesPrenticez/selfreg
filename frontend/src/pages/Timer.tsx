import React, { useState } from 'react'
import PulseRings from '@components/timer/PulseRings'
import Stopwatch from '@components/timer/Stopwatch'
import Stopwatch1 from '@components/timer/StopwatchRecovery1';

const Timer = () => {
  const [play, setPlay] = useState(false);

  return (
    <div className='flex grow'>
      {/* <PulseRings 
        play={play}
        color="#00FF006B"
      > */}
        {/* <Stopwatch 
          play={play}
          setPlay={setPlay}
        /> */}
        <Stopwatch1 
          // play={play}
          // setPlay={setPlay}
        />

      {/* </PulseRings> */}
    </div>
  )
}

export default Timer