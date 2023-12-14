//import { produce } from "immer";
import {
  BACK,
  CREATE_FOLDER,
  DELETE_FILE,
  OPEN_FOLDER,
  RENAME_FILE,
  UPDATE_STATE,
  UPLOAD_FILE,
} from "../helpers/actionTypes";
import { getFiles } from "../helpers/explorer";

export default function actionsReducer(state, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "LOAD_FILES_SUCCESSFULY":
      let currentFiles = action.payload;
      currentFiles.currentPath = [];
      currentFiles.pathFiles = getFiles(currentFiles, []);
      return structuredClone(currentFiles);
    case DELETE_FILE:
      return deleteFileState(action.newState);
    case CREATE_FOLDER:
      const createFolderState = structuredClone(action.newState);
      return createFolderState;
    case RENAME_FILE:
      const renameNewState = structuredClone(action.newState);
      return renameNewState;
    case UPLOAD_FILE:
      return structuredClone(uploadFileState(state, action));
    default:
      return state;
    case OPEN_FOLDER:
      let openFolderState = structuredClone(state);
      openFolderState.pathFiles = action.payload;
      return openFolderState;
    case BACK:
      let files = structuredClone(state);
      return back(files, action);
    case UPDATE_STATE:
      let updatedState = structuredClone(action.payload);
      updatedState.pathFiles = getFiles(updatedState, updatedState.currentPath);

      return updatedState;
  }
}

function deleteFileState(state) {
  const newState = structuredClone(state);
  return newState;
}

function uploadFileState(state, action) {
  state.children = action.children;
  state.pathFiles = action.pathFiles;
  let nextState = structuredClone(state);
  nextState.children = action.children;
  nextState.pathFiles = action.pathFiles;
  /*
  let nextState = produce(state, (draft) => {
    draft.children = action.children;
    draft.pathFiles = action.pathFiles;
  });
*/
  const nextState2 = {
    ...nextState,
    children: action.children,
    pathFiles: action.pathFiles,
  };

  return nextState2;
}

function back(state, action) {
  if (state.currentPath.length > 1) {
    state.currentPath.pop();
    const newFiles = getFiles(
      { ...state, children: [...state.children] },
      state.currentPath
    );
    return {
      ...state,
      files: newFiles,
      pathFiles: [...newFiles],
    };
  } else {
    return {
      ...state,
      pathFiles: [...state.children],
      currentPath: [],
    };
  }
}
