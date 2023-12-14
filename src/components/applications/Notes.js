import React from 'react';
import WindowBar from "../WindowBar";
import { useSelector } from 'react-redux';
export default function Notes(props){

    const app = useSelector(state => state.apps.notes);


    return(
        <WindowBar app={app}>
        <section className="note">
            <textarea name="" className="note-text-area" id="" cols="30" rows="10"></textarea>
        </section>
        </WindowBar>
    );
}