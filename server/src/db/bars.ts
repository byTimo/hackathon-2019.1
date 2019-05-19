import firestore from "firebase-admin";
import {Bar} from "../models/Bar";
import {BarType} from "../models/BarType";
import {BeerType} from "../models/BeerType";
import {VineType} from "../models/VineType";

function rnd<T>(xs: T[]) {
    return xs[Math.floor(Math.random() * xs.length)];
}

export function createBarsRepository(db: firestore.database.Database) {
    const ref = db.ref("/bars");

    const convert = (id: string, bar: any): Bar => {
        const type = rnd([BarType.BEER, BarType.STRONG, BarType.VINE]);
        const drinkType =
            type === BarType.BEER
                ? rnd([BeerType.LAGGER, BeerType.STOUT])
                : type === BarType.VINE
                ? rnd([VineType.RED, VineType.WHITE])
                : VineType.WHITE;
        return {
            id,
            title: bar.name,
            geoPosition: {
                latitude: bar.lat,
                longitude: bar.lng,
            },
            type,
            drinkType,
        }
    };

    return {
        select: async (ids?: string[]) => {
            const a = await ref.once("value");
            const result: Bar[] = [];
            a.forEach(x => {
                result.push(convert(x.key!, x.val()))
            });

            if(!ids) {
                return result;
            }

            const set = new Set(ids);
            return result.filter(x => set.has(x.id))
        },

        read: async (id: string): Promise<Bar> => {
            const bar = await ref.child(id).once("value");
            return convert(bar.key!, bar.val());
        }
    }
}