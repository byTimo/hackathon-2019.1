import {useState, useEffect} from "react";
import {IGeoPosition} from "../types/common";

export function useUserCoordinates(): IGeoPosition | undefined {
    const [geoPosition, setGeoPosition] = useState<Coordinates>();

    useEffect(() => {
        const {geolocation} = window.navigator;

        const watchId = geolocation.watchPosition(position => {
            setGeoPosition(position.coords);
        });

        return () => {
            geolocation.clearWatch(watchId);
        };
    }, []);

    return geoPosition
        ? {latitude: geoPosition.latitude, longitude: geoPosition.longitude}
        : undefined;
}
