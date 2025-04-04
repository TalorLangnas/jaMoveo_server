import mongoose, { Schema, Document, Types } from "mongoose";

// Define a TypeScript interface for the Session document
export interface ISession extends Document {
  admin: Types.ObjectId;
  activeSong: Types.ObjectId | null;
  connectedUsers: Types.ObjectId[];
  songHistory: Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
}

// Define the schema
const sessionSchema = new Schema<ISession>({
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activeSong: { type: Schema.Types.ObjectId, ref: "Song", default: null },
  connectedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  songHistory: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const Session = mongoose.model<ISession>("Session", sessionSchema);
export default Session;
