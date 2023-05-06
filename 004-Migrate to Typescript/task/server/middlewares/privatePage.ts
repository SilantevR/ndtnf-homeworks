import { NextFunction, Request, Response } from 'express';

const privatePage = (req: Request, res: Response, next: NextFunction) => (req.isAuthenticated() ? next() : res.redirect('/user/login'));

export default privatePage;
