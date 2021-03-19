import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import classNames from "../utils/class-names";
import {minutesToDuration} from '../utils/duration';
import {secondsToDuration} from '../utils/duration';
import SetDurations from "./SetDurations"
import Control from "./Control"

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const defaultPomodoro = {
    focusDuration:25*60,
    maxFocus:60*60,
    minFocus:5*60,
    breakDuration:5*60,
    maxBreak:15*60,
    minBreak:1*60,
    stopped: true,
    progress: 0,
    focus: true
  }
  const [pomodoroSettings, setPomodoroSettings]= useState({...defaultPomodoro})

  // console.log(minutesToDuration(defaultPomodoro.maxFocus/60))
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setPomodoroSettings((prevState)=>({...prevState,progress: prevState.progress + 1}))
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setPomodoroSettings((prevState)=>({...prevState,stopped:false}))
  }

  return (
    <div className="pomodoro">
      <SetDurations timeManageProp={minutesToDuration} runningProp = {isTimerRunning} currentState={pomodoroSettings} setProp={setPomodoroSettings} />
      <Control propControl={playPause} runningProp = {isTimerRunning} stopProp={setIsTimerRunning}setProp={setPomodoroSettings}/>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">Focusing for 25:00 minutes</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              25:00 remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
