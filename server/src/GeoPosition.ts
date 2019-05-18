class GeoPosition {
  public longitude: number;
  public latitude: number;
  public constructor({ longitude, latitude }: GeoPosition) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
