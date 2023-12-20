import AnimationWrapper from '@components/common/AnimationWrapper'
import SuccessAnimation from '@components/common/Success'
import ErrorAnimation from '@components/common/Error'
import React, { useState } from 'react'
import PulseRings from '@components/timer/PulseRings'
import CountdownTimer from '@components/timer/CountdownTimer'
import Stopwatch from '@components/timer/Stopwatch'

function Sleep() {
  const [play, setPlay] = useState(false);
  console.log("sleep", play)

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

export default Sleep