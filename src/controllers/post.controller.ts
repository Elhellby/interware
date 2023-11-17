import { Request, Response } from 'express';
import { IPostService } from '../service/post.service';
import PostModel from '../models/post.model';

export class PostController {
  private readonly postService: IPostService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const userId = req.params.id; // Obtener el ID del usuario autenticado

      const newPost = new PostModel({
        title,
        content,
        author: userId,
      });

      await newPost.save();

      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error al crear post:', error);
      res.status(500).send('Error interno del servidor');
    }
  }

  async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getPosts();
      res.json(posts);
    } catch (error) {
      console.error('Error al obtener posts:', error);
      res.status(500).send('Error interno del servidor');
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    // Implementa la lógica para obtener un post por ID
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    // Implementa la lógica para actualizar un post
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    // Implementa la lógica para eliminar un post
  }
}
