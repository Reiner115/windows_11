import { UPDATE_STATE,LOADING_STATE } from "../actionTypes";
import axios from "axios";
import URLs from "../helpers/URLs";
export default function updateState( action ){
    return ( dispatch , getState )=>{
        const oldState = getState();
        //axios.defaults.auth = oldState.user.token;
        dispatch({ type : LOADING_STATE })
        axios.post(  URLs.STATE
        ,{ state :  action.state } 
        , { headers : { "authorization" :oldState.user.token , "Content-Type":"application/json"} }).then( res =>{
          //  const jsonResponse = JSON.parse( res.data );
            
            
            if( res.status == 200 ){
                
           setTimeout(()=> dispatch({ type : UPDATE_STATE , state : oldState }) , 4000);
    
            }
            if( res.status == 205 ){
    
            }       
    
        }).catch(err=>alert(err));
    }

    
}