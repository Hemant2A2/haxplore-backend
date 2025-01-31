import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { initializeWebSocket } from "./config/websocket.config";

dotenv.config();

const PORT = process.env.PORT;

// Create an HTTP server
const server = http.createServer(app);

// Start Express + WebSocket Server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Initialize WebSocket Server
  initializeWebSocket(server)
});

export default server;
