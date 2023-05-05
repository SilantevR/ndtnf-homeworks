"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privatePage = void 0;
const privatePage = function (req, res, next) {
    req.isAuthenticated() ? next() : res.redirect('/user/login');
};
exports.privatePage = privatePage;
//# sourceMappingURL=privatePage.js.map