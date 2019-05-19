import * as React from "react";
import {UserContextValue, withUser} from "../contexts/UserContext";
import {Gender, UserInfo} from "../types/User";
import {UserInfoForm} from "../contexts/UserInfoForm";
import {RouteComponentProps} from "react-router";
import routes from "../routes";
import {Link} from "react-router-dom";
import {HorizontalLayout} from "../components/HorizontalLayout";
import {Content} from "../components/Content";
import {Button, TextField} from "@material-ui/core";
import Gapped from "../components/Gapped";

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
            <HorizontalLayout>
                <Content justifyContent="center" alignItems="center">
                    <Gapped vertical gap={10}>
                        <TextField
                            type="text"
                            label="Email"
                            value={this.state.name}
                            onChange={e => this.setState({name: e.target.value})}
                        />
                        <TextField
                            type="password"
                            label="Пароль"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                        />
                        <UserInfoForm info={this.state.info} onChange={this.handleInfoChange}/>
                        <Gapped gap={5}>
                            <Button
                                color="primary"
                                onClick={this.handleRegister}
                            >
                                Зарегистироваться
                            </Button>
                            <Link to={routes.login}>
                                <Button color="secondary">
                                    Войти
                                </Button>
                            </Link>
                        </Gapped>
                    </Gapped>
                </Content>
            </HorizontalLayout>
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