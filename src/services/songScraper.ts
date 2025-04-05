import axios from "axios";
import * as cheerio from "cheerio";  // Use named import for cheerio

// Example function to scrape song data (lyrics and chords) from a given URL
export const scrapeSongFromTab4U = async (songUrl: string) => {
  try {
    const response = await axios.get(songUrl);  // Fetch the page content
    const $ = cheerio.load(response.data);  // Load the HTML into cheerio

    // Find the song's title, chords, and lyrics from the page
    const title = $("h1.song-title").text().trim(); // Example selector for title
    const lyrics = $(".lyrics-container").text().trim();  // Example selector for lyrics
    const chords = $(".chords-container").text().trim().split("\n");  // Example selector for chords

    // Return the scraped song data
    return {
      title,
      artist: "Unknown",  // Artist can be fetched if available on the page
      lyrics,
      chords
    };
  } catch (error) {
    console.error("Error scraping song data:", error);
    return null;
  }
};
