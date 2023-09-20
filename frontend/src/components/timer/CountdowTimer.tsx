import React, { useState, useEffect, ReactElement } from 'react';
import { useFocusBlur } from '../../hooks';

type Timer = ReturnType<typeof setTimeout>;

function CountdowTimer(): ReactElement {
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
  
    // Convert inputValue to total seconds
    const totalSeconds = parseInt(inputValue, 10) || 0;
    const hours = Math.floor(totalSeconds / 10000);
    const minutes = Math.floor((totalSeconds - hours * 10000) / 100);
    const seconds = totalSeconds % 100;
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  
    if (!isRunning) {
      setRemainingTime(totalTimeInSeconds);
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
    if (isRunning ) {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime - hours * 3600) / 60);
      const seconds = remainingTime % 60;

      const newInputValue = `${hours > 0 ? hours : ''}${minutes > 0 || hours > 0 ? minutes : ''}${seconds}`;
  
      setInputValue(newInputValue);
    }
  })

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
        setInputValue(newValue);
      } else {
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

export default CountdowTimer;
