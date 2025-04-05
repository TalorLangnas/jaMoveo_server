import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISession extends Document {
  _id: Types.ObjectId;
  admin: Types.ObjectId;
  activeSong: any | null;
  connectedUsers: Types.ObjectId[];
  songHistory: any[];
  isActive: boolean;
  sessionUrl: string;
  createdAt: Date;
}

const sessionSchema = new Schema<ISession>({
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  activeSong: { type: Schema.Types.Mixed, default: null },
  connectedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  songHistory: [{ type: Schema.Types.Mixed }],
  isActive: { type: Boolean, default: true },
  sessionUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model<ISession>("Session", sessionSchema);
export default Session;
