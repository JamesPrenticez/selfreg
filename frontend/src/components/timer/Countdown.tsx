import React, { useState, useEffect, ReactElement } from 'react';

type Timer = ReturnType<typeof setTimeout>;

function Countdown(): ReactElement {
  const [time, setTime] = useState<string>('01:00');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false); // New state

  // useEffect(() => {
  //   let timer: Timer | null = null;

  //   const [hours, minutes] = time.split(':').map(Number);

  //   if (isActive && !isEditing && (hours > 0 || minutes > 0)) {
  //     timer = setTimeout(() => {
  //       let newHours = hours;
  //       let newMinutes = minutes;

  //       if (minutes > 0) {
  //         newMinutes = minutes - 1;
  //       } else if (hours > 0) {
  //         newHours = hours - 1;
  //         newMinutes = 59;
  //       }

  //       setTime(`${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`);
  //     }, 1000);
  //   } else if (!isActive && timer !== null) {
  //     clearTimeout(timer);
  //   }

  //   return () => {
  //     if (timer !== null) {
  //       clearTimeout(timer);
  //     }
  //   };
  // }, [isActive, time, isEditing]); // Added isEditing dependency

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setTime('00:00');
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^([0-9]{1,2}):([0-5][0-9])$/;

    
    setTime(value);
    // if (regex.test(value)) {
    //   console.log("here")
    // }
  };

  const [inputValue, setInputValue] = useState<string>('00 00 00');

  const formatInput = (value: string) => {
    // Remove all non-numeric characters from the new input and existing state
    let numericValue = value.replace(/\D/g, '');
    const currentNumericState = inputValue.replace(/\D/g, '');

    // Make sure the new input is at least as long as the existing state
    numericValue = numericValue.padEnd(currentNumericState.length, '0');

    // Use the existing state to fill in any missing numbers
    for (let i = 0; i < 6; i++) {
      if (numericValue[i] === '0' && currentNumericState[i] !== '0') {
        numericValue = numericValue.substring(0, i) + currentNumericState[i] + numericValue.substring(i + 1);
      }
    }

    // Split the numeric characters into hr, mins, and secs
    const hr = numericValue.substring(0, 2);
    const mins = numericValue.substring(2, 4);
    const secs = numericValue.substring(4, 6);

    // Construct the formatted string
    const formattedValue = `${hr} ${mins} ${secs}`;

    return formattedValue;
  };

  // const formatInput = (value: string) => {
  //   // Remove all non-numeric characters
  //   console.log(value)
  //   let numericValue = value.replace(/\D/g, '');

  //   numericValue = numericValue.padStart(6, '0')

  //   // Split the numeric characters into hr, mins, and secs
  //   const hr = numericValue.substring(0, 2);
  //   const mins = numericValue.substring(2, 4);
  //   const secs = numericValue.substring(4, 6);

  //   // Construct the formatted string
  //   const formattedValue = `${hr} ${mins} ${secs}`;

  //   return formattedValue;
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatInput(value);
    setInputValue(formattedValue);
  };


 return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsEditing(true)} // Set isEditing to true when focused
          onBlur={() => setIsEditing(false)} // Set isEditing to false when focus is lost
          disabled={isActive}
          pattern="[0-9]{1,2}:[0-5][0-9]"
          placeholder="HH:MM"
          className={`text-center w-64 ${isEditing ? "bg-green-500" : "bg-red-500"}`}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Countdown;
