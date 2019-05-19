import { Request, Response } from "express";
import { getAllRooms } from "../../repositories/appRepository";

export function getAllRoomsController(req: Request, res: Response) {
  res.send(getAllRooms().map(x => x.toJSON()));
}
