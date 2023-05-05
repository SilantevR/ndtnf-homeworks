"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const book_1 = require("./book");
const book_2 = require("./models/book");
let BookRepository = class BookRepository {
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_2.BookModel.create(new book_1.Book(bookData));
                return book;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_2.BookModel.findById(id);
                return book;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield book_2.BookModel.find();
                return books;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    updateBook(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_2.BookModel.findByIdAndUpdate(id, bookData, {
                    returnDocument: "after",
                });
                return book;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_2.BookModel.findByIdAndDelete(id);
                const books = yield book_2.BookModel.find();
                return books;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
};
BookRepository = __decorate([
    (0, inversify_1.injectable)()
], BookRepository);
exports.BookRepository = BookRepository;
//# sourceMappingURL=bookRepository.js.map