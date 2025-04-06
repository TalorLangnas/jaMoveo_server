// importSongs.ts

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Song, { ISong } from '../models/song.model'; // Adjust the import path as needed

// Replace with your MongoDB connection string
const MONGODB_URI = 'mongodb+srv://tlangnas093:ET1kvCCfZD59aOWS@cluster0.om8z2ne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const FILEPATH = path.join(__dirname, "../data/songs.json"); // Adjust the path to your JSON file
console.log(FILEPATH);// debugging line

async function connectDB() {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

async function importSongs() {
  // Define the path to your JSON file
  const filePath = path.join(__dirname, "../data/songs.json");

  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      process.exit(1);
    }
    try {
      // Parse JSON data; expect an array of Song objects
      const songs: ISong[] = JSON.parse(data);
      
      // Insert songs into the database
      const result = await Song.insertMany(songs);
      console.log('Songs inserted successfully:', result);
    } catch (error) {
      console.error('Error inserting songs:', error);
    } finally {
      mongoose.connection.close();
    }
  });
}

// Connect to the database and import songs
connectDB().then(importSongs);
