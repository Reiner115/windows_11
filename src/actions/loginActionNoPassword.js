
import axios from "axios";
import {  LOGIN_ACTION, SIGN_UP } from "../helpers/actionTypes";
import URLs from "../helpers/URLs";
import { setLocalState } from "../reducers/localStorage";
export default function loginAction( action ){
    return( dispatch , getState )=>{




        const body = { name  : action.user.userName , password : action.user.password };
        if( action.type === LOGIN_ACTION ){
            axios.post( URLs.LOGIN, body ).then(data =>{
                if( data.status === 200 ){
                    const parsed = data.data;
                    setLocalState( parsed );
                    action.showWelcomeScreen();
                    setTimeout(()=>{
                        dispatch( { type : "LOAD_FILES_SUCCESSFULY" , payload : parsed.files });
                        dispatch( { type : LOGIN_ACTION , state : parsed.user });
                    },3000);
                }else{
                    action.showErrorMessage(data.data);
                   // alert( JSON.stringify(data.data) );
                }                
            }).catch(err=>{
            if( err.response && err.response.data && err.response.data.responseMessage )    
            action.showErrorMessage(err.response.data.responseMessage);
            else if( err.message )
            action.showErrorMessage(err.message);
            else
            action.showErrorMessage(JSON.stringify(err));
            //action.showLoginScreen();
            });
        }

        if( action.type === SIGN_UP ){
            axios.post( URLs.SIGNUP, body ).then(data =>{                

                if( data.status === 200 ){
                    const parsed = data.data;
                    setLocalState( parsed );
                    action.showWelcomeScreen();
                    setTimeout(()=>{
                        dispatch( { type : "LOAD_FILES_SUCCESSFULY" , payload : parsed.state.files });
                        dispatch( { type : LOGIN_ACTION , state : parsed.state.user });
                    },3000);
                }
                else{
                    action.showErrorMessage(data.data);
                   // alert( JSON.stringify( data.data) );
                }

            }).catch(err=>{
                action.showErrorMessage(err.response.data.responseMessage);
               // alert(JSON.stringify(err));
               //action.showLoginScreen();
            });
        }

        
    }
    
}







