import { Router } from "express";
import { tripFilter } from "../controllers/trips/tripFilter";
import { authUser, createUser, readUser} from "../controllers/users";import { getAllTrips } from "../controllers/trips/getAllTrips";
import { getTrip } from "../controllers/trips/getTrip";
import { getAllRoomsController } from "../controllers/rooms/getAllRooms";
import {selectGrands} from "../controllers/grand";

export const apiRouter = Router();

apiRouter.get("/trips", tripFilter);
apiRouter.get("/trips/all", getAllTrips);
apiRouter.get("/trips/:id", getTrip);

apiRouter.get("/rooms/all", getAllRoomsController);

apiRouter.get("/user/:id", readUser);
apiRouter.post("/user", createUser);
apiRouter.post("/auth", authUser);

apiRouter.get("/grand", selectGrands);
