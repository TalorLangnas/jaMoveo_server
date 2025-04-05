import { Request, Response } from "express";
import { scrapeSongFromTab4U } from "../../services/songScraper.js"; // Import the scraping function

// Search songs by query (you can adjust this if needed to match search functionality)
export const searchSongs = async (req: Request, res: Response) => {
  const { q } = req.query;

  try {
    // For simplicity, we'll scrape the song using the search query (adjust as needed)
    // If you want to use scraping based on a query, you can implement a scraping mechanism for it
    const songUrl = `https://www.tab4u.com/song/${q}`;  // Assuming search by song title
    const song = await scrapeSongFromTab4U(songUrl);  // Scrape the song data

    if (!song) {
      res.status(404).json({ message: "Song not found" });
      return;
    }

    res.json(song); // Return the scraped song data
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Get a song by ID (Here, ID could be the song title or another identifier)
export const getSongById = async (req: Request, res: Response): Promise<void> => {
  try {
    const songUrl = `https://www.tab4u.com/song/${req.params.id}`;  // Assuming the song ID is the title or unique ID in URL
    const song = await scrapeSongFromTab4U(songUrl);  // Scrape the song data

    if (!song) {
      res.status(404).json({ message: "Song not found" });
      return;
    }

    res.json(song); // Return the scraped song data
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
