import { getToken } from "../reducers/localStorage";
import URLs from "../helpers/URLs";        
import doAction from "./doAction";
import { UPDATE_STATE } from "../helpers/actionTypes";


export default function renameAction( action ){
    return ( dispatch , getState )=>{
       
      let state = getState();

        const token = getToken();
      
        const body = {
          files : state.files,
          oldName : action.oldName,
          newName : action.newName
        }

        doAction(  URLs.RENAME_FILE  , state , body, token, dispatch , UPDATE_STATE);


    }
}