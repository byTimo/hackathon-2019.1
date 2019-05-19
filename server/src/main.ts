import { server, wss } from "./server";
import { setupWSS } from "./setupWS";

setupWSS(wss);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.info("Application started at http://localhost:" + PORT);
});
