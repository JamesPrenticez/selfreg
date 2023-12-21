import React, { useState } from 'react'

function Sleep() {
  const [play, setPlay] = useState(false);
  console.log("sleep", play)

  return (
    <div className='bg-red-500 flex grow'>
    </div>
  )
}

export default Sleep;