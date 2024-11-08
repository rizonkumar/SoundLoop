import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    // - 1 is descending order => new to old
    // 1 is ascending order => old to new
    const song = await Song.find().sort({ createdAt: -1 });
    return res
      .status(201)
      .json({ songs: song, message: "All Songs Fetch", success: true });
  } catch (error) {
    next(error);
  }
};

// TODO: Will be adding algorithm based on User we will be implementing later
export const getFeaturedSongs = async (req, res) => {
  try {
    // fetch 6 random songs using mongoDB aggregate
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    return res
      .status(201)
      .json({ songs, message: "Features Songs Fetch", success: true });
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res) => {
  try {
    // fetch 6 random songs using mongoDB aggregate
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    return res
      .status(201)
      .json({ songs, message: "Created For You Songs Fetch", success: true });
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res) => {
  try {
    // fetch 6 random songs using mongoDB aggregate
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    return res
      .status(201)
      .json({ songs, message: "Trending Songs Fetch", success: true });
  } catch (error) {
    next(error);
  }
};
