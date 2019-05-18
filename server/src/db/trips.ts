import firestore from "firebase-admin";
import { Omit } from "../../utils/Types";
import { Trip } from "../models/Trip";
import { Bar } from "../models/Bar";

export function createTripRepository(db: firestore.database.Database) {
  const ref = db.ref("/trips");

  return {
    create: async (bars: Bar[]): Promise<string> => {
      const data = await ref.push({ bars });
      return data.key;
    },

    read: async (id: string): Promise<Trip> => {
      const trip = (await ref.child(id).once("value")).val();
      return {
        ...trip,
        id
      };
    },

    readAll: async (): Promise<Trip[]> => {
      const trips = await ref.once("value").then(x => x.val());
      console.log(trips);
      return trips;
    },

    delete: async (id: string): Promise<void> => {
      await ref.child(id).remove();
    }
  };
}
