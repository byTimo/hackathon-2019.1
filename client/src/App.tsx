import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Filter } from "./screens/Filter/Filter";
import { Settings } from "./screens/Settings/Settings";
import { ResultList } from "./screens/ResultList/ResultList";
import { Result } from "./screens/Result/Result";
import { Room } from "./screens/Room/Room";
import { NavigationList } from "./screens/NavigationList/NavigationList";
import { Navigation } from "./screens/Navigation/Navigation";
import { InBar } from "./screens/InBar/InBar";
import { State } from "./screens/State/State";
import { Finish } from "./screens/Finish/Finish";

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Filter} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/result/list" component={ResultList} />
                <Route exact path="/result" component={Result} />
                <Route exact path="/room" component={Room} />
                <Route exact path="/navigation/list" component={NavigationList} />
                <Route exact path="/navigation" component={Navigation} />
                <Route exact path="/in-bar" component={InBar} />
                <Route exact path="/state" component={State} />
                <Route exact path="/finish" component={Finish} />
            </Switch>
        </Router>
    )
};
