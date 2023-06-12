import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';
import { Request, Response } from 'express';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({
      email,
    });

    return res.sendStatus(204);
  }
}
