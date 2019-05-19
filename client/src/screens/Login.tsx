import * as React from "react";
import {UserContextValue, withUser} from "../contexts/UserContext";
import {Link, RouteComponentProps} from "react-router-dom";
import routes from "../routes";

export interface LoginProps extends UserContextValue, RouteComponentProps {

}

interface LoginState {
    name: string;
    password: string;
}

class LoginInternal extends React.Component<LoginProps, LoginState> {
    state: LoginState = {
        name: "",
        password: ""
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                <input type="password" value={this.state.password}
                       onChange={e => this.setState({password: e.target.value})}/>
                <button onClick={this.handleLogin}>Login</button>
                <Link to={routes.register}>
                    Register
                </Link>
            </div>
        )
    }

    private handleLogin = async () => {
        await this.props.login(this.state.name, this.state.password);
        this.props.history.replace("/");
    }
}

export const Login = withUser(LoginInternal);