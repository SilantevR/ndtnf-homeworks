"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passportLocal = __importStar(require("passport-local"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("./routes/user"));
const index_1 = __importDefault(require("./routes/index"));
const user_2 = require("./models/user");
const book_1 = require("./models/book");
const privatePage_1 = require("./middlewares/privatePage");
const LocalStrategy = passportLocal.Strategy;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);
    let book = yield book_1.BookModel.findById(socket.handshake.query.roomName);
    socket.emit("show-comments", book.comments);
    socket.on("comment", (comment) => __awaiter(void 0, void 0, void 0, function* () {
        book = yield book_1.BookModel.findByIdAndUpdate(socket.handshake.query.roomName, {
            $push: {
                comments: comment,
            },
        }, { returnDocument: "after" });
        socket.broadcast.emit("show-comments", book.comments);
        socket.emit("show-comments", book.comments);
    }));
    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${id}`);
    });
}));
const PORT = Number(process.env.PORT) || 3000;
const verify = (login, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_2.User.findOne({ login });
        if (password === user.password) {
            done(null, user);
        }
        else {
            done(null, false, { message: "Пароль не правильный" });
        }
    }
    catch (_a) {
        done(null, false, { message: "Имя пользователя введено не верно" });
    }
});
const options = {
    usernameField: "login",
    passwordField: "password",
};
passport_1.default.use("local", new LocalStrategy(options, verify));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_2.User.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({ secret: "SECRET" }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "/views"));
app.use("/public", express_1.default.static(`${__dirname}/public`));
app.use("/client", express_1.default.static(`${__dirname}/client`));
app.use("/node_modules/socket.io-client", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "node_modules", "socket.io-client", "dist", "socket.io.esm.min.js"));
});
app.use("/user", user_1.default);
app.use("/", privatePage_1.privatePage, index_1.default);
const baseURL = process.env.MONGODB_URL || "mongodb://localhost:27017/booksbox";
mongoose_1.default
    .connect(baseURL)
    .then((res) => {
    console.log("conected to mongoDB");
    server.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.log(`Conection failed: ${err}`);
});
//# sourceMappingURL=index.js.map