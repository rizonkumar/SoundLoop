import { Album } from "../models/album.model.js";
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    return res.status(200).json({
      message: "All albums fetched successfully",
      success: true,
      data: albums,
    });
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findById(albumId).populate("songs"); // Populates 'songs' field with referenced Song documents

    if (!album) {
      res.status(404).json({
        message: "Album not found",
        success: false,
      });
    }
    res.status(201).json({
      message: "Album fetched successfully",
      success: true,
      data: album,
    });
  } catch (error) {
    next(error);
  }
};
