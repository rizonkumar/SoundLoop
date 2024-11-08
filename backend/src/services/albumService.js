import { AlbumRepository } from "../repositories/albumRepository.js";
import { SongRepository } from "../repositories/songRepository.js";

export class AlbumService {
  constructor() {
    this.albumRepository = new AlbumRepository();
    this.songRepository = new SongRepository();
  }

  async getAllAlbums() {
    return await this.albumRepository.findAll();
  }

  async getAlbumById(id) {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new Error("Album not found");
    }
    return album;
  }

  async createAlbum(albumData) {
    return await this.albumRepository.create(albumData);
  }

  async deleteAlbum(id) {
    // First delete all songs in the album
    await this.songRepository.deleteMany({ albumId: id });

    // Then delete the album
    return await this.albumRepository.deleteById(id);
  }

  async countAlbums() {
    return await this.albumRepository.countDocuments();
  }
}
