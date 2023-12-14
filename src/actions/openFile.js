import {  OPEN_APP_WITH_SRC, OPEN_FOLDER } from "../helpers/actionTypes";
import { getFiles } from "../helpers/explorer";
import {
  AUDIO,
  DISK,
  FOLDER,
  IMAGE,
  TXT,
  VIDEO,
  WINDOWS_DISK,
} from "../helpers/FilesTypes";
import URLs from "../helpers/URLs";

function openFile(action) {
  return (dispatch, getState) => {
    const state = getState();
    //if it is folder
    if (
      action.fileType === DISK ||
      action.fileType === WINDOWS_DISK ||
      action.fileType === FOLDER
    ) {
      const pathFiles = openFolder(state, action);
      dispatch({ type: OPEN_FOLDER, payload: pathFiles });
      return;
    }

    openAppBasedOnFileType(dispatch, action, state, null, action.fileType);
  };
}

function openAppBasedOnFileType(dispatch, action, state, data, fileType) {
  if (fileType === IMAGE) {
    let imageApp = state.apps.images;
    let src = URLs.CLUOD + action.file.urlName;
    dispatch({ type: OPEN_APP_WITH_SRC, payload: src, appKey: imageApp.key });
  }

  if (fileType === VIDEO) {
    let videoPlayerApp = state.apps.videoPlayer;
    let src = URLs.CLUOD + action.file.urlName;
    dispatch({ type: OPEN_APP_WITH_SRC, payload: src, appKey: videoPlayerApp.key });
  }
  if (fileType === TXT) {    
    const plain = Buffer.from(data.data, "base64").toString("utf-8");
    document.getElementById("notepad-textarea").innerText = plain;
  }

  if (fileType === AUDIO) {
    let musicPlayer = state.apps.music;
    let src = URLs.CLUOD + action.file.urlName;
    dispatch({ type: OPEN_APP_WITH_SRC, payload: src, appKey: musicPlayer.key });
  }

  if (fileType === "PDF") {
    let pdfApp = state.apps.pdfViewer;
    pdfApp.src = URLs.CLUOD + action.file.urlName;
    const appType = pdfApp.appType;
    dispatch({ type: OPEN_APP_WITH_SRC, payload: pdfApp, appType: appType });
  }
}

function openFolder(state, action) {
  state.files.currentPath.push(action.name);
  const newFiles = getFiles({ ...state.files }, state.files.currentPath);
  return newFiles;
}

export default openFile;
