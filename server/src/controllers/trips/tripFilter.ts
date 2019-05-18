import { Request, Response } from "express";
import { getTripsByFilter } from "../../services/bars/getTripsByFilter";

export function tripFilter(req: Request, res: Response) {
  const { barType, drinkType, barsCount } = req.query;

  const trips = getTripsByFilter({
    barType: Number(barType),
    barsCount: Number(barsCount),
    drinkType: Number(drinkType)
  });

  res.send(trips);
}
