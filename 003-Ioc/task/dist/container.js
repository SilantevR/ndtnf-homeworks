"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const bookRepository_1 = require("./bookRepository");
const container = new inversify_1.Container();
exports.container = container;
container.bind(bookRepository_1.BookRepository).toSelf().inSingletonScope();
//# sourceMappingURL=container.js.map