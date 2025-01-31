import mongoose from "mongoose";
const CollageSchema = new mongoose.Schema({
    images: [{ type: String, required: true }], // Image URLs
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Lock tracking to ensure only one user can edit an image at a time
    locks: [{ userId: String, imageId: String }],
}, { timestamps: true });
export default mongoose.model("Collage", CollageSchema);
//# sourceMappingURL=collage.model.js.map