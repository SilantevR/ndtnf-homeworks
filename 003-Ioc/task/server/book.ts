import { injectable } from "inversify";
import "reflect-metadata";
import { BookDto, BookI } from "./types";

export class Book implements BookI {
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
