import uuid from "uuid";

import { Bar } from "../../models/Bar";
import { BarType } from "../../models/BarType";
import { VineType } from "../../models/VineType";
import { GeoPosition } from "../../models/GeoPosition";
import { DrinkType } from "../../models/DrinkType";
import { BeerType } from "../../models/BeerType";
import { Trip } from "../../models/Trip";
import _ from "lodash";

const adjectives = [
  "aboard",
  "alleged",
  "guttural",
  "stingy",
  "ossified",
  "staking",
  "chunky",
  "alert",
  "nonstop",
  "grandiose",
  "nutritious",
  "fresh"
];

const nouns = [
  "shape",
  "destruction",
  "sofa",
  "pear",
  "mailbox",
  "actor",
  "number",
  "creator",
  "bikes",
  "orange",
  "offer",
  "increase"
];

const minLatitude = 56.823;
const maxLatitude = 56.838;
const minLongitude = 60.586;
const maxLongitude = 60.627;

function rnd<T>(xs: T[]) {
  return xs[Math.floor(Math.random() * xs.length)];
}

function generateBarName() {
  return `${_.upperFirst(rnd(adjectives))} ${_.upperFirst(rnd(nouns))}`;
}

function generateBar(): Bar {
  const type = rnd([BarType.BEER, BarType.STRONG, BarType.VINE]);
  const drinkType =
    type === BarType.BEER
      ? rnd([BeerType.LAGGER, BeerType.STOUT])
      : type === BarType.VINE
      ? rnd([VineType.RED, VineType.WHITE])
      : undefined;

  return new Bar({
    id: uuid(),
    type,
    drinkType,
    title: generateBarName(),
    geoPosition: {
      latitude: Math.random() * (maxLatitude - minLatitude) + minLatitude,
      longitude: Math.random() * (maxLongitude - minLongitude) + minLongitude
    }
  });
}

function generateBarList(barsCount: number) {
  return Array.from(Array(barsCount), generateBar);
}

export interface TripFilterParams {
  barType: BarType;
  drinkType: DrinkType;
  barsCount: number;
}

export function getTripsByFilter({
  barType,
  barsCount,
  drinkType
}: TripFilterParams) {
  const bars = generateBarList(100);
  const filteredBars = bars.filter(
    x => x.type === barType && x.drinkType === drinkType
  );

  return new Trip(uuid(), filteredBars.slice(0, barsCount));
}
