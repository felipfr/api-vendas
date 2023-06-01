import AppError from '@shared/http/errors/AppError';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError(`Token doesn't exists`);
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError(`User doesn't exists`);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;