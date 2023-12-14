// ContainerComponent.js
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  CLOSE_APP,
  MINIMIZE_APP,
  SET_APP_ON_TOP_VIEW,
} from "../helpers/actionTypes";
import getImage from "../helpers/getImage";
import makeDraggable from "../helpers/makeDraggable";
import { isDescendant } from "../helpers/util";
import close from "../images/close.png";
import max from "../images/maximize.png";
import min from "../images/minimize.png";
const WindowBar = (props) => {
  const icon = getImage(props.app.icon);

  const dispatch = useDispatch();
  const windowRef = useRef();

  function minAction(id) {
    dispatch({ type: MINIMIZE_APP, appKey: props.app.key });
  }
  const closeAction = async (id) => {
    if (props.onClose !== undefined) await props.onClose();
    dispatch({ type: CLOSE_APP, appKey: props.app.key });
  };

  useEffect(() => {
    makeDraggable(windowRef.current);
    makeVisiableOnFoucs(windowRef.current, props.app);
  });

  function makeVisiableOnFoucs(element, app) {
    element.onmousedown =
      ("onmousedown",
      (e) => {
        if (app.isTop) return;
        let child = e.target;
        if (isDescendant(child, element) || child === element) {
          dispatch({ type: SET_APP_ON_TOP_VIEW, appName: app.key });
        }
      });
  }

  let className = "window-bar ";
  if (props.app.className) className += props.app.className;
  if (props.app.isMinimized) className += " hidden";

  return (
    <div
      id={props.app.id}
      className={className}
      ref={windowRef}
      style={{ zIndex: props.app.zIndex }}
    >
      <section
        ref={props.appRef}
        className="window-bar-top"
        draggable="true"
        onDoubleClick={(e) => resizeWindow(e)}
      >
        <div className="row ai-center gap-8 pl-8">
          <img src={icon} alt="" className="bar-logo" />
          <div>{props.app.title}</div>
        </div>

        <div className="btns-container">
          <div
            className="btn-container"
            onClick={() => {
              if (props.options) {
                if (props.options.allowMin === false) return;
                minAction();
              } else {
                minAction();
              }
            }}
          >
            <img src={min} alt="" className="btn" />
          </div>

          <div
            className="btn-container"
            onClick={() => {
              if (props.options) {
                if (props.options.allowMax === false) return;
                resizeWindow();
              } else {
                resizeWindow();
              }
            }}
          >
            <img src={max} alt="" className="btn" />
          </div>

          <div
            className="btn-container btn-close-container"
            onClick={() => closeAction()}
          >
            <img src={close} alt="" className="btn btn-close" />
          </div>
        </div>
      </section>

      {props.children}
    </div>
  );

  function resizeWindow() {
    let el = windowRef.current;
    el.style.left = "";
    el.style.top = "";
    if (el.classList.contains("small-size-window")) {
      el.classList.remove("small-size-window");
      el.classList.add("max-size-window");
      if (!props.app.isTop)
        dispatch({ type: SET_APP_ON_TOP_VIEW, appName: props.app.key });
      return;
    }

    if (el.classList.contains("max-size-window")) {
      el.classList.remove("max-size-window");
      el.classList.add("small-size-window");
      if (!props.app.isTop)
        dispatch({ type: SET_APP_ON_TOP_VIEW, appName: props.app.key });
      return;
    }

    el.classList.add("max-size-window");
    if (!props.app.isTop)
      dispatch({ type: SET_APP_ON_TOP_VIEW, appName: props.app.key });
  }
};
export default WindowBar;
