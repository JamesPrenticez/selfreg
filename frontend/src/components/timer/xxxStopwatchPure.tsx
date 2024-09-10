import React, { useRef, useState, useEffect, ReactElement } from 'react';
import { 
  // CogIcon,
  PauseIcon,
  PlayIcon,
  // ResetIcon
} from '@components/icons';
import { observeIntersection } from '@utils';

type Timer = ReturnType<typeof setInterval>;

function Stopwatch(): ReactElement {
  const [play, setPlay] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [timer, setTimer] = useState<Timer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startTimer = () => {
    const startTime = Date.now() - (elapsedTime * 1000 + milliseconds);
    const timerId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const seconds = Math.floor(elapsed / 1000);
      const remainingMilliseconds = elapsed % 1000;
      setElapsedTime(seconds);
      setMilliseconds(remainingMilliseconds);
    }, 10); // Update every 10 milliseconds to display milliseconds accurately
    setTimer(timerId);
    setPlay(true);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
      setPlay(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
    setMilliseconds(0);
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

  const handleSpacebar = (e: any) => {
    if (e.key !== " ") return; // SPACE " "
    e.preventDefault();
    setPlay((prev) => !prev);
  };

  useEffect(() => {
    if (containerRef.current) {
      observeIntersection(containerRef.current, (e) => handleSpacebar(e), "keydown");
    }
  }, []);

  const formatElapsedTime = (time: number, milliseconds: number): ReactElement => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0').slice(0, 2); // Display only first 2 digits
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // todo fix only show relevant
    document.title = `${formattedHours}:${formattedMinutes}:${formattedSeconds} - Self Regulator`;

    return (
      <div className={`${!(minutes > 0 || hours > 0) ? "ml-[4.4rem]" : "ml-[1.9rem]"}`}>
        {hours > 0 &&
          <>
            <DigitWrapper value={formattedHours} unit="h" />
            <DigitWrapper value={formattedMinutes} unit="m" />
          </>
        }
        {(hours < 0 && minutes > 0) &&
          <DigitWrapper value={formattedMinutes} unit="m" />
        }

        <DigitWrapper value={formattedSeconds} unit="s" />

        { !(minutes > 0 || hours > 0) &&
          <DigitWrapper value={formattedMilliseconds} unit="ms" />
        }
      </div>
    );
  };




  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full ">
      <div>
        {formatElapsedTime(elapsedTime, milliseconds)}
      </div>
      <div className="flex space-x-2 ">
        <div className='text-gray-300 w-[50px] h-[50px] cursor-pointer hover:text-white bg-black/50 rounded-full flex items-center justify-center mt-auto'>
          <PlayIcon onClick={resetTimer} />
        </div>
        <div className='text-gray-300 w-[70px] cursor-pointer hover:text-white bg-black/50 rounded-full'>
          {play ?
            <PauseIcon onClick={() => setPlay(false)} />
            :
            <PlayIcon onClick={() => setPlay(true)} />
          }
        </div>
        {/* Maybe save */}
        <div className='text-gray-300 w-[50px] h-[50px] cursor-pointer hover:text-white bg-black/50 rounded-full flex items-center justify-center mt-auto'>
          <PlayIcon />
        </div>
      </div>
    </div>
  );
}

interface DigitWrapperProps {
  value: string;
  unit?: string;
}

const DigitWrapper = ({ value, unit }: DigitWrapperProps): ReactElement => {
  const digits = value.split('');

  return (
    <div className="inline-block font-semibold text-primary">
      <span className="inline-block ">
        {digits.map((digit, index) => (
          <span key={index} className={`inline-block  text-center 
              ${unit === "ms" ? "w-[12px] text-[18px]" 
              // : unit === "s"  ? "w-[22px] text-[32px]" 
              : "w-[40px] text-[56px]"}
            `}
          >
            {digit}
          </span>
        ))}
      </span>
      {unit &&
        <span className={`text-sage/80 font-[300] inline-block mt-auto pr-2
            ${unit === "ms" ? "text-[12px] pl-[0.1rem]"  
            : unit === "s" ? "text-[32px]" : 
            "text-[30px] "}
          `}
        >
          {unit}
        </span>
      }
    </div>
  );
};

export default Stopwatch;
