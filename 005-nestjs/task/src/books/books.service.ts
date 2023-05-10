import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private readonly books: CreateBookDto[] = [];

  create(createBookDto: CreateBookDto) {
    this.books.push(createBookDto);

    return this.books[this.books.length - 1];
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    if (this.books[id - 1]) {
      return this.books[id - 1];
    } else {
      console.log(new Error('Объект не найден'));
      return `Объект не найден`;
    }
  }

  update(id: number, updateBookDto: CreateBookDto) {
    if (this.books[id - 1]) {
      this.books[id - 1] = updateBookDto;
      return this.books[id - 1];
    } else {
      console.log(new Error('Объект не найден'));
      return `Объект не найден`;
    }
  }

  remove(id: number) {
    if (this.books[id - 1]) {
      const deleted = this.books.splice(id - 1, 1);
      return deleted[0];
    } else {
      console.log(new Error('Объект не найден'));
      return `Объект не найден`;
    }
  }
}
