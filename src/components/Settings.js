import React from "react";
import homeIcon from "../images/home.png";
import rightArrow from "../images/path.svg";

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-container">
        
        
        <div className="tabs">

            <div className="tab row gap-8 ai-center">
                <img src={homeIcon} alt="" className="settings-tab-icon" />
                <div className="tab-title">System</div>
            </div>

        </div>


        <div className="settings column gap-4">
            <div className="settings-header">
                
            </div>
        </div>
      </div>
    );
  }
}

export default Settings;



function System(){
    return(
        <>
        <SettingItem
            title="Your Microsoft account"
            subtitle="Subscriptions, rewards and more"
            icon={homeIcon}
          />

          <SettingItem
            title="Your Microsoft account"
            subtitle="Subscriptions, rewards and more"
            icon={homeIcon}
          />

          <SettingItem
            title="Your Microsoft account"
            subtitle="Subscriptions, rewards and more"
            icon={homeIcon}
          />

          <SettingItem
            title="Your Microsoft account"
            subtitle="Subscriptions, rewards and more"
            icon={homeIcon}
          />

          <SettingItem
            title="Your Microsoft account"
            subtitle="Subscriptions, rewards and more"
            icon={homeIcon}
          />

          <SettingItem
            title="Your Microsoft account"
            subtitle="Subscriptions, rewards and more"
            icon={homeIcon}
          />
        </>
    );
}

function SettingItem(props) {
  return (
    <div className="setting-item-container">
      <div className="setting-item-info">
        <img src={props.icon} alt="" className="system-item-icon" />
        <div className="system-item-title-and-subtitle">
          <div className="system-item-title">{props.title}</div>
          <div className="system-item-subtitle">{props.subtitle}</div>
        </div>
      </div>
      <img src={rightArrow} className="setting-item-arrow-right" />
    </div>
  );
}
