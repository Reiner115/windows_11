import React from "react";
import { useDispatch } from "react-redux";
import { OPEN_APP } from "../../helpers/actionTypes";
import getImage from "../../helpers/getImage";

export default function Application(props){

    const dispatch = useDispatch();

    const icon = getImage(props.app.icon)
    return(
        <div className="app" 
        onClick = {()=>dispatch({ type: OPEN_APP, appKey: props.app.key })}
        onDoubleClick={()=>dispatch({ type: OPEN_APP, appKey: props.app.key })}>
            <img src={icon} alt="" className="app-icon" />
            <div className="app-title">{props.app.title}</div>
        </div>
    );
}