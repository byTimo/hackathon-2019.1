export const ws = new WebSocket(`ws://${location.host}`);

function emit(data: any) {
  return ws.send(JSON.stringify(data));
}

export function createRoom(userId: string, tripId: string) {
  return emit({
    type: "rooms/create",
    payload: { userId, tripId }
  });
}
