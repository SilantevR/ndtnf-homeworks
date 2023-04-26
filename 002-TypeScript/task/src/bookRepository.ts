import { Book } from "./book";
import { BookI } from "./types";
import { BookModel } from "./models/book";

export abstract class BookRepository {
  static async createBook(bookData: BookI) {
    try {
      const book = await BookModel.create(new Book(bookData));
      return book;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  static async getBook(id: string) {
    try {
      const book = await BookModel.findById(id);
      return book;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  static async getBooks() {
    try {
      const books = await BookModel.find();
      return books;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  static async updateBook(id: string, bookData: Partial<BookI>) {
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
  static async deleteBook(id: string) {
    try {
      const book = await BookModel.findByIdAndDelete(id);
      return book;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
