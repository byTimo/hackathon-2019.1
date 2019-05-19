import * as React from "react";
import {ITrip} from "../types/common";
import {Panel} from "../components/Panel";
import {Button, List, ListItemText, Typography} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import {TripContextValue, withTrip} from "../contexts/TripContext";
import Gapped from "../components/Gapped";
import {BarTable} from "../components/BarTable";

export interface GrandTripsProps extends TripContextValue {

}

export interface GrandTripsState {
    loading: boolean;
    trips: ITrip[],
    show: ITrip | null;
}

class GrandTripsInternal extends React.Component<GrandTripsProps, GrandTripsState> {
    state: GrandTripsState = {
        loading: true,
        trips: [],
        show: null
    };

    componentDidMount(): void {
        this.loadData();
    }

    componentWillUnmount(): void {
        this.props.setTrip(null as any);
    }

    render() {

        return (
            <>
                <Panel>
                    {
                        this.state.loading
                            ? <span>Мы грузим веселые приключения</span>
                            : this.renderTrips()
                    }
                </Panel>
                {this.state.show && (
                    <Panel>
                        <Gapped gap={10} vertical>
                            <Typography variant="h6">{this.state.show.name}</Typography>
                            <Typography variant="body1">{this.state.show.description}</Typography>
                            <BarTable bars={this.state.show.bars}/>
                            <Button onClick={this.handleClickBackButton}>Вернуться</Button>
                        </Gapped>
                    </Panel>
                )}
            </>
        )
    }

    private renderTrips = (): React.ReactNode => {
        return (
            <List>
                {
                    this.state.trips.map(x => (
                        <ListItem button key={x.id} onClick={() => this.handleClickListItem(x.id)}>
                            <ListItemText
                                primary={x.name}
                                secondary={x.description.substr(0, 25) + "..."}
                            />
                        </ListItem>
                    ))

                }
            </List>
        )
    }

    private handleClickListItem = (id: string) => {
        this.setState(state => ({show: state.trips.find(x => x.id === id)!}), () => {
            this.props.setTrip(this.state.show!);
        })
    }

    private handleClickBackButton = () => {
        this.setState({show: null}, () => this.props.setTrip(null as any));
    }

    private loadData = async () => {
        const response = await fetch("/api/grand", {
            method: "GET"
        })

        if (!response.ok) {
            throw new Error("Какое то гавно")
        }

        const trips = await response.json();

        this.setState({loading: false, trips});
    }
}

export const GrandTrips = withTrip(GrandTripsInternal);