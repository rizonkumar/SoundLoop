import { SongService } from "../services/songService.js";

const songService = new SongService();

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await songService.getAllSongs();
    return res
      .status(200)
      .json({ songs, message: "All Songs Fetched", success: true });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await songService.getFeaturedSongs();
    return res
      .status(200)
      .json({ songs, message: "Featured Songs Fetched", success: true });
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await songService.getMadeForYouSongs();
    return res
      .status(200)
      .json({ songs, message: "Created For You Songs Fetched", success: true });
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await songService.getTrendingSongs();
    return res
      .status(200)
      .json({ songs, message: "Trending Songs Fetched", success: true });
  } catch (error) {
    next(error);
  }
};
