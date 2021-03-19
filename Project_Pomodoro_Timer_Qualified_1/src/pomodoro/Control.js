import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import classNames from "../utils/class-names";


function Control(props) {
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
  const { propControl, runningProp, stopProp, setProp } = props

  // console.log(minutesToDuration(defaultPomodoro.maxFocus/60))
  const clickStop = () => {
    stopProp(false);
    setProp((prevState) => ({ ...prevState, stopped: true }));
    setProp((prevState) => ({ ...prevState, progress: 0 }));
    setProp((prevState) => ({ ...prevState, focus: true }));
  }

  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={propControl}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !runningProp,
                "oi-media-pause": runningProp,
              })}
            />
          </button>
          {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
          <button
            type="button"
            className="btn btn-secondary"
            title="Stop the session"
            onClick={clickStop}
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Control;
