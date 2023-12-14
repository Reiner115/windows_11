
import React , { useEffect } from "react";
import WindowBar from "../WindowBar";
import { useSelector } from "react-redux";
export default function VideoPlayer(props){

    const app = useSelector(state => state.apps.videoPlayer);


    useEffect(()=>{
        init();
    })

    function init(){
        
        
    }

    return(
        <WindowBar app={app} onClose={()=>{
            const video = document.getElementById('videoPlayer');
            video.pause();
            video.src=null;



        }}>
        <div id="video-player" className="video-player">
        
        <div className="video-container" >
        <video id="videoPlayer" src={app.src} controls>
            <source src={app.src} type="video/mp4"/>
            Your browser does not support the video tag.
        </video>
        </div>


    </div>
    </WindowBar>
    );
}