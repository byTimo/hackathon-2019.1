import {createUserRepository} from "./users";
import {createBarsRepository} from "./bars";
import {createAuth} from "./auth";
import {createTripRepository} from "./trips";
import {createGrandTripRepository} from "./grand";

const admin = require("firebase-admin");
const cert = require("../../secrets/alco-trip-firebase-adminsdk-ohaiv-9136820f5d.json");

export const app = admin.initializeApp({
    credential: admin.credential.cert(cert),
    databaseURL: "https://alco-trip.firebaseio.com/"
});

const database = app.database();
const auth = app.auth();

export const db = {
    users: createUserRepository(database),
    bars: createBarsRepository(database),
    trips: createTripRepository(database),
    grand: createGrandTripRepository(database),
    auth: createAuth(auth),
};
