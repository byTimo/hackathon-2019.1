import express from "express";
import WebSocket from "ws";
import http from "http";

import { mainRouter } from "./router/mainRouter";
import bodyParser = require("body-parser");

const app = express();

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(mainRouter);

export const server = http.createServer(app);

export const wss = new WebSocket.Server({ server });
