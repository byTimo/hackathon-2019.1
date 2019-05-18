import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

interface SettingsProps {}

export function Settings(props: SettingsProps) {
  return (
    <div>
      <Link to={routes.filter}>Назад</Link>
    </div>
  );
}
