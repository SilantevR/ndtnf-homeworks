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
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../models/user");
const privatePage_1 = require("../middlewares/privatePage");
const router = express_1.default.Router();
router.get('/', privatePage_1.privatePage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({ login: req.user.login }).select([
            '_id',
            'username',
        ]);
        console.log(user);
        if (user) {
            res.status(200);
            res.json(user);
        }
        else {
            res.status(404);
            res.json({
                reason: 'Пользователь  не найден',
            });
        }
    }
    catch (_a) {
        res.status(500);
        res.json({
            reason: 'Ошибка',
        });
    }
}));
router.get('/login', (req, res) => {
    res.status(201);
    res.render('./pages/login', {
        title: 'Войдите в аккаунт',
    });
});
router.post('/login', passport_1.default.authenticate('local'), (req, res) => {
    res.redirect('/');
});
router.get('/signup', (req, res) => {
    res.status(201);
    res.render('./pages/signup', {
        title: 'Зарегистрируйтесь',
    });
});
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.create(req.body);
        res.status(200);
        res.redirect('/user/login');
    }
    catch (err) {
        next(err);
        res.status(500);
        res.redirect('/user/login');
    }
}));
router.get('/me', privatePage_1.privatePage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({ login: req.user.login });
        res.status(201);
        res.render('./pages/profile', {
            title: 'Профиль',
            user,
        });
    }
    catch (_b) {
        res.render('./pages/404', {
            title: 'Ошибка 404',
        });
    }
}));
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/user/login');
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map