import { Request, Response } from 'express';
import { IUserService } from '../service/user.service';
import passport from 'passport';
import { generateToken } from '../utils/jwt';

export class AuthController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async signup(req: Request, res: Response, next: any): Promise<void> {
    passport.authenticate('local', async (err: any, user: any) => {
      try {
        if (err || user) {
          res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico' });
        } else {
          req.login(user, { session: false }, async (error) => {
            if (error) next(error);
            else {
              const user = await this.userService.createUser(req.body);
              const token = generateToken(user);
              req.user=user
              console.log(req.user)
              res.json({ user, token });
            }

          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  }

  async login(req: Request, res: Response, next: any): Promise<void> {
    passport.authenticate('local', async (err: any, user: any) => {
      try {
        if (err || !user) {
          res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }else{
          req.login(user, { session: false }, async (error) => {
            if (error) next(error);
            else{
              const token = generateToken(user);
              res.json({ user, token });
            }
          });
        }
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  }
}