import React from 'react'

function Meditation() {
  const items: number[] = Array.from({ length: 100 }, (_, index) => index + 1);
  return (
    <>
    <div>
      <ul>
        {items.map((item: number) => (
          <li key={item}> {item} </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Meditation
