import { Request, Response } from "express";
import { db } from "../../db";

export async function getTrip(req: Request, res: Response) {
  const trips = await db.trips.read(req.query.tripId);
  res.send(trips);
}
