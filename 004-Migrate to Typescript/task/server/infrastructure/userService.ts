import { injectable } from 'inversify';
import 'reflect-metadata';

import { UserDto } from '../types';
import User from '../models/user';

@injectable()
class UserService {
  async getUser(login: string) {
    try {
      const user = User.findOne({ login }).select([
        '_id',
        'username',
        'email',
        'login',
      ]);
      return await user;
    } catch (err) {
      return null;
    }
  }

  async createUser(userData: UserDto) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (err) {
      return null;
    }
  }
}

export default UserService;
