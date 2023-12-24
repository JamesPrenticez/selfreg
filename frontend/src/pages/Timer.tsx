import React, { useState } from 'react'
import PulseRings from '@components/timer/PulseRings'
import Stopwatch from '@components/timer/Stopwatch'

const Timer = () => {
  const [play, setPlay] = useState(false);

  return (
    <div className='bg-red-500 flex grow'>
      <PulseRings 
        play={play}
        color="#00FF006B"
      >
        <Stopwatch 
          play={play}
          setPlay={setPlay}
        />
      </PulseRings>
    </div>
  )
}

export default Timer