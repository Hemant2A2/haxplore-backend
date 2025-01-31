var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Collage from "../models/collage.model";
export const getCollage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collage = yield Collage.findById(req.params.id);
        res.json(collage);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching collage" });
    }
});
export const updateCollage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { images } = req.body;
        const updatedCollage = yield Collage.findByIdAndUpdate(req.params.id, { images }, { new: true });
        // // Notify all users about the update
        // WebSocketService.broadcast({ type: "collage_updated", data: updatedCollage });
        res.json(updatedCollage);
    }
    catch (err) {
        res.status(500).json({ error: "Error updating collage" });
    }
});
//# sourceMappingURL=collage.controller.js.map