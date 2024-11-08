import { SongService } from "../services/songService.js";
import { AlbumService } from "../services/albumService.js";
import { uploadToCloudinary } from "../helper/UploadToCloudinary.js";

const songService = new SongService();
const albumService = new AlbumService();

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFiles || !req.files.imageFiles) {
      return res.status(400).json({ message: "Please upload all the files." });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFiles;
    const imageFile = req.files.imageFiles;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = await songService.createSong({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    res.status(201).json({
      song,
      message: "Song created successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error in createSong controller", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    await songService.deleteSong(id);

    res.status(200).json({
      message: "Song deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error in deleteSong controller", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = await albumService.createAlbum({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    res.status(201).json({
      album,
      message: "Album created successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error in createAlbum controller", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await albumService.deleteAlbum(id);

    res.status(200).json({
      message: "Album deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("error in deleteAlbum controller", error);
    next(error);
  }
};

export const checkAdmin = async (req, res) => {
  res.status(200).json({
    message: "You are an admin.",
    success: true,
    admin: true,
  });
};
