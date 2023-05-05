import express from 'express';
import passport from 'passport';
import { User } from '../models/user';
import { privatePage } from '../middlewares/privatePage';
import { UserRequest } from '../types';

const router = express.Router();

router.get('/', privatePage, async (req: UserRequest, res) => {
  try {
    const user = await User.findOne({ login: req.user.login }).select([
      '_id',
      'username',
    ]);
    console.log(user);
    if (user) {
      res.status(200);
      res.json(user);
    } else {
      res.status(404);
      res.json({
        reason: 'Пользователь  не найден',
      });
    }
  } catch {
    res.status(500);
    res.json({
      reason: 'Ошибка',
    });
  }
});

router.get('/login', (req, res) => {
  res.status(201);
  res.render('./pages/login', {
    title: 'Войдите в аккаунт',
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});

router.get('/signup', (req, res) => {
  res.status(201);
  res.render('./pages/signup', {
    title: 'Зарегистрируйтесь',
  });
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(200);
    res.redirect('/user/login');
  } catch (err) {
    next(err);
    res.status(500);
    res.redirect('/user/login');
  }
});

router.get('/me', privatePage, async (req: UserRequest, res) => {
  try {
    const user = await User.findOne({ login: req.user.login });
    res.status(201);
    res.render('./pages/profile', {
      title: 'Профиль',
      user,
    });
  } catch {
    res.render('./pages/404', {
      title: 'Ошибка 404',
    });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/user/login');
  });
});

export default router;
