
import WindowBar from "../WindowBar";
import React from "react";
import logo from "../../images/logo-white.svg";
import {  connect } from "react-redux";


 class MusicPlayer extends React.PureComponent {

    constructor(props){
        super(props);
        this.props = props;
        this.audioRef = React.createRef();
        this.canRef = React.createRef();
        

     }


    componentDidMount(){

        this.audioPlayer =  this.audioRef.current;

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

        this.analyser = this.audioContext.createAnalyser();
    
        this.audioPlayer.crossOrigin = "anonymous"; // Enable cross-origin for audio
    
        this.source = this.audioContext.createMediaElementSource(this.audioPlayer);
    
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
    
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.canvas = this.canRef.current; 
        this.ctx = this.canvas.getContext('2d');  
        this.lastDrawTime=0;
        this.frameRate=30;

        this.audioPlayer.addEventListener('play', () => {
            this.draw();
          this.audioContext.resume().then(() => {
            this.draw();
          });
        });
        

    }

draw=()=>{

        const currentTime = Date.now();
        
      if (currentTime - this.lastDrawTime >= 1000 / this.frameRate) {

        this.analyser.getByteFrequencyData(this.dataArray);

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const barWidth = (this.canvas.width / this.bufferLength) * 2.5;
        let x = 0;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.bufferLength; i++) {
          const barHeight = this.dataArray[i] * 3;

          this.ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
          this.ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight);

          x += barWidth + 1;
        }

        this.lastDrawTime = currentTime;
      }

      this.reqId = requestAnimationFrame(this.draw);

    }



  render(){
    return (
        <WindowBar app={this.props.app} onClose={()=>this.audioRef.current.pause()} 
        >
          <div id="music-player">
          <img src={logo} className="logo" alt="Thunder Dev Music Player"  />
            <h1 id="music-player-title">Thunder Music Player</h1>
           
            <canvas id="visualizer" ref={this.canRef}></canvas>
            <audio id="audio-player" src={this.props.app.src} ref={this.audioRef} controls>
            
              Your browser does not support the audio element.
            </audio>

          </div>
        </WindowBar>
      );
  }

 



}


const mapStateToProps = (state) => {

  return { app : state.apps.music};

  };

export default connect(
  mapStateToProps,
  null
)(MusicPlayer);