import { Song } from "../models/song.model.js";

export class SongRepository {
  async findAll(sortOptions = {}) {
    return await Song.find().sort(sortOptions);
  }

  async create(songData) {
    const song = new Song(songData);
    return await song.save();
  }

  async findById(id) {
    return await Song.findById(id);
  }

  async deleteById(id) {
    return await Song.findByIdAndDelete(id);
  }

  async getRandomSongs(size = 6) {
    return await Song.aggregate([
      { $sample: { size } },
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
  }

  async deleteMany(query) {
    return await Song.deleteMany(query);
  }
  async countDocuments() {
    return await Song.countDocuments();
  }

  async getUniqueArtistsCount() {
    const result = await Song.aggregate([
      {
        $unionWith: { coll: "albums", pipeline: [] },
      },
      {
        $group: {
          _id: "$artist",
        },
      },
      {
        $count: "count",
      },
    ]);

    return result[0]?.count || 0;
  }
}
