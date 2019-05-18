export enum BarType {
  BEER,
  VINE,
  STRONG
}

export enum BeerType {
  LAGGER,
  STOUT
}

export enum VineType {
  WHITE,
  RED
}

export type DrinkType = VineType | BeerType;

export interface IGeoPosition {
  longitude: number;
  latitude: number;
}

export interface IBar {
  id: string;
  title: string;
  type: BarType;
  drinkType?: DrinkType;
  geoPosition: IGeoPosition;
}

export interface ITrip {
  id: string;
  bars: IBar[];
}
