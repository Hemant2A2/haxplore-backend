import mongoose, { Schema } from "mongoose";
const VersionHistorySchema = new Schema({
    collageId: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });
const VersionHistory = mongoose.model("VersionHistory", VersionHistorySchema);
export default VersionHistory;
//# sourceMappingURL=versionHistory.model.js.map