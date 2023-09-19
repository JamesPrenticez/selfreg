import React, { useState, useEffect, ReactElement, ChangeEvent } from 'react';

type Timer = ReturnType<typeof setTimeout>;

function MyCountdown(): ReactElement {
  const [isActive, setIsActive] = useState<boolean>(false)

  const [inputValue, setInputValue] = useState<string>("");
  const [convertedValue, setConvertedValue] = useState<any>(null)
  const [convertedArray, setConvertedArray] = useState<Array<string>>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d+$/;

    if (value === '') {
      setInputValue('');
    } else if (regex.test(value) || value === '0') {
      setInputValue(value);
    }
  };

  function normalizeTimeString(timeString: string): void {
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
    const normalizedTimeString = `${normalizedHours}hrs ${normalizedMinutes}mins ${normalizedSeconds}secs`;
    setConvertedValue(normalizedTimeString)

    // Convert to strings and pad with leading zeros
    const hoursStr = String(normalizedHours).padStart(2, '0');
    const minutesStr = String(normalizedMinutes).padStart(2, '0');
    const secondsStr = String(normalizedSeconds).padStart(2, '0');
    const normalizedTimeArray = [...hoursStr, ...minutesStr, ...secondsStr];
    setConvertedArray(normalizedTimeArray)
    // Create the array


  }

  const values = ["0", "1", "6", "0", "3", "3"]

 return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4">

        <div className='bg-gray-200'>

        <input
          type="tel"
          pattern="\d*"
          // minLength={0}
          maxLength={6}
          value={inputValue ?? ""}
          onChange={handleChange}
          className='bg-green-300'
        />

        <p>{inputValue}</p>

        <button onClick={() => {normalizeTimeString(inputValue)}}>Convert</button>

        <p>{convertedValue}</p>
        <p>{JSON.stringify(convertedArray)}</p>

        </div>

        <span>{convertedArray[0]}</span>
        <span>{convertedArray[1]}</span>
        <span>h&nbsp;</span>

        <span>{convertedArray[2]}</span>
        <span>{convertedArray[3]}</span>
        <span>m&nbsp;</span>

        <span>{convertedArray[4]}</span>
        <span>{convertedArray[5]}</span>
        <span>s&nbsp;</span>


      </div>
    </div>
  );
}

export default MyCountdown;


// const [isEditing, setIsEditing] = useState<boolean>(false); // New state
// onFocus={() => setIsEditing(true)} // Set isEditing to true when focused
// onBlur={() => setIsEditing(false)} // Set isEditing to false when focus is lost
// placeholder={inputValue}
// className={`text-center w-64 ${isEditing ? "flex" : "hidden"}`}


// function normalizeTimeString(timeString: string): string {
//   // Pad the string with leading zeros to make it of length 6
//   const paddedString = timeString.padStart(6, '0');

//   // Extract hours, minutes, and seconds from the string
//   let hours = parseInt(paddedString.substring(0, 2), 10);
//   let minutes = parseInt(paddedString.substring(2, 4), 10);
//   let seconds = parseInt(paddedString.substring(4, 6), 10);

//   // Cap the initial values to their maximums
//   if (hours > 99) {
//     hours = 99;
//   }
//   if (minutes > 59) {
//     minutes = 59;
//   }
//   if (seconds > 59) {
//     seconds = 59;
//   }

//   // Normalize the time
//   let normalizedMinutes = minutes + Math.floor(seconds / 60);
//   let normalizedSeconds = seconds % 60;

//   let normalizedHours = hours + Math.floor(normalizedMinutes / 60);
//   normalizedMinutes %= 60;

//   // Construct the normalized time string
//   const normalizedTimeString = `${normalizedHours}hrs ${normalizedMinutes}mins ${normalizedSeconds}secs`;

//   return normalizedTimeString;
// }


/// ========== 60

// function normalizeTimeString(timeString: string): void {
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

//   // Construct the normalized time string
//   const normalizedTimeString = `${normalizedHours}hrs ${normalizedMinutes}mins ${normalizedSeconds}secs`;
//   setConvertedValue(normalizedTimeString)

//   // Convert to strings and pad with leading zeros
//   const hoursStr = String(normalizedHours).padStart(2, '0');
//   const minutesStr = String(normalizedMinutes).padStart(2, '0');
//   const secondsStr = String(normalizedSeconds).padStart(2, '0');
//   const normalizedTimeArray = [...hoursStr, ...minutesStr, ...secondsStr];
//   setConvertedArray(normalizedTimeArray)
//   // Create the array


// }