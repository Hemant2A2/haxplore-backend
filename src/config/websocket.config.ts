import { Server as WebSocketServer } from "ws";
import { WebSocketService } from "../services/websocket.service";

export function initializeWebSocket(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message: string) => {
      WebSocketService.handleMessage(ws, message);
    });

    ws.on("close", () => {
      console.log("WebSocket disconnected");
      WebSocketService.removeClient(ws);
    });
  });

  return wss;
}
