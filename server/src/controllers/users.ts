import { Request, Response } from "express";
import { db } from "../db";

export async function authUser(req: Request, res: Response) {
    const {email, password} = req.body;
    const id = await db.auth.login(email, password);
    res.send(await db.users.read(id));
}

export async function createUser(req: Request, res: Response) {
  const body = req.body;

  const email = body.email;
    const password = body.password;

    const user = {
        name: body.name,
        gender: body.gender,
        weight: Number(body.weight),
    height: Number(body.height)
  };

  const id = await db.auth.create(email, password);
    await db.users.create(id, user);

  res.send({ id });
}

export async function readUser(req: Request, res: Response) {
  const id = req.params.id;

  const user = await db.users.read(id);

  res.send(user);
}
