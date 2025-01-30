import http from "http";
import { Server as WebSocketServer } from "ws";
import dotenv from "dotenv";
import app from "./app";
import { initWebSocket } from "./config/websocket.config";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer(app);

// Initialize WebSocket Server
const wss = new WebSocketServer({ server });
initWebSocket(wss);

// Start Express + WebSocket Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default server;
