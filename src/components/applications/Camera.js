import React from "react";
import { useEffect, useRef  } from "react";
import { useSelector } from "react-redux";
import WindowBar from "../WindowBar";

 export default function Camera(props) {
  const constraints = { video: true , audio : true };
  let globalStream = undefined;
  let isRescording = false;
  const videoRef = useRef();
  const startButtonRef = useRef();
  const camerControlsRef = useRef();
  const app = useSelector(state => state.apps.camera);
  const downloadRef = useRef();

  useEffect(() => {
    if (app.isRunning && app.isTop) {
     init();
      return ()=>{

        onClose();
      }
    }
      
    
  });
  function onClose(){
    if( globalStream !== undefined){
    const tracks = globalStream.getTracks();
        tracks.forEach(function (track) {
          track.stop();
    });
    globalStream = undefined;
  }
    
  }
  function init() {
    const videoElement = videoRef.current;
    const startButton = startButtonRef.current;
    let mediaRecorder;
    let recordedChunks = [];

    // Check if the browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the user's camera
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          videoElement.srcObject = stream;
          globalStream = stream;
          videoElement.play();
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
          };

          mediaRecorder.onstop = function () {
            const blob = new Blob(recordedChunks, { type: "video/mp4" });
            /*
            const tracks = stream.getTracks();
            
            tracks.forEach(function (track) {
              track.stop();
            });
            */
            const videoURL = window.URL.createObjectURL(blob);
            const a = downloadRef.current;
            a.href=videoURL;
            a.download = "recorded-video.mp4";
            a.classList.remove("control-container-deactive");
          };
        })
        .catch(function (error) {
          console.error("Error accessing the camera: " + error);
        });

      const controls = camerControlsRef.current;
      startButton.addEventListener("click", function () {
        controls.classList.toggle("controls-stop");
        if (!isRescording) {
          
          mediaRecorder.start();
          isRescording = true;
        } else {
          mediaRecorder.stop();
          isRescording = false;
        }
      });

      //stopButton.addEventListener('click', function () {

      //});
    } else {
      console.error("getUserMedia is not supported in this browser.");
    }
  }
  return (
    <WindowBar app={app} onClose={onClose}>
    <div id="video-container">
      <video id="video" autoPlay muted ref={videoRef}></video>
      <div className="camera-controls" id="camera-controls" ref={camerControlsRef}>
      <div className="control-container"></div>
       
      <div className="control-container">
        <div id="startButton" ref={startButtonRef} className="button-container">
          <div className="start-button"></div>
        </div>
        </div>

        <a 
        ref={downloadRef} 
        className="control-container control-container-deactive">Download</a>
      </div>
    </div>
    </WindowBar>
  );
}
