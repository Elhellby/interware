import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configuration from './configurations';
import { IUser } from '../models/user.model';

export const generateToken = (user: IUser): string => {
    const secret = configuration.getKey('SECRET');
    const expiresIn = '1h';

    let pp=user.roles

    console.log(pp)

    return jwt.sign({ user }, secret, { expiresIn });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token:string = (req.header('Authorization') || '').split(" ")[1] || '';

    if (!token) {
        res.status(401).send('Acceso denegado');
    }

    jwt.verify(token, configuration.getKey('SECRET'), (err, user) => {
        if (err) {
            res.status(403).send('Token no válido');
        } else {
            req.user = user;
            next();
        }
    });
};