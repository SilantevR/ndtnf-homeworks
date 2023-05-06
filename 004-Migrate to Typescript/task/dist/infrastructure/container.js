"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = exports.repo = void 0;
const inversify_1 = require("inversify");
const bookRepository_1 = __importDefault(require("./bookRepository"));
const userService_1 = __importDefault(require("./userService"));
const container = new inversify_1.Container();
container.bind(bookRepository_1.default).toSelf().inSingletonScope();
container.bind(userService_1.default).toSelf().inSingletonScope();
exports.repo = container.get(bookRepository_1.default);
exports.service = container.get(userService_1.default);
//# sourceMappingURL=container.js.map