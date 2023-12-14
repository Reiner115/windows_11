import React, { createRef, useEffect } from "react";
import {  useSelector } from "react-redux";
import WindowBar from "../WindowBar";

function ProgressBar(props) {
  const progressInnerRef = createRef();
  const progressTextRef = createRef();
  const app = useSelector((state) => state.apps.progressBar);

  function setProgress(progress) {
    progressInnerRef.current.style.width = progress + "%";
  }

  const customEventListener = (event) => {
    if (event.detail && event.detail.progress) {
      setProgress(event.detail.progress);
    }
  };

  useEffect(() => {
    setProgress(0);
    document.addEventListener(props.progressEventName, customEventListener);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener(
        props.progressEventName,
        customEventListener
      );
    };
  });

  return (
    <WindowBar app={app}>
    <section className="progress-bar-container">
      <div className="progress-text-container">
        <div className="progress-text" id="progress-text" ref={progressTextRef}>
          Uploading........
        </div>
      </div>
      <div className="progress">
        <div
          className="progress_inner"
          id="progress_inner"
          ref={progressInnerRef}
        ></div>
      </div>
    </section>
     </WindowBar>
  );
}

export default ProgressBar;
