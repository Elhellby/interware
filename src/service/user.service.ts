import { IUser } from '../models/user.model';
import UserModel from "../models/user.model";

export interface IUserService {
  getAllUsers(): Promise<IUser[]>;
  getUserById(userId: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  createUser(userData: IUser): Promise<IUser>;
  updateUser(userId: string, userData: IUser): Promise<IUser | null>;
  deleteUser(userId: string): Promise<IUser | null>;
}

export class UserService implements IUserService {
  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find();
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return UserModel.findById(userId);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({email:email});
  }

  async createUser(userData: IUser): Promise<IUser> {
    return UserModel.create(userData);
  }

  async updateUser(userId: string, userData: IUser): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(userId, userData, { new: true });
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(userId);
  }
}