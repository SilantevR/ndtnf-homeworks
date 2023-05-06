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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const book_1 = __importDefault(require("./book"));
const book_2 = __importDefault(require("../models/book"));
let BookRepository = class BookRepository {
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_2.default.create(new book_1.default(bookData));
                return book;
            }
            catch (err) {
                return null;
            }
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_2.default.findById(id);
                return book;
            }
            catch (err) {
                return null;
            }
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield book_2.default.find();
                return books;
            }
            catch (err) {
                return null;
            }
        });
    }
    updateBook(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield book_2.default.findByIdAndUpdate(id, bookData, {
                    returnDocument: "after",
                });
                return book;
            }
            catch (err) {
                return null;
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield book_2.default.findByIdAndDelete(id);
                const books = yield book_2.default.find();
                return books;
            }
            catch (err) {
                return null;
            }
        });
    }
};
BookRepository = __decorate([
    (0, inversify_1.injectable)()
], BookRepository);
exports.default = BookRepository;
//# sourceMappingURL=bookRepository.js.map