import { SongRepository } from "../repositories/songRepository.js";
import { AlbumRepository } from "../repositories/albumRepository.js";

export class SongService {
  constructor() {
    this.songRepository = new SongRepository();
    this.albumRepository = new AlbumRepository();
  }

  async getAllSongs() {
    return await this.songRepository.findAll({ createdAt: -1 });
  }

  async createSong(songData) {
    const song = await this.songRepository.create(songData);

    // If song is part of an album, update the album's songs array
    if (songData.albumId) {
      await this.albumRepository.updateById(songData.albumId, {
        $push: { songs: song._id },
      });
    }

    return song;
  }

  async deleteSong(id) {
    const song = await this.songRepository.findById(id);

    if (song.albumId) {
      await this.albumRepository.updateById(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    return await this.songRepository.deleteById(id);
  }

  async getFeaturedSongs() {
    return await this.songRepository.getRandomSongs(6);
  }

  async getMadeForYouSongs() {
    // In future, this could include user preferences logic
    return await this.songRepository.getRandomSongs(6);
  }

  async getTrendingSongs() {
    // In future, this could include popularity metrics
    return await this.songRepository.getRandomSongs(6);
  }
}
