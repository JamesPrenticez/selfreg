import React, { useState, useEffect, ReactElement } from 'react';
import { useFocusBlur } from '../../hooks';

type Timer = ReturnType<typeof setTimeout>;

function CountdownTimer(): ReactElement {
  const {
    inputRef,
    containerRef,
    isActive,
    setIsActive,
    handleBlur
  } = useFocusBlur(false);

  const [inputValue, setInputValue] = useState<string>("");
  const [placeholderValue, setPlaceholderValue] = useState<string>("123456");
  const [isRunning, setIsRunning] = useState<boolean>(false)
  // New state to keep track of the remaining time in seconds
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    let timerId: Timer | null = null;
  
    if (!isRunning) {
      const normalized = normalizeTimeString(inputValue);
      const seconds = timeStringToSeconds(normalized)
      const backAgain = secondsToTimeString(remainingTime)

      console.table([normalized, seconds, backAgain])

      setRemainingTime(seconds);
    }
  
    if (isRunning && remainingTime >= 0) {
      timerId = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            if (timerId !== null) {
              clearInterval(timerId);
            }
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    }
  
    return () => {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    };
  }, [isRunning, inputValue, remainingTime]);

  // Decrement inputValue while isRunning 
  useEffect(() => {
    if (isRunning) {
      const formattedInputValue = secondsToTimeString(remainingTime);
      setInputValue(formattedInputValue);
    }
  }, [isRunning, remainingTime]);


  // Handle Placeholder
  // useEffect(() => {
  //   if (isActive) {
  //     inputValue === "" ? setPlaceholderValue("123456") : setPlaceholderValue(inputValue)
  //     setInputValue('');
  //   }

  //   if (!isActive) {
  //     inputValue === "" ? setInputValue(placeholderValue) : setPlaceholderValue("123456")
  //   }

  // }, [isActive]);

  // onKey press backspace
  // if(isActive) {setInputValue("") }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d+$/;
  
    if (value === '') {
      setInputValue('');
    } else if (regex.test(value) || value === '0') {
      if (value.length > 6) {
        // Remove the first character if the length exceeds 6
        const newValue = value.substring(1);
        console.log(newValue)
        setInputValue(newValue);
      } else {
        console.log(value)
        setInputValue(value);
      }
    }
  };
  
  const getValue = (value: string, position: number) => {
    const index = value.length - position
    return value.charAt(index) || '0';
  };

  const getStyle = (value: string, position: number) => {
    const index = value.length - position
    return value.charAt(index) ? { color: 'green' } : { color: 'red' };
  };

  // TODO backspace eventlistener to clear inputValue

 return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 space-y-2">

        <div
          id="container"
          ref={containerRef}
          className={`"
            relative w-[500px] text-6xl rounded-md p-2 font-black"
            ${inputValue.length > 0 ? "bg-green-300" : "bg-pink-300"}`
          }
          
          onClick={() => setIsActive(true)}
        >

          { 
            inputValue.length > 0 ? (
              <div>
                <span style={getStyle(inputValue, 6)}>{getValue(inputValue, 6)}</span>
                <span style={getStyle(inputValue, 5)}>{getValue(inputValue, 5)}</span>
                <span className="text-4xl" style={getStyle(inputValue, 5)}>h&nbsp;</span>
                <span style={getStyle(inputValue, 4)}>{getValue(inputValue, 4)}</span>
                <span style={getStyle(inputValue, 3)}>{getValue(inputValue, 3)}</span>
                <span className="text-4xl" style={getStyle(inputValue, 3)}>m&nbsp;</span>
                <span style={getStyle(inputValue, 2)}>{getValue(inputValue, 2)}</span>
                <span style={getStyle(inputValue, 1)}>{getValue(inputValue, 1)}</span>
                <span className="text-4xl" style={getStyle(inputValue, 1)}>s&nbsp;</span>
              </div>
            ) : (
              <div className='text-gray-300'>
                <span>{getValue(placeholderValue, 6)}</span>
                <span>{getValue(placeholderValue, 5)}</span>
                <span className="text-4xl">h&nbsp;</span>
                <span >{getValue(placeholderValue, 4)}</span>
                <span >{getValue(placeholderValue, 3)}</span>
                <span className="text-4xl">m&nbsp;</span>
                <span >{getValue(placeholderValue, 2)}</span>
                <span >{getValue(placeholderValue, 1)}</span>
                <span className="text-4xl">s&nbsp;</span>
              </div>
            )
          }

        </div>

        <div className="flex mt-6">
          <button 
            className={`py-2 px-8 rounded-md font-bold tracking-wide text-white w-32 ml-auto ${isRunning ? "bg-red-500" : "bg-green-500"}`}
            onClick={() => setIsRunning(prev => !prev)}
            disabled={inputValue === "000000"} // TODO
          >
            {isRunning ? "STOP" : "START"}
          </button>
        </div>

        <div className='p-4 border-2 border-gray-300'>
        <input
          ref={inputRef}
          type="tel"
          pattern="\d*"
          value={inputValue ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-red-300"
        />
        </div>

      </div>
    </div>
  );
}

export default CountdownTimer;

function normalizeTimeString(timeString: string): string {
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

  // Convert to strings and pad with leading zeros
  const hoursStr = String(normalizedHours).padStart(2, '0');
  const minutesStr = String(normalizedMinutes).padStart(2, '0');
  const secondsStr = String(normalizedSeconds).padStart(2, '0');

  const result = `${hoursStr}` + `${minutesStr}` + `${secondsStr}`
  return result
}

function timeStringToSeconds(timeString: string): number {
  const paddedString = timeString.padStart(6, '0');

  // Extract hours, minutes, and seconds from the string
  const hours = parseInt(paddedString.substring(0, 2), 10);
  const minutes = parseInt(paddedString.substring(2, 4), 10);
  const seconds = parseInt(paddedString.substring(4, 6), 10);

  // Convert to seconds
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  return totalSeconds;
}

function secondsToTimeString(totalSeconds: number): string {
  let hours = Math.floor(totalSeconds / 3600);
  let remainingSecondsAfterHours = totalSeconds % 3600;
  let minutes = Math.floor(remainingSecondsAfterHours / 60);
  let seconds = remainingSecondsAfterHours % 60;

  // Cap hours at 99
  if (hours > 99) {
      hours = 99;
      minutes = Math.min(Math.floor((totalSeconds - (99 * 3600)) / 60), 60);
      seconds = remainingSecondsAfterHours % 60 === 0 ? remainingSecondsAfterHours : remainingSecondsAfterHours % 60;
  }

  // Convert to HH MM SS format
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  return hoursString + minutesString + secondsString;
}