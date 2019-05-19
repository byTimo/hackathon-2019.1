import * as React from "react";
import {UserContextValue, withUser} from "../contexts/UserContext";
import {Gender, UserInfo} from "../types/User";
import {UserInfoForm} from "../contexts/UserInfoForm";
import {RouteComponentProps} from "react-router";
import routes from "../routes";
import {Link} from "react-router-dom";

export interface RegisterProps extends UserContextValue, RouteComponentProps {

}

interface RegisterState {
    name: string;
    password: string;
    info: UserInfo;
}

class RegisterInternal extends React.Component<RegisterProps, RegisterState> {
    state: RegisterState = {
        name: "",
        password: "",
        info: {
            name: "",
            height: 150,
            weight: 50,
            gender: Gender.Male
        }
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                <input
                    type="password" value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                />
                <UserInfoForm info={this.state.info} onChange={this.handleInfoChange}/>
                <button onClick={this.handleRegister}>Зарегистироваться</button>
                <Link to={routes.login}>
                    Login
                </Link>
            </div>
        )
    }

    private handleInfoChange = (info: UserInfo) => {
        this.setState({info});
    };

    private handleRegister = async (): Promise<void> => {
        await this.props.register(this.state.name, this.state.password, this.state.info);
        this.props.history.replace(routes.login);
    }
}

export const Register = withUser(RegisterInternal);