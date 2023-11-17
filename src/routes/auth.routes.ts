import express from 'express';
import { UserService } from '../service/user.service';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();
const userService = new UserService();

const authController = new AuthController(userService);

router.post('/signup', authController.signup.bind(authController));
router.post('/login', authController.login.bind(authController));


export default router;