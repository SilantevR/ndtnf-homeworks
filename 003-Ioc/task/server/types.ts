import { Request } from "express";
import { BookRepository } from "./bookRepository";
import { Book } from "./book";

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
  title: BookI["title"];
  description: BookI["description"];
  authors: BookI["authors"];
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

const TYPES = {
  BookRepository: Symbol.for("BookRepository"),
};

export { TYPES };
