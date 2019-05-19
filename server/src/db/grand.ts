import firestore from "firebase-admin";
import {Bar} from "../models/Bar";
import {Trip} from "../models/Trip";
import * as admin from "firebase-admin";
import {createBarsRepository} from "./bars";

function convertToArray(data: admin.database.DataSnapshot, action: (data: admin.database.DataSnapshot) => any): any[] {
    const result: any = [];
    data.forEach(x => {
        result.push(action(x))
    });

    return result;
}

export function createGrandTripRepository(db: firestore.database.Database) {
    const ref = db.ref("/grand_trips");

    const select = async () => {
        const a = await ref.once("value");
        const result: Trip[] = [];
        a.forEach(x => {
            const trip = x.val();
            trip.id = x.key;
            const ids = convertToArray(x.child("bars"), x => x.val());
            result.push({
                id: x.key,
                ...x.val(),
                bars: ids as any
            })
        });

        return result;
    }

    return {
        select
    }
}