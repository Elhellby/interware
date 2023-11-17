import { Request, Response } from 'express';
import { IUserService } from '../service/user.service';

export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error al crear un usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getAllUsers();
        res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener un usuario por ID:', error);
      res.status(500).send('Error interno del servidor');
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener un usuario por ID:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
  
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const updatedUser = await this.userService.updateUser(userId, req.body);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const deletedUser = await this.userService.deleteUser(userId);
      if (deletedUser) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}