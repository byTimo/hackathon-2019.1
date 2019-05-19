import * as React from "react";
import {UserContextValue, withUser} from "../contexts/UserContext";
import {Link, RouteComponentProps} from "react-router-dom";
import routes from "../routes";
import {Button, Card, Input, Paper, TextField} from "@material-ui/core";
import {HorizontalLayout} from "../components/HorizontalLayout";
import Gapped from "../components/Gapped";
import {Content} from "../components/Content";

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
            <HorizontalLayout>
                <Content justifyContent="center" alignItems={"center"}>
                    <Gapped vertical gap={5}>
                        <TextField
                            label="Email"
                            value={this.state.name}
                            onChange={e => this.setState({name: e.target.value})}

                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                        />
                        <Gapped>
                            <Button color={"primary"} onClick={this.handleLogin}>Вход</Button>
                            <Link to={routes.register}>
                                <Button
                                    color={"secondary"}
                                    variant="flat"
                                >
                                    Регистрация
                                </Button>
                            </Link>
                        </Gapped>
                    </Gapped>
                </Content>
            </HorizontalLayout>
        )
    }

    private handleLogin = async () => {
        await this.props.login(this.state.name, this.state.password);
        this.props.history.replace(routes.map.root);
    }
}

export const Login = withUser(LoginInternal);