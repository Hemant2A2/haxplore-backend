import mongoose from "mongoose";
const UploadSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
});
export default mongoose.model("Upload", UploadSchema);
//# sourceMappingURL=upload.model.js.map