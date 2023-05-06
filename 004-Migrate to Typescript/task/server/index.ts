import express from 'express';
import session from 'express-session';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import * as passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from './routes/user';
import indexRouter from './routes/index';
import User from './models/user';
import BookModel from './models/book';
import privatePage from './middlewares/privatePage';
import { ExpressUser } from './types';

const LocalStrategy = passportLocal.Strategy;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', async (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);
  let book = await BookModel.findById(socket.handshake.query.roomName);
  socket.emit('show-comments', book.comments);

  socket.on('comment', async (comment) => {
    book = await BookModel.findByIdAndUpdate(
      socket.handshake.query.roomName,
      {
        $push: {
          comments: comment,
        },
      },
      { returnDocument: 'after' },
    );
    socket.broadcast.emit('show-comments', book.comments);
    socket.emit('show-comments', book.comments);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${id}`);
  });
});

const PORT = Number(process.env.PORT) || 3000;

const verify: passportLocal.VerifyFunction = async (login, password, done) => {
  try {
    const user = await User.findOne({ login });
    if (password === user.password) {
      done(null, user);
    } else {
      done(null, false, { message: 'Пароль не правильный' });
    }
  } catch {
    done(null, false, { message: 'Имя пользователя введено не верно' });
  }
};

const options = {
  usernameField: 'login',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user: ExpressUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/public', express.static(`${__dirname}/public`));
app.use('/client', express.static(`${__dirname}/client`));
app.use('/node_modules/socket.io-client', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '..',
      'node_modules',
      'socket.io-client',
      'dist',
      'socket.io.esm.min.js',
    ),
  );
});

app.use('/user', userRouter);

app.use('/', privatePage, indexRouter);

const baseURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/booksbox';

mongoose
  .connect(baseURL)
  .then(() => {
    console.log('conected to mongoDB');
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Conection failed: ${err}`);
  });
