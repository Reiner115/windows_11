import axios from "axios";
import { HIDE_LOADING_STATE,  SHOW_ERROR_MESSAGE, SHOW_LOADING_STATE, UPDATE_STATE } from "../helpers/actionTypes";
import { getFiles } from "../helpers/explorer";

export default function doAction(
  url,
  state,
  body,
  token,
  dispatch,
  actionType
) {
  dispatch({ type: SHOW_LOADING_STATE, state: state });

  axios
    .post(url, body, {
      headers: {
        authorization: token,
      },
    })
    .then((data) => handleSuccess(data, dispatch))
    .catch((err) => handleError(err, dispatch));




    
function handleSuccess( data , dispatch) {

  setTimeout(() => {
    dispatch({ type: HIDE_LOADING_STATE });
  }, 1000);
  

  let newState = data.data.files;
  const pathFiles = structuredClone(getFiles(newState, newState.currentPath));
  newState.pathFiles = pathFiles;
  setTimeout(() => {
    dispatch({ type: UPDATE_STATE, payload: newState });
  }, 1000);
}
function handleError(error , dispatch) {
  dispatch({ type: HIDE_LOADING_STATE });
  if (error.hasOwnProperty("response")) {    
      dispatch({ type: SHOW_ERROR_MESSAGE , payload : error.response.data.responseMessage  });
  } else if (error.request) {
    dispatch({ type: SHOW_ERROR_MESSAGE , payload : "Some Error occured , please try again" });
  } else {
    dispatch({ type: SHOW_ERROR_MESSAGE , payload : "Some Error occured , please try again" });
  }
}
}

