import { User } from "../models/user.model.js";

export class UserRepository {
  async findAll(excludeId) {
    return await User.find({
      clerkId: { $ne: excludeId },
    });
  }

  async findByClerkId(clerkId) {
    return await User.findOne({ clerkId });
  }

  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async countDocuments() {
    return await User.countDocuments();
  }
}
