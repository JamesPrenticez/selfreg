import React from 'react'
import { useCursorPosition } from '../hooks';
import Stopwatch from '@components/timer/Stopwatch';

function Business() {
  const ref = React.useRef(null);
  const { updateCaret } = useCursorPosition(ref);

  return (
    <div>
      Stopwatch
      <Stopwatch />
    </div>
  )
}

export default Business