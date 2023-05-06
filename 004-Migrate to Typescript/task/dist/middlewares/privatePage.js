"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const privatePage = (req, res, next) => (req.isAuthenticated() ? next() : res.redirect('/user/login'));
exports.default = privatePage;
//# sourceMappingURL=privatePage.js.map