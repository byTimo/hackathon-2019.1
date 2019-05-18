import { Room } from "./Room";
import { User } from "./User";
import { Trip } from "./Trip";
import uuid = require("uuid");

export class AppState {
  public rooms: Map<string, Room> = new Map();

  public createRoom(leaderUser: User, trip: Trip) {
    const newRoom = new Room(uuid(), leaderUser, trip);
    this.rooms.set(newRoom.id, newRoom);
    return newRoom;
  }

  public closeRoom(id: string) {
    this.rooms.delete(id);
  }
}
