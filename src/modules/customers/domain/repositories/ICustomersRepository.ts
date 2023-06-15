import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface ICustomersRepository {
  create(data: ICreateCustomer): Promise<ICustomer>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByName(name: string): Promise<ICustomer | undefined>;
  remove(customer: ICustomer): Promise<void>;
  save(customer: ICustomer): Promise<ICustomer>;
}
