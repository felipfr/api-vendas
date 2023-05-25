import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
