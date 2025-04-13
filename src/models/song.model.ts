import mongoose, { Schema, Document } from "mongoose";

// Line item interface
export type ILineItem = {
  lyrics?: string;
  chords?: string;
};

export type ILine = ILineItem[];

export interface ISong extends Document {
  name: string;
  artist: string;
  imgUrl?: string;
  body: ILine[];
}

const lineItemSchema: Schema = new Schema(
  {
    lyrics: { type: String },
    chords: { type: String },
  },
  { _id: false }
);

const songSchema: Schema = new Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  imgUrl: { type: String },
  body: {
    type: [[lineItemSchema]],
    required: true,
  },
});

const Song = mongoose.model<ISong>("Song", songSchema);
export default Song;
