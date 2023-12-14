

import { LOADING_STATE, UPDATE_STATE } from "../helpers/actionTypes";
import URLs from "../helpers/URLs";
import { getToken } from "../reducers/localStorage";
import doAction from "./doAction";




function createFolderAction( action ){
    return( dispatch , getState )=>{
      
      let state = getState();

      dispatch({ type: LOADING_STATE , state: state });

      const token = getToken();
      
      const body = {
        files : state.files,
        folderName : action.name
      }

      doAction( URLs.CREATE_FOLDER ,  state , body, token, dispatch , UPDATE_STATE );


    }
}
export default createFolderAction;





















/*
import { CREATE_FOLDER } from "../actionTypes";
import { FOLDER } from "../FilesTypes";
import {   createFolder } from "../helpers/explorer";
import { getFiles , getUniqueName , rename } from "../helpers/explorer";
import {  saveData , save, saveState } from "../helpers/db";
import updateState from "./updateState";

const databaseName = "FILES_EXPLORER_DB";
const filesStoreName = "FILES_STORE";
const stateStore = "STATE_STORE";

function createFolderAction( action ){
    return( dispatch , getState )=>{
      
      let state = getState();

      
      const name =  getUniqueName( state , state.currentPath , action.name) ;
        
        let path = state.currentPath;
        let newFolder = {
            children : [],
            name : name,
            type : FOLDER,
            absolutePath : [ ...path , name ]
        };


        //node.children.push(newFolder);
        let newState = structuredClone(createFolder(state , path , newFolder ));
        const pathFiles = structuredClone( getFiles( newState , state.currentPath ));
        newState.pathFiles = pathFiles;
        dispatch(updateState( { state : newState } ));
        
        saveState(
            newState
          ).then( result =>{


          dispatch({ type : CREATE_FOLDER , newState : newState });
            
          })
        

       
        
        }
      }
      export default createFolderAction;

*/