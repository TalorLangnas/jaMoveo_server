import mongoose, { Schema, Document } from "mongoose";

// Interface for the User
export interface IUser extends Document {
  username: string;
  password: string;
  instrument: string;
  role: "player" | "admin";
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: { type: String, required: true },
  role: { type: String, enum: ["player", "admin"], default: "player" },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
