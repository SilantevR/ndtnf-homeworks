import { NextFunction, Request, Response } from 'express';

export const privatePage = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.isAuthenticated() ? next() : res.redirect('/user/login');
};
