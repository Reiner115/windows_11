import React from "react";
import { ReactComponent as PathDownIcon } from "../../images/path-down.svg";
import { ReactComponent as PathRightIcon } from "../../images/path.svg";

import getImage from "../../helpers/getImage";

const desktopSm = getImage("desktop-sm.png");
const diskSm = getImage("disk-sm.png");
const windowsDiskSm = getImage("disk-windows-sm.png");
const documentsSm = getImage("documents-sm.png");
const downloadsSm = getImage("downloads-sm.png");
const musicSm = getImage("music-sm.png");
const picturesSm = getImage("pictures-sm.png");
const starSm = getImage("star-sm.png");
const PcSm = getImage("thispc-sm.png");
const videosSm = getImage("videos-sm.png");

const Navigation = () => {
  return (
    <section className="navigation">
      <div className="side-nav-menu">
        <div className="nav-menu-leader">
          <PathDownIcon className="nav-path-icon" />

          <img src={starSm} alt="navigation" className="nav-menu-item-icon" />
          <div className="nav-menu-item-text">Desktop</div>
        </div>

        <div className="nav-menu-items">
          <MenuItem icon={downloadsSm} title="Downloads" />
          <MenuItem icon={documentsSm} title="Documents" />
          <MenuItem icon={picturesSm} title="Pictures" />
        </div>
      </div>

      <div className="side-nav-menu">
        <div className="nav-menu-leader">
          <PathDownIcon className="nav-path-icon" />

          <img src={PcSm} alt="navigation" className="nav-menu-item-icon" />
          <div className="nav-menu-item-text">PC</div>
        </div>

        <div className="nav-menu-items">
          <MenuItem icon={desktopSm} title="Desktop" />
          <MenuItem icon={documentsSm} title="Documents" />
          <MenuItem icon={downloadsSm} title="Downloads" />
          <MenuItem icon={musicSm} title="Music" />
          <MenuItem icon={picturesSm} title="Pictures" />
          <MenuItem icon={videosSm} title="Videos" />
          <MenuItem icon={windowsDiskSm} title="Local disk (C:)" />
          <MenuItem icon={diskSm} title="Local disk (D:)" />
        </div>
      </div>
    </section>
  );
};

export default Navigation;

const MenuItem = (props) => {
  return (
    <div className="nav-menu-item">
      <PathRightIcon className="nav-path-icon" />
      <img src={props.icon} alt="navigation" className="nav-menu-item-icon" />
      <div className="nav-menu-item-text">{props.title}</div>
    </div>
  );
};
