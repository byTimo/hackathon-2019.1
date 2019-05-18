import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

interface FilterProps {}

export function Filter(props: FilterProps) {
  return (
    <div>
      <Link to={routes.settings}>Настройки</Link> &middot;{" "}
      <Link to={routes.result}>Найти</Link>
    </div>
  );
}
