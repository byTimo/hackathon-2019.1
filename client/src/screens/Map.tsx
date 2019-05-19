import * as React from "react";
import {getWindowSize, useWindowSize} from "../hooks/useWindowSize";
import {TripMap} from "../components/TripMap/TripMap";
import {Route, Switch} from "react-router";
import routes from "../routes";
import {Filter} from "./Filter/Filter";
import {Settings} from "./Settings/Settings";
import {Trip} from "./Result/Trip";
import {TripContextValue, withTrip} from "../contexts/TripContext";
import {GrandTrips} from "./GrandTrips";

export interface MapProp extends TripContextValue {

}

class MapInternal extends React.Component<MapProp> {
    render() {
        const {width, height} = getWindowSize();

        return (
            <>
                {this.renderSubRouting()}
                <TripMap width={width} height={height}/>
            </>
        )
    }

    private renderSubRouting = () => {
        return (
            <Switch>
                <Route exact path={routes.map.filter} component={Filter}/>
                <Route exact path={routes.map.grand} component={GrandTrips}/>
                <Route exact path={routes.map.settings} component={Settings}/>
                <Route exact path={routes.map.trip} component={Trip}/>
            </Switch>
        )
    }
}

export const Map = withTrip(MapInternal);