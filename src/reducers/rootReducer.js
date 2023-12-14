import { combineReducers } from "redux";
import filesReducer from "../reducers/filesReducer";
import applicationsReducer from "./applicationsReducer";
import userReducer from "./userReducer";
import {filesInitStaete ,applicationsInitState , userInitState } from "./initState";


const rootReducer = combineReducers({
    files: (state = filesInitStaete, action) => filesReducer(state, action),
    apps: (state = applicationsInitState, action) => applicationsReducer(state, action),
    user: (state = userInitState, action) => userReducer(state, action),
  });
  export default rootReducer;