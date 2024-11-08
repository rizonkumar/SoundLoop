import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { uploadToCloudinary } from " ../helper/UploadToCloudinary.js";

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

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    // if song belongs to an album, add it to the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }
    res
      .status(201)
      .json(song, { message: "Song created successfully.", success: true });
  } catch (error) {
    console.log("error in createSong controller", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    // if song belongs to an album, remove it from the album's songs array and update the album
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
      await Song.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: "Song deleted successfully.", success: true });
    }
  } catch (error) {
    console.log("error in deleteSong controller", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {};
