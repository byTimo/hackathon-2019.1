import {useState, useEffect} from "react";
import {IGeoPosition} from "../types/common";
import {worker} from "cluster";

const geolocation = window.navigator.geolocation;
let currentPosition: IGeoPosition = {
    latitude: 0,
    longitude: 0
};
geolocation.watchPosition(position => {
    currentPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude}
});

export function getCurrent() {
    return currentPosition;
}

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
