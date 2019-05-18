import React from "react";
import { Map, Placemark, ZoomControl } from "react-yandex-maps";
import { useUserCoordinates } from "../../hooks/useUserCoordinates";
import { useWindowSize } from "../../hooks/useWindowSize";

import userIcon from "./user-icon.png";
import { useTrip } from "../../contexts/TripContext";
import { Redirect } from "react-router";
import routes from "../../routes";
import { geoPositionToCoords } from "../../lib/geoPosition";

interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const coords = useUserCoordinates();
  const size = useWindowSize();
  const { trip } = useTrip();

  if (!coords) {
    return <>Loading...</>;
  }

  if (!trip || !trip.bars.length) {
    return <Redirect to={routes.filter} />;
  }

  return (
    <div>
      <Map
        defaultState={{
          center: geoPositionToCoords(trip.bars[0].geoPosition),
          zoom: 13
        }}
        {...size}
      >
        <ZoomControl />
        <Placemark
          geometry={coords}
          options={{
            iconLayout: "default#image",
            iconImageHref: userIcon,
            iconImageSize: [46, 46]
          }}
        />
        {trip.bars.map(x => (
          <Placemark geometry={geoPositionToCoords(x.geoPosition)} key={x.id} />
        ))}
      </Map>
    </div>
  );
}
