import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import "./InBar.css";
import routes from "../../routes";
import { RouteComponentProps } from "react-router";

interface InBarProps extends RouteComponentProps {}

export function InBar(props: InBarProps) {
  return (
    <div>
      <Typography variant="h2" align="center" className="time">
        05:00:00
      </Typography>
      <ul className="alco-list">
        <li>
          <Button variant="contained" color="default">
            <LocalBarIcon /> 0,3
          </Button>
        </li>
        <li>
          <Button variant="contained" color="default">
            <LocalBarIcon /> 0,5
          </Button>
        </li>
        <li>
          <Button variant="contained" color="default">
            <LocalBarIcon /> 1,0
          </Button>
        </li>
      </ul>
      <div className="go">
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.history.push(routes.navigation)}
        >
          Погнали дальше
        </Button>
      </div>
      <div className="man">
        <IconButton onClick={() => props.history.push(routes.state)}>
          <PersonIcon />
        </IconButton>
      </div>
    </div>
  );
}
