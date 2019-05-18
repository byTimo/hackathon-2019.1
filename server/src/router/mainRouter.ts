import { Router } from "express";
import { apiRouter } from "./apiRouter";

export const mainRouter = Router();

mainRouter.use("/api", apiRouter);
