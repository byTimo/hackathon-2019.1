import { IGeoPosition } from "../types/common";

export function geoPositionToCoords(geoPosition: IGeoPosition) {
  return [geoPosition.latitude, geoPosition.longitude];
}
