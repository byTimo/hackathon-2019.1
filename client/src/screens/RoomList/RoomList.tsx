import React from "react";
import { useRooms } from "../../hooks/useRooms";
import { NavLink } from "react-router-dom";
import routes from "../../routes";

export function RoomsList() {
  const rooms = useRooms();

  return (
    <section>
      <h1>Список комнат</h1>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>{room.trip.bars.map(x => x.title).join(" • ")}</li>
        ))}
        <li>
          <NavLink to={routes.filter}>Создать комнату</NavLink>
        </li>
      </ul>
    </section>
  );
}
