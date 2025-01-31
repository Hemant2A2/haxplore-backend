import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true } // Automatically adds createdAt & updatedAt
);
const User = mongoose.model("User", UserSchema);
export default User;
//# sourceMappingURL=user.model.js.map