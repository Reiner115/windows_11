const ITEM_NAME = "STATE_LOCAL_STORAGE";
const TOKEN = "TOKEN";
export function getLocalState(){
    return localStorage.getItem( ITEM_NAME );
}
export function getToken(){
    return localStorage.getItem( TOKEN );
}
export function setLocalState( state ){
    try{
        localStorage.setItem( TOKEN , state.user.token );
        return localStorage.setItem( ITEM_NAME , state );
    }catch( e ){
        return undefined;
    }
    

}