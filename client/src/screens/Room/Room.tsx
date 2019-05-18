import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

interface RoomProps {}

export function Room(props: RoomProps) {
  return (
    <div>
      <Link to={routes.navigation}>Пошли бухать</Link>
    </div>
  );
}
