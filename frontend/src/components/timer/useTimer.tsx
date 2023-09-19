import { useEffect, useRef, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const curTime = useRef(null);
  const startTimer = () => {
    if (!curTime.current && time !== 0) {
      curTime.current = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }
  };
  useEffect(() => {
    if (time === 1) {
      return () => clearInterval(curTime.current);
    }
  }, [time]);
  const stopTimer = () => {
    clearInterval(curTime.current);
    curTime.current = null;
  };
  const resetTimer = () => {
    clearInterval(curTime.current);
    curTime.current = null;
    setTime(time);
  };
  const timeHandler = (t) => {
    setTime(t);
  };
  return { time, startTimer, stopTimer, resetTimer, timeHandler };
};
export default useTimer;