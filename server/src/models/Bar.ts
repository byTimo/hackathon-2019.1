import { GeoPosition } from "./GeoPosition";
import { BarType } from "./BarType";
import { BeerType } from "./BeerType";
import { VineType } from "./VineType";

export class Bar {
  public id: string;
  public type: BarType;
  public drinkType: BeerType | VineType;
  public geoPosition: GeoPosition;

  public constructor({ id, type, drinkType, geoPosition }: Bar) {
    this.id = id;
    this.type = type;
    this.drinkType = drinkType;
    this.geoPosition = geoPosition;
  }
}
