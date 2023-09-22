function normalizeTimeString(timeString) {
  // Pad the string with leading zeros to make it of length 6
  const paddedString = timeString.padStart(6, '0');

  // Extract hours, minutes, and seconds from the string
  let hours = parseInt(paddedString.substring(0, 2), 10);
  let minutes = parseInt(paddedString.substring(2, 4), 10);
  let seconds = parseInt(paddedString.substring(4, 6), 10);

  // Cap the initial hours to its maximum
  if (hours > 99) {
    hours = 99;
  }

  // Normalize the time
  let normalizedMinutes = minutes + Math.floor(seconds / 60);
  let normalizedSeconds = seconds % 60;

  let normalizedHours = hours + Math.floor(normalizedMinutes / 60);
  normalizedMinutes %= 60;

  // Cap the normalized hours to its maximum
  if (normalizedHours > 99) {
    normalizedHours = 99;
    normalizedMinutes = 59;
    normalizedSeconds = 59;
  }

  // Construct the normalized time string
  // not needed
  // const normalizedTimeString = `${normalizedHours}hrs ${normalizedMinutes}mins ${normalizedSeconds}secs`;
  // setConvertedValue(normalizedTimeString)

  // Convert to strings and pad with leading zeros
  const hoursStr = String(normalizedHours).padStart(2, '0');
  const minutesStr = String(normalizedMinutes).padStart(2, '0');
  const secondsStr = String(normalizedSeconds).padStart(2, '0');

  const result = `${hoursStr}` + `${minutesStr}` + `${secondsStr}`
  return result
}

console.log(normalizeTimeString("60"))