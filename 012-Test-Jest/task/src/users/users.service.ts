import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel
        .findOne({ email: createUserDto.email })
        .exec();
      console.log(user);
      if (user) {
        throw new BadRequestException({
          status: 'fail',
          description: 'пользователь с таким email уже существует.',
        });
      } else {
        return this.userModel.create(createUserDto);
      }
    } catch {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Что-то пошло не так.',
      });
    }
  }
  async find(authUserDto: AuthUserDto) {
    try {
      const user = await this.userModel
        .findOne({ email: authUserDto.email })
        .exec();
      if (!user) {
        throw new BadRequestException({
          status: 'fail',
          description: 'Неправильный email или пароль.',
        });
      } else {
        return user;
      }
    } catch {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Что-то пошло не так.',
      });
    }
  }
  async findById(id: string) {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new BadRequestException({
          status: 'fail',
          description: 'Пользователь не найден.',
        });
      } else {
        return user;
      }
    } catch {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Что-то пошло не так.',
      });
    }
  }
}
