import { userRepository } from "../repositories/user.repository";
import { NotFoundError } from "../constants/errors";
import type { ListUsersQuery, UpdateUserInput } from "@repo/shared";

class UserService {
  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError("User");
    return user;
  }

  async list(query: ListUsersQuery) {
    return userRepository.findMany(query);
  }

  async update(id: string, data: UpdateUserInput) {
    await this.getById(id); // Throws NotFoundError if missing
    return userRepository.update(id, data);
  }
}

export const userService = new UserService();
