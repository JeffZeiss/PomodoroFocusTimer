import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import classNames from "../utils/class-names";


function Display(props) {
  // Timer starts out paused
  // const defaultPomodoro = {
  //   focusDuration:25*60,
  //   maxFocus:60*60,
  //   minFocus:5*60,
  //   breakDuration:5*60,
  //   maxBreak:15*60,
  //   minBreak:1*60,
  //   stopped: false,
  //   progress: 0,
  //   focus: true
  // }
  const { currentState, timeSeconds, runningProp } = props;
  const { stopped, focus, progress, focusDuration, breakDuration } = currentState;
  console.log(((progress / (focus ? focusDuration : breakDuration)) * 100));

  if (stopped === true) { return null }

  return (
    <div>
      {/* TODO: This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">{focus ? "Focusing" : "On Break"} for {focus ? timeSeconds(focusDuration) : timeSeconds(breakDuration)} minutes</h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {focus ? timeSeconds(focusDuration - progress) : timeSeconds(breakDuration - progress)} remaining
        </p>

          {!runningProp ? <h3>Paused</h3> : null}
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
              aria-valuenow={((progress / (focus ? focusDuration : breakDuration)) * 100)} // TODO: Increase aria-valuenow as elapsed time increases
              style={{ width: `${((progress / (focus ? focusDuration : breakDuration)) * 100)}%` }} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;
