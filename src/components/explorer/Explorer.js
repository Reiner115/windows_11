import React from "react";
import { connect } from "react-redux";
import openFile from "../../actions/openFile";
import uploadFileInput from "../../actions/uploadFile";
import { OPEN_FILE, SELECT_FILE } from "../../helpers/actionTypes";
import RightClickMenu from "../RightClickMenu";
import File from "./File";

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.uploadInputRef = React.createRef();
  }

  setProgress = (prog) => {
    const customEvent = new CustomEvent("uploadProgressEvent", {
      detail: { progress: prog },
    });
    // Dispatch the custom event
    document.dispatchEvent(customEvent);
  };

  componentDidMount() {
    let input = this.uploadInputRef.current;
    input.addEventListener("input", () => {
      const file = input.files[0];
      if (file) this.props.upload(this.setProgress);
    });
  }
  componentWillUnmount() {}

  render = () => {
    let props = this.props;
    let clazz = this;
    return (
      <section style={{ top: "0px" }} id="explorer" className="explorer">
        {
          //display the menu only if it is not the disks directory
          this.props.currentPath.length > 0 ? (
            <RightClickMenu
              onRefresh={this.props.refresh}
              chooseFile={() => {
                clazz.uploadInputRef.current.click();
              }}
            />
          ) : (
            <></>
          )
        }

        <div className="hidden">
          <input
            type="file"
            multiple={false}
            name="file"
            id="upload-input"
            ref={this.uploadInputRef}
            accept="audio/*,video/*,image/*"
          />
        </div>

        {
          //<ProgressBar progressEventName="uploadProgressEvent" />
        }

        {props.pathFiles.map((file) => {
          return (
            <File
              key={Math.random() * 10000 + file.absolutePath}
              absolutePath={file.absolutePath}
              name={file.name}
              selected={file.selected}
              onClick={props.select}
              onDoubleClick={props.open}
              type={file.type}
              file={file}
            />
          );
        })}
      </section>
    );
  };
}
const mapStateToProps = (state) => {
  return {
    pathFiles: state.files.pathFiles,
    currentPath: state.files.currentPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (name) => dispatch({ type: SELECT_FILE, name: name }),
    open: (name, type, abs, file) => {
      dispatch(
        openFile({
          type: OPEN_FILE,
          name: name,
          fileType: type,
          absolutePath: abs,
          file: file,
        })
      );
    },
    refresh: () => {
      let el = document.getElementById("desktop");
      el.classList.add("desktop-hidden");
      setTimeout(() => {
        el.classList.remove("desktop-hidden");
      }, 200);
    },
    upload: (setProgressCallback) => {
      dispatch(
        uploadFileInput({ type: "anytype", callback: setProgressCallback })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);

/*


 showPCFiles = (props) => {
    return (
      <>
        <div className="files-group-container">
          <div className="seperator-line-container">
            {
              //<div className="icon"></div>
            }
            <div className="text">Folders (7)</div>
            <div className="line"></div>
          </div>
          {this.pcFolders(props)}
        </div>

        <div className="files-group-container">
          <div className="seperator-line-container">
            {
              //<div className="icon"></div>
            }
            <div className="text">Devices and drives (2)</div>
            <div className="line"></div>
          </div>

          {props.pathFiles.map((file) => {
            return (
              <File
                absolutePath={file.absolutePath}
                fileName={file.fileName}
                selected={file.selected}
                onClick={props.select}
                onDoubleClick={props.open}
                fileType={file.fileType}
              />
            );
          })}
        </div>
      </>
    );
  };

  pcFolders = (props) => {
    return props.pcFolders.map((file) => {
      return (
        <File
          fileName={file.fileName}
          selected={file.selected}
          onClick={props.select}
          onDoubleClick={props.open}
          fileType={file.fileType}
        />
      );
    });
  };


*/
