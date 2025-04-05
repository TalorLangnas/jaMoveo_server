import mongoose, { Schema, Document, Types } from "mongoose";

// Define the TypeScript interface for the User document
export interface IUser extends Document {
  username: string;
  password: string;
  instrument: string;
  role: "player" | "admin";
  sessionId: Types.ObjectId | number; // sessionId can be either an ObjectId or an integer (0)
  createdAt: Date;
}

// Define the schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  instrument: { type: String, required: true },
  role: { type: String, enum: ["player", "admin"], default: "player" },
  sessionId: { type: Schema.Types.Mixed, default: 0 },  // Allow sessionId to be either ObjectId or 0
  createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const User = mongoose.model<IUser>("User", userSchema);
export default User;
