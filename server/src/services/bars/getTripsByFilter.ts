import uuid from "uuid";

import { BarType } from "../../models/BarType";
import { DrinkType } from "../../models/DrinkType";
import { Trip } from "../../models/Trip";
import {db} from "../../db";
import {distanceSort} from "../../../utils/distanceSort";
import {GeoPosition} from "../../models/GeoPosition";

export interface TripFilterParams {
  barType: BarType;
  drinkType: DrinkType;
  barsCount: number;
}

export async function getTripsByFilter({
  barType,
  barsCount,
  drinkType
}: TripFilterParams) {
  const bars = await db.bars.select();
  const typeFilteredBars = bars.filter(x => x.type === barType && x.drinkType === drinkType);
  const sortedPoints = distanceSort(typeFilteredBars.map(x => x.geoPosition)).slice(0, barsCount);
  const sortedBars = sortedPoints.map(p => bars.find(b => GeoPosition.equal(b.geoPosition, p))!);

  return new Trip(uuid(), sortedBars);
}
