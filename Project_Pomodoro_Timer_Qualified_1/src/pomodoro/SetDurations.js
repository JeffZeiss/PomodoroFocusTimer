import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import classNames from "../utils/class-names";
import { minutesToDuration } from '../utils/duration';
import { secondsToDuration } from '../utils/duration';

//const defaultPomodoro = {
//   focusDuration:25*60,
//   maxFocus:60*60,
//   minFocus:5*60,
//   breakDuration:5*60,
//   maxBreak:15*60,
//   minBreak:1*60,
//   stopped: true,
//   progress: 0,
//   focus: true
// }

function SetDurations(props) {
  // Timer starts out paused
  const { currentState, setProp, runningProp, timeManageProp } = props

  const clickIncreaseFocus = () => {
    if (currentState.focusDuration <= 3300 && currentState.stopped) { setProp((prevState) => ({ ...prevState, focusDuration: prevState.focusDuration + 300 })) }
    else if (currentState.focusDuration > 3300 && currentState.focusDuration < 3600 && currentState.stopped) {
      { setProp((prevState) => ({ ...prevState, focusDuration: prevState.maxFocus })) }
    } else { return null }
  }

  const clickDecreaseFocus = () => {
    if (currentState.focusDuration >= 900 && currentState.stopped) { setProp((prevState) => ({ ...prevState, focusDuration: prevState.focusDuration - 300 })) }
    else if (currentState.focusDuration < 900 && currentState.focusDuration > 300 && currentState.stopped) {
      { setProp((prevState) => ({ ...prevState, focusDuration: prevState.minFocus })) }
    } else { return null }
  }

  const clickIncreaseBreak = () => {
    if (currentState.breakDuration <= 840 && currentState.stopped) { setProp((prevState) => ({ ...prevState, breakDuration: prevState.breakDuration + 60 })) }
    else if (currentState.breakDuration > 840 && currentState.breakDuration < 900 && currentState.stopped) {
      { setProp((prevState) => ({ ...prevState, breakDuration: prevState.maxBreak })) }
    } else { return null }
  }

  const clickDecreaseBreak = () => {
    if (currentState.breakDuration >= 120 && currentState.stopped) { setProp((prevState) => ({ ...prevState, breakDuration: prevState.breakDuration - 60 })) }
    else if (currentState.breakDuration < 120 && currentState.breakDuration < 900 && currentState.stopped) {
      { setProp((prevState) => ({ ...prevState, breakDuration: prevState.minBreak })) }
    } else { return null }
  }

  // const stateLabel=()=>{if()}

  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {timeManageProp(currentState.focusDuration / 60)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              onClick={clickDecreaseFocus}
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              onClick={clickIncreaseFocus}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {timeManageProp(currentState.breakDuration / 60)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                onClick={clickDecreaseBreak}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                onClick={clickIncreaseBreak}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetDurations;
