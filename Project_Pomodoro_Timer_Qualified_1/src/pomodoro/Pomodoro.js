import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import classNames from "../utils/class-names";
import { minutesToDuration } from '../utils/duration';
import { secondsToDuration } from '../utils/duration';
import SetDurations from "./SetDurations";
import Control from "./Control";
import Display from "./Display";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const defaultPomodoro = {
    focusDuration: 25 * 60,
    maxFocus: 60 * 60,
    minFocus: 5 * 60,
    breakDuration: 5 * 60,
    maxBreak: 15 * 60,
    minBreak: 1 * 60,
    stopped: true,
    progress: 0, //change back  to ZEROOOO!!!
    focus: true
  }
  const [pomodoroSettings, setPomodoroSettings] = useState({ ...defaultPomodoro })

  // console.log(minutesToDuration(defaultPomodoro.maxFocus/60))
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setPomodoroSettings((prevState) => ({ ...prevState, progress: prevState.progress + 1 }))
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setPomodoroSettings((prevState) => ({ ...prevState, stopped: false }))
  }
  function session() {
    if (pomodoroSettings.focus === true) {
      if (pomodoroSettings.progress === pomodoroSettings.focusDuration) {
        setPomodoroSettings((prevState) => ({ ...prevState, focus: !prevState.focus }));
        setPomodoroSettings((prevState) => ({ ...prevState, progress: 0 }));
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      }
    } else {
      if (pomodoroSettings.progress === pomodoroSettings.breakDuration) {
        setPomodoroSettings((prevState) => ({ ...prevState, focus: !prevState.focus }));
        setPomodoroSettings((prevState) => ({ ...prevState, progress: 0 }));
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      }

    }
  }
  session()
  return (
    <div className="pomodoro">
      <SetDurations timeManageProp={minutesToDuration} runningProp={isTimerRunning} currentState={pomodoroSettings} setProp={setPomodoroSettings} />
      <Control propControl={playPause} runningProp={isTimerRunning} stopProp={setIsTimerRunning} setProp={setPomodoroSettings} />
      <Display runningProp={isTimerRunning} currentState={pomodoroSettings} timeSeconds={secondsToDuration} />
    </div>
  );
}

export default Pomodoro;
