import { UPDATE_STATE } from "../helpers/actionTypes";
import URLs from "../helpers/URLs";
import { getToken } from "../reducers/localStorage";
import doAction from "./doAction";


export default function deleteFileAction(action) {
  return (dispatch, getState) => {
    let state = getState();

    const path = action.file.absolutePath;

    const token = getToken();

    const body = {
      files: state.files,
      path: path,
      type: action.file.type,
    };

    doAction(  URLs.DELETE_FILE  , state , body, token, dispatch , UPDATE_STATE);
  };
}
