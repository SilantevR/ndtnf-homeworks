import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto) {
    const createdBook = this.bookModel.create(createBookDto);
    if (createdBook) {
      return createdBook;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Пользователь не создан.',
      });
    }
  }

  async findAll() {
    const books = await this.bookModel.find().exec();
    if (books) {
      return books;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Информация не найдена.',
      });
    }
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id).exec();
    if (book) {
      return book;
    } else {
      throw new BadRequestException({
        status: 'fail',
        description: 'Пользователь не найден.',
      });
    }
  }

  async update(id: string, updateBookDto: CreateBookDto) {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, {
        returnDocument: 'after',
      })
      .exec();

    if (updatedBook) {
      return updatedBook;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Информация не найдена.',
      });
    }
  }

  async remove(id: string) {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();

    if (deletedBook) {
      return deletedBook;
    } else {
      throw new InternalServerErrorException({
        status: 'fail',
        description: 'Информация не найдена.',
      });
    }
  }
}
