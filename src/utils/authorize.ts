import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configuration from './configurations';
import UserModel, { IUser } from '../models/user.model';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const token:string = (req.header('Authorization') || '').split(" ")[1] || '';

    jwt.verify(token, configuration.getKey('SECRET'), (err: any, user: any) => {
      if (err) {
        res.status(403).json({ error: 'Acceso no autorizado' });
      } else {
        const userRoles = user.user.roles || []

console.log(userRoles)

        const hasPermission = roles.some((role) => userRoles.includes(role));
        if (hasPermission) {
          next();
        } else {
          res.status(403).json({ error: 'Acceso no autorizado' });
        }
      }
    });
  };
};