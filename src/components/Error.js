import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_APP } from "../helpers/actionTypes";
import getImage from "../helpers/getImage";
import Window from "./WindowBar";

const errorIcon = getImage("stop.png");
const options = {
  allowMin: false,
  allowMax: false,
};
export default function Error() {
  const app = useSelector((state) => state.apps.error);
  const dispatch = useDispatch();

  return (
    <Window app={app} options={options}>
      <section className="error-container">
        <div className="error-message-container">
          <img src={errorIcon} alt="" className="error-icon" />
          {app.message}
        </div>
        <div className="error-footer">
          <div
            className="error-button"
            onClick={() => {
              hideErrorWindow();
            }}
          >
            OK
          </div>
        </div>
      </section>
    </Window>
  );

  function hideErrorWindow() {
    dispatch({ type: CLOSE_APP, appKey: app.key });
  }
}
