import AppError from '@shared/infra/http/errors/AppError';
import authConfig from '@config/auth';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign, Secret } from 'jsonwebtoken';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default CreateSessionsService;
