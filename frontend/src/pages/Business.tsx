import React from 'react'
import { useCursorPosition } from '../hooks';

function Business() {
  const ref = React.useRef(null);
  const { updateCaret } = useCursorPosition(ref);

  return (
    <div>
      <input ref={ref} type="text" />
      <button onClick={updateCaret}>Update Caret Position</button>
    </div>
  )
}

export default Business