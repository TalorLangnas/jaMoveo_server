import mongoose, { Schema, Document, Types } from "mongoose";

// Define a TypeScript interface for the Session document
export interface ISession extends Document {
  _id: Types.ObjectId;  // Explicitly define _id as ObjectId
  admin: Types.ObjectId;
  activeSong: any | null;  // Allow activeSong to hold raw song data (optional)
  connectedUsers: Types.ObjectId[];  // Store connected users (player references)
  songHistory: any[];  // Store song data directly here (optional)
  isActive: boolean;
  sessionUrl: string;
  createdAt: Date;
}

// Define the schema
const sessionSchema = new Schema<ISession>({
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activeSong: { type: Schema.Types.Mixed, default: null },  // Store raw song data (optional)
  connectedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],  // Store connected players (users)
  songHistory: [{ type: Schema.Types.Mixed }],  // Store raw song data (optional)
  isActive: { type: Boolean, default: true },
  sessionUrl: { type: String }, // Store the generated session URL
  createdAt: { type: Date, default: Date.now }
});

// Create and export the model
const Session = mongoose.model<ISession>("Session", sessionSchema);
export default Session;
