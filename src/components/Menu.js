import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Application from "./applications/Application";
const MenuApp = React.memo(Menu, () => true);
export default MenuApp;
function Menu(props) {
  const apps = useSelector((state) => state.apps);
  const menuRef = useRef();

  useEffect(() => {
    const handleMenuToggle = (e) => {
      menuRef.current.classList.toggle("hidden");
      e.stopPropagation();
    };

    const handleClickOutsideMenu = (event) => {
      if (!menuRef.current.contains(event.target)) {
        menuRef.current.classList.add("hidden");
      }
    };

    if (props.menuRef.current) {
      props.menuRef.current.addEventListener("click", handleMenuToggle);
    }

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      // Clean up the event listeners when the component unmounts
      if (props.menuRef.current) {
        props.menuRef.current.removeEventListener("click", handleMenuToggle);
      }
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [props.menuRef]);

  return (
    <div id="menu" className="menu hidden" ref={menuRef}>
      <div className="menu-item-container">
        <Application app={apps.notepad} />
      </div>

      <div className="menu-item-container">
        <Application app={apps.explorer} />
      </div>
      <div className="menu-item-container">
        <Application app={apps.notes} />
      </div>

      <div className="menu-item-container">
        <Application app={apps.camera} />
      </div>
      <div className="menu-item-container">
        <Application app={apps.calc} />
      </div>
      <div className="menu-item-container">
        <Application app={apps.terminal} />
      </div>

      <div className="menu-item-container">
        <Application app={apps.images} />
      </div>

      <div className="menu-item-container">
        <Application app={apps.videoPlayer} />
      </div>

      <div className="menu-item-container">
        <Application app={apps.music} />
      </div>
    </div>
  );

}
