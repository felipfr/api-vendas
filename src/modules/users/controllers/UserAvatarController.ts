import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { Request, Response } from 'express';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      userId: req.user.id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(user);
  }
}
