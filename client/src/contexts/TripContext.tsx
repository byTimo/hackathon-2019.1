import React, { useState, useContext } from "react";

import { ITrip } from "../types/common";

const TripContext = React.createContext<ITrip | null>(null);

const SetTripContext = React.createContext<(trip: ITrip) => void>(() => {});

export const TripProvider: React.FC = ({ children }) => {
  const [trip, setTrip] = useState<ITrip | null>(null);

  return (
    <TripContext.Provider value={trip}>
      <SetTripContext.Provider value={setTrip}>
        {children}
      </SetTripContext.Provider>
    </TripContext.Provider>
  );
};

interface TripConsumerProps {
  children: (trip: ITrip | null) => React.ReactNode;
}

export function TripConsumer(props: TripConsumerProps) {
  return <TripContext.Consumer>{props.children}</TripContext.Consumer>;
}

export function useTrip() {
  const setTrip = useContext(SetTripContext);
  const trip = useContext(TripContext);
  return { setTrip, trip };
}
