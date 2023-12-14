import { HIDE_LOADING_STATE, LOADING_STATE, LOGIN_ACTION, SHOW_LOADING_STATE } from "../helpers/actionTypes";

export default function userReducer(state, action) {
  switch (action.type) {
    case SHOW_LOADING_STATE:
      let state1 = structuredClone(state);
      state1.isLoading = true;
      return state1;
    case HIDE_LOADING_STATE:
      let state2 = structuredClone(state);
      state2.isLoading = false;
      return state2;  
    case LOADING_STATE:
      let state3 = structuredClone(state);
      state3.isLoading = true;
      return state3;
    case LOGIN_ACTION:
      let st = structuredClone(action.state);
      for (let key in st.apps) {
        st.apps[key].isRunning = false;
      }
      st.currentPath = [];
      st.pathFiles = st.children;
      st.isLoading = false;
      return st;
    default:
      return state;
  }
}
