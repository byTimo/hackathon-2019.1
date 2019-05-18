import { AppState } from "../models/AppState";
import { User } from "../models/User";
import { Trip } from "../models/Trip";
import { GeoPosition } from "../models/GeoPosition";

const state = new AppState();

export function createRoom(leaderUser: User, trip: Trip) {
  return state.createRoom(leaderUser, trip);
}

export function closeRoom(id: string) {
  state.closeRoom(id);
}

export function joinUserToRoom(roomId: string, user: User) {
  const room = state.rooms.get(roomId);
  if (!room) {
    console.error("Room not found", { roomId });
    return;
  }
  room.addUser(user);
}

export function userLeaveRoom(roomId: string, userId: string) {
  const room = state.rooms.get(roomId);
  if (!room) {
    console.error("Room not found", { roomId });
    return;
  }
  room.removeUser(userId);
}

export function moveUser(
  roomId: string,
  userId: string,
  nextPosition: GeoPosition
) {
  const room = state.rooms.get(roomId);
  if (!room) {
    console.error("Room not found", { roomId });
    return;
  }
  const user = room.users.get(userId);
  if (!user) {
    console.error("User not found", { userId });
    return;
  }
  user.setPosition(nextPosition);
}
