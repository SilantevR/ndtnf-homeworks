import { BookI } from "./types";

export class Book implements BookI {
  title: string;
  description: string;
  authors: string;
  favorite: boolean = false;

  constructor(book: BookI) {
    this.title = book.title;
    this.description = book.description;
    this.authors = book.authors;
  }
}
