import * as React from "react";
import {Omit} from "../../../server/utils/Types";
import {UserInfo} from "../types/User";
import {LocalStorageManager} from "../lib/LocalStorageManager";

export interface UserContextValue {
    user: UserInfo | null,
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, info: UserInfo) => Promise<void>;
}

const UserContext = React.createContext<UserContextValue>({
    loading: false,
    user: null,
    login: (email: string, password: string) => Promise.resolve(undefined),
    logout: () => undefined,
    register: () => Promise.resolve(undefined),
});

interface UserContextProviderState {
    loading: boolean;
    user: null;
}

export class UserContextProvider extends React.Component<{}, UserContextProviderState> {
    state: UserContextProviderState = {
        loading: false,
        user: LocalStorageManager.get("token")
    };

    render() {
        const value: UserContextValue = {
            loading: this.state.loading,
            user: this.state.user,
            login: this.handleLogin,
            logout: this.handleLogout,
            register: this.handleRegister
        };

        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

    private handleLogin = async (email: string, password: string) => {
        const response = await fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("babah");
        }

        const user = await response.json();

        LocalStorageManager.save("token", user);
        this.setState({user, loading: false});
    }

    private handleLogout = () => {
        LocalStorageManager.remove("token");
        this.setState({user: null});
    }

    private handleRegister = async (email: string, password: string, info: UserInfo) => {
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                ...info
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("babah");
        }

        const id = await response.json();
    }
}

export const withUser = <TProps extends UserContextValue>(component: React.ComponentType<TProps>) => {
    return React.forwardRef((props: Omit<TProps, keyof UserContextValue>, ref) => (
        <UserContext.Consumer>
            {value => React.createElement(component, {...props as any, ...value, ref})}
        </UserContext.Consumer>
    ));
};
