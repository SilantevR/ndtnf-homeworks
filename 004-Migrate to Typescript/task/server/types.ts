import { Request } from 'express';

export interface Comment {
  comment: string;
  user: {
    _id: string;
    username: string;
  };
}

export interface BookI {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover?: string;
  fileName?: string;
  comments?: [Comment];
}

export interface BookDto {
  title: BookI['title'];
  description: BookI['description'];
  authors: BookI['authors'];
}

export type ExpressUser = {
  id?: number;
};

export interface PostOptions {
  hostname: string;
  port: string;
  path: string;
  method: string;
  headers: Record<string, string>;
}

export interface Obj {
  id: string;
  count: string | number;
}

export interface UserRequest extends Request {
  user?: Record<string, any>;
}

export interface UserI {
  id: string;
  login: string;
  name: string;
  email: string;
  password: string;
}

export interface UserDto {
  login: UserI['login'];
  name: UserI['name'];
  email: UserI['email'];
  password: UserI['password'];
}
