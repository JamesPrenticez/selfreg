import React, { useState, useEffect, ReactElement } from 'react';
import { useCursorPosition, useFocusBlur, useKeyPressed } from '../../hooks';
import { Button } from '../common';

type Timer = ReturnType<typeof setTimeout>;

function Stopwatch(): ReactElement {
  // const [inputValue, setInputValue] = useState<string>("000000");
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timer, setTimer] = useState<Timer>();
  
  const isEnterKeyPressed = useKeyPressed("enter")

  const startTimer = () => {
    const startTime = Date.now() - elapsedTime;
    const timerId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      setElapsedTime(elapsed / 1000);
      // setInputValue(secondsToTimeString(Math.floor(elapsed / 1000)));
    }, 1000);
    setTimer(timerId);
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
    // setInputValue("000000");
  };

  useEffect(() => {
    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => {
      stopTimer();
    };
  }, [isRunning]);

  // const hours = getValue(inputValue, 5);
  // const minutes = getValue(inputValue, 3);
  // const seconds = getValue(inputValue, 1);

 return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 space-y-2">

        <div
          id="container"
          className={`"
            relative w-[500px] text-6xl rounded-md p-2 font-black"
            ${isRunning ? "bg-green-300 text-green-700" : "bg-pink-300 text-gray-300"}`
        }
        >

          {elapsedTime}
          
          {/* {getValue(inputValue, 5)}
          {getValue(inputValue, 4)}
          <span className="text-4xl">h&nbsp;</span>

          {getValue(inputValue, 3)}
          {getValue(inputValue, 2)}
          <span className="text-4xl">m&nbsp;</span>

          {getValue(inputValue, 1)}
          {getValue(inputValue, 0)}
          <span className="text-4xl">s&nbsp;</span> */}

        </div>

        <div className="flex mt-6 ">
          <button 
            className={`py-2 px-8 rounded-md font-bold tracking-wide text-white w-32 ml-auto cursor-pointer ${isRunning ? "block" : "hidden"} bg-orange-500`}
            onClick={resetTimer}
          >
            RESET
          </button>
          <button 
            className={`py-2 px-8 rounded-md font-bold tracking-wide text-white w-32 cursor-pointer ${isRunning ? "bg-red-500 ml-2" : "bg-blue-500  ml-auto"}`}
            onClick={() => setIsRunning(prev => !prev)}
          >
            {isRunning ? "STOP" : "START"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Stopwatch;

const getValue = (value: string, position: number) => {
  const index = (value.length - 1) - position
  // if(value.charAt(index) === "0") return null
  return value.charAt(index);
};



// function secondsToTimeString(totalSeconds: number): string {
//   let hours = Math.floor(totalSeconds / 3600);
//   let remainingSecondsAfterHours = totalSeconds % 3600;
//   let minutes = Math.floor(remainingSecondsAfterHours / 60);
//   let seconds = remainingSecondsAfterHours % 60;

//   // Cap hours at 99
//   if (hours > 99) {
//       hours = 99;
//       minutes = Math.min(Math.floor((totalSeconds - (99 * 3600)) / 60), 60);
//       seconds = remainingSecondsAfterHours % 60 === 0 ? remainingSecondsAfterHours : remainingSecondsAfterHours % 60;
//   }

//   // Convert to HH MM SS format
//   const hoursString = hours.toString().padStart(2, '0');
//   const minutesString = minutes.toString().padStart(2, '0');
//   const secondsString = seconds.toString().padStart(2, '0');

//   return hoursString + minutesString + secondsString;
// }