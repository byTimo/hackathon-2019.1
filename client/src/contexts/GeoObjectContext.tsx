import * as React from "react";
import {IBar} from "../types/common";

export interface GeoObjectContextValue {
    bars: IBar[];
    setBars: (bars: IBar[]) => void;
}

const GeoObjectContext = React.createContext<GeoObjectContextValue>({
    bars: [],
    setBars: () => undefined
});

interface GeoObjectContextProviderState {
    bars: IBar[];
}

export class GeoObjectContextProvider extends React.Component<{}, GeoObjectContextProviderState> {
    state: GeoObjectContextProviderState = {
        bars: []
    }

    render() {
        return (
            <GeoObjectContext.Provider value={{bars: this.state.bars, setBars: this.handleSetBars}}>
                {this.props.children}
            </GeoObjectContext.Provider>
        )
    }

    private handleSetBars = (bars: IBar[]) => {
        this.setState({bars})
    }
}