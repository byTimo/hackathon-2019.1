import { Router } from "express";
import { tripFilter } from "../controllers/trips/tripFilter";
import {createUser, readUser} from "../controllers/users";

export const apiRouter = Router();

apiRouter.get("/trips", tripFilter);

apiRouter.get("/user/:id", readUser);
apiRouter.post("/user", createUser);
