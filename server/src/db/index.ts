import {createUserRepository} from "./users";

const admin = require('firebase-admin');
const cert = require("../../secrets/alco-trip-firebase-adminsdk-ohaiv-9136820f5d.json");

export const app = admin.initializeApp({
    credential: admin.credential.cert(cert),
    databaseURL: "https://alco-trip.firebaseio.com/"
});

const database = app.database();

export const db = {
    users: createUserRepository(database)
};