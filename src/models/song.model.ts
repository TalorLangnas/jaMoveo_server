import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  language: { type: String, enum: ["en", "he"], default: "en" },
  data: { type: Array, required: true }, // lines of lyrics/chords
  imageUrl: { type: String }
});

const Song = mongoose.model("Song", songSchema);
export default Song;
