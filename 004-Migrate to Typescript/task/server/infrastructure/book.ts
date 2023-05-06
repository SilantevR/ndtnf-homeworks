import { BookDto, BookI } from '../types';

class Book implements BookI {
  id: string;

  title: string;

  description: string;

  authors: string;

  favorite = false;

  constructor(book: BookDto) {
    this.title = book.title;
    this.description = book.description;
    this.authors = book.authors;
  }
}

export default Book;
