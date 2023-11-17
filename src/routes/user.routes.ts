import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../service/user.service';
import { authenticateToken } from '../utils/jwt';
import { authorize } from '../utils/authorize';

const router = express.Router();
const userService = new UserService();

const userController = new UserController(userService);


router.post('/users', authenticateToken,authorize(['user']), userController.createUser.bind(userController));
router.get('/users', authenticateToken, authorize(['admin','user']),userController.getAllUsers.bind(userController));
router.get('/users/:userId', authenticateToken,authorize(['admin','user']), userController.getUserById.bind(userController));
router.put('/users/:userId', authenticateToken,authorize(['admin','user']), userController.updateUser.bind(userController));
router.delete('/users/:userId', authenticateToken,authorize(['admin']), userController.deleteUser.bind(userController));

export default router;