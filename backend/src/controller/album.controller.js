import { AlbumService } from "../services/albumService.js";

const albumService = new AlbumService();

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await albumService.getAllAlbums();
    res.status(200).json({
      albums,
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
    const album = await albumService.getAlbumById(albumId);

    if (!album) {
      return res.status(404).json({
        message: "Album not found",
        success: false,
      });
    }

    res.status(200).json({
      album,
      message: "Album fetched successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
