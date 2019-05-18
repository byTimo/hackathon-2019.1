import React from "react";
import { Placemark, ZoomControl } from "react-yandex-maps";
import { Redirect } from "react-router";

import { useUserCoordinates } from "../../hooks/useUserCoordinates";
import { useWindowSize } from "../../hooks/useWindowSize";

import { useTrip } from "../../contexts/TripContext";
import { TripMap } from "../../components/TripMap/TripMap";

import routes from "../../routes";

import userIcon from "./user-icon.png";

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
    <TripMap {...size} bars={trip.bars}>
      <ZoomControl />
      <Placemark
        geometry={coords}
        options={{
          iconLayout: "default#image",
          iconImageHref: userIcon,
          iconImageSize: [46, 46]
        }}
      />
    </TripMap>
  );
}
