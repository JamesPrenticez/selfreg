import React, { useState, useEffect, ReactElement } from 'react';

type Timer = ReturnType<typeof setTimeout>;

function Countdown(): ReactElement {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: Timer | null = null;

    if (isActive && (hours > 0 || minutes > 0)) {
      timer = setTimeout(() => {
        if (minutes > 0) {
          setMinutes(minutes - 1);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
        }
      }, 1000);
    } else if (!isActive) {
      if (timer !== null) {
        clearTimeout(timer);
      }
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [isActive, hours, minutes]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      if (value >= 100) value = 99;
      setHours(value);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      if (value >= 100) {
        setHours(hours + 1);
        setMinutes(39);
      } else {
        setMinutes(value);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-6xl mb-4">
        <input
          type="number"
          value={hours}
          onChange={handleHourChange}
          className="text-center w-32"
          disabled={isActive}
          max={99}
        />
        <span>:</span>
        <input
          type="number"
          value={minutes}
          onChange={handleMinuteChange}
          className="text-center w-32"
          disabled={isActive}
          max={99}
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