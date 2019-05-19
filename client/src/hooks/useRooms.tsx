import { useEffect, useState } from "react";
import { ITrip, IGeoPosition } from "../types/common";
import { ws } from "../lib/ws";

function fetchRooms(): Promise<IRoom[]> {
  return fetch("/api/rooms/all").then(x => x.json());
}

interface IUser {
  id: string;
  position: IGeoPosition;
  weight: number;
  height: number;
}

interface IRoom {
  id: string;
  leaderId: string;
  users: IUser[];
  trip: ITrip;
}

let roomsCache: IRoom[] = [];

export function useRooms() {
  const [rooms, setRooms] = useState<IRoom[]>(roomsCache);

  function updateRooms(rooms: IRoom[]) {
    setRooms(rooms);
    roomsCache = rooms;
  }

  function handleMessage(msg: MessageEvent) {
    const { type, payload } = JSON.parse(msg.data);
    switch (type) {
      case "rooms/created":
        return handleRoomCreated(payload.room);
      case "rooms/closed":
        return handleRoomClosed(payload.roomId);
      case "rooms/joined":
        return handleRoomJoined(payload.roomId, payload.user);
      case "rooms/left":
        return handleRoomLeft(payload.roomId, payload.userId);
      case "user/moved":
        return handleUserMoved(
          payload.roomId,
          payload.userId,
          payload.position
        );
    }
  }

  function handleRoomCreated(room: IRoom) {
    updateRooms(rooms.concat(room));
  }

  function handleRoomClosed(roomId: string) {
    updateRooms(rooms.filter(x => x.id !== roomId));
  }

  function handleRoomJoined(roomId: string, user: IUser) {
    const room = rooms.find(x => x.id === roomId);
    if (!room) {
      console.warn("Room not found", { roomId });
      return;
    }
    room.users.push(user);
    updateRooms(rooms.slice());
  }

  function handleRoomLeft(roomId: string, userId: string) {
    const room = rooms.find(x => x.id === roomId);
    if (!room) {
      console.warn("Room not found", { roomId });
      return;
    }
    room.users = room.users.filter(x => x.id !== userId);
    updateRooms(rooms.slice());
  }

  function handleUserMoved(
    roomId: string,
    userId: string,
    position: IGeoPosition
  ) {
    const room = rooms.find(x => x.id === roomId);
    if (!room) {
      console.warn("Room not found", { roomId });
      return;
    }
    const user = room.users.find(x => x.id === userId);
    if (!user) {
      console.warn("User not found", { userId });
      return;
    }
    user.position = position;
    updateRooms(rooms.slice());
  }

  useEffect(() => {
    async function runEffect() {
      updateRooms(await fetchRooms());
      ws.addEventListener("message", handleMessage);
    }
    runEffect();

    () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws]);

  return rooms;
}
