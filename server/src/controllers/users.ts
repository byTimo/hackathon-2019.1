import { Request, Response } from "express";
import { db } from "../db";

export async function createUser(req: Request, res: Response) {
  const body = req.body;

  const user = {
    name: body.name,
    gender: body.gender,
    weight: body.distanceWeight,
    height: body.height
  };

  const id = await db.users.create(user);

  res.send({ id });
}

export async function readUser(req: Request, res: Response) {
  const id = req.params.id;

  const user = await db.users.read(id);

  res.send(user);
}
