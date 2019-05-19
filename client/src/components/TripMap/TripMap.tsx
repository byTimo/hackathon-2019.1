import React, { useRef, useEffect, useState } from "react";
import { Map, withYMaps } from "react-yandex-maps";
import { IBar } from "../../types/common";
import { geoPositionToCoords } from "../../lib/geoPosition";
import "./TripMap.css";

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

    // useEffect(() => {
    //   const maps = mapsRef.current;
    //   if (maps) {
    //     const placemarks = bars.map(
    //       x => new ymaps.Placemark(geoPositionToCoords(x.geoPosition), {
    //           balloonContent: x.title
    //       })
    //     );
    //     placemarks.forEach(x => maps.geoObjects.add(x));
    //     const bounds = maps.geoObjects.getBounds();
    //     if (bounds) maps.setBounds(bounds);
    //   }
    // }, [loaded, ymaps.Placemark, bars]);

    useEffect(() => {
      const maps = mapsRef.current;
      if (maps) {
          // const balloonLayout = ymaps.templateLayoutFactory.createClass(
          //     "<div class='balloonBody'>" +
          //     "<h3>Название бара</h3>" +
          //     "<div>Какая-то информация</div>" +
          //     "<img class='balloonImage' src='https://partyinljubljana.com/images/programs/pub-crawl/bar-crawl-ljubljana.jpg'/>" +
          //     "</div>"
          // );

          const route = new ymaps.multiRouter.MultiRoute({
              referencePoints: bars.map(x => geoPositionToCoords(x.geoPosition)),
              params: {
                  routingMode: 'pedestrian'

              }
          }, {
          });
          maps.geoObjects.add(route);
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
  ["route", "Placemark", "multiRouter.MultiRoute", "ObjectManager", "templateLayoutFactory"]
);
