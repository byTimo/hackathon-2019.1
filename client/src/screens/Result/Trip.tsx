import * as React from "react";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
import {TripContextValue, withTrip} from "../../contexts/TripContext";
import {Panel} from "../../components/Panel";
import routes from "../../routes";
import Gapped from "../../components/Gapped";
import {Button, Typography} from "@material-ui/core";
import {BarTable} from "../../components/BarTable";

interface TripRouteParams {
    barType: string;
    barsCount: string;
}

export interface TripProps extends TripContextValue, RouteComponentProps<TripRouteParams> {

}

class TripInternal extends React.Component<TripProps> {
    render() {
        if (!this.props.trip)
            return <Redirect to={routes.map.filter}/>

        return (
            <Panel>
                <Gapped vertical gap={10}>
                    <Typography variant="h6">Маршрут</Typography>
                    <BarTable bars={this.props.trip.bars}/>
                    <Gapped>
                        <Button onClick={() => this.props.history.push(routes.map.filter)}>
                            Изменить
                        </Button>
                    </Gapped>
                </Gapped>
            </Panel>
        )
    }
}

export const Trip = withRouter(withTrip(TripInternal));