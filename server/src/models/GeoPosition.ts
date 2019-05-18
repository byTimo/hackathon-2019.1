export class GeoPosition {
  public longitude: number;
  public latitude: number;
  public constructor({ longitude, latitude }: GeoPosition) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  static equal = (a: GeoPosition, b: GeoPosition): boolean => a.latitude === b.latitude && a.longitude === b.longitude;
}
