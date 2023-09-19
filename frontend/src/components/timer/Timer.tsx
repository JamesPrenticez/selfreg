import { useEffect, useState } from "react";
import useTimer from "./useTimer";
import StrConverter from "./strConverter";
import TimeConverter from "./timeConverter";
import styles from "./Timer.module.css";
const init = { hh: "00", mm: "00", ss: "00" };

// https://github.com/Vishal27-com/Google-Timer-Clone/blob/main/timer-stopwatch/src/Components/Timer/Timer.jsx

const Timer = ({ active }) => {
  const { time, startTimer, stopTimer, resetTimer, timeHandler } = useTimer();
  const [timeStr, setTimeStr] = useState(init);
  const [inputStr, setInputStr] = useState(init);
  const [toggel, setToggel] = useState(true);
  const [butToggel, setButToggel] = useState(true);
  useEffect(() => {
    timeHandler(StrConverter(timeStr));
  }, [timeStr]);
  useEffect(() => {
    setInputStr(TimeConverter(time));
    if (time === 0) {
      butToggelHandler();
    }
  }, [time]);

  const handleToggel = () => {
    if (time !== 0) {
      setToggel(false);
      startTimer();
      setButToggel(false);
    }
  };
  const reverseToggel = () => {
    setToggel(true);
    stopTimer();
  };
  const resetToggel = () => {
    setToggel(true);
    setButToggel(true);
    resetTimer();
    timeHandler(StrConverter(timeStr));
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTimeStr({ ...timeStr, [name]: value });
  };
  const butToggelHandler = () => {
    setButToggel(true);
    stopTimer();
  };

  return (
    <div>
      {!active && (
        <div>
          <div className={styles.cont}>
            <input
              onClick={reverseToggel}
              className={styles.inputBox}
              type="tel"
              maxLength={2}
              minLength={0}
              value={toggel ? timeStr.hh : inputStr.hh}
              name="hh"
              onChange={changeHandler}
            />
            <span style={{ fontSize: "40px" }}>h</span>
            <input
              onClick={reverseToggel}
              className={styles.inputBox}
              type="tel"
              maxLength={2}
              minLength={0}
              value={toggel ? timeStr.mm : inputStr.mm}
              name="mm"
              onChange={changeHandler}
            />
            <span style={{ fontSize: "40px" }}>m</span>
            <input
              onClick={reverseToggel}
              className={styles.inputBox}
              type="tel"
              maxLength={2}
              minLength={0}
              value={toggel ? timeStr.ss : inputStr.ss}
              name="ss"
              onChange={changeHandler}
            />
            <span style={{ fontSize: "40px" }}>s</span>
          </div>
          <div className={styles.but}>
            <button onClick={butToggel ? handleToggel : butToggelHandler}>
              {butToggel ? "Start" : "Stop"}
            </button>
            <button onClick={resetToggel}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Timer;