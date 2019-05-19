import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import {UserContextValue, withUser} from "../../contexts/UserContext";
import {UserInfoForm} from "../../contexts/UserInfoForm";
import {Panel} from "../../components/Panel";

interface SettingsProps extends UserContextValue{

}

class SettingsInternal extends React.Component<SettingsProps> {
  render() {
    return (
      <Panel>
        {this.props.user && <UserInfoForm info={this.props.user} onChange={() => undefined}/>}
      </Panel>
    );
  }
}

export const Settings = withUser(SettingsInternal);
