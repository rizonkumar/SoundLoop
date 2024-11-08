import { Song } from "../models/song.model.js";

export class StatsRepository {
  async getUniqueArtistsCount() {
    try {
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
    } catch (error) {
      console.error("Error in getUniqueArtistsCount:", error);
      throw error;
    }
  }
}
