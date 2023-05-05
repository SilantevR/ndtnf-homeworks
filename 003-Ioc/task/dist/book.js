"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
require("reflect-metadata");
class Book {
    constructor(book) {
        this.favorite = false;
        this.title = book.title;
        this.description = book.description;
        this.authors = book.authors;
    }
}
exports.Book = Book;
//# sourceMappingURL=book.js.map