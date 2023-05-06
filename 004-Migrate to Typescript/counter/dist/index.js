"use strict";
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const count_1 = __importDefault(require("./models/count"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
app.use(express_1.default.json());
app.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let book = yield count_1.default.find({ book: id });
        if (book.length) {
            book[0].count++;
            yield count_1.default.findOneAndUpdate({ book: id }, { count: book[0].count });
            book = yield count_1.default.find({ book: id });
            res.status(200);
            res.json(book[0]);
        }
        else {
            const obj = yield count_1.default.create({ book: id, count: 1 });
            res.status(200);
            res.json(obj);
        }
    }
    catch (_a) {
        res.status(500);
        res.json(false);
    }
}));
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield count_1.default.find({ book: id });
        if (book.length) {
            res.status(200);
            res.json(book[0]);
        }
        else {
            res.status(401);
            res.json(false);
        }
    }
    catch (err) {
        res.status(500);
        res.json(false);
    }
}));
const baseURL = process.env.MONGODB_URL || `mongodb://localhost:27017/counters`;
mongoose_1.default
    .connect(baseURL)
    .then((res) => {
    console.log("conected to mongoDB");
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.log(`Conection failed: ${err}`);
});
//# sourceMappingURL=index.js.map