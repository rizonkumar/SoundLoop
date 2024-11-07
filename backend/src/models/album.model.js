import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: {
      typeof: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true } // this add createdAt, updatedAt
);

export const User = mongoose.model("Album", albumSchema);
