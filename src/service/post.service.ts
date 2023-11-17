import PostModel, { IPost } from "../models/post.model";

export interface IPostService {
    createPost(post: IPost): Promise<IPost>;
    getPosts(): Promise<IPost[]>;
    getPostById(postId: string): Promise<IPost | null>;
    updatePost(postId: string, updatedPost: IPost): Promise<IPost | null>;
    deletePost(postId: string): Promise<void>;
}

export class PostService implements IPostService {
    async getPosts(): Promise<IPost[]> {
        return PostModel.find();
    }

    async getPostById(postId: string): Promise<IPost | null> {
        return PostModel.findById(postId);
    }

    async createPost(postData: IPost): Promise<IPost> {
        return PostModel.create(postData);
    }

    async updatePost(postId: string, postData: IPost): Promise<IPost | null> {
        return PostModel.findByIdAndUpdate(postId, postData, { new: true });
    }

    async deletePost(postId: string): Promise<void> {
        await PostModel.findByIdAndDelete(postId);
    }
}
