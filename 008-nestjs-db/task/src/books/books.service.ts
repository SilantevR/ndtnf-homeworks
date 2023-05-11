import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  private readonly books: CreateBookDto[] = [];
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: number) {
    const book = this.bookModel.findById(id).exec();
    if (book) {
      return book;
    } else {
      console.log(new Error('Объект не найден'));
      return `Объект не найден`;
    }
  }

  update(id: string, updateBookDto: CreateBookDto) {
    const updatedBook = this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      returnDocument: 'after',
    });

    if (updatedBook) {
      return updatedBook;
    } else {
      console.log(new Error('Объект не найден'));
      return `Объект не найден`;
    }
  }

  remove(id: string) {
    const deletedBook = this.bookModel.findByIdAndDelete(id);

    if (deletedBook) {
      return deletedBook;
    } else {
      console.log(new Error('Объект не найден'));
      return `Объект не найден`;
    }
  }
}
