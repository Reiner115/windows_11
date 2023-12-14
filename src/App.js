import React from "react";
import { connect } from "react-redux";
import Application from "./components/applications/Application";
import Camera from "./components/applications/Camera";
import Image from "./components/applications/Image";
import MusicPlayer from "./components/applications/Musicplayer";
import Notepad from "./components/applications/Notepad";
import NotesComponent from "./components/applications/Notes";
import PDFViewer from "./components/applications/PDFViewer";
import Terminal from "./components/applications/Terminal";
import VideoPlayer from "./components/applications/VideoPlayer";
import Calc from "./components/Calc";
import Error from "./components/Error";
import Explorer from "./components/explorer/Explorer";
import Header from "./components/explorer/Header";
import Navigation from "./components/explorer/Navigation";
import Progress from "./components/explorer/Progress";
import Loading from "./components/Loading";
import { LoginScreen } from "./components/LoginScreenNoPasswod";
import Menu from "./components/Menu";
import Taskbar from "./components/Taskbar";
import WindowBar from "./components/WindowBar";
import "./css/style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.desktopRef = React.createRef();
    this.menuRef = React.createRef(null);
  }

  render() {
    if (!this.props.user.isLoggedIn) return <LoginScreen />;

    return (
      <>
        {this.props.user.isLoading && <Loading />}

        <div id="desktop" className="desktop" ref={this.desktopRef}>
          <Application app={this.props.apps.notepad} />
          <Application app={this.props.apps.explorer} />
          <Application app={this.props.apps.notes} />
          <Application app={this.props.apps.camera} />
          <Application app={this.props.apps.calc} />
          <Application app={this.props.apps.terminal} />


          {this.props.apps.progressBar.isRunning && (
            <Progress progressEventName="uploadProgressEvent" />
          )}

          {this.props.apps.terminal.isRunning && <Terminal />}

          {this.props.apps.calc.isRunning && <Calc />}

          {this.props.apps.error.isRunning && <Error />}

          {this.props.apps.notepad.isRunning && <Notepad />}

          {this.props.apps.images.isRunning && <Image />}

          {this.props.apps.notes.isRunning && <NotesComponent />}

          {this.props.apps.music.isRunning && <MusicPlayer />}

          {this.props.apps.camera.isRunning && <Camera />}

          {this.props.apps.videoPlayer.isRunning && <VideoPlayer />}

          {this.props.apps.pdfViewer.isRunning ? <PDFViewer /> : ""}

          {this.props.apps.explorer.isRunning && this.explorer()}

          <Menu menuRef={this.menuRef} />
        </div>
        <Taskbar
          onAppClick={this.changeStacking}
          menuRef={this.menuRef}
          menuButtonId="menuButton"
        />
      </>
    );
  }

  explorer = () => {
    return (
      <WindowBar app={this.props.apps.explorer} appRef={this.explorerRef}>
        <Header />
        <section className="main">
          <Navigation />
          <section className="vertical-seperator"></section>
          <Explorer />
        </section>
        <footer></footer>
      </WindowBar>
    );
  };

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    apps: state.apps,
    files: state.files,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    refresh: () => {
      let el = document.getElementById("desktop");
      el.classList.add("desktop-hidden");
      setTimeout(() => {
        el.classList.remove("desktop-hidden");
      }, 100);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
