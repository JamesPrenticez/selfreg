import React from 'react'
import CountdowTimer from '../components/timer/CountdowTimer'

function Meditation() {
  return (
    <div><CountdowTimer /></div>
  )
}

export default Meditation

// function normalizeTimeString(timeString: string): string {
//   // Pad the string with leading zeros to make it of length 6
//   const paddedString = timeString.padStart(6, '0');

//   // Extract hours, minutes, and seconds from the string
//   let hours = parseInt(paddedString.substring(0, 2), 10);
//   let minutes = parseInt(paddedString.substring(2, 4), 10);
//   let seconds = parseInt(paddedString.substring(4, 6), 10);

//   // Cap the initial hours to its maximum
//   if (hours > 99) {
//     hours = 99;
//   }

//   // Normalize the time
//   let normalizedMinutes = minutes + Math.floor(seconds / 60);
//   let normalizedSeconds = seconds % 60;

//   let normalizedHours = hours + Math.floor(normalizedMinutes / 60);
//   normalizedMinutes %= 60;

//   // Cap the normalized hours to its maximum
//   if (normalizedHours > 99) {
//     normalizedHours = 99;
//     normalizedMinutes = 60;
//     normalizedSeconds = 60;
//   }

//   // const result = parseInt(String(normalizedHours) + String(normalizedMinutes) + String(normalizedSeconds));
//   return `${normalizedHours}` + `${normalizedMinutes}` + `${normalizedSeconds}`
// }