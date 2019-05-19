import React from "react";
import {
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import { RouteComponentProps } from "react-router";
import routes from "../../routes";
import "./State.css";

interface StateProps extends RouteComponentProps {}

export function State(props: StateProps) {
  return (
    <div>
      <div className="back">
        <Button onClick={() => props.history.push(routes.inBar)}>
          <ArrowBackIcon />
          Назад
        </Button>
      </div>
      <div className="ovh">
        <div className="icon">
          <AccessibilityIcon />
        </div>
      </div>
      <List>
        <ListItem>
          <ListItemText primary="4,5 литра" secondary="Выпито в 3 барах" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="2,2 промиле"
            secondary="Опьянение средней тяжести. Можно кутить дальше"
          />
        </ListItem>
      </List>
    </div>
  );
}
