import React from "react";
import { connect } from "react-redux";
import { MINIMIZE_OR_MAXIMIZE_APP } from "../helpers/actionTypes";
import getImage from "../helpers/getImage";
import home from "../images/home.png";
import search from "../images/search.png";
import widget from "../images/widget.png";

class Taskbar extends React.Component {
  render() {
    return (
      <div className="taskbar">
        <div className="taskbar-icon-container">
          <img src={widget} alt="" className="taskbar-icon" />
        </div>

        <div className="taskbar-apps">
          <div id="menuButton" ref={this.props.menuRef} className="taskbar-icon-container">
            <img src={home} alt="" className="taskbar-icon" />
          </div>
          <div className="taskbar-icon-container">
            <img src={search} alt="" className="taskbar-icon" />
          </div>

          {this.allApps(this.props.apps)}
        </div>

        <div className="toolbar"></div>
      </div>
    );
  }

  allApps(apps) {
    let arr = [];
    for (let key in apps) {
      if (apps[key].isRunning) arr.push(this.getApp(apps[key]));
    }
    return arr;
  }

  getApp(app) {
    if (app.isRunning) {
      return (
        <div
        key={app.key}
          className="taskbar-icon-container taskbar-icon-container-open"
          onClick={() =>{
              //this.props.onAppClick( app.id );
              this.props.minimaizeAndMaxmieEvents(app)
            }
          }
        >
          {<img src={getImage(app.icon)} alt="" className="taskbar-icon" />}
        </div>
      );
    } else {
      return (
        <div
        key={app.key}
          className="taskbar-icon-container taskbar-icon-container-open hidden-taskbar-app"
          onClick={() => {
            //this.props.onAppClick( app.id );
            this.props.minimaizeAndMaxmieEvents(app)
          }}
        >
          <img src={getImage(app.icon)} alt="" className="taskbar-icon" />
        </div>
      );
    }
  }

  minimaizeAndMaxmieEvents(id) {
    const app = document.getElementById(id);
    app.classList.toggle("hidden");
  }
}

const mapStateToProps = (state) => {
  return {
    apps : state.apps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    minimaizeAndMaxmieEvents : ( app )=>dispatch( { type : MINIMIZE_OR_MAXIMIZE_APP , appKey : app.key })
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Taskbar);
