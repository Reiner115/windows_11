import React from "react";
import { connect } from "react-redux";
import createFolderAction from "../actions/createFolder";
class RightClickMenu extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.contextMenu = React.createRef();
    this.xPos = 0;
    this.yPos = 0;
  }

  render() {
    return (
      <div
        id={"customContextMenu" + this.props.containerId}
        ref={this.contextMenu}
        className="customContextMenu hidden-contextMenu"
      >
        <ul>
          <li onClick={() => this.props.createNewFolder()}>New Folder</li>
          <li
            onClick={() => {
              this.props.onRefresh();
            }}
          >
            Refresh
          </li>
          <li onClick={() => this.props.chooseFile()}>Upload File</li>
        </ul>
      </div>
    );
  }

  setPos = (x, y) => {
    this.xPos = x;
    this.yPos = y;
    // console.log(this.xPos , " , ", this.yPos);
  };

  componentDidMount() {
    const customContextMenu = this.contextMenu.current;
    let clazz = this;

    window.onmousemove = function (e) {
      // console.log(e.clientX);
      // console.log(e.clientY);
      this.xPos = e.clientX;
      this.yPos = e.clientY;
      clazz.setPos(e.clientX, e.clientY);
    };
    customContextMenu.parentNode.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      const x = e.clientX;
      const y = e.clientY;

      // Calculate the menu position relative to the viewport
      //console.log(this.xPos, " , ", this.yPos);
      //customContextMenu.style.left = `${this.xPos}px`;
      //customContextMenu.style.top = `${this.yPos}px`;
      customContextMenu.style.left = `${x}px`;
      customContextMenu.style.top = `${y}px`;
      customContextMenu.classList.remove("hidden-contextMenu");
    });

    document.addEventListener("click", () => {
      customContextMenu.classList.add("hidden-contextMenu");
    });
  }
}
const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewFolder: () => {
      dispatch(createFolderAction({ name: "New Folder" }));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RightClickMenu);
