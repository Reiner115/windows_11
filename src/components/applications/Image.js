import React from "react";
import WindowBar from "../WindowBar";
import { useSelector, useDispatch } from "react-redux";
import { SHOW_ERROR_MESSAGE } from "../../helpers/actionTypes";
export default function Image(props) {
  const app = useSelector((state) => state.apps.images);

  const dispatch = useDispatch();
  return (
    <WindowBar app={app}>
      <img
        src={app.src}
        alt=""
        id="img"
        className="img"
        onError={() =>
          dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload:
              "Cannot laod image , the image may be deleted or cannot be reached at the moment , please try again later",
          })
        }
      />
    </WindowBar>
  );
}
