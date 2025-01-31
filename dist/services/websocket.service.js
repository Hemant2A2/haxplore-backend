var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import WebSocket from "ws";
import { createSnapshot, restoreSnapshot } from "../services/versionHistory.service";
export class WebSocketService {
    static addClient(ws, userId) {
        this.clients.push({ ws, userId });
    }
    static removeClient(ws) {
        this.clients = this.clients.filter((client) => client.ws !== ws);
    }
    static broadcast(data) {
        this.clients.forEach(({ ws }) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(data));
            }
        });
    }
    static handleMessage(ws, message) {
        return __awaiter(this, void 0, void 0, function* () {
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
                            const snapshot = yield createSnapshot(collageId, content);
                            this.broadcast({
                                type: "snapshot_saved",
                                snapshot,
                            });
                        }
                        catch (error) {
                            console.error("Failed to save snapshot:", error);
                            ws.send(JSON.stringify({ type: "error", message: "Snapshot save failed." }));
                        }
                        break;
                    case "restore_snapshot":
                        try {
                            const { snapshotId } = data.payload;
                            const restoredSnapshot = yield restoreSnapshot(snapshotId);
                            if (restoredSnapshot) {
                                this.broadcast({
                                    type: "snapshot_restored",
                                    snapshot: restoredSnapshot,
                                });
                            }
                            else {
                                ws.send(JSON.stringify({ type: "error", message: "Snapshot not found." }));
                            }
                        }
                        catch (error) {
                            console.error("Failed to restore snapshot:", error);
                            ws.send(JSON.stringify({ type: "error", message: "Snapshot restore failed." }));
                        }
                        break;
                    default:
                        console.warn("Unknown message type:", data.type);
                }
            }
            catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        });
    }
    static isImageLocked(imageId) {
        return this.locks.some((lock) => lock.imageId === imageId);
    }
}
WebSocketService.clients = [];
WebSocketService.locks = [];
//# sourceMappingURL=websocket.service.js.map