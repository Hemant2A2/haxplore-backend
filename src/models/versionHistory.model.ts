import mongoose, { Schema, Document } from "mongoose";

export interface IVersionHistory extends Document {
  collageId: string;
  data: any;
  createdAt: Date;
}

const VersionHistorySchema = new Schema<IVersionHistory>(
  {
    collageId: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const VersionHistory = mongoose.model<IVersionHistory>("VersionHistory", VersionHistorySchema);
export default VersionHistory;
