import React from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  WINDOWS_DISK,
  DISK,
  FOLDER,
  DESKTOP,
  DOCUMENTS,
  DOWNLOADS,
  MUSIC,
  PICTURES,
  VIDEOS,
  ONEDRIVE,
  IMAGE,
  TXT,
  VIDEO,
  AUDIO,
} from "../../helpers/FilesTypes";
import { RENAME_FILE, SHOW_ERROR_MESSAGE } from "../../helpers/actionTypes";
import renameAction from "../../actions/renameAction";
import deleteAction from "../../actions/deleteFile";
import URLs from "../../helpers/URLs";
import getImage from "../../helpers/getImage";

const folder = getImage("folder.png");
const disk = getImage("disk-sm.png");

//const desktop = getImage("desktop.png");
//const documents = getImage("documents.png");
//const downloads = getImage("downloads.png");
const music = getImage("music.png");
//const onedrive = getImage("onedrive.png");
//const pictures = getImage("pictures.png");
//const videos = getImage("videos.png");
const windowsDisk = getImage("disk-windows-sm.png");
const image = getImage("photo.png");
const notepadIcon = getImage("notepad2.png");
const audioIcon = getImage("Music_file.png");
const videIcon = getImage("Videos file.png");
const pdfIcon = getImage("pdf.png");

const fileType = (type) => {
  switch (type) {
    case WINDOWS_DISK:
      return windowsDisk;
    case DISK:
      return disk;
    case FOLDER:
      return folder;
    // case DESKTOP: return desktop;
    // case DOCUMENTS: return documents;
    // case DOWNLOADS: return downloads;
    case MUSIC:
      return music;
    //  case PICTURES: return pictures;
    //  case VIDEOS: return videos;
    case VIDEO:
      return videIcon;
    //  case ONEDRIVE: return onedrive;
    case IMAGE:
      return image;
    case TXT:
      return notepadIcon;
    case AUDIO:
      return audioIcon;
    case "PDF":
      return pdfIcon;
    default:
      return folder;
  }
};

const File = (props) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [imageIcon] = useState(fileType(props.type));
  const fileIconRef = useRef();
  const fileRef = React.createRef();

  const loadImage = () => {
    fileIconRef.current.src = URLs.thumbnail + props.file.urlName;
  };

  const dispatch = useDispatch();

  const showInputWhenRenaming = () => {
    setTimeout(() => {
      const parent = fileRef.current;
      let input = parent.querySelector("input");
      input.focus();
    }, 1000);
  };

  const handleRightClickMenu = () => {
    let fileCustomContextMenu = fileRef.current;

    let menu =
      fileCustomContextMenu.getElementsByClassName("customContextMenu")[0];

    fileCustomContextMenu.addEventListener("contextmenu", (e) => {
      let allMenus = document.getElementsByClassName("customContextMenu");
      for (let i = 0; i < allMenus.length; i++) {
        allMenus[i].classList.add("hidden");
      }
      e.preventDefault(); // Prevent the default browser context menu
      e.stopPropagation();
      const x = e.clientX;
      const y = e.clientY;

      menu.style.left = `${x}px`;
      menu.style.top = `${y}px`;

      menu.classList.remove("hidden");
    });
    document.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  };

  useEffect(() => {
    if (props.file.type === IMAGE) loadImage();

    if (isRenaming) showInputWhenRenaming();

    handleRightClickMenu();
  });

  const type = fileType(props.type);

  function download() {
    var anchor = document.createElement("a");
    anchor.href = URLs.CLUOD + props.file.urlName + "?download=true";
    anchor.target = "_blank";
    anchor.download = props.file.name;
    anchor.click();
  }
  return (
    <div
      ref={fileRef}
      onDoubleClick={() => {
        props.onDoubleClick(
          props.name,
          props.type,
          props.absolutePath,
          props.file
        );
      }}
      onBlur={() => {
        setIsSelected(false);
      }}
      id={props.absolutePath}
      className={isSelected ? "file file-selected" : "file"}
    >
      {
        <FileCustomContextMenu
          name={props.absolutePath}
          showRenameInput={showRenameInput}
          deleteFile={deleteFile}
          open={() => {
            props.onDoubleClick(
              props.name,
              props.type,
              props.absolutePath,
              props.file
            );
          }}
          download={() => download()}
          type={props.file.type}
        />
      }

      {props.type === IMAGE ? (
        <img
          src={imageIcon}
          alt=""
          id={props.file.urlName}
          ref={fileIconRef}
          className="file-icon"
        />
      ) : (
        <img
          loading="lazy"
          src={type}
          alt=""
          className="file-icon"
        />
      )}

      {isRenaming ? (
        <input
          autoFocus
          type="text"
          onBlur={(e) => onInputBlur(e)}
          onKeyDown={(e) => {
            if (e.code === "Enter") onInputBlur(e);
          }}
          defaultValue={props.name}
          className="file-name rename-input"
        />
      ) : (
        <input value={props.name} className="file-name" readOnly />
      )}
    </div>
  );

  function onInputBlur(e) {
    if (props.name !== e.target.value) {
      dispatch(
        renameAction({
          type: RENAME_FILE,
          newName: e.target.value,
          oldName: props.name,
        })
      );
    } else {
    }
    setIsRenaming(false);
  }

  function deleteFile() {
    dispatch(deleteAction({ file: props }));
  }

  function showRenameInput() {
    setIsRenaming(true);
  }
};

export default File;

const FileCustomContextMenu = (props) => {
  return (
    <div id="fileCustomContextMenu" className="customContextMenu hidden">
      <ul>
        <li onClick={() => props.open()}>Open</li>

        {props.type !== FOLDER ? (
          <li onClick={() => props.download()}>Download</li>
        ) : (
          ""
        )}

        <li onClick={() => props.showRenameInput()}>Rename</li>

        <li onClick={() => props.deleteFile()}>Delete</li>
      </ul>
    </div>
  );
};
