import React, {useState, useContext} from "react";
import {ITrip} from "../types/common";
import {Omit} from "../../../server/utils/Types";

export interface TripContextValue {
    trip: ITrip;
    setTrip: (trip: ITrip) => void;
}

const TripContext = React.createContext<TripContextValue>({
    trip: null as any,
    setTrip: () => undefined
});

export const TripProvider: React.FC = ({children}) => {
    const [trip, setTrip] = useState<ITrip>(null as any);

    return (
        <TripContext.Provider value={{trip, setTrip}}>
            {children}
        </TripContext.Provider>
    );
};

interface TripConsumerProps {
    children: (trip: ITrip | null) => React.ReactNode;
}

export const withTrip = <TProps extends TripContextValue>(component: React.ComponentType<TProps>) => {
    return React.forwardRef((props: Omit<TProps, keyof TripContextValue>, ref) => (
        <TripContext.Consumer>
            {value => React.createElement(component, {...props as any, ...value, ref})}
        </TripContext.Consumer>
    ));
};

export function useTrip() {
    const {trip, setTrip} = useContext(TripContext);
    return {setTrip, trip};
}
