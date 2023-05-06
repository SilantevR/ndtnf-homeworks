"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CountSchema = new mongoose_1.Schema({
    book: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});
const Counter = (0, mongoose_1.model)("Counter", CountSchema);
exports.default = Counter;
//# sourceMappingURL=count.js.map