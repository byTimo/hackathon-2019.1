import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

interface ResultListProps {}

export function ResultList(props: ResultListProps) {
  return (
    <div>
      <Link to={routes.result}>На карте</Link> &middot; <a>Списком</a>
      <hr />
      <Link to={routes.room}>Дальше</Link>
    </div>
  );
}
