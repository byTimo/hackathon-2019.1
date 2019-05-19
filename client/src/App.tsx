import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { YMaps } from "react-yandex-maps";
import { TripProvider } from "./contexts/TripContext";
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

import routes from "./routes";
import { Register } from "./screens/Register";
import { Login } from "./screens/Login";
import { UserContextProvider } from "./contexts/UserContext";

export const App = () => {
  return (
    <UserContextProvider>
      <TripProvider>
        <YMaps preload>
          <Router>
            <Switch>
              <Route exact path={routes.filter} component={Filter} />
              <Route exact path={routes.settings} component={Settings} />
              <Route exact path={routes.resultList} component={ResultList} />
              <Route exact path={routes.result} component={Result} />
              <Route exact path={routes.room} component={Room} />
              <Route
                exact
                path={routes.navigationList}
                component={NavigationList}
              />
              <Route exact path={routes.navigation} component={Navigation} />
              <Route exact path={routes.inBar} component={InBar} />
              <Route exact path={routes.state} component={State} />
              <Route exact path={routes.finish} component={Finish} />
              <Route exact path={routes.register} component={Register} />
              <Route exact path={routes.login} component={Login} />
            </Switch>
          </Router>
        </YMaps>
      </TripProvider>
    </UserContextProvider>
  );
};
