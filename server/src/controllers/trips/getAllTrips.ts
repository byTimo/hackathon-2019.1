import { Request, Response } from "express";
import { db } from "../../db";

export async function getAllTrips(req: Request, res: Response) {
  const trips = await db.trips.readAll();
  res.send(trips);
}
