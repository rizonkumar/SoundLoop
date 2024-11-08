import { UserRepository } from "../repositories/userRepository.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(excludeUserId) {
    return await this.userRepository.findAll(excludeUserId);
  }

  async handleAuthCallback(userData) {
    const existingUser = await this.userRepository.findByClerkId(userData.id);

    if (!existingUser) {
      return await this.userRepository.create({
        clerkId: userData.id,
        fullName: `${userData.firstName} ${userData.lastName}`,
        imageUrl: userData.imageUrl,
      });
    }

    return existingUser;
  }
}
