import { useState, useEffect } from "react";
import "../styles/Timer.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    if (inputTime > 0) {
      if (!isPaused) setTime(inputTime);
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    setInputTime();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="timer">
      <div className="timer-display">{formatTime(time)}</div>
      <div className="timer-controls">
        {!isActive && !isPaused ? (
          <>
            <input
              type="number"
              placeholder="Minutes"
              value={Math.floor(inputTime / 60)}
              onChange={(e) => setInputTime(60 * parseInt(e.target.value, 10))}
            />
            <button onClick={handleStart}>Start</button>
          </>
        ) : isPaused ? (
          <>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
          </>
        ) : (
          <>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
