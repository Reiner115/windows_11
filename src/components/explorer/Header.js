import React from "react";
import { connect } from "react-redux";
import { BACK } from "../../helpers/actionTypes";
import { ReactComponent as LeftArrowIcon } from "../../images/arrow-left.svg";
import { ReactComponent as RightArrowIcon } from "../../images/arrow-right.svg";
import { ReactComponent as TopArrowIcon } from "../../images/arrow-top.svg";
import { ReactComponent as PathIcon } from "../../images/path.svg";
import { default as cut, default as rename } from "../../images/cut.png";

import getImage from "../../helpers/getImage";

const copy = getImage("copy.png");
const newIcon = getImage("new.png");
const paste = getImage("paste.png");
const search = getImage("search.png");
const share = getImage("share.png");
const sort = getImage("sort.png");
const view = getImage("view.png");

class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <section className="tools">
          <ToolItem icon={newIcon} title="New" />
          <div className="tool-vertical-line"></div>
          <ToolItem icon={cut} />
          <ToolItem icon={copy} />
          <ToolItem icon={paste} />
          <ToolItem icon={rename} />
          <ToolItem icon={share} />
          <div className="tool-vertical-line"></div>
          <ToolItem icon={sort} title="Sort" />
          <ToolItem icon={view} title="View" />
          <div className="tool-vertical-line"></div>
        </section>

        <section className="header-nav">
          <div className="nav-arrows">
            <div
              className="nav-arrow-container"
              onClick={() => this.props.back()}
            >
              <LeftArrowIcon className="nav-arrow" />
            </div>

            <div className="nav-arrow-container">
              <RightArrowIcon className="nav-arrow" />
            </div>

            <div
              className="nav-arrow-container"
              onClick={() => this.props.back()}
            >
              <TopArrowIcon className="nav-arrow" />
            </div>
          </div>

          <div className="nav-path">
            <div className="path-item-container">
              <div className="path-item">PC</div>
              <PathIcon className="path-icon" />
            </div>
            {this.props.currentPath.map((path) => {
              return (
                <div key={path} className="path-item-container">
                  <div className="path-item">{path}</div>
                  <PathIcon className="path-icon" />
                </div>
              );
            })}
          </div>
          <div className="nav-search-container">
            <img src={search} className="nav-search-icon" alt="" />
            <input
              type="text"
              className="nav-search-input"
              placeholder={
                "Search " +
                this.props.currentPath[this.props.currentPath.length - 1]
              }
            />
          </div>
        </section>
      </header>
    );
  }
}

const ToolItem = (props) => {
  if (props.title === undefined)
    return (
      <div className="row gap-8 jc-center ai-center pointer">
        <img src={props.icon} alt="" className="tool-icon" />
      </div>
    );
  return (
    <div className="row gap-8 jc-center ai-center pointer">
      <img src={props.icon} alt="" className="tool-icon" />
      <div className="tool-title">{props.title}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPath: state.files.currentPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    back: () => dispatch({ type: BACK }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
