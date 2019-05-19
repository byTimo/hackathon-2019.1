import React, { useRef } from "react";
import { Placemark, ZoomControl } from "react-yandex-maps";
import { Redirect, RouteComponentProps } from "react-router";

import { useUserCoordinates } from "../../hooks/useUserCoordinates";
import { useWindowSize } from "../../hooks/useWindowSize";

import { useTrip } from "../../contexts/TripContext";
import { TripMap } from "../../components/TripMap/TripMap";

import routes from "../../routes";

import userIcon from "./user-icon.png";
import { geoPositionToCoords } from "../../lib/geoPosition";

import { Button } from "@material-ui/core";

interface NavigationProps extends RouteComponentProps {}

export function Navigation(props: NavigationProps) {
  const mapRef = useRef<any>(null);
  const coords = useUserCoordinates();
  const size = useWindowSize();
  const { trip } = useTrip();

  function resize() {
    const map = mapRef.current;
    if (map) {
      const bounds = map.geoObjects.getBounds();
      if (bounds) map.setBounds(bounds);
    }
  }

  if (!coords) {
    return <>Loading...</>;
  }

  if (!trip || !trip.bars.length) {
    return <Redirect to={routes.map.filter} />;
  }

  return (
    <TripMap
      {...size}
      //bars={trip.bars}
      // mapRef={x => (mapRef.current = x)}
    >
      <ZoomControl />
      <Placemark
        onLoad={resize}
        geometry={geoPositionToCoords(coords)}
        options={{
          iconLayout: "default#image",
          iconImageHref: userIcon,
          iconImageSize: [46, 46]
        }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          position: "absolute",
          zIndex: 100,
          left: "50%",
          bottom: 30,
          transform: "translateX(-50%)"
        }}
        onClick={() => props.history.push(routes.inBar)}
      >
        Я пришёл. Напиться
      </Button>
    </TripMap>
  );
}
