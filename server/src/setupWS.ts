import WebSocket from "ws";
import { db } from "./db";
import { parseWsMessage } from "./lib/ws";
import {
  joinUserToRoom,
  userLeaveRoom,
  createRoom,
  closeRoom,
  moveUser
} from "./repositories/appRepository";
import { GeoPosition } from "./models/GeoPosition";

export function setupWSS(wss: WebSocket.Server) {
  wss.on("connection", ws => {
    ws.on("message", async msg => {
      const data = parseWsMessage<any>(msg);
      if (!data) {
        return;
      }

      switch (data.type) {
        case "rooms/join": {
          const { roomId, userId } = data.payload;
          handleRoomJoin(userId, roomId, ws);
          break;
        }

        case "rooms/leave": {
          const { roomId, userId } = data.payload;
          handleRoomLeave(userId, roomId, ws);
          break;
        }

        case "rooms/create": {
          const { userId, tripId } = data.payload;
          handleRoomCreate(userId, tripId, ws);
          break;
        }

        case "rooms/close": {
          const { roomId } = data.payload;
          handleRoomClose(roomId, ws);
          break;
        }

        case "user/move": {
          const { roomId, userId, nextPosition } = data.payload;
          handleUserMove(userId, roomId, nextPosition, ws);
          break;
        }
      }
    });
  });

  async function handleUserMove(
    userId: string,
    roomId: string,
    nextPosition: GeoPosition,
    ws: WebSocket
  ) {
    moveUser(roomId, userId, nextPosition);
    broadcast(
      ws,
      JSON.stringify({
        type: "user/moved",
        userId,
        position: nextPosition,
        roomId
      })
    );
  }

  async function handleRoomCreate(userId: any, tripId: any, ws: WebSocket) {
    const [user, trip] = await Promise.all([
      db.users.read(userId),
      db.trips.read(tripId)
    ]);
    const room = createRoom(user, trip);
    broadcast(ws, JSON.stringify({ type: "rooms/created", room }));
  }

  function handleRoomClose(roomId: string, ws: WebSocket) {
    closeRoom(roomId);
    broadcast(ws, JSON.stringify({ type: "rooms/closed", roomId }));
  }

  async function handleRoomJoin(userId: any, roomId: any, ws: WebSocket) {
    const user = await db.users.read(userId);
    joinUserToRoom(roomId, user);
    broadcast(ws, JSON.stringify({ type: "rooms/joined", user, roomId }));
  }

  function handleRoomLeave(userId: any, roomId: any, ws: WebSocket) {
    userLeaveRoom(roomId, userId);
    broadcast(ws, JSON.stringify({ type: "rooms/left", userId, roomId }));
  }

  function broadcast(ws: WebSocket, msg: string) {
    wss.clients.forEach(client => {
      if (client !== ws) {
        client.emit(JSON.stringify(msg));
      }
    });
  }
}
