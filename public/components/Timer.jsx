import { useState, useEffect } from "react";
import "../styles/Timer.css";
import alarmSound from "../sounds/retro-alarm.wav";

const Timer = ({ currentTask }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState({
    work: undefined,
    short: 5 * 60,
    long: 25 * 60,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [flow, setFlow] = useState("work");

  useEffect(() => {
    if (!isActive && !isPaused) {
      setTime(inputTime[flow]);
    }

    let interval;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setIsActive(false);
      const audio = new Audio(alarmSound);
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time, inputTime, flow, isPaused]);

  const renderFlow = (flow) => {
    switch (flow) {
      case "work":
        return "Work";
      case "short":
        return "Short Break";
      case "long":
        return "Long Break";
      default:
        return;
    }
  };

  const handleStart = () => {
    if (inputTime[flow] > 0) {
      if (!isPaused) setTime(inputTime[flow]);
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
    setTime(inputTime[flow]);
  };

  const handleFlow = (newFlow) => {
    if (flow != newFlow) {
      setFlow(newFlow);
      handleReset();
    }
  };

  const formatTime = (seconds) => {
    if (seconds >= 0) {
      const minutes = Math.floor(seconds / 60);
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const remainingSeconds = seconds % 60;
      const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      return "00:00";
    }
  };

  return (
    <div className="timer">
      <div className="flow-selector">
        <button onClick={() => handleFlow("work")} className="btn btn-primary">
          Work
        </button>
        <button onClick={() => handleFlow("short")} className="btn btn-primary">
          Short Break
        </button>
        <button onClick={() => handleFlow("long")} className="btn btn-primary">
          Long Break
        </button>
      </div>
      <div className="timer-display">{formatTime(time)}</div>
      <h5 className="current-flow">
        {renderFlow(flow)}
        {currentTask.name && flow == "work" ? "ing on: " : ""}
        {currentTask.name && flow == "work" ? <br /> : ""}
        {currentTask.name && flow == "work" ? currentTask.name : ""}
      </h5>
      <div className="timer-controls">
        {!isActive && !isPaused ? (
          <>
            <input
              type="number"
              placeholder="Minutes"
              value={Math.floor(inputTime[flow] / 60)}
              onChange={(e) => {
                if (e.target.value >= 0)
                  setInputTime({
                    ...inputTime,
                    [flow]: 60 * parseInt(e.target.value, 10),
                  });
              }}
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
