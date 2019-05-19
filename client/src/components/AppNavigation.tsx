import * as React from "react";
import {UserContextValue, withUser} from "../contexts/UserContext";
import {
    AppBar,
    Button, Divider,
    Drawer,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Gapped from "./Gapped";
import "./AppNavigation.css";
import {RouteComponentProps, withRouter} from "react-router";
import routes from "../routes";
import ListItem from "@material-ui/core/ListItem";
import Stars from "@material-ui/icons/Stars"
import LinearScale from "@material-ui/icons/LinearScale"
import AccessibilityNew from "@material-ui/icons/AccessibilityNew"

export interface AppNavigationProps extends UserContextValue, RouteComponentProps {
}

interface AppNavigationState {
    menu: boolean;
}

class AppNavigationInternal extends React.Component<AppNavigationProps, AppNavigationState> {
    state: AppNavigationState = {
        menu: false
    }

    render() {
        return (
            <>
                <Drawer
                    open={this.state.menu}
                    anchor={"left"}
                    onClose={() => this.setState({menu: false})}
                >
                    <List>
                        <ListItem button onClick={this.handleFilterClick}>
                            <ListItemIcon><LinearScale/></ListItemIcon>
                            <ListItemText>Подобрать маршрут</ListItemText>
                        </ListItem>
                        <ListItem button onClick={this.handleGrandClick}>
                            <ListItemIcon><Stars/></ListItemIcon>
                            <ListItemText>Особенные маршруты</ListItemText>
                        </ListItem>
                        <Divider/>
                        <ListItem button onClick={this.handleSettingsClick}>
                            <ListItemIcon><AccessibilityNew/></ListItemIcon>
                            <ListItemText>Настройки профиля</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            disabled={!this.props.user}
                            className="NavigationMenuButton"
                            onClick={() => this.setState({menu: true})}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h5" color="inherit" className="NavigationGrow">
                            Пивасик-разливасик
                        </Typography>
                        <div>
                            {this.props.user
                                ? (
                                    <Gapped gap={10}>
                                        <Typography variant="h6" color="inherit">
                                            {this.props.user.name}
                                        </Typography>
                                        <Button onClick={this.props.logout} color={"inherit"}>
                                            Выйти
                                        </Button>
                                    </Gapped>
                                ) : (
                                    <Button color={"inherit"} onClick={this.handleLoginClick}>
                                        Вход
                                    </Button>
                                )
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </>
        )
    }

    private handleLoginClick = () => {
        this.props.history.push(routes.login);
    }

    private handleFilterClick = () => {
        this.setState({menu: false});
        this.props.history.push(routes.map.filter)
    }

    private handleGrandClick = () => {
        this.setState({menu: false});
        //this.props.history.push()
    }

    private handleSettingsClick = () => {
        this.setState({menu: false});
        this.props.history.push(routes.map.settings);
    }
}

export const AppNavigation = withRouter(withUser(AppNavigationInternal));