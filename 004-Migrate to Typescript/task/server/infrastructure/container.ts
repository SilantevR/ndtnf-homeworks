import { Container } from 'inversify';
import BookRepository from './bookRepository';
import UserService from './userService';

const container = new Container();
container.bind(BookRepository).toSelf().inSingletonScope();
container.bind(UserService).toSelf().inSingletonScope();

export const repo = container.get(BookRepository);
export const service = container.get(UserService);
