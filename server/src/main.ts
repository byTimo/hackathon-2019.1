import { server, wss } from "./server";
import { setupWSS } from "./setupWS";
import bodyParser from "body-parser";
import express from "express";
import {mainRouter} from "./router/mainRouter";
import bodyParser from "body-parser";

const app = express();

setupWSS(wss);
app.get("/ping", (_, res) => {
    res.send("pong");
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(mainRouter);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.info("Application started at http://localhost:" + PORT);
});
