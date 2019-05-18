import { Request, Response } from "express";
import { getTripsByFilter } from "../../services/bars/getTripsByFilter";

export async function tripFilter(req: Request, res: Response) {
  const { barType, drinkType, barsCount } = req.query;

  const trip = await getTripsByFilter({
    barType: Number(barType),
    barsCount: Number(barsCount),
    drinkType: Number(drinkType)
  });

  res.send(trip);
}
