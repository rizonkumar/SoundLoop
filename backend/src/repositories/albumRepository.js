import { Album } from "../models/album.model.js";

export class AlbumRepository {
  async findAll() {
    return await Album.find();
  }

  async create(albumData) {
    const album = new Album(albumData);
    return await album.save();
  }

  async findById(id) {
    return await Album.findById(id).populate("songs");
  }

  async deleteById(id) {
    return await Album.findByIdAndDelete(id);
  }

  async updateById(id, updateData) {
    return await Album.findByIdAndUpdate(id, updateData, { new: true });
  }

  async countDocuments() {
    return await Album.countDocuments();
  }
}
