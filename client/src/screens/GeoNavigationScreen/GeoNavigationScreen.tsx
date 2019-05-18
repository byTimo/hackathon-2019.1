import React from "react";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { useUserCoordinates } from "../../hooks/useUserCoordinates";
import { useWindowSize } from "../../hooks/useWindowSize";

import userIcon from "./user-icon.png";

interface GeoNavigationScreenProps {}

export function GeoNavigationScreen(props: GeoNavigationScreenProps) {
  const coords = useUserCoordinates();
  const size = useWindowSize();
  if (!coords) {
    return <>Loading...</>;
  }
  return (
    <YMaps>
      <div>
        <Map
          defaultState={{
            center: coords,
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
        </Map>
      </div>
    </YMaps>
  );
}
