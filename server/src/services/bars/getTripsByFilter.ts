import uuid from "uuid";

import { BarType } from "../../models/BarType";
import { DrinkType } from "../../models/DrinkType";
import { Trip } from "../../models/Trip";
import { db } from "../../db";
import { distanceSort } from "../../../utils/distanceSort";
import { GeoPosition } from "../../models/GeoPosition";

export interface TripFilterParams {
  position: GeoPosition;
  barType: BarType;
  drinkType: DrinkType;
  barsCount: number;
}

export async function getTripsByFilter({
  position,
  barType,
  barsCount,
  drinkType
}: TripFilterParams) {
  const bars = await db.bars.select();

  const typeFilteredBars = bars.filter(
    x => x.type === barType && x.drinkType === drinkType
  );
  const points = [position, ...typeFilteredBars.map(x => x.geoPosition)];

  const sortedPoints = distanceSort(points).slice(1, barsCount + 1);
  const sortedBars = sortedPoints.map(
    p => bars.find(b => GeoPosition.equal(b.geoPosition, p))!
  );

  const tripId = await db.trips.create(sortedBars);

  return new Trip(tripId, sortedBars);
}
