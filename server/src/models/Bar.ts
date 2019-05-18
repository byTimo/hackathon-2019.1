import { GeoPosition } from "./GeoPosition";
import { BarType } from "./BarType";
import { DrinkType } from "./DrinkType";

export class Bar {
  public id: string;
  public title: string;
  public type: BarType;
  public drinkType?: DrinkType;
  public geoPosition: GeoPosition;

  public constructor({ id, type, drinkType, geoPosition, title }: Bar) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.drinkType = drinkType;
    this.geoPosition = geoPosition;
  }
}
