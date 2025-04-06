// src/models/song.model.ts

import mongoose, { Schema, Document } from "mongoose";

// Define the type for each line item (each word/segment in a line)
export type ILineItem = {
  lyrics?: string;
  chords?: string;
};

// Define the type for a line: an array of line items
export type ILine = ILineItem[];

// Define the interface for the Song document
export interface ISong extends Document {
  name: string;
  artist: string;
  body: ILine[];  // Each line is an array of line items, and body is an array of these lines
}

// Define the schema for a line item
const lineItemSchema: Schema = new Schema(
  {
    lyrics: { type: String },
    chords: { type: String }
  },
  { _id: false }  // Do not create an _id for each line item
);

// Define the song schema
const songSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    // Body is an array of arrays of line items
    body: {
      type: [[lineItemSchema]],
      required: true
    }
  });

// Create the model from the schema
const Song = mongoose.model<ISong>("Song", songSchema);
export default Song;
