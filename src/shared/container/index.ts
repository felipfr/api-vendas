import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
