import React from "react";
import { Map, Placemark } from "react-yandex-maps";
import { IBar } from "../../types/common";
import { geoPositionToCoords } from "../../lib/geoPosition";

interface TripMapProps {
  bars: IBar[];
  width: number;
  height: number;
  children?: React.ReactNode;
}

export function TripMap({ bars, width, height, children }: TripMapProps) {
  if (bars.length === 0) {
    return <div>Ничего не нашлось =(</div>;
  }
  return (
    <Map
      width={width}
      height={height}
      defaultState={{
        center: [bars[0].geoPosition.latitude, bars[0].geoPosition.longitude],
        zoom: 13
      }}
    >
      {bars.map(bar => (
        <Placemark
          key={bar.id}
          geometry={geoPositionToCoords(bar.geoPosition)}
        />
      ))}
      {children}
    </Map>
  );
}
