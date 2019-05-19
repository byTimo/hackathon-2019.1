import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {YMaps} from "react-yandex-maps";
import {TripProvider} from "./contexts/TripContext";
import {Result} from "./screens/Result/Result";
import {Room} from "./screens/Room/Room";
import {NavigationList} from "./screens/NavigationList/NavigationList";
import {Navigation} from "./screens/Navigation/Navigation";
import {InBar} from "./screens/InBar/InBar";
import {State} from "./screens/State/State";
import {Finish} from "./screens/Finish/Finish";

import routes from "./routes";
import {Register} from "./screens/Register";
import {Login} from "./screens/Login";
import {UserContextProvider} from "./contexts/UserContext";
import {AppNavigation} from "./components/AppNavigation";
import {Map} from "./screens/Map";

export const App = () => {
    return (
        <UserContextProvider>
            <TripProvider>
                <YMaps preload>
                    <Router>
                        <AppNavigation/>
                        <Switch>
                            <Route path={routes.map.root} component={Map}/>
                            <Route exact path={routes.result} component={Result}/>
                            <Route exact path={routes.room} component={Room}/>
                            <Route
                                exact
                                path={routes.navigationList}
                                component={NavigationList}
                            />
                            <Route exact path={routes.navigation} component={Navigation}/>
                            <Route exact path={routes.inBar} component={InBar}/>
                            <Route exact path={routes.state} component={State}/>
                            <Route exact path={routes.finish} component={Finish}/>
                            <Route exact path={routes.register} component={Register}/>
                            <Route exact path={routes.login} component={Login}/>
                            <Route path={"/"} render={() => <Redirect to={routes.map.root}/>}/>
                        </Switch>
                    </Router>
                </YMaps>
            </TripProvider>
        </UserContextProvider>
    );
};
