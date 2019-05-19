import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import {UserContextValue, withUser} from "../../contexts/UserContext";
import {UserInfoForm} from "../../contexts/UserInfoForm";

interface SettingsProps extends UserContextValue{

}

class SettingsInternal extends React.Component<SettingsProps> {
  render() {
    return (
      <div>
        <Link to={routes.filter}>Назад</Link>
        {this.props.user && <UserInfoForm info={this.props.user} onChange={() => undefined}/>}
      </div>
    );
  }
}

export const Settings = withUser(SettingsInternal);
