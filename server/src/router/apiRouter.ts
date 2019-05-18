import { Router } from "express";
import { tripFilter } from "../controllers/trips/tripFilter";

export const apiRouter = Router();

apiRouter.get("/trips", tripFilter);
