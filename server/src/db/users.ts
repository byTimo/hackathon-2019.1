import { User } from "../models/User";
import firestore from "firebase-admin";
import { Omit } from "../../utils/Types";

export function createUserRepository(db: firestore.database.Database) {
  const ref = db.ref("/users");

  return {
    create: async (
      id: string, user: Pick<User, "name" | "weight" | "height" | "gender">
    ): Promise<string> => {
      const data = await ref.child(id).set(user);
      return id;
    },

    read: async (id: string): Promise<User> => {
      const user = (await ref.child(id).once("value")).val();
      return new User({
        ...user,
        id
      });
    },

    update: async (id: string, user: Omit<User, "id">): Promise<void> => {
      await ref.child(id).set({
        ...user
      });
    },

    delete: async (id: string): Promise<void> => {
      await ref.child(id).remove();
    }
  };
}
