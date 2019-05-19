import * as React from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { TripContextValue, withTrip } from "../../contexts/TripContext";
import { Panel } from "../../components/Panel";
import routes from "../../routes";
import Gapped from "../../components/Gapped";
import { Button } from "@material-ui/core";

interface TripRouteParams {
  barType: string;
  barsCount: string;
}

export interface TripProps
  extends TripContextValue,
    RouteComponentProps<TripRouteParams> {}

class TripInternal extends React.Component<TripProps> {
  render() {
    if (!this.props.trip) return <Redirect to={routes.map.filter} />;

    return (
      <Panel>
        <Gapped vertical gap={5} alignItems={"center"}>
          {this.props.trip.bars.map(x => (
            <div key={x.id}>
              <span>{x.title}</span>
            </div>
          ))}
        </Gapped>
        <Gapped>
          <Button onClick={() => this.props.history.push(routes.map.filter)}>
            Изменить
          </Button>
          <Button onClick={() => this.props.history.push(routes.navigation)}>
            Погнали, народ
          </Button>
        </Gapped>
      </Panel>
    );
  }
}

export const Trip = withRouter(withTrip(TripInternal));
