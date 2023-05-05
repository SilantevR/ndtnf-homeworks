import { injectable } from "inversify";
import "reflect-metadata";

import { Book } from "./book";
import { BookDto, BookI } from "./types";
import { BookModel } from "./models/book";

@injectable()
export class BookRepository {
  async createBook(bookData: BookDto) {
    try {
      const book = await BookModel.create(new Book(bookData));
      return book;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getBook(id: string) {
    try {
      const book = await BookModel.findById(id);
      return book;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getBooks() {
    try {
      const books = await BookModel.find();
      return books;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateBook(id: string, bookData: Partial<BookI>) {
    try {
      const book = await BookModel.findByIdAndUpdate(id, bookData, {
        returnDocument: "after",
      });
      return book;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async deleteBook(id: string) {
    try {
      const book = await BookModel.findByIdAndDelete(id);
      const books = await BookModel.find();
      return books;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
