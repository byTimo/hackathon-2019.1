import { useState, useEffect } from "react";

export function useUserCoordinates() {
  const [geoPosition, setGeoPosition] = useState<Coordinates>();

  useEffect(() => {
    const { geolocation } = window.navigator;

    const watchId = geolocation.watchPosition(position => {
      setGeoPosition(position.coords);
    });

    return () => {
      geolocation.clearWatch(watchId);
    };
  }, []);

  return geoPosition
    ? [geoPosition.latitude, geoPosition.longitude]
    : undefined;
}
