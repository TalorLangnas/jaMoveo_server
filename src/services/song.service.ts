import fs from "fs";
import path from "path";

// Define types for the song structure based on the JSON files
interface ISong {
  title: string;
  artist: string;
  lyrics: string;
  chords: string[];
}

// Function to load songs from the local files
export const loadSongs = async (): Promise<ISong[]> => {
  // Get the current directory where the script is located (adjust path for local filesystem)
  const songsDataPath = path.resolve(new URL(import.meta.url).pathname, "../../data");

  const heyJudePath = path.join(songsDataPath, "hey_jude.json");
  console.log("Hey Jude path:", heyJudePath); // Debugging line to check the path
  const veechSheloPath = path.join(songsDataPath, "veech_shelo.json");

  // Load and parse both JSON files
  const heyJude = JSON.parse(fs.readFileSync(heyJudePath, "utf-8"));
  console.log("Hey Jude data:", heyJude); // Debugging line to check the data
  const veechShelo = JSON.parse(fs.readFileSync(veechSheloPath, "utf-8"));

  return [heyJude, veechShelo]; // Return both songs
};

// Optional function to get a song by its title
export const getSongByTitle = async (title: string): Promise<ISong | null> => {
  const songs = await loadSongs();
  return songs.find(song => song.title.toLowerCase() === title.toLowerCase()) || null;
};
