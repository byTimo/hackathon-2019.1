import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";

interface ResultProps {}

export function Result(props: ResultProps) {
  return (
    <div>
      <a>На карте</a> &middot; <Link to={routes.resultList}>Списком</Link>
      <hr />
      <Link to={routes.room}>Дальше</Link>
    </div>
  );
}
