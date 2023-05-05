"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    fileCover: {
        type: String,
    },
    fileName: {
        type: String,
    },
    comments: [
        {
            comment: String,
            user: { _id: String, username: String },
        },
    ],
});
exports.BookModel = (0, mongoose_1.model)('Book', BookSchema);
//# sourceMappingURL=book.js.map