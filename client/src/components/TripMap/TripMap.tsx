import React, {useRef, useEffect, useState} from "react";
import {Map, withYMaps} from "react-yandex-maps";
import "./TripMap.css";
import {IBar} from "../../types/common";
import {geoPositionToCoords} from "../../lib/geoPosition";
import {TripContextValue, withTrip} from "../../contexts/TripContext";

interface TripMapProps extends TripContextValue{
    width: number;
    height: number;
    children?: React.ReactNode;
    ymaps?: any;

    mapRef?(map: any): void;
}

class TripMapInternal extends React.Component<TripMapProps> {
    private mapsRef: any = React.createRef();

    componentDidUpdate(prevProps: Readonly<TripMapProps>): void {
        this.clear();
        if(this.props.trip) {
            this.addBars(this.props.trip.bars);
        }
    }

    render() {
        return (
            <Map
                instanceRef={(x: any) => {
                    this.mapsRef.current = x;
                    this.props.mapRef && this.props.mapRef(x);
                }}
                width={this.props.width}
                height={this.props.height}
                defaultState={{
                    center: [56.840917, 60.652222],
                    zoom: 13
                }}
            >
                {this.props.children}
            </Map>
        );
    }

    public addBars = (bars: IBar[]) => {
        const maps = this.mapsRef.current;
        if (maps) {
            const route = new this.props.ymaps.multiRouter.MultiRoute({
                referencePoints: bars.map(x => geoPositionToCoords(x.geoPosition)),
                params: {
                    routingMode: 'pedestrian'

                }
            }, {});
            maps.geoObjects.add(route);
        }
    }

    public clear = () => {
        const maps = this.mapsRef.current;
        if (maps) {
            maps.geoObjects.removeAll();
        }
    }
}

export const TripMap = withYMaps(
    withTrip(TripMapInternal),
    true,
    ["route", "Placemark", "multiRouter.MultiRoute", "ObjectManager", "templateLayoutFactory"]
);


export const TripMapOld: React.FC<TripMapProps> = withYMaps(
    ({width, height, children, ymaps, mapRef}: TripMapProps) => {
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

                // const route = new ymaps.multiRouter.MultiRoute({
                //     referencePoints: bars.map(x => geoPositionToCoords(x.geoPosition)),
                //     params: {
                //         routingMode: 'pedestrian'
                //
                //     }
                // }, {
                // });
                // maps.geoObjects.add(route);
            }
        }, [ymaps, loaded]);
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
                    center: [56.840917, 60.652222],
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
