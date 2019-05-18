import express from "express";
import {mainRouter} from "./router/mainRouter";

const app = express();

app.get("/ping", (_, res) => {
    res.send("pong");
});

app.use(mainRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.info("Application started at http://localhost:" + PORT);
});
