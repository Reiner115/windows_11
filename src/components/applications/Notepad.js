import { React, useEffect } from "react";
import { useSelector } from 'react-redux';
import WindowBar from "../WindowBar";
export default function Notepad(props) {

  const app = useSelector(state => state.apps.notepad);


  useEffect(() => {
    const containers = document.getElementsByClassName(
      "notepad-menu-item-contianer"
    );
    for (let i = 0; i < containers.length; i++) {
      const item = containers[i].getElementsByClassName("notepad-menu-item")[0];
      const menu = containers[i].getElementsByClassName(
        "notepad-menu-item-menu"
      )[0];

      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const items = document.getElementsByClassName("notepad-menu-item-menu");
        //hide all other menus
        for (let j = 0; j < items.length; j++) {
          if (items[j] !== menu) items[j].classList.add("hidden");
        }
        menu.classList.toggle("hidden");
      });
      document.addEventListener("click", (e) => {
        menu.classList.add("hidden");
        e.stopPropagation();
      });
    }
  });

  return (
    <WindowBar app={app}>
      <section className="notepad-container">
        <div className="notepad-menus">
          <div className="notepad-menu-item-contianer">
            <div className="notepad-menu-item">File</div>
            <div className="notepad-menu-item-menu hidden">
              <div className="note-item">New</div>
              <div className="note-item">Open</div>
              <div className="note-item">Save</div>
              <div className="note-item">Save as </div>
              <div className="note-item">Page setup </div>
              <div className="note-item">Print </div>
              <div className="note-item">Exit</div>
            </div>
          </div>

          <div className="notepad-menu-item-contianer">
            <div className="notepad-menu-item">Edit</div>
            <div className="notepad-menu-item-menu hidden">
              <div className="note-item">Cut</div>
              <div className="note-item">Copy</div>
              <div className="note-item">Paste</div>
              <div className="note-item">Delete</div>
            </div>
          </div>

          <div className="notepad-menu-item-contianer">
            <div className="notepad-menu-item">Format</div>
            <div className="notepad-menu-item-menu hidden">
              <div className="note-item">Word wrap</div>
              <div className="note-item">Font</div>
            </div>
          </div>

          <div className="notepad-menu-item-contianer">
            <div className="notepad-menu-item">View</div>
            <div className="notepad-menu-item-menu hidden">
              <div className="note-item">Zoom</div>
              <div className="note-item">Status bar</div>
            </div>
          </div>

          <div className="notepad-menu-item-contianer">
            <div className="notepad-menu-item">Help</div>
            <div className="notepad-menu-item-menu hidden">
              <div className="note-item">View help</div>
              <div className="note-item">Send feedback</div>
              <div className="note-item">About notepad</div>
            </div>
          </div>
        </div>
        <textarea
          name=""
          className="notepad-text-area"
          id="notepad-textarea"
          cols="30"
          rows="10"
        ></textarea>
      </section>
    </WindowBar>
  );
}
