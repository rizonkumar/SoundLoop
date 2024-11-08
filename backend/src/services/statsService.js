import { SongRepository } from "../repositories/songRepository.js";
import { AlbumRepository } from "../repositories/albumRepository.js";
import { UserRepository } from "../repositories/userRepository.js";

export class StatsService {
  constructor() {
    this.songRepository = new SongRepository();
    this.albumRepository = new AlbumRepository();
    this.userRepository = new UserRepository();
  }

  async getSystemStats() {
    const [totalSongs, totalUsers, totalAlbums] = await Promise.all([
      this.songRepository.countDocuments(),
      this.userRepository.countDocuments(),
      this.albumRepository.countDocuments(),
    ]);

    // Get unique artists count
    const uniqueArtists = await this.songRepository.getUniqueArtistsCount();

    return {
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists: uniqueArtists || 0,
    };
  }
}
