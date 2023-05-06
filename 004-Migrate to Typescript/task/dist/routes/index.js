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
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const books_1 = __importDefault(require("../middlewares/books"));
const covers_1 = __importDefault(require("../middlewares/covers"));
const container_1 = require("../infrastructure/container");
const router = express_1.default.Router();
const URL = process.env.URL || "http://localhost:4000/";
function httpGet(bookURL) {
    return new Promise((resolve, reject) => {
        http_1.default
            .get(bookURL, (res) => {
            let rowData = "";
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                rowData += chunk;
            });
            res.on("end", () => {
                resolve(JSON.parse(rowData));
            });
        })
            .on("error", (err) => {
            reject(err);
        });
    });
}
function httpPost(postOptions) {
    return new Promise((resolve, reject) => {
        const postRequest = http_1.default.request(postOptions, (response) => {
            response.setEncoding("utf8");
            response.on("data", (data) => {
                resolve(JSON.parse(data));
            });
        });
        postRequest.on("error", (err) => {
            reject(err);
        });
        postRequest.end();
    });
}
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield container_1.repo.getBooks();
        res.render("./index", { title: "Главная", books });
    }
    catch (_a) {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.get("/add", (req, res) => {
    res.render("./pages/create", {
        title: "Добавить книгу",
        book: {},
    });
});
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const postOptions = {
        hostname: process.env.SERVICE || "localhost",
        port: "4000",
        path: `/${id}`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const book = yield container_1.repo.getBook(id);
        let obj;
        try {
            obj = (yield httpPost(postOptions));
        }
        catch (_b) {
            obj = { id, count: "Данные о просмотрах не найдены" };
        }
        res.render("./pages/view", {
            title: book.title,
            book,
            count: obj === null || obj === void 0 ? void 0 : obj.count,
        });
    }
    catch (_c) {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield container_1.repo.createBook(req.body);
        res.redirect(301, `http://localhost:3000/update/${book.id}`);
    }
    catch (_d) {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.get("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield container_1.repo.getBook(id);
        res.render("./pages/update", {
            title: book.title,
            book,
        });
    }
    catch (_e) {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.post("/file/:id", books_1.default.single("fileBook"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookURL = URL + id;
    if (req.file) {
        const { filename } = req.file;
        let obj;
        try {
            obj = (yield httpGet(bookURL));
        }
        catch (_f) {
            obj = { id, count: "Данные о просмотрах не найдены" };
        }
        try {
            const book = yield container_1.repo.updateBook(id, { fileName: filename });
            if (!obj) {
                obj = { id, count: "Данные о просмотрах не найдены" };
            }
            res.render("./pages/view", {
                title: book.title,
                book,
                count: obj.count,
            });
        }
        catch (_g) {
            res.render("./pages/404", {
                title: "Ошибка 404",
            });
        }
    }
    else {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.post("/cover/:id", covers_1.default.single("fileCover"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookURL = URL + id;
    if (req.file) {
        const { filename } = req.file;
        let obj;
        try {
            obj = (yield httpGet(bookURL));
        }
        catch (_h) {
            obj = { id, count: "Данные о просмотрах не найдены" };
        }
        try {
            const book = yield container_1.repo.updateBook(id, { fileCover: filename });
            if (!obj) {
                obj = { id, count: "Данные о просмотрах не найдены" };
            }
            res.render("./pages/view", {
                title: book.title,
                book,
                count: obj.count,
            });
        }
        catch (_j) {
            res.render("./pages/404", {
                title: "Ошибка 404",
            });
        }
    }
    else {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.get("/download/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const book = yield container_1.repo.getBook(id);
        const { fileName } = book;
        const file = path_1.default.join(__dirname, `../public/books/${fileName}`);
        res.download(file);
    }
    catch (_k) {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.post("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const bookURL = URL + id;
    let obj;
    try {
        obj = (yield httpGet(bookURL));
    }
    catch (_l) {
        obj = { id, count: "Данные о просмотрах не найдены" };
    }
    try {
        const book = yield container_1.repo.updateBook(id, req.body);
        res.render("./pages/view", {
            title: book.title,
            book,
            count: obj.count,
        });
    }
    catch (_m) {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
router.post("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const books = yield container_1.repo.deleteBook(id);
        res.render("./index", { title: "Главная", books });
    }
    catch (_o) {
        res.render("./pages/404", {
            title: "Ошибка 404",
        });
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map