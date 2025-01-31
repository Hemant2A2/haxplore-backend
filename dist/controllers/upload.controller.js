var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { saveFile, fetchUploads } from "../services/upload.service";
export const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }
        const fileData = yield saveFile(req.file);
        res.status(201).json({ message: "File uploaded successfully", file: fileData });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export const getUploads = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploads = yield fetchUploads();
        res.status(200).json({ uploads });
    }
    catch (error) {
        console.error("Fetch uploads error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//# sourceMappingURL=upload.controller.js.map