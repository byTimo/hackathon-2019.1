import express from "express";

const app = express();

app.get("/ping", (_, res) => {
  res.send("pong");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.info("Application started at http://localhost:" + PORT);
});
