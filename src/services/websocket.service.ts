import WebSocket from "ws";
import { createSnapshot, restoreSnapshot } from "../services/versionHistory.service";

interface ClientData {
  ws: WebSocket;
  userId: string;
}

interface Lock {
  userId: string;
  imageId: string;
}

export class WebSocketService {
  private static clients: ClientData[] = [];
  private static locks: Lock[] = [];

  static addClient(ws: WebSocket, userId: string) {
    this.clients.push({ ws, userId });
  }

  static removeClient(ws: WebSocket) {
    this.clients = this.clients.filter((client) => client.ws !== ws);
  }

  static broadcast(data: any) {
    this.clients.forEach(({ ws }) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    });
  }

  static async handleMessage(ws: WebSocket, message: string) {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case "user_joined":
          this.addClient(ws, data.userId);
          this.broadcast({
            type: "user_update",
            userId: data.userId,
            action: "joined",
          });
          break;

        case "lock_image":
          if (!this.isImageLocked(data.imageId)) {
            this.locks.push({ userId: data.userId, imageId: data.imageId });
            this.broadcast({
              type: "image_locked",
              imageId: data.imageId,
              userId: data.userId,
            });
          }
          break;

        case "unlock_image":
          this.locks = this.locks.filter((lock) => lock.imageId !== data.imageId);
          this.broadcast({ type: "image_unlocked", imageId: data.imageId });
          break;

        case "update_collage":
          this.broadcast({ type: "collage_updated", data: data.collage });
          break;

        case "save_snapshot":
          try {
            const { collageId, content } = data.payload;
            const snapshot = await createSnapshot(collageId, content);

            this.broadcast({
              type: "snapshot_saved",
              snapshot,
            });
          } catch (error) {
            console.error("Failed to save snapshot:", error);
            ws.send(JSON.stringify({ type: "error", message: "Snapshot save failed." }));
          }
          break;

          case "restore_snapshot":
          try {
            const { snapshotId } = data.payload;
            const restoredSnapshot = await restoreSnapshot(snapshotId);

            if (restoredSnapshot) {
              this.broadcast({
                type: "snapshot_restored",
                snapshot: restoredSnapshot,
              });
            } else {
              ws.send(JSON.stringify({ type: "error", message: "Snapshot not found." }));
            }
          } catch (error) {
            console.error("Failed to restore snapshot:", error);
            ws.send(JSON.stringify({ type: "error", message: "Snapshot restore failed." }));
          }
          break;

          case "addImage":
          // Broadcast the image addition so that all connected clients update their collage in real time.
          this.broadcast({ type: "addImage", src: data.src, userId: data.userId });
          break;

        default:
          console.warn("Unknown message type:", data.type);
      }
    } catch (error) {
      console.error("Error processing WebSocket message:", error);
    }
  }

  static isImageLocked(imageId: string): boolean {
    return this.locks.some((lock) => lock.imageId === imageId);
  }
}
