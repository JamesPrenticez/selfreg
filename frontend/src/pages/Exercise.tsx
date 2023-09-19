import React, { useState } from 'react'
import Timer from '../components/timer/Timer'

function Exercise() {
  const [active, setActive] = useState(false);
  const stateHandler = (val) => {
    val ? setActive(false) : setActive(true);
  };

  return (
    <div>
<div className="cont">
        <Timer active={active} />
      </div>
    </div>
  )
}

export default Exercise