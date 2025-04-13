import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  instrument: string;
  role: "player" | "admin";
  sessionId: Types.ObjectId | number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: { type: String, required: true },
  role: { type: String, enum: ["player", "admin"], default: "player" },
  sessionId: { type: Schema.Types.Mixed, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
