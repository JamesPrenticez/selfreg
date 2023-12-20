import React, { useState, useEffect, ReactElement, type Dispatch, type SetStateAction } from 'react';
import { useKeyPressed } from '../../hooks';
import { Button } from '@components/common';
import { PauseIcon, PlayIcon } from '@components/icons';

type Timer = ReturnType<typeof setTimeout>;

interface Props {
  play?: boolean;
  setPlay?: Dispatch<SetStateAction<boolean>>;
}

function Stopwatch({ play: playProp, setPlay: setPlayProp }: Props): ReactElement {
  const [play, setPlay] = useState<boolean>(playProp || false);
  const [elapsedTime, setElapsedTime] = useState<number>(59);
  
  const [timer, setTimer] = useState<Timer>();
  
  const isEnterKeyPressed = useKeyPressed("enter")

  const setPlayHandler = (value: boolean) => {
    if (setPlayProp) {
      setPlay(value);
      setPlayProp(value);
    } else {
      setPlay(value);
    }
  };

  const togglePlay = () => {
    console.log("here")
    const updatedPlay = !play;
    setPlayHandler(updatedPlay);
  };

  const startTimer = () => {
    const startTime = Date.now() - elapsedTime * 1000; // Multiply by 1000 to convert seconds to milliseconds
    const timerId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      setElapsedTime(Math.round(elapsed / 1000)); // Round the elapsed time to whole seconds
    }, 1000);
    setTimer(timerId);
    setPlayHandler(true);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setPlayHandler(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
  };

  useEffect(() => {
    if (play) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => {
      stopTimer();
    };
  }, [play]);

  const formatElapsedTime = (time: number): ReactElement => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const style = "mx-auto"

    const hoursDigits = hours.toString().split('').map((digit, index) => (
      <span key={index}>{digit}</span>
    ));

    const formattedMinutes = (hours > 0 && minutes < 10) ? `0${minutes}` : minutes; // add leading zero
    const minutesDigits = formattedMinutes.toString().split('').map((digit, index) => (
      <span key={index}>{digit}</span>
    ));

    const formattedSeconds = ((minutes > 0 || hours > 0) && seconds < 10) ? `0${seconds}` : seconds; // add leading zero
    const secondDigits = formattedSeconds.toString().split('').map((digit, index) => (
      <span key={index} className={style}>{digit}</span>
    ));

    return (
      <>
        {hours > 0 && (
          <>
            {hoursDigits}
            <span className='mr-2 mt-auto mb-2'>h</span>
          </>
        )}
        {minutes > 0 && (
          <>
            {minutesDigits}
            <span className='mr-2 ml-1 text-sm mt-auto mb-2'>m</span>
          </>
        )}
        {secondDigits}
        <span className='text-sm ml-1 mt-auto mb-2'>s</span>
      </>
    );
  };

 return (
    <div className="flex flex-col items-center justify-center h-screen">

        <div className="flex rounded-md p-2 font-bold text-5xl text-gray-100">
          {formatElapsedTime(elapsedTime)}
        </div>

        <div className="flex items-end space-x-2 ">
          {/* <Button csx="bg-orange-500 px-[10px]" onClick={resetTimer}>
            RESET
          </Button> */}

          <div className='text-gray-300 w-[40px] cursor-pointer hover:text-gray-200'>
            {play ? 
              <PauseIcon onClick={togglePlay}/>
              : 
              <PlayIcon onClick={togglePlay}/>
            }
          </div>
          {/* <button 
            className={`py-2 px-8 rounded-md font-bold tracking-wide text-white w-32 cursor-pointer ${play ? "bg-red-500" : "bg-blue-500  "}`}
            // onClick={() => setPlayHandler((prev: boolean) => !prev)} // you cant pass a function to a boolean
            onClick={togglePlay}

          >
           
          </button> */}
        </div>
    </div>
  );
}

export default Stopwatch;

// with milli seconds
// const [milliseconds, setMilliseconds] = useState<number>(0);
// const startTimer = () => {
//   const startTime = Date.now() - (elapsedTime * 1000 + milliseconds);
//   const timerId = setInterval(() => {
//     const now = Date.now();
//     const elapsed = now - startTime;
//     const seconds = Math.floor(elapsed / 1000);
//     const remainingMilliseconds = elapsed % 1000;
//     setElapsedTime(seconds);
//     setMilliseconds(remainingMilliseconds);
//   }, 10); // Update every 10 milliseconds to display milliseconds accurately
//   setTimer(timerId);
//   setIsRunning(true);
// };
// {elapsedTime}.{milliseconds.toString().padStart(3, '0').slice(0, 2)}