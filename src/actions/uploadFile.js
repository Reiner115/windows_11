import axios from "axios";
import { CLOSE_APP, OPEN_APP, SHOW_ERROR_MESSAGE, UPDATE_STATE } from "../helpers/actionTypes";
import URLs from "../helpers/URLs";
import { getToken } from "../reducers/localStorage";
export default function uploadFileInput(action) {
  return (dispatch, getState) => {
    const state = getState();

    const key =  state.apps.progressBar.key;
    dispatch({ type: OPEN_APP, appKey: key });

    const file = document.getElementById("upload-input").files[0];
    let form = new FormData();

    form.append("file", file);
    form.append("files", JSON.stringify(state.files));
    const token = getToken();
    axios
      .post(URLs.UPLOAD, form, {
        onUploadProgress: onUploadProgress,
        headers: {
          authorization: token,
        },
      })
      .then((data) => {
        dispatch({ type: UPDATE_STATE, payload: data.data.files });
      })
      .catch((e) => {
        dispatch({ type: SHOW_ERROR_MESSAGE , payload : "Some Error occured , please try again" });
      });

    function onUploadProgress(progressEvent) {
      const progress = (progressEvent.loaded / progressEvent.total) * 100;
      action.callback(progress);
      if (progress === 100)
        setTimeout(() => {
          dispatch({ type: CLOSE_APP, appKey: key });
        }, 2000);
    }
  };
}
