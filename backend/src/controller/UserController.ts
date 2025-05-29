import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export const getProfile = async (req: Request, res: Response) => {
  const result = await UserService.getUserProfile(req.cookies.token);
  res.status(result.status).json(result.message);
}

export const updateProfile = async (req: Request, res: Response) => {
  const result = await UserService.updateUserProfile(req);
  res.status(result.status).json(result.message);
}

export const changePassword = async (req: Request, res: Response) => {
  const result = await UserService.changeUserPassword(req);
  res.status(result.status).json(result.message);
}
