import mongoose from "mongoose";
import { BookRepository } from "./bookRepository";
const baseURL = process.env.MONGODB_URL || `mongodb://localhost:27017/booksbox`;

mongoose
  .connect(baseURL)
  .then(() => {
    console.log("conected to mongoDB");

    const addBook = BookRepository.createBook({
      title: "The Da Vinci Code",
      description:
        "Symbologist Robert Langdon travels from Paris to London to discover the truth behind a mysterious and bizarre murder. Later, he learns about a religious mystery protected by a secret society.",
      authors: "Dan Brown",
    });
    addBook.then((result) => console.log(result));

    const books = BookRepository.getBooks();
    books.then((result) => console.log(result));

    const book = BookRepository.getBook("643bdd950ef76f8693261d73");
    book.then((result) => console.log(result));

    const updateBook = BookRepository.updateBook("643bdd950ef76f8693261d73", {
      title: "unknown",
    });
    updateBook.then((result) => console.log(result));
  })
  .catch((err: Error) => {
    console.log(`Conection failed: ${err}`);
  });
