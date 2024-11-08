import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { uploadToCloudinary } from "../helper/UploadToCloudinary.js";

export const createSong = async (req, res, next) => {
  try {
    // Check if audio and image files are present in the request
    if (!req.files || !req.files.audioFiles || !req.files.imageFiles) {
      return res.status(400).json({ message: "Please upload all the files." });
    }

    // Destructure song data from the request body
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFiles;
    const imageFile = req.files.imageFiles;

    // Upload audio and image files to Cloudinary and get their URLs
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    // Create a new song instance
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null, // If albumId is not provided, set it to null
    });

    // Save the song to the database
    await song.save();

    // If the song belongs to an album, add it to the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }

    // Respond with the created song object and a success message
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
    const { id } = req.params; // Extract song ID from request parameters
    const song = await Song.findById(id); // Find the song by ID

    // If the song belongs to an album, remove its reference from the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    // Delete the song from the database
    await Song.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Song deleted successfully.", success: true });
  } catch (error) {
    console.log("error in deleteSong controller", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    // Destructure album data from the request body
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files; // Extract image file from request files

    // Upload the image file to Cloudinary and get its URL
    const imageUrl = await uploadToCloudinary(imageFile);

    // Create a new album instance
    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    // Save the album to the database
    await album.save();

    // Respond with the created album object and a success message
    res
      .status(201)
      .json(album, { message: "Album created successfully.", success: true });
  } catch (error) {
    console.log("error in createAlbum controller", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract album ID from request parameters

    // Delete all songs associated with the album
    await Song.deleteMany({ albumId: id });

    // Delete the album from the database
    await Album.findByIdAndDelete(id);

    res
      .status(201)
      .json({ message: "Album deleted successfully.", success: true });
  } catch (error) {
    console.log("error in deleteAlbum controller", error);
    next(error);
  }
};
