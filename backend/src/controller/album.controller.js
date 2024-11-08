import { Album } from "../models/album.model.js";
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums, {
      message: "All albums fetched successfully",
      success: true,
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
    res
      .status(201)
      .json(album, { message: "Album fetched successfully", success: true });
  } catch (error) {
    next(error);
  }
};
