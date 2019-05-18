import React, { useRef, useEffect, useState } from "react";
import { Map, withYMaps } from "react-yandex-maps";
import { IBar } from "../../types/common";
import { geoPositionToCoords } from "../../lib/geoPosition";

interface TripMapProps {
  bars: IBar[];
  width: number;
  height: number;
  children?: React.ReactNode;
  ymaps?: any;
  mapRef?(map: any): void;
}

export const TripMap: React.FC<TripMapProps> = withYMaps(
  ({ bars, width, height, children, ymaps, mapRef }: TripMapProps) => {
    const [loaded, setLoaded] = useState(false);
    const mapsRef = useRef<any>();

    useEffect(() => {
      const maps = mapsRef.current;
      if (maps) {
        const placemarks = bars.map(
          x => new ymaps.Placemark(geoPositionToCoords(x.geoPosition))
        );
        placemarks.forEach(x => maps.geoObjects.add(x));
        const bounds = maps.geoObjects.getBounds();
        if (bounds) maps.setBounds(bounds);
      }
    }, [loaded, ymaps.Placemark, bars]);

    useEffect(() => {
      const maps = mapsRef.current;
      if (maps) {
        ymaps
          .route(bars.map(x => geoPositionToCoords(x.geoPosition)))
          .then((route: any) => {
            maps.geoObjects.add(route);
          });
      }
    }, [bars, ymaps, loaded]);

    if (bars.length === 0) {
      return <div>Ничего не нашлось =(</div>;
    }
    return (
      <Map
        onLoad={() => setLoaded(true)}
        instanceRef={(x: any) => {
          mapsRef.current = x;
          mapRef && mapRef(x);
        }}
        width={width}
        height={height}
        defaultState={{
          center: [bars[0].geoPosition.latitude, bars[0].geoPosition.longitude],
          zoom: 13
        }}
      >
        {children}
      </Map>
    );
  },
  true,
  ["route", "Placemark"]
);
