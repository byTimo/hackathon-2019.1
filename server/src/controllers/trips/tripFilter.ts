import { Request, Response } from "express";
import { getTripsByFilter } from "../../services/bars/getTripsByFilter";

export async function tripFilter(req: Request, res: Response) {
  const {latitude, longitude, barType, drinkType, barsCount } = req.query;

  const trip = await getTripsByFilter({
    position: {latitude: Number(latitude), longitude: Number(longitude)},
    barType: Number(barType),
    barsCount: Number(barsCount),
    drinkType: Number(drinkType)
  });

  res.send(trip);
}
