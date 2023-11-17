import express from 'express';
import { PostController } from '../controllers/post.controller';
import { authenticateToken } from '../utils/jwt';
import { PostService } from '../service/post.service';
import { authorize } from '../utils/authorize';

const router = express.Router();
const postService = new PostService()
const postController = new PostController(postService);

router.post('/posts', authenticateToken, authorize(['admin', 'user']), postController.createPost.bind(postController));
router.get('/posts', authenticateToken, authorize(['admin', 'user']), postController.getPosts.bind(postController));
router.get('/posts/:id', authenticateToken, authorize(['admin', 'user']), postController.getPostById.bind(postController));
router.put('/posts/:id', authenticateToken, authorize(['admin', 'user']), postController.updatePost.bind(postController));
router.delete('/posts/:id', authenticateToken, authorize(['admin', 'user']), postController.deletePost.bind(postController));

export default router;
