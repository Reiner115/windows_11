import {
 CLOSE_APP, MAXIMIZE_APP, MINIMIZE_APP, MINIMIZE_OR_MAXIMIZE_APP, OPEN_APP,
  OPEN_APP_WITH_SRC,
  SET_APP_ON_TOP_VIEW,
  SHOW_ERROR_MESSAGE
} from "../helpers/actionTypes";
import ZIndex from "../helpers/ZIndex";

export default function applicationsReducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    
    case CLOSE_APP :
        return closeApp( state , action );
    case MINIMIZE_OR_MAXIMIZE_APP :
        return minOrMaxApp( state , action );
    case MAXIMIZE_APP :  
          return maximize( state , action );
    case MINIMIZE_APP :
      return minimize( state , action );
    case SHOW_ERROR_MESSAGE:
      let errorApp = structuredClone( state.error );
      errorApp.message = action.payload;
      errorApp.isTop=true;
      errorApp.isRunning=true;
      errorApp.zIndex = ZIndex.getZIndex();
      return { ...state , error : errorApp };
    case SET_APP_ON_TOP_VIEW:
      return setAppOnTopView(state, action);
    case OPEN_APP:
      return openApp(state , action);
    case OPEN_APP_WITH_SRC :
      return openAppWithSrc(state , action);  
    default:
      return state;
  }
}


function openApp(state , action){
  let app =  structuredClone(state[action.appKey]);
  for (let key in state) {
    state[key].isTop = false;
  }
  if( ! app.isRunning ){
    app.isTop = true;
    app.isMinimized = false;
    app.zIndex =  ZIndex.getZIndex();
    app.isRunning = true;
  }
  state[action.appKey] = app;
  return structuredClone(state);
}

function openAppWithSrc( state , action ){
    let app = structuredClone( state[action.appKey]);
    for (let key in state) {
      state[key].isTop = false;
    }
    app.src = action.payload;
    app.isRunning = true;
    app.isTop = true;
    app.isMinimized = false;
    app.zIndex = ZIndex.getZIndex();
    state[action.appKey] = app;
    return structuredClone(state);

} 

function closeApp( state , action ){
  let app =  structuredClone(state[action.appKey]);
  if( app.isRunning ){
    app.isRunning = false;
    app.isTop = false;
    app.isMinimized = false;
    app.zIndex = 0;
  }
  state[action.appKey] = app;
  return structuredClone(state);
}


function minOrMaxApp(state , action){
  let app =  structuredClone(state[action.appKey]);
  if( app.isMinimized )
    return maximize( state , action )
  else
    return minimize( state , action )
}

function minimize( state , action ){
  let app =  structuredClone(state[action.appKey]);
  if( app.isRunning ){
    app.isTop = false;
    app.isMinimized = true;
  }
  state[action.appKey] = app;
  return structuredClone(state);
}

function maximize( state , action ){
  let app =  structuredClone(state[action.appKey]);
  if( app.isRunning ){
    app.isTop = true;
    app.isMinimized = false;
    app.zIndex =  ZIndex.getZIndex();
  }
  state[action.appKey] = app;
  return structuredClone(state);
}




function setAppOnTopView(state, action) {
  let apps = structuredClone(state);
  if (apps[action.appName].isRunning) {
    for (let key in apps) {
      apps[key].isTop = false;
    }
    apps[action.appName].isTop = true;
    apps[action.appName].zIndex = ZIndex.getZIndex();
  } else {
    apps[action.appName].isTop = false;
  }

  return apps;
}



